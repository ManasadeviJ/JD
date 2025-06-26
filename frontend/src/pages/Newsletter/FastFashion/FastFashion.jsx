import React from 'react';
import './FastFashion.css';
import Card from '../../components/Newsletter-components/shared/Card/Card.jsx';

// This component now receives 'posts' as a prop
const FastFashion = ({ posts }) => {
  // Safety check
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="ff-section">
      <div className="ff-title-container">
        <h2 className="ff-title-line1">FAST</h2>
        <h2 className="ff-title-line2">FASHION</h2>
      </div>
      <div className="ff-grid">
        {/* We now map over the received posts to render cards dynamically */}
        {posts.map(post => (
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
    </section>
  );
};

export default FastFashion;