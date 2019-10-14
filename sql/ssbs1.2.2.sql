-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2019. Okt 11. 19:31
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `ssbs`
--
CREATE DATABASE IF NOT EXISTS `ssbs` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `ssbs`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cardc_structures`
--

CREATE TABLE `cardc_structures` (
  `StuctureId` int(11) NOT NULL,
  `Number` int(11) DEFAULT NULL,
  `ColumnName` varchar(50) NOT NULL,
  `Tables` varchar(50) DEFAULT NULL,
  `Place` varchar(10) NOT NULL,
  `EmployeeFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `cardc_structures`
--

INSERT INTO `cardc_structures` (`StuctureId`, `Number`, `ColumnName`, `Tables`, `Place`, `EmployeeFK`) VALUES
(1, 1, 'TaskId', NULL, 'taskmd', 1),
(2, 2, 'Name', NULL, 'taskmd', 1),
(4, 3, 'TaskType.Name', 'task_types', 'taskmd', 1),
(7, 1, 'LogoSrc', NULL, 'prtnrmd', 1),
(8, 2, 'Name', NULL, 'prtnrmd', 1),
(9, 3, 'Phone', NULL, 'prtnrmd', 1),
(10, 4, 'Address', NULL, 'prtnrmd', 1),
(11, 5, 'PartnerId', NULL, 'prtnrmd', 1),
(13, NULL, 'PartnerType.Name', 'partner_types', 'prtnrmd', 1),
(14, 1, 'PartnerContactId', NULL, 'prtnrdcnt', 1),
(15, 2, 'Name', NULL, 'prtnrdcnt', 1),
(16, 3, 'Email', NULL, 'prtnrdcnt', 1),
(17, 4, 'Phone', NULL, 'prtnrdcnt', 1),
(18, 5, 'Address', NULL, 'prtnrdcnt', 1),
(19, 1, 'Icon', NULL, 'tlsmd', 1),
(20, 2, 'Name', NULL, 'tlsmd', 1),
(21, 3, 'Place', NULL, 'tlsmd', 1),
(22, 4, 'Availability', NULL, 'tlsmd', 1),
(23, 5, 'ToolId', NULL, 'tlsmd', 1),
(24, NULL, 'CreatedDate', NULL, 'taskmd', 1),
(25, NULL, 'Deadline', NULL, 'taskmd', 1),
(26, NULL, 'Description', NULL, 'taskmd', 1),
(28, 1, 'Number', NULL, 'taskwy', 1),
(29, 2, 'TaskStep.Name', 'task_steps', 'taskwy', 1),
(30, 3, 'Number', NULL, 'taskwy', 1),
(31, 4, 'TaskStepFK', NULL, 'taskwy', 1),
(32, 5, 'Number', NULL, 'taskwy', 1),
(33, 6, 'TaskStepFK', NULL, 'taskwy', 1),
(35, NULL, 'Active', NULL, 'taskwy', 1),
(37, 1, 'TaskStepFK', NULL, 'ntaskwy', 1),
(38, 3, 'TaskStep.Name', 'task_steps', 'ntaskwy', 1),
(39, 4, 'TaskStepFK', NULL, 'ntaskwy', 1),
(40, NULL, 'Number', NULL, 'ntaskwy', 1),
(41, NULL, 'TaskFK', NULL, 'taskwy', 1),
(42, NULL, 'Email', NULL, 'prtnrmd', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `dtls_structures`
--

CREATE TABLE `dtls_structures` (
  `StuctureId` int(11) NOT NULL,
  `Number` int(11) NOT NULL,
  `Name` varchar(30) DEFAULT NULL,
  `ColumnName` varchar(50) NOT NULL,
  `Tables` varchar(50) DEFAULT NULL,
  `Place` varchar(10) NOT NULL,
  `EmployeeFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `dtls_structures`
--

INSERT INTO `dtls_structures` (`StuctureId`, `Number`, `Name`, `ColumnName`, `Tables`, `Place`, `EmployeeFK`) VALUES
(5, 1, NULL, 'Name', NULL, 'taskdtls', 1),
(6, 2, 'Feladat típus', 'TaskType.Name', 'task_types', 'taskdtls', 1),
(7, 3, 'Létrehozás dátuma', 'CreatedDate', NULL, 'taskdtls', 1),
(8, 4, 'Határidő', 'Deadline', NULL, 'taskdtls', 1),
(9, 5, 'Leírás', 'Description', NULL, 'taskdtls', 1),
(10, 1, NULL, 'Name', NULL, 'prtnrdtls', 1),
(11, 2, 'Felefonszám', 'Phone', NULL, 'prtnrdtls', 1),
(12, 3, 'Email', 'Email', NULL, 'prtnrdtls', 1),
(13, 4, 'Cím', 'Address', NULL, 'prtnrdtls', 1),
(14, 1, NULL, 'Name', NULL, 'tlsdtls', 1),
(15, 2, NULL, 'Type', NULL, 'tlsdtls', 1),
(16, 3, 'Helye', 'Place', NULL, 'tlsdtls', 1),
(17, 4, 'Elérhető eszökök', 'AvailableTools', NULL, 'tlsdtls', 1),
(18, 5, 'Utolsó karbantartás', 'LastMaintenance', NULL, 'tlsdtls', 1),
(19, 6, 'Karbantartást igényel', 'MaintenancePeriod', NULL, 'tlsdtls', 1),
(20, 7, 'Leírás', 'Description', NULL, 'tlsdtls', 1),
(21, 8, NULL, 'ToolId', NULL, 'tlsdtls', 1),
(22, 9, NULL, 'ToolId', NULL, 'tlsdtls', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `employees`
--

CREATE TABLE `employees` (
  `EmployeeId` int(11) NOT NULL,
  `FirstName` varchar(30) NOT NULL,
  `LastName` varchar(30) NOT NULL,
  `PositionFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `employees`
--

INSERT INTO `employees` (`EmployeeId`, `FirstName`, `LastName`, `PositionFK`) VALUES
(1, 'Ádám', 'Werner', 0),
(2, 'Dávid', 'Sági', 0),
(3, 'Áron', 'Kósa', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `filters`
--

CREATE TABLE `filters` (
  `FilterId` int(11) NOT NULL,
  `Place` varchar(10) NOT NULL,
  `Number` int(2) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Type` varchar(1) NOT NULL,
  `DefaultValue` varchar(30) DEFAULT NULL,
  `ColumnName` varchar(50) NOT NULL,
  `TableName` varchar(30) NOT NULL,
  `EmployeeFK` int(11) NOT NULL,
  `Required` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `filters`
--

INSERT INTO `filters` (`FilterId`, `Place`, `Number`, `Name`, `Type`, `DefaultValue`, `ColumnName`, `TableName`, `EmployeeFK`, `Required`) VALUES
(1, 'taskfltr', 2, 'Feladat típus', 'S', NULL, 'TaskType.Name', 'task_types', 1, 0),
(2, 'taskfltr', 1, 'Feladat név', 'W', NULL, 'Name', 'tasks', 1, 0),
(3, 'prtnrfltr', 1, 'Partner név', 'W', NULL, 'Name', 'partners', 1, 0),
(4, 'prtnrfltr', 2, 'Cimke', 'S', NULL, 'PartnerTag.Name', 'partner_tags', 1, 0),
(5, 'tlsfltr', 1, 'Elérhetőség', 'S', NULL, 'Availability', 'tools', 1, 0),
(6, 'tlsfltr', 2, 'Eszköz neve', 'W', NULL, 'Name', 'tools', 1, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `form_structures`
--

CREATE TABLE `form_structures` (
  `FormStructureId` int(11) NOT NULL,
  `Place` varchar(10) NOT NULL,
  `Number` int(2) NOT NULL,
  `ParentFK` int(2) DEFAULT NULL,
  `Name` varchar(30) NOT NULL,
  `Type` varchar(2) NOT NULL,
  `DefaultValue` varchar(30) DEFAULT NULL,
  `ColumnName` varchar(50) NOT NULL,
  `Alias` varchar(50) NOT NULL,
  `TableName` varchar(30) NOT NULL,
  `UploadName` varchar(30) NOT NULL,
  `EmployeeFK` int(11) NOT NULL,
  `Required` tinyint(1) NOT NULL,
  `Functions` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `form_structures`
--

INSERT INTO `form_structures` (`FormStructureId`, `Place`, `Number`, `ParentFK`, `Name`, `Type`, `DefaultValue`, `ColumnName`, `Alias`, `TableName`, `UploadName`, `EmployeeFK`, `Required`, `Functions`) VALUES
(1, 'newtsk', 1, NULL, 'Feladat neve', 'W', NULL, 'TaskId,Name', 'Id,Name', 'tasks', 'tasks.Name', 1, 1, NULL),
(2, 'newtsk', 2, NULL, 'Feladat típusa', 'SN', NULL, 'TaskTypeId,Name', 'Id,Name', 'task_types', 'task_types.Name', 1, 1, 'TaskTypeChange'),
(3, 'newtsk', 3, NULL, 'Feladat határideje', 'DT', NULL, 'TaskId,Deadline', 'Id,Name', 'tasks', 'tasks.Deadline', 1, 0, NULL),
(4, 'newtsk', 4, NULL, 'Projekthez rendelés', 'S', NULL, 'ProjectId,Name', 'Id,Name', 'projects', 'projects.Name', 1, 0, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `insert_structures`
--

CREATE TABLE `insert_structures` (
  `InsertStructureId` int(11) NOT NULL,
  `Place` varchar(10) NOT NULL,
  `ColumnName` varchar(50) NOT NULL,
  `InsertName` varchar(30) NOT NULL,
  `InsertTable` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `insert_structures`
--

INSERT INTO `insert_structures` (`InsertStructureId`, `Place`, `ColumnName`, `InsertName`, `InsertTable`) VALUES
(1, 'newtsk', 'tasks.Name', 'Name', 'tasks'),
(2, 'newtsk', 'task_types.Name', 'TaskTypeFK', 'tasks'),
(4, 'newtsk', 'tasks.Deadline', 'Deadline', 'tasks'),
(5, 'newtsk', 'projects.Name', 'ProjectFK', 'tasks'),
(6, 'ntskwy', 'Number', 'Number', 'task_ways'),
(7, 'ntskwy', 'TaskFK', 'TaskFK', 'task_ways'),
(8, 'ntskwy', 'TaskStepFK', 'TaskStepFK', 'task_ways'),
(9, 'ntskwy', 'EmployeeFK', 'EmployeeFK', 'task_ways'),
(10, 'ntskwy', 'Active', 'Active', 'task_ways');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `partners`
--

CREATE TABLE `partners` (
  `PartnerId` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `PartnerTypeFK` int(11) NOT NULL,
  `Phone` varchar(15) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Address` varchar(50) NOT NULL,
  `LogoSrc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `partners`
--

INSERT INTO `partners` (`PartnerId`, `Name`, `PartnerTypeFK`, `Phone`, `Email`, `Address`, `LogoSrc`) VALUES
(1, 'Teszt partner 1', 1, '+36908761239', 'elso.vallalat@gmail.com', 'Valahol, Elő utca 1.', 'https://www.allenrec.com/wp-content/uploads/2017/04/new-microsoft-logo-SIZED-SQUARE.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `partner_contact`
--

CREATE TABLE `partner_contact` (
  `PartnerContactId` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Email` int(50) NOT NULL,
  `Phone` varchar(15) NOT NULL,
  `Address` varchar(50) NOT NULL,
  `PartnerFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `partner_contact`
--

INSERT INTO `partner_contact` (`PartnerContactId`, `Name`, `Email`, `Phone`, `Address`, `PartnerFK`) VALUES
(1, 'Kósa Áron', 11, '+36702395837', 'Valahol, Elő utca 1.', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `partner_tags`
--

CREATE TABLE `partner_tags` (
  `PartnerTagId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `partner_tags`
--

INSERT INTO `partner_tags` (`PartnerTagId`, `Name`) VALUES
(1, 'Fontos'),
(2, 'Alkatrészek');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `partner_types`
--

CREATE TABLE `partner_types` (
  `PartnerTypeId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `partner_types`
--

INSERT INTO `partner_types` (`PartnerTypeId`, `Name`) VALUES
(1, 'Beszállító'),
(2, 'Kereskedés');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `projects`
--

CREATE TABLE `projects` (
  `ProjectId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `StartDate` datetime NOT NULL,
  `FinishDate` datetime NOT NULL,
  `ParentFK` int(11) DEFAULT NULL,
  `IsChild` tinyint(1) NOT NULL,
  `Deadline` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `projects`
--

INSERT INTO `projects` (`ProjectId`, `Name`, `StartDate`, `FinishDate`, `ParentFK`, `IsChild`, `Deadline`) VALUES
(1, 'SSBS elkészítése1', '2019-09-05 00:00:00', '2019-10-21 00:00:00', NULL, 1, '2019-09-18 00:00:00'),
(2, 'SSBS elkészítése2', '2019-09-05 00:00:00', '2019-10-03 00:00:00', 1, 1, '2019-10-15 00:00:00'),
(3, 'SSBS elkészítése3', '2019-09-09 00:00:00', '2019-09-16 00:00:00', 2, 0, '2019-09-30 00:00:00'),
(4, 'SSBS elkészítése4', '2019-09-16 00:00:00', '2019-09-21 00:00:00', 1, 0, '2019-09-30 00:00:00'),
(5, 'SSBS elkészítése5', '2019-09-05 00:00:00', '2019-11-05 00:00:00', NULL, 0, '2019-10-26 00:00:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `saved_task_ways`
--

CREATE TABLE `saved_task_ways` (
  `SavedTaskWayId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `saved_task_ways`
--

INSERT INTO `saved_task_ways` (`SavedTaskWayId`, `Name`) VALUES
(1, 'Integrálás I.'),
(2, 'Integrálás II.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tags_for_partner`
--

CREATE TABLE `tags_for_partner` (
  `TagForPartnerId` int(11) NOT NULL,
  `PartnerTagFK` int(11) NOT NULL,
  `PartnerFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `tags_for_partner`
--

INSERT INTO `tags_for_partner` (`TagForPartnerId`, `PartnerTagFK`, `PartnerFK`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 2, 10);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tasks`
--

CREATE TABLE `tasks` (
  `TaskId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `TaskTypeFK` int(11) NOT NULL,
  `TaskCategoryFK` int(11) DEFAULT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT current_timestamp(),
  `Deadline` datetime DEFAULT NULL,
  `FinishDate` datetime DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `OrderFK` int(11) DEFAULT NULL,
  `ProjectFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `tasks`
--

INSERT INTO `tasks` (`TaskId`, `Name`, `TaskTypeFK`, `TaskCategoryFK`, `CreatedDate`, `Deadline`, `FinishDate`, `Description`, `OrderFK`, `ProjectFK`) VALUES
(1, 'Feladatkezelés megtervezése', 1, 1, '2019-08-29 01:36:25', '2019-09-26 00:00:00', NULL, 'Ez al első', NULL, 1),
(2, 'PHP megtervezése 2', 1, NULL, '2019-08-29 01:40:22', NULL, NULL, NULL, NULL, NULL),
(9, '100. feladat', 1, NULL, '2019-09-08 22:19:20', NULL, NULL, NULL, NULL, NULL),
(10, '100. feladat4', 2, NULL, '2019-09-08 22:27:33', NULL, NULL, NULL, NULL, NULL),
(11, '100. feladat3', 2, NULL, '2019-09-08 22:35:06', NULL, NULL, NULL, NULL, NULL),
(13, 'Task', 1, NULL, '2019-09-26 15:48:05', '2019-01-01 00:00:00', NULL, NULL, NULL, 4),
(14, 'Task2', 1, NULL, '2019-09-26 15:48:27', '0000-00-00 00:00:00', NULL, NULL, NULL, 4),
(15, 'Task5', 2, NULL, '2019-09-26 15:50:02', '0000-00-00 00:00:00', NULL, NULL, NULL, 2),
(16, 'Test10', 1, NULL, '2019-09-26 15:58:29', NULL, NULL, NULL, NULL, 1),
(17, 'Test12', 1, NULL, '2019-09-26 15:59:34', '0000-00-00 00:00:00', NULL, NULL, NULL, 1),
(18, '14', 1, NULL, '2019-09-26 16:00:20', NULL, NULL, NULL, NULL, 1),
(19, 'Task15', 2, NULL, '2019-09-26 16:01:42', NULL, NULL, NULL, NULL, 3),
(21, 'Első sikeres', 1, NULL, '2019-09-27 23:55:25', '2019-01-01 00:00:00', NULL, NULL, NULL, 1),
(22, 'Második sikeres', 2, NULL, '2019-09-27 23:58:43', NULL, NULL, NULL, NULL, 1),
(23, 'Harmadik', 2, NULL, '2019-09-28 00:02:33', NULL, NULL, NULL, NULL, 1),
(24, 'Negyedik', 1, NULL, '2019-09-28 00:03:31', NULL, NULL, NULL, NULL, 1),
(25, 'Az én kedvesem', 1, NULL, '2019-09-28 18:56:05', '2019-01-01 00:00:00', NULL, NULL, NULL, 2),
(26, 'Változatos', 1, NULL, '2019-09-29 23:25:35', NULL, NULL, NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `task_categories`
--

CREATE TABLE `task_categories` (
  `TaskCategoryId` int(11) NOT NULL,
  `Level` int(2) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `ParentFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `task_categories`
--

INSERT INTO `task_categories` (`TaskCategoryId`, `Level`, `Name`, `ParentFK`) VALUES
(1, 1, 'PHP', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `task_steps`
--

CREATE TABLE `task_steps` (
  `TaskStepId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `task_steps`
--

INSERT INTO `task_steps` (`TaskStepId`, `Name`) VALUES
(1, 'Ötlet felvetése'),
(2, 'Frontend kialakítása'),
(3, 'Backend kialakítása'),
(4, 'Tesztelés'),
(5, 'Prezentálás'),
(6, 'Menedzser beszélgetés'),
(7, 'Kész');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `task_types`
--

CREATE TABLE `task_types` (
  `TaskTypeId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `task_types`
--

INSERT INTO `task_types` (`TaskTypeId`, `Name`) VALUES
(1, 'Programozás'),
(2, 'Integrálás');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `task_ways`
--

CREATE TABLE `task_ways` (
  `TaskWayId` int(11) NOT NULL,
  `Number` int(11) NOT NULL,
  `TaskFK` int(11) NOT NULL,
  `TaskStepFK` int(11) NOT NULL,
  `EmployeeFK` int(11) DEFAULT NULL,
  `Active` tinyint(1) NOT NULL DEFAULT 0,
  `Ready` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `task_ways`
--

INSERT INTO `task_ways` (`TaskWayId`, `Number`, `TaskFK`, `TaskStepFK`, `EmployeeFK`, `Active`, `Ready`) VALUES
(1, 1, 1, 1, 1, 0, 1),
(2, 2, 1, 2, 3, 1, 0),
(3, 3, 1, 3, 1, 0, 0),
(4, 4, 1, 4, 1, 0, 0),
(7, 4, 1, 4, 2, 0, 0),
(11, 1, 2, 6, 1, 0, 0),
(12, 1, 19, 1, 1, 0, 0),
(13, 2, 19, 2, 3, 0, 0),
(14, 3, 19, 3, 1, 0, 0),
(15, 4, 19, 4, 2, 0, 0),
(16, 4, 19, 4, 1, 0, 0),
(17, 1, 19, 1, 1, 0, 0),
(18, 2, 19, 2, 3, 0, 0),
(19, 3, 19, 3, 1, 0, 0),
(20, 4, 19, 4, 2, 0, 0),
(21, 4, 19, 4, 1, 0, 0),
(22, 1, 21, 1, 1, 0, 0),
(23, 2, 21, 2, 3, 0, 0),
(24, 3, 21, 3, 1, 0, 0),
(25, 4, 21, 4, 2, 0, 0),
(26, 4, 21, 4, 1, 0, 0),
(27, 1, 24, 1, 1, 0, 1),
(28, 2, 24, 2, 3, 1, 0),
(29, 3, 24, 3, 1, 0, 0),
(30, 4, 24, 4, 2, 0, 0),
(31, 4, 24, 4, 1, 0, 0),
(32, 1, 25, 1, 1, 0, 1),
(33, 2, 25, 2, 3, 1, 0),
(34, 3, 25, 3, 1, 0, 0),
(35, 4, 25, 4, 2, 0, 0),
(36, 4, 25, 4, 1, 0, 0),
(37, 1, 26, 3, 1, 0, 1),
(38, 2, 26, 1, 1, 1, 0),
(39, 3, 26, 2, 3, 0, 0),
(40, 4, 26, 4, 2, 0, 0),
(41, 4, 26, 4, 1, 0, 0),
(42, 5, 1, 7, NULL, 0, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `task_way_templates`
--

CREATE TABLE `task_way_templates` (
  `TaskWayId` int(11) NOT NULL,
  `Number` int(11) NOT NULL,
  `TaskTypeFK` int(11) NOT NULL,
  `TaskStepFK` int(11) NOT NULL,
  `EmployeeFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `task_way_templates`
--

INSERT INTO `task_way_templates` (`TaskWayId`, `Number`, `TaskTypeFK`, `TaskStepFK`, `EmployeeFK`) VALUES
(1, 1, 1, 1, 1),
(2, 2, 1, 2, 3),
(3, 3, 1, 3, 1),
(4, 4, 1, 4, 1),
(7, 4, 1, 4, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tools`
--

CREATE TABLE `tools` (
  `ToolId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Type` varchar(30) NOT NULL,
  `Icon` text NOT NULL,
  `Availability` varchar(1) NOT NULL,
  `AvailableTools` int(11) NOT NULL,
  `Place` text NOT NULL,
  `Description` text DEFAULT NULL,
  `LastMaintenance` datetime DEFAULT NULL,
  `MaintenancePeriod` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `tools`
--

INSERT INTO `tools` (`ToolId`, `Name`, `Type`, `Icon`, `Availability`, `AvailableTools`, `Place`, `Description`, `LastMaintenance`, `MaintenancePeriod`) VALUES
(1, 'Samsung laptop', '', 'fa fa-plus', 'y', 2, 'Gyár, 3-as raktár', 'Semmi extra.', '2019-02-01 00:00:00', 120);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tool_remarks`
--

CREATE TABLE `tool_remarks` (
  `ToolRemarkId` int(11) NOT NULL,
  `EmployeeFK` int(11) NOT NULL,
  `RemarkText` text NOT NULL,
  `ToolFK` int(11) NOT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `tool_remarks`
--

INSERT INTO `tool_remarks` (`ToolRemarkId`, `EmployeeFK`, `RemarkText`, `ToolFK`, `CreatedDate`) VALUES
(1, 1, 'Ez egy ngyon extra text.', 1, '2019-09-02 01:28:19'),
(2, 1, 'Ez a második.', 1, '2019-09-02 01:28:20');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `update_structures`
--

CREATE TABLE `update_structures` (
  `UpdateStructureId` int(11) NOT NULL,
  `Place` varchar(10) NOT NULL,
  `ColumnName` varchar(50) NOT NULL,
  `UpdateName` varchar(30) NOT NULL,
  `UpdateTable` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `update_structures`
--

INSERT INTO `update_structures` (`UpdateStructureId`, `Place`, `ColumnName`, `UpdateName`, `UpdateTable`) VALUES
(1, 'edttsk', 'Name', 'Name', 'tasks'),
(2, 'edttsk', 'TaskTypeFK', 'TaskTypeFK', 'tasks');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cardc_structures`
--
ALTER TABLE `cardc_structures`
  ADD PRIMARY KEY (`StuctureId`);

--
-- A tábla indexei `dtls_structures`
--
ALTER TABLE `dtls_structures`
  ADD PRIMARY KEY (`StuctureId`);

--
-- A tábla indexei `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`EmployeeId`);

--
-- A tábla indexei `filters`
--
ALTER TABLE `filters`
  ADD PRIMARY KEY (`FilterId`);

--
-- A tábla indexei `form_structures`
--
ALTER TABLE `form_structures`
  ADD PRIMARY KEY (`FormStructureId`);

--
-- A tábla indexei `insert_structures`
--
ALTER TABLE `insert_structures`
  ADD PRIMARY KEY (`InsertStructureId`);

--
-- A tábla indexei `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`PartnerId`);

--
-- A tábla indexei `partner_contact`
--
ALTER TABLE `partner_contact`
  ADD PRIMARY KEY (`PartnerContactId`),
  ADD KEY `partner_contact_ibfk_1` (`PartnerFK`);

--
-- A tábla indexei `partner_tags`
--
ALTER TABLE `partner_tags`
  ADD PRIMARY KEY (`PartnerTagId`);

--
-- A tábla indexei `partner_types`
--
ALTER TABLE `partner_types`
  ADD PRIMARY KEY (`PartnerTypeId`);

--
-- A tábla indexei `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`ProjectId`);

--
-- A tábla indexei `saved_task_ways`
--
ALTER TABLE `saved_task_ways`
  ADD PRIMARY KEY (`SavedTaskWayId`);

--
-- A tábla indexei `tags_for_partner`
--
ALTER TABLE `tags_for_partner`
  ADD PRIMARY KEY (`TagForPartnerId`);

--
-- A tábla indexei `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`TaskId`),
  ADD KEY `ProjectFK` (`ProjectFK`);

--
-- A tábla indexei `task_categories`
--
ALTER TABLE `task_categories`
  ADD PRIMARY KEY (`TaskCategoryId`);

--
-- A tábla indexei `task_steps`
--
ALTER TABLE `task_steps`
  ADD PRIMARY KEY (`TaskStepId`);

--
-- A tábla indexei `task_types`
--
ALTER TABLE `task_types`
  ADD PRIMARY KEY (`TaskTypeId`);

--
-- A tábla indexei `task_ways`
--
ALTER TABLE `task_ways`
  ADD PRIMARY KEY (`TaskWayId`),
  ADD KEY `TaskStepFK` (`TaskStepFK`);

--
-- A tábla indexei `task_way_templates`
--
ALTER TABLE `task_way_templates`
  ADD PRIMARY KEY (`TaskWayId`);

--
-- A tábla indexei `tools`
--
ALTER TABLE `tools`
  ADD PRIMARY KEY (`ToolId`);

--
-- A tábla indexei `tool_remarks`
--
ALTER TABLE `tool_remarks`
  ADD PRIMARY KEY (`ToolRemarkId`);

--
-- A tábla indexei `update_structures`
--
ALTER TABLE `update_structures`
  ADD PRIMARY KEY (`UpdateStructureId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `cardc_structures`
--
ALTER TABLE `cardc_structures`
  MODIFY `StuctureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT a táblához `dtls_structures`
--
ALTER TABLE `dtls_structures`
  MODIFY `StuctureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT a táblához `employees`
--
ALTER TABLE `employees`
  MODIFY `EmployeeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `filters`
--
ALTER TABLE `filters`
  MODIFY `FilterId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `form_structures`
--
ALTER TABLE `form_structures`
  MODIFY `FormStructureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `insert_structures`
--
ALTER TABLE `insert_structures`
  MODIFY `InsertStructureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `partner_contact`
--
ALTER TABLE `partner_contact`
  MODIFY `PartnerContactId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `partner_tags`
--
ALTER TABLE `partner_tags`
  MODIFY `PartnerTagId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `partner_types`
--
ALTER TABLE `partner_types`
  MODIFY `PartnerTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `projects`
--
ALTER TABLE `projects`
  MODIFY `ProjectId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `saved_task_ways`
--
ALTER TABLE `saved_task_ways`
  MODIFY `SavedTaskWayId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `tags_for_partner`
--
ALTER TABLE `tags_for_partner`
  MODIFY `TagForPartnerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `tasks`
--
ALTER TABLE `tasks`
  MODIFY `TaskId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT a táblához `task_categories`
--
ALTER TABLE `task_categories`
  MODIFY `TaskCategoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `task_steps`
--
ALTER TABLE `task_steps`
  MODIFY `TaskStepId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `task_types`
--
ALTER TABLE `task_types`
  MODIFY `TaskTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `task_ways`
--
ALTER TABLE `task_ways`
  MODIFY `TaskWayId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT a táblához `task_way_templates`
--
ALTER TABLE `task_way_templates`
  MODIFY `TaskWayId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `tools`
--
ALTER TABLE `tools`
  MODIFY `ToolId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `tool_remarks`
--
ALTER TABLE `tool_remarks`
  MODIFY `ToolRemarkId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `update_structures`
--
ALTER TABLE `update_structures`
  MODIFY `UpdateStructureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `partner_contact`
--
ALTER TABLE `partner_contact`
  ADD CONSTRAINT `partner_contact_ibfk_1` FOREIGN KEY (`PartnerFK`) REFERENCES `partners` (`PartnerId`);

--
-- Megkötések a táblához `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`ProjectFK`) REFERENCES `projects` (`ProjectId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
