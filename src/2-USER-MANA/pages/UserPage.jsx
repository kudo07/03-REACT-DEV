import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../hooks/useFetch';
import Loader from '../../1-CRUD-FETCH/1-COPY/components/Loader';
import ErrorMessage from '../../1-CRUD-FETCH/1-COPY/components/ErrorMessage';
import Searchbar from '../components/Searchbar';
import FilterDropdown from '../components/FilterDropdown';
import Usercard from '../components/Usercard';
import Pagination from '../components/Pagination';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        console.log(data);
        setUsers(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);
  // filteration
  const filteredUser = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchedCity = selectedCity
      ? user.address.city === selectedCity
      : true;
    return matchesSearch && matchedCity;
  });
  // pagination
  const totalPages = Math.ceil(filteredUser.length / itemsPerPage);
  const paginatedUsers = filteredUser.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const cityOptions = Array.from(
    new Set(users.map((user) => user.address.city))
  );
  console.log(cityOptions);
  return (
    <div>
      <h1>User Management</h1>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} onRetry={handleRetry} />}
      {!loading && !error && (
        <>
          <Searchbar searchTerm={searchTerm} onSearch={setSearchTerm} />
          <FilterDropdown
            options={cityOptions}
            selected={selectedCity}
            onChange={setSelectedCity}
          />
          {/* user List */}
          <div>
            {paginatedUsers.map((user) => (
              <Usercard key={user.id} user={user} />
            ))}
          </div>
          {/* pagination */}
          {filteredUser.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UserPage;
