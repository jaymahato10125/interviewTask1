import React from 'react'
import '../styles/Sidebar.css'

const Sidebar = ({ tocActive, keyFindingsActive, introductionActive }) => {
  const menuItems = [
    { id: '01', title: 'Introduction' },
    { id: '02', title: 'Table of Contents' },
    { id: '03', title: 'Key Findings' },
    { id: '04', title: 'Pain Points in PR' },
    { id: '05', title: 'The Use of PR Tools' },
    { id: '06', title: 'AI in PR: Promise or Pitfall?' },
    { id: '07', title: "What's Next in PR Tech" },
    { id: '08', title: 'About Prowly' }
  ]

  const handleNavClick = (title) => {
    const sectionId = title.toLowerCase().replace(/\s+/g, '-')
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo">Prowly</div>
      </div>
      <nav className="nav-menu">
        {menuItems.map((item) => {
          let extraClass = ''
          if (item.title === 'Table of Contents' && tocActive) extraClass = ' active-toc'
          if (item.title === 'Key Findings' && keyFindingsActive) extraClass = ' active-key-findings'
          if (item.title === 'Introduction' && introductionActive) extraClass = ' active-introduction'
          return (
            <button 
              key={item.id} 
              className={`nav-item${extraClass}`}
              onClick={() => handleNavClick(item.title)}
            >
              <span className="nav-id">{item.id}</span>
              <span className="nav-title">{item.title}</span>
            </button>
          )
        })}
      </nav>
      <button className="download-btn">
        DOWNLOAD PDF ↓
      </button>
    </div>
  )
}

export default Sidebar 