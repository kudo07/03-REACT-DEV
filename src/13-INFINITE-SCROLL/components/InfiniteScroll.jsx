import { useEffect, useState } from 'react';
import Post from './Post';

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=3`)
      .then((res) => {
        return res.json();
      })
      .then((data) => setData((oldData) => [...oldData, ...data]));
  }, [page]);
  console.log(data);

  return <Post data={data} setPage={setPage} />;
};

export default InfiniteScroll;
