'use strict'

const http = require("http");
const Sequelize = require("sequelize");

const server = new http.Server();
const port = process.env.PORT || 9090;
console.log(port);

const sequelize = new Sequelize('d8e53ttnje8l3h', 'xufwaoxfaaqqwx', 'EdjlSQHegUf4aXOp_5Bdu6y0Zl', {
  host: 'ec2-54-75-238-7.eu-west-1.compute.amazonaws.com',
  port: '5432',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});


const Tickets = sequelize.define('ticket', {
    number: {
        type: Sequelize.STRING
    },
    subject: {
        type: Sequelize.STRING
    },
    sn: {
        type: Sequelize.STRING
    },
    clientname: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    complect: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    comment: {
        type: Sequelize.STRING
    },
    operation: {
        type: Sequelize.STRING
    },
    cost: {
        type: Sequelize.STRING
    },
    getDate: {
        type: Sequelize.STRING
    },
    doneDate: {
        type: Sequelize.STRING
    }

}, {
  freezeTableName: true // Model tableName will be the same as the model name
});



server.listen(port);

server.on("request", function(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "POST,DELETE,GET,HEAD,OPTIONS,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    if (req.method === "OPTIONS"){
        res.end();
    }

    if (req.method === "GET"){
        Tickets.sync().then(function() {
                Tickets.findAll().then(function(db){
                res.write(JSON.stringify(db));
                res.end();
            })
        });        
    }

    if (req.method === "POST"){
        let postData, postJSON;
        
        req.on("data", data => postData = postData + data);

        req.on("end", function () {
            postJSON = JSON.parse(postData.match(/{[\s\S]+?}/)[0]);
            Tickets.sync().then(function () {
                return Tickets.create({
                    number: postJSON.number,
                    subject: postJSON.subject,
                    sn: postJSON.sn,
                    clientname: postJSON.clientname,
                    phone: postJSON.phone,
                    complect: postJSON.complect,
                    status: postJSON.status,
                    comment: postJSON.comment,
                    operation: postJSON.operation,
                    cost: postJSON.cost,
                    getDate: postJSON.getDate,
                    doneDate: postJSON.doneDate
                }).then(function (ticket) {
                    res.write(JSON.stringify({id: ticket.dataValues.id}));
                    res.end();
                });
            });  
        });
    }

    if (req.method === "PUT"){
        let postData, postJSON, id = +req.url.match(/\/(\d+)/)[1];

        req.on("data", data => postData = postData + data);

        req.on("end", function () {
            postJSON = JSON.parse(postData.match(/{[\s\S]+?}/)[0]);
            Tickets.findById(id).then(function (inst) {
                inst.update({
                number: postJSON.number,
                subject: postJSON.subject,
                sn: postJSON.sn,
                clientname: postJSON.clientname,
                phone: postJSON.phone,
                complect: postJSON.complect,
                status: postJSON.status,
                comment: postJSON.comment,
                operation: postJSON.operation,
                cost: postJSON.cost,
                getDate: postJSON.getDate,
                doneDate: postJSON.doneDate
              });
            });  
        });
        res.end();
    }

    if (req.method === "DELETE"){
        let id = +req.url.match(/\/(\d+)/)[1];

        Tickets.findById(id).then(function(inst){
            inst.destroy();
        });
        res.end();
    }

});

