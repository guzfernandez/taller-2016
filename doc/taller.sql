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


INSERT INTO points(descripcion, location) VALUES('CEI', ST_GeomFromText('POINT(-34.905456 -54.955609)', 4326));
INSERT INTO points(descripcion, location) VALUES('Capuchinas', ST_GeomFromText('POINT(-34.905451 -54.95687)', 4326));
INSERT INTO points(descripcion, location) VALUES('DanielHogar', ST_GeomFromText('POINT(-34.906497 -54.956533)', 4326));
commit;