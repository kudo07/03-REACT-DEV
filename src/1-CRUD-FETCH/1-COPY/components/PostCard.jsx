const PostCard = ({ post, onEdit, onDelete }) => {
  console.log('postcard');

  return (
    <div className="">
      <h3>{post.title}</h3>
      <h3>{post.body}</h3>
      <div>
        <button onClick={() => onEdit(post)}>Edit</button>
        <button onClick={() => onDelete(post.id)}>Delete</button>
      </div>
    </div>
  );
};

export default PostCard;
