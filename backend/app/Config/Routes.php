<?php

use CodeIgniter\Router\RouteCollection;


/**
 * @var RouteCollection $routes
 */
// $routes->get('/', 'Home::index');
$routes->resource('transaksi');
$routes->post('/listTransaksi', 'App\Controllers\Transaski::index');
$routes->post('/rangeTransaksi', 'Report::getBarangTerbanyakTerjual');

$routes->resource('barang');
$routes->resource('jenisbarang');
