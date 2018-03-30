CREATE DATABASE `Kram`;


USE `Kram`;


CREATE TABLE `Kram`.`User`
(
 `userId`       INT NOT NULL AUTO_INCREMENT,
 `email`       TEXT NOT NULL ,
 `fullName`      TEXT NOT NULL ,
 `password`       TEXT NOT NULL ,

PRIMARY KEY (`userId`)
);

CREATE TABLE `Kram`.`Item`
(
 `itemId`     INT NOT NULL AUTO_INCREMENT,
 `userId` INT NOT NULL ,
 `name`    TEXT NOT NULL ,
 `quantity`    INT NOT NULL ,
 `price`    FLOAT ,
 `location`    TEXT ,
 `notes`    TEXT ,

PRIMARY KEY (`itemId`),
FOREIGN KEY (`userId`) REFERENCES `Kram`.`User` (`userId`)
);

-- -- 
-- INSERT INTO `User` ( `email`, `fullName`, `password`)
-- VALUES ( "ryan13999@mail.com", "Ryan Pavsek", "qwerty" ), ( "johndoe@mail.com", "John Doe", "1234" );
-- -- 
-- INSERT INTO `Item` (  `userId`, `name`, `quantity`, `price`, `location`, `notes`) 
-- VALUES ( 1, "Table", 1, 99.99, "Dining Room", "This is a table note." ), ( 1, "Chair", 4, 29.99, "Dining Room", "This is a table note." ),
-- ( 1, "TV", 1, 999.99, "Living Room", "This is a table note." ), ( 1, "Bed", 4, 799.99, "Bed Room", "This is a table note." ),
-- ( 2, "TV", 1, 799.99, "Living Room", "This is a table note." ), ( 2, "Bed", 4, 599.99, "Bed Room", "This is a table note." );
