import pg, { QueryConfig } from "pg";

const pool = new pg.Pool();

export const query = (config: QueryConfig) => {
  return pool.query(config);
};

export const getClient = () => {
  return pool.connect();
};
