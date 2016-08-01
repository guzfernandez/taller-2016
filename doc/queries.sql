SELECT * FROM points as p
  WHERE ST_DWithin(
    p.location,
    Geography(ST_MakePoint(-35.060316, -55.432044)),
    60000
  );

CREATE SEQUENCE public.persona_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE SEQUENCE public.points_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE TABLE public.persona
(
  id integer NOT NULL DEFAULT nextval('persona_id_seq'::regclass),
  nombre character varying(40) NOT NULL,
  puntaje integer NOT NULL DEFAULT 0,
  CONSTRAINT persona_pkey PRIMARY KEY (id)
);

CREATE TABLE public.points
(
  id integer NOT NULL DEFAULT nextval('points_id_seq'::regclass),
  descripcion character varying(40) NOT NULL,
  location geography(Point,4326)
)
;