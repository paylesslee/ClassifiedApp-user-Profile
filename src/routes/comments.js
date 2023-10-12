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

  // Commenting a particular product
router.post('/comment/:productID ', async(request, response) => {
    try{
        const { userid, productid, cmessage} = request.body;
        if(!userid || !productid || !cmessage){
            respond.send("Enter values")
        } 
        const uservalues = [userid, productid, cmessage];
        const myquery = "INSERT INTO Comment(userid, productid, cmessage, created_on ) VALUES (?,?,?,now())"
        const result = await queryPromise(myquery,uservalues)
        respond.send("Comment sent")
  
  
    }catch(err){
        console.log(err)
    }
    
    });



module.exports=router