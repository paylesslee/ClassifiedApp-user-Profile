const {Router} = require('express')
const router = Router() 
const db = require("../config/db")

function queryPromise(sql,values=[]){
  return new Promise((resolve,reject)=>{
    db.query(sql,values,(error,result)=>{
      if(error){
        reject(error)
      }else{
        resolve(result)
      }
    })
  });
}  


router.post('/insert', async(req, res) => {
  
    try{
    const {ctitle,created_on} = req.body;
    if(!ctitle && !created_on){
      res.send('Please Enter Values')
    }
    const titlevalue = [ctitle];
    const myquery = "INSERT INTO Category (ctitle,created_on) VALUES(?,now())";
    const result = await queryPromise(myquery,titlevalue);
    res.send('Successfully inserted')
    // res.json({id: result.insertId,title,created_on}) 
    
    }catch(err){
      res.send(err)
    }
// DEMO CREATE CATEGORY OBJECT
// {
//   "title":"Cloth Brands"
// }

  });//Denis   127.0.0.1:5000/api/category/insert




  router.get("/:id", async(req, res)=>{
    try{
        const category_id = req.params.id
        const myquery = `SELECT * FROM Category WHERE categoryid = ?`
        const [result] =  await queryPromise(myquery,category_id)
        if(result){
            res.json(result)

        }else{
            res.sendStatus(404)
        }    }catch(error){
res.json(error)
    }
})//Amended by Elias    127.0.0.1:5000/api/category/1

module.exports=router;




