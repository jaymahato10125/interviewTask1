import React, { useState, useRef, useEffect } from 'react';
import '../styles/PainPointsStruggleSection.css';
import { gsap } from 'gsap';

const chartData = [
  { label: 'Working on a tight budget', values: [34, 48, 57] },
  { label: 'Getting journalists to respond', values: [60, 52, 56] },
  { label: 'Getting top-tier coverage', values: [46, 44, 50] },
  { label: 'Demonstrating the value of my work', values: [41, 41, 48] },
  { label: 'Finding the right media contacts', values: [35, 47, 43] },
  { label: 'Experiencing burnout', values: [38, 36, 41] },
  { label: 'Keeping my media lists organized', values: [30, 25, 31] },
  { label: 'Managing client expectations', values: [33, 26, 31] },
  { label: 'Tracking media coverage', values: [32, 29, 30] },
  { label: 'Implementing technology', values: [25, 28, 12] },
  { label: 'Collaboration with my team', values: [21, 19, 11] },
  { label: 'Other', values: [3, 2, 3] },
];

const years = [2024, 2023, 2022];
const barColors = ['#a192e7', '#cfc6f6', '#e3e0f7'];

const PainPointsStruggleSection = () => {
  const [activeTab, setActiveTab] = useState('charts');
  const barRefs = useRef([]);
  const valueRefs = useRef([]);
  const tableValueRefs = useRef([]);

  useEffect(() => {
    if (activeTab !== 'charts') return;
    chartData.forEach((item, rowIdx) => {
      item.values.forEach((val, colIdx) => {
        const barIndex = rowIdx * 3 + colIdx;
        const bar = barRefs.current[barIndex];
        const value = valueRefs.current[barIndex];
        if (bar && value) {
          gsap.fromTo(
            bar,
            { width: '0%' },
            {
              width: `${val}%`,
              duration: 1.2,
              delay: 0.1 + 0.04 * barIndex,
              ease: 'power2.out',
            }
          );
          gsap.fromTo(
            value,
            { innerHTML: 0 },
            {
              innerHTML: val,
              duration: 1.2,
              delay: 0.1 + 0.04 * barIndex,
              ease: 'power2.out',
              snap: { innerHTML: 1 },
              onUpdate: function () {
                value.innerHTML = Math.round(this.targets()[0].innerHTML) + '%';
              },
            }
          );
        }
      });
    });
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== 'table') return;
    // Animate all table values
    chartData.forEach((item, rowIdx) => {
      item.values.forEach((val, colIdx) => {
        const cellIndex = rowIdx * 3 + colIdx;
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
    <div className="struggle-section">
      <div className="struggle-header">
        <h2>
          Did you struggle with any of the <br />
          <span>following in the last 12 months?</span>
        </h2>
        <div className="struggle-tabs">
          <button
            className={activeTab === 'charts' ? 'active' : ''}
            onClick={() => setActiveTab('charts')}
          >
            Charts
          </button>
          <button
            className={activeTab === 'table' ? 'active' : ''}
            onClick={() => setActiveTab('table')}
          >
            Table
          </button>
        </div>
      </div>
      {activeTab === 'charts' ? (
        <div className="struggle-charts">
          <div className="struggle-legend">
            {years.map((year, i) => (
              <span key={year} style={{ color: barColors[i], fontWeight: 600, marginRight: 16 }}>
                <span className="legend-dot" style={{ background: barColors[i] }}></span>
                {year}
              </span>
            ))}
          </div>
          <div className="struggle-bars-grid">
            {chartData.map((item, idx) => (
              <div className="struggle-bar-row" key={item.label}>
                <div className="struggle-bar-label">{item.label}</div>
                <div className="struggle-bar-group-vertical">
                  {item.values.map((val, i) => {
                    const barIndex = idx * 3 + i;
                    return (
                      <div className="struggle-bar-vertical" key={years[i]}>
                        <div
                          className="struggle-bar-fill"
                          ref={el => (barRefs.current[barIndex] = el)}
                          style={{ width: 0, background: barColors[i] }}
                        >
                          <span
                            className="struggle-bar-value"
                            ref={el => (valueRefs.current[barIndex] = el)}
                          >
                            0%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="struggle-table-wrapper">
          <table className="struggle-table">
            <thead>
              <tr>
                <th className="table-category-header">&nbsp;</th>
                {years.map((year, i) => (
                  <th key={year} className="table-year-header">{year}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chartData.map((item, idx) => (
                <tr key={item.label}>
                  <td className="table-category-cell">{item.label}</td>
                  {item.values.map((val, i) => {
                    const cellIndex = idx * 3 + i;
                    return (
                      <td
                        key={years[i]}
                        className="table-value-cell"
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
      <div className="struggle-budget-cut-row">
        <div className="struggle-budget-cut-left">43%</div>
        <div className="struggle-budget-cut-right">
          of PR Pros have experienced budget cuts<br />
          leading to the cancellation of paid tools.
        </div>
      </div>
    </div>
  );
};

export default PainPointsStruggleSection; 