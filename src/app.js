const express = require('express');
const app = express()
const db = require("./config/db")
const users = require("./routes/user")
const products = require("./routes/products")
const category = require("./routes/category")
const comments = require("./routes/comments")
const contact = require("./routes/contact")
const port = 5000;






app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((request, response, next) => {
  if (request.session) next();
  else{
     response.send("You need to Re-login")    
  }
});


app.use("/api/users",users)
app.use("/api/products",products)
app.use("/api/category",category)
app.use("/api/comment",comments)
app.use("/api/contact",contact)





  app.listen(port, () => { 
  console.log(`Server started on port ${port}` );
  })