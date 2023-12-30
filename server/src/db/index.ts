import pg from "pg";

const pool = new pg.Pool();

export const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

export const getClient = () => {
  return pool.connect();
};
