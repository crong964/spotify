-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 27, 2024 lúc 04:45 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `spotify`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` varchar(100) NOT NULL,
  `Account` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `Account`, `Password`) VALUES
('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'admin', 'admin@admin'),
('9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', 'DenVau@pmq.com', 'huy@huy123'),
('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'huy91027@gmail.com', 'huy@huy123'),
('user-c7438792-5c68-466d-ae19-25aef6856bc2', 'nhanvien', 'huy@huy123'),
('user-9a6bf20a-dcee-4adf-81cf-e18a524a98b9', 'nhanvien2', 'huy@huy123'),
('user-7364e787-c5e0-495f-852c-9d7850b817ef', 'nhanvien3', 'huy@huy123'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'PhanManhQuynh@pmq.com', 'huy@huy123'),
('51925ca6-74c6-418d-9273-793061b05aa6', 'sontungmtp@enter.com', 'huy@huy123');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `artistmanagement`
--

CREATE TABLE `artistmanagement` (
  `idArtist` varchar(100) NOT NULL,
  `createtime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `artistmanagement`
--

INSERT INTO `artistmanagement` (`idArtist`, `createtime`) VALUES
('artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', '2024-06-25 23:25:10');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `boxchat`
--

CREATE TABLE `boxchat` (
  `idBox` varchar(100) NOT NULL,
  `Ngay` datetime NOT NULL DEFAULT current_timestamp(),
  `content` varchar(100) NOT NULL,
  `id` varchar(100) NOT NULL,
  `boxtype` varchar(100) NOT NULL DEFAULT 'nofirend',
  `boxiamge` varchar(100) DEFAULT NULL,
  `updateDay` datetime NOT NULL DEFAULT current_timestamp(),
  `messType` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `boxchat`
--

INSERT INTO `boxchat` (`idBox`, `Ngay`, `content`, `id`, `boxtype`, `boxiamge`, `updateDay`, `messType`) VALUES
('idbox-6acf7197-951e-45ca-bfc2-a984997d6501', '2024-04-11 09:05:30', '', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 'noFriend', NULL, '2024-04-14 19:56:02', 'Mess'),
('idbox-deae105f-13a3-4656-bd1e-d2c669c238ff', '2024-04-10 10:00:08', '', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 'noFriend', NULL, '2024-04-14 19:55:59', 'Mess'),
('idbox-ff455627-b907-4ede-b7a0-f9371a20703d', '2024-04-11 09:15:28', 'đâs', '42a9314d-5f14-4786-88ab-604359aa75e1', 'noFriend', NULL, '2024-06-09 20:52:04', 'Mess');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `contain`
--

CREATE TABLE `contain` (
  `Song_ID` varchar(100) NOT NULL,
  `PlayList_id` varchar(100) NOT NULL,
  `TimeCreate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `contain`
--

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
('1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-04-02 14:46:46'),
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
('1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', 'artist-386a-400d-a34d-2ee585fbdf3b', '2024-06-07 21:42:05'),
('1f78e78f-18c0-405c-abe3-71ffd1fc0397', 'artist-386a-400d-a34d-2ee585fbdf3b', '2024-06-07 21:42:05'),
('50d8169a-a6da-4856-bb75-c0283f9849ae', 'artist-386a-400d-a34d-2ee585fbdf3b', '2024-06-07 21:42:05'),
('82a0e146-1b63-4194-a0f8-cfb1913f50dc', 'artist-386a-400d-a34d-2ee585fbdf3b', '2024-06-07 21:42:05'),
('f6e0a637-d439-49d2-b720-edb8f9c750f5', 'artist-386a-400d-a34d-2ee585fbdf3b', '2024-06-07 21:42:05'),
('381b6b5e-305f-4cbc-a3bf-7707147c8804', 'artist-3d43a7e6-a1a1-41a2-80d1-0d2bc4343d95', '2024-06-07 21:44:15'),
('837b3000-7ec2-4c85-a8fa-bc088cc0074e', 'artist-3d43a7e6-a1a1-41a2-80d1-0d2bc4343d95', '2024-06-07 21:44:15'),
('e17363fa-82d8-4ca4-8dee-ce1b62bcf995', 'artist-3d43a7e6-a1a1-41a2-80d1-0d2bc4343d95', '2024-06-07 21:44:15'),
('67a81238-3348-4cdf-b953-5096df977e27', 'artist-fb6d-45c6-942a-79462788fd91', '2024-06-07 21:43:44'),
('9bb2ddba-abfa-474a-ac84-d7952a51ad7e', 'artist-fb6d-45c6-942a-79462788fd91', '2024-06-07 21:43:44'),
('b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', 'artist-fb6d-45c6-942a-79462788fd91', '2024-06-07 21:43:44'),
('b53c3193-7a3f-4005-861b-52eca46f9381', 'artist-fb6d-45c6-942a-79462788fd91', '2024-06-07 21:43:44'),
('ecdba929-6516-46b3-b507-36d2c854b947', 'artist-fb6d-45c6-942a-79462788fd91', '2024-06-07 21:43:44'),
('ef9012fd-f635-49b5-918b-874c806a6b40', 'artist-fb6d-45c6-942a-79462788fd91', '2024-06-07 21:43:44'),
('song-d2ba7c4e-e4b2-440a-8252-a7a488ac5439', 'artists-12e91c71-dfcf-4f7d-9f61-4ba6c915609f-1719332710298', '2024-06-26 23:01:37'),
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
('f6e0a637-d439-49d2-b720-edb8f9c750f5', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-06-25 20:48:36');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `discuss`
--

CREATE TABLE `discuss` (
  `User_Id` varchar(100) NOT NULL,
  `Discuss_Id` varchar(100) NOT NULL,
  `Parent_discuss_Id` varchar(100) NOT NULL,
  `Replay_Discuss_Id` varchar(100) NOT NULL,
  `Replay_quality` int(11) NOT NULL DEFAULT 0,
  `Content` varchar(200) NOT NULL,
  `Type` tinyint(2) NOT NULL DEFAULT 0,
  `Song_Id` varchar(100) NOT NULL,
  `createtime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `following`
--

CREATE TABLE `following` (
  `Following_User_Id` varchar(100) NOT NULL,
  `User_ID` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `genre`
--

CREATE TABLE `genre` (
  `Id` varchar(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `createtime` datetime NOT NULL DEFAULT current_timestamp(),
  `RightGenre` int(30) NOT NULL,
  `LeftGenre` int(30) NOT NULL,
  `idParent` varchar(100) NOT NULL,
  `Floor` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `genre`
--

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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `havelistboxchat`
--

CREATE TABLE `havelistboxchat` (
  `idUser` varchar(100) NOT NULL,
  `idBox` varchar(100) NOT NULL,
  `Ngay` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(2) NOT NULL,
  `idFriend` varchar(100) NOT NULL,
  `admin` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `havelistboxchat`
--

INSERT INTO `havelistboxchat` (`idUser`, `idBox`, `Ngay`, `status`, `idFriend`, `admin`) VALUES
('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'idbox-deae105f-13a3-4656-bd1e-d2c669c238ff', '2024-04-10 10:00:08', 1, '51925ca6-74c6-418d-9273-793061b05aa6', 0),
('51925ca6-74c6-418d-9273-793061b05aa6', 'idbox-deae105f-13a3-4656-bd1e-d2c669c238ff', '2024-04-10 10:00:08', 2, '51925ca6-74c6-418d-9273-793061b05aa6', 0),
('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'idbox-6acf7197-951e-45ca-bfc2-a984997d6501', '2024-04-11 09:05:30', 1, '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', 0),
('9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', 'idbox-6acf7197-951e-45ca-bfc2-a984997d6501', '2024-04-11 09:05:30', 2, 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 0),
('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'idbox-ff455627-b907-4ede-b7a0-f9371a20703d', '2024-04-11 09:15:28', 2, '42a9314d-5f14-4786-88ab-604359aa75e1', 0),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'idbox-ff455627-b907-4ede-b7a0-f9371a20703d', '2024-04-11 09:15:28', 1, 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `havelistfriends`
--

CREATE TABLE `havelistfriends` (
  `idUser` varchar(100) NOT NULL,
  `idFriends` varchar(100) NOT NULL,
  `IsFriend` int(1) NOT NULL DEFAULT 0,
  `look` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `havelistfriends`
--

INSERT INTO `havelistfriends` (`idUser`, `idFriends`, `IsFriend`, `look`) VALUES
('42a9314d-5f14-4786-88ab-604359aa75e1', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 2, 0),
('c9a79c22-8546-4540-8d16-92c01c4a6a23', '42a9314d-5f14-4786-88ab-604359aa75e1', 2, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hiddenmesslist`
--

CREATE TABLE `hiddenmesslist` (
  `idUser` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `idMess` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `likedsong`
--

CREATE TABLE `likedsong` (
  `Id` varchar(100) NOT NULL,
  `id_user_liked` varchar(100) NOT NULL,
  `liked` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `likedsong`
--

INSERT INTO `likedsong` (`Id`, `id_user_liked`, `liked`) VALUES
('1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 0),
('1f78e78f-18c0-405c-abe3-71ffd1fc0397', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
('381b6b5e-305f-4cbc-a3bf-7707147c8804', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
('50d8169a-a6da-4856-bb75-c0283f9849ae', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
('67a81238-3348-4cdf-b953-5096df977e27', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 0),
('82a0e146-1b63-4194-a0f8-cfb1913f50dc', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
('837b3000-7ec2-4c85-a8fa-bc088cc0074e', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 0),
('9bb2ddba-abfa-474a-ac84-d7952a51ad7e', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
('b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 0),
('b53c3193-7a3f-4005-861b-52eca46f9381', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 0),
('ef9012fd-f635-49b5-918b-874c806a6b40', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 0),
('f6e0a637-d439-49d2-b720-edb8f9c750f5', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `messenge`
--

CREATE TABLE `messenge` (
  `idMess` varchar(100) NOT NULL,
  `idBox` varchar(100) NOT NULL,
  `content` varchar(400) NOT NULL,
  `type` varchar(10) NOT NULL DEFAULT 'Mess',
  `idUser` varchar(100) NOT NULL,
  `ngay` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `messenge`
--

INSERT INTO `messenge` (`idMess`, `idBox`, `content`, `type`, `idUser`, `ngay`) VALUES
('Mess-21293d51-a572-428e-8275-176fbab4c565', 'idbox-ff455627-b907-4ede-b7a0-f9371a20703d', 'đâs', 'Mess', '42a9314d-5f14-4786-88ab-604359aa75e1', '2024-06-09 20:52:04'),
('Mess-4c0a445d-73c9-4a71-8336-df90a796e424', 'idbox-ff455627-b907-4ede-b7a0-f9371a20703d', 'i/image-1714881565879-870849810.jpeg.jpg@', 'image', '42a9314d-5f14-4786-88ab-604359aa75e1', '2024-05-05 10:59:25'),
('Mess-9371bda4-93d7-4dba-afbb-8f58bac035ea', 'idbox-ff455627-b907-4ede-b7a0-f9371a20703d', 'dddd', 'Mess', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', '2024-05-12 10:45:37'),
('Mess-d0f8f86e-bec0-4562-a918-21b5c35f1bd2', 'idbox-ff455627-b907-4ede-b7a0-f9371a20703d', 'đâsd', 'Mess', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', '2024-05-12 10:45:35'),
('Mess-db290f45-ad1c-41bb-8a6c-0dbb5426495d', 'idbox-ff455627-b907-4ede-b7a0-f9371a20703d', 'i/image-1714881571915-613140972.jpeg.jpg@', 'image', '42a9314d-5f14-4786-88ab-604359aa75e1', '2024-05-05 10:59:31'),
('Mess-fc00c5da-5bb1-4a5f-bc75-f0d4628d2a8e', 'idbox-ff455627-b907-4ede-b7a0-f9371a20703d', 'i/image-1714881568664-7437403.png.jpg@', 'image', '42a9314d-5f14-4786-88ab-604359aa75e1', '2024-05-05 10:59:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notification`
--

CREATE TABLE `notification` (
  `receiver_id` varchar(100) NOT NULL,
  `Discuss_Id` varchar(100) NOT NULL,
  `createtime` datetime NOT NULL DEFAULT current_timestamp(),
  `Song_Id` varchar(100) NOT NULL,
  `replay_user_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `notification`
--

INSERT INTO `notification` (`receiver_id`, `Discuss_Id`, `createtime`, `Song_Id`, `replay_user_id`) VALUES
('42a9314d-5f14-4786-88ab-604359aa75e1', 'discuss-d76e3c7c-4012-4117-aab4-1cc0d1d0b6f6', '2024-04-06 20:58:12', '50d8169a-a6da-4856-bb75-c0283f9849ae', 'c9a79c22-8546-4540-8d16-92c01c4a6a23'),
('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'discuss-8a8e0818-7d5c-4a36-aef6-78d86e5b57a0', '2024-04-08 14:07:35', '50d8169a-a6da-4856-bb75-c0283f9849ae', '42a9314d-5f14-4786-88ab-604359aa75e1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `playlist`
--

CREATE TABLE `playlist` (
  `id` varchar(100) NOT NULL,
  `User_id` varchar(100) NOT NULL,
  `Genre_ID` varchar(100) NOT NULL,
  `Type` varchar(50) NOT NULL DEFAULT 'nono',
  `ImagePath` varchar(300) NOT NULL,
  `PlayListName` varchar(100) NOT NULL,
  `Likes` int(100) NOT NULL,
  `Songs` int(30) NOT NULL,
  `Duration` int(100) NOT NULL,
  `Status` int(2) NOT NULL DEFAULT 0,
  `Discripition` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `playlist`
--

INSERT INTO `playlist` (`id`, `User_id`, `Genre_ID`, `Type`, `ImagePath`, `PlayListName`, `Likes`, `Songs`, `Duration`, `Status`, `Discripition`) VALUES
('12a2b6d1-9684-4ffd-8b26-f593ad302ca7', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 'a7b77b1c-902b-4417-9609-eb596aa187e4', 'playlist', '/public/playlist/playlist-avatar-1711981590640-718853768.jpeg', 'Nhạc Không Thể Thiêu', 0, 14, 0, 1, ''),
('8f23b4e3-85f2-48ef-a865-9797a7100862', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 'b30d08cd-d161-4cf7-ab92-bd445d212896', 'playlist', '/public/playlist/playlist-avatar-1711979780192-601050903.jpeg', 'Hot Hit VN', 0, 3, 0, 1, ''),
('a1a46dc3-cd88-4aeb-9ae0-276962d22922', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 'b30d08cd-d161-4cf7-ab92-bd445d212896', 'playlist', '/public/playlist/playlist-avatar-1712045519005-846117435.jpeg', 'Anh Hào Nhạc Việt', 0, 7, 0, 1, ''),
('artist-386a-400d-a34d-2ee585fbdf3b', '42a9314d-5f14-4786-88ab-604359aa75e1', '', 'artist', '/public/avatar/pmq.jpg', 'Phan Manh Quỳnh', 0, 0, 0, 1, '[value-11]'),
('artist-3d43a7e6-a1a1-41a2-80d1-0d2bc4343d95', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', '', 'artist', '/public/avatar/denvau.jpg', 'Đen Vâu', 0, 0, 0, 1, '[value-11]'),
('artist-fb6d-45c6-942a-79462788fd91', '51925ca6-74c6-418d-9273-793061b05aa6', '', 'artist', 'https://i.scdn.co/image/ab676161000051747afc6ecdb9102abd1e10d338', 'Sơn Tùng M-TP', 0, 0, 0, 1, '[value-11]'),
('artists-12e91c71-dfcf-4f7d-9f61-4ba6c915609f-1719332710298', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', '', 'artist', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4.jpeg?alt=media&token=6222db65-01cd-4097-8889-07ed4a6ff5d6', 'Fairy Tail', 0, 0, 0, 1, ''),
('cf345c59-5079-452e-b1de-c829f774e7f2', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 'b30d08cd-d161-4cf7-ab92-bd445d212896', 'playlist', '/public/playlist/playlist-avatar-1711982014513-407478995.jpeg', 'Best of V-Pop Không Thể Thiếu 2023', 0, 14, 0, 1, '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `playlistlikes`
--

CREATE TABLE `playlistlikes` (
  `User_ID` varchar(100) NOT NULL,
  `PlayList_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `recentplaylist`
--

CREATE TABLE `recentplaylist` (
  `User_ID` varchar(100) NOT NULL,
  `ID` varchar(100) NOT NULL,
  `CreateTime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `recentplaylist`
--

INSERT INTO `recentplaylist` (`User_ID`, `ID`, `CreateTime`) VALUES
('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'artist-3d43a7e6-a1a1-41a2-80d1-0d2bc4343d95', '2024-06-08 10:45:08'),
('c9a79c22-8546-4540-8d16-92c01c4a6a23', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-06-08 10:45:18'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'artist-3d43a7e6-a1a1-41a2-80d1-0d2bc4343d95', '2024-06-09 16:28:16'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-06-10 11:52:57'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'artist-386a-400d-a34d-2ee585fbdf3b', '2024-06-10 11:59:58'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-06-10 12:00:26'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'artist-fb6d-45c6-942a-79462788fd91', '2024-06-10 12:09:56');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `recentsong`
--

CREATE TABLE `recentsong` (
  `user_id` varchar(100) NOT NULL,
  `Id` varchar(100) NOT NULL,
  `Time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `recentsong`
--

INSERT INTO `recentsong` (`user_id`, `Id`, `Time`) VALUES
('42a9314d-5f14-4786-88ab-604359aa75e1', 'music-7a354a3e-e82c-46a2-b8d0-7d5868e3e847', '2024-06-09 16:32:43'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'b53c3193-7a3f-4005-861b-52eca46f9381', '2024-06-09 16:39:40'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '381b6b5e-305f-4cbc-a3bf-7707147c8804', '2024-06-09 16:47:11'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', '2024-06-09 16:53:30'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '8faae5ad-8c01-4636-8b25-ecaee2eb94ab', '2024-06-09 16:53:39'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '8faae5ad-8c01-4636-8b25-ecaee2eb94ab', '2024-06-09 17:01:56'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '9bb2ddba-abfa-474a-ac84-d7952a51ad7e', '2024-06-09 17:02:10'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', '2024-06-09 17:07:13'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'b53c3193-7a3f-4005-861b-52eca46f9381', '2024-06-09 17:08:54'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '67a81238-3348-4cdf-b953-5096df977e27', '2024-06-09 20:38:09'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '837b3000-7ec2-4c85-a8fa-bc088cc0074e', '2024-06-09 20:42:32'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'b53c3193-7a3f-4005-861b-52eca46f9381', '2024-06-09 20:52:18'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'ecdba929-6516-46b3-b507-36d2c854b947', '2024-06-09 20:56:13'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'e17363fa-82d8-4ca4-8dee-ce1b62bcf995', '2024-06-09 21:00:20'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'music-7a354a3e-e82c-46a2-b8d0-7d5868e3e847', '2024-06-09 21:03:59'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', '2024-06-10 11:53:13'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', '2024-06-10 11:53:25'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '381b6b5e-305f-4cbc-a3bf-7707147c8804', '2024-06-10 11:53:33'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', '2024-06-10 11:59:54'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', '2024-06-10 11:59:58'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', '2024-06-10 12:00:20'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', '2024-06-10 12:00:23'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', '2024-06-10 12:01:28'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', '2024-06-10 12:01:33'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', '2024-06-10 12:09:54'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '67a81238-3348-4cdf-b953-5096df977e27', '2024-06-10 12:09:56'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '9bb2ddba-abfa-474a-ac84-d7952a51ad7e', '2024-06-10 12:10:09'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '67a81238-3348-4cdf-b953-5096df977e27', '2024-06-10 12:10:34'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', '2024-06-10 12:10:40'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'b53c3193-7a3f-4005-861b-52eca46f9381', '2024-06-10 12:15:15'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '67a81238-3348-4cdf-b953-5096df977e27', '2024-06-10 12:16:36'),
('42a9314d-5f14-4786-88ab-604359aa75e1', 'b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', '2024-06-10 12:16:40'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '381b6b5e-305f-4cbc-a3bf-7707147c8804', '2024-06-10 12:16:44'),
('c9a79c22-8546-4540-8d16-92c01c4a6a23', '381b6b5e-305f-4cbc-a3bf-7707147c8804', '2024-06-10 16:15:28'),
('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'f6e0a637-d439-49d2-b720-edb8f9c750f5', '2024-06-17 12:14:14'),
('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'ef9012fd-f635-49b5-918b-874c806a6b40', '2024-06-17 17:41:34'),
('42a9314d-5f14-4786-88ab-604359aa75e1', '1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', '2024-06-25 20:42:06'),
('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'song-d2ba7c4e-e4b2-440a-8252-a7a488ac5439', '2024-06-27 21:38:46');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `song`
--

CREATE TABLE `song` (
  `Id` varchar(100) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `genre_id` varchar(100) NOT NULL,
  `SongName` varchar(100) NOT NULL DEFAULT 'Chưa có tiêu đề',
  `Viewer` int(30) NOT NULL DEFAULT 0,
  `Singer` varchar(30) NOT NULL,
  `Duration` int(30) NOT NULL,
  `status` int(2) NOT NULL DEFAULT 0,
  `description` varchar(300) NOT NULL,
  `SongImage` varchar(300) NOT NULL,
  `publicDate` datetime NOT NULL DEFAULT current_timestamp(),
  `filePath` varchar(100) NOT NULL,
  `dicussquality` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `song`
--

INSERT INTO `song` (`Id`, `user_id`, `genre_id`, `SongName`, `Viewer`, `Singer`, `Duration`, `status`, `description`, `SongImage`, `publicDate`, `filePath`, `dicussquality`) VALUES
('1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', '42a9314d-5f14-4786-88ab-604359aa75e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'hãy ra khỏi người đó đi', 0, 'Phan Mạnh Quỳnh', 190, 1, '', '/public/image/avatar-1711332268132-928382065.jpeg', '0000-00-00 00:00:00', '1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', 0),
('1f78e78f-18c0-405c-abe3-71ffd1fc0397', '42a9314d-5f14-4786-88ab-604359aa75e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Xuất sơn', 0, 'Phan Mạnh Quỳnh', 201, 1, 'a', '/public/image/avatar-1714748780919-644838342.jpeg', '0000-00-00 00:00:00', 'music-7a354a3e-e82c-46a2-b8d0-7d5868e3e847', 0),
('381b6b5e-305f-4cbc-a3bf-7707147c8804', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Đi Về Nhà', 0, 'Đen Vâu, JustaTee', 206, 1, '', '/public/image/avatar-1711977353391-140999932.jpeg', '0000-00-00 00:00:00', '381b6b5e-305f-4cbc-a3bf-7707147c8804', 0),
('50d8169a-a6da-4856-bb75-c0283f9849ae', '42a9314d-5f14-4786-88ab-604359aa75e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'vơ người ta', 0, 'Phan Mạnh Quỳnh', 197, 1, '', '/public/image/avatar-1711332228038-776879475.jpeg', '0000-00-00 00:00:00', '50d8169a-a6da-4856-bb75-c0283f9849ae', 0),
('67a81238-3348-4cdf-b953-5096df977e27', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Nơi này có anh', 0, 'Sơn Tùng M-TP', 262, 1, '', '/public/image/avatar-1711272410077-676924021.jpeg', '0000-00-00 00:00:00', '67a81238-3348-4cdf-b953-5096df977e27', 0),
('82a0e146-1b63-4194-a0f8-cfb1913f50dc', '42a9314d-5f14-4786-88ab-604359aa75e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'wc', 0, 'Phan Mạnh Quỳnh', 225, 1, '3123', '/public/image/avatar-1714749010345-298928302.jpeg', '0000-00-00 00:00:00', '82a0e146-1b63-4194-a0f8-cfb1913f50dc', 0),
('837b3000-7ec2-4c85-a8fa-bc088cc0074e', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Nhạc Này Chill Phết', 0, 'Đen Vâu, Min', 273, 1, '', '/public/image/avatar-1711977387771-118609622.jpeg', '0000-00-00 00:00:00', '837b3000-7ec2-4c85-a8fa-bc088cc0074e', 0),
('9bb2ddba-abfa-474a-ac84-d7952a51ad7e', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Chúng ta của hiện tại', 0, 'Sơn Tùng M-TP', 302, 1, '', '/public/image/avatar-1711272707603-723681858.jpeg', '0000-00-00 00:00:00', '9bb2ddba-abfa-474a-ac84-d7952a51ad7e', 0),
('aaa', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', '', 'Đưa nhau đi trốn', 0, 'Đen Vâu', 194, 1, '', '/public/image/avatar-1711718096295-138445857.jpeg', '0000-00-00 00:00:00', '8faae5ad-8c01-4636-8b25-ecaee2eb94ab', 0),
('b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'MUỘN RỒI MÀ SAO CÒN ', 0, 'SƠN TÙNG M-TP ', 274, 1, '', '/public/image/avatar-1711977508087-423908970.jpeg', '0000-00-00 00:00:00', 'b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', 0),
('b53c3193-7a3f-4005-861b-52eca46f9381', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Em của ngày hôm qua', 0, 'Sơn Tùng M-TP', 232, 1, '', '/public/image/avatar-1711272494063-507340757.jpeg', '0000-00-00 00:00:00', 'b53c3193-7a3f-4005-861b-52eca46f9381', 0),
('e17363fa-82d8-4ca4-8dee-ce1b62bcf995', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', '2 Triệu Năm', 0, 'Đen Vâu,Biên', 217, 1, '', '/public/image/avatar-1711977307658-644167533.jpeg', '0000-00-00 00:00:00', 'e17363fa-82d8-4ca4-8dee-ce1b62bcf995', 0),
('ecdba929-6516-46b3-b507-36d2c854b947', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Hãy Trao Cho Anh', 0, 'Sơn Tùng MTP', 246, 1, '', '/public/image/avatar-1711977452681-373494792.jpeg', '0000-00-00 00:00:00', 'ecdba929-6516-46b3-b507-36d2c854b947', 0),
('ef9012fd-f635-49b5-918b-874c806a6b40', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Buông đôi tay nhau ra', 0, 'Sơn Tùng M-TP', 0, 1, '', '/public/image/avatar-1711272331371-587600195.jpeg', '0000-00-00 00:00:00', 'ef9012fd-f635-49b5-918b-874c806a6b40', 0),
('f6e0a637-d439-49d2-b720-edb8f9c750f5', '42a9314d-5f14-4786-88ab-604359aa75e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Khi phải quên người đó đi', 0, 'Phan Mạnh Quỳnh', 324, 1, '', '/public/image/avatar-1711332305669-701321911.jpeg', '0000-00-00 00:00:00', 'f6e0a637-d439-49d2-b720-edb8f9c750f5', 0),
('song-d2ba7c4e-e4b2-440a-8252-a7a488ac5439', 'artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', '', 'Glitter (Fairy Tail - Ending 11)', 0, 'Fairy Tail ', 240, 1, '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/SongImage%2Fsong-d2ba7c4e-e4b2-440a-8252-a7a488ac5439.jpeg?alt=media&token=5e71950f-4ba0-4526-b770-5163d3d2abd0', '0000-00-00 00:00:00', 'song-d2ba7c4e-e4b2-440a-8252-a7a488ac5439', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` varchar(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Vertify` tinyint(1) NOT NULL DEFAULT 0,
  `Nationality` varchar(30) NOT NULL DEFAULT '""',
  `ChanalName` varchar(30) DEFAULT NULL,
  `pathImage` varchar(300) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `RefeshToken` varchar(100) DEFAULT NULL,
  `Banner` varchar(300) DEFAULT NULL,
  `role` varchar(100) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `Name`, `Vertify`, `Nationality`, `ChanalName`, `pathImage`, `description`, `RefeshToken`, `Banner`, `role`) VALUES
('42a9314d-5f14-4786-88ab-604359aa75e1', 'Phan Manh Quỳnh', 1, 'Phan Mạnh Quỳnh', 'Phan Mạnh Quỳnh', '/public/avatar/pmq.jpg', '', '', '/public/banner/phanmanhquynhf.jpg', 'user'),
('51925ca6-74c6-418d-9273-793061b05aa6', 'Sơn Tùng M-TP', 1, 'Việt Nam', 'Sơn Tùng M-TP', 'https://i.scdn.co/image/ab676161000051747afc6ecdb9102abd1e10d338', '', '', 'https://i.scdn.co/image/ab6761860000101698929fc24f88d6481cf2a7a5', 'user'),
('9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', 'Đen Vâu', 1, 'Đen Vâu', 'Đen Vâu', '/public/avatar/denvau.jpg', '', '', '/public/banner/denvau.jpg', 'user'),
('admine88e7421-a0d4-48f2-a221-b30cfc54a7dc]', 'admin', 3, '', '', '', '', '', '', 'master'),
('artist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4', 'Fairy Tail', 1, 'Nhật Bản', 'Fairy Tail', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/PathImageFile%2Fartist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4.jpeg?alt=media&token=6222db65-01cd-4097-8889-07ed4a6ff5d6', 'Đây là nghệ sĩ tài năng', '', 'https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/Banner%2Fartist-e9a1e896-ecc4-4adc-9f5e-2cd107fb1ed4.jpeg?alt=media&token=40e6f194-f042-4a37-b7be-d0fde1947bef', 'user'),
('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'huy', 0, '', '', 'https://avatars.githubusercontent.com/u/71593544?v=4', '', '', '', 'user'),
('user-7364e787-c5e0-495f-852c-9d7850b817ef', 'nhân viên 3', 0, '', '', '/public/avatar/avatar.jpg', '', '', '', 'employee'),
('user-9a6bf20a-dcee-4adf-81cf-e18a524a98b9', 'nhân viên 2', 0, '', '', '/public/avatar/avatar.jpg', '', '', '', 'employee'),
('user-c7438792-5c68-466d-ae19-25aef6856bc2', 'nhân viên', 0, '', '', '/public/avatar/avatar.jpg', '', '', '', 'employee');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`Account`);

--
-- Chỉ mục cho bảng `artistmanagement`
--
ALTER TABLE `artistmanagement`
  ADD PRIMARY KEY (`idArtist`);

--
-- Chỉ mục cho bảng `boxchat`
--
ALTER TABLE `boxchat`
  ADD PRIMARY KEY (`idBox`);

--
-- Chỉ mục cho bảng `contain`
--
ALTER TABLE `contain`
  ADD UNIQUE KEY `PlayList_id` (`PlayList_id`,`Song_ID`);

--
-- Chỉ mục cho bảng `discuss`
--
ALTER TABLE `discuss`
  ADD KEY `Song_Id` (`Song_Id`,`Discuss_Id`);

--
-- Chỉ mục cho bảng `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `havelistfriends`
--
ALTER TABLE `havelistfriends`
  ADD UNIQUE KEY `idUser` (`idUser`,`idFriends`);

--
-- Chỉ mục cho bảng `likedsong`
--
ALTER TABLE `likedsong`
  ADD UNIQUE KEY `id_user_liked` (`id_user_liked`,`Id`);

--
-- Chỉ mục cho bảng `messenge`
--
ALTER TABLE `messenge`
  ADD PRIMARY KEY (`idMess`),
  ADD UNIQUE KEY `idBox` (`idBox`,`idMess`);

--
-- Chỉ mục cho bảng `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `recentplaylist`
--
ALTER TABLE `recentplaylist`
  ADD KEY `User_ID` (`User_ID`,`ID`);

--
-- Chỉ mục cho bảng `recentsong`
--
ALTER TABLE `recentsong`
  ADD KEY `user_id` (`user_id`,`Id`);

--
-- Chỉ mục cho bảng `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
