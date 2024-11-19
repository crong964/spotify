-- --------------------------------------------------------
-- Host:                         store-huy91027-8633.aivencloud.com
-- Server version:               8.0.30 - Source distribution
-- Server OS:                    Linux
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for defaultdb
CREATE DATABASE IF NOT EXISTS `defaultdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `defaultdb`;

-- Dumping structure for table defaultdb.account
CREATE TABLE IF NOT EXISTS `account` (
  `id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Account` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Password` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`Account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table defaultdb.account: ~8 rows (approximately)
INSERT INTO `account` (`id`, `Account`, `Password`) VALUES
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'admin', 'admin@admin'),
	('9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', 'DenVau@pmq.com', 'huy@huy123'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'huy91027@gmail.com', 'huy@huy123'),
	('user-f251a07e-7465-477b-9fa6-ee0a9f85c52d-1723366291936', 'huyihuy140@gmail.com', ''),
	('user-c7438792-5c68-466d-ae19-25aef6856bc2', 'nhanvien', 'huy@huy123'),
	('user-9a6bf20a-dcee-4adf-81cf-e18a524a98b9', 'nhanvien2', 'huy@huy123'),
	('user-7364e787-c5e0-495f-852c-9d7850b817ef', 'nhanvien3', 'huy@huy123'),
	('42a9314d-5f14-4786-88ab-604359aa75e1', 'PhanManhQuynh@pmq.com', 'huy@huy123'),
	('51925ca6-74c6-418d-9273-793061b05aa6', 'sontungmtp@enter.com', 'huy@huy123');

-- Dumping structure for table defaultdb.artistmanagement
CREATE TABLE IF NOT EXISTS `artistmanagement` (
  `idArtist` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `createtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idArtist`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table defaultdb.artistmanagement: ~9 rows (approximately)
INSERT INTO `artistmanagement` (`idArtist`, `createtime`) VALUES
	('artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', '2024-07-01 03:26:10'),
	('artist-37d07bbb-b815-488f-baa5-6c25cbe4ba74-1725550799643', '2024-09-05 15:40:03'),
	('artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', '2024-07-01 04:24:58'),
	('artist-717aba39-8501-41c1-8a26-8f68c4b282e3-1725186015160', '2024-09-01 10:20:17'),
	('artist-7fc41326-845c-4791-a376-5a3efb60ff4b-1723107165384', '2024-08-08 08:52:48'),
	('artist-87cb9a4c-45d8-426a-bcac-9576677321f0-1725185616844', '2024-09-01 10:13:39'),
	('artist-a27f0b1b-85a8-4ac3-959b-0ebc907c5341', '2024-07-01 03:19:28'),
	('artist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104', '2024-09-02 13:18:18'),
	('artist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688', '2024-11-19 02:45:46'),
	('artist-e3f078e5-f587-4c18-a790-424e6dd64487-1725455195688', '2024-09-04 13:06:38'),
	('artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', '2024-06-25 23:25:10'),
	('artist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710', '2024-08-08 09:01:15'),
	('artist-edc7af80-63fc-44fc-a006-e94eb98653e1-1723107224461', '2024-08-08 08:53:47'),
	('artist-ee6b7fbc-e072-4a33-9e03-887fc1f82008-1725286552482', '2024-09-02 14:15:54'),
	('artist-f5dcc5f9-42b3-4095-b6b0-25ebef50c74f-1723107564598', '2024-08-08 08:59:27'),
	('artist-fd1ff219-ee15-45ff-baa5-316e29bd8998-1723110503718', '2024-08-08 09:48:26'),
	('artist-fe79e6f5-1ebe-4223-9b00-3e00c16af0bd', '2024-07-04 14:07:33');

-- Dumping structure for table defaultdb.boxchat
CREATE TABLE IF NOT EXISTS `boxchat` (
  `idBox` varchar(100) COLLATE utf8mb3_vietnamese_ci NOT NULL,
  `Ngay` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `content` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_vietnamese_ci DEFAULT '',
  `id` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_vietnamese_ci DEFAULT NULL,
  `boxtype` varchar(100) COLLATE utf8mb3_vietnamese_ci NOT NULL DEFAULT 'nofirend',
  `boxiamge` varchar(100) COLLATE utf8mb3_vietnamese_ci DEFAULT NULL,
  `updateDay` datetime DEFAULT NULL,
  `messType` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`idBox`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_vietnamese_ci;

-- Dumping data for table defaultdb.boxchat: ~5 rows (approximately)
INSERT INTO `boxchat` (`idBox`, `Ngay`, `content`, `id`, `boxtype`, `boxiamge`, `updateDay`, `messType`) VALUES
	('idbox-54858f9c-e336-4cad-923d-985cbfc60e15', '2024-08-18 14:56:18', '', NULL, 'friend', NULL, NULL, NULL),
	('idbox-6acf7197-951e-45ca-bfc2-a984997d6501', '2024-04-11 09:05:30', '', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 'noFriend', NULL, '2024-04-14 19:56:02', 'Mess'),
	('idbox-af322496-7c64-4592-8c98-a9e0dbce8285', '2024-08-18 14:58:23', '', NULL, 'noFriend', NULL, NULL, NULL),
	('idbox-deae105f-13a3-4656-bd1e-d2c669c238ff', '2024-04-10 10:00:08', '', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 'noFriend', NULL, '2024-04-14 19:55:59', 'Mess'),
	('idbox-ff455627-b907-4ede-b7a0-f9371a20703d', '2024-04-11 09:15:28', '<script>alert("hello xxs")</script></p>', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 'noFriend', NULL, '2024-08-21 09:00:22', 'Mess');

-- Dumping structure for table defaultdb.contain
CREATE TABLE IF NOT EXISTS `contain` (
  `Song_ID` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `PlayList_id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `TimeCreate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `PlayList_id` (`PlayList_id`,`Song_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table defaultdb.contain: ~167 rows (approximately)
INSERT INTO `contain` (`Song_ID`, `PlayList_id`, `TimeCreate`) VALUES
	('1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-04-01 21:26:30'),
	('1f78e78f-18c0-405c-abe3-71ffd1fc0397', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-06-25 20:49:22'),
	('381b6b5e-305f-4cbc-a3bf-7707147c8804', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-04-01 21:26:30'),
	('50d8169a-a6da-4856-bb75-c0283f9849ae', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-04-01 21:26:30'),
	('67a81238-3348-4cdf-b953-5096df977e27', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-06-25 20:49:22'),
	('82a0e146-1b63-4194-a0f8-cfb1913f50dc', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-06-25 20:49:22'),
	('837b3000-7ec2-4c85-a8fa-bc088cc0074e', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-06-25 20:49:22'),
	('9bb2ddba-abfa-474a-ac84-d7952a51ad7e', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-06-25 20:49:22'),
	('b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-06-25 20:49:22'),
	('b53c3193-7a3f-4005-861b-52eca46f9381', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-06-25 20:49:22'),
	('e17363fa-82d8-4ca4-8dee-ce1b62bcf995', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-06-25 20:49:22'),
	('ecdba929-6516-46b3-b507-36d2c854b947', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-06-25 20:49:22'),
	('ef9012fd-f635-49b5-918b-874c806a6b40', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-06-25 20:49:22'),
	('f6e0a637-d439-49d2-b720-edb8f9c750f5', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-06-25 20:49:22'),
	('song-09bf528d-f36d-4092-a0c1-30ce3c75c133', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-08-06 09:09:22'),
	('song-0ffc9672-199c-4571-bf2d-1acba562fee6', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-08-06 09:09:22'),
	('song-1cf0a064-ca61-47d0-b3ad-d659359e77a1', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-08-06 09:09:22'),
	('song-1d91e5de-acd7-499e-b79a-11ba8f916c90', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-08-06 09:09:22'),
	('song-36d7e699-f13e-4746-93ba-0755345cb06d', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-08-06 09:09:22'),
	('song-37999a9e-3ca8-4346-b4ba-d6e256e8ffb5', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-08-06 09:09:22'),
	('song-3a759e1a-3432-4f0d-9fc2-c5c86c733259', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-08-06 09:09:22'),
	('song-49722cde-1ea6-4e7f-b552-b45ccc6a9f11', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-08-07 03:15:17'),
	('song-4f1658fb-0766-49b0-bd17-2706ced368e0', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-08-06 09:09:22'),
	('song-600838b4-efcc-40ae-86ae-8f3aa108d08b', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-08-06 09:09:22'),
	('song-729e7f87-e705-4164-83c3-a49bc4d8ab46', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-08-06 09:09:22'),
	('song-784d02fa-dc31-4c2f-9627-820889482e80', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-08-07 03:15:17'),
	('song-7ab6533d-db5d-4885-8e7a-a1e1d37d2800', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-08-07 03:15:17'),
	('song-93fdba3c-5398-45a0-adf7-375b5ef97a48', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-08-07 03:15:17'),
	('song-a3c722bd-ba0a-4ac3-9844-da80ae7731ed', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-08-07 03:15:17'),
	('song-a9a0721a-e1e6-494a-9643-1b63bc711005', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-08-07 03:15:17'),
	('f6e0a637-d439-49d2-b720-edb8f9c750f5', '42a9314d-5f14-4786-88ab-604359aa75e1', '2024-06-07 21:42:05'),
	('song-7a126c0e-ebe5-491e-8041-d520b396ef24', '42a9314d-5f14-4786-88ab-604359aa75e1', '2024-08-11 02:43:41'),
	('song-93fdba3c-5398-45a0-adf7-375b5ef97a48', '42a9314d-5f14-4786-88ab-604359aa75e1', '2024-07-07 15:50:08'),
	('song-c6240124-3a3b-446c-ad72-96beb41c4506', '42a9314d-5f14-4786-88ab-604359aa75e1', '2024-10-21 13:29:12'),
	('song-d5929fd7-3621-4b43-828c-ebfe89618c21', '42a9314d-5f14-4786-88ab-604359aa75e1', '2024-08-11 02:52:24'),
	('ef9012fd-f635-49b5-918b-874c806a6b40', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-06-07 21:43:44'),
	('song-0ffc9672-199c-4571-bf2d-1acba562fee6', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-07-10 04:37:18'),
	('song-1d91e5de-acd7-499e-b79a-11ba8f916c90', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-07-04 14:32:06'),
	('song-275e4c7f-99ce-4848-8c99-db6c8316f289', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-09-05 13:38:41'),
	('song-36d7e699-f13e-4746-93ba-0755345cb06d', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-07-05 11:39:30'),
	('song-37999a9e-3ca8-4346-b4ba-d6e256e8ffb5', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-07-10 04:03:11'),
	('song-45f37a25-fa22-4234-99c1-eebf02c5c6f4', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-09-02 08:39:18'),
	('song-478c4d87-f77e-49fd-9163-56685817540b', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-09-05 13:29:58'),
	('song-49722cde-1ea6-4e7f-b552-b45ccc6a9f11', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-07-05 11:24:06'),
	('song-4f1658fb-0766-49b0-bd17-2706ced368e0', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-07-05 11:10:20'),
	('song-600838b4-efcc-40ae-86ae-8f3aa108d08b', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-07-10 04:01:56'),
	('song-729e7f87-e705-4164-83c3-a49bc4d8ab46', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-07-05 11:36:26'),
	('song-7ab6533d-db5d-4885-8e7a-a1e1d37d2800', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-07-10 04:06:22'),
	('song-88382a76-7ced-4df5-b1e6-9a218bdd5cb8', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-09-02 08:58:14'),
	('song-a9a0721a-e1e6-494a-9643-1b63bc711005', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-07-10 04:14:18'),
	('song-aac27eea-cbc1-4031-be26-b0e0d5e6a25f', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-07-10 04:04:36'),
	('song-ab7da2ba-6079-434b-96b1-7742eb40c7d7', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-07-10 04:09:25'),
	('song-b769ab3f-f2bd-4c23-a41a-ec3f99e9f4dc', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-07-05 11:19:34'),
	('song-d539d44d-fdf0-41d5-ab2b-4bc5b3f2ba95', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-07-05 11:32:14'),
	('song-db7a06fe-3561-4b53-bd28-8151fb65bc44', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-09-05 13:51:05'),
	('1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-04-02 14:46:46'),
	('381b6b5e-305f-4cbc-a3bf-7707147c8804', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-07-05 11:13:12'),
	('50d8169a-a6da-4856-bb75-c0283f9849ae', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-07-05 11:13:12'),
	('67a81238-3348-4cdf-b953-5096df977e27', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-07-05 11:13:12'),
	('837b3000-7ec2-4c85-a8fa-bc088cc0074e', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-07-05 11:13:12'),
	('9bb2ddba-abfa-474a-ac84-d7952a51ad7e', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-07-05 11:13:12'),
	('aaa', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-07-05 11:13:12'),
	('b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-07-05 11:13:12'),
	('b53c3193-7a3f-4005-861b-52eca46f9381', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-07-05 11:13:12'),
	('e17363fa-82d8-4ca4-8dee-ce1b62bcf995', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-07-05 11:13:12'),
	('ecdba929-6516-46b3-b507-36d2c854b947', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-07-05 11:13:12'),
	('f6e0a637-d439-49d2-b720-edb8f9c750f5', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-07-05 11:13:12'),
	('song-09bf528d-f36d-4092-a0c1-30ce3c75c133', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-08-06 09:09:58'),
	('song-0ffc9672-199c-4571-bf2d-1acba562fee6', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-08-06 09:09:58'),
	('song-19da69ea-95be-4cbe-bd44-f478d351f3a2', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-08-06 09:09:58'),
	('song-1d91e5de-acd7-499e-b79a-11ba8f916c90', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-07-05 11:13:12'),
	('song-36d7e699-f13e-4746-93ba-0755345cb06d', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-08-06 09:09:58'),
	('song-37999a9e-3ca8-4346-b4ba-d6e256e8ffb5', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-08-06 09:09:58'),
	('song-3a759e1a-3432-4f0d-9fc2-c5c86c733259', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-07-05 11:13:12'),
	('song-49722cde-1ea6-4e7f-b552-b45ccc6a9f11', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-08-06 09:09:58'),
	('song-4f1658fb-0766-49b0-bd17-2706ced368e0', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-08-06 09:09:58'),
	('song-51ccac5e-9514-45fc-88bc-d1b18485daa7', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-07-05 11:13:12'),
	('song-533f87a8-965d-4a83-91ff-57b446085a9d', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-07-05 11:13:12'),
	('song-600838b4-efcc-40ae-86ae-8f3aa108d08b', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-08-06 09:09:58'),
	('song-729e7f87-e705-4164-83c3-a49bc4d8ab46', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-08-06 09:09:58'),
	('song-784d02fa-dc31-4c2f-9627-820889482e80', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-07-05 11:13:12'),
	('song-7ab6533d-db5d-4885-8e7a-a1e1d37d2800', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-08-06 09:09:58'),
	('381b6b5e-305f-4cbc-a3bf-7707147c8804', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', '2024-06-07 21:44:15'),
	('e17363fa-82d8-4ca4-8dee-ce1b62bcf995', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', '2024-06-07 21:44:15'),
	('song-0872b219-c9e9-40be-b5ca-2243067fc5f2', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', '2024-07-16 13:54:22'),
	('song-09bf528d-f36d-4092-a0c1-30ce3c75c133', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', '2024-07-10 05:06:15'),
	('song-533f87a8-965d-4a83-91ff-57b446085a9d', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', '2024-07-01 09:46:59'),
	('1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-04-02 15:04:21'),
	('1f78e78f-18c0-405c-abe3-71ffd1fc0397', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-06-25 20:48:57'),
	('381b6b5e-305f-4cbc-a3bf-7707147c8804', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-04-02 15:04:21'),
	('50d8169a-a6da-4856-bb75-c0283f9849ae', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-06-25 20:48:57'),
	('837b3000-7ec2-4c85-a8fa-bc088cc0074e', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-04-02 15:04:21'),
	('9bb2ddba-abfa-474a-ac84-d7952a51ad7e', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-04-02 15:04:21'),
	('b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-04-02 15:04:21'),
	('b53c3193-7a3f-4005-861b-52eca46f9381', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-04-02 15:06:07'),
	('e17363fa-82d8-4ca4-8dee-ce1b62bcf995', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-04-02 15:06:07'),
	('ecdba929-6516-46b3-b507-36d2c854b947', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-06-25 20:48:57'),
	('ef9012fd-f635-49b5-918b-874c806a6b40', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-06-25 20:48:57'),
	('f6e0a637-d439-49d2-b720-edb8f9c750f5', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-06-25 20:48:57'),
	('song-4f1658fb-0766-49b0-bd17-2706ced368e0', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-08-07 03:15:42'),
	('song-600838b4-efcc-40ae-86ae-8f3aa108d08b', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-08-07 03:15:42'),
	('song-729e7f87-e705-4164-83c3-a49bc4d8ab46', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-08-07 03:15:42'),
	('song-784d02fa-dc31-4c2f-9627-820889482e80', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-08-07 03:15:42'),
	('song-7ab6533d-db5d-4885-8e7a-a1e1d37d2800', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-08-07 03:15:42'),
	('song-93fdba3c-5398-45a0-adf7-375b5ef97a48', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-08-07 03:15:42'),
	('song-a3c722bd-ba0a-4ac3-9844-da80ae7731ed', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-08-07 03:15:42'),
	('song-a9a0721a-e1e6-494a-9643-1b63bc711005', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-08-07 03:15:42'),
	('song-aac27eea-cbc1-4031-be26-b0e0d5e6a25f', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-08-07 03:15:42'),
	('song-ab7da2ba-6079-434b-96b1-7742eb40c7d7', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-08-07 03:15:42'),
	('song-b769ab3f-f2bd-4c23-a41a-ec3f99e9f4dc', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-08-07 03:15:42'),
	('song-d539d44d-fdf0-41d5-ab2b-4bc5b3f2ba95', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-08-07 03:15:42'),
	('song-f29bddea-56c9-415f-980d-491d489a5732', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-08-07 03:15:42'),
	('381b6b5e-305f-4cbc-a3bf-7707147c8804', 'artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', '2024-07-01 03:34:02'),
	('song-104bc6e6-0fef-47e0-8711-b7927848f523', 'artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', '2024-09-01 14:43:23'),
	('song-533f87a8-965d-4a83-91ff-57b446085a9d', 'artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', '2024-07-01 09:46:59'),
	('song-784d02fa-dc31-4c2f-9627-820889482e80', 'artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', '2024-07-01 09:06:58'),
	('song-a3c722bd-ba0a-4ac3-9844-da80ae7731ed', 'artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', '2024-07-01 09:55:04'),
	('song-c7bf148f-c85e-47ad-88ef-e44ed8bd7a27', 'artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', '2024-09-05 15:44:51'),
	('song-c7bf148f-c85e-47ad-88ef-e44ed8bd7a27', 'artist-37d07bbb-b815-488f-baa5-6c25cbe4ba74-1725550799643', '2024-09-05 15:43:48'),
	('837b3000-7ec2-4c85-a8fa-bc088cc0074e', 'artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', '2024-07-01 04:25:05'),
	('song-0872b219-c9e9-40be-b5ca-2243067fc5f2', 'artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', '2024-07-16 13:54:33'),
	('song-1cf0a064-ca61-47d0-b3ad-d659359e77a1', 'artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', '2024-07-04 14:01:30'),
	('song-3099d47b-0ff1-44cd-a46c-616d206f0292', 'artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', '2024-08-30 15:51:08'),
	('song-3a759e1a-3432-4f0d-9fc2-c5c86c733259', 'artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', '2024-07-01 08:53:46'),
	('song-51fc786f-155b-455c-a918-5e1b3f0fe649', 'artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', '2024-08-07 03:11:55'),
	('song-533f87a8-965d-4a83-91ff-57b446085a9d', 'artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', '2024-07-01 09:46:31'),
	('song-f29bddea-56c9-415f-980d-491d489a5732', 'artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', '2024-07-01 08:08:08'),
	('song-f696fb26-5004-4136-8621-02cce631e173', 'artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', '2024-08-08 10:03:54'),
	('song-7179a1b0-6657-47c1-9cbf-37bb6956ee6a', 'artist-717aba39-8501-41c1-8a26-8f68c4b282e3-1725186015160', '2024-09-01 10:23:06'),
	('song-858a0871-ff5b-47f2-bdda-88ca679b141b', 'artist-717aba39-8501-41c1-8a26-8f68c4b282e3-1725186015160', '2024-09-01 13:16:08'),
	('song-9c4ca4f2-5085-409c-a413-5c30d4f042ad', 'artist-717aba39-8501-41c1-8a26-8f68c4b282e3-1725186015160', '2024-09-01 13:01:58'),
	('song-edc5de55-7c18-4782-8e38-b641a50a2994', 'artist-717aba39-8501-41c1-8a26-8f68c4b282e3-1725186015160', '2024-11-18 15:48:47'),
	('song-10652f8a-6e9c-47b9-acb2-6ef44c21977c', 'artist-87cb9a4c-45d8-426a-bcac-9576677321f0-1725185616844', '2024-09-01 10:49:36'),
	('song-4b8528bb-d89a-4613-be22-412fabe6bde8', 'artist-87cb9a4c-45d8-426a-bcac-9576677321f0-1725185616844', '2024-09-02 04:14:26'),
	('song-7179a1b0-6657-47c1-9cbf-37bb6956ee6a', 'artist-87cb9a4c-45d8-426a-bcac-9576677321f0-1725185616844', '2024-09-01 10:25:37'),
	('song-982f10b9-42ec-4af8-9de8-7f77f623913b', 'artist-87cb9a4c-45d8-426a-bcac-9576677321f0-1725185616844', '2024-09-01 13:53:21'),
	('song-5ce1a02d-9830-444e-9495-0f6629effd92', 'artist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104', '2024-09-02 13:38:43'),
	('song-a636ab8d-bed9-43df-b1e2-01161aeceb5f', 'artist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104', '2024-09-02 14:02:24'),
	('song-b1d95327-057f-4a9f-abec-8eba59ea9371', 'artist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104', '2024-09-02 13:26:35'),
	('song-dcf2696a-bad3-4046-8101-64b3e943a3bf', 'artist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104', '2024-09-02 13:19:33'),
	('song-e2497509-d209-44cd-8af0-e077f6f182e7', 'artist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104', '2024-09-02 13:47:48'),
	('song-0be4bfaf-2c6d-4aa7-bc41-52958c1234cd', 'artist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688', '2024-11-19 03:26:03'),
	('song-1d7422a0-38e9-4d54-ba74-df0dc415cd61', 'artist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688', '2024-11-19 03:47:05'),
	('song-5d078f4a-08dd-4d12-b1ec-57c70e19ac27', 'artist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688', '2024-11-19 04:08:22'),
	('song-8bbae5ba-093b-47c1-9a4d-9fddc39eeecb', 'artist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688', '2024-11-19 03:52:07'),
	('song-b987433e-b777-40c4-8e84-edf3dca11b64', 'artist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688', '2024-11-19 03:59:20'),
	('song-bdc3f005-cad3-438d-97cf-475a01c5cae6', 'artist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688', '2024-11-19 03:42:10'),
	('song-f6d98097-3555-4a83-9838-84cbae4a3bd3', 'artist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688', '2024-11-19 03:31:32'),
	('song-279034ba-af64-4b30-8342-09aa24557a2d', 'artist-e3f078e5-f587-4c18-a790-424e6dd64487-1725455195688', '2024-09-04 13:20:02'),
	('song-5c3b562d-bf3c-490c-a8c1-c119294e2820', 'artist-e3f078e5-f587-4c18-a790-424e6dd64487-1725455195688', '2024-09-04 13:24:27'),
	('song-19da69ea-95be-4cbe-bd44-f478d351f3a2', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', '2024-06-27 22:26:02'),
	('song-43b4a4c4-4b1e-4293-a800-e8cd18008028', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', '2024-07-14 04:14:27'),
	('song-878cd831-fdb8-4623-9305-fabbb69395ca', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', '2024-06-27 21:59:52'),
	('song-945e2d3b-1652-4fb3-970a-c36ce43282bc', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', '2024-06-27 22:10:50'),
	('song-94abb065-3617-49a5-96cd-7688733c5472', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', '2024-10-25 13:56:00'),
	('song-d2ba7c4e-e4b2-440a-8252-a7a488ac5439', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', '2024-06-26 23:01:37'),
	('song-e8d60f40-8142-4c10-b1c1-014b257c2f48', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', '2024-06-29 03:41:55'),
	('song-f4381e2c-c4a5-4c1d-bf4c-dd4f03aef3de', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', '2024-06-27 22:42:51'),
	('song-10652f8a-6e9c-47b9-acb2-6ef44c21977c', 'artist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710', '2024-09-01 10:48:02'),
	('song-1acbe83f-cfac-4359-a242-20090273f7d0', 'artist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710', '2024-08-08 09:43:18'),
	('song-4b8528bb-d89a-4613-be22-412fabe6bde8', 'artist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710', '2024-09-02 04:09:02'),
	('song-63810c36-0bfe-448c-9fca-ab6865a9b557', 'artist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710', '2024-08-08 09:52:53'),
	('song-e4e99454-add9-4bbf-a77b-ad3e56699c3b', 'artist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710', '2024-08-08 09:57:41'),
	('song-f19d4db3-0087-4224-961a-f977afd194a4', 'artist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710', '2024-08-08 09:35:33'),
	('song-33790516-d0c7-4535-8865-d18949565652', 'artist-ee6b7fbc-e072-4a33-9e03-887fc1f82008-1725286552482', '2024-09-02 14:16:24'),
	('song-cf0b9b88-603f-435c-b7f9-b35935b76480', 'artist-ee6b7fbc-e072-4a33-9e03-887fc1f82008-1725286552482', '2024-09-02 14:27:49'),
	('song-63810c36-0bfe-448c-9fca-ab6865a9b557', 'artist-fd1ff219-ee15-45ff-baa5-316e29bd8998-1723110503718', '2024-08-08 09:55:19'),
	('song-7cb9bc65-e600-4d10-9204-8a58e35d1fcc', 'artist-fd1ff219-ee15-45ff-baa5-316e29bd8998-1723110503718', '2024-08-08 10:47:07'),
	('song-e4e99454-add9-4bbf-a77b-ad3e56699c3b', 'artist-fd1ff219-ee15-45ff-baa5-316e29bd8998-1723110503718', '2024-08-08 09:58:04'),
	('song-51fc786f-155b-455c-a918-5e1b3f0fe649', 'artist-fe79e6f5-1ebe-4223-9b00-3e00c16af0bd', '2024-08-07 03:06:22'),
	('1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-04-02 14:44:56'),
	('1f78e78f-18c0-405c-abe3-71ffd1fc0397', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-06-25 20:48:36'),
	('381b6b5e-305f-4cbc-a3bf-7707147c8804', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-04-02 14:45:18'),
	('50d8169a-a6da-4856-bb75-c0283f9849ae', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-04-02 14:45:59'),
	('67a81238-3348-4cdf-b953-5096df977e27', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-04-02 14:45:23'),
	('82a0e146-1b63-4194-a0f8-cfb1913f50dc', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-06-25 20:48:36'),
	('837b3000-7ec2-4c85-a8fa-bc088cc0074e', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-06-25 20:48:36'),
	('9bb2ddba-abfa-474a-ac84-d7952a51ad7e', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-06-25 20:48:36'),
	('b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-06-25 20:48:36'),
	('b53c3193-7a3f-4005-861b-52eca46f9381', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-04-01 21:33:34'),
	('e17363fa-82d8-4ca4-8dee-ce1b62bcf995', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-04-02 14:45:27'),
	('ecdba929-6516-46b3-b507-36d2c854b947', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-04-01 21:33:34'),
	('ef9012fd-f635-49b5-918b-874c806a6b40', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-06-25 20:48:36'),
	('f6e0a637-d439-49d2-b720-edb8f9c750f5', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-06-25 20:48:36'),
	('song-09bf528d-f36d-4092-a0c1-30ce3c75c133', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-0ffc9672-199c-4571-bf2d-1acba562fee6', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-19da69ea-95be-4cbe-bd44-f478d351f3a2', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-43b4a4c4-4b1e-4293-a800-e8cd18008028', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-4f1658fb-0766-49b0-bd17-2706ced368e0', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-600838b4-efcc-40ae-86ae-8f3aa108d08b', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-729e7f87-e705-4164-83c3-a49bc4d8ab46', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-784d02fa-dc31-4c2f-9627-820889482e80', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-7ab6533d-db5d-4885-8e7a-a1e1d37d2800', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-878cd831-fdb8-4623-9305-fabbb69395ca', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-93fdba3c-5398-45a0-adf7-375b5ef97a48', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-945e2d3b-1652-4fb3-970a-c36ce43282bc', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-a9a0721a-e1e6-494a-9643-1b63bc711005', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-aac27eea-cbc1-4031-be26-b0e0d5e6a25f', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-ab7da2ba-6079-434b-96b1-7742eb40c7d7', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-b769ab3f-f2bd-4c23-a41a-ec3f99e9f4dc', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-d2ba7c4e-e4b2-440a-8252-a7a488ac5439', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-d539d44d-fdf0-41d5-ab2b-4bc5b3f2ba95', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-f29bddea-56c9-415f-980d-491d489a5732', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36'),
	('song-f4381e2c-c4a5-4c1d-bf4c-dd4f03aef3de', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-08-07 03:16:36');

-- Dumping structure for table defaultdb.discuss
CREATE TABLE IF NOT EXISTS `discuss` (
  `User_Id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Discuss_Id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Parent_discuss_Id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Replay_Discuss_Id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Replay_quality` int NOT NULL DEFAULT '0',
  `Content` varchar(200) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Type` tinyint NOT NULL DEFAULT '0',
  `Song_Id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `createtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `Song_Id` (`Song_Id`,`Discuss_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table defaultdb.discuss: ~1 rows (approximately)

-- Dumping structure for table defaultdb.following
CREATE TABLE IF NOT EXISTS `following` (
  `Following_User_Id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `User_ID` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table defaultdb.following: ~0 rows (approximately)

-- Dumping structure for table defaultdb.genre
CREATE TABLE IF NOT EXISTS `genre` (
  `Id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `createtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `RightGenre` int NOT NULL,
  `LeftGenre` int NOT NULL,
  `idParent` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Floor` int NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table defaultdb.genre: ~12 rows (approximately)
INSERT INTO `genre` (`Id`, `Name`, `createtime`, `RightGenre`, `LeftGenre`, `idParent`, `Floor`) VALUES
	('0a57712c-1d83-4d65-8d35-e931fb0c4e11', 'music', '2024-03-20 15:21:13', 23, 8, '0', 0),
	('34c696c6-e129-4a7b-93c2-e887daf485f6', 'Nhạc Việt', '2024-03-20 15:35:43', 14, 9, '0a57712c-1d83-4d65-8d35-e931fb0c4e11', 1),
	('450b9e50-3d98-4aef-aff3-a70a9d407f96', 'Nhạc trung', '2024-03-21 10:42:49', 20, 19, '0a57712c-1d83-4d65-8d35-e931fb0c4e11', 1),
	('5c34a9ba-38a3-4367-b7a4-2ee7ba0018a5', 'Hài kịch', '2024-03-20 15:35:20', 6, 5, 'ff9f2d78-513c-4071-979e-985e015793ff', 1),
	('a7b77b1c-902b-4417-9609-eb596aa187e4', 'Nhạc Việt Hay Nhất', '2024-04-01 21:19:29', 13, 12, '34c696c6-e129-4a7b-93c2-e887daf485f6', 2),
	('b30d08cd-d161-4cf7-ab92-bd445d212896', 'Nhạc Việt thịch hành', '2024-03-20 15:36:31', 11, 10, '34c696c6-e129-4a7b-93c2-e887daf485f6', 2),
	('c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Pop', '2024-03-20 15:35:53', 16, 15, '0a57712c-1d83-4d65-8d35-e931fb0c4e11', 1),
	('cffc2553-4cf3-48ae-ae10-2e70b8d5955b', 'Anime', '2024-06-26 21:29:47', 22, 21, '0a57712c-1d83-4d65-8d35-e931fb0c4e11', 1),
	('d7368df9-d960-4d20-ad9b-0f6286b78fa5', 'K-Pop', '2024-03-20 15:36:03', 18, 17, '0a57712c-1d83-4d65-8d35-e931fb0c4e11', 1),
	('de671b6a-13a8-440c-a258-85a333359be6', 'Tài liệu', '2024-03-20 15:35:11', 4, 3, 'ff9f2d78-513c-4071-979e-985e015793ff', 1),
	('f115ac15-bda0-45aa-9d68-c122ff2e3d99', 'Sư phạm', '2024-03-20 15:35:03', 2, 1, 'ff9f2d78-513c-4071-979e-985e015793ff', 1),
	('ff9f2d78-513c-4071-979e-985e015793ff', 'pobcast', '2024-03-20 15:21:06', 7, 0, '0', 0);

-- Dumping structure for table defaultdb.havelistboxchat
CREATE TABLE IF NOT EXISTS `havelistboxchat` (
  `idUser` varchar(100) COLLATE utf8mb3_vietnamese_ci NOT NULL,
  `idBox` varchar(100) COLLATE utf8mb3_vietnamese_ci NOT NULL,
  `Ngay` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int NOT NULL,
  `idFriend` varchar(100) COLLATE utf8mb3_vietnamese_ci NOT NULL,
  `admin` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_vietnamese_ci;

-- Dumping data for table defaultdb.havelistboxchat: ~8 rows (approximately)
INSERT INTO `havelistboxchat` (`idUser`, `idBox`, `Ngay`, `status`, `idFriend`, `admin`) VALUES
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'idbox-deae105f-13a3-4656-bd1e-d2c669c238ff', '2024-08-18 14:58:48', 0, '51925ca6-74c6-418d-9273-793061b05aa6', 0),
	('51925ca6-74c6-418d-9273-793061b05aa6', 'idbox-deae105f-13a3-4656-bd1e-d2c669c238ff', '2024-04-10 10:00:08', 2, '51925ca6-74c6-418d-9273-793061b05aa6', 0),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'idbox-6acf7197-951e-45ca-bfc2-a984997d6501', '2024-08-18 14:59:05', 0, '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', 0),
	('9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', 'idbox-6acf7197-951e-45ca-bfc2-a984997d6501', '2024-04-11 09:05:30', 2, 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 0),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'idbox-ff455627-b907-4ede-b7a0-f9371a20703d', '2024-08-22 14:26:14', 1, '42a9314d-5f14-4786-88ab-604359aa75e1', 0),
	('42a9314d-5f14-4786-88ab-604359aa75e1', 'idbox-ff455627-b907-4ede-b7a0-f9371a20703d', '2024-04-11 09:15:28', 2, 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 0),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'idbox-af322496-7c64-4592-8c98-a9e0dbce8285', '2024-08-18 14:58:31', 0, 'artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', 0),
	('artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', 'idbox-af322496-7c64-4592-8c98-a9e0dbce8285', '2024-08-18 14:58:23', 0, 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 0);

-- Dumping structure for table defaultdb.havelistfriends
CREATE TABLE IF NOT EXISTS `havelistfriends` (
  `idUser` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `idFriends` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `IsFriend` int NOT NULL DEFAULT '0',
  `look` int NOT NULL DEFAULT '0',
  UNIQUE KEY `idUser` (`idUser`,`idFriends`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table defaultdb.havelistfriends: ~2 rows (approximately)
INSERT INTO `havelistfriends` (`idUser`, `idFriends`, `IsFriend`, `look`) VALUES
	('42a9314d-5f14-4786-88ab-604359aa75e1', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 2, 0),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', '42a9314d-5f14-4786-88ab-604359aa75e1', 2, 0);

-- Dumping structure for table defaultdb.hiddenmesslist
CREATE TABLE IF NOT EXISTS `hiddenmesslist` (
  `idUser` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_vietnamese_ci NOT NULL,
  `idMess` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_vietnamese_ci;

-- Dumping data for table defaultdb.hiddenmesslist: ~0 rows (approximately)

-- Dumping structure for table defaultdb.likedsong
CREATE TABLE IF NOT EXISTS `likedsong` (
  `Id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `id_user_liked` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `liked` tinyint(1) NOT NULL DEFAULT '1',
  UNIQUE KEY `id_user_liked` (`id_user_liked`,`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table defaultdb.likedsong: ~75 rows (approximately)
INSERT INTO `likedsong` (`Id`, `id_user_liked`, `liked`) VALUES
	('1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', 'admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 0),
	('song-19da69ea-95be-4cbe-bd44-f478d351f3a2', 'admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 1),
	('song-43b4a4c4-4b1e-4293-a800-e8cd18008028', 'admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 1),
	('song-878cd831-fdb8-4623-9305-fabbb69395ca', 'admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 1),
	('1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('1f78e78f-18c0-405c-abe3-71ffd1fc0397', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('381b6b5e-305f-4cbc-a3bf-7707147c8804', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('50d8169a-a6da-4856-bb75-c0283f9849ae', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('67a81238-3348-4cdf-b953-5096df977e27', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('82a0e146-1b63-4194-a0f8-cfb1913f50dc', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('837b3000-7ec2-4c85-a8fa-bc088cc0074e', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('9bb2ddba-abfa-474a-ac84-d7952a51ad7e', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('aaa', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('b53c3193-7a3f-4005-861b-52eca46f9381', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('e17363fa-82d8-4ca4-8dee-ce1b62bcf995', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('ecdba929-6516-46b3-b507-36d2c854b947', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('ef9012fd-f635-49b5-918b-874c806a6b40', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('f6e0a637-d439-49d2-b720-edb8f9c750f5', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-0872b219-c9e9-40be-b5ca-2243067fc5f2', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-09bf528d-f36d-4092-a0c1-30ce3c75c133', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-0ffc9672-199c-4571-bf2d-1acba562fee6', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-104bc6e6-0fef-47e0-8711-b7927848f523', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-10652f8a-6e9c-47b9-acb2-6ef44c21977c', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-19da69ea-95be-4cbe-bd44-f478d351f3a2', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-1acbe83f-cfac-4359-a242-20090273f7d0', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-1cf0a064-ca61-47d0-b3ad-d659359e77a1', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-1d91e5de-acd7-499e-b79a-11ba8f916c90', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-275e4c7f-99ce-4848-8c99-db6c8316f289', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-279034ba-af64-4b30-8342-09aa24557a2d', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-3099d47b-0ff1-44cd-a46c-616d206f0292', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-33790516-d0c7-4535-8865-d18949565652', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-36d7e699-f13e-4746-93ba-0755345cb06d', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-37999a9e-3ca8-4346-b4ba-d6e256e8ffb5', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-3a759e1a-3432-4f0d-9fc2-c5c86c733259', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-43b4a4c4-4b1e-4293-a800-e8cd18008028', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-45f37a25-fa22-4234-99c1-eebf02c5c6f4', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-478c4d87-f77e-49fd-9163-56685817540b', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-49722cde-1ea6-4e7f-b552-b45ccc6a9f11', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-4b8528bb-d89a-4613-be22-412fabe6bde8', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-4f1658fb-0766-49b0-bd17-2706ced368e0', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-51fc786f-155b-455c-a918-5e1b3f0fe649', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-533f87a8-965d-4a83-91ff-57b446085a9d', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-5c3b562d-bf3c-490c-a8c1-c119294e2820', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-5ce1a02d-9830-444e-9495-0f6629effd92', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-600838b4-efcc-40ae-86ae-8f3aa108d08b', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-63810c36-0bfe-448c-9fca-ab6865a9b557', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-7179a1b0-6657-47c1-9cbf-37bb6956ee6a', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-729e7f87-e705-4164-83c3-a49bc4d8ab46', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-784d02fa-dc31-4c2f-9627-820889482e80', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-7a126c0e-ebe5-491e-8041-d520b396ef24', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-7ab6533d-db5d-4885-8e7a-a1e1d37d2800', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-858a0871-ff5b-47f2-bdda-88ca679b141b', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-878cd831-fdb8-4623-9305-fabbb69395ca', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-88382a76-7ced-4df5-b1e6-9a218bdd5cb8', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-920a167b-5a3f-408e-b2c7-cac5892ebaf5', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-93fdba3c-5398-45a0-adf7-375b5ef97a48', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-945e2d3b-1652-4fb3-970a-c36ce43282bc', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-94abb065-3617-49a5-96cd-7688733c5472', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-982f10b9-42ec-4af8-9de8-7f77f623913b', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-9c4ca4f2-5085-409c-a413-5c30d4f042ad', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-a3c722bd-ba0a-4ac3-9844-da80ae7731ed', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-a636ab8d-bed9-43df-b1e2-01161aeceb5f', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-a9a0721a-e1e6-494a-9643-1b63bc711005', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-aac27eea-cbc1-4031-be26-b0e0d5e6a25f', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-ab7da2ba-6079-434b-96b1-7742eb40c7d7', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-b1d95327-057f-4a9f-abec-8eba59ea9371', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-b769ab3f-f2bd-4c23-a41a-ec3f99e9f4dc', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-bcb44aa3-8366-4370-a89f-ff9d47160086', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-c6240124-3a3b-446c-ad72-96beb41c4506', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-c7bf148f-c85e-47ad-88ef-e44ed8bd7a27', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-cf0b9b88-603f-435c-b7f9-b35935b76480', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-d2ba7c4e-e4b2-440a-8252-a7a488ac5439', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-d539d44d-fdf0-41d5-ab2b-4bc5b3f2ba95', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-d5929fd7-3621-4b43-828c-ebfe89618c21', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-db7a06fe-3561-4b53-bd28-8151fb65bc44', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-dcf2696a-bad3-4046-8101-64b3e943a3bf', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-e2497509-d209-44cd-8af0-e077f6f182e7', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-e4e99454-add9-4bbf-a77b-ad3e56699c3b', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-f19d4db3-0087-4224-961a-f977afd194a4', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-f29bddea-56c9-415f-980d-491d489a5732', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-f4381e2c-c4a5-4c1d-bf4c-dd4f03aef3de', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
	('song-f696fb26-5004-4136-8621-02cce631e173', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1);

-- Dumping structure for table defaultdb.messenge
CREATE TABLE IF NOT EXISTS `messenge` (
  `idMess` varchar(100) COLLATE utf8mb3_vietnamese_ci NOT NULL,
  `idBox` varchar(100) COLLATE utf8mb3_vietnamese_ci NOT NULL,
  `content` varchar(400) COLLATE utf8mb3_vietnamese_ci NOT NULL,
  `type` varchar(10) COLLATE utf8mb3_vietnamese_ci NOT NULL DEFAULT 'Mess',
  `idUser` varchar(100) COLLATE utf8mb3_vietnamese_ci NOT NULL,
  `ngay` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idMess`),
  UNIQUE KEY `idBox` (`idBox`,`idMess`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_vietnamese_ci;

-- Dumping data for table defaultdb.messenge: ~0 rows (approximately)

-- Dumping structure for table defaultdb.notification
CREATE TABLE IF NOT EXISTS `notification` (
  `receiver_id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Discuss_Id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `createtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Song_Id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `replay_user_id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table defaultdb.notification: ~0 rows (approximately)

-- Dumping structure for table defaultdb.playlist
CREATE TABLE IF NOT EXISTS `playlist` (
  `id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `User_id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Genre_ID` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Type` varchar(50) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT 'nono',
  `ImagePath` varchar(300) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `PlayListName` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Likes` int NOT NULL,
  `Songs` int NOT NULL,
  `Duration` varchar(50) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT '',
  `Status` int NOT NULL DEFAULT '0',
  `Discripition` varchar(150) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Index 2` (`User_id`,`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table defaultdb.playlist: ~17 rows (approximately)
INSERT INTO `playlist` (`id`, `User_id`, `Genre_ID`, `Type`, `ImagePath`, `PlayListName`, `Likes`, `Songs`, `Duration`, `Status`, `Discripition`) VALUES
	('12a2b6d1-9684-4ffd-8b26-f593ad302ca7', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 'a7b77b1c-902b-4417-9609-eb596aa187e4', 'playlist', '/public/playlist/playlist-avatar-1711981590640-718853768.jpeg', 'Nhạc Không Thể Thiêu', 0, 30, '0', 1, ''),
	('42a9314d-5f14-4786-88ab-604359aa75e1', '42a9314d-5f14-4786-88ab-604359aa75e1', '', 'artist', '/public/avatar/pmq.jpg', 'Phan Manh Quỳnh', 0, 0, '0', 1, '[value-11]'),
	('51925ca6-74c6-418d-9273-793061b05aa6', '51925ca6-74c6-418d-9273-793061b05aa6', '', 'artist', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2F51925ca6-74c6-418d-9273-793061b05aa6.jpeg?alt=media&token=8f20e1fb-7667-460b-a200-d4ccf4966c70', 'Sơn Tùng M-TP', 0, 0, '0', 1, '[value-11]'),
	('8f23b4e3-85f2-48ef-a865-9797a7100862', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 'b30d08cd-d161-4cf7-ab92-bd445d212896', 'playlist', '/public/playlist/playlist-avatar-1711979780192-601050903.jpeg', 'Hot Hit VN', 0, 29, '0', 1, ''),
	('9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', '', 'artist', '/public/avatar/denvau.jpg', 'Đen Vâu', 0, 0, '0', 1, '[value-11]'),
	('a1a46dc3-cd88-4aeb-9ae0-276962d22922', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 'b30d08cd-d161-4cf7-ab92-bd445d212896', 'playlist', '/public/playlist/playlist-avatar-1712045519005-846117435.jpeg', 'Anh Hào Nhạc Việt', 0, 20, '0', 1, ''),
	('artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', 'artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', '', 'artist', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9.jpeg?alt=media&token=6b7829ef-cbf4-4acf-80f0-baf7cfbe45e8', 'JustaTee', 0, 0, '', 1, ''),
	('artist-37d07bbb-b815-488f-baa5-6c25cbe4ba74-1725550799643', 'artist-37d07bbb-b815-488f-baa5-6c25cbe4ba74-1725550799643', '', 'artist', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-37d07bbb-b815-488f-baa5-6c25cbe4ba74-1725550799643.jpeg?alt=media&token=920df610-5fa4-4c4a-8884-13df8f38fee5', 'Phương Ly', 0, 0, '', 1, ''),
	('artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', 'artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', '', 'artist', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2.jpeg?alt=media&token=c4bc0e67-98d4-49c6-b871-f31c39f95770', 'MIN', 0, 0, '', 1, ''),
	('artist-717aba39-8501-41c1-8a26-8f68c4b282e3-1725186015160', 'artist-717aba39-8501-41c1-8a26-8f68c4b282e3-1725186015160', '', 'artist', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-717aba39-8501-41c1-8a26-8f68c4b282e3-1725186015160.jpeg?alt=media&token=6e66f5c4-f783-44fd-b79e-cd170c2e28ef', 'Miu Lê', 0, 0, '', 1, ''),
	('artist-87cb9a4c-45d8-426a-bcac-9576677321f0-1725185616844', 'artist-87cb9a4c-45d8-426a-bcac-9576677321f0-1725185616844', '', 'artist', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-87cb9a4c-45d8-426a-bcac-9576677321f0-1725185616844.jpeg?alt=media&token=a8a68e42-ca65-42de-aee6-67c34a6ce600', 'Lou Hoàng', 0, 0, '', 1, ''),
	('artist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104', 'artist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104', '', 'artist', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104.jpeg?alt=media&token=8b7556f7-9be9-4150-8a8f-7c4fe76d6f08', 'Tuấn Hưng', 0, 0, '', 1, ''),
	('artist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688', 'artist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688', '', 'artist', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688.jpeg?alt=media&token=0a6a6198-7ebd-4d7b-bfef-77694cee3ffb', 'Noo Phước Thịnh', 0, 0, '', 1, ''),
	('artist-e3f078e5-f587-4c18-a790-424e6dd64487-1725455195688', 'artist-e3f078e5-f587-4c18-a790-424e6dd64487-1725455195688', '', 'artist', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-e3f078e5-f587-4c18-a790-424e6dd64487-1725455195688.jpeg?alt=media&token=b50c4a4c-75b7-4e25-94a3-cf9e562d4b02', 'Trung Tự', 0, 0, '', 1, ''),
	('artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', '', 'artist', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4.jpeg?alt=media&token=1f9581ea-6195-4d6d-8cba-685b7896feb3', 'Fairy Tail', 0, 0, '0', 1, ''),
	('artist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710', 'artist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710', '', 'artist', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710.jpeg?alt=media&token=3abc6c4d-6395-4acc-b0bf-3bcf4d985560', 'Only C', 0, 0, '', 1, ''),
	('artist-ee6b7fbc-e072-4a33-9e03-887fc1f82008-1725286552482', 'artist-ee6b7fbc-e072-4a33-9e03-887fc1f82008-1725286552482', '', 'artist', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-ee6b7fbc-e072-4a33-9e03-887fc1f82008-1725286552482.jpeg?alt=media&token=428230f6-5a70-43cf-89af-197dd028aeee', 'Trịnh Thăng Bình', 0, 0, '', 1, ''),
	('artist-fd1ff219-ee15-45ff-baa5-316e29bd8998-1723110503718', 'artist-fd1ff219-ee15-45ff-baa5-316e29bd8998-1723110503718', '', 'artist', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-fd1ff219-ee15-45ff-baa5-316e29bd8998-1723110503718.jpeg?alt=media&token=4fdf0a36-5eae-47fa-b260-26ebbc373731', 'Karik', 0, 0, '', 1, ''),
	('artist-fe79e6f5-1ebe-4223-9b00-3e00c16af0bd', 'artist-fe79e6f5-1ebe-4223-9b00-3e00c16af0bd', '', 'artist', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-fe79e6f5-1ebe-4223-9b00-3e00c16af0bd.jpeg?alt=media&token=3bc37096-30bb-40ef-9a66-4f3097dcdd39', 'Erik', 0, 0, '', 1, ''),
	('cf345c59-5079-452e-b1de-c829f774e7f2', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 'b30d08cd-d161-4cf7-ab92-bd445d212896', 'playlist', '/public/playlist/playlist-avatar-1711982014513-407478995.jpeg', 'Best of V-Pop Không Thể Thiếu 2023', 0, 34, '0', 1, ''),
	('user-f251a07e-7465-477b-9fa6-ee0a9f85c52d-1723366291936', 'user-f251a07e-7465-477b-9fa6-ee0a9f85c52d-1723366291936', '', 'artist', 'https://lh3.googleusercontent.com/a/ACg8ocLLzhOFABIwe28HYPqdWTlLJ1K_MroTPqia3pvuV1HWrkrI=s96-c', 'khang hai', 0, 0, '', 0, '');

-- Dumping structure for table defaultdb.playlistlikes
CREATE TABLE IF NOT EXISTS `playlistlikes` (
  `User_ID` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `PlayList_id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  UNIQUE KEY `User_Playlistlike` (`User_ID`,`PlayList_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table defaultdb.playlistlikes: ~15 rows (approximately)
INSERT INTO `playlistlikes` (`User_ID`, `PlayList_id`) VALUES
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'artist-37d07bbb-b815-488f-baa5-6c25cbe4ba74-1725550799643'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'cf345c59-5079-452e-b1de-c829f774e7f2'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', '42a9314d-5f14-4786-88ab-604359aa75e1'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', '51925ca6-74c6-418d-9273-793061b05aa6'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', '8f23b4e3-85f2-48ef-a865-9797a7100862'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'artist-37d07bbb-b815-488f-baa5-6c25cbe4ba74-1725550799643'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'artist-717aba39-8501-41c1-8a26-8f68c4b282e3-1725186015160'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'artist-87cb9a4c-45d8-426a-bcac-9576677321f0-1725185616844'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'artist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'artist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'artist-ee6b7fbc-e072-4a33-9e03-887fc1f82008-1725286552482'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'cf345c59-5079-452e-b1de-c829f774e7f2');

-- Dumping structure for table defaultdb.recentplaylist
CREATE TABLE IF NOT EXISTS `recentplaylist` (
  `User_ID` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `ID` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `CreateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `User_ID` (`User_ID`,`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table defaultdb.recentplaylist: ~21 rows (approximately)
INSERT INTO `recentplaylist` (`User_ID`, `ID`, `CreateTime`) VALUES
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'artist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104', '2024-09-02 13:44:59'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'artist-ee6b7fbc-e072-4a33-9e03-887fc1f82008-1725286552482', '2024-09-02 14:32:03'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', '', '2024-09-02 14:32:16'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'artist-87cb9a4c-45d8-426a-bcac-9576677321f0-1725185616844', '2024-09-02 14:32:46'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', '42a9314d-5f14-4786-88ab-604359aa75e1', '2024-09-03 03:17:42'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-09-05 02:58:45'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-09-05 10:21:09'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', '51925ca6-74c6-418d-9273-793061b05aa6', '2024-09-05 10:59:59'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', '2024-09-05 11:00:33'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-09-05 11:00:42'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-09-05 11:02:17'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', '2024-09-05 11:10:19'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', '42a9314d-5f14-4786-88ab-604359aa75e1', '2024-09-05 11:11:58'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'artist-37d07bbb-b815-488f-baa5-6c25cbe4ba74-1725550799643', '2024-09-05 16:24:52'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'artist-ee6b7fbc-e072-4a33-9e03-887fc1f82008-1725286552482', '2024-09-06 08:36:25'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', '2024-09-06 10:30:40'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', '', '2024-09-06 10:41:41'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', '2024-09-06 10:43:34'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'artist-37d07bbb-b815-488f-baa5-6c25cbe4ba74-1725550799643', '2024-09-06 13:54:42'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-09-06 14:06:34'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'artist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104', '2024-09-06 14:06:54'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', '2024-09-07 02:20:31'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', '2024-09-08 15:48:09');

-- Dumping structure for table defaultdb.recentsong
CREATE TABLE IF NOT EXISTS `recentsong` (
  `user_id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `user_id` (`user_id`,`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table defaultdb.recentsong: ~32 rows (approximately)
INSERT INTO `recentsong` (`user_id`, `Id`, `Time`) VALUES
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'song-784d02fa-dc31-4c2f-9627-820889482e80', '2024-11-15 15:31:23'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-94abb065-3617-49a5-96cd-7688733c5472', '2024-11-15 15:35:04'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-19da69ea-95be-4cbe-bd44-f478d351f3a2', '2024-11-15 15:36:09'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-0872b219-c9e9-40be-b5ca-2243067fc5f2', '2024-11-16 01:43:38'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-d2ba7c4e-e4b2-440a-8252-a7a488ac5439', '2024-11-16 01:47:08'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-f4381e2c-c4a5-4c1d-bf4c-dd4f03aef3de', '2024-11-16 01:47:45'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-19da69ea-95be-4cbe-bd44-f478d351f3a2', '2024-11-16 01:53:32'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-f4381e2c-c4a5-4c1d-bf4c-dd4f03aef3de', '2024-11-16 01:53:50'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-94abb065-3617-49a5-96cd-7688733c5472', '2024-11-16 09:22:22'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-19da69ea-95be-4cbe-bd44-f478d351f3a2', '2024-11-16 09:24:09'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-94abb065-3617-49a5-96cd-7688733c5472', '2024-11-16 09:24:20'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-945e2d3b-1652-4fb3-970a-c36ce43282bc', '2024-11-16 09:27:49'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-19da69ea-95be-4cbe-bd44-f478d351f3a2', '2024-11-16 09:31:57'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-f4381e2c-c4a5-4c1d-bf4c-dd4f03aef3de', '2024-11-16 09:37:20'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-19da69ea-95be-4cbe-bd44-f478d351f3a2', '2024-11-17 08:44:50'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-f4381e2c-c4a5-4c1d-bf4c-dd4f03aef3de', '2024-11-17 08:44:50'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-d2ba7c4e-e4b2-440a-8252-a7a488ac5439', '2024-11-17 08:49:24'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-945e2d3b-1652-4fb3-970a-c36ce43282bc', '2024-11-17 08:53:28'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-94abb065-3617-49a5-96cd-7688733c5472', '2024-11-17 08:57:36'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-878cd831-fdb8-4623-9305-fabbb69395ca', '2024-11-17 09:01:04'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-43b4a4c4-4b1e-4293-a800-e8cd18008028', '2024-11-17 09:04:40'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-f4381e2c-c4a5-4c1d-bf4c-dd4f03aef3de', '2024-11-17 09:07:55'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-19da69ea-95be-4cbe-bd44-f478d351f3a2', '2024-11-17 09:12:32'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-c6240124-3a3b-446c-ad72-96beb41c4506', '2024-11-17 09:12:53'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-36d7e699-f13e-4746-93ba-0755345cb06d', '2024-11-17 09:16:46'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-600838b4-efcc-40ae-86ae-8f3aa108d08b', '2024-11-18 14:53:34'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'ef9012fd-f635-49b5-918b-874c806a6b40', '2024-11-18 14:53:41'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-9c4ca4f2-5085-409c-a413-5c30d4f042ad', '2024-11-18 14:53:50'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-19da69ea-95be-4cbe-bd44-f478d351f3a2', '2024-11-18 14:59:49'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'song-19da69ea-95be-4cbe-bd44-f478d351f3a2', '2024-11-18 14:59:58'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'song-784d02fa-dc31-4c2f-9627-820889482e80', '2024-11-18 15:50:42'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'song-edc5de55-7c18-4782-8e38-b641a50a2994', '2024-11-18 15:50:48'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'song-19da69ea-95be-4cbe-bd44-f478d351f3a2', '2024-11-18 15:52:23'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'song-bcf47a3b-57eb-49b7-a956-690e71381328', '2024-11-18 16:08:31'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'song-9c4ca4f2-5085-409c-a413-5c30d4f042ad', '2024-11-19 02:35:11'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'song-9c4ca4f2-5085-409c-a413-5c30d4f042ad', '2024-11-19 02:38:18'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'song-0be4bfaf-2c6d-4aa7-bc41-52958c1234cd', '2024-11-19 03:28:46'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'song-f6d98097-3555-4a83-9838-84cbae4a3bd3', '2024-11-19 03:35:33'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'song-1d7422a0-38e9-4d54-ba74-df0dc415cd61', '2024-11-19 03:52:32'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'song-bdc3f005-cad3-438d-97cf-475a01c5cae6', '2024-11-19 03:53:25'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'song-8bbae5ba-093b-47c1-9a4d-9fddc39eeecb', '2024-11-19 04:12:11'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'song-b987433e-b777-40c4-8e84-edf3dca11b64', '2024-11-19 04:12:47'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'song-5d078f4a-08dd-4d12-b1ec-57c70e19ac27', '2024-11-19 04:13:13');

-- Dumping structure for table defaultdb.song
CREATE TABLE IF NOT EXISTS `song` (
  `Id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `user_id` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `genre_id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `SongName` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT 'Chưa có tiêu đề',
  `Viewer` int NOT NULL DEFAULT '0',
  `Singer` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Duration` varchar(50) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT '',
  `status` int NOT NULL DEFAULT '0',
  `description` varchar(300) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT '',
  `SongImage` varchar(300) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT '',
  `publicDate` varchar(50) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT '',
  `filePath` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT '',
  `dicussquality` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table defaultdb.song: ~73 rows (approximately)
INSERT INTO `song` (`Id`, `user_id`, `genre_id`, `SongName`, `Viewer`, `Singer`, `Duration`, `status`, `description`, `SongImage`, `publicDate`, `filePath`, `dicussquality`) VALUES
	('381b6b5e-305f-4cbc-a3bf-7707147c8804', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1 artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Đi Về Nhà', 9, 'Đen Vâu,JustaTee', '205.561', 1, '', '/public/image/avatar-1711977353391-140999932.jpeg', '1608224400', '381b6b5e-305f-4cbc-a3bf-7707147c8804', 0),
	('e17363fa-82d8-4ca4-8dee-ce1b62bcf995', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', '2 Triệu Năm', 2, 'Đen Vâu,Biên', '217', 1, '', '/public/image/avatar-1711977307658-644167533.jpeg', '1560963600', 'e17363fa-82d8-4ca4-8dee-ce1b62bcf995', 0),
	('ef9012fd-f635-49b5-918b-874c806a6b40', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Buông đôi tay nhau ra', 8, 'Sơn Tùng M-TP', '226.115918', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fef9012fd-f635-49b5-918b-874c806a6b40.jpeg?alt=media&token=e7a4aefa-1719-4557-8372-1b5f489b40d0', '1448989200', 'ef9012fd-f635-49b5-918b-874c806a6b40', 0),
	('f6e0a637-d439-49d2-b720-edb8f9c750f5', '42a9314d-5f14-4786-88ab-604359aa75e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Khi phải quên người đó đi', 3, 'Phan Mạnh Quỳnh', '324', 1, '', '/public/image/avatar-1711332305669-701321911.jpeg', '1473613200', 'f6e0a637-d439-49d2-b720-edb8f9c750f5', 0),
	('song-0872b219-c9e9-40be-b5ca-2243067fc5f2', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1 artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Bài Này Chill Phết', 1, 'Đen Vâu,MIN', '273.381', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-0872b219-c9e9-40be-b5ca-2243067fc5f2.jpeg?alt=media&token=cdc9b878-50bd-40ac-a1ff-ea0c5347b6d4', '1558371600', 'song-0872b219-c9e9-40be-b5ca-2243067fc5f2', 0),
	('song-09bf528d-f36d-4092-a0c1-30ce3c75c133', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Đưa Nhau Đi Trốn', 0, 'Đen Vâu', '230.008005', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-09bf528d-f36d-4092-a0c1-30ce3c75c133.jpeg?alt=media&token=e9c8797a-1502-491d-8860-877a4eb23d0e', '1558371600', 'song-09bf528d-f36d-4092-a0c1-30ce3c75c133', 1),
	('song-0be4bfaf-2c6d-4aa7-bc41-52958c1234cd', 'artist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Mãi Mãi Bên Nhau', 0, 'Noo Phước Thịnh', '292', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-0be4bfaf-2c6d-4aa7-bc41-52958c1234cd.jpeg?alt=media&token=ed50cb54-0985-4507-ab05-16ba72325330', '1418786746', 'song-0be4bfaf-2c6d-4aa7-bc41-52958c1234cd', 0),
	('song-0ffc9672-199c-4571-bf2d-1acba562fee6', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Chúng Ta Của Tương Lai', 4, 'Sơn Tùng M-TP', '245.76', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-0ffc9672-199c-4571-bf2d-1acba562fee6.jpeg?alt=media&token=04ca551a-e44d-4666-9715-715c77bdb972', '1722618000', 'song-0ffc9672-199c-4571-bf2d-1acba562fee6', 0),
	('song-104bc6e6-0fef-47e0-8711-b7927848f523', 'artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', ' Forever Alone', 1, 'JustaTee', '238.678005', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-104bc6e6-0fef-47e0-8711-b7927848f523.jpeg?alt=media&token=505bb000-ddf0-4197-bd1d-9c6358d20b57', '1364230800', 'song-104bc6e6-0fef-47e0-8711-b7927848f523', 0),
	('song-10652f8a-6e9c-47b9-acb2-6ef44c21977c', 'artist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710 artist-87cb9a4c-45d8-426a-bcac-9576677321f0-1725185616844', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Đếm Ngày Xa Em', 1, 'Only C,Lou Hoàng', '256.609', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-10652f8a-6e9c-47b9-acb2-6ef44c21977c.jpeg?alt=media&token=7d3b9aed-deef-4a2a-9946-1d470a254d9b', '1464714000', 'song-10652f8a-6e9c-47b9-acb2-6ef44c21977c', 0),
	('song-19da69ea-95be-4cbe-bd44-f478d351f3a2', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', 'cffc2553-4cf3-48ae-ae10-2e70b8d5955b', 'Egao no Mahou (Fairy Tail OP 5 )', 10, 'Fairy Tail', '208.399093', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-19da69ea-95be-4cbe-bd44-f478d351f3a2.jpeg?alt=media&token=9c636dd2-f98f-4a0e-b08f-041472edaf3e', '1371488400', 'song-19da69ea-95be-4cbe-bd44-f478d351f3a2', 0),
	('song-1acbe83f-cfac-4359-a242-20090273f7d0', 'artist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Yêu Là  Tha Thu', 1, 'Only C', '273.117', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-1acbe83f-cfac-4359-a242-20090273f7d0.jpeg?alt=media&token=667ef54c-0c15-40e4-bf9b-df247ac9e6ba', '1491930000', 'song-1acbe83f-cfac-4359-a242-20090273f7d0', 0),
	('song-1d7422a0-38e9-4d54-ba74-df0dc415cd61', 'artist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Cause I Love You', 0, 'Noo Phước Thịnh', '373', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-1d7422a0-38e9-4d54-ba74-df0dc415cd61.jpeg?alt=media&token=bb4c68f6-2bd9-4f3b-8461-0dee5deb89d5', '1463629553', 'song-1d7422a0-38e9-4d54-ba74-df0dc415cd61', 0),
	('song-1d91e5de-acd7-499e-b79a-11ba8f916c90', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', ' Ấn Nút Nhớ…Thả Giấc Mơ', 4, 'Sơn Tùng M-TP', '244.583991', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-1d91e5de-acd7-499e-b79a-11ba8f916c90.jpeg?alt=media&token=5877b458-e663-498c-b869-03e66b1cb964', '1434560400', 'song-1d91e5de-acd7-499e-b79a-11ba8f916c90', 0),
	('song-275e4c7f-99ce-4848-8c99-db6c8316f289', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Có Chắc Yêu Là Đây', 3, 'Sơn Tùng M-TP', '215.284', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-275e4c7f-99ce-4848-8c99-db6c8316f289.jpeg?alt=media&token=1dff67e1-51c3-42d4-91ba-0cf947faef48', '1593956220', 'song-275e4c7f-99ce-4848-8c99-db6c8316f289', 0),
	('song-279034ba-af64-4b30-8342-09aa24557a2d', 'artist-e3f078e5-f587-4c18-a790-424e6dd64487-1725455195688', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Vừa Hận Vừa Yêu', 1, 'Trung Tự', '157.239002', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-279034ba-af64-4b30-8342-09aa24557a2d.jpeg?alt=media&token=b0234f06-0a80-4238-a3ed-f40989da2989', '1719334800', 'song-279034ba-af64-4b30-8342-09aa24557a2d', 0),
	('song-3099d47b-0ff1-44cd-a46c-616d206f0292', 'artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', ' Em Mới Là Người Yêu Anh ', 1, 'MIN', '228.979002', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-3099d47b-0ff1-44cd-a46c-616d206f0292.jpeg?alt=media&token=27ff6562-97cd-4895-8f55-6f73a43e8918', '1526922000', 'song-3099d47b-0ff1-44cd-a46c-616d206f0292', 0),
	('song-33790516-d0c7-4535-8865-d18949565652', 'artist-ee6b7fbc-e072-4a33-9e03-887fc1f82008-1725286552482', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'TÂM SỰ TUỔI 30 ', 3, 'Trịnh Thăng Bình', '263.290998', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-33790516-d0c7-4535-8865-d18949565652.jpeg?alt=media&token=c7dced7c-cb85-48dc-8866-44e6c4116025', '1526922000', 'song-33790516-d0c7-4535-8865-d18949565652', 0),
	('song-36d7e699-f13e-4746-93ba-0755345cb06d', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Như Ngày Hôm Qua', 3, 'Sơn Tùng M-TP', '221.570998', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-36d7e699-f13e-4746-93ba-0755345cb06d.jpeg?alt=media&token=7fb0c9ba-f8f6-455b-acbe-91103ae36df6', '1463850000', 'song-36d7e699-f13e-4746-93ba-0755345cb06d', 0),
	('song-37999a9e-3ca8-4346-b4ba-d6e256e8ffb5', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Muộn Rồi Sao Mà Còn', 4, 'Sơn Tùng M-TP', '273.58', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-37999a9e-3ca8-4346-b4ba-d6e256e8ffb5.jpeg?alt=media&token=7ac458e9-657a-429f-9ef4-74f43d8e0e06', '1621616400', 'song-37999a9e-3ca8-4346-b4ba-d6e256e8ffb5', 0),
	('song-3a759e1a-3432-4f0d-9fc2-c5c86c733259', 'artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'TRÊN TÌNH BẠN DƯỚI TÌNH YÊU', 1, 'MIN', '293.639546', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-3a759e1a-3432-4f0d-9fc2-c5c86c733259.jpeg?alt=media&token=147beb93-2199-4c5b-92b8-1718885497b3', '1590080400', 'song-3a759e1a-3432-4f0d-9fc2-c5c86c733259', 0),
	('song-43b4a4c4-4b1e-4293-a800-e8cd18008028', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', 'cffc2553-4cf3-48ae-ae10-2e70b8d5955b', 'Tenohira [Fairy Tail OP 12]', 7, 'Fairy Tail', '191.402086', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-43b4a4c4-4b1e-4293-a800-e8cd18008028.jpeg?alt=media&token=3a2b7c3c-5a8b-41d7-b3b6-8bf4184000ce', '1337619600', 'song-43b4a4c4-4b1e-4293-a800-e8cd18008028', 0),
	('song-45f37a25-fa22-4234-99c1-eebf02c5c6f4', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'CHẠY NGAY ĐI', 2, 'Sơn Tùng M-TP', '263.963991', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-45f37a25-fa22-4234-99c1-eebf02c5c6f4.jpeg?alt=media&token=63bd4a5f-370a-4261-b9c0-327c89a7a60c', '1526922000', 'song-45f37a25-fa22-4234-99c1-eebf02c5c6f4', 0),
	('song-478c4d87-f77e-49fd-9163-56685817540b', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Nắng Ấm Xa Dần', 4, 'Sơn Tùng M-TP', '190.458005', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-478c4d87-f77e-49fd-9163-56685817540b.jpeg?alt=media&token=ac63941f-4468-4aea-8be7-6ec9560e6aa1', '1725542955', 'song-478c4d87-f77e-49fd-9163-56685817540b', 0),
	('song-49722cde-1ea6-4e7f-b552-b45ccc6a9f11', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Em Của Ngày Hôm Qua', 4, 'Sơn Tùng M-TP', '232.49', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-49722cde-1ea6-4e7f-b552-b45ccc6a9f11.jpeg?alt=media&token=0fde3815-f88a-4114-8378-79fb5c12ba4f', '1400691600', 'song-49722cde-1ea6-4e7f-b552-b45ccc6a9f11', 0),
	('song-4b8528bb-d89a-4613-be22-412fabe6bde8', 'artist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710 artist-87cb9a4c-45d8-426a-bcac-9576677321f0-1725185616844', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Ngày Em Đi', 3, 'Only C,Lou Hoàng', '237.27', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-4b8528bb-d89a-4613-be22-412fabe6bde8.jpeg?alt=media&token=bea9baa7-0b25-4f60-9f38-9f841d5f3972', '1432227600', 'song-4b8528bb-d89a-4613-be22-412fabe6bde8', 0),
	('song-4f1658fb-0766-49b0-bd17-2706ced368e0', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Gió cuốn em đi', 4, 'Sơn Tùng M-TP', '290.783492', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-4f1658fb-0766-49b0-bd17-2706ced368e0.jpeg?alt=media&token=1933503c-d611-4a74-8fdb-4c0bf0950561', '1400691600', 'song-4f1658fb-0766-49b0-bd17-2706ced368e0', 0),
	('song-51fc786f-155b-455c-a918-5e1b3f0fe649', 'artist-fe79e6f5-1ebe-4223-9b00-3e00c16af0bd artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Ghen', 2, 'Erik,MIN', '266.610998', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-51fc786f-155b-455c-a918-5e1b3f0fe649.jpeg?alt=media&token=66f01ecb-6f77-4782-a90a-ba68e4d57173', '1495386000', 'song-51fc786f-155b-455c-a918-5e1b3f0fe649', 0),
	('song-533f87a8-965d-4a83-91ff-57b446085a9d', 'artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2 9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1 artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Vì yêu cú đâm đầu', 1, 'MIN,Đen Vâu,JustaTee', '232.671995', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-533f87a8-965d-4a83-91ff-57b446085a9d.jpeg?alt=media&token=7da75b71-f074-4f03-b78f-6c7fd022b83f', '1558458000', 'song-533f87a8-965d-4a83-91ff-57b446085a9d', 0),
	('song-5c3b562d-bf3c-490c-a8c1-c119294e2820', 'artist-e3f078e5-f587-4c18-a790-424e6dd64487-1725455195688', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Đêm Qua Anh Mơ ', 0, 'Trung Tự', '133.090998', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-5c3b562d-bf3c-490c-a8c1-c119294e2820.jpeg?alt=media&token=cfa5d7de-cdf4-4b40-b8b9-0bce701fe920', '1590080400', 'song-5c3b562d-bf3c-490c-a8c1-c119294e2820', 0),
	('song-5ce1a02d-9830-444e-9495-0f6629effd92', 'artist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Nắm Lấy Tay Anh ', 8, 'Tuấn Hưng', '271.696009', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-5ce1a02d-9830-444e-9495-0f6629effd92.jpeg?alt=media&token=cbe99e8e-f6a8-4551-bc9a-ecbfd43737b6', '1400691600', 'song-5ce1a02d-9830-444e-9495-0f6629effd92', 0),
	('song-5d078f4a-08dd-4d12-b1ec-57c70e19ac27', 'artist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Chạm Khẽ Tim Anh Một Chút Thôi', 0, 'Noo Phước Thịnh', '347', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-5d078f4a-08dd-4d12-b1ec-57c70e19ac27.jpeg?alt=media&token=d5f403e3-e13d-411a-9318-6a2dcdc2dc49', '1508213227', 'song-5d078f4a-08dd-4d12-b1ec-57c70e19ac27', 0),
	('song-600838b4-efcc-40ae-86ae-8f3aa108d08b', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Nơi Này Có Anh', 2, 'Sơn Tùng M-TP', '261.902993', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-600838b4-efcc-40ae-86ae-8f3aa108d08b.jpeg?alt=media&token=fca094c3-b8e5-4924-af3c-f8b6876df581', '1495386000', 'song-600838b4-efcc-40ae-86ae-8f3aa108d08b', 0),
	('song-63810c36-0bfe-448c-9fca-ab6865a9b557', 'artist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710 artist-fd1ff219-ee15-45ff-baa5-316e29bd8998-1723110503718', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Anh Không Đòi Quà', 5, 'Only C,Karik', '166.68', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-63810c36-0bfe-448c-9fca-ab6865a9b557.jpeg?alt=media&token=73906560-3c5f-4f4a-b0e0-36d6e9d09384', '1369155600', 'song-63810c36-0bfe-448c-9fca-ab6865a9b557', 0),
	('song-7179a1b0-6657-47c1-9cbf-37bb6956ee6a', 'artist-87cb9a4c-45d8-426a-bcac-9576677321f0-1725185616844 artist-717aba39-8501-41c1-8a26-8f68c4b282e3-1725186015160', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Yêu Một Người Có Lẽ', 7, 'Lou Hoàng,Miu Lê', '252.121995', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-7179a1b0-6657-47c1-9cbf-37bb6956ee6a.jpeg?alt=media&token=14da1438-95d5-44e2-b38d-44503def2c80', '1463850000', 'song-7179a1b0-6657-47c1-9cbf-37bb6956ee6a', 0),
	('song-729e7f87-e705-4164-83c3-a49bc4d8ab46', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Âm Thầm Bên Em', 9, 'Sơn Tùng M-TP', '291.317007', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-729e7f87-e705-4164-83c3-a49bc4d8ab46.jpeg?alt=media&token=ebf406d9-356e-42f4-9f5e-676ef1d14e8f', '1432227600', 'song-729e7f87-e705-4164-83c3-a49bc4d8ab46', 0),
	('song-784d02fa-dc31-4c2f-9627-820889482e80', 'artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Đã Lỡ Yêu Em Nhiều ', 5, 'JustaTee', '266.14712', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-784d02fa-dc31-4c2f-9627-820889482e80.jpeg?alt=media&token=23df1585-a88a-4c53-b294-9f85987eb77f', '1510506000', 'song-784d02fa-dc31-4c2f-9627-820889482e80', 1),
	('song-7a126c0e-ebe5-491e-8041-d520b396ef24', '42a9314d-5f14-4786-88ab-604359aa75e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Vợ Người Ta', 1, 'Phan Mạnh Quỳnh', '196.831995', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-7a126c0e-ebe5-491e-8041-d520b396ef24.jpeg?alt=media&token=e678156f-8e0c-48c0-894d-a6c408dd59fd', '1447347600', 'song-7a126c0e-ebe5-491e-8041-d520b396ef24', 0),
	('song-7ab6533d-db5d-4885-8e7a-a1e1d37d2800', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Hãy Trao Cho Anh', 4, 'Sơn Tùng M-TP', '246.387007', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-7ab6533d-db5d-4885-8e7a-a1e1d37d2800.jpeg?alt=media&token=6852a5c9-1615-4d79-ad10-a8205a05c3f3', '1546794000', 'song-7ab6533d-db5d-4885-8e7a-a1e1d37d2800', 0),
	('song-858a0871-ff5b-47f2-bdda-88ca679b141b', 'artist-717aba39-8501-41c1-8a26-8f68c4b282e3-1725186015160', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Anh Đang Nơi Đâu', 2, 'Miu Lê', '200.955011', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-858a0871-ff5b-47f2-bdda-88ca679b141b.jpeg?alt=media&token=0468e4fd-b926-4837-963a-891e43f71472', '1452099600', 'song-858a0871-ff5b-47f2-bdda-88ca679b141b', 0),
	('song-878cd831-fdb8-4623-9305-fabbb69395ca', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', 'cffc2553-4cf3-48ae-ae10-2e70b8d5955b', 'Snow Fairy (Fairy Tail OP 1)', 6, 'Fairy Tail', '212.509025', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-878cd831-fdb8-4623-9305-fabbb69395ca.jpeg?alt=media&token=378a09bc-f13f-443d-a1ed-42602bd5fc4d', '1389027600', 'song-878cd831-fdb8-4623-9305-fabbb69395ca', 0),
	('song-88382a76-7ced-4df5-b1e6-9a218bdd5cb8', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Đừng Về Trễ Nha', 3, 'Sơn Tùng M-TP', '281.286009', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-88382a76-7ced-4df5-b1e6-9a218bdd5cb8.jpeg?alt=media&token=00b293e2-c05b-4a71-b113-77144db6669c', '1389027600', 'song-88382a76-7ced-4df5-b1e6-9a218bdd5cb8', 0),
	('song-8bbae5ba-093b-47c1-9a4d-9fddc39eeecb', 'artist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Chờ Ngày Mưa Tan', 0, 'Noo Phước Thịnh', '212', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-8bbae5ba-093b-47c1-9a4d-9fddc39eeecb.jpeg?alt=media&token=15017608-1fc7-4cf1-88ca-ec6334e63ed2', '1364788282', 'song-8bbae5ba-093b-47c1-9a4d-9fddc39eeecb', 0),
	('song-93fdba3c-5398-45a0-adf7-375b5ef97a48', '42a9314d-5f14-4786-88ab-604359aa75e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Có chàng trài viết lên cây', 1, 'Phan Mạnh Quỳnh', '310.023', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-93fdba3c-5398-45a0-adf7-375b5ef97a48.jpeg?alt=media&token=890310be-65d2-4237-accc-d8284600f617', '1483722000', 'song-93fdba3c-5398-45a0-adf7-375b5ef97a48', 0),
	('song-945e2d3b-1652-4fb3-970a-c36ce43282bc', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', 'cffc2553-4cf3-48ae-ae10-2e70b8d5955b', 'Fairy Tail - Opening 2', 5, 'Fairy Tail', '244.993741', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-945e2d3b-1652-4fb3-970a-c36ce43282bc.jpeg?alt=media&token=708755f5-71e7-4f64-9d0e-77f0ecf9d812', '1389027600', 'song-945e2d3b-1652-4fb3-970a-c36ce43282bc', 0),
	('song-94abb065-3617-49a5-96cd-7688733c5472', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', 'cffc2553-4cf3-48ae-ae10-2e70b8d5955b', 'Masayume Chasing (Fairy Tail OP15)', 4, 'Fairy Tail', '205.496009', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-94abb065-3617-49a5-96cd-7688733c5472.jpeg?alt=media&token=76671377-121e-455a-9550-e967c814bdca', '1404050133', 'song-94abb065-3617-49a5-96cd-7688733c5472', 0),
	('song-982f10b9-42ec-4af8-9de8-7f77f623913b', 'artist-87cb9a4c-45d8-426a-bcac-9576677321f0-1725185616844', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Yêu Em Dại Khờ', 1, 'Lou Hoàng', '270.011995', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-982f10b9-42ec-4af8-9de8-7f77f623913b.jpeg?alt=media&token=d0cc22e8-f83f-4f09-bb68-dbad59d51675', '1546794000', 'song-982f10b9-42ec-4af8-9de8-7f77f623913b', 0),
	('song-9c4ca4f2-5085-409c-a413-5c30d4f042ad', 'artist-717aba39-8501-41c1-8a26-8f68c4b282e3-1725186015160', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'EM NHỚ ANH', 1, 'Miu Lê', '225.882993', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-9c4ca4f2-5085-409c-a413-5c30d4f042ad.jpeg?alt=media&token=0fcde259-a0fb-4760-aa4c-f13300868fc7', '1294333200', 'song-9c4ca4f2-5085-409c-a413-5c30d4f042ad', 0),
	('song-a3c722bd-ba0a-4ac3-9844-da80ae7731ed', 'artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Bâng Khuâng', 1, 'JustaTee', '264.057007', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-a3c722bd-ba0a-4ac3-9844-da80ae7731ed.jpeg?alt=media&token=048fb894-0266-46ad-a48e-1e364b1f0e4a', '1389027600', 'song-a3c722bd-ba0a-4ac3-9844-da80ae7731ed', 0),
	('song-a636ab8d-bed9-43df-b1e2-01161aeceb5f', 'artist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Dĩ Vãng Cuộc Tình', 1, 'Tuấn Hưng', '271.056009', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-a636ab8d-bed9-43df-b1e2-01161aeceb5f.jpeg?alt=media&token=4f60554c-d841-4a08-90df-d45fbc17228f', '1357491600', 'song-a636ab8d-bed9-43df-b1e2-01161aeceb5f', 0),
	('song-a9a0721a-e1e6-494a-9643-1b63bc711005', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Lạc Trôi', 5, 'Sơn Tùng M-TP', '232.987007', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-a9a0721a-e1e6-494a-9643-1b63bc711005.jpeg?alt=media&token=e95d29d6-5be5-4099-a1c5-fe8f007f488b', '1483203600', 'song-a9a0721a-e1e6-494a-9643-1b63bc711005', 0),
	('song-aac27eea-cbc1-4031-be26-b0e0d5e6a25f', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Chúng Ta Của Hiện Tại', 3, 'Sơn Tùng M-TP', '301.556009', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-aac27eea-cbc1-4031-be26-b0e0d5e6a25f.jpeg?alt=media&token=a454eaa3-d802-4099-a438-843dfe01c43c', '1577984400', 'song-aac27eea-cbc1-4031-be26-b0e0d5e6a25f', 0),
	('song-ab7da2ba-6079-434b-96b1-7742eb40c7d7', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Chúng Ta Không Thuộc Về Nhau', 5, 'Sơn Tùng M-TP', '236.193379', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-ab7da2ba-6079-434b-96b1-7742eb40c7d7.jpeg?alt=media&token=694ce1e4-b992-4733-81cf-a059f4d4fcac', '1451754000', 'song-ab7da2ba-6079-434b-96b1-7742eb40c7d7', 0),
	('song-b1d95327-057f-4a9f-abec-8eba59ea9371', 'artist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Tìm Lại Bầu Trời', 2, 'Tuấn Hưng', '328.817007', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-b1d95327-057f-4a9f-abec-8eba59ea9371.jpeg?alt=media&token=df9cd734-e2ea-439b-a03b-3e5a579db7d4', '1293987600', 'song-b1d95327-057f-4a9f-abec-8eba59ea9371', 0),
	('song-b769ab3f-f2bd-4c23-a41a-ec3f99e9f4dc', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Cơn Mưa Ngang Qua', 5, 'Sơn Tùng M-TP', '230.992109', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-b769ab3f-f2bd-4c23-a41a-ec3f99e9f4dc.jpeg?alt=media&token=37d18c3f-d376-4a11-a894-7b31bb6695b8', '1388682000', 'song-b769ab3f-f2bd-4c23-a41a-ec3f99e9f4dc', 0),
	('song-b987433e-b777-40c4-8e84-edf3dca11b64', 'artist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Như Phút Ban Đầu', 0, 'Noo Phước Thịnh', '253', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-b987433e-b777-40c4-8e84-edf3dca11b64.jpeg?alt=media&token=9604b913-41ae-4632-9215-4d49b35ca24f', '1475640051', 'song-b987433e-b777-40c4-8e84-edf3dca11b64', 0),
	('song-bdc3f005-cad3-438d-97cf-475a01c5cae6', 'artist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Gạt Đi Nước Mắt', 0, 'Noo Phước Thịnh', '259', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-bdc3f005-cad3-438d-97cf-475a01c5cae6.jpeg?alt=media&token=446d62b4-9709-4468-be46-195ac2eae5c7', '1418874095', 'song-bdc3f005-cad3-438d-97cf-475a01c5cae6', 0),
	('song-c6240124-3a3b-446c-ad72-96beb41c4506', '42a9314d-5f14-4786-88ab-604359aa75e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Anh Ghét Làm Bạn Em', 2, 'Phan Mạnh Quỳnh', '246.960998', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-c6240124-3a3b-446c-ad72-96beb41c4506.jpeg?alt=media&token=ce2c95ae-527c-498e-be77-02aa34ab9397', '1413219600', 'song-c6240124-3a3b-446c-ad72-96beb41c4506', 0),
	('song-c7bf148f-c85e-47ad-88ef-e44ed8bd7a27', 'artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9 artist-37d07bbb-b815-488f-baa5-6c25cbe4ba74-1725550799643', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Mặt Trời Của Em', 7, 'JustaTee,Phương Ly', '249.332993', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-c7bf148f-c85e-47ad-88ef-e44ed8bd7a27.jpeg?alt=media&token=4963126b-177b-4b88-84e8-9394e177c055', '1509205542', 'song-c7bf148f-c85e-47ad-88ef-e44ed8bd7a27', 0),
	('song-cf0b9b88-603f-435c-b7f9-b35935b76480', 'artist-ee6b7fbc-e072-4a33-9e03-887fc1f82008-1725286552482', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Người Ấy', 2, 'Trịnh Thăng Bình', '253.608005', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-cf0b9b88-603f-435c-b7f9-b35935b76480.jpeg?alt=media&token=5149e7ea-50f8-48fa-9e03-f6170b33aff5', '1357146000', 'song-cf0b9b88-603f-435c-b7f9-b35935b76480', 0),
	('song-d2ba7c4e-e4b2-440a-8252-a7a488ac5439', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', 'cffc2553-4cf3-48ae-ae10-2e70b8d5955b', 'Glitter (Fairy Tail - Ending 11)', 6, 'Fairy Tail', '239.947279', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-d2ba7c4e-e4b2-440a-8252-a7a488ac5439.jpeg?alt=media&token=5100ab77-da74-4761-a54d-6af47670fa10', '1325523600', 'song-d2ba7c4e-e4b2-440a-8252-a7a488ac5439', 0),
	('song-d539d44d-fdf0-41d5-ab2b-4bc5b3f2ba95', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Không Phải Dạng Vừa Đâu', 3, 'Sơn Tùng M-TP', '246.125011', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-d539d44d-fdf0-41d5-ab2b-4bc5b3f2ba95.jpeg?alt=media&token=d63b0ac1-66b6-4b49-91d8-27de98d0a027', '1420218000', 'song-d539d44d-fdf0-41d5-ab2b-4bc5b3f2ba95', 0),
	('song-d5929fd7-3621-4b43-828c-ebfe89618c21', '42a9314d-5f14-4786-88ab-604359aa75e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Hãy Ra Khỏi Người Đó Đi', 5, 'Phan Mạnh Quỳnh', '190.38', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-d5929fd7-3621-4b43-828c-ebfe89618c21.jpeg?alt=media&token=79cf638a-d8c7-4691-ac55-2906e73fbf67', '1451754000', 'song-d5929fd7-3621-4b43-828c-ebfe89618c21', 0),
	('song-db7a06fe-3561-4b53-bd28-8151fb65bc44', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Một Năm Mới Bình An', 4, 'Sơn Tùng M-TP', '247.170998', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-db7a06fe-3561-4b53-bd28-8151fb65bc44.jpeg?alt=media&token=bc47e07f-ad3e-49c2-a180-b95bfeaf9209', '1453556956', 'song-db7a06fe-3561-4b53-bd28-8151fb65bc44', 0),
	('song-dcf2696a-bad3-4046-8101-64b3e943a3bf', 'artist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Anh Nhớ Em', 2, 'Tuấn Hưng', '259.631995', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-dcf2696a-bad3-4046-8101-64b3e943a3bf.jpeg?alt=media&token=241396d9-7395-41b0-ace7-254f204ab958', '1451754000', 'song-dcf2696a-bad3-4046-8101-64b3e943a3bf', 0),
	('song-e2497509-d209-44cd-8af0-e077f6f182e7', 'artist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Cầu Vòng Khuyết', 1, 'Tuấn Hưng', '251.89', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-e2497509-d209-44cd-8af0-e077f6f182e7.jpeg?alt=media&token=e79cd673-9e71-4941-aced-8b009b3c91ab', '1357146000', 'song-e2497509-d209-44cd-8af0-e077f6f182e7', 0),
	('song-e4e99454-add9-4bbf-a77b-ad3e56699c3b', 'artist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710 artist-fd1ff219-ee15-45ff-baa5-316e29bd8998-1723110503718', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Yêu Đơn Phương', 1, 'Only C,Karik', '268.8', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-e4e99454-add9-4bbf-a77b-ad3e56699c3b.jpeg?alt=media&token=6a367e53-8fc1-4dca-b3c2-be7c34d94806', '1514912400', 'song-e4e99454-add9-4bbf-a77b-ad3e56699c3b', 0),
	('song-edc5de55-7c18-4782-8e38-b641a50a2994', 'artist-717aba39-8501-41c1-8a26-8f68c4b282e3-1725186015160', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Giả Vờ Như Em Yêu Anh', 0, 'Miu Lê', '234', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-edc5de55-7c18-4782-8e38-b641a50a2994.jpeg?alt=media&token=cfebc7de-932a-45eb-b26d-462ee352b8a6', '1376927309', 'song-edc5de55-7c18-4782-8e38-b641a50a2994', 0),
	('song-f19d4db3-0087-4224-961a-f977afd194a4', 'artist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Thấy Là Yêu Thương', 0, 'Only C', '241.537', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-f19d4db3-0087-4224-961a-f977afd194a4.jpeg?alt=media&token=4a2f4ca2-9555-4ae2-aaf4-eef42b9f511f', '1483376400', 'song-f19d4db3-0087-4224-961a-f977afd194a4', 0),
	('song-f29bddea-56c9-415f-980d-491d489a5732', 'artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Có em chờ', 2, 'MIN', '243.554104', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-f29bddea-56c9-415f-980d-491d489a5732.jpeg?alt=media&token=6e79f348-180c-471d-a8cc-66cf6565232f', '1483376400', 'song-f29bddea-56c9-415f-980d-491d489a5732', 0),
	('song-f4381e2c-c4a5-4c1d-bf4c-dd4f03aef3de', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', 'cffc2553-4cf3-48ae-ae10-2e70b8d5955b', 'HOLY SHINE (Fairy Tail ED 5)', 5, 'Fairy Tail', '274.599184', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-f4381e2c-c4a5-4c1d-bf4c-dd4f03aef3de.jpeg?alt=media&token=f9fcba75-7110-4e9a-a8f3-e10a4ac7f8e2', '1293987600', 'song-f4381e2c-c4a5-4c1d-bf4c-dd4f03aef3de', 0),
	('song-f696fb26-5004-4136-8621-02cce631e173', 'artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Cà Phê', 3, 'MIN', '190.526009', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-f696fb26-5004-4136-8621-02cce631e173.jpeg?alt=media&token=496982f2-ee17-4b27-8a02-d5f1af1686aa', '1641142800', 'song-f696fb26-5004-4136-8621-02cce631e173', 0),
	('song-f6d98097-3555-4a83-9838-84cbae4a3bd3', 'artist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Xa Em', 0, 'Noo Phước Thịnh', '356', 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-f6d98097-3555-4a83-9838-84cbae4a3bd3.jpeg?alt=media&token=4fda6992-9c4e-461c-b0db-b29ea2593e9e', '1342582247', 'song-f6d98097-3555-4a83-9838-84cbae4a3bd3', 0);

-- Dumping structure for table defaultdb.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Vertify` char(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT '0',
  `Nationality` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT '""',
  `ChanalName` varchar(30) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `pathImage` varchar(300) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `description` varchar(200) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `RefeshToken` varchar(100) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `Banner` varchar(300) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `role` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table defaultdb.user: ~15 rows (approximately)
INSERT INTO `user` (`id`, `Name`, `Vertify`, `Nationality`, `ChanalName`, `pathImage`, `description`, `RefeshToken`, `Banner`, `role`) VALUES
	('42a9314d-5f14-4786-88ab-604359aa75e1', 'Phan Manh Quỳnh', '1', 'Phan Mạnh Quỳnh', 'Phan Mạnh Quỳnh', '/public/avatar/pmq.jpg', '', '', '/public/banner/phanmanhquynhf.jpg', 'user'),
	('51925ca6-74c6-418d-9273-793061b05aa6', 'Sơn Tùng M-TP', '1', 'Việt Nam', 'Sơn Tùng M-TP', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2F51925ca6-74c6-418d-9273-793061b05aa6.jpeg?alt=media&token=8f20e1fb-7667-460b-a200-d4ccf4966c70', '', '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/Banner%2F51925ca6-74c6-418d-9273-793061b05aa6.jpeg?alt=media&token=3bfdc2d0-675b-49a2-9317-75a14aeb0cae', 'user'),
	('9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', 'Đen Vâu', '1', 'Đen Vâu', 'Đen Vâu', '/public/avatar/denvau.jpg', '', '', '/public/banner/denvau.jpg', 'user'),
	('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'admin', '3', '', '', '', '', '', '', 'master'),
	('artist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9', 'JustaTee', '1', 'Việt Nam', 'JustaTee', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9.jpeg?alt=media&token=6b7829ef-cbf4-4acf-80f0-baf7cfbe45e8', '', '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/Banner%2Fartist-0a9a1230-3eae-4275-90e2-4f38ba44a6d9.jpeg?alt=media&token=d023a200-c3ab-4799-b0f4-ff9f053d2e61', 'user'),
	('artist-37d07bbb-b815-488f-baa5-6c25cbe4ba74-1725550799643', 'Phương Ly', '1', 'Viết Nam', 'Phương Ly', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-37d07bbb-b815-488f-baa5-6c25cbe4ba74-1725550799643.jpeg?alt=media&token=920df610-5fa4-4c4a-8884-13df8f38fee5', 'Đây là nghệ sĩ tài năng', '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/Banner%2Fartist-37d07bbb-b815-488f-baa5-6c25cbe4ba74-1725550799643.jpeg?alt=media&token=f3362be6-9fe8-4509-a0c1-55187c57dd62', 'user'),
	('artist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2', 'MIN', '1', 'Việt Nam', 'MIN', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2.jpeg?alt=media&token=c4bc0e67-98d4-49c6-b871-f31c39f95770', '', '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/Banner%2Fartist-566a4f2a-83f4-4ad1-a550-1b52091a8bf2.jpeg?alt=media&token=5014c7f7-72cb-4200-b8f0-565f1dd17be0', 'user'),
	('artist-717aba39-8501-41c1-8a26-8f68c4b282e3-1725186015160', 'Miu Lê', '1', 'Viết Nam', 'Miu Lê', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-717aba39-8501-41c1-8a26-8f68c4b282e3-1725186015160.jpeg?alt=media&token=6e66f5c4-f783-44fd-b79e-cd170c2e28ef', 'Đây là nghệ sĩ tài năng', '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/Banner%2Fartist-717aba39-8501-41c1-8a26-8f68c4b282e3-1725186015160.jpeg?alt=media&token=ef20c913-c92c-43fd-911f-756ea4873180', 'user'),
	('artist-87cb9a4c-45d8-426a-bcac-9576677321f0-1725185616844', 'Lou Hoàng', '1', 'Viết Nam', 'Lou Hoàng', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-87cb9a4c-45d8-426a-bcac-9576677321f0-1725185616844.jpeg?alt=media&token=a8a68e42-ca65-42de-aee6-67c34a6ce600', 'Đây là nghệ sĩ tài năng', '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/Banner%2Fartist-87cb9a4c-45d8-426a-bcac-9576677321f0-1725185616844.jpeg?alt=media&token=5c87670d-67e2-4359-adf0-a266701f6569', 'user'),
	('artist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104', 'Tuấn Hưng', '1', 'Viết Nam', 'Tuấn Hưng', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104.jpeg?alt=media&token=8b7556f7-9be9-4150-8a8f-7c4fe76d6f08', 'Đây là nghệ sĩ tài năng', '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/Banner%2Fartist-a3e230e4-c1bb-48a8-8069-d6e3792323fc-1725283096104.jpeg?alt=media&token=12dd306c-342d-41f3-87ab-e33ed4984f9f', 'user'),
	('artist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688', 'Noo Phước Thịnh', '1', 'Việt Nam', 'Noo Phước Thịnh', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688.jpeg?alt=media&token=0a6a6198-7ebd-4d7b-bfef-77694cee3ffb', 'Đây là nghệ sĩ tài năng', '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/Banner%2Fartist-b29a1a00-42ee-4984-a16e-0c757b4cec78-1731984342688.jpeg?alt=media&token=8c3e0ed2-0309-4cba-ba03-7e75caeb52ac', 'user'),
	('artist-e3f078e5-f587-4c18-a790-424e6dd64487-1725455195688', 'Trung Tự', '1', 'Viết Nam', 'Trung Tự', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-e3f078e5-f587-4c18-a790-424e6dd64487-1725455195688.jpeg?alt=media&token=b50c4a4c-75b7-4e25-94a3-cf9e562d4b02', 'Đây là nghệ sĩ tài năng', '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/Banner%2Fartist-e3f078e5-f587-4c18-a790-424e6dd64487-1725455195688.jpeg?alt=media&token=94d865f9-9648-473f-8457-5dac7bdbb474', 'user'),
	('artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', 'Fairy Tail', '1', 'Nhật Bản', 'Fairy Tail', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4.jpeg?alt=media&token=1f9581ea-6195-4d6d-8cba-685b7896feb3', 'Đây là nghệ sĩ tài năng', '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/Banner%2Fartist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4.jpeg?alt=media&token=f2dfcbdf-9d83-4ff2-92f0-8d8fedcdb0f0', 'user'),
	('artist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710', 'Only C', '1', 'Việt Nam', 'Only C', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710.jpeg?alt=media&token=3abc6c4d-6395-4acc-b0bf-3bcf4d985560', 'Đây là nghệ sĩ tài năng', '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/Banner%2Fartist-ea7399e9-d854-426d-b4ca-dc2644b88a74-1723107672710.jpeg?alt=media&token=389fa49d-c876-4ada-ab0a-f9a43903c117', 'user'),
	('artist-ee6b7fbc-e072-4a33-9e03-887fc1f82008-1725286552482', 'Trịnh Thăng Bình', '1', 'Viết Nam', 'Trịnh Thăng Bình', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-ee6b7fbc-e072-4a33-9e03-887fc1f82008-1725286552482.jpeg?alt=media&token=428230f6-5a70-43cf-89af-197dd028aeee', 'Đây là nghệ sĩ tài năng', '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/Banner%2Fartist-ee6b7fbc-e072-4a33-9e03-887fc1f82008-1725286552482.jpeg?alt=media&token=640d89e5-7a88-44b2-82d1-4c1019730d45', 'user'),
	('artist-fd1ff219-ee15-45ff-baa5-316e29bd8998-1723110503718', 'Karik', '1', 'Việt Nam', 'Karik', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-fd1ff219-ee15-45ff-baa5-316e29bd8998-1723110503718.jpeg?alt=media&token=4fdf0a36-5eae-47fa-b260-26ebbc373731', 'Đây là nghệ sĩ tài năng', '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/Banner%2Fartist-fd1ff219-ee15-45ff-baa5-316e29bd8998-1723110503718.jpeg?alt=media&token=f17e7f2b-033a-4c5d-a9b1-93bcb6d33d4a', 'user'),
	('artist-fe79e6f5-1ebe-4223-9b00-3e00c16af0bd', 'Erik', '1', 'Việt Nam', 'Erik', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-fe79e6f5-1ebe-4223-9b00-3e00c16af0bd.jpeg?alt=media&token=3bc37096-30bb-40ef-9a66-4f3097dcdd39', '', '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/Banner%2Fartist-fe79e6f5-1ebe-4223-9b00-3e00c16af0bd.jpeg?alt=media&token=1d0b9a9c-010c-4c44-83b2-edb63eb12bad', 'user'),
	('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'huy', '0', '', '', 'https://avatars.githubusercontent.com/u/71593544?v=4', '', '', '', 'user'),
	('user-7364e787-c5e0-495f-852c-9d7850b817ef', 'nhân viên 3', '0', '', '', '/public/avatar/avatar.jpg', '', '', '', 'employee'),
	('user-9a6bf20a-dcee-4adf-81cf-e18a524a98b9', 'nhân viên 2', '0', '', '', '/public/avatar/avatar.jpg', '', '', '', 'employee'),
	('user-c7438792-5c68-466d-ae19-25aef6856bc2', 'nhân viên', '0', '', '', '/public/avatar/avatar.jpg', '', '', '', 'employee'),
	('user-f251a07e-7465-477b-9fa6-ee0a9f85c52d-1723366291936', 'khang hai', '0', '', 'khang hai', 'https://lh3.googleusercontent.com/a/ACg8ocLLzhOFABIwe28HYPqdWTlLJ1K_MroTPqia3pvuV1HWrkrI=s96-c', '', '', '', 'user');

-- Dumping structure for trigger defaultdb.up_contain_playlist
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO';
DELIMITER //
CREATE TRIGGER `up_contain_playlist` AFTER UPDATE ON `playlist` FOR EACH ROW UPDATE contain SET PlayList_id =NEW.id
where contain.PlayList_id=OLD.id//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
