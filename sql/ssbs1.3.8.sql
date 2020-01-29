# A halmaz futtatható ideiglenes tábla létrehozásával és használatával. Győződjön meg arról, hogy van erre jogosultsága.
# Kommentelje ki ezt a két sort ha nincs rá szüksége.

-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Létrehozó: Werner Ádám
-- Létrehozás ideje: 2020. Jan 26. 10:34

-- Table: l_input_types
CREATE TABLE `l_input_types` (
  `Id` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `l_input_types` 
ADD PRIMARY KEY (`Id`);

INSERT INTO `l_input_types` (`Id`) VALUES
('DT'),
('S'),
('SN'),
('W');

-- Table: form_structures
INSERT INTO `form_structures` (`FormStructureId`, `Place`, `Number`, `ParentFK`, `Name`, `Type`, `DefaultValue`, `ColumnName`, `Alias`, `TableName`, `TruncatedIdName`, `UploadName`, `EmployeeFK`, `Required`, `Functions`) VALUES (NULL, 'nprc', '2', NULL, 'Projekt neve', 'W', NULL, 'ProjectId,Name', 'Id,Name', 'projects', 'Project', 'projects.Name', '1', '1', NULL);
UPDATE `form_structures` SET `Number` = '1' WHERE `form_structures`.`FormStructureId` = 10;
INSERT INTO `form_structures` (`FormStructureId`, `Place`, `Number`, `ParentFK`, `Name`, `Type`, `DefaultValue`, `ColumnName`, `Alias`, `TableName`, `TruncatedIdName`, `UploadName`, `EmployeeFK`, `Required`, `Functions`) VALUES (NULL, 'nprc', '2', NULL, 'Projekt kezdete', 'DT', NULL, 'ProjectId,StartDate', 'Id,Name', 'projects', 'Project', 'projects.StartDate', '1', '1', NULL);
ALTER TABLE `form_structures` CHANGE `ParentFK` `ChildFK` INT(2) NULL DEFAULT NULL;
INSERT INTO `form_structures` (`FormStructureId`, `Place`, `Number`, `ChildFK`, `Name`, `Type`, `DefaultValue`, `ColumnName`, `TableName`, `TruncatedIdName`, `UploadName`, `EmployeeFK`, `Required`, `Functions`) VALUES (NULL, 'nprc', '3', NULL, 'Szülő projekt', 'S', NULL, 'ProjectId,Name', 'projects', 'Project', 'projects.ParentFK', '1', '1', NULL);
UPDATE `form_structures` SET `Required` = '0' WHERE `form_structures`.`FormStructureId` = 12;
UPDATE `form_structures` SET `Required` = '1' WHERE `form_structures`.`FormStructureId` = 12;
UPDATE `form_structures` SET `Required` = '0' WHERE `form_structures`.`FormStructureId` = 12;
UPDATE `form_structures` SET `Number` = '3' WHERE `form_structures`.`FormStructureId` = 11;
UPDATE `form_structures` SET `Number` = '2' WHERE `form_structures`.`FormStructureId` = 12;
INSERT INTO `form_structures` (`FormStructureId`, `Place`, `Number`, `ChildFK`, `Name`, `Type`, `DefaultValue`, `ColumnName`, `TableName`, `TruncatedIdName`, `UploadName`, `EmployeeFK`, `Required`, `Functions`) VALUES (NULL, 'nprc', '4', NULL, 'Határiő', 'DT', NULL, 'ProjectId,Deadline', 'projects', 'Project', 'projects.Deadline', '1', '1', NULL);
UPDATE `form_structures` SET `Name` = 'Határidő' WHERE `form_structures`.`FormStructureId` = 13;
INSERT INTO `form_structures` (`FormStructureId`, `Place`, `Number`, `ChildFK`, `Name`, `Type`, `DefaultValue`, `ColumnName`, `TableName`, `TruncatedIdName`, `UploadName`, `EmployeeFK`, `Required`, `Functions`) VALUES (NULL, 'nprc', '5', NULL, 'Projekt vége', 'DT', NULL, 'ProjectId,FinishDate', 'projects', 'Project', 'projects.FinishDate', '1', '1', NULL);
ALTER TABLE `form_structures` DROP `Alias`;
ALTER TABLE `form_structures` ADD  FOREIGN KEY (`Type`) REFERENCES `l_input_types`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Table: projects
ALTER TABLE `projects` DROP `IsChild`;

