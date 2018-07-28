"use strict"

let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let fs = require("fs");
let path = require("path");
let app = express();
let Connection = require('tedious').Connection;
let Request = require('tedious').Request;
let TYPES = require('tedious').TYPES;

//let dataFile = "backend/data/data.json";
let SQLs = {
    GET_EXCERCISES: `GetExcercises`,
    EXCERCISE_INCREMENT: `ExcerciseIncrement`,
    EXCERCISE_UPDATE: `ExcerciseUpdate`,
    ADD_EXCERCISE: `AddExcercise`,
    DELETE_EXCERCISE: `DeleteExcercise`
}

let config = {
    userName: process.env.USER_NAME || '',
    password: process.env.SERVER_PWD || '',
    server: process.env.SERVER_NAME || '',
    options: { encrypt: true, database: process.env.DB_NAME, rowCollectionOnRequestCompletion: true }
}

config.options.debug = {
    packet: true,
    data: true,
    payload: true,
    token: true,
    log: true
}

function executeStatement(request, isStoredProc) {

    let connection = new Connection(config);

    connection.on('connect', function (err) {

        if (err) {
            console.log("connection failed");
            console.log(JSON.stringify(err));
        }
        console.log("connected");
        if (isStoredProc)
            connection.callProcedure(request);
        else
            connection.execSql(request);
    });
}

app.use(cors());
app.use(bodyParser.json());

var port = process.env.PORT || 3030;
app.listen(port, function () {
    console.log("started on PORT " + port);
    console.log("dir: " + path.join(__dirname));
});

// web app
//app.use(express.static('.'));

//api
app.route('/api')
    .get(function (req, res) {// return list of excercises
        // only care about date
        // let today = new Date();
        // today.setHours(0, 0, 0, 0);
        let user = req.query.user;

        let request = new Request(SQLs.GET_EXCERCISES, (err, rowCount, rows) => {

            if (err) {
                console.log("err : " + JSON.stringify(err));
                return;
            }
            let response = {
                excercises: processRows(rows),
                //      today: today
            };

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(response));
        });

        console.log(req.params);
        request.addParameter("user", TYPES.VarChar, user);

        executeStatement(request, true);

    }).post(function (req, res) {
    }).put(function (req, res) {// add a new excercise
        let excercise = req.body.excercise;
        let user = req.body.user;

        let request = new Request(SQLs.ADD_EXCERCISE, (err, rowCount, rows) => {
            if (err) {
                console.log("err : " + JSON.stringify(err));
                return;
            }

            const response = {
                excercise: processRows(rows)[0]
            };

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(response));
        });

        request.addParameter("excerciseName", TYPES.VarChar, excercise.name);
        request.addParameter("excerciseBpm", TYPES.Int, excercise.bpm);
        request.addParameter("excerciseTimeSignature", TYPES.VarChar, excercise.time_signature);
        request.addParameter("excerciseActive", TYPES.Bit, 1);
        request.addParameter("increment", TYPES.Int, excercise.increment);
        request.addParameter("user", TYPES.VarChar, user);

        executeStatement(request, true);
    });

app.route('/api/complete')//complete an excercise
    .post((req, res) => {
        let user = req.body.user;
        let excerciseId = req.body.id;
        let date = new Date(req.body.date);

        // update excercises
        let request = new Request(SQLs.EXCERCISE_INCREMENT, (err, rowCount, rows) => {
            if (err) {
                console.log("err : " + JSON.stringify(err));
                return;
            }

            let response = {
                excercises: processRows(rows),
            };

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(response));
        });

        console.log("user: " + user + "; excerciseId: " + excerciseId + "; date: " + date);

        request.addParameter("excerciseId", TYPES.Int, excerciseId);
        request.addParameter("user", TYPES.VarChar, user);
        request.addParameter("date", TYPES.DateTime, date);

        executeStatement(request, true);
    });

app.route('/api/update')// update an excercise
    .post((req, res) => {
        let user = req.body.user;
        let excercise = req.body.excercise;

        // update excercises
        let request = new Request(SQLs.EXCERCISE_UPDATE, (err, rowCount, rows) => {
            if (err) {
                console.log("err : " + JSON.stringify(err));
                return;
            }

            res.setHeader('Content-Type', 'application/json');
            res.send({ msg: "success!" });
        });

        console.log("user: " + user + "; excercise: " + excercise);

        request.addParameter("excerciseId", TYPES.Int, excercise.id);
        request.addParameter("excerciseName", TYPES.VarChar, excercise.name);
        request.addParameter("excerciseBpm", TYPES.Int, excercise.bpm);
        request.addParameter("excerciseTimeSignature", TYPES.VarChar, excercise.time_signature);
        request.addParameter("user", TYPES.VarChar, user);
        request.addParameter("excerciseActive", TYPES.Bit, 1);
        request.addParameter("increment", TYPES.Int, excercise.increment);

        executeStatement(request, true);
    });
app.route('/api/delete') // delete an excercise
    .post((req, res) => {
        let user = req.body.user;
        let excerciseId = req.body.id;

        // update excercises
        let request = new Request(SQLs.DELETE_EXCERCISE, (err, rowCount, rows) => {
            if (err) {
                console.log("err : " + JSON.stringify(err));
                res.status(400);
                res.send("err : " + JSON.stringify(err));
                return;
            }

            res.setHeader('Content-Type', 'application/json');
            res.send({ msg: "success!" });
        });

        console.log("deleting! user: " + user + "; excercise id: " + excerciseId);

        request.addParameter("excerciseId", TYPES.Int, excerciseId);
        request.addParameter("user", TYPES.VarChar, user);

        executeStatement(request, true);
    });

function processRows(rows) {
    let result = [];

    if (rows) {
        rows.forEach((row) => {
            let excercise = { history: [] };
            let history = null;
            row.forEach(function (column) {
                console.log("column " + column.value);
                switch (column.metadata.colName) {
                    case 'id':
                        excercise.id = column.value;
                        break;
                    case 'name':
                        excercise.name = column.value;
                        break;
                    case 'bpm':
                        excercise.bpm = column.value;
                        break;
                    case 'dt':
                        if (column.value !== null) {
                            history = history || {};
                            history.date = column.value;
                        }
                        break;
                    case 'hbpm':
                        if (column.value !== null) {
                            history = history || {};
                            history.bpm = column.value;
                        }
                        break;
                    case "active":
                        excercise.active = column.value;
                        break;
                    case "time_signature":
                        excercise.time_signature = column.value;
                        break;
                    case "increment":
                        excercise.increment = column.value;
                        break;
                }
            });
            if (history) excercise.history.push(history);

            // find if this excercise is already in the resultset, if yes, append the history to the existing excercise's history array
            let existingExc = result.filter((exc) => {
                return exc.name === excercise.name;
            });

            if (existingExc.length === 1) {
                existingExc[0].history = existingExc[0].history.concat(excercise.history);
            } else {
                result.push(excercise);
            }
        });

    }

    return result;
}