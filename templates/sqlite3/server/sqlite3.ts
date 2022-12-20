import sqlite3 from "sqlite3";
import {resolve} from "path";

const sqliteDB = new sqlite3.Database(resolve("/", "tmp", "db.db"));

export default sqliteDB;
