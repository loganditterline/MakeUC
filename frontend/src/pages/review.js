import React from 'react';
import '../styles/review.css';

function Review({ stats }) {
  return (
    <div className="review-main-div">
      {Object.entries(stats).map(([categoryName, categoryData]) => (
        <div key={categoryName} className="category">
          <h3>{categoryName}</h3>
          <div className="subcategory-list">
            {Object.entries(categoryData).map(([subcategoryName, subcategoryNet]) => (
              <div key={subcategoryName} className="subcategory">
                <p className="subcategory-name">{subcategoryName}</p>
                <p className="subcategory-net">
                  {subcategoryNet !== 0
                    ? (subcategoryNet > 0 ? `+${(subcategoryNet)}` : `${(subcategoryNet)}`)
                    : '-'
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Review;
