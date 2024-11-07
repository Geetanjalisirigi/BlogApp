//create mini-express
const exp=require('express')
const authorApp=exp.Router()
const expressAsyncHandler=require("express-async-handler")
let verifyToken=require("../MiddleWares/verifyToken")
const {createUserAuthor,userAuthorLogin}=require("./util")

//getting authors,articles collection
let authorsCollection
let articlesCollection
authorApp.use((req,res,next)=>{
    authorsCollection=req.app.get("authorsCollection")
    articlesCollection=req.app.get("articlesCollection")
    next()
})


//define routes

//author user creation
authorApp.post("/user",expressAsyncHandler(createUserAuthor))

//author user login
authorApp.post('/login',expressAsyncHandler(userAuthorLogin))

//author save article
authorApp.post('/new-article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get new articles from client
    const newArticle=req.body
    //save new articles to articles collection
    await articlesCollection.insertOne(newArticle)
    res.send({message:"New article added"})
}))

//read articles by authors user name(by author-view article)
authorApp.get('/articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get authors username from url
    const usernameOfAuthor=req.params.username
    //get articles of current author
    let articlesList=await articlesCollection.find({username:usernameOfAuthor}).toArray()
    res.send({message:"Articles",payload:articlesList})
}))

//edit article
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get modified article
    const modifiedArticle=req.body
    let articleAfterModification=await articlesCollection.findOneAndUpdate({articleId:(+modifiedArticle.articleId)},{$set:{...modifiedArticle}},{returnDocument:"after"}) //to repalce the article
    res.send({message:"article modified",payload:articleAfterModification})
}))



//DELETE

//Hard delete(remove form Database completely)

//Soft delete(we hide data (can be restored)use this mostly)it can be restored
authorApp.put('/article/:articleId',expressAsyncHandler(async(req,res)=>{
    let articleIdOfUrl=Number(req.params.articleId)
    let art=req.body;
    if(art.status===true){
    let result=await articlesCollection.updateOne({articleId:articleIdOfUrl},{$set:{status:false}})
    
    if(result.modifiedCount===1){
        res.send({message:"article deleted"})
    }
}

    if(art.status===false){
        let result=await articlesCollection.updateOne({articleId:articleIdOfUrl},{$set:{status:true}})
        if(result.modifiedCount===1){
            res.send({message:"article restored"})
         }
}   

}))



module.exports=authorApp