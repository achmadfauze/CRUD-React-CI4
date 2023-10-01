<?php

namespace App\Models;

use CodeIgniter\Model;

class BarangModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'barang';
    protected $primaryKey       = 'id';
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['nama_barang', 'stock', 'id_jenis_barang'];

    public function getBarangWithJenisBarang($search = '')
    {
        $sql = $this->select('barang.id as id_barang, barang.nama_barang, barang.stock, jenis_barang.jenis_barang')
            ->join('jenis_barang', 'jenis_barang.id = barang.id_jenis_barang');
        if ($search != '') {
            $sql->like('nama_barang', $search, 'after');
        }
        return $sql->find();
    }
    // Dates
    protected $useTimestamps = false;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];
}
