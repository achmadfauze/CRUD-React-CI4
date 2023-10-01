<?php

namespace App\Controllers;

use App\Models\BarangModel;
use App\Models\TransaksiModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class Barang extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;

    public function index($id = null)
    {
        $model = new BarangModel();
        $model->select('barang.id, barang.stock, barang.nama_barang, jenis_barang.jenis_barang, barang.id_jenis_barang');
        $model->join('jenis_barang', 'jenis_barang.id = barang.id_jenis_barang');

        // Get query parameters from the URL
        $searchValue = $this->request->getGet('searchValue');
        $searchColumn = $this->request->getGet('searchColumn');
        $orderColumn = $this->request->getGet('orderColumn');
        $orderDir = $this->request->getGet('orderDir');

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
        $modelBarang = new BarangModel();
        $modelBarang->select('barang.id, barang.stock,barang.nama_barang, jenis_barang.jenis_barang');
        $modelBarang->join('jenis_barang', 'jenis_barang.id = barang.id_jenis_barang');
        $modelBarang->where(['barang.id' => $id]);
        $dataBarang = $modelBarang->get()->getRow();
        if (!$dataBarang) {
            $response['status'] = 400;
            $response['message'] = 'Barang tidak ditemukan';
            return $this->respondCreated($response);
        }
        $response['data'] = $dataBarang;
        return $this->respondCreated($response);
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        helper(['form']);
        $rules = [
            'nama_barang' => 'required',
            'stock' => 'required',
            'id_jenis_barang' => 'required',
        ];
        $data = [
            'nama_barang' => $this->request->getVar('nama_barang'),
            'stock' => $this->request->getVar('stock'),
            'id_jenis_barang' => $this->request->getVar('id_jenis_barang')
        ];
        if (!$this->validate($rules)) return $this->fail($this->validator->getErrors());
        $model = new BarangModel();
        $model->save($data);
        $response = [
            'status' => 200,
            'error' => [],
            'message' => 'Data berhasil ditambah'
        ];
        return $this->respondCreated($response);
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        helper(['form']);
        $rules = [
            'nama_barang' => 'required',
            'stock' => 'required',
            'id_jenis_barang' => 'required',
        ];
        $data = [
            'nama_barang' => $this->request->getVar('nama_barang'),
            'stock' => $this->request->getVar('stock'),
            'id_jenis_barang' => $this->request->getVar('id_jenis_barang')
        ];
        if (!$this->validate($rules)) return $this->fail($this->validator->getErrors());
        $model = new BarangModel();
        $findById = $model->find(['id' => $id]);
        if (!$findById) return $this->failNotFound('No data Found');
        $model->update($id, $data);

        $response = [
            'status' => 200,
            'error' => [],
            'message' => 'Data berhasil diubah'
        ];
        return $this->respond($response);
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        $response = [
            'status' => 200,
            'error' => [],
            'message' => ''
        ];

        $modelBarang = new BarangModel();
        $modelBarang->where(['barang.id' => $id]);
        $dataBarang = $modelBarang->get()->getRow();
        if (!$dataBarang) {
            $response['status'] = 400;
            $response['message'] = 'Barang tidak ditemukan';
            return $this->respondCreated($response);
        }

        $modelTransaksi = new TransaksiModel();
        $modelTransaksi->where(['id_barang' => $dataBarang->id]);
        $dataTransaksi = $modelTransaksi->get()->getRow();
        if ($dataTransaksi) {
            $response['status'] = 400;
            $response['message'] = 'Barang digunakan pada Transaksi';
            return $this->respondCreated($response);
        }
        $modelBarang->delete($id);
        $response['message'] = 'Data berhasil dihapus';
        return $this->respond($response);
    }
}
