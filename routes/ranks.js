module.exports = app => {
    const db = app.db;

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
        .get((req, res) => {
            db.knex("rank").select("*").then(ranks => res.json(ranks));
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
        .get((req, res) => {
            db.knex("rank").where({"id": req.params.rank_id}).select("*").then(ranks => {
                if (ranks.length < 1) {
                    res.status(404).json({"message": "rank not found"});
                }
                else
                    res.json(ranks)

            });
        })
        .put((req, res) => {
            let acronim = req.body.acronim;
            let description = req.body.description;
            db.knex("rank").update({
                acronim: acronim,
                description: description
            }).where({"id": req.params.rank_id}).then(rank => {
                res.json(rank);
            });
        });
}
