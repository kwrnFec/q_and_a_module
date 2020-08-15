import React from 'react';

// makes chevron symbol
const Chevron = (props) => {
  if (props.direction === 'down') {
    return (
      <svg width="20px" height="20px" viewBox="0 0 1792 1792" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1683 808l-742 741q-19 19-45 19t-45-19l-742-741q-19-19-19-45.5t19-45.5l166-165q19-19 45-19t45 19l531 531 531-531q19-19 45-19t45 19l166 165q19 19 19 45.5t-19 45.5z" /></svg>

      // // Solid triangle down
      // <svg width="20px" height="20px" viewBox="0 0 16 12" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      //   <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
      // </svg>
    );
  } else if (props.direction === 'up') {
    return (
      <svg width="20px" height="20px" viewBox="0 0 1792 1792" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1683 1331l-166 165q-19 19-45 19t-45-19l-531-531-531 531q-19 19-45 19t-45-19l-166-165q-19-19-19-45.5t19-45.5l742-741q19-19 45-19t45 19l742 741q19 19 19 45.5t-19 45.5z" /></svg>

      // Solid triangle up
      // <svg width="20px" height="20px" viewBox="0 0 16 14" className="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      //   <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
      // </svg>
    );
  }
}

export default Chevron;