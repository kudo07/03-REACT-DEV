import React, { useEffect, useState } from 'react';
const PAGE_SIZE = 5;
const UserTable = () => {
  const [user, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  // handle add
  const handleAdd = () => {
    const newUser = { id: Date.now(), name: '', email: '', username: '' };
    setUsers([newUser, ...user]);
    setEditingId(newUser.id);
    setEditedUser(newUser);
  };
  // handle sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setUsers(
      [...user].sort((a, b) => {
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        // assume a[key] is really greater than b[key] thats why return 1 which means put a after b    otherwise vice versa
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        // assume a[key] is really smaller than b[key] thats why return -1 which means put a before b otherwise vice versa
        return 0;
      })
    );
  };
  // handle save
  const handleSave = () => {
    setUsers(
      // mainly here is users is map and user is the one data row from the users
      user.map((user) => (user.id === editedUser.id ? editedUser : user))
    );
    setEditingId(null);
  };
  //
  const handleEdit = (id) => {
    setEditingId(id);
    setEditedUser(user.find((user) => user.id === id));
  };
  // handle delete
  const handleDelete = (id) => {
    setUsers(user.filter((user) => user.id !== id));
  };
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const paginatedUsers = user.slice(startIndex, startIndex + PAGE_SIZE);
  console.log(paginatedUsers, 'paginated');

  return (
    <div className="p-6">
      <button onClick={handleAdd} className="mb-4 flex items-center">
        Add User
      </button>
      <table>
        <thead>
          <tr>
            {['id', 'name', 'username', 'email'].map((key) => (
              <th
                key={key}
                className="cursor-pointer"
                onClick={() => handleSort(key)}
              >
                {key}{' '}
                {sortConfig.key === key &&
                  (sortConfig.direction === 'asc' ? 'up' : 'down')}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        {console.log(user)}
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id}>
              {console.log(user, 'userrrr')}
              {Object.keys(user)
                .slice(0, 4)
                .map((key) => (
                  <td key={key}>
                    {editingId === user.id ? (
                      <input
                        type="text"
                        value={editedUser[key] || ''}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            [key]: e.target.value,
                          })
                        }
                      />
                    ) : (
                      user[key]
                    )}
                  </td>
                ))}
              <td>
                {editingId === user.id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <>
                    <button
                      className="cursor-pointer mr-3"
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="cursor-pointer"
                      onClick={() => handleDelete(user.id)}
                    >
                      delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="mr-10 cursor-pointer"
        >
          prev
        </button>
        <span className="mr-10 ">Page {currentPage}</span>
        <button
          className="cursor-pointer"
          onClick={() =>
            setCurrentPage((p) => (p * PAGE_SIZE < user.length ? p + 1 : p))
          }
        >
          next
        </button>
      </div>
    </div>
  );
};

export default UserTable;

// useEffect(() => {
//   fetchUsers();
// }, []);
// const fetchUsers = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/users');
//   const data = await res.json();
//   setUsers(data);
// };
