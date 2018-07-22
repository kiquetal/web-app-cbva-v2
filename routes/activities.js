import moment from "moment";
module.exports = app => {
    const db = app.db;

    app.route("/activities")
        .get((req, res) => {
            db.knex("activity").select("*").then(results => {
//                console.log(moment(results[10].start_date).zone("00:00").format());
                    results.forEach( r =>{
                        r["start_date"]=moment(r["start_date"]).format("YYYY-MM-DDTHH:mm:ss");
                        r["end_date"]=moment(r["end_date"]).format("YYYY-MM-DDTHH:mm:ss");
                    });
                res.json(results);
            })
            })
        .post((req, res) => {

            const body = req.body;

            db.knex("activity").insert({
                station_id: 1,
                label_activity:body.label_activity,
                description: body.description,
                activity_type: body.activity_type,
                start_date: moment(body.start_date,"YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD HH:mm:ss"),
                end_date: moment(body.end_date,"YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD HH:mm:ss")

            }).then(re => {
                res.json(re);
            }).catch( e =>{
                res.json({"error":e.toLocaleString()});
            });

        })

    app.route("/activities/:activity_id")
        .get((req,res)=>{
            const activity_id=req.params.activity_id;
            db.knex("activity").where({id:activity_id}).then(results=> res.json(results)).catch(e=>{
                res.json({"error":e.toLocaleString()})
            })
        })
        .put((req,res)=>{

            


        })
        .delete((req,res)=>{

        })


};
