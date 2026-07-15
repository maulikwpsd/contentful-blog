import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  const image = blog.fields.featuredImage?.fields?.file?.url;

  return (
    <div className="blog-card">
      {image && (
        <img src={`https:${image}`} alt={blog.fields.title} width="300" />
      )}

      <h2>{blog.fields.title}</h2>

      <p>
        <strong>Author:</strong> {blog.fields.author || "Unknown"}
      </p>

      <p>
        <strong>Category:</strong> {blog.fields.category || "Uncategorized"}
      </p>

      {blog.fields.publishDate && (
        <p>
          <strong>Date:</strong>{" "}
          {new Date(blog.fields.publishDate).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      )}

      {blog.fields.excerpt && <p>{blog.fields.excerpt}</p>}

      <Link to={`/blog/${blog.sys.id}`}>Read More </Link>
    </div>
  );
}
