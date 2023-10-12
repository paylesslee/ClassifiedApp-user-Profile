// const express = require("express")
// const mysql = require("mysql2")


// const db = mysql.createPool({
//     host: "127.0.0.1",
//     port: 3306,
//     database: "mcqquestions_n_answers",
//     user: "root",
//     password: "Michealtutu123"
//   }).promise()
  

//   db.connect((err) =>{
//     if(err){
//         console.log('Database Not Connected')
//     }else{
//         console.log('Database Connected')
//     }
// });


//    module.exports = db



const mysql = require('mysql2')
const db = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : 'General123@',
    database : 'TestWork'
})

db.connect((err) =>{
    if(err){
        console.log('Database Not Connected')
    }else{
        console.log('Database Connected')
    }
});


module.exports = db 