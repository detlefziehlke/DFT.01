drop table if exists Infotype;
CREATE TABLE `Infotype` (
	`Id`	integer NOT NULL,
	`Name`	varchar(50) NOT NULL,
	PRIMARY KEY(Id)
);

INSERT INTO `Infotype` (Id,Name) VALUES
 (1,'Fixkosten'),
 (2,'ATZ Abweichung'),
 (3,'Investion'),
 (4,'Anschaffung'),
 (5,'Umzug'),
 (6,'Bildung'),
 (7,'Instandhaltung'),
 (11,'Kandidat'),
 (22,'Standard Haushalt');
