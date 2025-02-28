import React, { useEffect } from 'react';
import './Post.css';
const Post = ({ data, setPage }) => {
  useEffect(() => {
    // created the callback fucntion receivers an arrau of the observed elements(param)

    const lastImage = document.querySelector('.image-post:last-child');
    const observer = new IntersectionObserver(
      (param) => {
        console.log(param);
        if (param[0].isIntersecting) {
          isIntersecting: false;
          //   [IntersectionObserverEntry];
          // 0
          //   param[0];
          //   0
          // :
          // IntersectionObserverEntry
          // boundingClientRect
          // :
          // DOMRectReadOnly {x: 0, y: 925.7999877929688, width: 246.40000915527344, height: 350, top: 925.7999877929688, …}
          // intersectionRatio
          // :
          // 0.9594285488128662
          // intersectionRect
          // :
          // DOMRectReadOnly {x: 0, y: 925.7999877929688, width: 246.40000915527344, height: 335.8000183105469, top: 925.7999877929688, …}
          // isIntersecting
          // :
          // true
          //   if the lastimage has present there it return true other wise it return false
          observer.unobserve(lastImage);
          // if the the data fetch for the next one we unobserver it because it will become the first image in the next batch
          // stop observing the last image once it appears, preventing duplicate triggers
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
    // the complete cleanup
    return () => {
      if (lastImage) {
        // Stops watching the last image to prevent multiple triggers and memory leaks.
        observer.unobserve(lastImage);
      }
      observer.disconnect();
      //   Completely removes the observer when the component updates/unmounts.
    };
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
// Issue: React re-renders the component whenever data updates.

// Each re-render creates a new observer.
// Old observers still exist and keep running in the background.
// This can cause memory leaks and performance issues.
// What Happens in Cleanup?
// observer.unobserve(lastImage)

// Stops watching the last image before it gets replaced in the next render.
// observer.disconnect()

// Completely removes the observer.
// Why? Even if we unobserve() one element, the observer still exists in memory.
// disconnect() clears all elements and ensures we don’t have multiple observers running.
// If we don't do cleanup, old observers will stay in memory and listen to changes forever.
