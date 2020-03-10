-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2020. Már 10. 17:53
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
-- Adatbázis: `ssbs`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `c_modules`
--

CREATE TABLE `c_modules` (
  `CModuleID` int(11) NOT NULL,
  `ModuleName` varchar(30) NOT NULL,
  `ModuleDescription` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `c_modules`
--

INSERT INTO `c_modules` (`CModuleID`, `ModuleName`, `ModuleDescription`) VALUES
(1001, 'Finance charts', 'Diagrams'),
(1002, 'Reports', 'Reports'),
(1003, 'Projects', 'Projektek átlátása és létrehozása havi nézetben.'),
(1004, 'Tasks', 'Feladatok megjelenítése, kezelése, létrehozása.'),
(1005, 'Partners', 'Partnerek megjelenítése, kezelése, létrehozása.'),
(1006, 'Operational tasks', 'Operational tasks'),
(1007, 'Weekly schedule', 'Weekly schedule'),
(1008, 'Order', 'Rendelések létrehozása, megjelenítése, szerkesztése'),
(1009, 'Proucts overview', 'Proucts overview'),
(1010, 'Product tracking', 'Product tracking'),
(1011, 'Employees', 'Employees'),
(1012, 'Tools', 'Tools'),
(1013, 'Profil', 'Profil'),
(1014, 'Log out', 'Log out');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `c_modules`
--
ALTER TABLE `c_modules`
  ADD PRIMARY KEY (`CModuleID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `c_modules`
--
ALTER TABLE `c_modules`
  MODIFY `CModuleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1015;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2020. Már 10. 17:53
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
-- Adatbázis: `ssbs`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `c_tabs`
--

CREATE TABLE `c_tabs` (
  `CTabId` int(11) NOT NULL,
  `TabName` varchar(30) NOT NULL,
  `TabIcon` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `c_tabs`
--

INSERT INTO `c_tabs` (`CTabId`, `TabName`, `TabIcon`) VALUES
(101, 'Finance', 101),
(102, 'Processes', 102),
(103, 'Products', 103),
(104, 'Resources', 104),
(105, 'Application', 105);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `c_tabs`
--
ALTER TABLE `c_tabs`
  ADD PRIMARY KEY (`CTabId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2020. Már 10. 17:51
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
-- Adatbázis: `ssbs`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_modules`
--

CREATE TABLE `user_modules` (
  `UserModulId` int(11) NOT NULL,
  `EmployeeFK` int(11) NOT NULL,
  `CTabFK` int(11) NOT NULL,
  `CModuleFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `user_modules`
--

INSERT INTO `user_modules` (`UserModulId`, `EmployeeFK`, `CTabFK`, `CModuleFK`) VALUES
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

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `user_modules`
--
ALTER TABLE `user_modules`
  ADD PRIMARY KEY (`UserModulId`),
  ADD KEY `EmployeeFK` (`EmployeeFK`),
  ADD KEY `ModuleFK` (`CModuleFK`),
  ADD KEY `TabFK` (`CTabFK`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `user_modules`
--
ALTER TABLE `user_modules`
  MODIFY `UserModulId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `user_modules`
--
ALTER TABLE `user_modules`
  ADD CONSTRAINT `user_modules_ibfk_1` FOREIGN KEY (`EmployeeFK`) REFERENCES `employees` (`EmployeeId`),
  ADD CONSTRAINT `user_modules_ibfk_2` FOREIGN KEY (`CModuleFK`) REFERENCES `c_modules` (`CModuleID`),
  ADD CONSTRAINT `user_modules_ibfk_3` FOREIGN KEY (`CTabFK`) REFERENCES `c_tabs` (`CTabId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
