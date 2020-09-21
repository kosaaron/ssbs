-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2020. Sze 21. 13:51
-- Kiszolgáló verziója: 10.4.10-MariaDB
-- PHP verzió: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `ssbsyste_ssbs`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_1`
--

CREATE TABLE `t_1` (
  `c_1_id` int(11) NOT NULL,
  `c_48` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `t_1`
--

INSERT INTO `t_1` (`c_1_id`, `c_48`) VALUES
(1, 'Simple card'),
(2, 'Tool card'),
(3, 'Employee card');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_2`
--

CREATE TABLE `t_2` (
  `c_2_id` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `t_2`
--

INSERT INTO `t_2` (`c_2_id`) VALUES
('DT'),
('S'),
('SC'),
('SN'),
('SO'),
('SP'),
('W'),
('WF'),
('WP');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_3`
--

CREATE TABLE `t_3` (
  `c_3_id` int(11) NOT NULL,
  `c_24` varchar(30) NOT NULL,
  `c_49` varchar(100) NOT NULL,
  `c_5_fk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `t_3`
--

INSERT INTO `t_3` (`c_3_id`, `c_24`, `c_49`, `c_5_fk`) VALUES
(1, 'Module To User', 'Module To User', 110),
(2, 'Modulok', 'Modulok, t_3-as tábla', 3),
(3, 'Táblák', 'Táblák, t_5-ös tábla', 5),
(4, 'Tabok', 'Tabok, t_6', 6),
(5, 'Oszlopok', 'Oszlopok', 7);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_4`
--

CREATE TABLE `t_4` (
  `c_4_id` int(11) NOT NULL,
  `c_30` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `t_4`
--

INSERT INTO `t_4` (`c_4_id`, `c_30`) VALUES
(1, 'Step Box (input)'),
(2, 'Dinamic Popup Form'),
(3, 'Filter And Sort'),
(4, 'Card Box'),
(5, 'Details'),
(6, 'Connected Object'),
(7, 'Table'),
(8, 'Step Box (display)'),
(9, 'Gallery (input)'),
(10, 'Gallery (display)'),
(11, 'Logout'),
(13, 'Get Inputs'),
(14, 'Get Display'),
(15, 'Invitation Email'),
(16, 'Get Virtual Object'),
(1000, 'Invitation email'),
(1001, 'Logout');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_5`
--

CREATE TABLE `t_5` (
  `c_5_id` int(11) NOT NULL,
  `c_31` varchar(30) NOT NULL,
  `c_51` varchar(30) DEFAULT NULL,
  `c_52` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `t_5`
--

INSERT INTO `t_5` (`c_5_id`, `c_31`, `c_51`, `c_52`) VALUES
(1, 'c_cards', 't_1', 'c_1_id'),
(2, 'c_input_types', 't_2', 'c_2_id'),
(3, 'c_modules', 't_3', 'c_3_id'),
(4, 'c_plugins', 't_4', 'c_4_id'),
(5, 'c_tables', 't_5', 'c_5_id'),
(6, 'c_tabs', 't_6', 'c_6_id'),
(7, 'f_columns', 't_7', 'c_7_id'),
(100, 'device_verification', 't_100', 'c_100_id'),
(101, 'f_custom_plugins', 't_101', 'c_101_id'),
(102, 'f_display', 't_102', 'c_102_id'),
(103, 'f_form_inputs', 't_103', 'c_103_id'),
(104, 'f_module_plugins', 't_104', 'c_104_id'),
(105, 'f_plugin_cards', 't_105', 'c_105_id'),
(106, 'f_plugin_display', 't_106', 'c_106_id'),
(107, 'f_plugin_form_inputs', 't_107', 'c_107_id'),
(108, 'f_plugin_plugins', 't_108', 'c_108_id'),
(109, 'f_plugin_vo', 't_109', 'c_109_id'),
(110, 'f_user_modules', 't_110', 'c_110_id'),
(111, 'f_virtual_objects\r\n', 't_111', 'c_111_id'),
(200, 'employees', 't_200', 'c_200_id');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_6`
--

CREATE TABLE `t_6` (
  `c_6_id` int(11) NOT NULL,
  `c_25` varchar(30) NOT NULL,
  `c_53` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `t_6`
--

INSERT INTO `t_6` (`c_6_id`, `c_25`, `c_53`) VALUES
(101, 'Finance', 101),
(102, 'Processes', 102),
(103, 'Products', 103),
(104, 'Resources', 104),
(105, 'Application', 105),
(106, 'Dev - Listák', 105),
(107, 'Dev - Ált.', 105);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_7`
--

CREATE TABLE `t_7` (
  `c_7_id` int(11) NOT NULL,
  `c_33` varchar(50) NOT NULL,
  `c_5_fk` int(11) DEFAULT NULL,
  `c_54` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `t_7`
--

INSERT INTO `t_7` (`c_7_id`, `c_33`, `c_5_fk`, `c_54`) VALUES
(8, 'Keresztnév', 200, 'c_8'),
(24, 'Modul neve', 3, 'c_24'),
(25, 'Tab neve', 6, 'c_25'),
(27, 'Modulhoz plugin - hely', 104, 'c_27'),
(28, 'Modulhoz plugin - szám', 104, 'c_28'),
(29, 'Modulhoz plugin - alapmegj.', 104, 'c_29'),
(30, 'Pluginok - Név', 4, 'c_30'),
(31, 'Tábla neve', 5, 'c_31'),
(32, 'Form input - szám', 103, 'c_32'),
(33, 'Oszlop név', 7, 'c_33'),
(34, 'Form input típus', 2, 'c_2_id'),
(35, 'Form input - alapmegj.', 103, 'c_35'),
(36, 'Form input - feltöltési név', 103, 'c_36'),
(37, 'Form input - kötelezo-e', 103, 'c_37'),
(38, 'Form input - látható-e', 103, 'c_38'),
(48, 'Card name', 1, 'c_48'),
(49, 'Modul leírás', 3, 'c_49'),
(51, 'Tábla új neve', 5, 'c_51'),
(52, 'Tábla Id neve', 5, 'c_52'),
(53, 'Tab ikon', 6, 'c_53'),
(54, 'Oszlop tech. neve', 7, 'c_54'),
(55, 'Eszköz Id', 100, 'c_55'),
(56, 'Custom plugin - hely', 101, 'c_56'),
(57, 'Custom plugin - szám', 101, 'c_57'),
(58, 'Custom plugin - privilege', 101, 'c_58'),
(60, 'Megj. - szám', 102, 'c_60'),
(61, 'Form input - típus', 103, 'c_61'),
(62, 'Form input - feltölt-e', 103, 'c_62'),
(63, 'Plugin kártya - szám', 105, 'c_63'),
(64, 'Plugin megj. - cím', 106, 'c_64'),
(65, 'Plugin megj. - szám', 106, 'c_65'),
(66, 'Pluginhoz form input - cím', 107, 'c_66'),
(67, 'Pluginhoz form input - szám', 107, 'c_67'),
(68, 'Pluginhoz plugin - hely', 108, 'c_68'),
(69, 'Pluginhoz plugin - szám', 108, 'c_69'),
(70, 'Pluginhoz plugin - alapmegj.', 108, 'c_70'),
(71, 'Plugin vo - szám', 109, 'c_71'),
(72, 'Felh. modulok - szám', 110, 'c_72'),
(73, 'Vo - Lekérdezés', 111, 'c_73'),
(74, 'Vezetéknév', 200, 'c_74'),
(75, 'UserPassword', 200, 'c_75'),
(76, 'Email', 200, 'c_76'),
(77, 'ActivationCode', 200, 'c_77'),
(78, 'VerificationStatus', 200, 'c_78');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_100`
--

CREATE TABLE `t_100` (
  `c_100_id` int(11) NOT NULL,
  `c_55` varchar(256) DEFAULT NULL,
  `c_200_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `t_100`
--

INSERT INTO `t_100` (`c_100_id`, `c_55`, `c_200_fk`) VALUES
(71, '1ccc946bff87bc121284ee085095a954d85700e2d6c90343bb4c0f161838235a', 10),
(77, '$2y$10$4wLq5Oy0maAKvcNyAEHQcO7oBOgZKKrQpQ049ZNJTAuihCoFoEWrO', 1),
(93, '$2y$10$fA8fuAK9.w2DOjK7.8cxdeikkvJa6f7f6gAYO4ApWI0yDJutivlpy', 22),
(94, '$2y$10$QDRaY/DpuL2wjXW5ntLWvu9SnwS47hl1BuPca0KWfhxEk46uw5VqG', 22),
(95, '$2y$10$PHwPucg99Y1Q1k0KgEezt.6MQmPFxJMfhpMQUIFS2Reo6kPW8KmUi', 4),
(96, '$2y$10$Q/KNzXtFIItkPE86xawP.ODy2yyWcas/MjQORUv67s454oNGvlzvy', 22);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_101`
--

CREATE TABLE `t_101` (
  `c_101_id` int(11) NOT NULL,
  `c_56` int(5) NOT NULL,
  `c_57` int(11) NOT NULL,
  `c_4_fk` int(11) NOT NULL,
  `c_58` varchar(10) NOT NULL,
  `c_5_fk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `t_101`
--

INSERT INTO `t_101` (`c_101_id`, `c_56`, `c_57`, `c_4_fk`, `c_58`, `c_5_fk`) VALUES
(1, 1, 1, 2, 'dev', 110),
(2, 2, 1, 2, 'dev', 104),
(3, 3, 1, 2, 'dev', 110),
(4, 4, 1, 16, 'dev', 7),
(5, 5, 1, 2, 'dev', 105),
(6, 6, 1, 2, 'dev', 3),
(7, 7, 1, 16, 'dev', 103),
(8, 7, 2, 2, 'dev', 102);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_102`
--

CREATE TABLE `t_102` (
  `c_102_id` int(11) NOT NULL,
  `c_106_fk` int(11) NOT NULL,
  `c_7_fk` int(11) NOT NULL,
  `c_60` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `t_102`
--

INSERT INTO `t_102` (`c_102_id`, `c_106_fk`, `c_7_fk`, `c_60`) VALUES
(26, 12, 24, 2),
(27, 13, 8, 2),
(28, 13, 25, 3),
(29, 11, 24, 2),
(30, 11, 25, 3),
(31, 14, 24, 2),
(32, 14, 31, 3),
(33, 15, 24, 2),
(34, 16, 31, 2),
(35, 16, 49, 3),
(36, 17, 31, 2),
(37, 17, 51, 3),
(38, 18, 31, 2),
(39, 19, 51, 2),
(40, 19, 52, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_103`
--

CREATE TABLE `t_103` (
  `c_103_id` int(11) NOT NULL,
  `c_107_fk` int(11) DEFAULT NULL,
  `c_32` int(2) NOT NULL,
  `c_7_fk` int(11) DEFAULT NULL,
  `ParentFK` int(2) DEFAULT NULL,
  `c_61` varchar(2) NOT NULL,
  `c_35` varchar(30) DEFAULT NULL,
  `c_36` varchar(40) NOT NULL,
  `c_37` tinyint(1) NOT NULL DEFAULT 0,
  `c_38` tinyint(1) NOT NULL DEFAULT 1,
  `c_62` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `t_103`
--

INSERT INTO `t_103` (`c_103_id`, `c_107_fk`, `c_32`, `c_7_fk`, `ParentFK`, `c_61`, `c_35`, `c_36`, `c_37`, `c_38`, `c_62`) VALUES
(1, 1, 2, 8, NULL, 'S', NULL, 't_110.c_200_fk', 0, 1, 1),
(2, 1, 3, 25, NULL, 'S', NULL, 't_110.c_6_fk', 0, 1, 1),
(3, 1, 4, 24, NULL, 'S', NULL, 't_110.c_3_fk', 0, 1, 1),
(4, 2, 2, 24, NULL, 'W', NULL, 't_104.c_110_fk', 0, 0, 1),
(5, 2, 3, 30, NULL, 'S', NULL, 't_104.c_4_fk', 0, 1, 1),
(6, 2, 5, 27, NULL, 'W', NULL, 't_104.c_27', 0, 1, 1),
(7, 2, 6, 28, NULL, 'W', NULL, 't_104.c_28', 0, 1, 1),
(8, 2, 7, 29, NULL, 'W', '1', 't_104.c_29', 0, 1, 1),
(9, 2, 4, 31, NULL, 'S', NULL, 't_104.c_5_fk', 0, 1, 1),
(10, 3, 2, 32, NULL, 'W', NULL, 't_103.c_107_fk', 0, 0, 1),
(11, 3, 3, 32, NULL, 'W', NULL, 't_103.c_32', 0, 1, 1),
(12, 3, 6, 31, NULL, 'SC', NULL, 't_103.c_5_fk', 0, 1, 0),
(13, 3, 4, 34, NULL, 'S', NULL, 't_103.c_61', 0, 1, 1),
(14, 3, 7, 35, NULL, 'W', NULL, 't_103.c_35', 0, 1, 1),
(15, 3, 5, 36, NULL, 'W', NULL, 't_103.c_36', 0, 0, 1),
(16, 3, 8, 37, NULL, 'W', NULL, 't_103.c_37', 0, 1, 1),
(17, 3, 9, 38, NULL, 'W', NULL, 't_103.c_38', 0, 1, 1),
(18, 4, 2, 48, NULL, 'S', '1', 't_105.c_1_fk', 1, 1, 1),
(19, 5, 2, 31, NULL, 'SC', NULL, 't_103.c_5_fk', 0, 1, 0),
(20, 6, 2, 8, NULL, 'S', '1', 't_110.c_200_fk', 0, 1, 1),
(21, 6, 3, 25, NULL, 'S', '', 't_110.c_6_fk', 0, 1, 1),
(22, 8, 2, 24, NULL, 'W', NULL, 't_3.c_24', 0, 1, 1),
(23, 8, 3, 49, NULL, 'W', NULL, 't_3.c_49', 0, 1, 1),
(24, 8, 4, 31, NULL, 'S', NULL, 't_3.c_5_fk', 0, 1, 1),
(27, 10, 2, 31, NULL, 'SC', NULL, 't_103.c_5_fk', 0, 1, 0),
(28, 7, 2, 24, NULL, 'SO', '1', 't_110.c_3_fk', 0, 1, 1),
(29, 11, 2, 24, NULL, 'WF', '', 't_3.c_24', 0, 1, 1),
(30, 13, 2, 24, NULL, 'W', '', 't_3.24', 0, 1, 1),
(31, 13, 3, 49, NULL, 'W', '', 't_3.c_24', 0, 1, 1),
(32, 13, 4, 31, NULL, 'S', '', 't_110.c_5_fk', 0, 1, 1),
(33, 14, 2, 31, NULL, 'WF', '', 't_5.c_31', 0, 1, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_104`
--

CREATE TABLE `t_104` (
  `c_104_id` int(11) NOT NULL,
  `c_110_fk` int(11) DEFAULT NULL,
  `c_4_fk` int(11) DEFAULT NULL,
  `c_5_fk` int(11) DEFAULT NULL,
  `c_27` int(3) NOT NULL DEFAULT 1,
  `c_28` int(3) NOT NULL DEFAULT 1,
  `c_29` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `t_104`
--

INSERT INTO `t_104` (`c_104_id`, `c_110_fk`, `c_4_fk`, `c_5_fk`, `c_27`, `c_28`, `c_29`) VALUES
(13, 1, 3, 110, 2, 1, 1),
(14, 1, 4, 110, 4, 2, 1),
(15, 1, 2, 110, 100, 3, 1),
(16, 1, 5, 110, 5, 4, 1),
(17, 2, 3, 3, 2, 1, 1),
(18, 2, 4, 3, 4, 2, 1),
(19, 2, 5, 3, 5, 3, 1),
(20, 2, 2, 3, 100, 4, 1),
(21, 3, 3, 5, 2, 1, 1),
(22, 3, 4, 5, 4, 2, 1),
(23, 3, 5, 5, 5, 3, 1),
(24, 3, 2, 5, 100, 4, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_105`
--

CREATE TABLE `t_105` (
  `c_105_id` int(11) NOT NULL,
  `c_104_fk` int(11) DEFAULT NULL,
  `c_108_fk` int(11) DEFAULT NULL,
  `c_101_fk` int(11) DEFAULT NULL,
  `c_1_fk` int(11) DEFAULT NULL,
  `c_63` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `t_105`
--

INSERT INTO `t_105` (`c_105_id`, `c_104_fk`, `c_108_fk`, `c_101_fk`, `c_1_fk`, `c_63`) VALUES
(4, 14, NULL, NULL, 1, 1),
(5, 18, NULL, NULL, 1, 1),
(6, 22, NULL, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_106`
--

CREATE TABLE `t_106` (
  `c_106_id` int(11) NOT NULL,
  `c_64` varchar(40) DEFAULT NULL,
  `c_104_fk` int(11) DEFAULT NULL,
  `c_108_fk` int(11) DEFAULT NULL,
  `c_101_fk` int(11) DEFAULT NULL,
  `c_65` int(3) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `t_106`
--

INSERT INTO `t_106` (`c_106_id`, `c_64`, `c_104_fk`, `c_108_fk`, `c_101_fk`, `c_65`) VALUES
(11, 'Display', 14, NULL, NULL, 1),
(12, 'Display', 16, NULL, NULL, 1),
(13, 'Display', 16, NULL, NULL, 2),
(14, 'Display', 18, NULL, NULL, 1),
(15, 'Display', 19, NULL, NULL, 1),
(16, 'Display', 19, NULL, NULL, 2),
(17, 'Display', 22, NULL, NULL, 1),
(18, 'Display', 23, NULL, NULL, 1),
(19, 'Display', 23, NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_107`
--

CREATE TABLE `t_107` (
  `c_107_id` int(11) NOT NULL,
  `c_66` varchar(40) NOT NULL,
  `c_104_fk` int(11) DEFAULT NULL,
  `c_108_fk` int(11) DEFAULT NULL,
  `c_101_fk` int(11) DEFAULT NULL,
  `c_67` int(3) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `t_107`
--

INSERT INTO `t_107` (`c_107_id`, `c_66`, `c_104_fk`, `c_108_fk`, `c_101_fk`, `c_67`) VALUES
(1, 'Add module popup inputs', NULL, NULL, 1, 1),
(2, 'Add plugin popup inputs', NULL, NULL, 2, 1),
(3, 'Add input form', NULL, NULL, 3, 1),
(4, 'Sys', NULL, NULL, 5, 1),
(5, 'Sys', NULL, NULL, 5, 2),
(6, 'Filter', 13, NULL, NULL, 1),
(7, 'Order', 13, NULL, NULL, 2),
(8, 'Sys', NULL, NULL, 6, 1),
(9, 'Dinamic Popup', 15, NULL, NULL, 1),
(10, 'Add/update card place inputs', NULL, NULL, 8, 1),
(11, 'Filter', 17, NULL, NULL, 1),
(12, 'Order', 17, NULL, NULL, 2),
(13, 'Dinamic Popup', 20, NULL, NULL, 1),
(14, 'Filter', 21, NULL, NULL, 1),
(15, 'Order', 21, NULL, NULL, 2),
(16, 'Dinamic Popup', 24, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_108`
--

CREATE TABLE `t_108` (
  `c_108_id` int(11) NOT NULL,
  `c_104_fk` int(11) DEFAULT NULL,
  `c_108_fk` int(11) DEFAULT NULL,
  `c_4_fk` int(11) NOT NULL,
  `c_5_fk` int(11) DEFAULT NULL,
  `c_68` int(3) NOT NULL DEFAULT 1,
  `c_69` int(3) NOT NULL DEFAULT 1,
  `c_70` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_109`
--

CREATE TABLE `t_109` (
  `c_109_id` int(11) NOT NULL,
  `c_104_fk` int(11) DEFAULT NULL,
  `c_108_fk` int(11) DEFAULT NULL,
  `c_101_fk` int(11) DEFAULT NULL,
  `c_71` int(11) NOT NULL,
  `c_111_fk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `t_109`
--

INSERT INTO `t_109` (`c_109_id`, `c_104_fk`, `c_108_fk`, `c_101_fk`, `c_71`, `c_111_fk`) VALUES
(3, NULL, NULL, 4, 1, 1),
(4, NULL, NULL, 7, 1, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_110`
--

CREATE TABLE `t_110` (
  `c_110_id` int(11) NOT NULL,
  `c_200_fk` int(11) NOT NULL,
  `c_6_fk` int(11) NOT NULL,
  `c_3_fk` int(11) NOT NULL,
  `c_72` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `t_110`
--

INSERT INTO `t_110` (`c_110_id`, `c_200_fk`, `c_6_fk`, `c_3_fk`, `c_72`) VALUES
(1, 1, 107, 1, 10),
(2, 1, 106, 2, 1),
(3, 1, 106, 3, 1),
(4, 1, 106, 4, 1),
(5, 1, 106, 5, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_111`
--

CREATE TABLE `t_111` (
  `c_111_id` int(11) NOT NULL,
  `c_73` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `t_111`
--

INSERT INTO `t_111` (`c_111_id`, `c_73`) VALUES
(1, 'SELECT `c_7_id` AS \'Id\', `c_33` AS \'Name\' FROM `t_7` WHERE c_5_fk=<1>'),
(2, 'SELECT t_102.c_102_id AS FDisplayId, t_102.c_60 AS \'Number\', t_7.c_33 AS CName, t_5.c_31 AS \'TName\' FROM `t_102` INNER JOIN t_7 ON t_7.c_7_id=t_102.c_7_fk INNER JOIN t_5 on t_5.c_5_id=t_7.c_5_fk WHERE `c_106_fk`=<1>');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_112`
--

CREATE TABLE `t_112` (
  `c_112_id` int(11) NOT NULL,
  `IsGallery` tinyint(1) NOT NULL,
  `PhotoURL` varchar(256) NOT NULL,
  `c_108_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_200`
--

CREATE TABLE `t_200` (
  `c_200_id` int(11) NOT NULL,
  `c_8` varchar(30) NOT NULL,
  `c_74` varchar(30) NOT NULL,
  `c_75` varchar(255) NOT NULL,
  `c_76` varchar(255) NOT NULL,
  `c_77` varchar(256) NOT NULL,
  `c_78` tinyint(1) NOT NULL,
  `c_112_fk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `t_200`
--

INSERT INTO `t_200` (`c_200_id`, `c_8`, `c_74`, `c_75`, `c_76`, `c_77`, `c_78`, `c_112_fk`) VALUES
(1, 'Ádám', 'Werner', '$2y$10$SfhYIDtn.iOuCW7zfoFLuuZHX6lja4lF4XA4JqNmpiH/.P3zB8JCa', 'test@test.com', '', 0, NULL),
(2, 'Dávid', 'Sági', 'jelszo2', 'B2B2B2', '', 0, NULL),
(3, 'Áron', 'Kósa', 'jelszo3', 'C3C3C3', '', 0, NULL),
(4, 'Ádám', 'Werner', '$2y$10$HUuqHlM362MOdUvgB6KN5e4/ZU3UkBs8aT8C6kgY1EnilVx/w7gv6', 'adamprofi20@gmail.com', '', 1, NULL),
(10, 'Bela', 'Nagy', '$2y$10$UzFgCL2lsOfmgulukxs4QOJNXFt68EnHs6/9/wYUAUMPgK.jNgD8O', 'remaron98@gmail.com', '', 1, NULL),
(22, 'Bela', 'Nagy', '$2y$10$Tyxm3YhOmUriTTk4OjBn6.0EQAIwA3lJkc13rcAlo5Sr8ylB8Ur9m', 'kosa.aron98@gmail.com', '', 1, NULL);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `t_1`
--
ALTER TABLE `t_1`
  ADD PRIMARY KEY (`c_1_id`);

--
-- A tábla indexei `t_2`
--
ALTER TABLE `t_2`
  ADD PRIMARY KEY (`c_2_id`);

--
-- A tábla indexei `t_3`
--
ALTER TABLE `t_3`
  ADD PRIMARY KEY (`c_3_id`),
  ADD KEY `c_5_fk` (`c_5_fk`);

--
-- A tábla indexei `t_4`
--
ALTER TABLE `t_4`
  ADD PRIMARY KEY (`c_4_id`);

--
-- A tábla indexei `t_5`
--
ALTER TABLE `t_5`
  ADD PRIMARY KEY (`c_5_id`);

--
-- A tábla indexei `t_6`
--
ALTER TABLE `t_6`
  ADD PRIMARY KEY (`c_6_id`);

--
-- A tábla indexei `t_7`
--
ALTER TABLE `t_7`
  ADD PRIMARY KEY (`c_7_id`),
  ADD KEY `CTableFK` (`c_5_fk`);

--
-- A tábla indexei `t_100`
--
ALTER TABLE `t_100`
  ADD PRIMARY KEY (`c_100_id`),
  ADD KEY `EmployeeFK` (`c_200_fk`);

--
-- A tábla indexei `t_101`
--
ALTER TABLE `t_101`
  ADD PRIMARY KEY (`c_101_id`),
  ADD KEY `CPluginFK` (`c_4_fk`),
  ADD KEY `t_101_ibfk_2` (`c_5_fk`);

--
-- A tábla indexei `t_102`
--
ALTER TABLE `t_102`
  ADD PRIMARY KEY (`c_102_id`),
  ADD KEY `FPluginDisplayFK` (`c_106_fk`),
  ADD KEY `FColumnsFK` (`c_7_fk`);

--
-- A tábla indexei `t_103`
--
ALTER TABLE `t_103`
  ADD PRIMARY KEY (`c_103_id`),
  ADD KEY `Type` (`c_61`),
  ADD KEY `f_dinamic_form_inputs_ibfk_1` (`c_107_fk`),
  ADD KEY `FColumnFK` (`c_7_fk`);

--
-- A tábla indexei `t_104`
--
ALTER TABLE `t_104`
  ADD PRIMARY KEY (`c_104_id`),
  ADD KEY `FUserModuleFK` (`c_110_fk`),
  ADD KEY `CPluginFK` (`c_4_fk`),
  ADD KEY `CTableFK` (`c_5_fk`);

--
-- A tábla indexei `t_105`
--
ALTER TABLE `t_105`
  ADD PRIMARY KEY (`c_105_id`),
  ADD KEY `FModulePluginFK` (`c_104_fk`),
  ADD KEY `FPluginPluginFK` (`c_108_fk`),
  ADD KEY `f_plugin_cards_ibfk_3` (`c_1_fk`);

--
-- A tábla indexei `t_106`
--
ALTER TABLE `t_106`
  ADD PRIMARY KEY (`c_106_id`),
  ADD KEY `FModulePluginFK` (`c_104_fk`),
  ADD KEY `FPluginPluginFK` (`c_108_fk`),
  ADD KEY `FCustomPluginId` (`c_101_fk`);

--
-- A tábla indexei `t_107`
--
ALTER TABLE `t_107`
  ADD PRIMARY KEY (`c_107_id`),
  ADD KEY `FModulePluginFK` (`c_104_fk`),
  ADD KEY `FPluginPluginFK` (`c_108_fk`),
  ADD KEY `FCustomPluginFK` (`c_101_fk`);

--
-- A tábla indexei `t_108`
--
ALTER TABLE `t_108`
  ADD PRIMARY KEY (`c_108_id`),
  ADD KEY `CPluginFK` (`c_4_fk`),
  ADD KEY `FPluginPluginFK` (`c_108_fk`),
  ADD KEY `FModulePluginFK` (`c_104_fk`),
  ADD KEY `CTableFK` (`c_5_fk`);

--
-- A tábla indexei `t_109`
--
ALTER TABLE `t_109`
  ADD PRIMARY KEY (`c_109_id`),
  ADD KEY `FModulePluginFK` (`c_104_fk`),
  ADD KEY `FPluginPluginFK` (`c_108_fk`),
  ADD KEY `VirtualObjectFK` (`c_111_fk`),
  ADD KEY `FCustomPluginFK` (`c_101_fk`);

--
-- A tábla indexei `t_110`
--
ALTER TABLE `t_110`
  ADD PRIMARY KEY (`c_110_id`),
  ADD KEY `EmployeeFK` (`c_200_fk`),
  ADD KEY `ModuleFK` (`c_3_fk`),
  ADD KEY `TabFK` (`c_6_fk`);

--
-- A tábla indexei `t_111`
--
ALTER TABLE `t_111`
  ADD PRIMARY KEY (`c_111_id`);

--
-- A tábla indexei `t_112`
--
ALTER TABLE `t_112`
  ADD PRIMARY KEY (`c_112_id`),
  ADD KEY `c_108_fk` (`c_108_fk`);

--
-- A tábla indexei `t_200`
--
ALTER TABLE `t_200`
  ADD PRIMARY KEY (`c_200_id`),
  ADD KEY `c_112_fk` (`c_112_fk`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `t_1`
--
ALTER TABLE `t_1`
  MODIFY `c_1_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `t_3`
--
ALTER TABLE `t_3`
  MODIFY `c_3_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `t_4`
--
ALTER TABLE `t_4`
  MODIFY `c_4_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1002;

--
-- AUTO_INCREMENT a táblához `t_5`
--
ALTER TABLE `t_5`
  MODIFY `c_5_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT a táblához `t_6`
--
ALTER TABLE `t_6`
  MODIFY `c_6_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT a táblához `t_7`
--
ALTER TABLE `t_7`
  MODIFY `c_7_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT a táblához `t_100`
--
ALTER TABLE `t_100`
  MODIFY `c_100_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT a táblához `t_101`
--
ALTER TABLE `t_101`
  MODIFY `c_101_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `t_102`
--
ALTER TABLE `t_102`
  MODIFY `c_102_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT a táblához `t_103`
--
ALTER TABLE `t_103`
  MODIFY `c_103_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT a táblához `t_104`
--
ALTER TABLE `t_104`
  MODIFY `c_104_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT a táblához `t_105`
--
ALTER TABLE `t_105`
  MODIFY `c_105_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `t_106`
--
ALTER TABLE `t_106`
  MODIFY `c_106_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT a táblához `t_107`
--
ALTER TABLE `t_107`
  MODIFY `c_107_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT a táblához `t_108`
--
ALTER TABLE `t_108`
  MODIFY `c_108_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `t_109`
--
ALTER TABLE `t_109`
  MODIFY `c_109_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `t_110`
--
ALTER TABLE `t_110`
  MODIFY `c_110_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `t_111`
--
ALTER TABLE `t_111`
  MODIFY `c_111_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `t_112`
--
ALTER TABLE `t_112`
  MODIFY `c_112_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `t_200`
--
ALTER TABLE `t_200`
  MODIFY `c_200_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `t_3`
--
ALTER TABLE `t_3`
  ADD CONSTRAINT `t_3_ibfk_1` FOREIGN KEY (`c_5_fk`) REFERENCES `t_5` (`c_5_id`);

--
-- Megkötések a táblához `t_7`
--
ALTER TABLE `t_7`
  ADD CONSTRAINT `t_7_ibfk_1` FOREIGN KEY (`c_5_fk`) REFERENCES `t_5` (`c_5_id`);

--
-- Megkötések a táblához `t_100`
--
ALTER TABLE `t_100`
  ADD CONSTRAINT `EmployeeFK` FOREIGN KEY (`c_200_fk`) REFERENCES `t_200` (`c_200_id`);

--
-- Megkötések a táblához `t_101`
--
ALTER TABLE `t_101`
  ADD CONSTRAINT `t_101_ibfk_1` FOREIGN KEY (`c_4_fk`) REFERENCES `t_4` (`c_4_id`),
  ADD CONSTRAINT `t_101_ibfk_2` FOREIGN KEY (`c_5_fk`) REFERENCES `t_5` (`c_5_id`);

--
-- Megkötések a táblához `t_102`
--
ALTER TABLE `t_102`
  ADD CONSTRAINT `t_102_ibfk_1` FOREIGN KEY (`c_106_fk`) REFERENCES `t_106` (`c_106_id`),
  ADD CONSTRAINT `t_102_ibfk_2` FOREIGN KEY (`c_7_fk`) REFERENCES `t_7` (`c_7_id`);

--
-- Megkötések a táblához `t_103`
--
ALTER TABLE `t_103`
  ADD CONSTRAINT `t_103_ibfk_1` FOREIGN KEY (`c_107_fk`) REFERENCES `t_107` (`c_107_id`),
  ADD CONSTRAINT `t_103_ibfk_2` FOREIGN KEY (`c_7_fk`) REFERENCES `t_7` (`c_7_id`),
  ADD CONSTRAINT `t_103_ibfk_3` FOREIGN KEY (`c_61`) REFERENCES `t_2` (`c_2_id`);

--
-- Megkötések a táblához `t_104`
--
ALTER TABLE `t_104`
  ADD CONSTRAINT `t_104_ibfk_1` FOREIGN KEY (`c_110_fk`) REFERENCES `t_110` (`c_110_id`),
  ADD CONSTRAINT `t_104_ibfk_2` FOREIGN KEY (`c_4_fk`) REFERENCES `t_4` (`c_4_id`),
  ADD CONSTRAINT `t_104_ibfk_3` FOREIGN KEY (`c_5_fk`) REFERENCES `t_5` (`c_5_id`);

--
-- Megkötések a táblához `t_105`
--
ALTER TABLE `t_105`
  ADD CONSTRAINT `t_105_ibfk_1` FOREIGN KEY (`c_104_fk`) REFERENCES `t_104` (`c_104_id`),
  ADD CONSTRAINT `t_105_ibfk_2` FOREIGN KEY (`c_108_fk`) REFERENCES `t_108` (`c_108_id`),
  ADD CONSTRAINT `t_105_ibfk_3` FOREIGN KEY (`c_1_fk`) REFERENCES `t_1` (`c_1_id`);

--
-- Megkötések a táblához `t_106`
--
ALTER TABLE `t_106`
  ADD CONSTRAINT `t_106_ibfk_1` FOREIGN KEY (`c_104_fk`) REFERENCES `t_104` (`c_104_id`),
  ADD CONSTRAINT `t_106_ibfk_2` FOREIGN KEY (`c_108_fk`) REFERENCES `t_108` (`c_108_id`),
  ADD CONSTRAINT `t_106_ibfk_3` FOREIGN KEY (`c_101_fk`) REFERENCES `t_101` (`c_101_id`);

--
-- Megkötések a táblához `t_107`
--
ALTER TABLE `t_107`
  ADD CONSTRAINT `t_107_ibfk_1` FOREIGN KEY (`c_104_fk`) REFERENCES `t_104` (`c_104_id`),
  ADD CONSTRAINT `t_107_ibfk_2` FOREIGN KEY (`c_108_fk`) REFERENCES `t_108` (`c_108_id`),
  ADD CONSTRAINT `t_107_ibfk_3` FOREIGN KEY (`c_101_fk`) REFERENCES `t_101` (`c_101_id`);

--
-- Megkötések a táblához `t_108`
--
ALTER TABLE `t_108`
  ADD CONSTRAINT `t_108_ibfk_2` FOREIGN KEY (`c_4_fk`) REFERENCES `t_4` (`c_4_id`),
  ADD CONSTRAINT `t_108_ibfk_3` FOREIGN KEY (`c_108_fk`) REFERENCES `t_108` (`c_108_id`),
  ADD CONSTRAINT `t_108_ibfk_4` FOREIGN KEY (`c_104_fk`) REFERENCES `t_104` (`c_104_id`),
  ADD CONSTRAINT `t_108_ibfk_5` FOREIGN KEY (`c_5_fk`) REFERENCES `t_5` (`c_5_id`);

--
-- Megkötések a táblához `t_109`
--
ALTER TABLE `t_109`
  ADD CONSTRAINT `t_109_ibfk_1` FOREIGN KEY (`c_104_fk`) REFERENCES `t_104` (`c_104_id`),
  ADD CONSTRAINT `t_109_ibfk_2` FOREIGN KEY (`c_108_fk`) REFERENCES `t_108` (`c_108_id`),
  ADD CONSTRAINT `t_109_ibfk_3` FOREIGN KEY (`c_111_fk`) REFERENCES `t_111` (`c_111_id`),
  ADD CONSTRAINT `t_109_ibfk_4` FOREIGN KEY (`c_101_fk`) REFERENCES `t_101` (`c_101_id`);

--
-- Megkötések a táblához `t_110`
--
ALTER TABLE `t_110`
  ADD CONSTRAINT `t_110_ibfk_1` FOREIGN KEY (`c_200_fk`) REFERENCES `t_200` (`c_200_id`),
  ADD CONSTRAINT `t_110_ibfk_2` FOREIGN KEY (`c_3_fk`) REFERENCES `t_3` (`c_3_id`),
  ADD CONSTRAINT `t_110_ibfk_3` FOREIGN KEY (`c_6_fk`) REFERENCES `t_6` (`c_6_id`);

--
-- Megkötések a táblához `t_112`
--
ALTER TABLE `t_112`
  ADD CONSTRAINT `t_112_ibfk_1` FOREIGN KEY (`c_108_fk`) REFERENCES `t_108` (`c_108_id`);

--
-- Megkötések a táblához `t_200`
--
ALTER TABLE `t_200`
  ADD CONSTRAINT `t_200_ibfk_1` FOREIGN KEY (`c_112_fk`) REFERENCES `t_112` (`c_112_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
