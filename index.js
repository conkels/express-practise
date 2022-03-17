const express = require("express");
const parser = require("body-parser");

const app = express();

app.use(parser.json());

const personRoutes = require('./routes/personRoute');

app.use((req, res, next) => {
    const logEntry = `host: ${req.hostname}
    ip: ${req.ip}
    method: ${req.method}
    path: ${req.path}
    time: ${new Date()}`;
    console.log(logEntry);
    next();
})

const bloop = (req, res, next) => {
    console.log("bloop");
    return next();
}

app.use("/person", personRoutes);

app.use("*", (req, res, next) => {
    return next({status: 404, message: "Invalid URL"});
});

app.use((err, req, res, next) => {
    res.status(err.status).send(err.message);
})

const server = app.listen(4494, () => {
    console.log("Server successfully started on port", server.address().port);
});