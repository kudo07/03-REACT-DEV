export const fetchUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('failed to fetch user');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
