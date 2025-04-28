import React, { useState, useRef, useEffect } from 'react';
import '../styles/PRToolsNoUsageReasonsSection.css';
import { gsap } from 'gsap';

const chartData = [
  {
    reason: "I don't have the budget (68%)",
    values: [72, 57, 71],
  },
  {
    reason: "I don't have time to learn (19%)",
    values: [22, 21, 14],
  },
  {
    reason: 'Other (19%)',
    values: [6, 4, 7],
  },
  {
    reason: "I don't need any (8%)",
    values: [13, 17, 14],
  },
];

const legendLabels = ['Agencies', 'In-house teams', 'Solo practitioner'];
const barColors = ['#ff6f3c', '#ffb199', '#ff9e7c'];
const tabs = ['Charts', 'Table'];

const PRToolsNoUsageReasonsSection = () => {
  const [activeTab, setActiveTab] = useState('Charts');
  const barRefs = useRef([]);
  const valueRefs = useRef([]);
  const tableValueRefs = useRef([]);

  useEffect(() => {
    if (activeTab !== 'Charts') return;
    let barIdx = 0;
    chartData.forEach((group) => {
      group.values.forEach((val, i) => {
        const bar = barRefs.current[barIdx];
        const value = valueRefs.current[barIdx];
        if (bar && value) {
          gsap.fromTo(
            bar,
            { height: '0%' },
            {
              height: `${val}%`,
              duration: 1.2,
              delay: 0.1 + 0.04 * barIdx,
              ease: 'power2.out',
            }
          );
          gsap.fromTo(
            value,
            { innerHTML: 0 },
            {
              innerHTML: val,
              duration: 1.2,
              delay: 0.1 + 0.04 * barIdx,
              ease: 'power2.out',
              snap: { innerHTML: 1 },
              onUpdate: function () {
                value.innerHTML = Math.round(this.targets()[0].innerHTML) + '%';
              },
            }
          );
        }
        barIdx++;
      });
    });
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== 'Table') return;
    const tableValues = [72, 57, 71, 22, 21, 14, 6, 4, 7, 13, 17, 14];
    tableValueRefs.current.forEach((ref, idx) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { innerHTML: 0 },
          {
            innerHTML: tableValues[idx],
            duration: 1.2,
            delay: 0.1 + 0.04 * idx,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            onUpdate: function () {
              ref.innerHTML = Math.round(this.targets()[0].innerHTML) + '%';
            },
          }
        );
      }
    });
  }, [activeTab]);

  let barIdx = 0;

  return (
    <div className="pr-tools-no-usage-section">
      <div className="pr-tools-no-usage-header">
        <h2>
          What are the primary reasons why<br />
          <span className="highlight">you do not use PR tools?</span>
        </h2>
        <div className="pr-tools-no-usage-tabs">
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
          <div className="pr-tools-no-usage-charts-container">
            {/* First Chart: I don't have the budget (68%) */}
            <div className="pr-tools-no-usage-chart budget-chart">
              <div className="pr-tools-no-usage-reason">I don't have the budget (68%)</div>
              <div className="pr-tools-no-usage-bars vertical">
                {[72, 57, 71].map((val, i) => {
                  const idx = barIdx++;
                  return (
                    <div className="pr-tools-no-usage-bar-group-vertical" key={i}>
                      <div
                        className="pr-tools-no-usage-bar-vertical"
                        ref={el => (barRefs.current[idx] = el)}
                        style={{ height: 0, background: barColors[i] }}
                      >
                        <span
                          className="pr-tools-no-usage-bar-value"
                          ref={el => (valueRefs.current[idx] = el)}
                        >
                          0%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Second Chart: I don't have time to learn (19%) */}
            <div className="pr-tools-no-usage-chart time-chart">
              <div className="pr-tools-no-usage-reason">I don't have time to learn (19%)</div>
              <div className="pr-tools-no-usage-bars vertical">
                {[22, 21, 14].map((val, i) => {
                  const idx = barIdx++;
                  return (
                    <div className="pr-tools-no-usage-bar-group-vertical" key={i}>
                      <div
                        className="pr-tools-no-usage-bar-vertical"
                        ref={el => (barRefs.current[idx] = el)}
                        style={{ height: 0, background: barColors[i] }}
                      >
                        <span
                          className="pr-tools-no-usage-bar-value"
                          ref={el => (valueRefs.current[idx] = el)}
                        >
                          0%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Third Chart: Other (19%) */}
            <div className="pr-tools-no-usage-chart other-chart">
              <div className="pr-tools-no-usage-reason">Other (19%)</div>
              <div className="pr-tools-no-usage-bars vertical">
                {[6, 4, 7].map((val, i) => {
                  const idx = barIdx++;
                  return (
                    <div className="pr-tools-no-usage-bar-group-vertical" key={i}>
                      <div
                        className="pr-tools-no-usage-bar-vertical"
                        ref={el => (barRefs.current[idx] = el)}
                        style={{ height: 0, background: barColors[i] }}
                      >
                        <span
                          className="pr-tools-no-usage-bar-value"
                          ref={el => (valueRefs.current[idx] = el)}
                        >
                          0%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Fourth Chart: I don't need any (8%) - horizontal bars */}
            <div className="pr-tools-no-usage-chart noneed-chart">
              <div className="pr-tools-no-usage-reason">I don't need any (8%)</div>
              <div className="pr-tools-no-usage-bars horizontal">
                {[13, 17, 14].map((val, i) => {
                  const idx = barIdx++;
                  return (
                    <div className="pr-tools-no-usage-bar-group-horizontal" key={i}>
                      <div
                        className="pr-tools-no-usage-bar-horizontal"
                        ref={el => (barRefs.current[idx] = el)}
                        style={{ width: 0, background: barColors[i], height: '28px' }}
                      >
                        <span
                          className="pr-tools-no-usage-bar-value"
                          ref={el => (valueRefs.current[idx] = el)}
                        >
                          0%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
      {activeTab === 'Table' && (
        <div className="pr-tools-no-usage-table-wrapper">
          <table className="pr-tools-no-usage-table">
            <thead>
              <tr>
                <th></th>
                <th>Agencies</th>
                <th>In-house teams</th>
                <th>Sole practitioners</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="reason">I don't have the budget (68%)</th>
                <td ref={el => (tableValueRefs.current[0] = el)}>0%</td>
                <td ref={el => (tableValueRefs.current[1] = el)}>0%</td>
                <td ref={el => (tableValueRefs.current[2] = el)}>0%</td>
              </tr>
              <tr>
                <th className="reason">I don't have time to learn (19%)</th>
                <td ref={el => (tableValueRefs.current[3] = el)}>0%</td>
                <td ref={el => (tableValueRefs.current[4] = el)}>0%</td>
                <td ref={el => (tableValueRefs.current[5] = el)}>0%</td>
              </tr>
              <tr>
                <th className="reason">Other (19%)</th>
                <td ref={el => (tableValueRefs.current[6] = el)}>0%</td>
                <td ref={el => (tableValueRefs.current[7] = el)}>0%</td>
                <td ref={el => (tableValueRefs.current[8] = el)}>0%</td>
              </tr>
              <tr>
                <th className="reason">I don't need any (8%)</th>
                <td ref={el => (tableValueRefs.current[9] = el)}>0%</td>
                <td ref={el => (tableValueRefs.current[10] = el)}>0%</td>
                <td ref={el => (tableValueRefs.current[11] = el)}>0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PRToolsNoUsageReasonsSection; 