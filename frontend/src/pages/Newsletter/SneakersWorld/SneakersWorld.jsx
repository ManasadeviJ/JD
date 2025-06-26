import React from 'react';
import './SneakersWorld.css';
import Card from '../../components/Newsletter-components/shared/Card/Card.jsx';
const SneakersWorld = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="sw-section">
      <div className="sw-title-container">
        <h2 className="sw-title-line1">SNEAKER</h2>
        <h2 className="sw-title-line2">WORLD</h2>
      </div>
      <div className="sw-grid-container">
        {posts[0] && (
          <div className="sw-card-wrapper sw-large-card">
            <Card {...posts[0]} articleUrl={`/article/${posts[0].slug}`} />
          </div>
        )}
        {posts[1] && (
          <div className="sw-card-wrapper sw-small-card-1">
            <Card {...posts[1]} articleUrl={`/article/${posts[1].slug}`} />
          </div>
        )}
        {posts[2] && (
          <div className="sw-card-wrapper sw-small-card-2">
            <Card {...posts[2]} articleUrl={`/article/${posts[2].slug}`} />
          </div>
        )}
        {posts[3] && (
          <div className="sw-card-wrapper sw-small-card-3">
            <Card {...posts[3]} articleUrl={`/article/${posts[3].slug}`} />
          </div>
        )}
        {posts[4] && (
          <div className="sw-card-wrapper sw-small-card-4">
            <Card {...posts[4]} articleUrl={`/article/${posts[4].slug}`} />
          </div>
        )}
      </div>
    </section>
  );
};

export default SneakersWorld;