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

// let config = {
//     userName: "plane1113",
//     password: "Feiyang2009!",
//     server: "pv0zerjnxi.database.windows.net",
//     options: { encrypt: true, database: "MyDB" }
// }
// 
// function executeStatement(connection, onDone) {
//     let result = [];
//     let request = new Request(`select excercises.name as name, excercises.bpm as bpm, history.dt as dt, history.bpm as hbpm
//             from excercises inner join users on users.id = excercises.user_id
//             left join history on excercises.id = history.excercise_id
//             where users.name = 'Feiyang Chen'`, function () {
//             if (onDone) onDone(result);
//         });
// 
//     request.on('row', function (columns) {
// 
//         let excercise = { history: [] };
//         let history = null;
//         columns.forEach(function (column) {
//             switch (column.metadata.colName) {
//                 case 'name':
//                     excercise.name = column.value;
//                     break;
//                 case 'bpm':
//                     excercise.bpm = column.value;
//                     break;
//                 case 'dt':
//                     if (column.value !== null) {
//                         history = history || {};
//                         history.date = column.value;
//                     }
//                     break;
//                 case 'hbpm':
//                     if (column.value !== null) {
//                         history = history || {};
//                         history.bpm = column.value;
//                     }
//                     break;
//             }
//         });
//         if (history) excercise.history.push(history);
//         
//         // find if this excercise is already in the resultset, if yes, append the history to the existing excercise's history array
//         let existingExc = result.filter((exc) => {
//             return exc.name === excercise.name;
//         });
// 
//         if (existingExc.length === 1) {
//             existingExc[0].history = existingExc[0].history.concat(excercise.history);
//         } else {
//             result.push(excercise);
//         }
//     });
// 
//     connection.execSql(request);
//     return result;
// }
// 
// app.use(cors());
// app.use(bodyParser.json());

var port = process.env.PORT || 3030;
app.listen(port, function () {
    console.log("started on PORT " + port);
    console.log("dir: " + path.join(__dirname, 'dist'));
});

// web app
//app.use('/', express.static(path.join(__dirname, '../dist')));
app.use(express.static('./dist'));
// app.get('/', function(req, res){
//     res.render('index.html');
// });

// api
// app.route('/api')
//     .get(function (req, res) {// return list of excercises
//     
//         // only care about date
//         let today = new Date();
//         today.setHours(0, 0, 0, 0);
// 
//         var connection = new Connection(config);
// 
//         connection.on('connect', function (err) {
//             //   console.log("connected");
//             executeStatement(connection, function (result) {
//                 let response = {
//                     excercises: result,
//                     today: today
//                 };
// 
//                 res.setHeader('Content-Type', 'application/json');
//                 res.send(JSON.stringify(response));
//             });
//         })
//     }).post(function (req, res) {//update an excercise
//         let excerciseName = req.body.name;
//         let newData = req.body;
//         fs.writeFile(dataFile, JSON.stringify(newData));
//     }).put(function (req, res) {// add a new excercise
//     
//     });