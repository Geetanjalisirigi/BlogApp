import React from "react";
import "./Article.css";
import { FcClock } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import { FcPotraitMode } from "react-icons/fc";
import { BiCommentAdd } from "react-icons/bi";
import { MdRestore } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { axiosWithToken } from "../../axiosWithToken";

function Article() {
  let { register, handleSubmit } = useForm();
  const { state } = useLocation(); //gets obj (from ArticlesByAuthor in navigate payload)

  let { currentUser } = useSelector((state) => state.userLogin);
  const [commentStatus, setCommentStatus] = useState("");
  const [articleEditStatus, setArticleEditStatus] = useState(false);
  const [editedArticle, setEditedArticle] = useState(state);
  let [err, setErr] = useState("");
  const [articleViewStatus, setArticleViewStatus] = useState(state.status);
  let navigate = useNavigate();

  //convert ISO to UTC date
  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay();
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${day}/${year}`;
  }

  const postComment = async (commentObj) => {
    commentObj.username = currentUser.username;
    let res = await axiosWithToken.post(
      `http://localhost:4000/user-api/comment/${state.articleId}`,
      commentObj
    );
    if (res.data.message === "User comment added") {
      setCommentStatus(res.data.message);
    } else {
      setErr(res.data.message);
    }
  };

  console.log(editedArticle);

  const editArticle = () => {
    setArticleEditStatus(true);
  };

  const saveArticle = async (editedArticle) => {
    const modifiedArticle = { ...state, ...editedArticle };
    delete modifiedArticle._id;
    modifiedArticle.dateOfModification = new Date();
    //http put request
    let res = await axiosWithToken.put(
      `http://localhost:4000/author-api/article`,
      modifiedArticle
    );
    if (res.data.message === "article modified") {
      setArticleEditStatus(false);
      setEditedArticle(res.data.payload);
      navigate(`/author-profile/article/${state.articleId}`, {
        state: res.data.payload,
      });
    }
  };

  const deleteArticleById = async () => {
    let copy = { ...editedArticle };
    delete copy._id;
    let res = await axiosWithToken.put(
      `http://localhost:4000/author-api/article/${copy.articleId}`,
      copy
    );
    if (res.data.message === "article deleted") {
      setArticleViewStatus(false);
      setEditedArticle((prev) => ({
        ...prev,
        status: false,
      }));
      console.log("Article restored, articleViewStatus set to false");
    }
  };

  const restoreArticleById = async () => {
    let copy = { ...editedArticle };
    delete copy._id;
    let res = await axiosWithToken.put(
      `http://localhost:4000/author-api/article/${copy.articleId}`,
      copy
    );
    console.log(res);
    if (res.data.message === "article restored") {
      setArticleViewStatus(true);
      setEditedArticle((prev) => ({
        ...prev,
        status: true,
      }));
      console.log("Article deleted, articleViewStatus set to true");
    } else {
      console.log("Failed to restore article, status not updated");
      setErr(res.data.message);
    }
  };

  return (
    <div>
      {console.log("articleViewStatus:", articleViewStatus)}
      {articleEditStatus === true ? (
        <form onSubmit={handleSubmit(saveArticle)}>
          <div className="mb-4">
            <label htmlFor="title" className="form-label fs-4">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="title"
              className="form-control"
              {...register("title")}
              defaultValue={state.title}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="form-label fs-4">
              Select a category
            </label>
            <select
              id="category"
              className="form-select"
              {...register("category")}
              defaultValue={state.category}
            >
              <option value="" disable selected>
                select Category
              </option>
              <option value="Pragramming">Pragramming</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Social Life">Social Life</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="form-label fs-4">
              Content
            </label>
            <textarea
              id="content"
              placeholder="Article Discription"
              rows="7"
              className="form-control"
              {...register("content")}
              defaultValue={state.content}
            />
          </div>
          <button type="submit" className="btn btn-success d-block mx-auto">
            Save Article
          </button>
        </form>
      ) : (
        <>
          <div className="d-flex justify-content-between">
            <div>
              <p className="display-3 me-4">{editedArticle.title}</p>
              <span>
                <small className="text-secondary me-4">
                  <FcCalendar className="fs-4" />
                  Created on:{editedArticle.dateOfCreation}
                </small>
                <small className="text-secondary">
                  <FcClock className="fs-4" />
                  Created on:{editedArticle.dateOfModification}
                </small>
              </span>
            </div>
            <div>
              {currentUser.usertype === "author" && (
                <>
                  <button
                    className="me-2 btn btn-warning"
                    onClick={editArticle}
                  >
                    <CiEdit className="fs-2" />
                  </button>
                  {articleViewStatus === true ? (
                    <button className="me-2 btn btn-danger">
                      <MdDelete className="fs-2" onClick={deleteArticleById} />
                    </button>
                  ) : (
                    <button className="me-2 btn btn-success">
                      <MdRestore
                        className="fs-2"
                        onClick={restoreArticleById}
                      />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <p className="lead mt-3" style={{ whiteSpace: "pre-line" }}>
            {editedArticle.content}
          </p>
          {/*User Comments */}
          <div className="comments bg-light p-4">
            {state.comments.length === 0 ? (
              <p className="fs-1">No comments yet...</p>
            ) : (
              state.comments.map((comment) => {
                return (
                  <div>
                    <p className="fs-2">{comment.username}</p>
                    <p className="lead ms-5">{comment.comment}</p>
                  </div>
                );
              })
            )}
          </div>

          <div>
            <h1 className="display-3">{commentStatus}</h1>
            {currentUser.usertype === "user" && (
              <form onSubmit={handleSubmit(postComment)}>
                <input
                  type="text"
                  {...register("comment")}
                  className="form-control mb-4"
                  placeholder="Write your comment"
                />
                <button type="submit" className="btn btn-success">
                  Add a Comment
                  <BiCommentAdd className="fs-3" />
                </button>
              </form>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Article;
