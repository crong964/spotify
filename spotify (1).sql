-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 03, 2024 lúc 11:18 AM
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
('381b6b5e-305f-4cbc-a3bf-7707147c8804', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-04-01 21:26:30'),
('50d8169a-a6da-4856-bb75-c0283f9849ae', '12a2b6d1-9684-4ffd-8b26-f593ad302ca7', '2024-04-01 21:26:30'),
('1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', '8f23b4e3-85f2-48ef-a865-9797a7100862', '2024-04-02 14:46:46'),
('1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-04-02 15:04:21'),
('381b6b5e-305f-4cbc-a3bf-7707147c8804', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-04-02 15:04:21'),
('837b3000-7ec2-4c85-a8fa-bc088cc0074e', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-04-02 15:04:21'),
('9bb2ddba-abfa-474a-ac84-d7952a51ad7e', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-04-02 15:04:21'),
('b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-04-02 15:04:21'),
('b53c3193-7a3f-4005-861b-52eca46f9381', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-04-02 15:06:07'),
('e17363fa-82d8-4ca4-8dee-ce1b62bcf995', 'a1a46dc3-cd88-4aeb-9ae0-276962d22922', '2024-04-02 15:06:07'),
('1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-04-02 14:44:56'),
('381b6b5e-305f-4cbc-a3bf-7707147c8804', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-04-02 14:45:18'),
('50d8169a-a6da-4856-bb75-c0283f9849ae', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-04-02 14:45:59'),
('67a81238-3348-4cdf-b953-5096df977e27', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-04-02 14:45:23'),
('b53c3193-7a3f-4005-861b-52eca46f9381', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-04-01 21:33:34'),
('e17363fa-82d8-4ca4-8dee-ce1b62bcf995', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-04-02 14:45:27'),
('ecdba929-6516-46b3-b507-36d2c854b947', 'cf345c59-5079-452e-b1de-c829f774e7f2', '2024-04-01 21:33:34');

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
  `Content` varchar(30) NOT NULL,
  `Type` tinyint(2) NOT NULL DEFAULT 0,
  `Song_Id` varchar(100) NOT NULL
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
('0a57712c-1d83-4d65-8d35-e931fb0c4e11', 'music', '2024-03-20 15:21:13', 21, 8, '0', 0),
('34c696c6-e129-4a7b-93c2-e887daf485f6', 'Nhạc Việt', '2024-03-20 15:35:43', 14, 9, '0a57712c-1d83-4d65-8d35-e931fb0c4e11', 1),
('450b9e50-3d98-4aef-aff3-a70a9d407f96', 'Nhạc trung', '2024-03-21 10:42:49', 20, 19, '0a57712c-1d83-4d65-8d35-e931fb0c4e11', 1),
('5c34a9ba-38a3-4367-b7a4-2ee7ba0018a5', 'Hài kịch', '2024-03-20 15:35:20', 6, 5, 'ff9f2d78-513c-4071-979e-985e015793ff', 1),
('a7b77b1c-902b-4417-9609-eb596aa187e4', 'Nhạc Việt Hay Nhất', '2024-04-01 21:19:29', 13, 12, '34c696c6-e129-4a7b-93c2-e887daf485f6', 2),
('b30d08cd-d161-4cf7-ab92-bd445d212896', 'Nhạc Việt thịch hành', '2024-03-20 15:36:31', 11, 10, '34c696c6-e129-4a7b-93c2-e887daf485f6', 2),
('c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Pop', '2024-03-20 15:35:53', 16, 15, '0a57712c-1d83-4d65-8d35-e931fb0c4e11', 1),
('d7368df9-d960-4d20-ad9b-0f6286b78fa5', 'K-Pop', '2024-03-20 15:36:03', 18, 17, '0a57712c-1d83-4d65-8d35-e931fb0c4e11', 1),
('de671b6a-13a8-440c-a258-85a333359be6', 'Tài liệu', '2024-03-20 15:35:11', 4, 3, 'ff9f2d78-513c-4071-979e-985e015793ff', 1),
('f115ac15-bda0-45aa-9d68-c122ff2e3d99', 'Sư phạm', '2024-03-20 15:35:03', 2, 1, 'ff9f2d78-513c-4071-979e-985e015793ff', 1),
('ff9f2d78-513c-4071-979e-985e015793ff', 'pobcast', '2024-03-20 15:21:06', 7, 0, '0', 0);

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
('67a81238-3348-4cdf-b953-5096df977e27', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 0),
('837b3000-7ec2-4c85-a8fa-bc088cc0074e', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
('9bb2ddba-abfa-474a-ac84-d7952a51ad7e', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1),
('b53c3193-7a3f-4005-861b-52eca46f9381', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `playlist`
--

CREATE TABLE `playlist` (
  `id` varchar(100) NOT NULL,
  `User_id` varchar(100) NOT NULL,
  `Genre_ID` varchar(100) NOT NULL,
  `Type` int(2) NOT NULL DEFAULT 0,
  `ImagePath` varchar(100) NOT NULL,
  `PlayListName` varchar(100) NOT NULL,
  `Likes` int(100) NOT NULL,
  `Songs` int(30) NOT NULL,
  `Duration` int(100) NOT NULL,
  `Status` int(2) NOT NULL,
  `Discripition` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `playlist`
--

INSERT INTO `playlist` (`id`, `User_id`, `Genre_ID`, `Type`, `ImagePath`, `PlayListName`, `Likes`, `Songs`, `Duration`, `Status`, `Discripition`) VALUES
('12a2b6d1-9684-4ffd-8b26-f593ad302ca7', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 'a7b77b1c-902b-4417-9609-eb596aa187e4', 1, 'public/playlist/playlist-avatar-1711981590640-718853768.jpeg', 'Nhạc Không Thể Thiêu', 0, 3, 0, 0, ''),
('8f23b4e3-85f2-48ef-a865-9797a7100862', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 'b30d08cd-d161-4cf7-ab92-bd445d212896', 1, 'public/playlist/playlist-avatar-1711979780192-601050903.jpeg', 'Hot Hit VN', 0, 3, 0, 0, ''),
('a1a46dc3-cd88-4aeb-9ae0-276962d22922', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 'b30d08cd-d161-4cf7-ab92-bd445d212896', 1, 'public/playlist/playlist-avatar-1712045519005-846117435.jpeg', 'Anh Hào Nhạc Việt', 0, 2, 0, 0, ''),
('cf345c59-5079-452e-b1de-c829f774e7f2', 'c9a79c22-8546-4540-8d16-92c01c4a6a23', 'b30d08cd-d161-4cf7-ab92-bd445d212896', 1, 'public/playlist/playlist-avatar-1711982014513-407478995.jpeg', 'Best of V-Pop Không Thể Thiếu 2023', 0, 7, 0, 0, '');

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
  `PlayList_ID` varchar(100) NOT NULL,
  `CreateTime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

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
('c9a79c22-8546-4540-8d16-92c01c4a6a23', '67a81238-3348-4cdf-b953-5096df977e27', '2024-03-28 21:29:55'),
('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'b53c3193-7a3f-4005-861b-52eca46f9381', '2024-04-02 15:59:19'),
('c9a79c22-8546-4540-8d16-92c01c4a6a23', '1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', '2024-04-02 21:00:04');

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
  `imagePath` varchar(100) NOT NULL,
  `publicDate` datetime NOT NULL DEFAULT current_timestamp(),
  `filePath` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `song`
--

INSERT INTO `song` (`Id`, `user_id`, `genre_id`, `SongName`, `Viewer`, `Singer`, `Duration`, `status`, `description`, `imagePath`, `publicDate`, `filePath`) VALUES
('1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc', '42a9314d-5f14-4786-88ab-604359aa75e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'hãy ra khỏi người đó đi', 0, 'Phan Mạnh Quỳnh', 190, 1, '', 'public/image/avatar-1711332268132-928382065.jpeg', '0000-00-00 00:00:00', '1aa8ac68-dce5-4ad0-a34d-9bd0b7df00cc'),
('381b6b5e-305f-4cbc-a3bf-7707147c8804', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Đi Về Nhà', 0, 'Đen Vâu, JustaTee', 206, 1, '', 'public/image/avatar-1711977353391-140999932.jpeg', '0000-00-00 00:00:00', '381b6b5e-305f-4cbc-a3bf-7707147c8804'),
('50d8169a-a6da-4856-bb75-c0283f9849ae', '42a9314d-5f14-4786-88ab-604359aa75e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'vơ người ta', 0, 'Phan Mạnh Quỳnh', 197, 1, '', 'public/image/avatar-1711332228038-776879475.jpeg', '0000-00-00 00:00:00', '50d8169a-a6da-4856-bb75-c0283f9849ae'),
('67a81238-3348-4cdf-b953-5096df977e27', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Nơi này có anh', 0, 'Sơn Tùng M-TP', 262, 1, '', 'public/image/avatar-1711272410077-676924021.jpeg', '0000-00-00 00:00:00', '67a81238-3348-4cdf-b953-5096df977e27'),
('837b3000-7ec2-4c85-a8fa-bc088cc0074e', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Nhạc Này Chill Phết', 0, 'Đen Vâu, Min', 273, 1, '', 'public/image/avatar-1711977387771-118609622.jpeg', '0000-00-00 00:00:00', '837b3000-7ec2-4c85-a8fa-bc088cc0074e'),
('9bb2ddba-abfa-474a-ac84-d7952a51ad7e', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Chúng ta của hiện tại', 0, 'Sơn Tùng M-TP', 302, 1, '', 'public/image/avatar-1711272707603-723681858.jpeg', '0000-00-00 00:00:00', '9bb2ddba-abfa-474a-ac84-d7952a51ad7e'),
('b50e07a9-f2ea-4626-8b14-f9ef213ad8fc', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'MUỘN RỒI MÀ SAO CÒN ', 0, 'SƠN TÙNG M-TP ', 274, 1, '', 'public/image/avatar-1711977508087-423908970.jpeg', '0000-00-00 00:00:00', 'b50e07a9-f2ea-4626-8b14-f9ef213ad8fc'),
('b53c3193-7a3f-4005-861b-52eca46f9381', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Em của ngày hôm qua', 0, 'Sơn Tùng M-TP', 232, 1, '', 'public/image/avatar-1711272494063-507340757.jpeg', '0000-00-00 00:00:00', 'b53c3193-7a3f-4005-861b-52eca46f9381'),
('e17363fa-82d8-4ca4-8dee-ce1b62bcf995', '9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', '2 Triệu Năm', 0, 'Đen Vâu,Biên', 217, 1, '', 'public/image/avatar-1711977307658-644167533.jpeg', '0000-00-00 00:00:00', 'e17363fa-82d8-4ca4-8dee-ce1b62bcf995'),
('ecdba929-6516-46b3-b507-36d2c854b947', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Hãy Trao Cho Anh', 0, 'Sơn Tùng MTP', 246, 1, '', 'public/image/avatar-1711977452681-373494792.jpeg', '0000-00-00 00:00:00', 'ecdba929-6516-46b3-b507-36d2c854b947'),
('ef9012fd-f635-49b5-918b-874c806a6b40', '51925ca6-74c6-418d-9273-793061b05aa6', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Buông đôi tay nhau ra', 0, 'Sơn Tùng M-TP', 0, 1, '', 'public/image/avatar-1711272331371-587600195.jpeg', '0000-00-00 00:00:00', 'ef9012fd-f635-49b5-918b-874c806a6b40'),
('f6e0a637-d439-49d2-b720-edb8f9c750f5', '42a9314d-5f14-4786-88ab-604359aa75e1', 'c2c8e9b7-b5c0-47b9-a990-348e803a9058', 'Khi phải quên người đó đi', 0, 'Phan Mạnh Quỳnh', 324, 1, '', 'public/image/avatar-1711332305669-701321911.jpeg', '0000-00-00 00:00:00', 'f6e0a637-d439-49d2-b720-edb8f9c750f5');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` varchar(100) NOT NULL,
  `Account` varchar(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Vertify` tinyint(1) NOT NULL DEFAULT 0,
  `Nationality` varchar(30) NOT NULL DEFAULT '""',
  `ChanalName` varchar(30) DEFAULT NULL,
  `pathImage` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `RefeshToken` varchar(100) DEFAULT NULL,
  `Password` varchar(100) NOT NULL,
  `Banner` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `Account`, `Name`, `Vertify`, `Nationality`, `ChanalName`, `pathImage`, `description`, `RefeshToken`, `Password`, `Banner`) VALUES
('42a9314d-5f14-4786-88ab-604359aa75e1', 'PhanManhQuynh@pmq.com', 'Phan Manh Quỳnh', 1, 'Phan Mạnh Quỳnh', 'Phan Mạnh Quỳnh', 'public\\avatar\\pmq.jpg', '', '', '123456', 'public/banner/phanmanhquynhf.jpg'),
('51925ca6-74c6-418d-9273-793061b05aa6', 'sontungmtp@enter.com', 'Sơn Tùng M-TP', 1, 'Việt Nam', 'Sơn Tùng M-TP', 'https://i.scdn.co/image/ab676161000051747afc6ecdb9102abd1e10d338', '', '', '123456', 'https://i.scdn.co/image/ab6761860000101698929fc24f88d6481cf2a7a5'),
('9e3aadcb-23b1-4540-8ec3-4bbb6892f3e1', 'DenVau@pmq.com', 'Đen Vâu', 1, 'Đen Vâu', 'Đen Vâu', 'public\\avatar\\denvau.jpg', '', '', '123456', 'public/banner/denvau.jpg'),
('c9a79c22-8546-4540-8d16-92c01c4a6a23', 'huy91027@gmail.com', 'huy', 0, '', '', 'https://avatars.githubusercontent.com/u/71593544?v=4', '', '', 'aaaaaaaaaaaaaaaaaaaaa', '');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `contain`
--
ALTER TABLE `contain`
  ADD UNIQUE KEY `PlayList_id` (`PlayList_id`,`Song_ID`);

--
-- Chỉ mục cho bảng `discuss`
--
ALTER TABLE `discuss`
  ADD PRIMARY KEY (`Discuss_Id`);

--
-- Chỉ mục cho bảng `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `likedsong`
--
ALTER TABLE `likedsong`
  ADD UNIQUE KEY `id_user_liked` (`id_user_liked`,`Id`);

--
-- Chỉ mục cho bảng `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`id`);

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
