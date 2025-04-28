import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'

function App() {
  const [tocActive, setTocActive] = useState(false)
  const [keyFindingsActive, setKeyFindingsActive] = useState(false)
  const [introductionActive, setIntroductionActive] = useState(false)
  return (
    <div className="app">
      <Sidebar tocActive={tocActive} keyFindingsActive={keyFindingsActive} introductionActive={introductionActive} />
      <MainContent setTocActive={setTocActive} setKeyFindingsActive={setKeyFindingsActive} setIntroductionActive={setIntroductionActive} />
    </div>
  )
}

export default App 