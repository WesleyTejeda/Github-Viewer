const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const server = express();
const PORT = 8080;
server.listen(PORT);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(express.static('assets'));

server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+"/assets/index.html"));
})

server.get("*", (req, res) =>{
    res.status(404).send("404: Page Not Found");
})