import { useParams } from "react-router-dom";
import { useGetBlogByIdQuery } from "../../services/contentfulApi";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function BlogDetails() {
  const { id } = useParams();

  const { data: blog, isLoading, error } = useGetBlogByIdQuery(id);

  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>Something went wrong.</h2>;

  if (!blog) return <h2>Blog not found.</h2>;

  const image = blog.fields.featuredImage?.fields?.file?.url;

  return (
    <div className="container">
      <h1>{blog.fields.title}</h1>

      {image && (
        <img src={`https:${image}`} alt={blog.fields.title} width="500" />
      )}

      <p>
        <strong>Author:</strong> {blog.fields.author}
      </p>

      <p>
        <strong>Category:</strong> {blog.fields.category}
      </p>

      <p>
        <strong>Published:</strong>{" "}
        {new Date(blog.fields.publishDate).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <hr />

      {documentToReactComponents(blog.fields.content)}
    </div>
  );
}
