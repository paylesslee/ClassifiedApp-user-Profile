const express = require("express")
const mysql = require("mysql2")


const db = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    database: "mcqquestions_n_answers",
    user: "root",
    password: "Michealtutu123"
  }).promise()
  

  

   module.exports = db