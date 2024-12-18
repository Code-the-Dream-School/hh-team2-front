import PostCard from "./PostCard";

const posts = [
  {
    id: 1,
    title: "Title1",
    date: "Mar 22, 2023",
    subtitle: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and...",
    image: "https://via.placeholder.com/300",
    views: 15,
    comments: 2,
  },
  {
    id: 2,
    title: "Title1",
    date: "Mar 22, 2023",
    subtitle: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and...",
    image: "https://via.placeholder.com/300",
    views: 0,
    comments: 0,
  },
  {
    id: 3,
    title: "Title 3",
    date: "Mar 22, 2023",
    subtitle: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and...",
    image: "https://via.placeholder.com/300",
    views: 5,
    comments: 1,
  },
  {
    id: 3,
    title: "Title 3",
    date: "Mar 22, 2023",
    subtitle: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and...",
    image: "https://via.placeholder.com/300",
    views: 5,
    comments: 1,
  },
];

function PostList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
