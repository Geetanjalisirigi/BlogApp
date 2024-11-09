import React from 'react'
import {useForm} from "react-hook-form"
import {useSelector} from "react-redux"
import { useState } from 'react';
import {useNavigate} from "react-router-dom"
import axios from "axios"
import "./AddArtcile.css"
import { axiosWithToken } from '../../axiosWithToken';

function AddArticle() {
  let {register,handleSubmit}=useForm();
  let {currentUser}=useSelector( (state)=>state.userLogin)
  let [err,setErr]=useState("")
  let navigate=useNavigate();
 
  
  
  const addNewArticle=async(newArticle)=>{

    newArticle.articleId=Date.now();
    newArticle.dateOfCreation=new Date();
    newArticle.dateOfModification=new Date();
    newArticle.username=currentUser.username;
    newArticle.comments=[];
    newArticle.status=true;


    //make http post req to author-api
    let res = await axiosWithToken.post('http://localhost:4000/author-api/new-article', newArticle);
    
    console.log(res)
    if(res.data.message==="New article added")
    {
      //navigate for articlesByAuthor component
      navigate(`/author-profile/articles-by-author/${currentUser.username}`)
    }
    else{
      setErr(res.data.message)
    }
  }


  return (
    <div className='container'>
      <div className="row justify-content-center mt-5 mb-5">
        <div className="col-lg-6 col-md-8 col-sm-10" >
          <div className="card shadow p-2 bg" style={{backgroundColor:"rgb(239, 163, 178)"}}>
            <div className="card-title text-center border-bottom">
                <h2 className="p-3 fs-2">Write an Article</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(addNewArticle)}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label fs-4">Title</label>
                  <input type="text" id="title" placeholder="title" className="form-control" {...register("title")}/>
                </div>
                <div className="mb-4">
                  <label htmlFor="category" className="form-label fs-4">Select a category</label>
                  <select id="category" className="form-select" {...register("category")}>
                    <option value="" disable selected>select Category</option>
                    <option value="Pragramming">Pragramming</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Social Life">Social Life</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="form-label fs-4">Content</label>
                  <textarea id="content" placeholder="Article Discription" rows="7" className="form-control" {...register("content")}/>
                </div>
                <button type="submit" className="btn btn-success d-block mx-auto">Submit Article</button>
              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default AddArticle