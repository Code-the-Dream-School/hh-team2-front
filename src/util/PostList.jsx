import PostCard from "./PostCard";

const posts = [
  {
    id: 1,
    title: "Title1",
    date: "Mar 22, 2023",
    subtitle: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and...",
    image: "https://cdn.pixabay.com/photo/2024/12/05/21/57/santa-claus-9247511_960_720.jpg",
    comments: 2,
    author: "John Doe", 
  },
  {
    id: 2,
    title: "Title2",
    date: "Mar 22, 2023",
    subtitle: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and...",
    image: "https://cdn.pixabay.com/photo/2023/04/24/06/08/bottlebrushes-7947303_960_720.jpg",
    comments: 0,
    author: "Jane Smith", 
  },
  {
    id: 3,
    title: "Title 3",
    date: "Mar 22, 2023",
    subtitle: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and...",
    image: "https://cdn.pixabay.com/photo/2024/03/02/07/09/car-8607713_960_720.jpg",
    comments: 1,
    author: "Alex Johnson",
  },
  // {
  //   id: 4,
  //   title: "Title 4",
  //   date: "Mar 22, 2023",
  //   subtitle: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and...",
  //   image: "https://via.placeholder.com/300",
  //   comments: 1,
  //   author: "Chris Lee", 
  // },
  // {
  //   id: 5,
  //   title: "Title 5",
  //   date: "Mar 22, 2023",
  //   subtitle: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and...",
  //   image: "https://via.placeholder.com/300",
  //   comments: 1,
  //   author: "Patricia Green", 
  // },
  // {
  //   id: 6,
  //   title: "Title 6",
  //   date: "Mar 22, 2023",
  //   subtitle: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and...",
  //   image: "https://via.placeholder.com/300",
  //   comments: 1,
  //   author: "Mike Brown",
  // },
];

// function PostList() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       {posts.map(post => (
//         <PostCard key={post.id} post={post} />
//       ))}
//     </div>
//   );
// }
function PostList() {
  return (
    <div className="grid grid-cols-1 gap-8"> {/* i just change it to  only 1 column and comment the code above this part */}
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
