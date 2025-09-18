-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Сен 17 2025 г., 08:17
-- Версия сервера: 10.5.29-MariaDB
-- Версия PHP: 8.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
CREATE TABLE `ilmoitukset` (
  `ilmoitus_id` int(6) NOT NULL,
  `ilmoitus_laji` int(2) NOT NULL,
  `ilmoitus_nimi` text NOT NULL,
  `ilmoitus_kuvaus` text NOT NULL,
  `ilmoitus_paivays` date NOT NULL,
  `ilmoittaja_id` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
CREATE TABLE `kayttajat` (
  `kayttaja_id` int(6) NOT NULL,
  `kayttaja_taso` varchar(5) NOT NULL DEFAULT 'user',
  `kayttaja_tunnus` varchar(20) NOT NULL,
  `kayttaja_salasana` varchar(155) NOT NULL,
  `kayttaja_sahkoposti` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
ALTER TABLE `ilmoitukset`
  ADD PRIMARY KEY (`ilmoitus_id`),
  ADD KEY `idx_ilmoittaja` (`ilmoittaja_id`);
ALTER TABLE `kayttajat`
  ADD PRIMARY KEY (`kayttaja_id`),
  ADD UNIQUE KEY `idx_tunnus` (`kayttaja_tunnus`),
  ADD UNIQUE KEY `idx_sahkoposti` (`kayttaja_sahkoposti`);
ALTER TABLE `ilmoitukset`
  ADD CONSTRAINT `fk_ilmoittaja` FOREIGN KEY (`ilmoittaja_id`) REFERENCES `kayttajat` (`kayttaja_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
