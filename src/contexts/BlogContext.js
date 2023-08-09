import { createContext, useContext, useEffect, useState } from "react";
import { fetchBlogs } from "../services/blogServices";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs().then(setBlogs);
  }, []);

  return <BlogContext.Provider value={blogs}>{children}</BlogContext.Provider>;
};

export const useBlogs = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogs must be used within a BlogProvider");
  }
  return context;
};
