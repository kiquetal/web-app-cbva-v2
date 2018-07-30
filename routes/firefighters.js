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
                .select("p.name as name ", "k.acronim as rango", "firefighter.active as status", "firefighter.ba as ba", "p.id as person_id").then(firefighter => {
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





};
