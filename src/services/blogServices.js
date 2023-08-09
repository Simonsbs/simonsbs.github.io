export const fetchBlogs = async () => {
  try {
    const response = await fetch("./blogs/blogs.json");
    const blogs = await response.json(); // Directly get the blogs from the JSON file
    return blogs;
  } catch (error) {
    console.error("An error occurred while fetching blogs:", error);
    return [];
  }
};
