LOAD DATA LOCAL INFILE '/home/kiquetal/Documents/codes/2018/cbva-projects/database/source.csv' INTO TABLE person FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' (@dummy,name,cin,birth_date);


LOAD DATA LOCAL INFILE '/home/kiquetal/Documents/codes/2018/cbva-projects/database/source.csv' INTO TABLE tmp_import FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' (@ba,@name,@tres,@cuatro,@cinco,@seis,rank_name);


LOAD DATA LOCAL INFILE '/home/kiquetal/Documents/codes/2018/cbva-projects/database/source.csv' INTO TABLE firefighter_temp FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' (ba,name,@cin,@re,@as,@tr,rank);

INSERT INTO firefighter (ba, person_id, rank_id) 
(SELECT ftemp.ba,p.id,r.id  FROM firefighter_temp as ftemp JOIN PERSON as p ON p.name = ftemp.name 
        JOIN rank as r ON r.acronim=ftemp.rank
);
INSERT INTO person SELECT * FROM PERSON;

INSERT INTO  rank(acronim) SELECT DISTINCT(rank_name) FROM tmp_import;
CREATE TEMPORARY TABLE tmp_person(name varchar(100),cin varchar(12));
INSERT INTO person(name,cin) SELECT (name,cin) from tmp_person;


   #export database

 mysqldump -u mysql_user -p DATABASE_NAME > backup.sql
 
  #import database
 mysql -u mysql_user -p DATABASE < backup.sql
