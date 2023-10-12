const {Router} = require('express')
const router = Router() 
const db = require("../config/db")
const session = require('express-session')

// Middleware for session management
router.use(
  session({
    secret: 'your_secret_key', // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30000, // Set your desired session duration in milliseconds
    }
  })
);

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
    
    });


// login authentification
router.post('/login_auth', async(request, response) => {
  try{
    const {email, passwd} = request.body;

// 
    const loginvalue = [email, passwd]
    const loginquery = "SELECT * FROM User WHERE email = ? and passwd = ?"
    const loginresult = await queryPromise(loginquery, loginvalue)

    const user = loginresult[0];
    console.log(user);

    if(email === user.email && passwd === user.passwd){
         if(request.session.user){
          response.send(request.session.user)
          console.log("Login successfull")
            
          }else{
            request.session.user = {email, passwd}
            response.send("Login successful")
          }
          
        } 
    else{
            response.send('Invalid credentials')
    
    }
  }
  catch(err){
    console.log(err)
}});

router.use((request, response, next) => {
  if (request.session) next();
  else{
     response.send("You need to Re-login")    
  }
});


router.put("/update/:id", async (request, response) => {
  try {
  const userID = request.params.id
  const { userid, username, email, phonenumber, passwd, created_on, updated_on } = request.body
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
});   

module.exports=router;





































        /*
        router.put('/update', (request, response) => )
        const {username, email, phonenumber, passwd} = request.body;
        if (!username && !email && !phonenumber && !passwd){
          response.send("Enter the Value to be Update")
        }
        // const loginvalue = [username, email, phonenumber, passwd]  
        const loginquery = "UPDATE User SET username = ? WHERE email = ?"
        // "UPDATE User SET email = ? WHERE email = ?"
        // "UPDATE User SET phonenumber = ? WHERE email = ?"
        // "UPDATE User SET passwd = ? WHERE email = ?"
        const loginresult = await queryPromise(loginquery, loginvalue)
        */
 













/*const {username, email, updated_on} = request.body;

        const loginvalue = [username, email, updated_on]  
        const loginquery = "UPDATE User SET username = ? WHERE email = ?"
        const loginresult = await queryPromise(loginquery, loginvalue)
         const loginvalue2 = [email, updated_on]  
         const loginquery2 = "SELECT * FROM User WHERE email = ?"
         const loginresult2 = await queryPromise(loginquery2, loginvalue2)
    
         const user = loginresult2[0];
         console.log(user);
         if(email === user.email){
        
           response.send("Update successfull")
         }
         else{
           response.send("Please insert a valid email")
         } */










  // login : username and passwd
  // login : email and passwd


// get : display a page

// post : insert infos

// put : update an info

// patch : more than one infos to update


/*
  db.query(selectQuery, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0]; // Access the first row of results

    // Verify the password (You should replace this with password hashing in the future)
    if (password === user.passwd) {
      // Create a session for the user
      req.session.user = { id: user.id, username: user.username, email: user.email };
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if(username && passwd){
      if(request.session.user){
         response.send(request.session.user)
      } else{
        request.session.user = {username}
        response.send(request.session.user)
         // request.session.user = {username, passwd}
         //response.json({Message : "Login OK"}).status(200)
      
      }}else{
         response.send(404)
         // response.status(401).json({Message : "username or password incorrect"})
     }});

  }
   */ 