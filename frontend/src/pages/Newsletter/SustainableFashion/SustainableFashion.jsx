import React from 'react';
import './SustainableFashion.css';
import Card from '../../components/shared/Card/Card.jsx';

const SustainableFashion = ({ posts }) => { 
  if (!posts || posts.length === 0) {
    return null;
  }

  // --- THIS IS THE FIX ---
  // Take the first 2 posts for the hero section.
  const heroPosts = posts.slice(0, 2); 
  // Take the next 4 posts for the small grid section.
  const smallPosts = posts.slice(2, 6); 

  return (
    <section className="sf-section">
      <div className="sf-title-container">
        <h2 className="sf-title-line1">SUSTAINABLE</h2>
        <h2 className="sf-title-line2">FASHION</h2>
      </div>

      {/* Only render the hero grid if there are posts for it */}
      {heroPosts.length > 0 && (
        <div className="sf-grid-hero">
          {heroPosts.map(post => (
            <div className="card-wrapper" key={post.slug}>
              <Card 
                imageUrl={post.imageUrl}
                description={post.description}
                publishDate={post.publishDate}
                articleUrl={`/article/${post.slug}`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Only render the small grid if there are posts for it */}
      {smallPosts.length > 0 && (
        <div className="sf-grid-small">
          {smallPosts.map(post => (
            <div className="card-wrapper" key={post.slug}>
              <Card 
                imageUrl={post.imageUrl}
                description={post.description}
                publishDate={post.publishDate}
                articleUrl={`/article/${post.slug}`}
                location={post.location}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SustainableFashion;