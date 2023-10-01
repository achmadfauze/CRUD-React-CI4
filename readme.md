jika ada waktu lebih
di frontend saya akan merappihkan struktur folder, dan membuat coding reusable dan S.O.L.I.D principle
backend saya akan memilih framework yang terbaru dan memikirkan library orm agar tidak rentan terhadap bugs
yang dapat meretas backend contoh: SQL Injection

menu:

1. jenis barang, berisi data jenis barang
   - tidak dapat menghapus data jika data jenis barang terpakai pada data barang
   - CRUD dan pencarian data
2. barang, berisi data barang
   - tidak dapat menghapus data jika data barang terpakai pada data transaksi
   - CRUD dan pencarian data
3. transaksi, berisi data transaksi
   - tidak dapat merubah nama barang, hanya dapat mengubah jumlah terjual dan tanggal transaksi
   - CRUD dan pencarian data
   - dapat melakukan sorting ascending/descending berdasarkan nama barang dan tanggal transaksi
4. report, berisi laporan jenis barang terbanyak dan terendah terjual berdasarkan rentang waktu
