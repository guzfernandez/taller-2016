SELECT * FROM points as p
  WHERE ST_DWithin(
    p.location,
    Geography(ST_MakePoint(-35.060316, -55.432044)),
    60000
  );