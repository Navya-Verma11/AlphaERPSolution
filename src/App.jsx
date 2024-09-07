import './App.css'; 
import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';

const LandingPage = () => {
  const { ref: heroRef, inView: heroInView } = useInView();
  const { ref: featuresRef, inView: featuresInView } = useInView();
  const { ref: infoRef, inView: infoInView } = useInView();

  const [heroAnimation, heroApi] = useSpring(() => ({
    opacity: 0,
    transform: 'translateY(20px)',
    config: {
      duration: 1000,
    },
  }));

  const [featureAnimation, featureApi] = useSpring(() => ({
    opacity: 0,
    transform: 'translateY(20px)',
    config: {
      duration: 500,
    },
  }));

  const [infoAnimation, infoApi] = useSpring(() => ({
    opacity: 0,
    transform: 'translateY(20px)',
    config: {
      duration: 750,
    },
  }));

  useEffect(() => {
    heroApi.start({
      opacity: heroInView ? 1 : 0,
      transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
    });
  }, [heroInView, heroApi]);

  useEffect(() => {
    featureApi.start({
      opacity: featuresInView ? 1 : 0,
      transform: featuresInView ? 'translateY(0)' : 'translateY(20px)',
    });
  }, [featuresInView, featureApi]);

  useEffect(() => {
    infoApi.start({
      opacity: infoInView ? 1 : 0,
      transform: infoInView ? 'translateY(0)' : 'translateY(20px)',
    });
  }, [infoInView, infoApi]);

  const handleReadMoreClick = (e) => {
    e.preventDefault();
    const content = e.target.previousElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      e.target.textContent = 'Read More';
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      e.target.textContent = 'Read Less';
    }
  };

  const handleFeatureCardHover = (e) => {
    const featureCards = e.currentTarget.parentElement.children;
    Array.from(featureCards).forEach((card) => {
      if (card === e.currentTarget) {
        card.style.flex = '1.2';
      } else {
        card.style.flex = '0.9';
      }
    });
  };

  const handleFeatureCardLeave = (e) => {
    const featureCards = e.currentTarget.parentElement.children;
    Array.from(featureCards).forEach((card) => {
      card.style.flex = '1';
    });
  };

  const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const counterRef = useRef(null);

  useEffect(() => {
    if (counterRef.current) {
      animateValue(counterRef.current, 0, 300, 2000);
    }
  }, []);

  return (
    <div>
      <header>
        <div className="top-bar">ALPHA</div>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#home">Sage Add ons</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="hero" ref={heroRef}>
          <div className="hero-content">
            <animated.h1 style={heroAnimation}>SAGE 300 CLOUD & SAGE 500 ERP</animated.h1>
            <p>A professional services provider with roots in finance</p>
            <a href="#" className="cta-button">Learn More</a>
          </div>
        </section>

        <section id="features" ref={featuresRef}>
          <animated.div className="feature-card" style={featureAnimation} onMouseEnter={handleFeatureCardHover} onMouseLeave={handleFeatureCardLeave}>
            <i className="fas fa-rocket"></i>
            <h3>A to Z Solutions on your requirement</h3>
            <p>We have provide complete A to Z solution to our client on there requirement. Our development and consultancy firm always follow software development life cycle for fulfill there requirement.</p>
          </animated.div>
          <animated.div className="feature-card" style={featureAnimation} onMouseEnter={handleFeatureCardHover} onMouseLeave={handleFeatureCardLeave}>
            <i className="fas fa-cogs"></i>
            <h3>Make Ready Your Business for Expansion</h3>
            <p>Sage 300cloud is an economical, modular system. This allows you to choose the features that make sense to your business, while maintaining the opportunity to add more functionality to grow your business.</p>
          </animated.div>
          <animated.div className="feature-card" style={featureAnimation} onMouseEnter={handleFeatureCardHover} onMouseLeave={handleFeatureCardLeave}>
            <i className="fas fa-chart-line"></i>
            <h3>Sage classic and cloud based development</h3>
            <p>We have provide development services for Sage 300 Classic and cloud based technology. Our teams includes with Microsoft Certified Developer which are more excellent with great innovation.</p>
          </animated.div>
        </section>

        <section id="info-grid" ref={infoRef}>
          <animated.div className="info-row" style={infoAnimation}>
            <div className="info-item">
              <img src="placeholder1.jpg" alt="Info 1" />
              <div className="info-content">
                <h3>Information Title 1</h3>
                <p>Brief description of the information goes here.</p>
                <a href="#" className="read-more" onClick={handleReadMoreClick}>Read More</a>
              </div>
            </div>
            <div className="info-item">
              <div className="info-content">
                <h3>Information Title 2</h3>
                <p>Brief description of the information goes here.</p>
                <a href="#" className="read-more" onClick={handleReadMoreClick}>Read More</a>
              </div>
              <img src="placeholder2.jpg" alt="Info 2" />
            </div>
          </animated.div>
          {/* Additional info-row sections */}
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
