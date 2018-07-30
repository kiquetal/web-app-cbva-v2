import moment from "moment";
module.exports = app => {
    const db = app.db;

    app.route("/attendances")
        .get((req, res) => {
            db.knex("attendance_activity").select("*").then(results => {
//                console.log(moment(results[10].start_date).zone("00:00").format());
                results.forEach( r =>{
                    r["start_activity"] = moment(r["start_activity"]).format("YYYY-MM-DDTHH:mm:ss");
                    r["end_activity"] = moment(r["end_activity"]).format("YYYY-MM-DDTHH:mm:ss");
                });
                res.json(results);
            })
        })
        .post((req, res) => {

            const body = req.body;
            db.knex("attendance_activity").insert({
                person_id: body.person_id,
                activity_id: body.activity_id,
                start_activity: moment(body.start_date, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD HH:mm:ss"),
                end_activity: moment(body.end_date, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD HH:mm:ss")
            }).then(re => {
                res.json(re);
            }).catch( e =>{
                res.json({"error":e.toLocaleString()});
            });

        })


};
