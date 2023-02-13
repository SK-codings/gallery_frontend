import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "./Header";

function Mainview() {
  const [images, setImage] = useState();
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const user = localStorage.getItem("galleryProfile");

  useEffect(() => {
    fetch("http://localhost:3300/getGallery")
      .then((res) => res.json())
      .then((d) => {
        setImage(d);
        //  localStorage.setItem('imagedata', JSON.stringify(d))
      });
  }, [count]);

  const updateLikes = (id) => {
    if (!user) {
      toast.error("Please login to Like and Comment");
    }
    axios.post(`http://localhost:3300/updateLikes/${id}`);
    setCount(count + 1);
  };

  return (
    <>
      <Header />
      <div className="container text-center">
        <div className="row">
          {images &&
            images.map((picsum) => {
              return (
                <div class="col-6 pa-10 col-sm-3 border border-1">
                  <a className="navbar-brand" href="/">
                    <img
                      src={picsum.image_url}
                      alt="logo"
                      style={{
                        width: "250px",
                        height: "250px",
                        padding: "20px",
                      }}
                    />
                  </a>
                  <div className="row">
                    <div className="col">
                      <button
                        onClick={() => navigate(`/comments/${picsum._id}`)}
                        className="iconbtn"
                      >
                        <i class="fa fa-comments fa-3x"></i>
                      </button>
                      <h4>{picsum.comments.length}</h4>
                    </div>
                    <div className="col">
                      <button
                        onClick={() => updateLikes(picsum._id)}
                        className="iconbtn"
                      >
                        <i class="fa fa-thumbs-up fa-3x"></i>
                      </button>
                      <h4>{picsum.likes}</h4>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Mainview;
