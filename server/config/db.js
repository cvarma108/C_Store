import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const { PGDATABASE, PGHOST, PGPASSWORD, PGUSER } = process.env;
//Creates connection to sql with our environment varialbles
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);
//this sql function we export is used as a tagged template literal,which allows us to write sql queries safely
