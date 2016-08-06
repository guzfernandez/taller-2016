CREATE EXTENSION postgis;
CREATE EXTENSION fuzzystrmatch;

CREATE TABLE public.points
(
  id integer NOT NULL,
  description character varying(255) NOT NULL,
  location GEOGRAPHY(POINT,4326),
  CONSTRAINT points_primary_key PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);


<<<<<<< Updated upstream
INSERT INTO points(descripcion, location) VALUES('CEI', ST_GeomFromText('POINT(-34.905456 -54.955609)', 4326));
INSERT INTO points(descripcion, location) VALUES('Capuchinas', ST_GeomFromText('POINT(-34.905451 -54.95687)', 4326));
INSERT INTO points(descripcion, location) VALUES('DanielHogar', ST_GeomFromText('POINT(-34.906497 -54.956533)', 4326));
commit;
=======
INSERT INTO points(id, description, location) VALUES(1, 'llllll', ST_GeomFromText('POINT(-71.060316 48.432044)', 4326));
commit;

CREATE TABLE check
(
idUser integer NOT NULL,
idPoint integer NOT NULL,
date timestamp NOT NULL,
CONSTRAINT check_primary_key PRIMARY KEY (idUser, idPoint, date)
)

host:3000/api/check/values?lat=32432&lng=342312
host:3000/api/check/miId/idPOint/date
