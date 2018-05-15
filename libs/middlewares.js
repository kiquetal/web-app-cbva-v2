import bodyParse from "body-parser";
import express from "express";

module.exports= app =>{

	app.set("port",3000);
	app.set("json spaces",4);
	app.use(bodyParse.json());
	app.use(express.static("public"));

};
