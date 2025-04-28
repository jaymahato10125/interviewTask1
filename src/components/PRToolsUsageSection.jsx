import React, { useState, useRef, useEffect } from 'react';
import '../styles/PRToolsUsageSection.css';
import { gsap } from 'gsap';

const donutData = [
  { label: 'Agencies', yes: 82, no: 18 },
  { label: 'In-house teams', yes: 68, no: 32 },
  { label: 'Solo practitioner', yes: 60, no: 40 },
  { label: 'All answers', yes: 68, no: 32 },
];

const tableData = [
  { group: 'Yes', values: [67, 82, 58, 54] },
  { group: 'No', values: [33, 18, 42, 46] },
];
const tableHeaders = ['All Answers', 'Agencies', 'In-house teams', 'Sole practitioners'];

const tabs = ['Charts', 'Table'];
const donutColors = ['#ff6f3c', '#ffb199'];

const DonutChart = ({ yes, no, label, animateKey }) => {
  const yesRef = useRef();
  const noRef = useRef();
  const textRef = useRef();
  const size = 300;
  const stroke = 60;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    // Animate the "yes" arc
    gsap.fromTo(
      yesRef.current,
      { strokeDashoffset: circumference },
      {
        strokeDashoffset: circumference * (1 - yes / 100),
        duration: 1.5,
        ease: 'power2.out',
      }
    );
    // Animate the number in the center
    gsap.fromTo(
      textRef.current,
      { innerHTML: 0 },
      {
        innerHTML: yes,
        duration: 1.5,
        ease: 'power2.out',
        snap: { innerHTML: 1 },
        onUpdate: function () {
          textRef.current.innerHTML = Math.round(this.targets()[0].innerHTML) + '%';
        },
      }
    );
  }, [yes, animateKey, circumference]);

  return (
    <div className="donut-chart-group">
      <svg width={size} height={size} className="donut-svg">
        <circle
          className="donut-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={donutColors[1]}
          strokeWidth={stroke}
        />
        <circle
          className="donut-yes"
          ref={yesRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={donutColors[0]}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          className="donut-center-text"
          ref={textRef}
        >
          0%
        </text>
      </svg>
      <div className="donut-label">{label}</div>
    </div>
  );
};

const PRToolsUsageSection = () => {
  const [activeTab, setActiveTab] = useState('Charts');
  const [animateKey, setAnimateKey] = useState(0);
  const tableValueRefs = useRef([]);

  useEffect(() => {
    setAnimateKey(k => k + 1); // retrigger animation on tab switch
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== 'Table') return;
    tableData.forEach((row, rowIdx) => {
      row.values.forEach((val, colIdx) => {
        const cellIndex = rowIdx * row.values.length + colIdx;
        const cell = tableValueRefs.current[cellIndex];
        if (cell) {
          gsap.fromTo(
            cell,
            { innerHTML: 0 },
            {
              innerHTML: val,
              duration: 1.2,
              delay: 0.1 + 0.04 * cellIndex,
              ease: 'power2.out',
              snap: { innerHTML: 1 },
              onUpdate: function () {
                cell.innerHTML = Math.round(this.targets()[0].innerHTML) + '%';
              },
            }
          );
        }
      });
    });
  }, [activeTab]);

  return (
    <div className="pr-tools-usage-section">
      <div className="pr-tools-usage-header">
        <h2>
          Do you currently use <span className="highlight">any PR tools?</span>
        </h2>
        <div className="pr-tools-usage-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {activeTab === 'Charts' && (
        <>
          <div className="pr-tools-usage-legend">
            <span className="legend-dot yes" /> Yes
            <span className="legend-dot no" /> No
          </div>
          <div className="donut-charts-row">
            {donutData.map((d, i) => (
              <DonutChart key={d.label} {...d} animateKey={animateKey} />
            ))}
          </div>
        </>
      )}
      {activeTab === 'Table' && (
        <div className="pr-tools-usage-table-wrapper">
          <table className="pr-tools-usage-table">
            <thead>
              <tr>
                <th className="pr-tools-usage-table-header"></th>
                {tableHeaders.map((header, idx) => (
                  <th key={header} className="pr-tools-usage-table-header">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIdx) => (
                <tr key={row.group}>
                  <td className={`pr-tools-usage-table-group${row.group === 'Yes' ? ' yes' : ' no'}`}>{row.group}</td>
                  {row.values.map((val, colIdx) => {
                    const cellIndex = rowIdx * row.values.length + colIdx;
                    return (
                      <td
                        key={colIdx}
                        className="pr-tools-usage-table-value"
                        ref={el => (tableValueRefs.current[cellIndex] = el)}
                      >
                        0%
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="pr-tools-usage-summary">
        <div className="pr-tools-usage-summary-main">
          While budget constraints still hold back <span className="highlight-number">68%</span> of PR professionals who have yet to adopt PR tools in 2024, there's a growing recognition that the time investment to learn how to use them is worthwhile.
        </div>
        <div className="pr-tools-usage-summary-sub">
          Each year, fewer PR pros see these tools as irrelevant, signaling a shift in the industry towards embracing technology despite ongoing financial challenges.
        </div>
      </div>
    </div>
  );
};

export default PRToolsUsageSection; 