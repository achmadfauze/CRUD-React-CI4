<?php

namespace App\Controllers;

use App\Models\BarangModel;
use App\Models\JenisBarangModel;
use App\Models\TransaksiModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

class Report extends ResourceController
{
    use ResponseTrait;
    public function getBarangTerbanyakTerjual()
    {
        $transaksiModel = new TransaksiModel();

        $terbanyak = $transaksiModel->select('jenis_barang.id,jenis_barang.jenis_barang,SUM(jumlah_terjual) as total_terjual')->join('barang', 'barang.id = transaksi.id_barang')->join('jenis_barang', 'jenis_barang.id = barang.id_jenis_barang');

        $body = $this->request->getJSON();

        if (isset($body->tanggalAwal) && isset($body->tanggalAkhir)) {

            $tanggalAwal = date('Y-m-d', strtotime($body->tanggalAwal));
            $tanggalAkhir = date('Y-m-d', strtotime($body->tanggalAkhir));

            $transaksiModel->where('tanggal_transaksi >=', $tanggalAwal)->where('tanggal_transaksi <=', $tanggalAkhir)->groupBy('jenis_barang.id')->orderBy('total_terjual', 'DESC');

            $terbanyak = $transaksiModel->get();
        }
        $terendah = $transaksiModel->select('jenis_barang.id,jenis_barang.jenis_barang,SUM(jumlah_terjual) as total_terjual')->join('barang', 'barang.id = transaksi.id_barang')->join('jenis_barang', 'jenis_barang.id = barang.id_jenis_barang');
        $body = $this->request->getJSON();

        if (isset($body->tanggalAwal) && isset($body->tanggalAkhir)) {

            $tanggalAwal = date('Y-m-d', strtotime($body->tanggalAwal));
            $tanggalAkhir = date('Y-m-d', strtotime($body->tanggalAkhir));

            $transaksiModel->where('tanggal_transaksi >=', $tanggalAwal)->where('tanggal_transaksi <=', $tanggalAkhir)->groupBy('jenis_barang.id')->orderBy('total_terjual', 'ASC');

            $terendah = $transaksiModel->get();
        }

        $response = [
            'status' => 200,
            'data' => ["Transaksi Terbanyak:" => $terbanyak->getRow(), "Transaksi Terendah:" => $terendah->getRow()],
            'error' => [],
            'message' => ''
        ];

        return $this->respond($response);
    }
}
