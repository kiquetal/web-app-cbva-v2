module.exports = app => {
     const db=app.db;
     /**
       @apiDefine version 0.0.1
      */
    /**
     * @api {get} /firefighters All Firefighters list
     * @apiGroup Firefighters
     * @apiVersion 0.0.1
     * @apiParam {String} q Name
     * @apiSuccess {Number} id Firefighter id
     * @apiSuccess {Number} ba Bombero Asuncion number
     * @apiSuccess {Date} swore_date Date of swore
     * @apiSuccess {Number} person_id Id from table Person
     * @apiSuccess {Date} update_date Update Date
     * @apiSuccess {Number} rank_id Id from rank
     * @apiSuccess {Number} active Status firefighter
     * @apiSuccessExample {json} Success
     *     HTTP/1.1 200 OK
     *     {
             *       "id": 513,
             *       "ba": 1,
             *       "swore_date": null,
             *       "person_id": 1,
             *       "update_date": null,
             *       "rank_id": 2,
             *       "active": 1
             *
     *       }
     */
     app.route("/firefighters")
	.get((req,res)=>{

        let query = req.query.q;
        if (query != null) {
            console.log("buscando query" + query);
            db.knex("firefighter")
                .join("person  as p", "p.id", "firefighter.person_id")
                .join("rank as k", "k.id", "firefighter.rank_id")
                .where('name', 'like', "%" + query + "%")
                .select("p.name as name ", "k.acronim as rango", "firefighter.active as status", "firefighter.ba as ba").then(firefighter => {
                /*  let data=[];
                     firefighter.map((f)=>{
                      data.push(f);
                  });
                     res.json({"result":data});
                 */
                if (firefighter.length < 1) res.status(404).json({"result": "not found"});
                else
                    res.json({"result": firefighter})
            });
        }
        else

            db.knex("firefighter").select("*").then(row => { res.json({"results":row})});
	});
    /**
     * @api {get} /firefighters/:ba  Details from Firefighter
     * @apiParam {Number} ba Firefighter unique ID.
     * @apiGroup Firefighters
     * @apiSuccess {Number} id Firefighter id
     * @apiSuccess {String} name Name from table Person
     * @apiSuccess {String} rango Acronim from table Rank
     * @apiSuccess {Number} status Current Status
     * @apiSuccessExample {json} Success
     *     HTTP/1.1 200 OK
     *     {
            * "id": 513,
            * "name": "Tomas Florentin",
            * "rango": "RESERVA",
            * "status": 1
            *
     *      }
     */

    app.route("/firefighters/:ba")
        .get((req,res)=>{
           db.knex("firefighter")
               .join("person  as p","p.id","firefighter.person_id")
               .join("rank as k","k.id","firefighter.rank_id")
               .where({ba:req.params.ba})
               .select("p.name as name ","k.acronim as rango","firefighter.active as status").then(firefighter => {
              /*  let data=[];
                   firefighter.map((f)=>{
                    data.push(f);
                });
                   res.json({"result":data});
               */
               if (firefighter.length<1) res.status(404).json({"result":"not found"});
               res.json({"result":firefighter})
               });
               //.select("*").where({ba:req.params.ba}).then(firefighter => res.json({"result":firefighter}));
        });

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
        .get((req,res)=>{
           db.knex("person").select("*").then(persons=>res.json({"result":persons}));
        });

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
        .get((req,res)=>{
            db.knex("person").select("*")
                .where({"id":req.params.id})
                .then(persons=>res.json({"result":persons}));
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

        .put((req,res)=>{
            const p=req.body;
            let name=p.name;
            let cin=p.cin;
            db.knex("person").update({name:name,cin:cin}).where({id:req.params.id}).then(update=> res.json(update));
        });


    /**
     * @api {get} /ranks  All ranks
     * @apiGroup Ranks
     * @apiSuccess {Number} id Rank id
     * @apiSuccess {String} acronim  Acronimd
     * @apiSuccess {String} description Description for Rank
     * @apiSuccessExample {json} Success
     *     HTTP/1.1 200 OK
     *     {
        "id": 1,
        "acronim": "BVC",
        "description": null

     *     }
     */

   app.route("/ranks")
       .get((req,res) => {
          db.knex("rank").select("*").then(ranks=> res.json(ranks));
       });

    /**
     * @api {get} /ranks/:rank_id  Get specific rank
     * @apiParam {Number} rank_id Identification's rank
     * @apiGroup Ranks
     * @apiSuccess {Number} id Rank id
     * @apiSuccess {String} acronim  Acronimd
     * @apiSuccess {String} description Description for Rank
     * @apiSuccessExample {json} Success
     *     HTTP/1.1 200 OK
     *     {
        "id": 1,
        "acronim": "BVC",
        "description": null

     *     }
     */

    /**
     * @api {put} /ranks/:rank_id  Update rank
     * @apiParam {Number} rank_id Identification's rank
     * @apiGroup Ranks
     * @apiParam {String} acronim User name
     * @apiParam {String} description User email

     * @apiParamExample {json} Input
     *    {
         *      "acronim": "Combate",
         *      "description":"Rango basico"
         *    }

     * @apiSuccess {Number} id Rank id
     * @apiSuccess {String} acronim  Acronimd
     * @apiSuccess {String} description Description for Rank
     * @apiSuccessExample {json} Success
     *     HTTP/1.1 200 OK
     *     {
        "id": 1,
        "acronim": "BVC",
        "description": null

     *     }
     */
    app.route("/ranks/:rank_id")
        .get((req,res) => {
            db.knex("rank").where({"id":req.params.rank_id}).select("*").then(ranks=> {
                if (ranks.length<1)
                {
                    res.status(404).json({"message":"rank not found"});
                }
                else
                res.json(ranks)

            });
        })
        .put((req,res)=>{
         let acronim=req.body.acronim;
         let description=req.body.description;
         db.knex("rank").update({acronim:acronim,description:description}).where({"id":req.params.rank_id}).then(rank => {
            res.json(rank);
         });
        });

};
