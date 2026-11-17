-- phpMyAdmin SQL Dump
-- version 6.0.0-dev+20261019.24ede9da2d
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 17, 2026 at 01:47 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `formation-platform`
--

-- --------------------------------------------------------

--
-- Table structure for table `ateliers`
--
CREATE TABLE `ateliers` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lieu` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_debut` datetime NOT NULL,
  `date_fin` datetime NOT NULL,
  `capacite` int UNSIGNED NOT NULL,
  `statut` enum('planifie','en_cours','termine','annule') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'planifie',
  `formateur_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ateliers`
--

INSERT INTO `ateliers` (`id`, `title`, `description`, `lieu`, `image`, `date_debut`, `date_fin`, `capacite`, `statut`, `formateur_id`, `created_at`, `updated_at`) VALUES
(1, 'Déploiement continu (CI/CD)', 'La grande salle se vidait; le tuyau du poêle, en forme de ses prunelles disparaissaient dans une assiette, frapper aux portes avant d\'entrer, faire un tableau funèbre avec les deux mains sur ses.', 'Salle B - Tunis', 'ateliers/seed/atelier-1.svg', '2026-12-01 10:00:00', '2026-12-01 13:00:00', 8, 'planifie', 7, '2026-11-17 00:42:16', '2026-11-17 00:42:16'),
(2, 'Déploiement continu (CI/CD)', 'C\'était l\'heure où les arbres touffus portant des chapelets à croix de cuivre, une statue mal faite. -- Elle le charmait autrefois l\'effrayait un peu les cendres froides. Entre la fenêtre pour le.', 'Espace Coworking - Ariana', 'ateliers/seed/atelier-2.svg', '2027-01-07 09:00:00', '2027-01-07 14:00:00', 8, 'planifie', 6, '2026-11-17 00:42:16', '2026-11-17 00:42:16'),
(3, 'Angular pour débutants', 'Emma; tais-toi! -- C\'est autre chose! Mais qu\'est-ce que cela peut-être semblerait drôle. -- Ah! bon ami! murmura tendrement madame Homais, portait des bas gris. La mère Bovary, sans lever les yeux.', 'Campus - Sfax', 'ateliers/seed/atelier-3.svg', '2026-12-25 10:00:00', '2026-12-25 13:00:00', 15, 'planifie', 8, '2026-11-17 00:42:16', '2026-11-17 00:42:16'),
(4, 'TypeScript avancé', 'Elle retira la sienne. Mais le ton respectueux de la bibliothèque et du rayonnement des cierges. Au lieu de diminuer par l\'absence, cette envie de la note, prit dans la cuisine de l\'auberge, il.', 'Salle de conférence - Sousse', 'ateliers/seed/atelier-4.svg', '2026-12-30 09:00:00', '2026-12-30 15:00:00', 25, 'planifie', 9, '2026-11-17 00:42:16', '2026-11-17 00:42:16'),
(5, 'Docker pour développeurs', 'L\'ecclésiastique passa le goupillon à son examen d\'officier de santé. On l\'attendait le soir auprès d\'eux, sous la tête en signe d\'approbation. -- Du reste, Emma ne s\'endormait que le Seigneur.', 'Espace Coworking - Ariana', 'ateliers/seed/atelier-5.svg', '2027-01-14 14:00:00', '2027-01-14 22:00:00', 12, 'planifie', 10, '2026-11-17 00:42:16', '2026-11-17 00:42:16'),
(6, 'UX Design : les fondamentaux', 'Pourquoi ces emportements? Il expliquait à la grande rue par les carreaux. Ils étaient sur les épaules d\'une Rouennaise en manches de sa tendresse, et tremblait un peu de poussière humide et de.', 'Salle de conférence - Sousse', 'ateliers/seed/atelier-6.svg', '2026-12-16 10:00:00', '2026-12-16 15:00:00', 10, 'planifie', 8, '2026-11-17 00:42:16', '2026-11-17 00:42:17'),
(7, 'Déploiement continu (CI/CD)', 'Elle aurait voulu ne rien respecter. Un jour, elle s\'y arrêtait court, et vidait son monde, qui passaient entre les fleurs. -- Pauvre garçon! pensait-elle. -- En quoi? comment? dit Bovary. Et, la.', 'Salle B - Tunis', 'ateliers/seed/atelier-7.svg', '2026-11-26 10:00:00', '2026-11-26 15:00:00', 15, 'planifie', 10, '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(8, 'Tests unitaires avec PHPUnit', 'Elle décousait la doublure de son pantalon, qu\'il appuyait contre son mari, sachant qu\'elle aimait autrefois, à faire rougir les pincettes, ou regardant la lune: -- Je n\'ai besoin de tuer les rats.', 'En ligne (Google Meet)', 'ateliers/seed/atelier-8.svg', '2026-12-03 09:00:00', '2026-12-03 11:00:00', 10, 'planifie', 8, '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(9, 'Sécurité des applications web', 'Lucie entama d\'un air sérieux: -- C\'est la faute de trois jours. Tandis qu\'il étudiait les équins, les varus et les dentelles de sa poitrine large la ligne des petits rayons d\'or s\'irradiant tout.', 'Salle B - Tunis', 'ateliers/seed/atelier-9.svg', '2026-12-03 10:00:00', '2026-12-03 12:00:00', 12, 'planifie', 9, '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(10, 'Gestion de projet Agile Scrum', 'Scott, l\'Écho des feuilletons, etc., et je me sustenterais avec plaisir! L\'ecclésiastique ne se rappelait-il plus ses idées peu à peu près de se dire: «je suis vertueuse», et de sa phrase, il.', 'En ligne (Zoom)', 'ateliers/seed/atelier-10.svg', '2026-11-27 10:00:00', '2026-11-27 15:00:00', 25, 'planifie', 7, '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(11, 'Python pour l\'analyse de données', 'Emma craignait de s\'exagérer peut-être la longueur de la passion, aux raffinements de la bière était trop tard, puis il pleurerait abondamment, et enfin, la baisant au front; ne te connaît pas. Ce.', 'Salle de conférence - Sousse', 'ateliers/seed/atelier-11.svg', '2026-11-15 07:57:01', '2026-11-19 08:38:25', 10, 'en_cours', 10, '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(12, 'Bases de données MySQL', 'Edgar, étincelant de furie, dominait tous les jours de sa femme était un bas de chaque article, madame Bovary changea d\'allures. Ses regards devinrent plus hardis, ses discours plus libres; elle eut.', 'Salle A - Tunis', 'ateliers/seed/atelier-12.svg', '2026-11-15 02:07:07', '2026-11-17 22:35:36', 8, 'en_cours', 8, '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(13, 'Docker pour développeurs', 'Vous rappelez-vous, mon ami, que tu l\'as renvoyée pour tout ce qui étonna le médecin. Puis, se tournant vers sa voisine: -- Madame, sans doute, n\'est pas que la cuisinière entrant, déposa sur la.', 'Salle B - Tunis', 'ateliers/seed/atelier-13.svg', '2026-11-15 02:36:25', '2026-11-17 04:21:36', 8, 'en_cours', 8, '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(14, 'Gestion de projet Agile Scrum', 'Une demi-once d\'arcanson et de grands moyens et qui maintenant ne manquaient plus de soixante mille francs, on va nous saisir; c\'est à deux pas, rue Malpalu. Alors, par lâcheté, par bêtise, par cet.', 'En ligne (Zoom)', 'ateliers/seed/atelier-14.svg', '2026-10-16 23:57:08', '2026-10-17 07:57:08', 20, 'termine', 6, '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(15, 'Python pour l\'analyse de données', 'Et il saisit sa main; elle ne vit plus si nettement les livrées et les murailles de la campagne, jappait après les papillons jaunes, donnait la chasse aux musaraignes; ou mordillait les coquelicots.', 'Salle de conférence - Sousse', 'ateliers/seed/atelier-15.svg', '2026-08-28 03:03:13', '2026-08-28 06:03:13', 25, 'termine', 9, '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(16, 'Prise de parole en public', 'Il y avait aux fenêtres des grilles en fer et aux trois quarts d\'heure. Enfin elle répondit: -- Nous n\'avons pas même cette distraction, nous autres pauvres femmes! -- Triste distraction car on.', 'Salle A - Tunis', 'ateliers/seed/atelier-16.svg', '2026-09-29 10:31:27', '2026-09-29 14:31:27', 10, 'termine', 10, '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(17, 'Sécurité des applications web', 'Fort à tous les mercredis une heure et être rentré dans Yonville que la terre croulât. Pourquoi n\'en pas bouger, soupira en les regardant de loin, tout au fond contre la glace. -- Approche le vase!.', 'Salle B - Tunis', 'ateliers/seed/atelier-17.svg', '2026-08-25 09:47:43', '2026-08-25 16:47:43', 10, 'termine', 2, '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(18, 'Bases de données MySQL', 'Ah bah! songea-t-elle, il n\'y a, de Tostes recommencèrent. Elle s\'estimait à présent que ce bon Homais qui regardait charger sur l\'Hirondelle une grande carafe d\'eau-de-vie, dont il venait montrer à.', 'Espace Coworking - Ariana', 'ateliers/seed/atelier-18.svg', '2026-11-09 00:17:46', '2026-11-09 02:17:46', 10, 'termine', 2, '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(19, 'Tailwind CSS en pratique', 'Emma venait d\'en sortir. Il cria, pleura, s\'évanouit, mais elle avait le corsage long des bâtiments se fondait. Elle était à sa fenêtre; puis tout reprenait à la lisière de la campagne n\'avait rien.', 'Espace Coworking - Ariana', 'ateliers/seed/atelier-19.svg', '2026-09-03 09:47:35', '2026-09-03 11:47:35', 25, 'termine', 7, '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(20, 'Git et GitHub en équipe', 'M. et madame Tuvache, la femme riche semble avoir autour d\'elle, dans les dernières années du règne de Charles X. La voûte en bois de sapin, sont restées sans être vu. D\'ailleurs, elle est fort.', 'Campus - Sfax', 'ateliers/seed/atelier-20.svg', '2026-12-31 14:00:00', '2026-12-31 22:00:00', 8, 'annule', 8, '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(21, 'Git et GitHub en équipe', 'Dis-moi donc. Elle remua la tête sur l\'épaule, et l\'on se tenait. Un papier jaune-serin, relevé dans le sourd murmure des syllabes latines, qui tintaient comme si elle ne voyait pas d\'inconvénient.', 'Salle B - Tunis', 'ateliers/seed/atelier-21.svg', '2026-12-13 10:00:00', '2026-12-13 14:00:00', 20, 'annule', 7, '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(22, 'Bases de données MySQL', 'Mais, chaque fois qu\'elle avait dans une chapelle encombrée par des boudins qui avaient apporté, les meubles du salon. Tous les hommes, capacités méconnues sous des dehors futiles, crevaient leurs.', 'Espace Coworking - Ariana', 'ateliers/seed/atelier-22.svg', '2026-12-25 14:00:00', '2026-12-25 19:00:00', 12, 'annule', 6, '2026-11-17 00:42:17', '2026-11-17 00:42:17');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--
CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inscriptions`
--
CREATE TABLE `inscriptions` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `atelier_id` bigint UNSIGNED NOT NULL,
  `statut` enum('en_attente','confirmee','annulee') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en_attente',
  `date_inscription` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inscriptions`
--

INSERT INTO `inscriptions` (`id`, `user_id`, `atelier_id`, `statut`, `date_inscription`, `created_at`, `updated_at`) VALUES
(1, 13, 1, 'confirmee', '2026-10-25 20:36:29', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(2, 12, 1, 'en_attente', '2026-11-06 03:08:20', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(3, 27, 2, 'confirmee', '2026-11-12 12:07:17', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(4, 28, 2, 'en_attente', '2026-10-28 07:13:12', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(5, 24, 2, 'en_attente', '2026-11-15 07:29:57', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(6, 25, 2, 'en_attente', '2026-10-31 11:00:07', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(7, 15, 3, 'confirmee', '2026-11-16 16:04:50', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(8, 21, 3, 'confirmee', '2026-11-10 23:04:47', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(9, 23, 3, 'en_attente', '2026-10-20 01:22:18', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(10, 30, 3, 'confirmee', '2026-11-11 02:42:09', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(11, 18, 3, 'confirmee', '2026-11-07 21:07:18', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(12, 33, 3, 'en_attente', '2026-11-09 08:55:57', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(13, 25, 3, 'en_attente', '2026-10-24 02:16:46', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(14, 29, 3, 'en_attente', '2026-10-20 10:51:20', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(15, 13, 3, 'en_attente', '2026-10-30 11:25:33', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(16, 19, 3, 'confirmee', '2026-10-30 09:06:07', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(17, 17, 3, 'annulee', '2026-11-09 05:34:59', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(18, 14, 3, 'annulee', '2026-11-05 19:50:17', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(19, 26, 4, 'en_attente', '2026-10-21 11:39:16', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(20, 37, 4, 'confirmee', '2026-11-07 20:54:27', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(21, 40, 4, 'confirmee', '2026-11-06 01:29:55', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(22, 36, 4, 'en_attente', '2026-10-22 11:29:16', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(23, 35, 4, 'confirmee', '2026-10-18 11:07:46', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(24, 13, 4, 'en_attente', '2026-11-04 19:16:14', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(25, 30, 4, 'en_attente', '2026-10-23 13:32:38', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(26, 12, 4, 'confirmee', '2026-11-04 19:14:56', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(27, 14, 4, 'en_attente', '2026-10-20 01:22:58', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(28, 23, 4, 'en_attente', '2026-10-31 05:14:15', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(29, 11, 4, 'en_attente', '2026-10-26 00:33:44', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(30, 3, 4, 'annulee', '2026-10-25 05:58:48', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(31, 21, 5, 'confirmee', '2026-11-06 09:17:02', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(32, 30, 5, 'en_attente', '2026-11-08 17:13:02', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(33, 26, 5, 'confirmee', '2026-11-07 10:53:44', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(34, 39, 5, 'en_attente', '2026-11-09 05:59:15', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(35, 31, 5, 'confirmee', '2026-11-08 01:14:29', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(36, 27, 5, 'en_attente', '2026-10-27 22:27:48', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(37, 34, 5, 'confirmee', '2026-11-15 07:39:25', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(38, 13, 5, 'confirmee', '2026-10-24 12:46:09', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(39, 25, 5, 'annulee', '2026-10-22 10:00:11', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(40, 18, 5, 'annulee', '2026-10-28 01:28:45', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(41, 33, 6, 'en_attente', '2026-11-03 04:38:48', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(42, 32, 6, 'confirmee', '2026-11-04 05:31:47', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(43, 15, 6, 'confirmee', '2026-11-14 14:13:44', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(44, 31, 6, 'confirmee', '2026-11-07 21:44:17', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(45, 13, 6, 'annulee', '2026-11-07 16:43:17', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(46, 33, 7, 'en_attente', '2026-11-08 12:28:28', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(47, 30, 7, 'en_attente', '2026-11-12 13:26:36', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(48, 23, 7, 'confirmee', '2026-11-06 05:15:02', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(49, 26, 7, 'en_attente', '2026-10-25 01:59:22', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(50, 27, 7, 'en_attente', '2026-11-04 02:19:50', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(51, 19, 7, 'en_attente', '2026-10-28 07:07:52', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(52, 37, 7, 'confirmee', '2026-10-28 00:18:40', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(53, 35, 7, 'en_attente', '2026-11-02 23:45:31', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(54, 14, 7, 'confirmee', '2026-10-27 16:02:51', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(55, 40, 7, 'en_attente', '2026-10-22 14:17:51', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(56, 36, 7, 'confirmee', '2026-10-24 10:00:57', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(57, 11, 7, 'en_attente', '2026-10-29 09:50:42', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(58, 12, 7, 'en_attente', '2026-10-20 11:24:42', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(59, 13, 7, 'annulee', '2026-10-20 05:17:03', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(60, 3, 8, 'en_attente', '2026-10-21 03:51:49', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(61, 13, 8, 'en_attente', '2026-10-27 09:21:36', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(62, 22, 8, 'en_attente', '2026-11-03 06:15:05', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(63, 37, 8, 'confirmee', '2026-11-06 22:54:11', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(64, 27, 8, 'confirmee', '2026-11-11 03:37:54', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(65, 36, 8, 'annulee', '2026-11-05 07:58:06', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(66, 18, 9, 'en_attente', '2026-10-20 09:48:48', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(67, 32, 9, 'en_attente', '2026-11-07 02:40:10', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(68, 11, 9, 'confirmee', '2026-10-31 22:09:57', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(69, 20, 9, 'confirmee', '2026-10-18 01:56:14', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(70, 30, 9, 'confirmee', '2026-11-11 18:29:08', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(71, 40, 9, 'confirmee', '2026-11-12 20:40:25', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(72, 38, 9, 'en_attente', '2026-10-25 03:39:23', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(73, 26, 9, 'confirmee', '2026-11-10 11:36:35', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(74, 25, 9, 'confirmee', '2026-11-03 03:36:26', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(75, 14, 9, 'annulee', '2026-11-15 02:13:30', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(76, 36, 9, 'annulee', '2026-10-29 22:13:01', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(77, 16, 10, 'confirmee', '2026-11-09 10:29:12', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(78, 12, 10, 'en_attente', '2026-11-16 05:50:59', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(79, 14, 10, 'confirmee', '2026-10-29 07:50:31', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(80, 21, 10, 'confirmee', '2026-11-06 17:38:37', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(81, 30, 10, 'en_attente', '2026-11-07 13:13:41', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(82, 35, 10, 'en_attente', '2026-11-04 18:42:23', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(83, 25, 10, 'confirmee', '2026-10-26 02:35:26', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(84, 31, 10, 'en_attente', '2026-10-24 06:46:15', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(85, 22, 10, 'confirmee', '2026-11-06 14:56:56', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(86, 38, 10, 'en_attente', '2026-11-01 17:07:22', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(87, 13, 10, 'confirmee', '2026-10-22 02:10:22', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(88, 17, 10, 'confirmee', '2026-10-30 15:35:59', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(89, 28, 10, 'en_attente', '2026-11-16 22:42:04', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(90, 19, 10, 'en_attente', '2026-10-27 12:48:59', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(91, 29, 10, 'en_attente', '2026-10-31 08:46:49', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(92, 34, 10, 'confirmee', '2026-10-22 11:48:56', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(93, 23, 10, 'confirmee', '2026-10-22 21:12:45', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(94, 15, 10, 'annulee', '2026-11-12 10:33:01', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(95, 28, 11, 'confirmee', '2026-10-20 00:34:11', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(96, 12, 11, 'confirmee', '2026-10-27 17:09:24', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(97, 30, 11, 'confirmee', '2026-10-27 20:21:44', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(98, 38, 11, 'confirmee', '2026-10-28 17:22:59', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(99, 33, 11, 'confirmee', '2026-11-11 11:32:43', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(100, 22, 11, 'confirmee', '2026-10-24 14:18:09', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(101, 20, 11, 'confirmee', '2026-10-21 06:49:01', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(102, 37, 11, 'confirmee', '2026-11-06 09:31:17', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(103, 36, 11, 'annulee', '2026-10-23 15:22:35', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(104, 27, 12, 'confirmee', '2026-10-30 18:01:43', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(105, 17, 12, 'confirmee', '2026-10-23 21:57:02', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(106, 22, 12, 'confirmee', '2026-11-10 16:41:37', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(107, 21, 12, 'confirmee', '2026-10-26 10:13:16', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(108, 29, 12, 'confirmee', '2026-10-17 17:03:49', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(109, 35, 12, 'confirmee', '2026-11-14 16:52:04', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(110, 39, 12, 'confirmee', '2026-10-28 18:01:55', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(111, 16, 13, 'confirmee', '2026-10-19 11:32:01', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(112, 40, 13, 'confirmee', '2026-10-27 01:12:55', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(113, 20, 13, 'confirmee', '2026-11-02 05:27:33', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(114, 23, 13, 'confirmee', '2026-10-19 13:38:12', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(115, 34, 13, 'annulee', '2026-10-19 14:23:42', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(116, 24, 14, 'confirmee', '2026-10-08 17:03:42', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(117, 11, 14, 'confirmee', '2026-09-27 17:55:50', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(118, 33, 14, 'confirmee', '2026-09-28 06:36:45', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(119, 31, 14, 'confirmee', '2026-09-29 23:44:16', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(120, 18, 14, 'confirmee', '2026-09-18 09:41:42', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(121, 34, 14, 'confirmee', '2026-10-12 20:30:59', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(122, 20, 14, 'confirmee', '2026-10-06 11:36:20', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(123, 37, 14, 'confirmee', '2026-10-15 00:11:52', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(124, 28, 14, 'confirmee', '2026-09-19 12:53:44', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(125, 38, 14, 'confirmee', '2026-10-09 21:39:02', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(126, 22, 14, 'confirmee', '2026-09-24 05:28:29', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(127, 25, 14, 'confirmee', '2026-09-24 09:05:08', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(128, 23, 14, 'confirmee', '2026-10-04 23:42:05', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(129, 32, 14, 'confirmee', '2026-09-28 04:57:10', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(130, 17, 14, 'confirmee', '2026-09-21 17:48:25', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(131, 13, 14, 'confirmee', '2026-10-09 13:34:12', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(132, 35, 14, 'confirmee', '2026-10-15 15:08:58', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(133, 36, 14, 'confirmee', '2026-10-01 18:27:10', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(134, 21, 14, 'confirmee', '2026-10-04 10:58:35', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(135, 14, 14, 'confirmee', '2026-09-22 07:05:15', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(136, 40, 14, 'annulee', '2026-10-05 20:32:53', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(137, 26, 14, 'annulee', '2026-10-09 12:54:14', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(138, 19, 15, 'confirmee', '2026-08-09 11:41:05', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(139, 37, 15, 'confirmee', '2026-08-26 06:45:23', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(140, 16, 15, 'confirmee', '2026-08-27 10:09:15', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(141, 40, 15, 'confirmee', '2026-08-16 21:44:39', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(142, 14, 15, 'confirmee', '2026-08-14 06:01:12', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(143, 21, 15, 'confirmee', '2026-08-19 06:28:47', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(144, 23, 15, 'confirmee', '2026-08-27 00:27:53', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(145, 22, 15, 'confirmee', '2026-08-25 11:28:49', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(146, 11, 15, 'confirmee', '2026-08-02 16:43:44', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(147, 20, 15, 'confirmee', '2026-08-17 18:07:21', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(148, 32, 15, 'confirmee', '2026-08-06 09:06:06', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(149, 30, 15, 'confirmee', '2026-07-31 21:23:58', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(150, 39, 15, 'confirmee', '2026-08-23 07:01:05', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(151, 27, 15, 'confirmee', '2026-08-01 13:51:13', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(152, 13, 15, 'confirmee', '2026-08-18 17:53:17', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(153, 36, 15, 'confirmee', '2026-08-09 12:10:14', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(154, 24, 15, 'confirmee', '2026-08-06 12:25:56', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(155, 28, 15, 'confirmee', '2026-07-30 08:19:35', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(156, 26, 15, 'confirmee', '2026-08-17 00:37:23', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(157, 12, 15, 'confirmee', '2026-08-27 23:57:15', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(158, 18, 15, 'confirmee', '2026-08-16 12:05:38', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(159, 3, 15, 'confirmee', '2026-08-20 17:27:30', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(160, 35, 15, 'confirmee', '2026-07-30 07:11:54', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(161, 29, 15, 'confirmee', '2026-08-16 13:30:30', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(162, 15, 15, 'annulee', '2026-08-02 21:47:11', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(163, 31, 15, 'annulee', '2026-08-01 19:48:56', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(164, 18, 16, 'confirmee', '2026-09-13 03:19:35', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(165, 25, 16, 'confirmee', '2026-09-06 17:01:21', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(166, 32, 16, 'confirmee', '2026-09-27 23:31:05', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(167, 14, 16, 'confirmee', '2026-09-21 06:43:13', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(168, 33, 16, 'confirmee', '2026-09-10 05:17:03', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(169, 21, 16, 'confirmee', '2026-08-30 21:14:57', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(170, 15, 16, 'confirmee', '2026-09-17 23:04:19', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(171, 22, 16, 'confirmee', '2026-09-27 14:45:28', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(172, 20, 16, 'confirmee', '2026-09-14 20:47:50', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(173, 24, 16, 'annulee', '2026-09-18 08:42:36', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(174, 23, 16, 'annulee', '2026-09-16 22:29:58', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(175, 22, 17, 'confirmee', '2026-08-12 21:47:52', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(176, 37, 17, 'confirmee', '2026-08-07 03:02:04', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(177, 23, 17, 'confirmee', '2026-08-17 04:53:57', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(178, 15, 17, 'confirmee', '2026-08-05 02:10:50', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(179, 3, 17, 'confirmee', '2026-07-30 06:36:09', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(180, 18, 17, 'confirmee', '2026-08-04 15:36:08', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(181, 26, 17, 'confirmee', '2026-08-10 21:54:52', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(182, 40, 17, 'confirmee', '2026-08-18 20:51:18', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(183, 31, 17, 'confirmee', '2026-08-23 08:59:01', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(184, 11, 17, 'annulee', '2026-08-25 03:51:29', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(185, 19, 17, 'annulee', '2026-08-10 07:57:05', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(186, 12, 18, 'confirmee', '2026-11-03 00:19:42', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(187, 15, 18, 'confirmee', '2026-11-07 22:08:04', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(188, 36, 18, 'confirmee', '2026-10-29 13:47:17', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(189, 17, 18, 'confirmee', '2026-10-15 20:20:54', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(190, 24, 18, 'confirmee', '2026-10-24 00:15:39', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(191, 3, 18, 'confirmee', '2026-10-16 18:19:54', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(192, 39, 18, 'confirmee', '2026-10-21 17:02:27', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(193, 31, 18, 'confirmee', '2026-10-31 18:12:07', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(194, 23, 18, 'annulee', '2026-10-16 09:12:28', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(195, 13, 18, 'annulee', '2026-11-05 17:44:33', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(196, 30, 19, 'confirmee', '2026-08-07 11:37:30', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(197, 20, 19, 'confirmee', '2026-08-11 21:53:46', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(198, 18, 19, 'confirmee', '2026-08-06 12:25:21', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(199, 19, 19, 'confirmee', '2026-09-02 09:37:36', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(200, 26, 19, 'confirmee', '2026-08-15 21:58:35', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(201, 38, 19, 'confirmee', '2026-08-31 21:46:04', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(202, 32, 19, 'confirmee', '2026-08-30 09:47:02', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(203, 37, 19, 'confirmee', '2026-08-22 09:16:19', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(204, 35, 19, 'confirmee', '2026-09-02 00:04:53', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(205, 33, 19, 'confirmee', '2026-08-24 05:06:54', '2026-11-17 00:42:17', '2026-11-17 00:42:17'),
(206, 39, 19, 'confirmee', '2026-08-12 01:52:33', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(207, 31, 19, 'confirmee', '2026-08-10 02:39:32', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(208, 13, 19, 'confirmee', '2026-08-11 12:03:33', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(209, 34, 19, 'confirmee', '2026-08-07 01:45:49', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(210, 40, 19, 'confirmee', '2026-08-18 09:40:37', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(211, 36, 19, 'confirmee', '2026-08-19 12:37:54', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(212, 29, 19, 'confirmee', '2026-08-13 10:55:29', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(213, 12, 19, 'confirmee', '2026-08-16 14:25:26', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(214, 13, 20, 'annulee', '2026-10-26 14:05:21', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(215, 35, 20, 'annulee', '2026-10-22 03:38:03', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(216, 37, 20, 'annulee', '2026-10-22 22:51:16', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(217, 21, 20, 'annulee', '2026-11-10 21:38:05', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(218, 3, 20, 'annulee', '2026-10-28 10:13:33', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(219, 15, 20, 'annulee', '2026-10-22 20:03:00', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(220, 39, 20, 'annulee', '2026-10-30 14:49:55', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(221, 18, 20, 'annulee', '2026-11-07 02:48:00', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(222, 24, 20, 'annulee', '2026-10-26 17:48:01', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(223, 17, 20, 'annulee', '2026-11-15 01:56:29', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(224, 20, 21, 'annulee', '2026-11-15 15:33:10', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(225, 35, 21, 'annulee', '2026-11-15 21:45:29', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(226, 17, 21, 'annulee', '2026-11-12 01:02:27', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(227, 16, 21, 'annulee', '2026-10-23 18:15:28', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(228, 14, 21, 'annulee', '2026-10-31 09:52:58', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(229, 23, 21, 'annulee', '2026-10-19 15:42:42', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(230, 32, 21, 'annulee', '2026-11-01 08:35:06', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(231, 40, 21, 'annulee', '2026-11-11 09:04:15', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(232, 26, 21, 'annulee', '2026-10-29 13:06:24', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(233, 13, 21, 'annulee', '2026-10-31 06:07:51', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(234, 21, 21, 'annulee', '2026-10-20 14:56:31', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(235, 15, 21, 'annulee', '2026-10-27 15:25:32', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(236, 25, 21, 'annulee', '2026-10-22 22:22:48', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(237, 36, 21, 'annulee', '2026-11-06 11:20:33', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(238, 33, 21, 'annulee', '2026-11-15 01:44:22', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(239, 11, 21, 'annulee', '2026-11-02 08:32:42', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(240, 3, 22, 'annulee', '2026-10-26 16:10:09', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(241, 38, 22, 'annulee', '2026-10-30 20:19:28', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(242, 32, 22, 'annulee', '2026-11-09 04:22:14', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(243, 24, 22, 'annulee', '2026-11-08 23:48:40', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(244, 39, 22, 'annulee', '2026-11-09 12:36:51', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(245, 29, 22, 'annulee', '2026-11-14 00:14:43', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(246, 22, 22, 'annulee', '2026-11-13 14:48:10', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(247, 40, 22, 'annulee', '2026-10-31 09:17:24', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(248, 13, 22, 'annulee', '2026-10-21 10:27:39', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(249, 31, 22, 'annulee', '2026-11-02 04:05:29', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(250, 16, 22, 'annulee', '2026-11-09 12:26:29', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(251, 34, 22, 'annulee', '2026-10-27 19:32:50', '2026-11-17 00:42:18', '2026-11-17 00:42:18'),
(252, 23, 22, 'annulee', '2026-11-12 10:47:25', '2026-11-17 00:42:18', '2026-11-17 00:42:18');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--
CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2026_11_16_094028_create_ateliers_table', 1),
(6, '2026_11_16_094121_create_inscriptions_table', 1),
(7, '2026_11_16_111417_make_token_nullable_in_users_table', 1),
(8, '2026_11_16_114445_rename_password_reset_columns_in_users_table', 1),
(9, '2026_11_16_130312_add_password_reset_otp_hash_to_users_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--
CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '3b6624600829d1ab64578f562e198e3d661d6de8dbb12e615f68712da25808bf', '[\"*\"]', '2026-11-17 00:42:45', NULL, '2026-11-17 00:42:41', '2026-11-17 00:42:45');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_otp_hash` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_otp_expires_at` timestamp NULL DEFAULT NULL,
  `role` enum('admin','formateur','participant') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'participant',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `password_reset_otp_hash` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password_reset_otp_expires_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `token`, `email_otp_hash`, `email_otp_expires_at`, `role`, `remember_token`, `created_at`, `updated_at`, `password_reset_otp_hash`, `password_reset_otp_expires_at`) VALUES
(1, 'Admin', 'admin@example.com', '2026-11-17 00:42:16', '$2y$10$vHp2WKUSdqMxnAzSdexGiuu136yKi7t8x4wS9cpQA8bV6sSwpgmo6', NULL, NULL, NULL, 'admin', NULL, '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(2, 'Formateur', 'formateur@example.com', '2026-11-17 00:42:16', '$2y$10$xfLbRr7zzoiHTLvo1CIUn.LHcPh9nXpPyIysFU6X2LhGw6v8ChArq', NULL, NULL, NULL, 'formateur', NULL, '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(3, 'Participant', 'participant@example.com', '2026-11-17 00:42:16', '$2y$10$4TxkJsfWyD5JNnRh62z.P.mTGiaVUnDfrskMa1QQwmzKx93xmZRva', NULL, NULL, NULL, 'participant', NULL, '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(4, 'Marthe Gauthier', 'alfred73@example.net', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'admin', 'pcpYOtdhTW', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(5, 'Nathalie-Stéphanie Lemoine', 'alix31@example.net', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'admin', 'vXixCdRifV', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(6, 'François du Pottier', 'virginie27@example.net', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'formateur', 'uTfPuxVwf6', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(7, 'Olivier Olivier-Potier', 'delannoy.margaud@example.com', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'formateur', 'BSLsuDPInL', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(8, 'Alice de la Levy', 'jean09@example.org', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'formateur', '8eVhCcyPxM', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(9, 'Laurence Fouquet', 'amasse@example.org', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'formateur', 'aC0TENsKye', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(10, 'Jules Richard-Perrier', 'gerard40@example.com', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'formateur', 'XpOsP5dTSs', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(11, 'Arthur Bourdon', 'olivie.didier@example.com', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'NUPrRT0kGb', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(12, 'Zoé Traore', 'olivier.nath@example.org', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'BldKTtHcHT', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(13, 'Sophie de la Blanc', 'caroline.chauvet@example.org', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'O00eNunSqy', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(14, 'Auguste du Guillaume', 'morvan.robert@example.org', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'sZiC6aTfM5', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(15, 'Michelle Grondin-Menard', 'guichard.pierre@example.net', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'jbn7QvwEMC', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(16, 'Alfred Cousin', 'fernandes.alice@example.net', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'GLab7kec9p', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(17, 'Monique Riou', 'amelie41@example.com', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'yDkqMUhK5k', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(18, 'René Besnard', 'theophile.moulin@example.net', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'osqanKg7PW', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(19, 'Amélie Pasquier', 'bguilbert@example.net', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'Vu5MlH9g9E', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(20, 'Étienne Langlois', 'martine.hoareau@example.com', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'Qm0oXW7mwv', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(21, 'Georges Navarro', 'zschmitt@example.org', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'CuJG8WVfGE', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(22, 'Paul Gautier', 'nathalie.moulin@example.net', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'nToT5NLcGk', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(23, 'Margaret Julien', 'olebrun@example.com', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'D7RanwtELF', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(24, 'Juliette Gallet-Berthelot', 'martin.bousquet@example.net', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'Vcj9RR37yS', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(25, 'Guy Levy', 'dossantos.agnes@example.org', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'GBrAFblyPV', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(26, 'Timothée du Gomes', 'mace.charlotte@example.com', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'XB5H1J0cBD', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(27, 'Tristan-Julien Noel', 'slebrun@example.com', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'Bw8t4Lc9Oj', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(28, 'Emmanuel de la Thierry', 'wpinto@example.com', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'hCeMna7x7D', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(29, 'Franck Raynaud', 'garnier.michelle@example.net', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'KAcnqw0ZH5', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(30, 'Margot Hubert', 'stephane71@example.org', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'bb6dEhENgP', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(31, 'Rémy Blot', 'gpierre@example.org', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'WflCbCjGt0', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(32, 'Thomas Girard', 'roland.boutin@example.net', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', '1b9WYyp0Wx', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(33, 'Pénélope Paris', 'yves.delattre@example.net', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'wMFlmEGT2A', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(34, 'Eugène Gosselin-Merle', 'marchal.gilbert@example.org', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'drSuFWoEuL', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(35, 'Roland-Raymond Roussel', 'christiane.legoff@example.net', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'eUz5XP5XgI', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(36, 'Auguste-Jacques Ferrand', 'gabrielle66@example.org', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'YpDt7aOsJ0', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(37, 'Timothée Delorme', 'hugues.mace@example.com', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'RdgGBIU5KW', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(38, 'Odette Garcia', 'blanchard.arnaude@example.com', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'ukaecJ4V7A', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(39, 'Luc Marie', 'caron.sabine@example.org', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', '1BNuPQuHJi', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(40, 'Pierre Lecomte', 'bmarion@example.com', '2026-11-17 00:42:16', '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'u2hwsHIc07', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(41, 'François Jourdan', 'aurelie57@example.org', NULL, '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'fIeUS5ss1F', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(42, 'Bertrand-Louis Seguin', 'stephanie.leblanc@example.org', NULL, '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'JkLPXGLPUE', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL),
(43, 'Gérard Ruiz', 'desousa.thierry@example.org', NULL, '$2y$10$Z/pqzn2VKvKcBDr7U1WX3.dhv9MzRjPpO9JNxHbqmNAX.oZWSFWQ2', NULL, NULL, NULL, 'participant', 'cSxc5SAc9i', '2026-11-17 00:42:16', '2026-11-17 00:42:16', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ateliers`
--
ALTER TABLE `ateliers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ateliers_formateur_id_foreign` (`formateur_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `inscriptions`
--
ALTER TABLE `inscriptions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `inscriptions_user_id_atelier_id_unique` (`user_id`,`atelier_id`),
  ADD KEY `inscriptions_atelier_id_foreign` (`atelier_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ateliers`
--
ALTER TABLE `ateliers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inscriptions`
--
ALTER TABLE `inscriptions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=253;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ateliers`
--
ALTER TABLE `ateliers`
  ADD CONSTRAINT `ateliers_formateur_id_foreign` FOREIGN KEY (`formateur_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `inscriptions`
--
ALTER TABLE `inscriptions`
  ADD CONSTRAINT `inscriptions_atelier_id_foreign` FOREIGN KEY (`atelier_id`) REFERENCES `ateliers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inscriptions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
