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


  

router.post('/create', async(request, response) => {
    try{
        const {userid,categoryid, ptitle, price, paddress } = request.body;
        if(userid,!categoryid || !ptitle || !price || !paddress ){
            response.send("Enter values")
        }
         else{
          const uservalues = [userid,categoryid,ptitle,price,paddress];
          const myquery = "INSERT INTO Products (userid, categoryid, ptitle, price, paddress,created_on ) VALUES (?,?,?,?,?,now())"
          const result = await queryPromise(myquery,uservalues)
          response.send("INSERTED OKAY")
    
        }
  
  
    }catch(err){
        response.send(err.message)
    }
    // DEMO PRODUCT OBJECT
    // {
    //   "userid" : 1,
    //   "categoryid":1,
    //   "title":"Lexus",
    //   "price":"15,000,000",
    //   "paddress":"Bamenda"
    // }
    
    });//GOLDEN  127.0.0.1:5000/api/products/create

//GETTING ALL PRODUCTS WITH STATUS 0

router.get("/deleted_products", async (req, res) => {
  const cmd = `SELECT * FROM Products
  where pstatus = ?`
  let result = await queryPromise(cmd,0)
  res.json(result)

}); //YVETTE  127.0.0.1:5000/api/products/deleted_products


//GETTING ALL PRODUCTS WITH STATUS 1

    router.get("/", async (req, res) => {
      const cmd = `SELECT * FROM Products
      where pstatus = 1`
      let result = await queryPromise(cmd)
      res.json(result)

  }); //YVETTE  127.0.0.1:5000/api/products




    router.get("/:productid", async(request,response)=>{
        try{
          const pid = request.params.productid
          const myquery = `SELECT * FROM Products WHERE productid =?`
          const result = await queryPromise(myquery,pid)
            response.status(200).json(result)
          
        }
        catch(err){
          res.send(err)
        }
      }); //VIVIAN  127.0.0.1:5000/api/products/1
  


      router.put("/update/:productID", async (req, res) => {
        const product_id = req.params.productID
        const { title, price, paddress } = req.body
        const newUpdate = [title, price, paddress, product_id]
           
        const mysqlCommand = `UPDATE Products 
        SET title = ?, price = ?, paddress = ?, updated_on = now()
        WHERE productid = ?`
    
        try {
            if (!title || !price || !paddress) {
               return res.send("INSERT VALUES")
            }
            else{
    
                await queryPromise(mysqlCommand, newUpdate)
                updatedProduct = `SELECT * FROM Products WHERE productid = ?`
                let [product] = await queryPromise(updatedProduct, product_id)
                res.json(product)
            }
    
        }
        catch (error) {
            res.send(error.message)
        }

        // DEMO  PRODUCT UPDATE OBJECT
        // {
        //   "title":"Lexus",
        //   "price":"12,000,000",
        //   "paddress":"Bamenda"
        // }
    });   //BAUDWIN   127.0.0.1:5000/api/products/update/4


    router.delete("/delete/:id", async (req, res) => {
      const id = req.params.id
      const cmd = `UPDATE Products
      SET pstatus = 0
      WHERE productid = ?`
      try {
          await queryPromise(cmd, id)
          res.send("Product Deleted Successfully")
      } catch (error) {
          res.send(error.message)
      }
  
  }); // DONADONI 127.0.0.1:5000/api/products/delete/4

 



module.exports=router