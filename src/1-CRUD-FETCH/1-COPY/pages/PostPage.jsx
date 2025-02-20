import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../services/useFetch';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import PostCard from '../components/PostCard';

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({ title: '', body: '' });
  //   fetch post
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
        console.log(data);

        setError(null);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);
  // retry fetch
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setPosts([]);
    const reload = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    reload();
  };
  // handleform submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.body) return alert('Both fields are required');
    if (editingPost) {
      setPosts(
        posts.map((post) =>
          post.id === editingPost.id ? { ...editingPost, ...form } : post
        )
      );
      setEditingPost(null);
    } else {
      setPosts([
        { id: Date.now(), title: form.title, body: form.body },
        ...posts,
      ]);
    }
    setForm({ title: '', body: '' });
  };
  // handle the form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  // handle edit
  const handleEdit = (post) => {
    setEditingPost(post);
    setForm({ title: post.title, body: post.body });
  };
  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };
  return (
    <div>
      <h1>POST MANAGEMENT</h1>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} onRetry={handleRetry} />}
      {!loading && !error && (
        <>
          {/* form */}
          <form onSubmit={handleFormSubmit}>
            <div>
              <input
                type="text"
                name="title"
                placeholder="title"
                value={form.title}
                onChange={handleInputChange}
              />
              <textarea
                name="body"
                placeholder="body"
                value={form.body}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">
              {editingPost ? 'update Post' : 'Add Post'}
            </button>
          </form>
          <div>
            {posts.map((post) => {
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default PostPage;
