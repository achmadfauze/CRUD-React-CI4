<?php

namespace App\Controllers;

use App\Models\BarangModel;
use App\Models\JenisBarangModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class JenisBarang extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;

    public function index($id = null)
    {
        $model = new JenisBarangModel();

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
        $modelJenisBarang = new JenisBarangModel();
        $modelJenisBarang->where(['id' => $id]);
        $dataJenisBarang = $modelJenisBarang->get()->getRow();
        if (!$dataJenisBarang) {
            $response['status'] = 400;
            $response['message'] = 'Jenis Barang not found';
            return $this->respondCreated($response);
        }
        $response['data'] = $dataJenisBarang;
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
            'jenis_barang' => 'required',
        ];
        $data = [
            'jenis_barang' => $this->request->getVar('jenis_barang')
        ];
        if (!$this->validate($rules)) return $this->fail($this->validator->getErrors());
        $model = new JenisBarangModel();
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
            'jenis_barang' => 'required',
        ];
        $data = [
            'jenis_barang' => $this->request->getVar('jenis_barang')
        ];
        if (!$this->validate($rules)) return $this->fail($this->validator->getErrors());
        $model = new JenisBarangModel();
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

        $modelJenisBarang = new JenisBarangModel();
        $modelJenisBarang->where(['id' => $id]);
        $dataJenisBarang = $modelJenisBarang->get()->getRow();
        if (!$dataJenisBarang) {
            $response['status'] = 400;
            $response['message'] = 'Jenis Barang tidak ada';
            return $this->respondCreated($response);
        }

        $modelBarang = new BarangModel();
        $modelBarang->where(['id_jenis_barang' => $dataJenisBarang->id]);
        $dataBarang = $modelBarang->get()->getRow();
        if ($dataBarang) {
            $response['status'] = 400;
            $response['message'] = 'Jenis barang digunakan pada Barang';
            return $this->respondCreated($response);
        }
        $modelJenisBarang->delete($id);
        $response['message'] = 'Data berhasil dihapus';
        return $this->respond($response);
    }
}
