import React, { useEffect, useRef } from 'react'
import '../styles/MainContent.css'
import Lottie from 'lottie-react'
import chessAnimation from '../../icon/chess01.json'
import TableOfContents from './TableOfContents'
import KeyFindingsSection from './KeyFindingsSection'
import PainPointsSection from './PainPointsSection'
import PainPointsStruggleSection from './PainPointsStruggleSection'
import StrategyResultsSection from './StrategyResultsSection'
import ImprovePRSection from './ImprovePRSection'
import UseOfPRToolsSection from './UseOfPRToolsSection'
import PRToolsUsageSection from './PRToolsUsageSection'
import PRToolsNoUsageReasonsSection from './PRToolsNoUsageReasonsSection'
import { gsap } from 'gsap'

const MainContent = ({ setTocActive, setKeyFindingsActive, setIntroductionActive }) => {
  const tocRef = useRef(null)
  const keyFindingsRef = useRef(null)
  const introRef = useRef(null)
  const introContentRef = useRef(null)
  const percentageRef = useRef(null)
  const painPointsRef = useRef(null)

  useEffect(() => {
    if (!tocRef.current) return
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setTocActive(entry.intersectionRatio >= 0.5)
      },
      { threshold: [0, 0.5, 1] }
    )
    observer.observe(tocRef.current)
    return () => observer.disconnect()
  }, [setTocActive])

  useEffect(() => {
    if (!keyFindingsRef.current) return
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setKeyFindingsActive(entry.intersectionRatio >= 0.5)
      },
      { threshold: [0, 0.5, 1] }
    )
    observer.observe(keyFindingsRef.current)
    return () => observer.disconnect()
  }, [setKeyFindingsActive])

  useEffect(() => {
    if (!introRef.current && !introContentRef.current) return
    let active = false
    const callback = (entries) => {
      active = entries.some(entry => entry.intersectionRatio >= 0.5)
      setIntroductionActive(active)
    }
    const observer = new window.IntersectionObserver(callback, { threshold: [0, 0.5, 1] })
    if (introRef.current) observer.observe(introRef.current)
    if (introContentRef.current) observer.observe(introContentRef.current)
    return () => observer.disconnect()
  }, [setIntroductionActive])

  useEffect(() => {
    if (!percentageRef.current) return
    
    gsap.fromTo(percentageRef.current, 
      { innerHTML: 0 },
      {
        innerHTML: 57,
        duration: 2,
        ease: "power1.out",
        snap: { innerHTML: 1 },
        onUpdate: function() {
          percentageRef.current.innerHTML = Math.round(this.targets()[0].innerHTML) + '%';
        }
      }
    );
  }, []);

  return (
    <main className="main-content">
      <div id="introduction" className="hero-section" ref={introRef}>
        <div className="hero-content">
          <div className="text-container">
            <h1>The State of PR Technology 2024</h1>
            <p className="subtitle">
              A complete overview of trends & pain points in public relations software
            </p>
          </div>
          <div className="animation-container">
            <Lottie 
              animationData={chessAnimation} 
              loop={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>

      <div className="section-header">
        <h2>Introduction</h2>
      </div>

      <div className="content-section">
        <div className="content-container" ref={introContentRef}>
          <p>
            PR is rapidly shifting towards an ROI-driven model, with growing pressure to deliver measurable
            results that directly impact the bottom line.
          </p>
          <p>
            Our study reveals that over <strong><span ref={percentageRef}>0%</span> of PR professionals are struggling with tight budgets</strong>,
            pushing them to embrace advanced tools and data-driven strategies. With an emphasis on sales metrics
            in PR measurement rising sharply, the question arises: how are PR practitioners adapting to the
            changes?
          </p>
          <p>
            Dive into our study to explore how PR is evolving to meet the needs of the tech-savvy,
            ROI-focused landscape.
          </p>
        </div>
      </div>

      <div ref={tocRef}>
        <TableOfContents />
      </div>
      <div ref={keyFindingsRef}>
        <KeyFindingsSection />
      </div>
      <PainPointsSection ref={painPointsRef} />
      <PainPointsStruggleSection />
      <StrategyResultsSection />
      <ImprovePRSection />
      <UseOfPRToolsSection />
      <PRToolsUsageSection />
      <PRToolsNoUsageReasonsSection />
    </main>
  )
}

export default MainContent 