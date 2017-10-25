// import "babel-polyfill";
// import { express } from "express";


const express = require('express');
const app = express();

import { recipeRoute } from "../routes/recipes";

app.use('/api/v1/recipes', recipeRoute);


app.listen(3000, () => {
	console.log('listening to port 3000');
})