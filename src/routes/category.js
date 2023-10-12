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


router.post('/category/insert', async(req, res) => {
  
    try{
    const {title,created_on} = req.body;
    if(!title && !created_on){
      res.send('Please Enter Values')
    }
    const titlevalue = [title];
    const myquery = "INSERT INTO Category (title,created_on) VALUES(?,now())";
    const result = await queryPromise(myquery,titlevalue);
    res.send('Successfully inserted')
    res.json({id: result.insertId,title,created_on}) // to display last add...
    
    }catch(err){
      console.log(err)
    }
  });//Denis

  router.get("/category/:id", async(req, res)=>{
    try{
        const category_id = req.params.id
        const myquery = `SELECT * FROM Category WHERE id = ?`
        const [result] =  await queryPromise(myquery,category_id)
        if(result){
            res.json(result)

        }else{
            res.sendStatus(404)
        }    }catch(error){
res.json(error)
    }
})//Amended by Elias

module.exports=router;




