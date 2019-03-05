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
	.options((req,res)=>{
           res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'PATCH, POST, PUT, OPTIONS')
   res.header('Access-Control-Allow-Headers','Content-Type, X-Total-Count, Authorization')
   res.header('Access-Control-Expose-Headers','X-Total-Count')
	res.send(200);		
	})
        .get((req, res) => {
            let totalRecords=0;
            let filter=JSON.parse(req.query.filter);
            console.log(filter);
            let {q: query}=filter;
            if (!query) query="";
            let range=JSON.parse(req.query.range);
            console.log("range" + JSON.stringify(range) + "typeof "+ typeof  range);
            let [page,perPage]=range;
            console.log(page)
            console.log(perPage);

            db.knex("person").count("* as total").then(persons =>{
                console.log(persons);
                totalRecords=persons[0]["total"];

            });

            if (query.length>0) {
                console.log("no query for filter");
                db.knex("person").select("*").offset(page).limit(perPage + page + 1).where('name','like',`%${query}%`).then(persons => {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header('Access-Control-Expose-Headers', 'X-Total-Count,Content-Range');
                    //   res.header('X-Total-Count',totalRecords);

                    res.header('Content-Range', `items ${page}-${perPage}/${totalRecords}`);
                    //   res.json({"result": persons} );
                    res.json(persons);
                    //res.header('X-Total-Count',persons.length)
                });
            }
            else {
                console.log("Page from query" + page + "per page "+ perPage + "diff"+ (perPage-page + 1));
                db.knex("person").select("*").offset(page).limit(perPage-page+1).then(persons => {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header('Access-Control-Expose-Headers', 'X-Total-Count,Content-Range');
                    //   res.header('X-Total-Count',totalRecords);

                    res.header('Content-Range', `items ${page}-${perPage}/${totalRecords}`);
                    //   res.json({"result": persons} );
                    res.json(persons);

                });
            }
        })
        .post((req, res) => {
            db.knex("person").insert(req.body).then(r => {
                res.json(r);
            }).catch(e => {
                res.json({"error": e.toLocaleString()})
            })
        });

    /**
     * @api {get} /persons/:person_id/attendances Attendances by PersonId
     * @apiParam {Number} person_id Person unique ID.
     * @apiGroup Persons
     * @apiSuccess {Name} name person name
     * @apiSuccess {Object[]} attendances
     * @apiSuccess {Number} attendances.activity_id Person id
     * @apiSuccess {Number} attendances.present  Person\s name
     * @apiSuccess {Number} attendances.is_instructor If person is instructor in this activity
     * @apiSuccess {String} attendances.description Description of activity,
     * @apiSuccess {String} attendances.start_date Start date of activity.
     * @apiSuccess {String} attendances.end_date End date of activity for this person
     * @apiSuccess {ba} ba If this person is a firefighter should have a ba identification.
     * @apiSuccessExample {json} Success
     *     HTTP/1.1 200 OK
     {
    "name": "SENAD INSTRUCTOR 1",
    "attendances": [
        {
            "activity_id": 1,
            "present": 0,
            "is_instructor": 1,
            "description": "probando put",
            "start_date": "2018-07-22T21:12:32",
            "end_date": "2018-07-22T21:38:21"
        },
        {
            "activity_id": 2,
            "present": 0,
            "is_instructor": 0,
            "description": "Actualizando actividad",
            "start_date": "Invalid date",
            "end_date": "Invalid date"
        }
    ],
    "ba": null
}
     */



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
                .select("p.name as name ", "f.ba","s.name as station_name", "activity.id as activity_id", "activity.label_activity as actividad", "attendance_activity.present", "attendance_activity.is_instructor", "activity.description", "attendance_activity.start_activity as start_date", "attendance_activity.end_activity as end_date").groupBy(["activity.id","f.ba"]).then(attendances => {

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
