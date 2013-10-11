-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Client: localhost: 
-- Généré le : Mar 14 Mai 2013 à 13:45
-- Version du serveur: 5.5.16
-- Version de PHP: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `geststock`
--
/**
 * CREATE geststock database
**/ 

DROP DATABASE IF EXISTS `geststock`;
CREATE DATABASE `geststock` DEFAULT CHARACTER SET utf8 ;

-- --------------------------------------------------------

--
-- Structure de la table `boncommande`
--

CREATE TABLE IF NOT EXISTS `geststock`.`boncommande` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(250) NOT NULL,
  `intitule` varchar(250) DEFAULT NULL,
  `nature` int(11) DEFAULT NULL,
  `fournisseur` int(11) DEFAULT NULL,
  `datebc` date NOT NULL,
  `dateDebut` datetime NOT NULL,
  `dateModification` datetime DEFAULT NULL,
  `dateFin` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nature` (`nature`),
  KEY `fournisseur` (`fournisseur`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Contenu de la table `categorie`
--

-- INSERT INTO `geststock`.`boncommande` (`id`, `nom`, `intitule`, `nature`, `fournisseur`, `datebc`, `dateDebut`, `dateModification`, `dateFin`) VALUES
-- (1, '18/2012', 'Achat de fourniture de bureau2', 1, 1, '2013-02-18', '2013-04-03 14:01:54', '2013-05-07 15:14:40', NULL),
-- (2, '15/2012', 'Achat  de fournitures et consommables informatiques', 4, 1, '2013-09-28', '2013-04-03 14:22:55', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE IF NOT EXISTS `geststock`.`categorie` (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `nom` varchar(250) NOT NULL,
  `desc` varchar(500) DEFAULT NULL,
  `dateDebut` datetime NOT NULL,
  `dateModification` datetime DEFAULT NULL,
  `dateFin` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `categorie`
--

INSERT INTO `geststock`.`categorie` (`id`, `nom`, `desc`, `dateDebut`, `dateModification`, `dateFin`) VALUES
(1, 'Fournitures de Bureau', NULL, '2013-04-02 16:37:58', NULL, NULL),
(2, 'Matériels de Bureau', NULL, '2013-04-02 16:37:58', NULL, NULL),
(3, 'Mobilier de Bureau', NULL, '2013-04-02 16:37:58', NULL, NULL),
(4, 'Matériels Informatique', NULL, '2013-04-02 16:37:58', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `fournissour`
--

CREATE TABLE IF NOT EXISTS `geststock`.`fournissour` (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `nom` varchar(250) NOT NULL,
  `adresse` varchar(500) DEFAULT NULL,
  `tel` varchar(50) DEFAULT NULL,
  `fax` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `dateDebut` datetime NOT NULL,
  `dateModification` datetime DEFAULT NULL,
  `dateFin` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `fournissour`
--

INSERT INTO `geststock`.`fournissour` (`id`, `nom`, `adresse`, `tel`, `fax`, `email`, `dateDebut`, `dateModification`, `dateFin`) VALUES
(1, 'ILEF', '11, Av Abdelmoumen - RABAT', '', '', '', '2013-04-03 13:59:39', NULL, NULL),
(2, 'ICINET SARL', '9, Av Fal Ould Oumair, Rue Jabal Bouiblane AGDAL - RABAT', '', '', '', '2013-04-03 14:28:08', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `material`
--

CREATE TABLE IF NOT EXISTS `geststock`.`material` (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `nom` varchar(250) NOT NULL,
  `desc` text,
  `qteInitial` int(11) NOT NULL DEFAULT '0',
  `qteFinal` int(11) DEFAULT '0',
  `invt` varchar(50) DEFAULT NULL,
  `numMarche` int(11) DEFAULT NULL,
  `numVisa` varchar(250) DEFAULT NULL,
  `numFacture` varchar(250) DEFAULT NULL,
  `dateDebut` datetime NOT NULL,
  `dateModification` datetime DEFAULT NULL,
  `dateFin` datetime DEFAULT NULL,
  `dateExp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `numMarche` (`numMarche`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Contenu de la table `material`
--

-- INSERT INTO `geststock`.`material` (`id`, `nom`, `desc`, `qteInitial`, `qteFinal`, `invt`, `numMarche`, `numVisa`, `numFacture`, `dateDebut`, `dateModification`, `dateFin`, `dateExp`) VALUES
-- (1, 'Stylo Bic Bleu', 'Boite de 50 Unité', 50, 50, NULL, 1, '', '', '2013-04-03 14:58:52', NULL, NULL, NULL),
-- (2, 'Stylo Bic Noir', 'Boite de 50 Unite ', 50, 0, 'null', 1, '', '', '2013-04-03 15:00:36', '2013-04-24 16:22:44', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `mouvement`
--

CREATE TABLE IF NOT EXISTS `geststock`.`mouvement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `materiel` int(11) NOT NULL,
  `personnel` int(11) NOT NULL,
  `invt` int(11) DEFAULT NULL,
  `qteDemandee` int(11) NOT NULL,
  `qteLivree` int(11) NOT NULL,
  `dateLivraison` date NOT NULL,
  `signe` varchar(200) DEFAULT NULL,
  `observation` text NOT NULL,
  `dateDebut` datetime NOT NULL,
  `dateModification` datetime DEFAULT NULL,
  `dateFin` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `materiel` (`materiel`),
  KEY `personnel` (`personnel`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Contenu de la table `mouvement`
--

-- INSERT INTO `geststock`.`mouvement` (`id`, `materiel`, `personnel`, `invt`, `qteDemandee`, `qteLivree`, `dateLivraison`, `signe`, `observation`, `dateDebut`, `dateModification`, `dateFin`) VALUES
-- (1, 14, 9, 31, 1, 1, '2012-12-21', NULL, '', '2013-04-05 15:05:12', NULL, NULL),
-- (2, 14, 14, 32, 1, 1, '2012-12-21', NULL, '', '2013-04-05 15:05:12', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `organigramme`
--

CREATE TABLE IF NOT EXISTS `geststock`.`organigramme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `dateDebut` datetime NOT NULL,
  `dateModification` datetime DEFAULT NULL,
  `dateFin` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent` (`parent`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=43 ;

--
-- Contenu de la table `organigramme`
--

INSERT INTO `geststock`.`organigramme` (`id`, `nom`, `parent`, `dateDebut`, `dateModification`, `dateFin`) VALUES
(1, 'Direction', NULL, '2013-03-12 11:29:59', NULL, NULL),
(2, 'Direction', 1, '2013-03-12 11:29:59', NULL, NULL),
(3, 'Directeur', 2, '2013-03-12 11:29:59', NULL, NULL),
(4, 'Secrétariat', 2, '2013-03-12 11:29:59', NULL, NULL),
(5, 'Commission scientifique', 2, '2013-03-12 11:29:59', NULL, '2013-05-07 00:00:00'),
(6, 'Pôle Planification et Coordination', NULL, '2013-03-12 11:29:59', NULL, NULL),
(7, 'Division des archives des Administrations centrales et Etablissements publics', 6, '2013-03-12 11:29:59', NULL, NULL),
(8, 'Service des archives des administrations centrales', 7, '2013-03-12 11:29:59', NULL, NULL),
(9, 'Service des Archives des Etablissements publics', 7, '2013-03-12 11:29:59', NULL, NULL),
(10, 'Division des archives des Services déconcentrés et des Collectivités locales', 6, '2013-03-12 11:29:59', NULL, '2013-05-07 00:00:00'),
(11, 'Service des archives des Services déconcentrés', 10, '2013-03-12 11:29:59', NULL, NULL),
(12, 'Service des archives des Collectivités locales', 10, '2013-03-12 11:29:59', NULL, NULL),
(13, 'Division des archives privées', 6, '2013-03-12 11:29:59', NULL, '2013-05-07 00:00:00'),
(14, 'Service des archives des Personnes privées chargées d''une mission publique', 13, '2013-03-12 11:29:59', NULL, NULL),
(15, 'Service des archives privées', 13, '2013-03-12 11:29:59', NULL, NULL),
(16, 'Pôle Technique', NULL, '2013-03-12 11:29:59', NULL, NULL),
(17, 'Division de la Collecte et Traitement', 16, '2013-03-12 11:29:59', NULL, NULL),
(18, 'Service de la Collecte', 17, '2013-03-12 11:29:59', NULL, NULL),
(19, 'Service du Traitement', 17, '2013-03-12 11:29:59', NULL, NULL),
(20, 'Service Méthodes et Normalisation', 17, '2013-03-12 11:29:59', NULL, NULL),
(21, 'Division de la Conservation', 16, '2013-03-12 11:29:59', NULL, '2013-05-07 00:00:00'),
(22, 'Service de la Conservation préventive', 21, '2013-03-12 11:29:59', NULL, NULL),
(23, 'Service des Nouveaux supports et Numérisation', 21, '2013-03-12 11:29:59', NULL, NULL),
(24, 'Service de la Restauration et Reprographie', 21, '2013-03-12 11:29:59', NULL, NULL),
(25, 'Pôle des Services aux Publics', NULL, '2013-03-12 11:29:59', NULL, NULL),
(26, 'Division de la Communication et Diffusion', 25, '2013-03-12 11:29:59', NULL, NULL),
(27, 'Service Marketing et Communication', 25, '2013-03-12 11:29:59', NULL, '2013-05-07 00:00:00'),
(28, 'Service de Recherche documentaire et Consultation', 26, '2013-03-12 11:29:59', NULL, NULL),
(29, 'Service Publications et Edition', 26, '2013-03-12 11:29:59', NULL, NULL),
(30, 'Service des Activités culturelles et scientifiques', 26, '2013-03-12 11:29:59', NULL, NULL),
(31, 'Service des Activités pédagogiques', 40, '2013-03-12 11:29:59', NULL, '2013-05-07 00:00:00'),
(32, 'Service des Activités scientifiques', 40, '2013-03-12 11:29:59', NULL, '2013-05-07 00:00:00'),
(33, 'Pôle des Ressources humaines,financières,logistiques et Informatiques', NULL, '2013-03-12 11:29:59', NULL, NULL),
(34, 'Division des Ressources humaines', 33, '2013-03-12 11:29:59', NULL, '2013-05-07 00:00:00'),
(35, 'Service de Gestion des Ressources humaines', 37, '2013-03-12 11:29:59', NULL, NULL),
(36, 'Service de la Formation et perfectionnement', 34, '2013-03-12 11:29:59', NULL, NULL),
(37, 'Division des Affaires Administratives et financières', 33, '2013-03-12 11:29:59', NULL, NULL),
(38, 'Service du Budget et Comptabilité', 37, '2013-03-12 11:29:59', NULL, NULL),
(39, 'Service de la Logistique', 40, '2013-03-12 11:29:59', NULL, NULL),
(40, 'Division du Système d''information', 33, '2013-03-12 11:29:59', NULL, '2013-05-07 00:00:00'),
(41, 'Service Production et Développement informatique', 37, '2013-03-12 11:29:59', NULL, NULL),
(42, 'Service de la Maintenance du Parc informatique', 40, '2013-03-12 11:29:59', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `personnel`
--

CREATE TABLE IF NOT EXISTS `geststock`.`personnel` (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `grade` varchar(100) NOT NULL,
  `echelle` varchar(4) NOT NULL,
  `division` int(11) DEFAULT NULL,
  `service` int(11) DEFAULT NULL,
  `post` varchar(45) DEFAULT NULL,
  `tel` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `dateDebut` datetime NOT NULL,
  `dateModification` datetime DEFAULT NULL,
  `dateFin` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `division_idx` (`division`),
  KEY `service_idx` (`service`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=25 ;

--
-- Contenu de la table `personnel`
--

INSERT INTO `geststock`.`personnel` (`id`, `nom`, `grade`, `echelle`, `division`, `service`, `post`, `tel`, `email`, `dateDebut`, `dateModification`, `dateFin`) VALUES
(1, 'BAIDA Jamâa', 'Professeur de l''enseignement supérieur grade C', 'H.E', 2, 3, NULL, NULL, NULL, '2013-03-19 13:48:52', NULL, NULL),
(2, 'ALAOUI SOSSE Temadher', 'Ingénieur d''Etat 1er grade', '11', 37, 41, '', '', '', '2013-03-18 09:50:20', NULL, NULL),
(3, 'LARHMAID Lhassan', 'Administrateur 2éme grade', '11', 37, 35, '', '', '', '2013-03-18 14:39:00', NULL, NULL),
(4, 'LATIFI Bouchra', 'Administrateur 2éme grade', '11', 26, 28, '', '', '', '2013-03-18 09:54:22', NULL, NULL),
(5, 'CHERRAQ El houssine', 'Administrateur 2éme grade', '11', 37, 38, '', '', '', '2013-03-18 11:21:07', NULL, NULL),
(6, 'GHANNAMI Nadia', 'Administrateur 2éme grade', '11', 37, 38, '', '', '', '2013-03-18 11:22:05', NULL, NULL),
(7, 'AICH Khalid', 'Administrateur 2éme grade', '11', 26, 28, '', '', '', '2013-03-18 11:26:39', '2013-05-10 10:34:52', NULL),
(8, 'ELGHALI Khalil', 'Administrateur 2éme grade', '11', 17, 19, '', '', '', '2013-03-19 14:51:23', NULL, NULL),
(9, 'BOUIHI Houda', 'Administrateur 3éme grade', '10', 26, 28, '', '', '', '2013-03-18 11:34:42', NULL, NULL),
(10, 'BOUMHAOUAD Hatim', 'Administrateur 3éme grade', '10', 26, 28, '112', '', '', '2013-03-21 09:48:27', NULL, NULL),
(11, 'ELKASRI Ouafae', 'Administrateur 3éme grade', '10', 26, 28, '', '', '', '2013-03-18 11:35:16', NULL, NULL),
(12, 'HAMMOUMI M''hammad', 'Administrateur 3éme grade', '10', 26, 28, '', '', '', '2013-03-18 11:35:35', NULL, NULL),
(13, 'HAMATTI Khalid', 'Téchnicien 3éme grade', '9', 37, 38, '109', '', '', '2013-03-20 15:34:07', '2013-04-22 11:53:14', NULL),
(14, 'BOURNI Abdelkrim', 'Téchnicien 3éme grade', '9', 37, 38, '', '', '', '2013-03-20 15:17:36', NULL, NULL),
(15, 'BOUH El houssain', 'Téchnicien 3éme grade', '9', 37, 41, '', '', '', '2013-03-19 14:41:30', NULL, NULL),
(16, 'GOUMHANED Abdallah', 'Téchnicien 3éme grade', '9', 37, 41, '130', '0676042537', 'abdego123@gmail.com', '2013-03-20 15:18:59', NULL, NULL),
(17, 'KAHOUL Oum Kaltoum', 'Téchnicien 3éme grade', '9', 2, 4, '', '', '', '2013-03-18 11:36:57', '2013-05-07 15:46:04', NULL),
(18, 'KADER Saoussan', 'Téchnicien 3éme grade', '9', 2, 4, '', '', '', '2013-03-19 14:48:46', '2013-05-07 15:46:18', NULL),
(19, 'AMADID Meriem', 'Téchnicien 4éme grade', '8', 37, 41, '', '', '', '2013-03-19 14:55:27', NULL, NULL),
(20, 'BELFDIL Mohamed', 'Assistant technique 4éme grade', '5', 17, 18, '', '', '', '2013-03-20 15:11:34', NULL, NULL),
(21, 'ZOUHAIRI Abdessamad', 'Assistant technique 4éme grade', '5', 17, 18, '', '', '', '2013-03-19 14:35:19', NULL, NULL),
(22, 'BENIJJANE Youssef', 'Assistant technique 4éme grade', '5', 17, 18, '142', '', '', '2013-03-19 15:19:11', NULL, NULL),
(23, 'CHLIEH Mohamed', 'Assistant technique 4éme grade', '5', 17, 18, '123', '', '', '2013-03-19 14:59:21', NULL, NULL),
(24, 'GACHOUCH Aziz', 'Assistant technique 4éme grade', '5', 17, 18, '', '', '', '2013-03-18 15:49:23', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `profil`
--

CREATE TABLE IF NOT EXISTS `geststock`.`profil` (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `nom` varchar(250) NOT NULL,
  `desc` varchar(500) DEFAULT NULL,
  `dateDebut` datetime NOT NULL,
  `dateModification` datetime DEFAULT NULL,
  `dateFin` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `profil`
--

INSERT INTO `geststock`.`profil` (`id`, `nom`, `desc`, `dateDebut`, `dateModification`, `dateFin`) VALUES
(1, 'Administrateur', NULL, '2013-05-09 10:40:34', '2013-05-09 10:40:34', NULL),
(2, 'Utilisateur', NULL, '2013-05-09 10:40:57', '2013-05-09 10:40:57', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `geststock`.`user` (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `profil` int(1) DEFAULT NULL,
  `dateDebut` datetime NOT NULL,
  `dateModification` datetime DEFAULT NULL,
  `dateFin` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profil` (`profil`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `user`
--

INSERT INTO `geststock`.`user` (`id`, `nom`, `login`, `password`, `status`, `profil`, `dateDebut`, `dateModification`, `dateFin`) VALUES
(1, 'Administrateur', 'admin', '60bb1f9914c26fb929b724398e5d2f66', 1, 1, '2013-03-08 12:06:36', '2013-05-09 16:15:06', NULL),
(2, 'BOUH EL HOUSSAINE', 'subadmin', '21232f297a57a5a743894a0e4a801fc3', 1, 2, '2013-05-09 10:01:10', '2013-05-09 16:14:54', NULL),
(3, 'ABDO GOUMEHAND', 'abdo', '05502b431022011b98c04d84dd4f28e8', 1, 2, '2013-05-09 14:41:30', '2013-05-09 15:17:08', NULL),
(4, 'KHALID HAMATTI', 'khalid', '161ebd7d45089b3446ee4e0d86dbcf92', 1, 2, '2013-05-09 15:18:43', '2013-05-09 15:34:08', NULL);

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `boncommande`
--
ALTER TABLE `geststock`.`boncommande`
  ADD CONSTRAINT `fournisseur_idx` FOREIGN KEY (`fournisseur`) REFERENCES `geststock`.`fournissour` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `nature_idx` FOREIGN KEY (`nature`) REFERENCES `geststock`.`categorie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `material`
--
ALTER TABLE `geststock`.`material`
  ADD CONSTRAINT `numMarche` FOREIGN KEY (`numMarche`) REFERENCES `geststock`.`boncommande` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `mouvement`
--
ALTER TABLE `geststock`.`mouvement`
  ADD CONSTRAINT `materiel` FOREIGN KEY (`materiel`) REFERENCES `geststock`.`material` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `personnel` FOREIGN KEY (`personnel`) REFERENCES `geststock`.`personnel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `organigramme`
--
ALTER TABLE `geststock`.`organigramme`
  ADD CONSTRAINT `parent` FOREIGN KEY (`parent`) REFERENCES `geststock`.`organigramme` (`id`);

--
-- Contraintes pour la table `personnel`
--
ALTER TABLE `geststock`.`personnel`
  ADD CONSTRAINT `division` FOREIGN KEY (`division`) REFERENCES `geststock`.`organigramme` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `service` FOREIGN KEY (`service`) REFERENCES `geststock`.`organigramme` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `geststock`.`profil` FOREIGN KEY (`profil`) REFERENCES `geststock`.`profil` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
