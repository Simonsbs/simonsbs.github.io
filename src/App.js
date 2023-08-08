//import Popper from "@popperjs/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.scss";

import { HashRouter, Routes, Route } from "react-router-dom"; // Import HashRouter instead of BrowserRouter
import Homepage from "./pages/Homepage";
import Bloglist from "./pages/Bloglist";
import Bloglist2 from "./pages/Bloglist2";
import BlogDetails from "./pages/BlogDetails";
import BlogDetails2 from "./pages/BlogDetails2";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route path="/blogs" element={<Bloglist />} exact />
        <Route path="/bloglist" element={<Bloglist2 />} exact />
        <Route path="/blogs/:id/:title" element={<BlogDetails />} />
        <Route path="/blog-details/:id/:title" element={<BlogDetails2 />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
