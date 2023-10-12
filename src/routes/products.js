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


  

router.post('/create', async(request, respond) => {
    try{
        const {category_id, title, price, paddress } = request.body;
        if(!category_id || !title || !price || !paddress ){
            respond.send("Enter values")
        } 
        const uservalues = [category_id,title,price,paddress];
        const myquery = "INSERT INTO Products (category_id, title, price, paddress,created_on ) VALUES (?,?,?,?,now())"
        const result = await queryPromise(myquery,uservalues)
        respond.send("INSERTED OKAY")
  
  
    }catch(err){
        console.log(err)
    }
    
    });//GOLDEN


//GETTING ALL PRODUCTS WITH STATUS 1

    router.get("/products", async (req, res) => {
      const cmd = `select * from Products
      where pstatus = 1`
      let [result] = await queryPromise(cmd)
      res.json(result)
  }); //YVETTE




    router.get('/search', async(request,response)=>{
        try{
          const query = request.query.q
          const myquery = "SELECT * FROM Products where id like ?"
          const result = await queryPromise(myquery,query)
          if(result.lenght === 0){
            response.json({Message:'No data was found'})
          }else{
            response.status(200).json(result)
          }
      
        }catch(err){
          console.log(err)
        }
      }); //VIVIAN
  


      router.put("/update/:productID", async (req, res) => {
        const product_id = req.params.productID
        const { category_id, title, price, paddress, pstatus } = req.body
        const newUpdate = [title, price, paddress, product_id]
           
        const mysqlCommand = `UPDATE Products 
        SET title = ?, price = ?, paddress = ?, updated_on = now()
        WHERE id = ?`
    
        try {
            if (!title || !price || !paddress) {
               return res.send("INSERT VALUES")
            }
            else{
    
                await queryPromise(mysqlCommand, newUpdate)
                updatedProduct = `SELECT * FROM Products WHERE id = ?`
                let [product] = await queryPromise(updatedProduct, product_id)
                res.json(product)
            }
    
        }
        catch (error) {
            res.send(error.message)
        }
    });   //BAUDWIN


    router.delete("/delete/:id", async (req, res) => {
      const id = req.params.id
      const cmd = `UPDATE Products
      SET pstatus = 0
      WHERE id = ?`
      try {
          await db.query(cmd, id)
          res.send("Product Deleted Successfully")
      } catch (error) {
          res.send(error.message)
      }
  
  }); // DONADONI 





module.exports=router