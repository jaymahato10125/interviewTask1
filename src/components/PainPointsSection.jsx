import React, { forwardRef } from 'react'
import '../styles/PainPointsSection.css'

const PainPointsSection = forwardRef((props, ref) => {
  return (
    <div className="pain-points-section" id="pain-points-in-pr" ref={ref}>
      <div className="section-header7">
        <h2>Pain Points in PR</h2>
      </div>
      <div className="growing-pains-row">
        <div className="growing-pains-left">
          <h3>
            Growing Pains in PR:<br />
            <span className="highlight">Budgets, Engagement,<br />and Value</span>
          </h3>
        </div>
        <div className="growing-pains-right">
          <h4>Financial pressures and industry shifts are challenging PR pros to adapt</h4>
          <p>
            As economic pressures rise, PR professionals are finding it harder to navigate shrinking budgets, connect with journalists, and prove their worth. In just two years, the number of PR pros struggling with budget constraints has jumped from <a href="#" className="percentage-link">35% to 57%</a>. These statistics reflect a rapidly evolving industry where proving ROI is more critical — and more challenging — than ever.
          </p>
        </div>
      </div>
    </div>
  )
})

export default PainPointsSection 