import express from "express";
import consign from "consign";

const app=express();

consign()
	.include("db.js")
	.include("libs/middlewares.js")
	.include("routes")
	.include("libs/boot.js")
	.into(app);
