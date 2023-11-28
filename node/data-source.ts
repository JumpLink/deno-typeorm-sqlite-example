import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import * as BetterSQLite from "better-sqlite3"

import type { BetterSqlite3ConnectionOptions } from "typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions"

export const AppDataSource = new DataSource({
    type: "better-sqlite3", // The Node.js better-sqlite3` package is similar to the Deno `sqlite3` package.
    database: "node/database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
    driver: (dbFileName: string, options: any) => {
        const db = new BetterSQLite(dbFileName, options);

        // Original methods
        const originals = {
            exec: db.exec.bind(db),
            prepare: db.prepare.bind(db),
        }

        // Wrap methods for debugging

        db.exec = (sql: string) => {
            console.log("exec: ", sql);
            const res = originals.exec(sql);
            console.log("res: ", res);
            return res;
        }

        db.prepare = (sql: string) => {
            console.log("prepare: ", sql);
            const res = originals.prepare(sql);
            console.log("res: ", res);
            return res;
        }

        return db;
    },
})