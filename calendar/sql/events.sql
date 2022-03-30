-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2020 �?02 �?16 �?15:45
-- 服务器版本: 5.5.40
-- PHP 版本: 5.6.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `calendar`
--

-- --------------------------------------------------------

--
-- 表的结构 `events`
--

CREATE TABLE IF NOT EXISTS `events` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Starttime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `Endtime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `Content` text NOT NULL,
  `User` varchar(100) NOT NULL,
  `Createtime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=gbk AUTO_INCREMENT=17 ;

--
-- 转存表中的数据 `events`
--

INSERT INTO `events` (`ID`, `Starttime`, `Endtime`, `Content`, `User`, `Createtime`) VALUES
(14, '2020-02-19 17:30:00', '2020-02-19 21:00:00', '123123123', 'sqr124', '2020-02-16 07:17:00'),
(2, '2020-02-16 18:00:00', '2020-02-16 20:00:00', 'test', 'sqr123', '2020-02-16 04:14:43'),
(3, '2020-02-16 18:00:00', '2020-02-16 20:00:00', 'asdfasdfasfda', 'sqr123', '2020-02-16 04:17:41'),
(4, '2020-02-17 16:30:00', '2020-02-17 17:00:00', 'afdasdf', 'sqr123', '2020-02-16 04:18:14'),
(5, '2020-02-17 20:00:00', '2020-02-17 21:30:00', 'adfasdfa', 'sqr123', '2020-02-16 04:18:59'),
(15, '2020-02-18 22:00:00', '2020-02-19 01:00:00', '6464e6e', 'sqr124', '2020-02-16 07:17:13'),
(7, '2020-02-16 21:00:00', '2020-02-17 00:30:00', 'fasdfasd', 'sqr123', '2020-02-16 04:37:20'),
(16, '2020-02-20 17:00:00', '2020-02-20 21:30:00', '1231212312312', 'sqr125', '2020-02-16 07:17:58'),
(13, '2020-02-18 18:00:00', '2020-02-18 21:00:00', 'teststst', 'sqr123', '2020-02-16 07:16:36');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
