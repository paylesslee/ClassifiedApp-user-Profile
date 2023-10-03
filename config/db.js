const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Coolman@123456',
    database: 'hotelmanagment',
  });
  
// checking conecting 
db.connect((err)=>{
  if(err){
      console.log("Not Connected")
  }else{
      console.log("Connected")
  }
  });
  
  module.exports=db