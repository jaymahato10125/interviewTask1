import React, { useState, useRef, useEffect } from 'react';
import '../styles/ImprovePRSection.css';
import { gsap } from 'gsap';

const chartData2024 = [
  { label: 'Securing top tier publication', value: 51 },
  { label: 'Tracking & measuring PR efforts', value: 40 },
  { label: 'Having a better understanding of media contacts and their beat', value: 33 },
  { label: 'Managing my daily PR activities more efficiently', value: 32 },
  { label: 'Creating comprehensive PR reports faster', value: 22 },
  { label: 'Improving the look & feel of press releases and PR pitches', value: 19 },
  { label: 'Other', value: 5 },
];

const chartData2023 = [
  { label: 'Securing top tier publication', value: 45 },
  { label: 'Tracking & measuring PR efforts', value: 38 },
  { label: 'Having a better understanding of media contacts and their beat', value: 29 },
  { label: 'Managing my daily PR activities more efficiently', value: 29 },
  { label: 'Creating comprehensive PR reports faster', value: 17 },
  { label: 'Improving the look & feel of press releases and PR pitches', value: 18 },
  { label: 'Other', value: 3 },
];

const chartData2022 = [
  { label: 'Securing top tier publication', value: null },
  { label: 'Tracking & measuring PR efforts', value: 23 },
  { label: 'Having a better understanding of media contacts and their beat', value: 29 },
  { label: 'Managing my daily PR activities more efficiently', value: 23 },
  { label: 'Creating comprehensive PR reports faster', value: 6 },
  { label: 'Improving the look & feel of press releases and PR pitches', value: 13 },
  { label: 'Other', value: 5 },
];

const tabs = ['2024', '2023', '2022', 'Table'];
const years = ['2024', '2023', '2022'];
const allChartData = [chartData2024, chartData2023, chartData2022];

const ImprovePRSection = () => {
  const [activeTab, setActiveTab] = useState('2024');
  const barRefs = useRef([]);
  const valueRefs = useRef([]);
  const tableValueRefs = useRef([]);

  useEffect(() => {
    let chartData = [];
    if (activeTab === '2024') chartData = chartData2024;
    else if (activeTab === '2023') chartData = chartData2023;
    else if (activeTab === '2022') chartData = chartData2022;
    else return;
    chartData.forEach((item, idx) => {
      const bar = barRefs.current[idx];
      const value = valueRefs.current[idx];
      if (bar && value) {
        if (item.value === null) {
          gsap.set(bar, { height: '0%' });
          value.innerHTML = '---';
        } else {
          gsap.fromTo(
            bar,
            { height: '0%' },
            {
              height: `${item.value}%`,
              duration: 1.2,
              delay: 0.1 + 0.04 * idx,
              ease: 'power2.out',
            }
          );
          gsap.fromTo(
            value,
            { innerHTML: 0 },
            {
              innerHTML: item.value,
              duration: 1.2,
              delay: 0.1 + 0.04 * idx,
              ease: 'power2.out',
              snap: { innerHTML: 1 },
              onUpdate: function () {
                value.innerHTML = Math.round(this.targets()[0].innerHTML) + '%';
              },
            }
          );
        }
      }
    });
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== 'Table') return;
    // Animate table values
    allChartData.forEach((row, rowIdx) => {
      row.forEach((item, colIdx) => {
        const cellIndex = rowIdx * row.length + colIdx;
        const cell = tableValueRefs.current[cellIndex];
        if (cell) {
          if (item.value === null) {
            cell.innerHTML = '---';
          } else {
            gsap.fromTo(
              cell,
              { innerHTML: 0 },
              {
                innerHTML: item.value,
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
        }
      });
    });
  }, [activeTab]);

  const getChartData = () => {
    if (activeTab === '2024') return chartData2024;
    if (activeTab === '2023') return chartData2023;
    if (activeTab === '2022') return chartData2022;
    return [];
  };

  return (
    <div className="improve-pr-section">
      <div className="improve-pr-header">
        <h2>
          What's the one thing you'd most like<br />
          <span>to improve in your PR work right now?</span>
        </h2>
        <div className="improve-pr-tabs">
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
      {(activeTab === '2024' || activeTab === '2023' || activeTab === '2022') && (
        <div className="improve-pr-bar-chart">
          {getChartData().map((item, idx) => (
            <div className="improve-pr-bar-group" key={item.label}>
              <span
                className={`improve-pr-bar-value${item.value === null ? ' disabled' : ''}`}
                ref={el => (valueRefs.current[idx] = el)}
              >
                {item.value === null ? '---' : '0%'}
              </span>
              <div className="improve-pr-bar-outer">
                <div
                  className={`improve-pr-bar${item.value === null ? ' disabled' : ''}`}
                  ref={el => (barRefs.current[idx] = el)}
                  style={{ height: 0 }}
                />
              </div>
              <div className="improve-pr-bar-label">{item.label}</div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'Table' && (
        <div className="improve-pr-table-wrapper">
          <table className="improve-pr-table">
            <thead>
              <tr>
                <th className="improve-pr-table-header"></th>
                {chartData2024.map((item, idx) => (
                  <th key={item.label} className="improve-pr-table-header">{item.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {years.map((year, rowIdx) => (
                <tr key={year}>
                  <td className="improve-pr-table-year">{year}</td>
                  {allChartData[rowIdx].map((item, colIdx) => {
                    const cellIndex = rowIdx * allChartData[rowIdx].length + colIdx;
                    return (
                      <td
                        key={colIdx}
                        className={`improve-pr-table-value${item.value === null ? ' disabled' : ''}`}
                        ref={el => (tableValueRefs.current[cellIndex] = el)}
                      >
                        {item.value === null ? '---' : '0%'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ImprovePRSection; 