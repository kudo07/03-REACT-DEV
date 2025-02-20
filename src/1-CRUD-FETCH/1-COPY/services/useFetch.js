export const fetchPosts = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('failed to fetch posts');
    }
    const data = await response.json();
    return data.slice(0, 5);
  } catch (error) {
    throw error;
  }
};
