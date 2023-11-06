const express = require('express');
const app = express()
const db = require("./config/db")
const users = require("./routes/user")
const {render} = require('ejs')
const products = require("./routes/products")
const category = require("./routes/category")
const comments = require("./routes/comments")
const contact = require("./routes/contact")
const port = 5000;



app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/users",users)

/*
app.use((request, response, next) => {
   if (request.session.user) next();
  else{
     response.send("You need to login")    
  }
}); 
*/
app.set('view engine', 'ejs')
app.use("/api/products",products)
app.use("/api/category",category)
app.use("/api/comment",comments)
app.use("/api/contact",contact)


app.get('/user', (request, response)=>{
   db.query("SELECT * FROM User", function(err,result){
      if(err){
         console.log(err)
      }else{
         response.render('pages/index',{blog_post:result})
      }
     })
})

app.get('/login', (request, response)=>{
   response.render('pages/login', {})

})

app.get('/signup', (request, response)=>{
   response.render('pages/signup', {})

})

app.get('/logout', (request, response)=>{
   response.render('pages/logout', {})

})

app.get('/home', (request, response)=>{
   response.render('pages/about', {})

})

app.get('/create_category', (request, response)=>{
   response.render('pages/create_category', {})
})

app.post('/category_new', (request, response)=>{
   try{
      const {title,created_on} = request.body;
      if(!title && !created_on){
        response.render('pages/index')
      }
      const titlevalue = [title];
      const myquery = "INSERT INTO Category (title,created_on) VALUES(?,now())";
      db.query(myquery,titlevalue, function(error,results){
         if(error){
            console.log(error)
         }else{
         response.redirect('/user')
         }
         })
   }catch(error){
            console.log(error)
         }
      })

app.get('/update_personal_info', (request, response)=>{
   response.render('pages/update_personal_info', {})
})

app.put('/update_info', (request, response)=>{
   try{
      const {userid,username,email,phonenumber, passwd, created_on} = request.body;
      if(!userid && !username && !email && !phonenumber && passwd){
        response.render('pages/create_personal_info')
      }
      const titlevalue = [userid,username,email,phonenumber, passwd, created_on];
      const myquery = "INSERT INTO User(userid,username,email,phonenumber, passwd, created_on) VALUES(?,?,?,?,?,now())";
      db.query(myquery,titlevalue, function(error,results){
         if(error){
            console.log(error)
         }else{
         response.redirect('/user')
         }
         })
   }catch(error){
            console.log(error)
         }
      })

app.get('/create_personal_info', (request, response)=>{
   response.render('pages/create_personal_info', {})
})

app.get('/create_product', (request, response)=>{
   response.render('pages/create_product', {})
})

app.post('/product_new', (request, response)=>{
   try{
      const {userid,categoryid,title,price, paddress, created_on} = request.body;
      if(!categoryid && !title && !price && !paddress){
        response.render('pages/index')
      }
      const titlevalue = [userid,categoryid,title,price, paddress, created_on];
      const myquery = "INSERT INTO Products(userid,categoryid,title,price, paddress, created_on) VALUES(?,?,?,?,?,now())";
      db.query(myquery,titlevalue, function(error,results){
         if(error){
            console.log(error)
         }else{
         response.redirect('/user')
         }
         })
   }catch(error){
            console.log(error)
         }
      })

  app.listen(port, () => { 
  console.log(`Server started on port ${port}` );
  })