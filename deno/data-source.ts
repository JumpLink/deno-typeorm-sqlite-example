import "npm:reflect-metadata"
import { DataSource } from "npm:typeorm"
import { User } from "./entity/User.ts"
import { Database } from "https://deno.land/x/sqlite3/mod.ts"

import type { BetterSqlite3ConnectionOptions } from "npm:typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions.d.ts"
import type { DatabaseOpenOptions, RestBindParameters } from "https://deno.land/x/sqlite3/mod.ts"


export const AppDataSource = new DataSource({
    type: "better-sqlite3", // The Node.js better-sqlite3` package is similar to the Deno `sqlite3` package.
    database: "deno/database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
    driver: (dbFileName: string, _options: BetterSqlite3ConnectionOptions) => {
        const options: DatabaseOpenOptions = {
            readonly: _options.readonly,
            create: !_options.fileMustExist,
            // timeout: _options.timeout,
            // verbose: _options.verbose,
        }
        const db = new Database(dbFileName, options);

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