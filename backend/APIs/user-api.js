//create mini-express app
const exp=require('express')
const userApp=exp.Router()
let verifyToken=require("../MiddleWares/verifyToken")
const expressAsyncHandler=require("express-async-handler")

const {createUserAuthor,userAuthorLogin}=require("./util")

let usersCollection
let articlesCollection
userApp.use((req,res,next)=>{
    usersCollection=req.app.get("usersCollection")
    next()
})
userApp.use((req,res,next)=>{
    articlesCollection=req.app.get("articlesCollection")
    next()
})

//define routes

//user creation
userApp.post('/user',expressAsyncHandler(createUserAuthor))

//user login
userApp.post('/login',expressAsyncHandler(userAuthorLogin))


//read articles of all authors by user
userApp.get("/articles",verifyToken,expressAsyncHandler(async(req,res)=>{
    //get all articles of author
    const articlesList=await articlesCollection.find({status:true}).toArray()
    res.send({message:"All articles",payload:articlesList})
}))


//write comment by user using articel id
userApp.post("/comment/:articleId",expressAsyncHandler(async(req,res)=>{
    //get articel id from url
    const articleIdFromUrl=(+req.params.articleId)
    //get comment obj from req
    const userComment=req.body
    //add user comment obj as an element to comments array
    await articlesCollection.updateOne({articleId:articleIdFromUrl},{$addToSet:{comments:userComment}})
    res.send({message:"User comment added"})
}
))

module.exports=userApp