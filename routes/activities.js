module.exports = app => {
    const db = app.db;

    app.route("/activities")
        .get((req, res) => {
            db.knex("activities").select("*").then(results => res.json(results));
        })
        .post((req, res) => {

            const body = req.body;

            db.knex("activities").insert({
                instructor_id: body.instructor_id,
                station_id: 1,
                description: body.activity,
                activity_type: body.activity_type,
                start_date: "2018-07-15 10:20:12",
                end_date: "2018-07-15 10:50:12"

            }).then(re => {
                res.json(re);
            });

        })


};
