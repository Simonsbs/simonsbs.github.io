//import Popper from "@popperjs/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.scss";

import { HashRouter, Routes, Route } from "react-router-dom"; // Import HashRouter instead of BrowserRouter
import Homepage from "./pages/Homepage";
import Bloglist from "./pages/Bloglist";
import BlogDetails from "./pages/BlogDetails";
import { BlogProvider } from "./contexts/BlogContext";

function App() {
  return (
    <BlogProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/blogs" element={<Bloglist />} exact />
          <Route path="/blogs/:id/:title" element={<BlogDetails />} />
        </Routes>
      </HashRouter>
    </BlogProvider>
  );
}

export default App;
