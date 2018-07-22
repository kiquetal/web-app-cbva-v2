import Knex from "knex";
import moment from "moment"
let db=null;

module.exports= app => {
if (!db) {

    const knex = new Knex({
        "client": "mysql",
        "connection": {
            host: "127.0.0.1",
            user: "root",
            password: "paraguay",
            database: "cbvaDb",
            timezone: '+00:00'



        },
        "debug": false,


    });

  db={
      knex
  }
}
 return db;

};
