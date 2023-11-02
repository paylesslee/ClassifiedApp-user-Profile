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


app.get('/welcome', (request, response)=>{
   response.render('pages/index', {})

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

app.get('/create_personalInfo', (request, response)=>{
   response.render('pages/create personal_info', {})
})

app.get('/update_personalInfo', (request, response)=>{
   response.render('pages/update personal_info', {})
})

app.get('/create_product', (request, response)=>{
   response.render('pages/create_product', {})
})


  app.listen(port, () => { 
  console.log(`Server started on port ${port}` );
  })