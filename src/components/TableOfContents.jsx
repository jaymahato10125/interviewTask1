import React from 'react'
import '../styles/TableOfContents.css'

const TableOfContents = () => {
  const tableContents = [
    { id: '01', title: 'Introduction' },
    { id: '02', title: 'Table of Contents' },
    { id: '03', title: 'Key Findings' },
    { id: '04', title: 'Pain Points in PR' },
    { id: '05', title: 'The Use of PR Tools' },
    { id: '06', title: 'AI in PR: Promise or Pitfall?' },
    { id: '07', title: "What's Next in PR Tech" },
    { id: '08', title: 'About Prowly' }
  ]

  const highlightIds = ['01', '02', '03', '08']

  return (
    <div id="table-of-contents">
      <div className="section-header">
        <h2>Table of Contents</h2>
      </div>
      <div className="table-of-contents-container">
        <div className="table-grid">
          {tableContents.map((item) => (
            <div
              key={item.id}
              className={`table-card${highlightIds.includes(item.id) ? ' highlight-hover' : ''}${item.id === '07' ? ' blue-hover' : ''}${item.id === '04' ? ' purple-hover' : ''}${item.id === '05' ? ' orange-hover' : ''}${item.id === '06' ? ' green-hover' : ''}`}
            >
              <div className="card-number">{item.id}</div>
              <div className="card-title">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TableOfContents 