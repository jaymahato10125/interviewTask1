import React from 'react';
import '../styles/UseOfPRToolsSection.css';

const UseOfPRToolsSection = () => (
  <div className="use-of-pr-tools-section">
    <div className="pr-tools-header">
      <span className="pr-tools-header-text">Use of <span className="highlight">PR Tools</span></span>
      <div className="pr-tools-header-illustration">{/* Illustration placeholder */}</div>
    </div>
    <div className="pr-tools-content-row">
      <div className="pr-tools-content-left">
        <h2>
          PR Tool Adoption Rises, <span className="highlight">Yet One-Third Still Go Without</span>
        </h2>
      </div>
      <div className="pr-tools-content-right">
        <h3>The PR tool divide: agencies embrace, solos lag behind</h3>
        <p>
          PR tool usage has surged to nearly <span className="highlight-number">68%</span> in 2024. While adoption rates have grown, especially among agencies where <span className="highlight-number">82%</span> now leverage these tools, one-third of PR professionals are still working without them, reflecting a significant gap in the industry's tech integration.
        </p>
      </div>
    </div>
  </div>
);

export default UseOfPRToolsSection; 