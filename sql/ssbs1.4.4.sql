-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 20, 2020 at 01:26 PM
-- Server version: 5.7.31-cll-lve
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ssbsyste_ssbs`
--
CREATE DATABASE IF NOT EXISTS `ssbsyste_ssbs` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `ssbsyste_ssbs`;

-- --------------------------------------------------------

--
-- Table structure for table `cardc_structures`
--

CREATE TABLE `cardc_structures` (
  `StuctureId` int(11) NOT NULL,
  `Number` varchar(3) DEFAULT NULL,
  `ColumnName` varchar(50) NOT NULL,
  `IsMainId` tinyint(1) NOT NULL,
  `Tables` varchar(50) DEFAULT NULL,
  `Place` varchar(10) NOT NULL,
  `EmployeeFK` int(11) NOT NULL,
  `IsVO` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cardc_structures`
--

INSERT INTO `cardc_structures` (`StuctureId`, `Number`, `ColumnName`, `IsMainId`, `Tables`, `Place`, `EmployeeFK`, `IsVO`) VALUES
(1, '1', 'TaskId', 1, NULL, 'taskmd', 1, 0),
(2, '2', 'Name', 0, NULL, 'taskmd', 1, 0),
(4, '3', 'TaskType.Name', 0, 'task_types', 'taskmd', 1, 0),
(7, '1', 'LogoSrc', 0, NULL, 'prtnrmd', 1, 0),
(8, '2', 'Name', 0, NULL, 'prtnrmd', 1, 0),
(9, '3', 'Phone', 0, NULL, 'prtnrmd', 1, 0),
(10, '4', 'Address', 0, NULL, 'prtnrmd', 1, 0),
(11, '5', 'PartnerId', 1, NULL, 'prtnrmd', 1, 0),
(13, NULL, 'PartnerType.Name', 0, 'partner_types', 'prtnrmd', 1, 0),
(14, '1', 'PartnerContactId', 1, NULL, 'prtnrdcnt', 1, 0),
(15, '2', 'Name', 0, NULL, 'prtnrdcnt', 1, 0),
(16, '3', 'Email', 0, NULL, 'prtnrdcnt', 1, 0),
(17, '4', 'Phone', 0, NULL, 'prtnrdcnt', 1, 0),
(18, '5', 'Address', 0, NULL, 'prtnrdcnt', 1, 0),
(19, '1', 'Icon', 0, NULL, 'tlsmd', 1, 0),
(20, '2', 'Name', 0, NULL, 'tlsmd', 1, 0),
(21, '3', 'Place', 0, NULL, 'tlsmd', 1, 0),
(22, '4', 'ToolAvailability.Name', 0, 'tool_availabilities', 'tlsmd', 1, 0),
(23, '5', 'ToolId', 0, NULL, 'tlsmd', 1, 0),
(24, NULL, 'CreatedDate', 0, NULL, 'taskmd', 1, 0),
(25, NULL, 'Deadline', 0, NULL, 'taskmd', 1, 0),
(26, NULL, 'Description', 0, NULL, 'taskmd', 1, 0),
(28, '1', 'Number', 0, NULL, 'taskwy', 1, 0),
(29, '2', 'TaskStep.Name', 0, 'task_steps', 'taskwy', 1, 0),
(30, '3', 'Number', 0, NULL, 'taskwy', 1, 0),
(31, '4', 'TaskStepFK', 0, NULL, 'taskwy', 1, 0),
(32, '5', 'Number', 0, NULL, 'taskwy', 1, 0),
(33, '6', 'TaskStepFK', 0, NULL, 'taskwy', 1, 0),
(35, NULL, 'Active', 0, NULL, 'taskwy', 1, 0),
(37, '1', 'TaskStepFK', 0, NULL, 'ntaskwy', 1, 0),
(38, '3', 'TaskStep.Name', 0, 'task_steps', 'ntaskwy', 1, 0),
(39, '2', 'Number', 0, NULL, 'ntaskwy', 1, 0),
(41, NULL, 'TaskFK', 0, NULL, 'taskwy', 1, 0),
(42, NULL, 'Email', 0, NULL, 'prtnrmd', 1, 0),
(43, '1', 'EmployeeId', 1, NULL, 'emplmd', 1, 0),
(44, '2', 'EmployeePosition.Name', 0, 'employee_positions', 'emplmd', 1, 0),
(45, '3', 'TotalCost', 0, NULL, 'emplmd', 1, 0),
(46, '4', 'FirstName', 0, NULL, 'emplmd', 1, 0),
(47, '5', 'LastName', 0, NULL, 'emplmd', 1, 0),
(48, NULL, 'GrossSalary', 0, NULL, 'emplmd', 1, 0),
(49, NULL, 'NetSalary', 0, NULL, 'emplmd', 1, 0),
(50, NULL, 'OtherAllowances', 0, NULL, 'emplmd', 1, 0),
(51, '6', 'Rate', 0, NULL, 'emplmd', 1, 0),
(52, '1', 'OrderId', 1, NULL, 'ordrmd', 1, 0),
(53, '3', 'AliasId', 0, NULL, 'ordrmd', 1, 0),
(54, '2', 'Name', 0, NULL, 'ordrmd', 1, 0),
(55, NULL, 'Customer.FirstName', 0, 'customers', 'ordrmd', 1, 0),
(56, NULL, 'Partner.Name', 0, 'partners', 'ordrmd', 1, 0),
(57, NULL, 'AvailableTools', 0, NULL, 'tlsmd', 1, 0),
(58, NULL, 'Customer.LastName', 0, 'customers', 'ordrmd', 1, 0),
(59, '4', 'OrderDate', 0, NULL, 'ordrmd', 1, 0),
(60, NULL, 'OrderId.OrderProducts', 0, NULL, 'ordrmd', 1, 1),
(61, NULL, 'OrderId.OrderServices', 0, NULL, 'ordrmd', 1, 1),
(62, NULL, 'LastMaintenance', 0, NULL, 'tlsmd', 1, 0),
(63, NULL, 'MaintenancePeriod', 0, NULL, 'tlsmd', 1, 0),
(64, NULL, 'Description', 0, NULL, 'tlsmd', 1, 0),
(65, NULL, 'ToolType.Name', 0, 'tool_types', 'tlsmd', 1, 0),
(66, NULL, 'ToolId.ToolRemarks', 0, NULL, 'tlsmd', 1, 1),
(67, NULL, 'PartnerId.PartnerContacts', 0, NULL, 'prtnrmd', 1, 1),
(68, NULL, 'Timeline', 0, NULL, 'taskmd', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `CustomerId` int(11) NOT NULL,
  `FirstName` varchar(30) NOT NULL,
  `LastName` varchar(30) NOT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `LastOrderDate` datetime DEFAULT NULL,
  `IsRegistered` tinyint(1) NOT NULL DEFAULT '0',
  `UserId` varchar(30) DEFAULT NULL,
  `Password` varchar(64) DEFAULT NULL,
  `RegisterDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`CustomerId`, `FirstName`, `LastName`, `Address`, `Phone`, `LastOrderDate`, `IsRegistered`, `UserId`, `Password`, `RegisterDate`) VALUES
(1, 'Géza', 'Szabó', 'Géza utca 3.', '+36 20 9127 181', NULL, 0, NULL, NULL, NULL),
(2, 'Varga', 'András', 'Kavarga utca 2.', '+36 50 2819 327', NULL, 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `c_cards`
--

CREATE TABLE `c_cards` (
  `CCardId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `c_cards`
--

INSERT INTO `c_cards` (`CCardId`, `Name`) VALUES
(1, 'Simple card'),
(2, 'Tool card'),
(3, 'Employee card');

-- --------------------------------------------------------

--
-- Table structure for table `c_input_types`
--

CREATE TABLE `c_input_types` (
  `Id` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `c_input_types`
--

INSERT INTO `c_input_types` (`Id`) VALUES
('DT'),
('S'),
('SN'),
('SO'),
('SP'),
('W'),
('WF'),
('WP');

-- --------------------------------------------------------

--
-- Table structure for table `c_modules`
--

CREATE TABLE `c_modules` (
  `CModuleId` int(11) NOT NULL,
  `ModuleName` varchar(30) NOT NULL,
  `ModuleDescription` varchar(100) NOT NULL,
  `MainTable` varchar(30) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `c_modules`
--

INSERT INTO `c_modules` (`CModuleId`, `ModuleName`, `ModuleDescription`, `MainTable`) VALUES
(1001, 'Finance charts', 'Diagrams', ''),
(1002, 'Reports', 'Reports', ''),
(1003, 'Projects', 'Projektek átlátása és létrehozása havi nézetben.', ''),
(1004, 'Tasks', 'Feladatok megjelenítése, kezelése, létrehozása.', 'tasks'),
(1005, 'Partners', 'Partnerek megjelenítése, kezelése, létrehozása.', ''),
(1006, 'Operational tasks', 'Operational tasks', ''),
(1007, 'Weekly schedule', 'Weekly schedule', ''),
(1008, 'Order', 'Rendelések létrehozása, megjelenítése, szerkesztése', ''),
(1009, 'Proucts overview', 'Proucts overview', ''),
(1010, 'Product tracking', 'Product tracking', ''),
(1011, 'Employees', 'Employees', 'employees'),
(1012, 'Tools', 'Tools', ''),
(1013, 'Profil', 'Profil', ''),
(1014, 'Log out', 'Log out', '');

-- --------------------------------------------------------

--
-- Table structure for table `c_plugins`
--

CREATE TABLE `c_plugins` (
  `CPluginId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `c_plugins`
--

INSERT INTO `c_plugins` (`CPluginId`, `Name`) VALUES
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
(11, 'Logout');

-- --------------------------------------------------------

--
-- Table structure for table `c_tabs`
--

CREATE TABLE `c_tabs` (
  `CTabId` int(11) NOT NULL,
  `TabName` varchar(30) NOT NULL,
  `TabIcon` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `c_tabs`
--

INSERT INTO `c_tabs` (`CTabId`, `TabName`, `TabIcon`) VALUES
(101, 'Finance', 101),
(102, 'Processes', 102),
(103, 'Products', 103),
(104, 'Resources', 104),
(105, 'Application', 105);

-- --------------------------------------------------------

--
-- Table structure for table `device_verification`
--

CREATE TABLE `device_verification` (
  `Id` int(11) NOT NULL,
  `DeviceId` varchar(256) DEFAULT NULL,
  `EmployeeFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `device_verification`
--

INSERT INTO `device_verification` (`Id`, `DeviceId`, `EmployeeFK`) VALUES
(71, '1ccc946bff87bc121284ee085095a954d85700e2d6c90343bb4c0f161838235a', 10),
(77, '$2y$10$4wLq5Oy0maAKvcNyAEHQcO7oBOgZKKrQpQ049ZNJTAuihCoFoEWrO', 1);

-- --------------------------------------------------------

--
-- Table structure for table `dtls_structures`
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
-- Dumping data for table `dtls_structures`
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
(42, 'o1', NULL, 'PartnerContacts', NULL, 'prtnrdtls', 1),
(43, 'oTl', NULL, 'Timeline', NULL, 'taskdtls', 1);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
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
  `Rate` float DEFAULT NULL,
  `UserPassword` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `ActivationCode` varchar(256) NOT NULL,
  `VerificationStatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`EmployeeId`, `FirstName`, `LastName`, `EmployeePositionFK`, `GrossSalary`, `NetSalary`, `OtherTaxes`, `OtherAllowances`, `TotalCost`, `Rate`, `UserPassword`, `Email`, `ActivationCode`, `VerificationStatus`) VALUES
(1, 'Ádám', 'Werner', 1, 100000, 80000, 30000, 0, 130000, 4.9, '$2y$10$SfhYIDtn.iOuCW7zfoFLuuZHX6lja4lF4XA4JqNmpiH/.P3zB8JCa', 'test@test.com', '', 0),
(2, 'Dávid', 'Sági', 1, 200000, 160000, 60000, 0, 260000, 4.8, 'jelszo2', 'B2B2B2', '', 0),
(3, 'Áron', 'Kósa', 2, 300000, 240000, 90000, 0, 390000, NULL, 'jelszo3', 'C3C3C3', '', 0),
(10, 'Bela', 'Nagy', 2, 0, 0, 0, 0, 0, NULL, '$2y$10$UzFgCL2lsOfmgulukxs4QOJNXFt68EnHs6/9/wYUAUMPgK.jNgD8O', 'remaron98@gmail.com', '', 1),
(22, 'Bela', 'Nagy', 2, 0, 0, 0, 0, 0, NULL, '$2y$10$boHhEhYUqXeF38nxHUoXI.9/7UA35AnxAfX9DWqDy/Jzr7A5H6Cn.', 'kosa.aron98@gmail.com', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `employee_positions`
--

CREATE TABLE `employee_positions` (
  `EmployeePositionId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employee_positions`
--

INSERT INTO `employee_positions` (`EmployeePositionId`, `Name`) VALUES
(1, 'Fejlesztő'),
(2, 'Menedzser');

-- --------------------------------------------------------

--
-- Table structure for table `filters`
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
-- Dumping data for table `filters`
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
-- Table structure for table `form_structures`
--

CREATE TABLE `form_structures` (
  `FormStructureId` int(11) NOT NULL,
  `Place` varchar(10) NOT NULL,
  `Number` int(2) NOT NULL,
  `ChildFK` int(2) DEFAULT NULL,
  `Name` varchar(30) DEFAULT NULL,
  `Type` varchar(2) NOT NULL,
  `DefaultValue` varchar(30) DEFAULT NULL,
  `ColumnName` varchar(50) NOT NULL,
  `TableName` varchar(30) NOT NULL,
  `TruncatedIdName` varchar(30) NOT NULL,
  `UploadName` varchar(30) DEFAULT NULL,
  `EmployeeFK` int(11) NOT NULL,
  `Required` tinyint(1) NOT NULL,
  `Functions` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `form_structures`
--

INSERT INTO `form_structures` (`FormStructureId`, `Place`, `Number`, `ChildFK`, `Name`, `Type`, `DefaultValue`, `ColumnName`, `TableName`, `TruncatedIdName`, `UploadName`, `EmployeeFK`, `Required`, `Functions`) VALUES
(1, 'newtsk', 1, NULL, 'Feladat neve', 'W', NULL, 'TaskId,Name', 'tasks', 'Task', 'tasks.Name', 1, 1, NULL),
(2, 'newtsk', 2, NULL, 'Feladat típusa', 'SN', NULL, 'TaskTypeId,Name', 'task_types', 'TaskType', 'task_types.Name', 1, 1, 'TaskTypeChange'),
(3, 'newtsk', 3, NULL, 'Feladat határideje', 'DT', NULL, 'TaskId,Deadline', 'tasks', 'Task', 'tasks.Deadline', 1, 0, NULL),
(4, 'newtsk', 4, NULL, 'Projekthez rendelés', 'S', NULL, 'ProjectId,Name', 'projects', 'Project', 'projects.Name', 1, 0, NULL),
(6, 'nprtnr', 1, NULL, 'Partner neve', 'W', NULL, 'PartnerId,Name', 'partners', 'Partner', 'partners.Name', 1, 1, NULL),
(7, 'nprtnr', 2, NULL, 'Partner típusa', 'SN', NULL, 'PartnerTypeId,Name', 'partner_types', 'PartnerType', 'partner_types.Name', 1, 1, NULL),
(8, 'ntskstpss', 1, NULL, NULL, 'S', NULL, 'TaskStepId,Name', 'task_steps', 'TaskStep', NULL, 1, 1, NULL),
(9, 'ntskstpses', 1, NULL, NULL, 'S', NULL, 'EmployeeId,FirstName', 'employees', 'Employee', NULL, 1, 1, NULL),
(10, 'nprc', 1, NULL, 'Projekt neve', 'W', NULL, 'ProjectId,Name', 'projects', 'Project', 'projects.Name', 1, 1, NULL),
(11, 'nprc', 3, NULL, 'Projekt kezdete', 'DT', NULL, 'ProjectId,StartDate', 'projects', 'Project', 'projects.StartDate', 1, 1, NULL),
(12, 'nprc', 2, NULL, 'Szülő projekt', 'S', NULL, 'ProjectId,Name', 'projects', 'Project', 'projects.ParentFK', 1, 0, NULL),
(13, 'nprc', 4, NULL, 'Határidő', 'DT', NULL, 'ProjectId,Deadline', 'projects', 'Project', 'projects.Deadline', 1, 1, NULL),
(14, 'nprc', 5, NULL, 'Projekt vége', 'DT', NULL, 'ProjectId,FinishDate', 'projects', 'Project', 'projects.FinishDate', 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `f_columns`
--

CREATE TABLE `f_columns` (
  `FColumnId` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `TableName` varchar(30) NOT NULL,
  `TableIdName` varchar(30) NOT NULL,
  `ColumnName` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `f_columns`
--

INSERT INTO `f_columns` (`FColumnId`, `Name`, `TableName`, `TableIdName`, `ColumnName`) VALUES
(1, 'Projekthez rendelés', 'projects', 'ProjectId', 'Name'),
(2, 'Feladat határideje', 'tasks', 'TaskId', 'Deadline'),
(3, 'Feladat típusa', 'task_types', 'TaskTypeId', 'Name'),
(4, 'Feladat lépési', 'task_steps', 'TaskStepId', 'Name'),
(5, 'Feladat neve', 'tasks', 'TaskId', 'Name'),
(6, 'Lépés létrehozás', 'task_steps', 'TaskStepId', 'Name'),
(7, 'Lépés választása', 'task_steps', 'TaskStepId', 'Name'),
(8, 'Alkalmazott keresztneve', 'employees', 'EmployeeId', 'FirstName'),
(11, 'Rendelés neve', 'orders', 'OrderId', 'Name'),
(12, 'Rendelés azonosítója', 'orders', 'OrderId', 'AliasId'),
(13, 'Feladat lépés száma', 'task_ways', 'TaskWayId', 'Number'),
(14, 'Lépéshez tartozó feladat', 'task_ways', 'TaskWayId', 'TaskFK'),
(15, 'Feladat lépés', 'task_ways', 'TaskWayId', 'TaskStepFK'),
(16, 'Feladat lépéséhez tartozó munkavállaló', 'task_ways', 'TaskWayId', 'EmployeeFK'),
(17, 'Feladat lépés aktív-e', 'task_ways', 'TaskWayId', 'Active'),
(18, 'Feladat lépés kész-e', 'task_ways', 'TaskWayId', 'Ready'),
(19, 'Alkalmazott vezetékneve', 'employees', 'EmployeeId', 'LastName'),
(20, 'Alkalmazott pozíciója', 'employees', 'EmployeeId', 'EmployeePositionFK'),
(21, 'Bruttó fizetés', 'employees', 'EmployeeId', 'GrossSalary'),
(22, 'Email', 'employees', 'EmployeeId', 'Email'),
(23, 'Alkalmazott pozíciója szöveg', 'employee_positions', 'EmployeePositionId', 'Name');

-- --------------------------------------------------------

--
-- Table structure for table `f_display`
--

CREATE TABLE `f_display` (
  `FDisplayId` int(11) NOT NULL,
  `FPluginDisplayFK` int(11) NOT NULL,
  `FColumnFK` int(11) NOT NULL,
  `Number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `f_display`
--

INSERT INTO `f_display` (`FDisplayId`, `FPluginDisplayFK`, `FColumnFK`, `Number`) VALUES
(1, 1, 5, 2),
(2, 1, 3, 3),
(3, 2, 5, 2),
(4, 3, 3, 2),
(5, 3, 2, 3),
(6, 4, 11, 2),
(7, 4, 12, 3),
(8, 5, 13, 2),
(10, 5, 4, 3),
(11, 5, 8, 4),
(12, 5, 17, 5),
(13, 5, 18, 6),
(14, 6, 13, 2),
(15, 6, 4, 3),
(16, 6, 8, 4),
(17, 6, 17, 5),
(18, 6, 18, 6),
(19, 7, 8, 2),
(20, 9, 19, 2),
(21, 9, 23, 3),
(22, 9, 21, 4),
(23, 9, 22, 5),
(24, 8, 8, 2),
(25, 8, 23, 3);

-- --------------------------------------------------------

--
-- Table structure for table `f_form_inputs`
--

CREATE TABLE `f_form_inputs` (
  `FFormInputId` int(11) NOT NULL,
  `FPluginFormInputFK` int(11) DEFAULT NULL,
  `Place` varchar(10) NOT NULL,
  `Number` int(2) NOT NULL,
  `FColumnFK` int(11) DEFAULT NULL,
  `ParentFK` int(2) DEFAULT NULL,
  `Type` varchar(2) NOT NULL,
  `DefaultValue` varchar(30) DEFAULT NULL,
  `UploadName` varchar(40) NOT NULL,
  `Required` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `f_form_inputs`
--

INSERT INTO `f_form_inputs` (`FFormInputId`, `FPluginFormInputFK`, `Place`, `Number`, `FColumnFK`, `ParentFK`, `Type`, `DefaultValue`, `UploadName`, `Required`) VALUES
(1, 1, 'newtsk', 2, 5, NULL, 'W', NULL, 'tasks.Name', 1),
(2, 1, 'newtsk', 3, 3, NULL, 'SN', NULL, 'tasks.TaskTypeFK', 1),
(3, 1, 'newtsk', 4, 2, NULL, 'DT', NULL, 'tasks.Deadline', 0),
(4, 1, 'newtsk', 5, 1, NULL, 'S', NULL, 'tasks.ProjectFK', 0),
(15, 2, 'stepbx', 2, 6, NULL, 'WP', NULL, 'task_ways.TaskStepFK', 1),
(16, 2, 'stepbx', 3, 7, NULL, 'SP', NULL, 'task_ways.TaskStepFK', 1),
(17, 2, 'stepbx', 4, 8, NULL, 'S', NULL, 'task_ways.EmployeeFK', 1),
(18, 3, 'tskfltr', 2, 5, NULL, 'WF', NULL, 'tasks.Name', 0),
(19, 3, 'tskfltr', 3, 3, NULL, 'S', NULL, 'tasks.TaskTypeFK', 0),
(20, 4, 'tskfltr', 4, 5, NULL, 'SO', NULL, 'tasks.Name', 0),
(21, 5, 'stepbx', 2, 6, NULL, 'WP', NULL, 'task_ways.TaskStepFK', 1),
(22, 5, 'stepbx', 3, 7, NULL, 'SP', NULL, 'task_ways.TaskStepFK', 1),
(23, 5, 'stepbx', 4, 8, NULL, 'S', NULL, 'task_ways.EmployeeFK', 1),
(24, 6, 'emp', 2, 8, NULL, 'W', NULL, 'employees.FirstName', 1),
(25, 6, 'emp', 3, 19, NULL, 'W', NULL, 'employees.LastName', 1),
(26, 6, 'emp', 4, 20, NULL, 'SN', NULL, 'employees.EmployeesPositionFK', 1),
(27, 6, 'emp', 5, 21, NULL, 'W', NULL, 'employees.GrossSalary', 0),
(28, 6, 'emp', 6, 22, NULL, 'W', NULL, 'employees.Email', 1),
(29, 7, 'empflt', 2, 19, NULL, 'WF', NULL, 'employees.LastName', 0),
(30, 8, 'emp', 2, 21, NULL, 'SO', '1', 'employees.GrossSalary', 0);

-- --------------------------------------------------------

--
-- Table structure for table `f_module_plugins`
--

CREATE TABLE `f_module_plugins` (
  `FModulePluginId` int(11) NOT NULL,
  `FUserModuleFK` int(11) NOT NULL,
  `CPluginFK` int(11) NOT NULL,
  `TableName` varchar(30) DEFAULT NULL,
  `Place` int(3) NOT NULL DEFAULT '1',
  `Number` int(3) NOT NULL DEFAULT '1',
  `DefaultScreen` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `f_module_plugins`
--

INSERT INTO `f_module_plugins` (`FModulePluginId`, `FUserModuleFK`, `CPluginFK`, `TableName`, `Place`, `Number`, `DefaultScreen`) VALUES
(1, 4, 2, 'tasks', 100, 4, 1),
(2, 4, 3, 'tasks', 2, 1, 1),
(3, 4, 4, 'tasks', 4, 2, 1),
(4, 4, 5, 'tasks', 5, 3, 1),
(5, 14, 11, NULL, 1, 1, 1),
(6, 11, 2, 'employees', 100, 4, 1),
(7, 11, 3, 'employees', 2, 1, 1),
(8, 11, 4, 'employees', 4, 2, 1),
(9, 11, 5, 'employees', 5, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `f_plugin_cards`
--

CREATE TABLE `f_plugin_cards` (
  `FPluginCardId` int(11) NOT NULL,
  `FModulePluginFK` int(11) DEFAULT NULL,
  `FPluginPluginFK` int(11) DEFAULT NULL,
  `CCardFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `f_plugin_cards`
--

INSERT INTO `f_plugin_cards` (`FPluginCardId`, `FModulePluginFK`, `FPluginPluginFK`, `CCardFK`) VALUES
(1, 3, NULL, 1),
(2, 8, NULL, 3);

-- --------------------------------------------------------

--
-- Table structure for table `f_plugin_display`
--

CREATE TABLE `f_plugin_display` (
  `FPluginDisplayId` int(11) NOT NULL,
  `Title` varchar(40) DEFAULT NULL,
  `FModulePluginFK` int(11) DEFAULT NULL,
  `FPluginPluginFK` int(11) DEFAULT NULL,
  `Number` int(3) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `f_plugin_display`
--

INSERT INTO `f_plugin_display` (`FPluginDisplayId`, `Title`, `FModulePluginFK`, `FPluginPluginFK`, `Number`) VALUES
(1, 'Feladatok box', 3, NULL, 1),
(2, 'Feladatok részletei', 4, NULL, 1),
(3, 'Feladat adatai', 4, NULL, 2),
(4, 'Rendelések', NULL, 2, 1),
(5, 'Lépések', NULL, 3, 1),
(6, 'Lépések', NULL, 4, 1),
(7, 'Alkalmazottak részletei', 9, NULL, 1),
(8, 'Alkalmazottak box', 8, NULL, 1),
(9, 'Alkalmazottak adatok', 9, NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `f_plugin_form_inputs`
--

CREATE TABLE `f_plugin_form_inputs` (
  `FPluginFormInputId` int(11) NOT NULL,
  `Title` varchar(40) NOT NULL,
  `FModulePluginFK` int(11) DEFAULT NULL,
  `FPluginPluginFK` int(11) DEFAULT NULL,
  `Number` int(3) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `f_plugin_form_inputs`
--

INSERT INTO `f_plugin_form_inputs` (`FPluginFormInputId`, `Title`, `FModulePluginFK`, `FPluginPluginFK`, `Number`) VALUES
(1, 'Feladat hozzáadása', 1, NULL, 1),
(2, 'Input step box', NULL, 1, 1),
(3, 'Task filter', 2, NULL, 1),
(4, 'Task order', 2, NULL, 2),
(5, 'Input step box', NULL, 5, 1),
(6, 'Alkalmazott felvétele', 6, NULL, 1),
(7, 'Employee filter', 7, NULL, 1),
(8, 'Employee Order', 7, NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `f_plugin_plugins`
--

CREATE TABLE `f_plugin_plugins` (
  `FPluginPluginId` int(11) NOT NULL,
  `FModulePluginFK` int(11) DEFAULT NULL,
  `FPluginPluginFK` int(11) DEFAULT NULL,
  `CPluginFK` int(11) NOT NULL,
  `TableName` varchar(30) NOT NULL,
  `Place` int(3) NOT NULL DEFAULT '1',
  `Number` int(3) NOT NULL DEFAULT '1',
  `DefaultScreen` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `f_plugin_plugins`
--

INSERT INTO `f_plugin_plugins` (`FPluginPluginId`, `FModulePluginFK`, `FPluginPluginFK`, `CPluginFK`, `TableName`, `Place`, `Number`, `DefaultScreen`) VALUES
(1, 1, NULL, 1, 'task_ways', 1, 1, 1),
(2, 4, NULL, 6, 'orders', 1, 1, 1),
(3, 4, NULL, 8, 'task_ways', 1, 2, 1),
(4, 4, NULL, 8, 'task_ways', 1, 3, 1),
(5, 1, NULL, 9, 'task_ways', 1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `f_plugin_vo`
--

CREATE TABLE `f_plugin_vo` (
  `FPluginVoId` int(11) NOT NULL,
  `FModulePluginFK` int(11) DEFAULT NULL,
  `FPluginPluginFK` int(11) DEFAULT NULL,
  `VirtualObjectFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `f_plugin_vo`
--

INSERT INTO `f_plugin_vo` (`FPluginVoId`, `FModulePluginFK`, `FPluginPluginFK`, `VirtualObjectFK`) VALUES
(1, NULL, 1, 8);

-- --------------------------------------------------------

--
-- Table structure for table `f_user_modules`
--

CREATE TABLE `f_user_modules` (
  `FUserModuleId` int(11) NOT NULL,
  `EmployeeFK` int(11) NOT NULL,
  `CTabFK` int(11) NOT NULL,
  `CModuleFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `f_user_modules`
--

INSERT INTO `f_user_modules` (`FUserModuleId`, `EmployeeFK`, `CTabFK`, `CModuleFK`) VALUES
(1, 1, 101, 1001),
(2, 1, 101, 1002),
(3, 1, 102, 1003),
(4, 1, 102, 1004),
(5, 1, 102, 1005),
(6, 1, 102, 1006),
(7, 1, 102, 1007),
(8, 1, 102, 1008),
(9, 1, 103, 1009),
(10, 1, 103, 1010),
(11, 1, 104, 1011),
(12, 1, 104, 1012),
(13, 1, 105, 1013),
(14, 1, 105, 1014);

-- --------------------------------------------------------

--
-- Table structure for table `insert_structures`
--

CREATE TABLE `insert_structures` (
  `InsertStructureId` int(11) NOT NULL,
  `Place` varchar(10) NOT NULL,
  `ColumnName` varchar(50) NOT NULL,
  `InsertName` varchar(30) NOT NULL,
  `InsertTable` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `insert_structures`
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
-- Table structure for table `l_input_types`
--

CREATE TABLE `l_input_types` (
  `Id` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `l_input_types`
--

INSERT INTO `l_input_types` (`Id`) VALUES
('DT'),
('S'),
('SN'),
('W');

-- --------------------------------------------------------

--
-- Table structure for table `monthly_tasks`
--

CREATE TABLE `monthly_tasks` (
  `MonthlyTaskId` int(11) NOT NULL,
  `StartYear` int(4) NOT NULL,
  `StartMonth` int(2) NOT NULL,
  `StartDay` int(2) NOT NULL,
  `EndYear` int(4) NOT NULL,
  `EndMonth` int(2) NOT NULL,
  `EndDay` int(2) NOT NULL,
  `Length` int(4) NOT NULL,
  `Title` varchar(30) NOT NULL,
  `Description` text,
  `State` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `monthly_tasks`
--

INSERT INTO `monthly_tasks` (`MonthlyTaskId`, `StartYear`, `StartMonth`, `StartDay`, `EndYear`, `EndMonth`, `EndDay`, `Length`, `Title`, `Description`, `State`) VALUES
(1, 2020, 3, 18, 2020, 3, 25, 8, '0318-0325', 'Valami kis leírás', 1),
(2, 2020, 3, 21, 2020, 4, 2, 13, '0321-0402', 'Még egy kis leírás', 0),
(3, 2020, 3, 12, 2020, 4, 12, 32, '0312-0412', 'Ez is egy leírás', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `OrderId` int(11) NOT NULL,
  `AliasId` varchar(50) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `CustomerFK` int(11) DEFAULT NULL,
  `PartnerFK` int(11) DEFAULT NULL,
  `OrderDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `TaskFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`OrderId`, `AliasId`, `Name`, `CustomerFK`, `PartnerFK`, `OrderDate`, `TaskFK`) VALUES
(1, 'o1234', 'Okoskonyha', 1, NULL, '2019-11-02 00:00:00', 1),
(2, 'o1001', 'Vízvezeték szerelés', NULL, 1, '2019-11-02 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

CREATE TABLE `order_products` (
  `OrderProductId` int(11) NOT NULL,
  `OrderFK` int(11) NOT NULL,
  `ProductFK` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order_products`
--

INSERT INTO `order_products` (`OrderProductId`, `OrderFK`, `ProductFK`, `Quantity`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 1),
(3, 1, 3, 1),
(4, 2, 5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `order_services`
--

CREATE TABLE `order_services` (
  `OrderServiceId` int(11) NOT NULL,
  `OrderFK` int(11) NOT NULL,
  `ServiceFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order_services`
--

INSERT INTO `order_services` (`OrderServiceId`, `OrderFK`, `ServiceFK`) VALUES
(1, 2, 1),
(2, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `partners`
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
-- Dumping data for table `partners`
--

INSERT INTO `partners` (`PartnerId`, `Name`, `PartnerTypeFK`, `Phone`, `Email`, `Address`, `LogoSrc`) VALUES
(1, 'Teszt partner 1', 1, '+36908761239', 'elso.vallalat@gmail.com', 'Valahol, Elő utca 1.', 'https://www.allenrec.com/wp-content/uploads/2017/04/new-microsoft-logo-SIZED-SQUARE.jpg'),
(2, 'Audi', 1, '', 'audi@gmial.com', 'Valahol, Elő utca 2.', ''),
(3, 'Teszt', 0, '', '', '', ''),
(4, 'Teszt2', 0, '', '', '', ''),
(5, 'Teszt3', 0, '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `partner_contacts`
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
-- Dumping data for table `partner_contacts`
--

INSERT INTO `partner_contacts` (`PartnerContactId`, `Name`, `Email`, `Phone`, `Address`, `PartnerFK`) VALUES
(1, 'Kósa Áron', 'kosa.aron@gmail.com', '+36702395837', 'Valahol, Elő utca 1.', 1),
(2, 'Sági Dávid', 'sagi.david@gmail.com', '+36209485736', 'Valahol2, Elő utca 1.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `partner_tags`
--

CREATE TABLE `partner_tags` (
  `PartnerTagId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `partner_tags`
--

INSERT INTO `partner_tags` (`PartnerTagId`, `Name`) VALUES
(1, 'Fontos'),
(2, 'Alkatrészek');

-- --------------------------------------------------------

--
-- Table structure for table `partner_types`
--

CREATE TABLE `partner_types` (
  `PartnerTypeId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `partner_types`
--

INSERT INTO `partner_types` (`PartnerTypeId`, `Name`) VALUES
(1, 'Beszállító'),
(2, 'Kereskedés'),
(3, '1'),
(4, '2'),
(5, '1');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ProductId` int(11) NOT NULL,
  `AliasId` varchar(50) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `InStockQuantity` int(11) NOT NULL DEFAULT '0',
  `PurchasePrice` int(11) NOT NULL DEFAULT '0',
  `SalePrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductId`, `AliasId`, `Name`, `InStockQuantity`, `PurchasePrice`, `SalePrice`) VALUES
(1, 'p1001', 'Sütő', 5, 200000, 250000),
(2, 'p1002', 'Légelszívó', 3, 100000, 125000),
(3, 'p1003', 'Hűtő', 0, 130000, 150000),
(5, 'p1004', '1m vízvezeték', 10, 15000, 20000);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `ProjectId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `StartDate` datetime DEFAULT NULL,
  `FinishDate` datetime DEFAULT NULL,
  `Deadline` datetime DEFAULT NULL,
  `ParentFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`ProjectId`, `Name`, `StartDate`, `FinishDate`, `Deadline`, `ParentFK`) VALUES
(1, 'SSBS elkészítése1', '2020-03-12 00:00:00', '2020-04-06 00:00:00', '2020-04-06 00:00:00', NULL),
(2, 'SSBS elkészítése2', '2020-03-12 00:00:00', '2020-04-01 00:00:00', '2020-04-01 00:00:00', 1),
(3, 'SSBS elkészítése3', '2020-03-25 00:00:00', '2020-04-01 00:00:00', '2020-04-01 00:00:00', 2),
(4, 'SSBS elkészítése4', '2020-04-02 00:00:00', '2020-04-06 00:00:00', '2020-04-06 00:00:00', 1),
(5, 'SSBS elkészítése5', '2020-03-10 00:00:00', '2020-04-06 00:00:00', '2020-04-06 00:00:00', NULL),
(7, 'SSBS elkészítése6', '2020-03-26 00:00:00', '2020-03-30 00:00:00', '2020-03-30 00:00:00', 5);

-- --------------------------------------------------------

--
-- Table structure for table `saved_task_ways`
--

CREATE TABLE `saved_task_ways` (
  `SavedTaskWayId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `saved_task_ways`
--

INSERT INTO `saved_task_ways` (`SavedTaskWayId`, `Name`) VALUES
(1, 'Integrálás I.'),
(2, 'Integrálás II.');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `ServiceId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`ServiceId`, `Name`, `Price`) VALUES
(1, 'Csőjavítás', 50000),
(2, 'Vízvezeték hibafeltárás', 30000);

-- --------------------------------------------------------

--
-- Table structure for table `sorts`
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
-- Dumping data for table `sorts`
--

INSERT INTO `sorts` (`SortId`, `Place`, `Number`, `Name`, `DefaultValue`, `Required`, `ColumnName`, `TableName`, `EmployeeFK`) VALUES
(1, 'tskfltr', 1, 'Feladat típus', 2, 0, 'TaskType.Name', 'task_types', 1),
(2, 'tskfltr', 2, 'Feladat név', 2, 0, 'Name', 'tasks', 1),
(3, 'prtnrfltr', 1, 'Partner név', 2, 0, 'Name', '', 1),
(4, 'prtnrfltr', 2, 'Cimke', 2, 0, 'TagForPartner.PartnerTag.Name', '', 1),
(5, 'tlsfltr', 2, 'Elérhetőség', 2, 0, 'ToolAvailability.Name', 'tool_availabilities', 1),
(6, 'tlsfltr', 1, 'Eszköz neve', 2, 0, 'Name', 'tools', 1),
(7, 'emlpfltr', 1, 'Keresztnév', 2, 0, 'FirstName', 'employees', 1),
(8, 'emlpfltr', 2, 'Pozíció', 2, 0, 'EmployeePosition.Name', 'employee_positions', 1),
(9, 'ordrfltr', 1, 'Rendelés neve', 2, 0, 'Name', '', 1),
(10, 'ordrfltr', 2, 'Rendelés azonosító', 2, 0, 'AliasId', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `table_structures`
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
-- Dumping data for table `table_structures`
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
-- Table structure for table `tags_for_partner`
--

CREATE TABLE `tags_for_partner` (
  `TagForPartnerId` int(11) NOT NULL,
  `PartnerFK` int(11) NOT NULL,
  `PartnerTagFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tags_for_partner`
--

INSERT INTO `tags_for_partner` (`TagForPartnerId`, `PartnerFK`, `PartnerTagFK`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `TaskId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `TaskTypeFK` int(11) NOT NULL,
  `TaskCategoryFK` int(11) DEFAULT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deadline` datetime DEFAULT NULL,
  `FinishDate` datetime DEFAULT NULL,
  `Description` text,
  `OrderFK` int(11) DEFAULT NULL,
  `ProjectFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`TaskId`, `Name`, `TaskTypeFK`, `TaskCategoryFK`, `CreatedDate`, `Deadline`, `FinishDate`, `Description`, `OrderFK`, `ProjectFK`) VALUES
(1, 'Feladatkezelés megtervezése2', 1, 1, '2019-08-29 01:36:25', '2020-04-03 00:00:00', NULL, 'Ez al első', NULL, 1),
(2, 'PHP megtervezése 3', 1, NULL, '2019-08-29 01:40:22', '2020-07-30 00:00:00', NULL, NULL, NULL, NULL),
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
-- Table structure for table `task_categories`
--

CREATE TABLE `task_categories` (
  `TaskCategoryId` int(11) NOT NULL,
  `Level` int(2) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `ParentFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `task_categories`
--

INSERT INTO `task_categories` (`TaskCategoryId`, `Level`, `Name`, `ParentFK`) VALUES
(1, 1, 'PHP', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `task_images`
--

CREATE TABLE `task_images` (
  `TaskImageId` int(11) NOT NULL,
  `TaskFK` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Source` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `task_steps`
--

CREATE TABLE `task_steps` (
  `TaskStepId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `task_steps`
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
(14, 'Teszt4'),
(15, 'Valami'),
(16, 'Felmérés');

-- --------------------------------------------------------

--
-- Table structure for table `task_types`
--

CREATE TABLE `task_types` (
  `TaskTypeId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `task_types`
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
-- Table structure for table `task_ways`
--

CREATE TABLE `task_ways` (
  `TaskWayId` int(11) NOT NULL,
  `Number` int(11) NOT NULL,
  `TaskFK` int(11) NOT NULL,
  `TaskStepFK` int(11) NOT NULL,
  `EmployeeFK` int(11) DEFAULT NULL,
  `Active` tinyint(1) NOT NULL DEFAULT '0',
  `Ready` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `task_ways`
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
(23, 2, 21, 2, 3, 0, 1),
(24, 3, 21, 3, 1, 1, 0),
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
(38, 2, 26, 1, 1, 0, 1),
(39, 3, 26, 2, 3, 1, 0),
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
(129, 1, 44, 1, 1, 0, 1),
(130, 2, 44, 2, 3, 1, 0),
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
(171, 4, 52, 4, 2, 0, 0),
(172, 1, 52, 1, 1, 1, 0),
(173, 2, 52, 2, 3, 0, 0),
(174, 3, 52, 3, 1, 0, 0),
(175, 4, 52, 16, 2, 0, 0),
(176, 5, 52, 4, 2, 0, 0),
(177, 5, 52, 4, 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `task_way_templates`
--

CREATE TABLE `task_way_templates` (
  `TaskWayId` int(11) NOT NULL,
  `TaskTypeFK` int(11) NOT NULL,
  `Number` int(11) NOT NULL,
  `TaskStepFK` int(11) NOT NULL,
  `EmployeeFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `task_way_templates`
--

INSERT INTO `task_way_templates` (`TaskWayId`, `TaskTypeFK`, `Number`, `TaskStepFK`, `EmployeeFK`) VALUES
(1, 1, 1, 1, 1),
(2, 1, 2, 2, 3),
(3, 1, 3, 3, 1),
(4, 1, 4, 4, 1),
(7, 1, 4, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tools`
--

CREATE TABLE `tools` (
  `ToolId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `ToolTypeFK` int(11) DEFAULT NULL,
  `Icon` text NOT NULL,
  `ToolAvailabilityFK` int(11) NOT NULL,
  `AvailableTools` int(11) NOT NULL,
  `Place` text NOT NULL,
  `Description` text,
  `LastMaintenance` datetime DEFAULT NULL,
  `MaintenancePeriod` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tools`
--

INSERT INTO `tools` (`ToolId`, `Name`, `ToolTypeFK`, `Icon`, `ToolAvailabilityFK`, `AvailableTools`, `Place`, `Description`, `LastMaintenance`, `MaintenancePeriod`) VALUES
(1, 'Samsung laptop', 1, 'fa fa-plus', 1, 2, 'Gyár, 3-as raktár', 'Semmi extra.', '2019-02-01 00:00:00', 120);

-- --------------------------------------------------------

--
-- Table structure for table `tool_availabilities`
--

CREATE TABLE `tool_availabilities` (
  `ToolAvailabilityId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tool_availabilities`
--

INSERT INTO `tool_availabilities` (`ToolAvailabilityId`, `Name`) VALUES
(1, 'Elérhető'),
(2, 'Foglalt');

-- --------------------------------------------------------

--
-- Table structure for table `tool_remarks`
--

CREATE TABLE `tool_remarks` (
  `ToolRemarkId` int(11) NOT NULL,
  `EmployeeFK` int(11) NOT NULL,
  `RemarkText` text NOT NULL,
  `ToolFK` int(11) NOT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tool_remarks`
--

INSERT INTO `tool_remarks` (`ToolRemarkId`, `EmployeeFK`, `RemarkText`, `ToolFK`, `CreatedDate`) VALUES
(1, 1, 'Ez egy nagyon extra text.', 1, '2019-09-02 01:28:19'),
(2, 1, 'Ez a második.', 1, '2019-09-02 01:28:20');

-- --------------------------------------------------------

--
-- Table structure for table `tool_types`
--

CREATE TABLE `tool_types` (
  `ToolTypeId` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tool_types`
--

INSERT INTO `tool_types` (`ToolTypeId`, `Name`) VALUES
(1, 'Elektronikai eszköz');

-- --------------------------------------------------------

--
-- Table structure for table `update_structures`
--

CREATE TABLE `update_structures` (
  `UpdateStructureId` int(11) NOT NULL,
  `Place` varchar(10) NOT NULL,
  `ColumnName` varchar(50) NOT NULL,
  `UpdateName` varchar(30) NOT NULL,
  `UpdateTable` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `update_structures`
--

INSERT INTO `update_structures` (`UpdateStructureId`, `Place`, `ColumnName`, `UpdateName`, `UpdateTable`) VALUES
(1, 'edttsk', 'Name', 'Name', 'tasks'),
(2, 'edttsk', 'TaskTypeFK', 'TaskTypeFK', 'tasks'),
(3, 'ntskstpsew', 'Name', 'StepName', 'task_steps');

-- --------------------------------------------------------

--
-- Table structure for table `virtual_objects`
--

CREATE TABLE `virtual_objects` (
  `VirtualObjectId` int(11) NOT NULL,
  `ObjNameAlias` varchar(30) DEFAULT NULL,
  `Card` varchar(15) DEFAULT NULL,
  `QueryString` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `virtual_objects`
--

INSERT INTO `virtual_objects` (`VirtualObjectId`, `ObjNameAlias`, `Card`, `QueryString`) VALUES
(1, 'Termék', 'simple', 'SELECT order_products.Quantity AS \"4\", products.ProductId AS \"1\", products.AliasId AS \"2\", products.Name AS \"3\", products.SalePrice AS \"5\" FROM `order_products` INNER JOIN products ON ProductFK=ProductId'),
(2, 'Szolgáltatás', 'simple', 'SELECT services.ServiceId AS \"1\", services.Name AS \"2\", services.Price AS \"3\" FROM `order_services` INNER JOIN services ON ServiceFK=ServiceId'),
(3, 'Megjegyzések', 'remark', 'SELECT `ToolRemarkId` AS \"1\", CONCAT(employees.LastName, \" \", employees.FirstName) AS \"2\", `RemarkText` AS \"3\", `CreatedDate` AS \"4\" FROM `tool_remarks` inner join employees on EmployeeId=EmployeeFK'),
(4, 'Kapcsolatok', 'contacts', 'SELECT `PartnerContactId` AS \"1\", `Name` AS \"2\", `Email` AS \"3\", `Phone` AS \"4\", `Address` AS \"5\" FROM `partner_contacts`'),
(5, 'Idővonal', NULL, NULL),
(7, 'Steps', 'step', 'SELECT task_ways.Number, task_steps.Name, EmployeeId, concat(LastName, \" \" , FirstName) as EmployeeName, task_ways.Ready FROM task_ways INNER JOIN employees ON EmployeeFK=EmployeeId JOIN task_steps ON TaskStepId=TaskStepFK WHERE (\"<0>\"=TaskFK) ORDER BY Number'),
(8, 'Steps', 'input_steps', 'SELECT task_way_templates.Number as \"1\", task_steps.Name as \"2\", EmployeeId as \"3\", concat(LastName, \" \" , FirstName) as \"4\" FROM task_way_templates INNER JOIN employees ON EmployeeFK=EmployeeId JOIN task_steps ON TaskStepId=TaskStepFK WHERE (\"<0>\"=TaskTypeFK) ORDER BY Number');

-- --------------------------------------------------------

--
-- Table structure for table `weekly_tasks`
--

CREATE TABLE `weekly_tasks` (
  `WeeklyTaskId` int(11) NOT NULL,
  `StartTime` char(5) NOT NULL,
  `EndTime` char(5) NOT NULL,
  `StartYear` int(4) NOT NULL,
  `StartMonth` int(2) NOT NULL,
  `StartDay` int(2) NOT NULL,
  `EndYear` int(4) NOT NULL,
  `EndMonth` int(2) NOT NULL,
  `EndDay` int(2) NOT NULL,
  `Title` varchar(30) NOT NULL,
  `Description` text NOT NULL,
  `State` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `weekly_tasks`
--

INSERT INTO `weekly_tasks` (`WeeklyTaskId`, `StartTime`, `EndTime`, `StartYear`, `StartMonth`, `StartDay`, `EndYear`, `EndMonth`, `EndDay`, `Title`, `Description`, `State`) VALUES
(1, '09:45', '15:30', 2020, 3, 21, 2020, 3, 21, 'Kick Off Meeting', 'A Cartoranje kft-hez való bevezetés előkészítése', 1),
(2, '11:45', '09:30', 2020, 3, 20, 2020, 3, 21, 'Előkészítés', 'Kick off meetingre a tárgyaló kitakarítása', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cardc_structures`
--
ALTER TABLE `cardc_structures`
  ADD PRIMARY KEY (`StuctureId`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`CustomerId`);

--
-- Indexes for table `c_cards`
--
ALTER TABLE `c_cards`
  ADD PRIMARY KEY (`CCardId`);

--
-- Indexes for table `c_input_types`
--
ALTER TABLE `c_input_types`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `c_modules`
--
ALTER TABLE `c_modules`
  ADD PRIMARY KEY (`CModuleId`);

--
-- Indexes for table `c_plugins`
--
ALTER TABLE `c_plugins`
  ADD PRIMARY KEY (`CPluginId`);

--
-- Indexes for table `c_tabs`
--
ALTER TABLE `c_tabs`
  ADD PRIMARY KEY (`CTabId`);

--
-- Indexes for table `device_verification`
--
ALTER TABLE `device_verification`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `EmployeeFK` (`EmployeeFK`);

--
-- Indexes for table `dtls_structures`
--
ALTER TABLE `dtls_structures`
  ADD PRIMARY KEY (`StuctureId`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`EmployeeId`),
  ADD KEY `EmployeePositionFK` (`EmployeePositionFK`);

--
-- Indexes for table `employee_positions`
--
ALTER TABLE `employee_positions`
  ADD PRIMARY KEY (`EmployeePositionId`);

--
-- Indexes for table `filters`
--
ALTER TABLE `filters`
  ADD PRIMARY KEY (`FilterId`);

--
-- Indexes for table `form_structures`
--
ALTER TABLE `form_structures`
  ADD PRIMARY KEY (`FormStructureId`),
  ADD KEY `Type` (`Type`);

--
-- Indexes for table `f_columns`
--
ALTER TABLE `f_columns`
  ADD PRIMARY KEY (`FColumnId`);

--
-- Indexes for table `f_display`
--
ALTER TABLE `f_display`
  ADD PRIMARY KEY (`FDisplayId`),
  ADD KEY `FPluginDisplayFK` (`FPluginDisplayFK`),
  ADD KEY `FColumnsFK` (`FColumnFK`);

--
-- Indexes for table `f_form_inputs`
--
ALTER TABLE `f_form_inputs`
  ADD PRIMARY KEY (`FFormInputId`),
  ADD KEY `Type` (`Type`),
  ADD KEY `f_dinamic_form_inputs_ibfk_1` (`FPluginFormInputFK`),
  ADD KEY `FColumnFK` (`FColumnFK`);

--
-- Indexes for table `f_module_plugins`
--
ALTER TABLE `f_module_plugins`
  ADD PRIMARY KEY (`FModulePluginId`),
  ADD KEY `FUserModuleFK` (`FUserModuleFK`),
  ADD KEY `CPluginFK` (`CPluginFK`);

--
-- Indexes for table `f_plugin_cards`
--
ALTER TABLE `f_plugin_cards`
  ADD PRIMARY KEY (`FPluginCardId`),
  ADD KEY `FModulePluginFK` (`FModulePluginFK`),
  ADD KEY `FPluginPluginFK` (`FPluginPluginFK`),
  ADD KEY `f_plugin_cards_ibfk_3` (`CCardFK`);

--
-- Indexes for table `f_plugin_display`
--
ALTER TABLE `f_plugin_display`
  ADD PRIMARY KEY (`FPluginDisplayId`),
  ADD KEY `FModulePluginFK` (`FModulePluginFK`),
  ADD KEY `FPluginPluginFK` (`FPluginPluginFK`);

--
-- Indexes for table `f_plugin_form_inputs`
--
ALTER TABLE `f_plugin_form_inputs`
  ADD PRIMARY KEY (`FPluginFormInputId`),
  ADD KEY `FModulePluginFK` (`FModulePluginFK`),
  ADD KEY `FPluginPluginFK` (`FPluginPluginFK`);

--
-- Indexes for table `f_plugin_plugins`
--
ALTER TABLE `f_plugin_plugins`
  ADD PRIMARY KEY (`FPluginPluginId`),
  ADD KEY `CPluginFK` (`CPluginFK`),
  ADD KEY `FPluginPluginFK` (`FPluginPluginFK`),
  ADD KEY `FModulePluginFK` (`FModulePluginFK`);

--
-- Indexes for table `f_plugin_vo`
--
ALTER TABLE `f_plugin_vo`
  ADD PRIMARY KEY (`FPluginVoId`),
  ADD KEY `FModulePluginFK` (`FModulePluginFK`),
  ADD KEY `FPluginPluginFK` (`FPluginPluginFK`),
  ADD KEY `VirtualObjectFK` (`VirtualObjectFK`);

--
-- Indexes for table `f_user_modules`
--
ALTER TABLE `f_user_modules`
  ADD PRIMARY KEY (`FUserModuleId`),
  ADD KEY `EmployeeFK` (`EmployeeFK`),
  ADD KEY `ModuleFK` (`CModuleFK`),
  ADD KEY `TabFK` (`CTabFK`);

--
-- Indexes for table `insert_structures`
--
ALTER TABLE `insert_structures`
  ADD PRIMARY KEY (`InsertStructureId`);

--
-- Indexes for table `l_input_types`
--
ALTER TABLE `l_input_types`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `monthly_tasks`
--
ALTER TABLE `monthly_tasks`
  ADD PRIMARY KEY (`MonthlyTaskId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderId`),
  ADD KEY `orders_ibfk_1` (`CustomerFK`),
  ADD KEY `orders_ibfk_2` (`PartnerFK`),
  ADD KEY `orders_ibfk_3` (`TaskFK`);

--
-- Indexes for table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`OrderProductId`);

--
-- Indexes for table `order_services`
--
ALTER TABLE `order_services`
  ADD PRIMARY KEY (`OrderServiceId`),
  ADD KEY `ServiceFK` (`ServiceFK`);

--
-- Indexes for table `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`PartnerId`);

--
-- Indexes for table `partner_contacts`
--
ALTER TABLE `partner_contacts`
  ADD PRIMARY KEY (`PartnerContactId`),
  ADD KEY `PartnerFK` (`PartnerFK`);

--
-- Indexes for table `partner_tags`
--
ALTER TABLE `partner_tags`
  ADD PRIMARY KEY (`PartnerTagId`);

--
-- Indexes for table `partner_types`
--
ALTER TABLE `partner_types`
  ADD PRIMARY KEY (`PartnerTypeId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductId`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`ProjectId`);

--
-- Indexes for table `saved_task_ways`
--
ALTER TABLE `saved_task_ways`
  ADD PRIMARY KEY (`SavedTaskWayId`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`ServiceId`);

--
-- Indexes for table `sorts`
--
ALTER TABLE `sorts`
  ADD PRIMARY KEY (`SortId`);

--
-- Indexes for table `table_structures`
--
ALTER TABLE `table_structures`
  ADD PRIMARY KEY (`TableStructureId`);

--
-- Indexes for table `tags_for_partner`
--
ALTER TABLE `tags_for_partner`
  ADD PRIMARY KEY (`TagForPartnerId`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`TaskId`),
  ADD KEY `ProjectFK` (`ProjectFK`),
  ADD KEY `TaskTypeFK` (`TaskTypeFK`);

--
-- Indexes for table `task_categories`
--
ALTER TABLE `task_categories`
  ADD PRIMARY KEY (`TaskCategoryId`);

--
-- Indexes for table `task_images`
--
ALTER TABLE `task_images`
  ADD PRIMARY KEY (`TaskImageId`),
  ADD KEY `TaskFK` (`TaskFK`);

--
-- Indexes for table `task_steps`
--
ALTER TABLE `task_steps`
  ADD PRIMARY KEY (`TaskStepId`);

--
-- Indexes for table `task_types`
--
ALTER TABLE `task_types`
  ADD PRIMARY KEY (`TaskTypeId`);

--
-- Indexes for table `task_ways`
--
ALTER TABLE `task_ways`
  ADD PRIMARY KEY (`TaskWayId`),
  ADD KEY `TaskStepFK` (`TaskStepFK`),
  ADD KEY `EmployeeFK` (`EmployeeFK`),
  ADD KEY `TaskFK` (`TaskFK`);

--
-- Indexes for table `task_way_templates`
--
ALTER TABLE `task_way_templates`
  ADD PRIMARY KEY (`TaskWayId`);

--
-- Indexes for table `tools`
--
ALTER TABLE `tools`
  ADD PRIMARY KEY (`ToolId`);

--
-- Indexes for table `tool_availabilities`
--
ALTER TABLE `tool_availabilities`
  ADD PRIMARY KEY (`ToolAvailabilityId`);

--
-- Indexes for table `tool_remarks`
--
ALTER TABLE `tool_remarks`
  ADD PRIMARY KEY (`ToolRemarkId`);

--
-- Indexes for table `tool_types`
--
ALTER TABLE `tool_types`
  ADD PRIMARY KEY (`ToolTypeId`);

--
-- Indexes for table `update_structures`
--
ALTER TABLE `update_structures`
  ADD PRIMARY KEY (`UpdateStructureId`);

--
-- Indexes for table `virtual_objects`
--
ALTER TABLE `virtual_objects`
  ADD PRIMARY KEY (`VirtualObjectId`);

--
-- Indexes for table `weekly_tasks`
--
ALTER TABLE `weekly_tasks`
  ADD PRIMARY KEY (`WeeklyTaskId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cardc_structures`
--
ALTER TABLE `cardc_structures`
  MODIFY `StuctureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `CustomerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `c_cards`
--
ALTER TABLE `c_cards`
  MODIFY `CCardId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `c_modules`
--
ALTER TABLE `c_modules`
  MODIFY `CModuleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1015;

--
-- AUTO_INCREMENT for table `c_plugins`
--
ALTER TABLE `c_plugins`
  MODIFY `CPluginId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `device_verification`
--
ALTER TABLE `device_verification`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `dtls_structures`
--
ALTER TABLE `dtls_structures`
  MODIFY `StuctureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `EmployeeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `employee_positions`
--
ALTER TABLE `employee_positions`
  MODIFY `EmployeePositionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `filters`
--
ALTER TABLE `filters`
  MODIFY `FilterId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `form_structures`
--
ALTER TABLE `form_structures`
  MODIFY `FormStructureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `f_columns`
--
ALTER TABLE `f_columns`
  MODIFY `FColumnId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `f_display`
--
ALTER TABLE `f_display`
  MODIFY `FDisplayId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `f_form_inputs`
--
ALTER TABLE `f_form_inputs`
  MODIFY `FFormInputId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `f_module_plugins`
--
ALTER TABLE `f_module_plugins`
  MODIFY `FModulePluginId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `f_plugin_cards`
--
ALTER TABLE `f_plugin_cards`
  MODIFY `FPluginCardId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `f_plugin_display`
--
ALTER TABLE `f_plugin_display`
  MODIFY `FPluginDisplayId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `f_plugin_form_inputs`
--
ALTER TABLE `f_plugin_form_inputs`
  MODIFY `FPluginFormInputId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `f_plugin_plugins`
--
ALTER TABLE `f_plugin_plugins`
  MODIFY `FPluginPluginId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `f_plugin_vo`
--
ALTER TABLE `f_plugin_vo`
  MODIFY `FPluginVoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `f_user_modules`
--
ALTER TABLE `f_user_modules`
  MODIFY `FUserModuleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `insert_structures`
--
ALTER TABLE `insert_structures`
  MODIFY `InsertStructureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `monthly_tasks`
--
ALTER TABLE `monthly_tasks`
  MODIFY `MonthlyTaskId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `OrderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `OrderProductId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_services`
--
ALTER TABLE `order_services`
  MODIFY `OrderServiceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `partners`
--
ALTER TABLE `partners`
  MODIFY `PartnerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `partner_contacts`
--
ALTER TABLE `partner_contacts`
  MODIFY `PartnerContactId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `partner_tags`
--
ALTER TABLE `partner_tags`
  MODIFY `PartnerTagId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `partner_types`
--
ALTER TABLE `partner_types`
  MODIFY `PartnerTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ProductId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `ProjectId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `saved_task_ways`
--
ALTER TABLE `saved_task_ways`
  MODIFY `SavedTaskWayId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `ServiceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sorts`
--
ALTER TABLE `sorts`
  MODIFY `SortId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `table_structures`
--
ALTER TABLE `table_structures`
  MODIFY `TableStructureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tags_for_partner`
--
ALTER TABLE `tags_for_partner`
  MODIFY `TagForPartnerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `TaskId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `task_categories`
--
ALTER TABLE `task_categories`
  MODIFY `TaskCategoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `task_images`
--
ALTER TABLE `task_images`
  MODIFY `TaskImageId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_steps`
--
ALTER TABLE `task_steps`
  MODIFY `TaskStepId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `task_types`
--
ALTER TABLE `task_types`
  MODIFY `TaskTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `task_ways`
--
ALTER TABLE `task_ways`
  MODIFY `TaskWayId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

--
-- AUTO_INCREMENT for table `task_way_templates`
--
ALTER TABLE `task_way_templates`
  MODIFY `TaskWayId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `ToolId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tool_availabilities`
--
ALTER TABLE `tool_availabilities`
  MODIFY `ToolAvailabilityId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tool_remarks`
--
ALTER TABLE `tool_remarks`
  MODIFY `ToolRemarkId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tool_types`
--
ALTER TABLE `tool_types`
  MODIFY `ToolTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `update_structures`
--
ALTER TABLE `update_structures`
  MODIFY `UpdateStructureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `virtual_objects`
--
ALTER TABLE `virtual_objects`
  MODIFY `VirtualObjectId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `weekly_tasks`
--
ALTER TABLE `weekly_tasks`
  MODIFY `WeeklyTaskId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `device_verification`
--
ALTER TABLE `device_verification`
  ADD CONSTRAINT `EmployeeFK` FOREIGN KEY (`EmployeeFK`) REFERENCES `employees` (`EmployeeId`);

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`EmployeePositionFK`) REFERENCES `employee_positions` (`EmployeePositionId`);

--
-- Constraints for table `form_structures`
--
ALTER TABLE `form_structures`
  ADD CONSTRAINT `form_structures_ibfk_1` FOREIGN KEY (`Type`) REFERENCES `l_input_types` (`Id`);

--
-- Constraints for table `f_display`
--
ALTER TABLE `f_display`
  ADD CONSTRAINT `f_display_ibfk_1` FOREIGN KEY (`FPluginDisplayFK`) REFERENCES `f_plugin_display` (`FPluginDisplayId`),
  ADD CONSTRAINT `f_display_ibfk_2` FOREIGN KEY (`FColumnFK`) REFERENCES `f_columns` (`FColumnId`);

--
-- Constraints for table `f_form_inputs`
--
ALTER TABLE `f_form_inputs`
  ADD CONSTRAINT `f_form_inputs_ibfk_1` FOREIGN KEY (`FPluginFormInputFK`) REFERENCES `f_plugin_form_inputs` (`FPluginFormInputId`),
  ADD CONSTRAINT `f_form_inputs_ibfk_2` FOREIGN KEY (`FColumnFK`) REFERENCES `f_columns` (`FColumnId`),
  ADD CONSTRAINT `f_form_inputs_ibfk_3` FOREIGN KEY (`Type`) REFERENCES `c_input_types` (`Id`);

--
-- Constraints for table `f_module_plugins`
--
ALTER TABLE `f_module_plugins`
  ADD CONSTRAINT `f_module_plugins_ibfk_1` FOREIGN KEY (`FUserModuleFK`) REFERENCES `f_user_modules` (`FUserModuleId`),
  ADD CONSTRAINT `f_module_plugins_ibfk_2` FOREIGN KEY (`CPluginFK`) REFERENCES `c_plugins` (`CPluginId`);

--
-- Constraints for table `f_plugin_cards`
--
ALTER TABLE `f_plugin_cards`
  ADD CONSTRAINT `f_plugin_cards_ibfk_1` FOREIGN KEY (`FModulePluginFK`) REFERENCES `f_module_plugins` (`FModulePluginId`),
  ADD CONSTRAINT `f_plugin_cards_ibfk_2` FOREIGN KEY (`FPluginPluginFK`) REFERENCES `f_plugin_plugins` (`FPluginPluginId`),
  ADD CONSTRAINT `f_plugin_cards_ibfk_3` FOREIGN KEY (`CCardFK`) REFERENCES `c_cards` (`CCardId`);

--
-- Constraints for table `f_plugin_display`
--
ALTER TABLE `f_plugin_display`
  ADD CONSTRAINT `f_plugin_display_ibfk_1` FOREIGN KEY (`FModulePluginFK`) REFERENCES `f_module_plugins` (`FModulePluginId`),
  ADD CONSTRAINT `f_plugin_display_ibfk_2` FOREIGN KEY (`FPluginPluginFK`) REFERENCES `f_plugin_plugins` (`FPluginPluginId`);

--
-- Constraints for table `f_plugin_form_inputs`
--
ALTER TABLE `f_plugin_form_inputs`
  ADD CONSTRAINT `f_plugin_form_inputs_ibfk_1` FOREIGN KEY (`FModulePluginFK`) REFERENCES `f_module_plugins` (`FModulePluginId`),
  ADD CONSTRAINT `f_plugin_form_inputs_ibfk_2` FOREIGN KEY (`FPluginPluginFK`) REFERENCES `f_plugin_plugins` (`FPluginPluginId`);

--
-- Constraints for table `f_plugin_plugins`
--
ALTER TABLE `f_plugin_plugins`
  ADD CONSTRAINT `f_plugin_plugins_ibfk_2` FOREIGN KEY (`CPluginFK`) REFERENCES `c_plugins` (`CPluginId`),
  ADD CONSTRAINT `f_plugin_plugins_ibfk_3` FOREIGN KEY (`FPluginPluginFK`) REFERENCES `f_plugin_plugins` (`FPluginPluginId`),
  ADD CONSTRAINT `f_plugin_plugins_ibfk_4` FOREIGN KEY (`FModulePluginFK`) REFERENCES `f_module_plugins` (`FModulePluginId`);

--
-- Constraints for table `f_plugin_vo`
--
ALTER TABLE `f_plugin_vo`
  ADD CONSTRAINT `f_plugin_vo_ibfk_1` FOREIGN KEY (`FModulePluginFK`) REFERENCES `f_module_plugins` (`FModulePluginId`),
  ADD CONSTRAINT `f_plugin_vo_ibfk_2` FOREIGN KEY (`FPluginPluginFK`) REFERENCES `f_plugin_plugins` (`FPluginPluginId`),
  ADD CONSTRAINT `f_plugin_vo_ibfk_3` FOREIGN KEY (`VirtualObjectFK`) REFERENCES `virtual_objects` (`VirtualObjectId`);

--
-- Constraints for table `f_user_modules`
--
ALTER TABLE `f_user_modules`
  ADD CONSTRAINT `f_user_modules_ibfk_1` FOREIGN KEY (`EmployeeFK`) REFERENCES `employees` (`EmployeeId`),
  ADD CONSTRAINT `f_user_modules_ibfk_2` FOREIGN KEY (`CModuleFK`) REFERENCES `c_modules` (`CModuleId`),
  ADD CONSTRAINT `f_user_modules_ibfk_3` FOREIGN KEY (`CTabFK`) REFERENCES `c_tabs` (`CTabId`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`CustomerFK`) REFERENCES `customers` (`CustomerId`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`PartnerFK`) REFERENCES `partners` (`PartnerId`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`TaskFK`) REFERENCES `tasks` (`TaskId`);

--
-- Constraints for table `order_services`
--
ALTER TABLE `order_services`
  ADD CONSTRAINT `order_services_ibfk_1` FOREIGN KEY (`ServiceFK`) REFERENCES `services` (`ServiceId`);

--
-- Constraints for table `partner_contacts`
--
ALTER TABLE `partner_contacts`
  ADD CONSTRAINT `partner_contacts_ibfk_1` FOREIGN KEY (`PartnerFK`) REFERENCES `partners` (`PartnerId`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`ProjectFK`) REFERENCES `projects` (`ProjectId`),
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`TaskTypeFK`) REFERENCES `task_types` (`TaskTypeId`);

--
-- Constraints for table `task_images`
--
ALTER TABLE `task_images`
  ADD CONSTRAINT `task_images_ibfk_1` FOREIGN KEY (`TaskFK`) REFERENCES `tasks` (`TaskId`);

--
-- Constraints for table `task_ways`
--
ALTER TABLE `task_ways`
  ADD CONSTRAINT `task_ways_ibfk_1` FOREIGN KEY (`EmployeeFK`) REFERENCES `employees` (`EmployeeId`),
  ADD CONSTRAINT `task_ways_ibfk_2` FOREIGN KEY (`TaskFK`) REFERENCES `tasks` (`TaskId`),
  ADD CONSTRAINT `task_ways_ibfk_3` FOREIGN KEY (`TaskStepFK`) REFERENCES `task_steps` (`TaskStepId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
