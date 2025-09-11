-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Сен 11 2025 г., 08:45
-- Версия сервера: 10.5.29-MariaDB
-- Версия PHP: 8.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `ostojamyynti`
--

-- --------------------------------------------------------

--
-- Структура таблицы `ilmoitukset`
--

CREATE TABLE `ilmoitukset` (
  `ilmoitus_id` int(6) NOT NULL,
  `ilmoitus_laji` int(2) NOT NULL,
  `ilmoitus_nimi` text NOT NULL,
  `ilmoitus_kuvaus` text NOT NULL,
  `ilmoitus_paivays` date NOT NULL,
  `myyja_id` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `kayttajat`
--

CREATE TABLE `kayttajat` (
  `kayttaja_id` int(6) NOT NULL,
  `kayttaja_taso` varchar(5) NOT NULL DEFAULT 'user',
  `kayttaja_tunnus` varchar(20) NOT NULL,
  `kayttaja_salasana` varchar(12) NOT NULL,
  `kayttaja_sahkoposti` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `ilmoitukset`
--
ALTER TABLE `ilmoitukset`
  ADD PRIMARY KEY (`ilmoitus_id`),
  ADD KEY `idx_myyja` (`myyja_id`);

--
-- Индексы таблицы `kayttajat`
--
ALTER TABLE `kayttajat`
  ADD PRIMARY KEY (`kayttaja_id`),
  ADD UNIQUE KEY `idx_tunnus` (`kayttaja_tunnus`),
  ADD UNIQUE KEY `idx_sahkoposti` (`kayttaja_sahkoposti`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `ilmoitukset`
--
ALTER TABLE `ilmoitukset`
  MODIFY `ilmoitus_id` int(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `kayttajat`
--
ALTER TABLE `kayttajat`
  MODIFY `kayttaja_id` int(6) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
