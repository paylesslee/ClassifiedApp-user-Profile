const {Router} = require('express')
const router = Router() 
const db = require("../config/db")
const session = require('express-session')
const cookieParser = require('cookie-parser')
router.use(cookieParser())
// Middleware for session management
router.use(session({
  secret: 'mysecret',
  resave: false,
  // maxAge: 2000,
  saveUninitialized: false
}))


// Promise Function
function queryPromise(sql,values=[]){
    return new Promise((resolve,reject)=>{
      db.query(sql,values,(error,result)=>{
        if(error){
          reject(error)
        }else{
          resolve(result)
        }
      })
    })
  }  

  router.get('/user', (request, response)=>{
    db.query("SELECT * FROM User", function(err,result){
       if(err){
          console.log(err)
       }else{
        
          response.render('pages/index',{blog_post:result})
       }
      })
 })

 router.get('/update_personal_info', (request, response)=>{
  const userid = request.session.user.userid
  response.render('pages/update_personal_info', {useridkey:userid})
})

router.post('/update_info', (request, response)=>{
  const {userid,username,email,phonenumber, passwd} = request.body;
 
  try{
     
     if(!username && !email && !phonenumber && passwd){
       response.redirect('pages/update_personal_info')
     }
     const titlevalue = [username,email,phonenumber, passwd, userid];
     const myquery = `UPDATE User 
     SET username=?,email=?,phonenumber=?, passwd=?, updated_on= now()
     WHERE userid = ?`;
     db.query(myquery,titlevalue)
      response.redirect('/user')
    }catch(error){
           console.log(error)
        }
     })

  router.get("/login", (req,res)=>{
    res.render("pages/login")
  })


  router.get("/logout", (req,res)=>{
    req.session.destroy()
    res.redirect("/login")
  })
  
  // user registration
  router.post('/register', async(request, respond) => {
    try{
        const {username, email, phonenumber, passwd, created_on} = request.body;
        if(!username && !email && !phonenumber && !passwd && !created_on){
            respond.send("Enter values")
        } 
        const uservalues = [username, email, phonenumber, passwd, created_on];
        const myquery = "INSERT INTO User(username, email, phonenumber, passwd, created_on ) VALUES (?,?,?,?,now())"
        const result = await queryPromise(myquery,uservalues)
        respond.status(201).json({Message:"INSERTED OKAY"})
         
    }catch(err){
        console.log(err)
    }
    // localhost:5000/api/users/register
    /* DEMO :
    {
      "username" : "yan01",
       "mailto:email":"yan@gmail.com",
      "phonenumber":"611223344",
       "passwd":"123"
      }
      */
    });
    


// login authentification
router.post('/login_auth', async(request, response) => {
  const {email, passwd} = request.body;
  const loginvalue = [email, passwd]
  try{
    const loginquery = `SELECT * FROM User WHERE email = ? and passwd = ?`
    const [user]= await queryPromise(loginquery, loginvalue)

    if(user){
         if(request.session.user){
          response.redirect("/login")
          }else{
            const userid = user.userid
            request.session.user = {userid}
            response.redirect("/user")
          }
          
        } 
    else{
            response.redirect("/login")
    }
  }
  catch(err){
    response.redirect("/login")
    // localhost:5000/api/users/login_auth
    /* DEMO :
    {
      "mailto:email":"yan@gmail.com",
      "passwd":"123"
    }
*/

}});



router.put("/update/:id", async (request, response) => {
  try {
  const userID = request.params.id
  const { username, email, phonenumber, passwd, updated_on } = request.body
  const newUpdate = [username, email, phonenumber, passwd, updated_on]

  const myquery = `UPDATE User SET username = ?, email = ?, phonenumber = ?, passwd = ?, updated_on = now() WHERE userid = ${userID}`

  
      if (!username && !email && !phonenumber && !passwd) {
          response.send("INSERT VALUES")
      }
      else{

          await queryPromise(myquery, newUpdate)

          updateduser = `SELECT * FROM User WHERE userid = ${userID}`
          let [user] = await queryPromise(updateduser, userID)
           response.json(user)
      }

  }
  catch (error) {
       response.send(error.message)
  }
  // localhost:5000/api/users/update/id
    /* DEMO :
    {
      "username" : "yan02",
       "mailto:email":"yann@gmail.com",
      "phonenumber":"600223344",
       "passwd":"1234"
      }
      */
});   

module.exports=router;
