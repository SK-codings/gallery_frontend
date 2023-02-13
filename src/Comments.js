import axios from "axios";
import { useEffect, useState, CSSProperties } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "./Header";

function Comments() {
  const { id } = useParams();
  const [comment, setComment] = useState();
  const [cmntimage, setCmntimage] = useState();
  const user = localStorage.getItem("galleryProfile");
  // eslint-disabled
  const override = (CSSProperties = {
    display: "block",
    margin: "0 auto",
  });

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`http://localhost:3300/getComment/${id}`)
        .then((res) => setCmntimage(res.data));
    }, 2000);
  }, [comment, id]);

  const updateComment = (id) => {
    if (!user) {
      toast.error("Please login to comment");
    } else {
      axios.post(`http://localhost:3300/updateComments/${id}`, {
        comment: comment,
      });
      setComment("");
      toast.success("Comment added successfully");
    }
  };

  return (
    <>
      <Header />
      {cmntimage ? (
        <div className="container text-center">
          <ToastContainer position="top-left" />
          <div className="col">
            <div class=" row">
              <img
                src={cmntimage && cmntimage.image_url}
                alt="logo"
                style={{ width: "700px", height: "450px", padding: "20px" }}
              />
              <br />
            </div>
            <hr />
          </div>
          <div className="row">
            <div className="col">
              <input
                className="form-control"
                onKeyDown={(e) => {
                  e.keyCode == 13 && updateComment(id);
                }}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                name="comment"
                value={comment}
              ></input>
              <br />
              <button
                className="btn btn-primary"
                style={{ float: "left" }}
                onClick={() => {
                  updateComment(id);
                }}
              >
                Comment
              </button>
            </div>
          </div>
          <br />
          {cmntimage &&
            cmntimage.comments.map((cmntdata) => (
              <div className="row text-start">
                <p> - {cmntdata}</p>
                <hr />
              </div>
            ))}
        </div>
      ) : (
        <ClipLoader
          color="black"
          loading={true}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </>
  );
}

export default Comments;
