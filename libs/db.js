import Knex from "knex";
let db=null;

module.exports= app => {
if (!db) {

    const knex = new Knex({
        "client": "mysql",
        timezone: 'UTC',
        "connection": {
            "host": "127.0.0.1",
            "user": "root",
            "password": "paraguay",
            "database": "cbvaDb",
            timezone: 'UTC'

        },
        "debug": false,


    });

  db={
      knex
  }
}
 return db;

};
