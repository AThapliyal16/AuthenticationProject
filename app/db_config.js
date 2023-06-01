// install mysql----npm i mysql and then npm i
// create db and table in mysql workbench (db-Nodejs, Table--Comments)

const mysql = require('mysql');

var connection= mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:"password",
    database:'Authentication'
});

connection.connect(function(err){
    if(err){
        console.log("ERROR Occured",err);
    }
    else{
        console.log("Connected");
    }
});

module.exports=connection;