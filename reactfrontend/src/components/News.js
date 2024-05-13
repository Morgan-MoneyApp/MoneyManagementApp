import React from 'react';
import '../styles/news.css';
import SAkids from '../images/groupofkidsSA.jpg';
import Interns from '../images/internsbank.jpg';
import Const from '../images/construction.jpg';

function News() {
  return (
    <section id="blog-986">
      <div className="cs-container">
        <div className="cs-content">
          <div className="cs-flex">
            <h2 className="cs-title">Latest News and Articles</h2>
          </div>
        </div>
        <ul className="cs-card-group">
          <li className="cs-item">
            <picture className="cs-picture">
              {/* Mobile Image */}
              <source media="(max-width: 600px)" srcSet={SAkids} />
              {/* Tablet and above Image */}
              <source media="(min-width: 601px)" srcSet={SAkids} />
              <img loading="lazy" decoding="async" src={SAkids} alt="stylist" width="413" height="480" />
            </picture>
            <div className="cs-info">
              <span className="cs-date">
                <img
                  className="cs-icon"
                  loading="lazy"
                  decoding="async"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/calendar.svg"
                  alt="stylist"
                  width="20"
                  height="20"
                />
                August 14, 2025
              </span>
              <h3 className="cs-h3">Morgan Bank 5th Annual Drive</h3>
              <span className="cs-desc">
                Morgan Bank celebrates their 5th annual community drive to support the local kids and struggling family with new water
                systems and wells...
              </span>
              <a href="/" className="cs-link">
                Read More
              </a>
            </div>
          </li>
          <li className="cs-item">
            <picture className="cs-picture">
              {/* Mobile Image */}
              <source media="(max-width: 600px)" srcSet={Interns} />
              {/* Tablet and above Image */}
              <source media="(min-width: 601px)" srcSet={Interns} />
              <img loading="lazy" decoding="async" src={Interns} alt="stylist" width="413" height="480" />
            </picture>
            <div className="cs-info">
              <span className="cs-date">
                <img
                  className="cs-icon"
                  loading="lazy"
                  decoding="async"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/calendar.svg"
                  alt="stylist"
                  width="20"
                  height="20"
                />
                October 20, 2025
              </span>
              <h3 className="cs-h3">Morgan Bank Welcomes New Interns Into Their NIL Program</h3>
              <span className="cs-desc">
                Recent Business graduates start their day one at Morgan Bank HQ, with hopes of a bright future ahead...
              </span>
              <a href="/" className="cs-link">
                Read More
              </a>
            </div>
          </li>
          <li className="cs-item">
            <picture className="cs-picture">
              {/* Mobile Image */}
              <source media="(max-width: 600px)" srcSet={Const} />
              {/* Tablet and above Image */}
              <source media="(min-width: 601px)" srcSet={Const} />
              <img loading="lazy" decoding="async" src={Const} alt="stylist" width="413" height="480" />
            </picture>
            <div className="cs-info">
              <span className="cs-date">
                <img
                  className="cs-icon"
                  loading="lazy"
                  decoding="async"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/calendar.svg"
                  alt="stylist"
                  width="20"
                  height="20"
                />
                November 23, 2025
              </span>
              <h3 className="cs-h3">Morgan Bank New Headquarters</h3>
              <span className="cs-desc">
                Construction of the new state of the art Morgan Bank Headquarters has begun and has been set to be completed by end of
                2027...
              </span>
              <a href="/" className="cs-link">
                Read More
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default News;
