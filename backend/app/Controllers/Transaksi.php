<?php

namespace App\Controllers;

use App\Models\BarangModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\TransaksiModel;

class Transaksi extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */

    use ResponseTrait;

    public function index()
    {
        $model = new TransaksiModel();
        $model->select('transaksi.id, transaksi.jumlah_terjual, transaksi.tanggal_transaksi, transaksi.id_barang, barang.nama_barang');
        $model->join('barang', 'barang.id = transaksi.id_barang');

        $searchValue = $this->request->getGet('searchValue'); // Get search value from query parameter
        $searchColumn = $this->request->getGet('searchColumn'); // Get search column from query parameter

        if (!empty($searchValue) && !empty($searchColumn)) {
            $isFirst = true;
            foreach ($searchColumn as $k => $v) {
                if ($isFirst) {
                    $model->like($v, $searchValue);
                    $isFirst = false;
                } else {
                    $model->orLike($v, $searchValue);
                }
            }
        }

        $orderColumn = $this->request->getGet('orderColumn'); // Get order column from query parameter
        $orderDir = $this->request->getGet('orderDir'); // Get order direction from query parameter

        if (!empty($orderColumn) && !empty($orderDir)) {
            $model->orderBy($orderColumn, $orderDir);
        }

        $query = $model->get();
        $response = [
            'status' => 200,
            'data' => $query->getResult(),
            'error' => [],
            'message' => ''
        ];
        return $this->respond($response);
    }


    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        $response = [
            'status' => 200,
            'error' => [],
            'message' => ''
        ];
        $modelTransaksi = new TransaksiModel();
        $modelTransaksi->select('transaksi.id, transaksi.jumlah_terjual, transaksi.tanggal_transaksi, barang.nama_barang');
        $modelTransaksi->join('barang', 'barang.id = transaksi.id_barang');
        $modelTransaksi->where(['transaksi.id' => $id]);
        $dataTransaksi = $modelTransaksi->get()->getRow();
        if (!$dataTransaksi) {
            $response['status'] = 400;
            $response['message'] = 'Transaksi Tidak Ditemukan';
            return $this->respondCreated($response);
        }
        $response['data'] = $dataTransaksi;
        return $this->respondCreated($response);
    }



    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        $db = db_connect();
        helper(['form']);
        $rules = [
            'id_barang' => 'required|integer',
            'jumlah_terjual' => 'required|integer',
            'tanggal_transaksi' => 'required',
        ];
        $data = [
            'id_barang' => $this->request->getVar('id_barang'),
            'jumlah_terjual' => $this->request->getVar('jumlah_terjual'),
            'tanggal_transaksi' => $this->request->getVar('tanggal_transaksi'),
        ];
        $response = [
            'status' => 201,
            'error' => [],
            'message' => ''
        ];
        if (!$this->validate($rules)) {
            $response['error'] = $this->validator->getErrors();
            return $this->respondCreated($response);
        } else {
            $modelTransaksi = new TransaksiModel();
            $modelBarang = new BarangModel();
            $modelBarang->where(['id' => $data['id_barang']]);
            $dataBarang = $modelBarang->get()->getRow();
            if (!$dataBarang) {
                $response['status'] = 400;
                $response['message'] = 'Barang Tidak Ditemukan';
            } else {
                if ($data['jumlah_terjual'] > $dataBarang->stock) {
                    $response['status'] = 400;
                    $response['message'] = 'stock Barang Tidak Cukup';
                } else {
                    $db->transStart();
                    $modelBarang->update($data['id_barang'], [
                        'stock' => $dataBarang->stock - $data['jumlah_terjual']
                    ]);
                    if ($db->transStatus() === false) {
                        $db->transRollback();
                        $response['status'] = 400;
                        $response['message'] = 'Gagal Ubah Stock';
                        return $this->respondCreated($response);
                    }
                    $modelTransaksi->save($data);
                    $response['message'] = 'Data berhasil ditambah';
                    $db->transComplete();
                }
            }
            return $this->respondCreated($response);
        }
    }



    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        $db = db_connect();
        helper(['form']);
        $rules = [
            'id_barang' => 'required|integer',
            'jumlah_terjual' => 'required|integer',
            'tanggal_transaksi' => 'required',
        ];
        $data = [
            'id_barang' => $this->request->getVar('id_barang'),
            'jumlah_terjual' => $this->request->getVar('jumlah_terjual'),
            'tanggal_transaksi' => $this->request->getVar('tanggal_transaksi')
        ];

        $response = [
            'status' => 200,
            'error' => [],
            'message' => ''
        ];

        if (!$this->validate($rules)) {
            $response['error'] = $this->validator->getErrors();
            return $this->respondCreated($response);
        }

        $modelTransaksi = new TransaksiModel();
        $modelTransaksi->where(['id' => $id]);
        $dataTransaksi = $modelTransaksi->get()->getRow();
        if (!$dataTransaksi) {
            $response['status'] = 400;
            $response['message'] = 'Transaksi Tidak Ditemukan';
            return $this->respondCreated($response);
        }
        $modelBarang = new BarangModel();
        $modelBarang->where(['id' => $data['id_barang']]);
        $dataBarang = $modelBarang->get()->getRow();
        if (!$dataBarang) {
            $response['status'] = 400;
            $response['message'] = 'Barang Tidak Ditemukan';
            return $this->respondCreated($response);
        }

        $db->transStart();
        if ($dataTransaksi->jumlah_terjual != $data['jumlah_terjual']) {
            $newStock = ($dataBarang->stock + $dataTransaksi->jumlah_terjual) - $data['jumlah_terjual'];
            if ($data['jumlah_terjual'] > ($dataBarang->stock + $dataTransaksi->jumlah_terjual)) {
                $response['status'] = 400;
                $response['message'] = 'stock Barang tidak cukup';
                return $this->respondCreated($response);
            } else {
                $modelBarang->update($data['id_barang'], [
                    'stock' => $newStock
                ]);
                if ($db->transStatus() === false) {
                    $db->transRollback();
                    $response['status'] = 400;
                    $response['message'] = 'Gagal ubah stock';
                    return $this->respondCreated($response);
                }
                $modelTransaksi->update($id, $data);
                $db->transComplete();
                $response['message'] = 'Data berhasil diubah';
                return $this->respondCreated($response);
            }
        } else {
            $modelTransaksi->update($id, $data);
            $response['message'] = 'Data berhasil diubah';
            return $this->respondCreated($response);
        }
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        $db = db_connect();
        $response = [
            'status' => 200,
            'error' => [],
            'message' => ''
        ];

        $modelTransaksi = new TransaksiModel();
        $modelTransaksi->where(['id' => $id]);
        $dataTransaksi = $modelTransaksi->get()->getRow();
        if (!$dataTransaksi) {
            $response['status'] = 400;
            $response['message'] = 'Transaksi tidak ditemukan';
            return $this->respondCreated($response);
        }

        $modelBarang = new BarangModel();
        $modelBarang->where(['id' => $dataTransaksi->id_barang]);
        $dataBarang = $modelBarang->get()->getRow();
        if (!$dataBarang) {
            $response['status'] = 400;
            $response['message'] = 'Barang tidak ditemukan';
            return $this->respondCreated($response);
        }

        $db->transStart();
        $modelBarang->update($dataTransaksi->id_barang, [
            'stock' => $dataBarang->stock + $dataTransaksi->jumlah_terjual
        ]);
        if ($db->transStatus() === false) {
            $db->transRollback();
            $response['status'] = 400;
            $response['message'] = 'Gagal ubah stock';
            return $this->respondCreated($response);
        }
        $modelTransaksi->delete($id);
        $db->transComplete();
        $response['message'] = 'Data berhasil dihapus';
        return $this->respond($response);
    }
}
