export default function BlogCard({ blog }) {
  const image = blog.fields.featuredImage?.fields?.file?.url || "";

  return (
    <div className="blog-card">
      {image && (
        <img src={`https:${image}`} alt={blog.fields.title} width="300" />
      )}

      <h2>{blog.fields.title}</h2>

      <p>
        <strong>Author:</strong> {blog.fields.author}
      </p>

      <p>
        <strong>Category:</strong> {blog.fields.category}
      </p>
    </div>
  );
}
