import React, { useState } from 'react';

const StarRating = ({ starCount = 10 }) => {
  const [starValue, setStartValue] = useState();
  const [hoverValue, setHoverValue] = useState(0);
  return (
    <div className="flex gap-4 justify-center items-center h-screen">
      {Array.from({ length: starCount }).map((_, index) => {
        {
          console.log(index, starValue, hoverValue);
        }
        return (
          //             The key prop ensures React does not unmount and re-mount elements.
          // Instead, it just updates the className dynamically.
          <button
            key={index}
            // when i click suppose 8 so the again the component  re render and iterate it to and fill colors until index like
            // 0<8 fill orange , 1<8 fill colors till 8 and when 9 ctext-2xl omes it wont fill thegold
            className={
              (hoverValue === 0 && index < starValue) || index < hoverValue
                ? 'text-orange-500 text-3xl'
                : 'text-3xl'
            }
            onClick={() => setStartValue(index + 1)}
            onMouseEnter={() => setHoverValue(index + 1)}
            // when i dont hover , hovervalue is set 0 on mouseleave and the first condition run hovver===0 and index<starValue
            // when i hover the color fils till the index is less than hover value if hover is 4 then color shoud fill till 4 despite it already selected when
            // when mouse leve its first condition activated
            onMouseLeave={() => setHoverValue(0)}
          >
            &#9733;
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
