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
router.post("/:productID", async(request, response) => {
  let pid = request.params.productID
    try{
        const { userid, cmessage} = request.body;
        if(!userid || !cmessage){
            response.send("Enter values")
        } 
        const uservalues = [userid, pid, cmessage];
        const myquery = "INSERT INTO Comment(userid, productid, cmessage, created_on ) VALUES (?,?,?,now())"
        const result = await queryPromise(myquery,uservalues)
        response.send("Comment sent")
  
  
    }catch(err){
        response.send(err)
    }
    // 127.0.0.1:5000/api/comment/productid
    /* DEMO :
    { 
      "userid" :1,
      "cmessage" : "Very bad product"
     }
     */
    });



module.exports=router