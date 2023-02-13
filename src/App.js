import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Mainview from "./Mainview";
import Comments from "./Comments";
import Signin from "./Signin";
import Signup from "./Signup";

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Mainview />} />
          <Route path="/comments/:id" element={<Comments />} />
          <Route path="/signin" exact element={<Signin />} />
          <Route path="/signup" exact element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
