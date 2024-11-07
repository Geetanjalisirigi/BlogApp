const exp=require("express")
const app=exp();
const path=require("path")
const cors = require('cors');
require("dotenv").config() //process.env

//body parser midlleware
app.use(exp.json()) 
app.use(cors())
console.log(process.env.SECRET_KEY)

const mongoClient=require('mongodb').MongoClient
//connect to mongodb server
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    //get db
    const blogDbObj=client.db('blogAppDb')
    //get collections
    const usersCollection=blogDbObj.collection('users')
    const authorsCollection=blogDbObj.collection('authors')
    const articlesCollection=blogDbObj.collection('articles')
    //share collection objiects to APIs
    app.set('usersCollection',usersCollection)
    app.set('authorsCollection',authorsCollection)
    app.set('articlesCollection',articlesCollection)
    console.log("DB connection success")
})
.catch(err=>{
    console.log("Error in DB connection",err)
})

//import APIs
const userApp=require("./APIs/user-api")
const adminApp=require("./APIs/admin-api")
const authorApp=require("./APIs/author-api")

//handover req to specific route based on satring path
app.use('/user-api',userApp)
app.use('/admin-api',adminApp)
app.use('/author-api',authorApp)

//error handling middleware(synchronous error)
app.use((err,req,res,next)=>{
    res.send({status:"error",message:err.message})
})
//port number form env
const port=process.env.PORT || 5000;

app.listen(port,()=>console.log(`http server on port ${port}`))
