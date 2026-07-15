import { useState } from "react";
import BlogCard from "./BlogCard";
import { useGetPaginatedBlogsQuery } from "../../services/contentfulApi";

export default function BlogList() {
  const [page, setPage] = useState(1);
  const limit = 3;

  const { data, isLoading, error } = useGetPaginatedBlogsQuery({
    page,
    limit,
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Something went wrong.</h2>;

  const { blogs, totalPages } = data;

  return (
    <>
      <div className="blog-grid">
        {blogs.map((blog) => (
          <BlogCard key={blog.sys.id} blog={blog} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={page === index + 1 ? "active" : ""}>
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}
