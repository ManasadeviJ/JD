import React from 'react';
import './LuxuryFashion.css';
import Card from '../../components/Newsletter-components/shared/Card/Card.jsx';
// The component is now "dumb" and receives 'posts' as a prop
const LuxuryFashion = ({ posts }) => { 
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="lf-section">
      <div className="lf-title-container">
        <h2 className="lf-title-line1">LUXURY</h2>
        <h2 className="lf-title-line2">FASHION</h2>
      </div>
      <div className="lf-grid-container">
        {posts[0] && (
          <div className="lf-card-wrapper lf-card-1">
            <Card {...posts[0]} articleUrl={`/article/${posts[0].slug}`} />
          </div>
        )}
        {posts[1] && (
          <div className="lf-card-wrapper lf-card-2">
            <Card {...posts[1]} articleUrl={`/article/${posts[1].slug}`} />
          </div>
        )}
        {posts[2] && (
          <div className="lf-card-wrapper lf-card-3">
            <Card {...posts[2]} articleUrl={`/article/${posts[2].slug}`} />
          </div>
        )}
        {posts[3] && (
          <div className="lf-card-wrapper lf-card-large">
            <Card {...posts[3]} articleUrl={`/article/${posts[3].slug}`} />
          </div>
        )}
        {posts[4] && (
          <div className="lf-card-wrapper lf-card-tall">
            <Card {...posts[4]} articleUrl={`/article/${posts[4].slug}`} />
          </div>
        )}
      </div>
    </section>
  );
};

export default LuxuryFashion;