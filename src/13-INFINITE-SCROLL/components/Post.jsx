import React, { useEffect } from 'react';
import './Post.css';
const Post = ({ data, setPage }) => {
  useEffect(() => {
    const lastImage = document.querySelector('.image-post:last-child');
    const observer = new IntersectionObserver(
      (param) => {
        console.log(param);
        if (param[0].isIntersecting) {
          observer.unobserve(lastImage);
          // if the the data fetch for the next one we unobserver it because it will become the first image in the next batch

          setPage((page) => page + 1);
        }
      },
      { threshold: 0.8 }
    );
    console.log('outside', lastImage);
    if (!lastImage) {
      return;
    }
    observer.observe(lastImage);
  }, [data]);
  return (
    <div className="containerr">
      {data.map((item, index) => {
        return (
          <img className="image-post" key={item.id} src={item.download_url} />
        );
      })}
    </div>
  );
};

export default Post;
// [IntersectionObserverEntry]
// 0
// :
// IntersectionObserverEntry
// boundingClientRect
// :
// DOMRectReadOnly {x: 765, y: 2269.800048828125, width: 250, height: 350, top: 2269.800048828125, …}
// intersectionRatio
// :
// 0
// intersectionRect
// :
// DOMRectReadOnly {x: 0, y: 0, width: 0, height: 0, top: 0, …}
// isIntersecting
// :
// false
// isVisible
// :
// false
// rootBounds
// :
// DOMRectReadOnly {x: 0, y: 0, width: 1780, height: 1245.5999755859375, top: 0, …}
// target
// :
// img.image-post
// __reactEvents$g1kr5t6joel
// :
// Set(2) {'error__bubble', 'load__bubble'}
// __reactFiber$g1kr5t6joel
// :
// FiberNode {tag: 5, key: '11', elementType: 'img', type: 'img', stateNode: img.image-post, …}
// __reactProps$g1kr5t6joel
// :
// {className: 'image-post', src: 'https://picsu
// key=11
