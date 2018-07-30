import moment from "moment";
import _ from "lodash";
module.exports = app => {
    const db = app.db;

    app.route("/activities")
        .get((req, res) => {
            db.knex("activity")
                .join("station as s", "s.id", "activity.station_id")
                .join("activity_type as act", "act.id", "activity.activity_type")
                .select("activity.*", "act.name_type_activity", "s.name as station_name").then(results => {

                var newMap = results.map(r => {
                        r["start_date"]=moment(r["start_date"]).format("YYYY-MM-DDTHH:mm:ss");
                        r["end_date"]=moment(r["end_date"]).format("YYYY-MM-DDTHH:mm:ss");
                    return {
                        "id": r["id"],
                        "description": r["description"],
                        "start_date": r["start_date"],
                        "end_date": r["end_date"],
                        "type_activity": r["name_type_activity"],
                        "station": r["station_name"]
                    };
                });
                res.json(newMap);
            })
            })
        .post((req, res) => {

            const body = req.body;

            db.knex("activity").insert({
                station_id: body.station_id,
                label_activity:body.label_activity,
                description: body.description,
                activity_type: body.activity_type,
                start_date: moment(body.start_date, "YYYY-MM-DDTHH:mm:ss").isValid() ? moment(body.start_date, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD HH:mm:ss") : null,
                end_date: moment(body.end_date, "YYYY-MM-DDTHH:mm:ss").isValid() ? moment(body.end_date, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD HH:mm:ss") : null

            }).then(re => {
                res.json(re);
            }).catch( e =>{
                res.json({"error":e.toLocaleString()});
            });

        })

    app.route("/activities/:activity_id/instructors")
        .get((req, res) => {
            db.knex("activity")
                .join("instructor_activity  as ins_a", "ins_a.activity_id", "activity.id")
                .leftJoin("person as p", "p.id", "ins_a.instructor_id")
                .leftJoin("firefighter as f", "p.id", "f.person_id")
                .where({"activity.id": req.params.activity_id})
                .select("p.name as name ", "f.ba", "activity.label_activity", "activity.description", "activity.start_date", "activity.end_date", "p.id as person_id").then(instructors => {

                var objResponse = instructors.reduce((acc, obj) => {

                    acc["instructors"].push({
                        "person_id": obj["person_id"],
                        "ba": obj["ba"]
                        , "name": obj["name"]
                    });
                    return acc;


                }, {"instructors": []});
                if (instructors.length < 1) {
                    res.status(404).json({"result": "No registered instructors for activity " + req.params.activity_id});
                }
                else
                    res.json({"result": objResponse})
            });


        })
        .post((req, res) => {
            let activity_id = req.params.activity_id;
            console.log(JSON.stringify(req.body));
            db.knex("instructor_activity").insert({
                "instructor_id": req.body.instructor_id,
                "activity_id": activity_id,
                "start_activity": moment(req.body.start_activity, "YYYY-MM-DDTHH:mm:ss").isValid() ? moment(req.body.start_activity, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD HH:mm:ss") : null,
                'end_activity': moment(req.body.end_activity, "YYYY-MM-DDTHH:mm:ss").isValid() ? moment(req.body.end_activity, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD HH:mm:ss") : null
            }).then(result => {
                res.json(result);
            }).catch(e => {
                res.json({"error": e.toLocaleString()});
            });

        })
        .put((req, res) => {


        })

    app.route("/activities/:activity_id")
        .get((req,res)=>{
            const activity_id=req.params.activity_id;


            db.knex("activity")
                .join("station as s", "s.id", "activity.station_id")
                .leftJoin("instructor_activity  as ins_a", "ins_a.activity_id", "activity.id")

                .leftJoin("person as p", "p.id", "ins_a.instructor_id")

                .where({"activity.id": req.params.activity_id})
                .select("p.name as name ", "s.name as station_name", "activity.label_activity", "activity.description", "activity.start_date", "activity.end_date").then(instructors => {

                var objResponse = instructors.reduce((acc, obj) => {

                    if (!acc["start_date"] && !acc["end_date"] && !acc["label_activity"]) {
                        acc["start_date"] = moment(obj["start_date"], "YYYY-MM-DDTHH:mm:ss").format();
                        acc["end_date"] = moment(obj["end_date"], "YYYY-MM-DDTHH:mm:ss").format();
                        acc["label_activity"] = obj["label_activity"];
                        acc["station_name"] = obj["station_name"]
                    }
                    console.log(acc);
                    acc["instructor"].push(obj["name"]);
                    return acc;


                }, {"instructor": []});
                if (instructors.length < 1) {
                    res.status(404).json({"result": "not found"});
                }
                else
                    res.json({"result": objResponse})
            });

        })
        .put((req,res)=>{
            const activity_id = req.params.activity_id;
            const body = req.body;
            console.log(moment(body.start_activity, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD HH:mm:ss"));
            db.knex("activity")
                .where({"activity.id": activity_id})
                .update({
                    station_id: body.station_id,
                    label_activity: body.label_activity,
                    description: body.description,
                    activity_type: body.activity_type,
                    start_date: moment(body.start_activity, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD HH:mm:ss"),
                    end_date: moment(body.end_activity, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD HH:mm:ss")

                }).then(re => {
                res.json(re);
            }).catch(e => {
                res.json({"error": e.toLocaleString()});
            });
        })
        .delete((req,res)=>{
            const activity_id = req.params.activity_id;
            db.knex("activity")
                .where({"activity.id": activity_id})
                .del().then(r => {
                res.json(r);
            }).catch(e => {
                res.json({"error": e.toLocaleString()});
            })
        })


};
