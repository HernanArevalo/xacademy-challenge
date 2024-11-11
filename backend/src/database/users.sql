DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `male_player_id` int DEFAULT NULL,
  `female_player_id` int DEFAULT NULL
);