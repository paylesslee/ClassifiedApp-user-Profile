const mysql = require('mysql2');
const db = mysql.createConnection({
  host     : 'localhost', // default
  user     : 'root', // default
  password : 'Michealtutu123', //database password
  database : 'ClassifiedApp' // database name
})
 
// checking conecting 
db.connect((err)=>{
if(err){
    console.log("Not Connected")
}else{
    console.log("Connected")
}
});

module.exports=db

