import BlogCard from "./BlogCard";
import { useGetBlogsQuery } from "../../services/contentfulApi";

export default function BlogList() {
  const {
    data: blogs = [],
    isLoading,
    error,
  } = useGetBlogsQuery(undefined, {
    pollingInterval: 1000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>Something went wrong</h2>;

  return (
    <div>
      {blogs.map((blog) => (
        <BlogCard key={blog.sys.id} blog={blog} />
      ))}
    </div>
  );
}
