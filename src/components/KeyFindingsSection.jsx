import React, { useEffect, useRef } from 'react';
import '../styles/KeyFindingsSection.css';
import { gsap } from 'gsap';

const keyFindings = [
  {
    image: '/images/1.png',
    heading: 'Tracking and measuring PR efforts',
    text: 'The importance of tracking and measuring PR efforts has surged, with <span class="percentage" data-start="0" data-end="38">0%</span> of professionals prioritizing this in 2024, up from just <span class="percentage" data-start="0" data-end="23">0%</span> in 2022.'
  },
  {
    image: '/images/2.png',
    heading: 'Budget constraints',
    text: 'Budget constraints remain the top cause for not using PR tools, affecting 68% of professionals in 2024, with sole practitioner particularly impacted at 71%.'
  },
  {
    image: '/images/3.png',
    heading: 'Effective outreach',
    text: 'The use of regular email services for pitches has plummeted from 74% in 2022 to 50% in 2024, signaling a move towards specialized tools for more effective outreach.'
  },
  {
    image: '/images/4.png',
    heading: 'Satisfaction with PR tools',
    text: 'Satisfaction with PR tools has nearly doubled since 2022, with 60% of professionals now expressing contentment, up from 36%.'
  },
  {
    image: '/images/5.png',
    heading: "Demonstrating PR's value",
    text: "The challenge of demonstrating PR's value has intensified, with 48% struggling in 2024 due to higher ROI expectations from stakeholders."
  },
  {
    image: '/images/6.png',
    heading: 'AI for research, analysis, and reporting',
    text: 'The use of AI for research, analysis, and reporting has skyrocketed, from 53% to 67% for research and from 8% to 31% for analysis.'
  },
  {
    image: '/images/7.png',
    heading: 'Data analysis in PR',
    text: 'The value placed on data analysis skills in PR dropped by 8% as AI increasingly automates these tasks, shifting focus to more uniquely human skills.'
  },
  {
    image: '/images/8.png',
    heading: 'Sales metrics in PR',
    text: 'The emphasis on sales metrics in PR measurement rose from 13% in 2023 to 19% in 2024, reflecting a shift towards more business-oriented outcomes.'
  }
];

const KeyFindingsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const percentageElements = sectionRef.current.querySelectorAll('.percentage');
    
    percentageElements.forEach(element => {
      const startValue = parseInt(element.getAttribute('data-start'));
      const endValue = parseInt(element.getAttribute('data-end'));
      
      gsap.fromTo(element, 
        { innerHTML: startValue },
        {
          innerHTML: endValue,
          duration: 2,
          ease: "power1.out",
          snap: { innerHTML: 1 },
          onUpdate: function() {
            element.innerHTML = Math.round(this.targets()[0].innerHTML) + '%';
          }
        }
      );
    });
  }, []);

  return (
    <section className="key-findings-section" ref={sectionRef}>
      <div id="key-findings" className="key-findings-header1">
        <h2>Key Findings</h2>
      </div>
      <div className="key-findings-cards-container">
        <div className="key-findings-scroll">
          {keyFindings.map((card, idx) => (
            <div className="key-finding-card" key={idx}>
              <img src={card.image} alt={card.heading} className="key-finding-image" />
              <h3 className="key-finding-title">{card.heading}</h3>
              <p className="key-finding-text" dangerouslySetInnerHTML={{ __html: card.text }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFindingsSection; 