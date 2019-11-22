-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2019. Nov 22. 11:15
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
  `BackendF` text DEFAULT NULL,
  `Place` varchar(10) NOT NULL,
  `EmployeeFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `cardc_structures`
--

INSERT INTO `cardc_structures` (`StuctureId`, `Number`, `ColumnName`, `Tables`, `BackendF`, `Place`, `EmployeeFK`) VALUES
(1, 1, 'TaskId', NULL, NULL, 'taskmd', 1),
(2, 2, 'Name', NULL, NULL, 'taskmd', 1),
(4, 3, 'TaskType.Name', 'task_types', NULL, 'taskmd', 1),
(7, 1, 'LogoSrc', NULL, NULL, 'prtnrmd', 1),
(8, 2, 'Name', NULL, NULL, 'prtnrmd', 1),
(9, 3, 'Phone', NULL, NULL, 'prtnrmd', 1),
(10, 4, 'Address', NULL, NULL, 'prtnrmd', 1),
(11, 5, 'PartnerId', NULL, NULL, 'prtnrmd', 1),
(13, NULL, 'PartnerType.Name', 'partner_types', NULL, 'prtnrmd', 1),
(14, 1, 'PartnerContactId', NULL, NULL, 'prtnrdcnt', 1),
(15, 2, 'Name', NULL, NULL, 'prtnrdcnt', 1),
(16, 3, 'Email', NULL, NULL, 'prtnrdcnt', 1),
(17, 4, 'Phone', NULL, NULL, 'prtnrdcnt', 1),
(18, 5, 'Address', NULL, NULL, 'prtnrdcnt', 1),
(19, 1, 'Icon', NULL, NULL, 'tlsmd', 1),
(20, 2, 'Name', NULL, NULL, 'tlsmd', 1),
(21, 3, 'Place', NULL, NULL, 'tlsmd', 1),
(22, 4, 'ToolAvailability.Name', 'tool_availabilities', NULL, 'tlsmd', 1),
(23, 5, 'ToolId', NULL, NULL, 'tlsmd', 1),
(24, NULL, 'CreatedDate', NULL, NULL, 'taskmd', 1),
(25, NULL, 'Deadline', NULL, NULL, 'taskmd', 1),
(26, NULL, 'Description', NULL, NULL, 'taskmd', 1),
(28, 1, 'Number', NULL, NULL, 'taskwy', 1),
(29, 2, 'TaskStep.Name', 'task_steps', NULL, 'taskwy', 1),
(30, 3, 'Number', NULL, NULL, 'taskwy', 1),
(31, 4, 'TaskStepFK', NULL, NULL, 'taskwy', 1),
(32, 5, 'Number', NULL, NULL, 'taskwy', 1),
(33, 6, 'TaskStepFK', NULL, NULL, 'taskwy', 1),
(35, NULL, 'Active', NULL, NULL, 'taskwy', 1),
(37, 1, 'TaskStepFK', NULL, NULL, 'ntaskwy', 1),
(38, 3, 'TaskStep.Name', 'task_steps', NULL, 'ntaskwy', 1),
(39, 2, 'Number', NULL, NULL, 'ntaskwy', 1),
(41, NULL, 'TaskFK', NULL, NULL, 'taskwy', 1),
(42, NULL, 'Email', NULL, NULL, 'prtnrmd', 1),
(43, 1, 'EmployeeId', NULL, NULL, 'emplmd', 1),
(44, 2, 'EmployeePosition.Name', 'employee_positions', NULL, 'emplmd', 1),
(45, 3, 'TotalCost', NULL, NULL, 'emplmd', 1),
(46, 4, 'FirstName', NULL, NULL, 'emplmd', 1),
(47, 5, 'LastName', NULL, NULL, 'emplmd', 1),
(48, NULL, 'GrossSalary', NULL, NULL, 'emplmd', 1),
(49, NULL, 'NetSalary', NULL, NULL, 'emplmd', 1),
(50, NULL, 'OtherAllowances', NULL, NULL, 'emplmd', 1),
(51, 6, 'Rate', NULL, NULL, 'emplmd', 1),
(52, 1, 'OrderId', NULL, NULL, 'ordrmd', 1),
(53, 3, 'AliasId', NULL, NULL, 'ordrmd', 1),
(54, 2, 'Name', NULL, NULL, 'ordrmd', 1),
(55, NULL, 'Customer.FirstName', 'customers', NULL, 'ordrmd', 1),
(56, NULL, 'Partner.Name', 'partners', NULL, 'ordrmd', 1),
(57, NULL, 'AvailableTools', NULL, NULL, 'tlsmd', 1),
(58, NULL, 'Customer.LastName', 'customers', NULL, 'ordrmd', 1),
(59, 4, 'OrderDate', NULL, NULL, 'ordrmd', 1),
(60, NULL, 'OrderId.OrderProducts', NULL, 'vo/1//OrderId', 'ordrmd', 1),
(61, NULL, 'OrderId.OrderServices', NULL, 'vo/2//OrderId', 'ordrmd', 1),
(62, NULL, 'LastMaintenance', NULL, NULL, 'tlsmd', 1),
(63, NULL, 'MaintenancePeriod', NULL, NULL, 'tlsmd', 1),
(64, NULL, 'Description', NULL, NULL, 'tlsmd', 1),
(65, NULL, 'ToolType.Name', 'tool_types', NULL, 'tlsmd', 1),
(66, NULL, 'ToolId.ToolRemarks', NULL, 'vo/3//ToolId', 'tlsmd', 1),
(67, NULL, 'PartnerId.PartnerContacts', NULL, 'vo/4//PartnerId', 'prtnrmd', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `customers`
--

CREATE TABLE `customers` (
  `CustomerId` int(11) NOT NULL,
  `FirstName` varchar(30) NOT NULL,
  `LastName` varchar(30) NOT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `LastOrderDate` datetime DEFAULT NULL,
  `IsRegistered` tinyint(1) NOT NULL DEFAULT 0,
  `UserId` varchar(30) DEFAULT NULL,
  `Password` varchar(64) DEFAULT NULL,
  `RegisterDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `customers`
--

INSERT INTO `customers` (`CustomerId`, `FirstName`, `LastName`, `Address`, `Phone`, `LastOrderDate`, `IsRegistered`, `UserId`, `Password`, `RegisterDate`) VALUES
(1, 'Géza', 'Szabó', 'Géza utca 3.', '+36 20 9127 181', NULL, 0, NULL, NULL, NULL),
(2, 'Varga', 'András', 'Kavarga utca 2.', '+36 50 2819 327', NULL, 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `dtls_structures`
--

CREATE TABLE `dtls_structures` (
  `StuctureId` int(11) NOT NULL,
  `Number` varchar(3) NOT NULL,
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
(5, '1', NULL, 'Name', NULL, 'taskdtls', 1),
(6, 'g1', 'Feladat típus', 'TaskType.Name', 'task_types', 'taskdtls', 1),
(7, 'g2', 'Létrehozás dátuma', 'CreatedDate', NULL, 'taskdtls', 1),
(8, 'g3', 'Határidő', 'Deadline', NULL, 'taskdtls', 1),
(9, 'g4', 'Leírás', 'Description', NULL, 'taskdtls', 1),
(10, '1', NULL, 'Name', NULL, 'prtnrdtls', 1),
(11, 'g1', 'Felefonszám', 'Phone', NULL, 'prtnrdtls', 1),
(12, 'g2', 'Email', 'Email', NULL, 'prtnrdtls', 1),
(13, 'g3', 'Cím', 'Address', NULL, 'prtnrdtls', 1),
(14, '2', NULL, 'Name', NULL, 'tlsdtls', 1),
(15, '3', NULL, 'ToolType.Name', 'tool_types', 'tlsdtls', 1),
(16, 'g1', 'Helye', 'Place', NULL, 'tlsdtls', 1),
(17, 'g2', 'Elérhető eszökök', 'ToolAvailability.Name', 'tool_availabilities', 'tlsdtls', 1),
(18, 'g4', 'Utolsó karbantartás', 'LastMaintenance', NULL, 'tlsdtls', 1),
(19, 'g5', 'Karbantartást igényel', 'MaintenancePeriod', NULL, 'tlsdtls', 1),
(20, 'g6', 'Leírás', 'Description', NULL, 'tlsdtls', 1),
(21, '1', NULL, 'ToolId', NULL, 'tlsdtls', 1),
(23, '1', NULL, 'FirstName', NULL, 'empldtls', 1),
(24, '3', NULL, 'EmployeePosition.Name', 'employee_positions', 'empldtls', 1),
(25, '2', NULL, 'LastName', NULL, 'empldtls', 1),
(26, 'g1', 'Bruttó fizetés', 'GrossSalary', NULL, 'empldtls', 1),
(27, 'g2', 'Nettó fizetés', 'NetSalary', NULL, 'empldtls', 1),
(28, 'g3', 'Egyéb juttatások', 'OtherAllowances', NULL, 'empldtls', 1),
(29, 'g4', 'Teljes költség', 'TotalCost', NULL, 'empldtls', 1),
(31, 'g3', 'Elérhető eszközök', 'AvailableTools', NULL, 'tlsdtls', 1),
(33, '1', NULL, 'Name', NULL, 'ordrdtls', 1),
(34, 'g1', 'Rendelés azonosító', 'AliasId', NULL, 'ordrdtls', 1),
(35, 'g2', 'Rendelő vezetékneve', 'Customer.LastName', NULL, 'ordrdtls', 1),
(36, 'g3', 'Rendelő keresztneve', 'Customer.FirstName', NULL, 'ordrdtls', 1),
(37, 'g5', 'Rendelés ideje', 'OrderDate', NULL, 'ordrdtls', 1),
(38, 'g4', 'Rendelő partner', 'Partner.Name', NULL, 'ordrdtls', 1),
(39, 'o1', NULL, 'OrderProducts', NULL, 'ordrdtls', 1),
(40, 'o2', NULL, 'OrderServices', NULL, 'ordrdtls', 1),
(41, 'o1', NULL, 'ToolRemarks', NULL, 'tlsdtls', 1),
(42, 'o1', NULL, 'PartnerContacts', NULL, 'prtnrdtls', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `employees`
--

CREATE TABLE `employees` (
  `EmployeeId` int(11) NOT NULL,
  `FirstName` varchar(30) NOT NULL,
  `LastName` varchar(30) NOT NULL,
  `EmployeePositionFK` int(11) NOT NULL,
  `GrossSalary` int(11) NOT NULL,
  `NetSalary` int(11) NOT NULL,
  `OtherTaxes` int(11) NOT NULL,
  `OtherAllowances` int(11) NOT NULL,
  `TotalCost` int(11) NOT NULL,
  `Rate` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `employees`
--

INSERT INTO `employees` (`EmployeeId`, `FirstName`, `LastName`, `EmployeePositionFK`, `GrossSalary`, `NetSalary`, `OtherTaxes`, `OtherAllowances`, `TotalCost`, `Rate`) VALUES
(1, 'Ádám', 'Werner', 1, 100000, 80000, 30000, 0, 130000, 4.9),
(2, 'Dávid', 'Sági', 1, 200000, 160000, 60000, 0, 260000, 4.8),
(3, 'Áron', 'Kósa', 2, 300000, 240000, 90000, 0, 390000, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `employee_positions`
--

CREATE TABLE `employee_positions` (
  `EmployeePositionId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `employee_positions`
--

INSERT INTO `employee_positions` (`EmployeePositionId`, `Name`) VALUES
(1, 'Fejlesztő'),
(2, 'Menedzser');

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
  `TableName` varchar(50) NOT NULL,
  `EmployeeFK` int(11) NOT NULL,
  `Required` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `filters`
--

INSERT INTO `filters` (`FilterId`, `Place`, `Number`, `Name`, `Type`, `DefaultValue`, `ColumnName`, `TableName`, `EmployeeFK`, `Required`) VALUES
(1, 'tskfltr', 2, 'Feladat típus', 'S', NULL, 'TaskType.Name', 'task_types', 1, 0),
(2, 'tskfltr', 1, 'Feladat név', 'W', NULL, 'Name', 'tasks', 1, 0),
(3, 'prtnrfltr', 1, 'Partner név', 'W', NULL, 'Name', 'partners', 1, 0),
(4, 'prtnrfltr', 2, 'Cimke', 'S', NULL, 'TagForPartner.PartnerTag.Name', 'tags_for_partner.partner_tags', 1, 0),
(5, 'tlsfltr', 2, 'Elérhetőség', 'S', NULL, 'ToolAvailability.Name', 'tool_availabilities', 1, 0),
(6, 'tlsfltr', 1, 'Eszköz neve', 'W', NULL, 'Name', 'tools', 1, 0),
(7, 'emlpfltr', 1, 'Keresztnév', 'W', NULL, 'FirstName', 'employees', 1, 0),
(8, 'emlpfltr', 2, 'Pozíció', 'S', NULL, 'EmployeePosition.Name', 'employee_positions', 1, 0),
(9, 'ordrfltr', 1, 'Rendelés neve', 'W', NULL, 'Name', 'orders', 1, 0),
(10, 'ordrfltr', 2, 'Rendelés azonosító', 'W', NULL, 'AliasId', 'orders', 1, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `form_structures`
--

CREATE TABLE `form_structures` (
  `FormStructureId` int(11) NOT NULL,
  `Place` varchar(10) NOT NULL,
  `Number` int(2) NOT NULL,
  `ParentFK` int(2) DEFAULT NULL,
  `Name` varchar(30) DEFAULT NULL,
  `Type` varchar(2) NOT NULL,
  `DefaultValue` varchar(30) DEFAULT NULL,
  `ColumnName` varchar(50) NOT NULL,
  `Alias` varchar(50) NOT NULL,
  `TableName` varchar(30) NOT NULL,
  `TruncatedIdName` varchar(30) NOT NULL,
  `UploadName` varchar(30) DEFAULT NULL,
  `EmployeeFK` int(11) NOT NULL,
  `Required` tinyint(1) NOT NULL,
  `Functions` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `form_structures`
--

INSERT INTO `form_structures` (`FormStructureId`, `Place`, `Number`, `ParentFK`, `Name`, `Type`, `DefaultValue`, `ColumnName`, `Alias`, `TableName`, `TruncatedIdName`, `UploadName`, `EmployeeFK`, `Required`, `Functions`) VALUES
(1, 'newtsk', 1, NULL, 'Feladat neve', 'W', NULL, 'TaskId,Name', 'Id,Name', 'tasks', 'Task', 'tasks.Name', 1, 1, NULL),
(2, 'newtsk', 2, NULL, 'Feladat típusa', 'SN', NULL, 'TaskTypeId,Name', 'Id,Name', 'task_types', 'TaskType', 'task_types.Name', 1, 1, 'TaskTypeChange'),
(3, 'newtsk', 3, NULL, 'Feladat határideje', 'DT', NULL, 'TaskId,Deadline', 'Id,Name', 'tasks', 'Task', 'tasks.Deadline', 1, 0, NULL),
(4, 'newtsk', 4, NULL, 'Projekthez rendelés', 'S', NULL, 'ProjectId,Name', 'Id,Name', 'projects', 'Project', 'projects.Name', 1, 0, NULL),
(6, 'nprtnr', 1, NULL, 'Partner neve', 'W', NULL, 'PartnerId,Name', 'Id,Name', 'partners', 'Partner', 'partners.Name', 1, 1, NULL),
(7, 'nprtnr', 2, NULL, 'Partner típusa', 'SN', NULL, 'PartnerTypeId,Name', 'Id,Name', 'partner_types', 'PartnerType', 'partner_types.Name', 1, 1, NULL),
(8, 'ntskstpss', 1, NULL, NULL, 'S', NULL, 'TaskStepId,Name', 'Id,Name', 'task_steps', 'TaskStep', NULL, 1, 1, NULL),
(9, 'ntskstpses', 1, NULL, NULL, 'S', NULL, 'EmployeeId,FirstName', 'Id,Name', 'employees', 'Employee', NULL, 1, 1, NULL);

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
(10, 'ntskwy', 'Active', 'Active', 'task_ways'),
(11, 'ntskstpsew', 'StepName', 'Name', 'task_steps');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `OrderId` int(11) NOT NULL,
  `AliasId` varchar(50) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `CustomerFK` int(11) DEFAULT NULL,
  `PartnerFK` int(11) DEFAULT NULL,
  `OrderDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `orders`
--

INSERT INTO `orders` (`OrderId`, `AliasId`, `Name`, `CustomerFK`, `PartnerFK`, `OrderDate`) VALUES
(1, 'o1234', 'Okoskonyha', 1, NULL, '2019-11-02 00:00:00'),
(2, 'o1001', 'Vízvezeték szerelés', NULL, 1, '2019-11-02 00:00:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `order_products`
--

CREATE TABLE `order_products` (
  `OrderProductId` int(11) NOT NULL,
  `OrderFK` int(11) NOT NULL,
  `ProductFK` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `order_products`
--

INSERT INTO `order_products` (`OrderProductId`, `OrderFK`, `ProductFK`, `Quantity`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 1),
(3, 1, 3, 1),
(4, 2, 5, 5);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `order_services`
--

CREATE TABLE `order_services` (
  `OrderServiceId` int(11) NOT NULL,
  `OrderFK` int(11) NOT NULL,
  `ServiceFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `order_services`
--

INSERT INTO `order_services` (`OrderServiceId`, `OrderFK`, `ServiceFK`) VALUES
(1, 2, 1),
(2, 2, 2);

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
(1, 'Teszt partner 1', 1, '+36908761239', 'elso.vallalat@gmail.com', 'Valahol, Elő utca 1.', 'https://www.allenrec.com/wp-content/uploads/2017/04/new-microsoft-logo-SIZED-SQUARE.jpg'),
(2, 'Audi', 1, '', 'audi@gmial.com', 'Valahol, Elő utca 2.', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `partner_contacts`
--

CREATE TABLE `partner_contacts` (
  `PartnerContactId` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Phone` varchar(15) NOT NULL,
  `Address` varchar(50) NOT NULL,
  `PartnerFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `partner_contacts`
--

INSERT INTO `partner_contacts` (`PartnerContactId`, `Name`, `Email`, `Phone`, `Address`, `PartnerFK`) VALUES
(1, 'Kósa Áron', 'kosa.aron@gmail.com', '+36702395837', 'Valahol, Elő utca 1.', 1),
(2, 'Sági Dávid', 'sagi.david@gmail.com', '+36209485736', 'Valahol2, Elő utca 1.', 1);

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
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `ProductId` int(11) NOT NULL,
  `AliasId` varchar(50) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `InStockQuantity` int(11) NOT NULL DEFAULT 0,
  `PurchasePrice` int(11) NOT NULL DEFAULT 0,
  `SalePrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`ProductId`, `AliasId`, `Name`, `InStockQuantity`, `PurchasePrice`, `SalePrice`) VALUES
(1, 'p1001', 'Sütő', 5, 200000, 250000),
(2, 'p1002', 'Légelszívó', 3, 100000, 125000),
(3, 'p1003', 'Hűtő', 0, 130000, 150000),
(5, 'p1004', '1m vízvezeték', 10, 15000, 20000);

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
-- Tábla szerkezet ehhez a táblához `services`
--

CREATE TABLE `services` (
  `ServiceId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `services`
--

INSERT INTO `services` (`ServiceId`, `Name`, `Price`) VALUES
(1, 'Csőjavítás', 50000),
(2, 'Vízvezeték hibafeltárás', 30000);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sorts`
--

CREATE TABLE `sorts` (
  `SortId` int(11) NOT NULL,
  `Place` varchar(10) NOT NULL,
  `Number` int(2) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `DefaultValue` tinyint(1) NOT NULL,
  `Required` tinyint(1) NOT NULL,
  `ColumnName` varchar(50) NOT NULL,
  `TableName` varchar(30) NOT NULL,
  `EmployeeFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `sorts`
--

INSERT INTO `sorts` (`SortId`, `Place`, `Number`, `Name`, `DefaultValue`, `Required`, `ColumnName`, `TableName`, `EmployeeFK`) VALUES
(1, 'tskfltr', 1, 'Feladat típus', 2, 0, 'TaskType.Name', 'task_types', 1),
(2, 'tskfltr', 2, 'Feladat név', 2, 0, 'Name', 'tasks', 1),
(3, 'prtnrfltr', 1, 'Partner név', 2, 0, 'Name', '', 1),
(4, 'prtnrfltr', 2, 'Cimke', 2, 0, 'TagForPartner.PartnerTag.Name', '', 1),
(5, 'tlsfltr', 2, 'Elérhetőség', 2, 0, 'ToolAvailability.Name', '', 1),
(6, 'tlsfltr', 1, 'Eszköz neve', 2, 0, 'Name', '', 1),
(7, 'emlpfltr', 1, 'Keresztnév', 2, 0, 'FirstName', '', 1),
(8, 'emlpfltr', 2, 'Pozíció', 2, 0, 'EmployeePosition.Name', '', 1),
(9, 'ordrfltr', 1, 'Rendelés neve', 2, 0, 'Name', '', 1),
(10, 'ordrfltr', 2, 'Rendelés azonosító', 2, 0, 'AliasId', '', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `table_structures`
--

CREATE TABLE `table_structures` (
  `TableStructureId` int(11) NOT NULL,
  `Place` varchar(10) NOT NULL,
  `Number` int(11) NOT NULL,
  `ColumnName` varchar(30) NOT NULL,
  `ColumnTitle` varchar(30) DEFAULT NULL,
  `Tables` varchar(50) DEFAULT NULL,
  `ColumnWidth` int(11) NOT NULL,
  `EmployeeFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `table_structures`
--

INSERT INTO `table_structures` (`TableStructureId`, `Place`, `Number`, `ColumnName`, `ColumnTitle`, `Tables`, `ColumnWidth`, `EmployeeFK`) VALUES
(1, 'prodtbl', 1, 'ProductId', NULL, NULL, 0, 1),
(2, 'prodtbl', 1, 'AliasId', 'Azonosító', NULL, 2, 1),
(3, 'prodtbl', 2, 'Name', 'Termék', NULL, 4, 1),
(4, 'prodtbl', 3, 'InStockQuantity', 'Mennyiség', NULL, 2, 1),
(5, 'prodtbl', 4, 'PurchasePrice', 'Vételi ár', NULL, 2, 1),
(6, 'prodtbl', 5, 'SalePrice', 'Eladási ár', NULL, 2, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tags_for_partner`
--

CREATE TABLE `tags_for_partner` (
  `TagForPartnerId` int(11) NOT NULL,
  `PartnerFK` int(11) NOT NULL,
  `PartnerTagFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `tags_for_partner`
--

INSERT INTO `tags_for_partner` (`TagForPartnerId`, `PartnerFK`, `PartnerTagFK`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 2);

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
(26, 'Változatos', 1, NULL, '2019-09-29 23:25:35', NULL, NULL, NULL, NULL, 2),
(27, 'Más feladattípus', 5, NULL, '2019-11-04 22:13:30', '2019-01-01 00:00:00', NULL, NULL, NULL, 3),
(28, 'Teszt2', 1, NULL, '2019-11-05 19:05:56', '2019-01-01 00:00:00', NULL, NULL, NULL, 4),
(29, 'Teszt3', 2, NULL, '2019-11-05 19:06:25', '2019-01-01 00:00:00', NULL, NULL, NULL, 2),
(30, 'Legújabb', 1, NULL, '2019-11-15 01:43:34', NULL, NULL, NULL, NULL, 2),
(31, 'Legújabb', 1, NULL, '2019-11-15 01:44:51', NULL, NULL, NULL, NULL, 3),
(32, 'Teszt9', 1, NULL, '2019-11-15 09:50:39', NULL, NULL, NULL, NULL, 1),
(33, 'Tesz10', 1, NULL, '2019-11-15 10:37:05', NULL, NULL, NULL, NULL, 1),
(34, 'Új ember teszt', 1, NULL, '2019-11-15 10:38:05', NULL, NULL, NULL, NULL, 1),
(35, 'Tesz11', 1, NULL, '2019-11-15 10:44:39', NULL, NULL, NULL, NULL, 1),
(36, 'Teszt12', 1, NULL, '2019-11-15 10:53:27', NULL, NULL, NULL, NULL, 4),
(37, 'Teszt12', 1, NULL, '2019-11-15 10:53:35', NULL, NULL, NULL, NULL, 4),
(38, 'Teszt13', 1, NULL, '2019-11-15 10:55:58', NULL, NULL, NULL, NULL, 5),
(39, 'Teszt plusz feladat', 1, NULL, '2019-11-15 11:04:24', NULL, NULL, NULL, NULL, 5),
(40, 'Plusz kész', 1, NULL, '2019-11-15 11:08:24', '2019-12-01 00:00:00', NULL, NULL, NULL, 2),
(41, 'Teszt14', 1, NULL, '2019-11-15 11:10:35', NULL, NULL, NULL, NULL, 3),
(42, 'tesz14', 1, NULL, '2019-11-15 11:13:37', NULL, NULL, NULL, NULL, 1),
(43, 'tesz15', 1, NULL, '2019-11-15 11:15:20', NULL, NULL, NULL, NULL, 1),
(44, 'Tesz16', 1, NULL, '2019-11-15 11:17:14', NULL, NULL, NULL, NULL, 4),
(45, 'Ready ready', 1, NULL, '2019-11-15 11:56:52', NULL, NULL, NULL, NULL, 2),
(46, 'Ready ready', 1, NULL, '2019-11-15 12:01:10', NULL, NULL, NULL, NULL, 4),
(47, 'Kész Áronnak', 1, NULL, '2019-11-16 14:32:04', NULL, NULL, NULL, NULL, 2),
(48, 'Áronnak 2', 1, NULL, '2019-11-16 14:32:43', NULL, NULL, NULL, NULL, 1),
(49, 'Teszt4 Új', 1, NULL, '2019-11-17 14:45:09', NULL, NULL, NULL, NULL, 2),
(50, 'Mindenműködik test', 6, NULL, '2019-11-17 14:47:06', NULL, NULL, NULL, NULL, 4),
(51, 'Sorrend Teszt', 1, NULL, '2019-11-17 23:10:06', NULL, NULL, NULL, NULL, 2),
(52, 'Test popup', 1, NULL, '2019-11-19 15:03:16', NULL, NULL, NULL, NULL, 1);

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
(7, 'Kész'),
(8, 'Új'),
(9, 'alma'),
(10, 'valami'),
(11, 'Teszt2'),
(12, 'Tesz3'),
(13, 'Teszt4'),
(14, 'Teszt4');

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
(2, 'Integrálás'),
(5, 'Teszt1'),
(6, 'adsf'),
(7, 'adsf'),
(8, 'adsfgggg'),
(9, 'asdffffff'),
(10, 'asddssss'),
(11, 'afdjjjjjjjjj'),
(12, 'adsfrrrrr'),
(13, 'asdfduuuu'),
(14, 'asdfbbbb'),
(15, 'adsfdsvvvv'),
(16, 'ez az új'),
(17, 'asdfdsbbttt'),
(18, 'Progi2222'),
(19, 'Szia Áron');

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
(2, 2, 1, 2, 3, 0, 1),
(3, 3, 1, 3, 1, 0, 1),
(4, 4, 1, 4, 1, 0, 1),
(7, 4, 1, 4, 2, 0, 1),
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
(22, 1, 21, 1, 1, 0, 1),
(23, 2, 21, 2, 3, 1, 0),
(24, 3, 21, 3, 1, 0, 0),
(25, 4, 21, 4, 2, 0, 0),
(26, 4, 21, 4, 1, 0, 0),
(27, 1, 24, 1, 1, 0, 1),
(28, 2, 24, 2, 3, 1, 0),
(29, 3, 24, 3, 1, 0, 0),
(30, 4, 24, 4, 2, 0, 0),
(31, 4, 24, 4, 1, 0, 0),
(32, 1, 25, 1, 1, 0, 1),
(33, 2, 25, 2, 3, 0, 1),
(34, 3, 25, 3, 1, 1, 0),
(35, 4, 25, 4, 2, 0, 0),
(36, 4, 25, 4, 1, 0, 0),
(37, 1, 26, 3, 1, 0, 1),
(38, 2, 26, 1, 1, 1, 0),
(39, 3, 26, 2, 3, 0, 0),
(40, 4, 26, 4, 2, 0, 0),
(41, 4, 26, 4, 1, 0, 0),
(42, 5, 1, 7, NULL, 1, 0),
(43, 1, 28, 1, 1, 1, 0),
(44, 2, 28, 2, 3, 0, 0),
(45, 3, 28, 3, 1, 0, 0),
(46, 4, 28, 4, 1, 0, 0),
(47, 4, 28, 4, 2, 0, 0),
(48, 1, 29, 1, 1, 1, 0),
(49, 2, 29, 2, 3, 0, 0),
(50, 3, 29, 3, 1, 0, 0),
(51, 4, 29, 4, 2, 0, 0),
(52, 4, 29, 4, 1, 0, 0),
(53, 1, 29, 1, 1, 1, 0),
(54, 2, 29, 2, 3, 0, 0),
(55, 3, 29, 3, 1, 0, 0),
(56, 4, 29, 4, 2, 0, 0),
(57, 4, 29, 4, 1, 0, 0),
(58, 1, 29, 1, 1, 1, 0),
(59, 2, 29, 2, 3, 0, 0),
(60, 3, 29, 3, 1, 0, 0),
(61, 4, 29, 4, 1, 0, 0),
(62, 4, 29, 4, 2, 0, 0),
(63, 1, 30, 1, NULL, 1, 0),
(64, 2, 30, 2, NULL, 0, 0),
(65, 3, 30, 3, NULL, 0, 0),
(66, 4, 30, 4, NULL, 0, 0),
(67, 4, 30, 4, NULL, 0, 0),
(68, 1, 31, 1, NULL, 1, 0),
(69, 2, 31, 2, NULL, 0, 0),
(70, 3, 31, 3, NULL, 0, 0),
(71, 4, 31, 4, NULL, 0, 0),
(72, 4, 31, 4, NULL, 0, 0),
(73, 1, 32, 1, NULL, 1, 0),
(74, 2, 32, 2, NULL, 0, 0),
(75, 3, 32, 3, NULL, 0, 0),
(76, 4, 32, 4, NULL, 0, 0),
(77, 4, 32, 4, NULL, 0, 0),
(78, 1, 33, 1, 1, 1, 0),
(79, 2, 33, 2, 3, 0, 0),
(80, 3, 33, 3, 1, 0, 0),
(81, 4, 33, 4, 1, 0, 0),
(82, 4, 33, 4, 2, 0, 0),
(83, 1, 34, 1, 1, 1, 0),
(84, 2, 34, 2, 3, 0, 0),
(85, 3, 34, 3, 1, 0, 0),
(86, 4, 34, 4, 1, 0, 0),
(87, 4, 34, 4, 2, 0, 0),
(88, 1, 35, 1, 1, 0, 1),
(89, 1, 35, 1, 3, 0, 1),
(90, 1, 35, 1, 2, 0, 1),
(91, 2, 35, 2, 3, 1, 0),
(92, 3, 35, 3, 1, 0, 0),
(93, 4, 35, 4, 1, 0, 0),
(94, 4, 35, 4, 2, 0, 0),
(95, 1, 38, 1, 1, 0, 1),
(96, 1, 38, 1, 3, 0, 1),
(97, 1, 38, 1, 2, 0, 1),
(98, 2, 38, 2, 3, 0, 1),
(99, 3, 38, 3, 1, 0, 1),
(100, 4, 38, 4, 1, 1, 0),
(101, 4, 38, 4, 2, 1, 0),
(102, 1, 39, 1, 1, 1, 0),
(103, 2, 39, 2, 3, 0, 0),
(104, 3, 39, 3, 1, 0, 0),
(105, 4, 39, 4, 1, 0, 0),
(106, 4, 39, 4, 2, 0, 0),
(107, 5, 39, 5, 1, 0, 0),
(108, 1, 40, 1, 1, 1, 0),
(109, 2, 40, 2, 3, 0, 0),
(110, 3, 40, 3, 1, 0, 0),
(111, 4, 40, 4, 1, 0, 0),
(112, 4, 40, 4, 2, 0, 0),
(113, 5, 40, 7, 2, 0, 0),
(114, 1, 41, 1, 1, 1, 0),
(115, 2, 41, 2, 3, 0, 0),
(116, 3, 41, 3, 1, 0, 0),
(117, 4, 41, 4, 1, 0, 0),
(118, 4, 41, 4, 2, 0, 0),
(119, 1, 42, 1, 1, 1, 0),
(120, 2, 42, 2, 3, 0, 0),
(121, 3, 42, 3, 1, 0, 0),
(122, 4, 42, 4, 1, 0, 0),
(123, 4, 42, 4, 2, 0, 0),
(124, 1, 43, 1, 1, 1, 0),
(125, 2, 43, 2, 3, 0, 0),
(126, 3, 43, 3, 1, 0, 0),
(127, 4, 43, 4, 1, 0, 0),
(128, 4, 43, 4, 2, 0, 0),
(129, 1, 44, 1, 1, 1, 0),
(130, 2, 44, 2, 3, 0, 0),
(131, 3, 44, 3, 1, 0, 0),
(132, 4, 44, 4, 1, 0, 0),
(133, 4, 44, 4, 2, 0, 0),
(134, 1, 46, 1, 1, 1, 0),
(135, 2, 46, 2, 3, 0, 0),
(136, 3, 46, 3, 1, 0, 0),
(137, 4, 46, 4, 2, 0, 0),
(138, 4, 46, 4, 1, 0, 0),
(139, 5, 46, 7, NULL, 0, 0),
(140, 1, 47, 1, 1, 0, 1),
(141, 2, 47, 2, 3, 0, 1),
(142, 3, 47, 3, 1, 0, 1),
(143, 4, 47, 4, 1, 0, 1),
(144, 4, 47, 4, 2, 0, 1),
(145, 5, 47, 7, NULL, 1, 0),
(146, 1, 48, 1, 1, 0, 1),
(147, 1, 48, 1, 2, 0, 1),
(148, 2, 48, 2, 3, 1, 0),
(149, 3, 48, 3, 1, 0, 0),
(150, 4, 48, 4, 2, 0, 0),
(151, 4, 48, 4, 1, 0, 0),
(152, 1, 49, 1, 1, 1, 0),
(153, 2, 49, 2, 3, 0, 0),
(154, 3, 49, 3, 1, 0, 0),
(155, 4, 49, 4, 2, 0, 0),
(156, 4, 49, 4, 1, 0, 0),
(157, 5, 49, 14, 2, 0, 0),
(158, 1, 50, 1, 1, 0, 1),
(159, 1, 50, 1, 2, 0, 1),
(160, 2, 50, 2, 1, 0, 1),
(161, 3, 50, 4, 1, 0, 1),
(162, 1, 51, 3, 1, 1, 0),
(163, 2, 51, 1, 1, 0, 0),
(164, 3, 51, 2, 3, 0, 0),
(165, 4, 51, 4, 2, 0, 0),
(166, 4, 51, 4, 1, 0, 0),
(167, 1, 52, 1, 1, 1, 0),
(168, 2, 52, 2, 3, 0, 0),
(169, 3, 52, 3, 1, 0, 0),
(170, 4, 52, 4, 1, 0, 0),
(171, 4, 52, 4, 2, 0, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `task_way_templates`
--

CREATE TABLE `task_way_templates` (
  `TaskWayId` int(11) NOT NULL,
  `TaskTypeFK` int(11) NOT NULL,
  `Number` int(11) NOT NULL,
  `TaskStepFK` int(11) NOT NULL,
  `EmployeeFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `task_way_templates`
--

INSERT INTO `task_way_templates` (`TaskWayId`, `TaskTypeFK`, `Number`, `TaskStepFK`, `EmployeeFK`) VALUES
(1, 1, 1, 1, 1),
(2, 1, 2, 2, 3),
(3, 1, 3, 3, 1),
(4, 1, 4, 4, 1),
(7, 1, 4, 4, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tools`
--

CREATE TABLE `tools` (
  `ToolId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `ToolTypeFK` int(11) DEFAULT NULL,
  `Icon` text NOT NULL,
  `ToolAvailabilityFK` int(11) NOT NULL,
  `AvailableTools` int(11) NOT NULL,
  `Place` text NOT NULL,
  `Description` text DEFAULT NULL,
  `LastMaintenance` datetime DEFAULT NULL,
  `MaintenancePeriod` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `tools`
--

INSERT INTO `tools` (`ToolId`, `Name`, `ToolTypeFK`, `Icon`, `ToolAvailabilityFK`, `AvailableTools`, `Place`, `Description`, `LastMaintenance`, `MaintenancePeriod`) VALUES
(1, 'Samsung laptop', 1, 'fa fa-plus', 1, 2, 'Gyár, 3-as raktár', 'Semmi extra.', '2019-02-01 00:00:00', 120);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tool_availabilities`
--

CREATE TABLE `tool_availabilities` (
  `ToolAvailabilityId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `tool_availabilities`
--

INSERT INTO `tool_availabilities` (`ToolAvailabilityId`, `Name`) VALUES
(1, 'Elérhető'),
(2, 'Foglalt');

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
(1, 1, 'Ez egy nagyon extra text.', 1, '2019-09-02 01:28:19'),
(2, 1, 'Ez a második.', 1, '2019-09-02 01:28:20');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tool_types`
--

CREATE TABLE `tool_types` (
  `ToolTypeId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `tool_types`
--

INSERT INTO `tool_types` (`ToolTypeId`, `Name`) VALUES
(1, 'Elektronikai eszköz');

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
(2, 'edttsk', 'TaskTypeFK', 'TaskTypeFK', 'tasks'),
(3, 'ntskstpsew', 'Name', 'StepName', 'task_steps');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `virtual_objects`
--

CREATE TABLE `virtual_objects` (
  `VirtualObjectId` int(11) NOT NULL,
  `ObjNameAlias` varchar(30) DEFAULT NULL,
  `Card` varchar(15) NOT NULL,
  `SelectString` text NOT NULL,
  `WhereString` varchar(30) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `virtual_objects`
--

INSERT INTO `virtual_objects` (`VirtualObjectId`, `ObjNameAlias`, `Card`, `SelectString`, `WhereString`) VALUES
(1, 'Termék', 'simple', 'SELECT order_products.Quantity AS \"4\", products.ProductId AS \"1\", products.AliasId AS \"2\", products.Name AS \"3\", products.SalePrice AS \"5\" FROM `order_products` INNER JOIN products ON ProductFK=ProductId', 'OrderFK=<0>'),
(2, 'Szolgáltatás', 'simple', 'SELECT services.ServiceId AS \"1\", services.Name AS \"2\", services.Price AS \"3\" FROM `order_services` INNER JOIN services ON ServiceFK=ServiceId', 'OrderFK=<0>'),
(3, 'Megjegyzések', 'remark', 'SELECT `ToolRemarkId` AS \"1\", CONCAT(employees.LastName, \" \", employees.FirstName) AS \"2\", `RemarkText` AS \"3\", `CreatedDate` AS \"4\" FROM `tool_remarks` inner join employees on EmployeeId=EmployeeFK', 'ToolFK=<0>'),
(4, 'Kapcsolatok', 'contacts', 'SELECT `PartnerContactId` AS \"1\", `Name` AS \"2\", `Email` AS \"3\", `Phone` AS \"4\", `Address` AS \"5\" FROM `partner_contacts`', 'PartnerFK=<0>');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cardc_structures`
--
ALTER TABLE `cardc_structures`
  ADD PRIMARY KEY (`StuctureId`);

--
-- A tábla indexei `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`CustomerId`);

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
-- A tábla indexei `employee_positions`
--
ALTER TABLE `employee_positions`
  ADD PRIMARY KEY (`EmployeePositionId`);

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
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderId`);

--
-- A tábla indexei `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`OrderProductId`);

--
-- A tábla indexei `order_services`
--
ALTER TABLE `order_services`
  ADD PRIMARY KEY (`OrderServiceId`);

--
-- A tábla indexei `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`PartnerId`);

--
-- A tábla indexei `partner_contacts`
--
ALTER TABLE `partner_contacts`
  ADD PRIMARY KEY (`PartnerContactId`),
  ADD KEY `PartnerFK` (`PartnerFK`);

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
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductId`);

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
-- A tábla indexei `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`ServiceId`);

--
-- A tábla indexei `sorts`
--
ALTER TABLE `sorts`
  ADD PRIMARY KEY (`SortId`);

--
-- A tábla indexei `table_structures`
--
ALTER TABLE `table_structures`
  ADD PRIMARY KEY (`TableStructureId`);

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
-- A tábla indexei `tool_availabilities`
--
ALTER TABLE `tool_availabilities`
  ADD PRIMARY KEY (`ToolAvailabilityId`);

--
-- A tábla indexei `tool_remarks`
--
ALTER TABLE `tool_remarks`
  ADD PRIMARY KEY (`ToolRemarkId`);

--
-- A tábla indexei `tool_types`
--
ALTER TABLE `tool_types`
  ADD PRIMARY KEY (`ToolTypeId`);

--
-- A tábla indexei `update_structures`
--
ALTER TABLE `update_structures`
  ADD PRIMARY KEY (`UpdateStructureId`);

--
-- A tábla indexei `virtual_objects`
--
ALTER TABLE `virtual_objects`
  ADD PRIMARY KEY (`VirtualObjectId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `cardc_structures`
--
ALTER TABLE `cardc_structures`
  MODIFY `StuctureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT a táblához `customers`
--
ALTER TABLE `customers`
  MODIFY `CustomerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `dtls_structures`
--
ALTER TABLE `dtls_structures`
  MODIFY `StuctureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT a táblához `employees`
--
ALTER TABLE `employees`
  MODIFY `EmployeeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `employee_positions`
--
ALTER TABLE `employee_positions`
  MODIFY `EmployeePositionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `filters`
--
ALTER TABLE `filters`
  MODIFY `FilterId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `form_structures`
--
ALTER TABLE `form_structures`
  MODIFY `FormStructureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `insert_structures`
--
ALTER TABLE `insert_structures`
  MODIFY `InsertStructureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `OrderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `order_products`
--
ALTER TABLE `order_products`
  MODIFY `OrderProductId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `order_services`
--
ALTER TABLE `order_services`
  MODIFY `OrderServiceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `partners`
--
ALTER TABLE `partners`
  MODIFY `PartnerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `partner_contacts`
--
ALTER TABLE `partner_contacts`
  MODIFY `PartnerContactId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `ProductId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
-- AUTO_INCREMENT a táblához `services`
--
ALTER TABLE `services`
  MODIFY `ServiceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `sorts`
--
ALTER TABLE `sorts`
  MODIFY `SortId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `table_structures`
--
ALTER TABLE `table_structures`
  MODIFY `TableStructureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `tags_for_partner`
--
ALTER TABLE `tags_for_partner`
  MODIFY `TagForPartnerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `tasks`
--
ALTER TABLE `tasks`
  MODIFY `TaskId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT a táblához `task_categories`
--
ALTER TABLE `task_categories`
  MODIFY `TaskCategoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `task_steps`
--
ALTER TABLE `task_steps`
  MODIFY `TaskStepId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `task_types`
--
ALTER TABLE `task_types`
  MODIFY `TaskTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT a táblához `task_ways`
--
ALTER TABLE `task_ways`
  MODIFY `TaskWayId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

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
-- AUTO_INCREMENT a táblához `tool_availabilities`
--
ALTER TABLE `tool_availabilities`
  MODIFY `ToolAvailabilityId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `tool_remarks`
--
ALTER TABLE `tool_remarks`
  MODIFY `ToolRemarkId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `tool_types`
--
ALTER TABLE `tool_types`
  MODIFY `ToolTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `update_structures`
--
ALTER TABLE `update_structures`
  MODIFY `UpdateStructureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `virtual_objects`
--
ALTER TABLE `virtual_objects`
  MODIFY `VirtualObjectId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `partner_contacts`
--
ALTER TABLE `partner_contacts`
  ADD CONSTRAINT `partner_contacts_ibfk_1` FOREIGN KEY (`PartnerFK`) REFERENCES `partners` (`PartnerId`);

--
-- Megkötések a táblához `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`ProjectFK`) REFERENCES `projects` (`ProjectId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
