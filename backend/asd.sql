-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table fullstack_db.barang
CREATE TABLE IF NOT EXISTS `barang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_barang` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `stock` int NOT NULL,
  `id_jenis_barang` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_jenis_barang` (`id_jenis_barang`),
  CONSTRAINT `fk_jenis_barang` FOREIGN KEY (`id_jenis_barang`) REFERENCES `jenis_barang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table fullstack_db.barang: ~1 rows (approximately)
INSERT INTO `barang` (`id`, `nama_barang`, `stock`, `id_jenis_barang`) VALUES
	(1, 'KOPI', 90, 10);

-- Dumping structure for table fullstack_db.jenis_barang
CREATE TABLE IF NOT EXISTS `jenis_barang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jenis_barang` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table fullstack_db.jenis_barang: ~3 rows (approximately)
INSERT INTO `jenis_barang` (`id`, `jenis_barang`) VALUES
	(10, 'asdf'),
	(11, 'asdfasdf'),
	(12, 'IYAaaaa');

-- Dumping structure for table fullstack_db.transaksi
CREATE TABLE IF NOT EXISTS `transaksi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_barang` int DEFAULT NULL,
  `jumlah_terjual` int DEFAULT NULL,
  `tanggal_transaksi` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_barang` (`id_barang`),
  CONSTRAINT `fk_barang` FOREIGN KEY (`id_barang`) REFERENCES `barang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table fullstack_db.transaksi: ~4 rows (approximately)
INSERT INTO `transaksi` (`id`, `id_barang`, `jumlah_terjual`, `tanggal_transaksi`) VALUES
	(3, 1, 13, '2023-09-09'),
	(4, 1, 10, '2023-09-08'),
	(5, 1, 10, '2023-08-08'),
	(6, 1, 10, '2023-08-08');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
