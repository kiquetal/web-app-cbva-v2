import moment from "moment";

module.exports = app => {
    const db = app.db;

    /**
     * @api {get} /persons All persons
     * @apiGroup Persons
     * @apiSuccess {Number} id Person id
     * @apiSuccess {String} name  Person's name
     * @apiSuccess {cin} cin Identification NUmber
     * @apiSuccessExample {json} Success
     *     HTTP/1.1 200 OK
     *      {
     *         "id": 1,
     *         "name": "Pedro Jaime Logan Keene",
     *         "cin": ""
     *      }
     */

    app.route("/persons")
        .get((req, res) => {
            db.knex("person").select("*").then(persons => res.json({"result": persons}));
        });


    app.route("/persons/:person_id/attendances")
        .get((req, res) => {
            console.log(req.params.person_id);
            db.knex("attendance_activity")
                .join("activity as activity", "activity.id", "attendance_activity.activity_id")
                .join("station as s", "s.id", "activity.station_id")
                .leftOuterJoin("instructor_activity  as ins_a", "ins_a.activity_id", "activity.id")
                .join("person as p", "p.id", "attendance_activity.person_id")
                .leftOuterJoin("firefighter as f", "f.person_id", "attendance_activity.person_id")
                .where({"attendance_activity.person_id": req.params.person_id})
                .select("p.name as name ", "f.ba", "s.name as station_name", "activity.id as activity_id", "activity.label_activity as actividad", "attendance_activity.present", "attendance_activity.is_instructor", "activity.description", "attendance_activity.start_activity as start_date", "attendance_activity.end_activity as end_date").groupBy("activity.id").then(attendances => {

                var reduceAttedances = attendances.reduce((acc, obj) => {

                        if (!acc["name"]) {
                            acc["name"] = obj["name"];
                            acc["ba"] = obj["ba"];
                        }

                        acc["attendances"].push({
                            "station": obj["station"],
                            "activity": obj["activity_name"],
                            "activity_id": obj["activity_id"],
                            "present": obj["present"],
                            "is_instructor": obj["is_instructor"],
                            "description": obj["description"],
                            "start_date": moment(obj["start_date"], "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss"),
                            "end_date": moment(obj["end_date"], "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss")
                        })

                        return acc;

                    }

                    , {"name": null, "attendances": [], "ba": null});

                res.json(reduceAttedances);

            }).catch(e => {
                res.json({"error": e.toLocaleString()});
            });
        })
        .post((req, res) => {


        }).catch(e => {
        res.json({"error": e.toLocaleString()})
    })

    /**
     * @api {get} /persons/:id  Details from Person
     * @apiParam {Number} id Unique person id.
     * @apiGroup Persons
     * @apiSuccess {Number} id Person id
     * @apiSuccess {String} name  Person's name
     * @apiSuccess {cin} cin Identification NUmber
     * @apiSuccessExample {json} Success
     *     HTTP/1.1 200 OK
     *     {
            "id": 3,
            "name": "Amado Adolfo Sanabria Flecha",
            "cin": ""
     *     }
     */


    app.route("/persons/:id")
        .get((req, res) => {
            db.knex("person").select("*")
                .where({"id": req.params.id})
                .then(persons => res.json({"result": persons}));
        })

        /**
         * @api {put} /persons/:id Update details from Person
         * @apiParam {Number} id Unique person id.
         * @apiGroup Persons
         * @apiParam {String} name User name
         * @apiParam {String} email User email
         * @apiParam {String} password User password
         * @apiParamExample {json} Input
         *    {
         *      "name": "John Connor",
         *      "cin":"2321312"
         *    }
         * @apiSuccess {Number} id Person id
         * @apiSuccess {String} name  Person's name
         * @apiSuccess {String} cin Identification NUmber
         * @apiSuccessExample {json} Success
         *     HTTP/1.1 200 OK
         *     {
         *      "id": 3,
         *      "name": "Amado Adolfo Sanabria Flecha",
         *      "cin": ""
         *     }
         */

        .put((req, res) => {
            const p = req.body;
            let name = p.name;
            let cin = p.cin;
            db.knex("person").update({
                name: name,
                cin: cin
            }).where({id: req.params.id}).then(update => res.json(update));
        });

}