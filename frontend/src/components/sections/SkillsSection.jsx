import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { SKILLS } from '../../data/portfolioData'

const categoryColors = {
  'Programming Languages': { bar: 'from-blue-500 to-blue-600', bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
  'Web Technologies': { bar: 'from-violet-500 to-violet-600', bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400' },
  'AI & Data Science': { bar: 'from-cyan-500 to-cyan-600', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400' },
  'Databases & Tools': { bar: 'from-green-500 to-green-600', bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400' }
}

function SkillBar({ name, level, color, delay = 0 }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-300">{name}</span>
        <span className="text-xs font-mono text-slate-500">{level}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('Programming Languages')
  const categories = Object.keys(SKILLS)

  return (
    <SectionWrapper id="skills" className="bg-slate-900/50">
      <div className="section-container">
        <SectionHeader
          label="Technical Profile"
          title="Skills & Expertise"
          subtitle="A comprehensive view of my technical toolkit built through projects, internships, and continuous learning"
        />

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => {
            const colors = categoryColors[cat]
            const isActive = activeTab === cat
            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  isActive
                    ? `${colors.bg} ${colors.border} ${colors.text}`
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
                }`}
              >
                {cat}
              </motion.button>
            )
          })}
        </div>

        {/* Skills display */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bars */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="card p-6 space-y-5"
          >
            <p className="text-xs font-mono text-slate-500 mb-6">// {activeTab} — Proficiency Levels</p>
            {SKILLS[activeTab].map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color={categoryColors[activeTab].bar}
                delay={i * 0.08}
              />
            ))}
          </motion.div>

          {/* All skills overview */}
          <div className="space-y-4">
            {categories.map(cat => {
              const colors = categoryColors[cat]
              return (
                <motion.div
                  key={cat}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setActiveTab(cat)}
                  className={`card p-4 cursor-pointer transition-all duration-200 ${
                    activeTab === cat ? `border-${colors.text.replace('text-', '')}/30` : 'hover:border-slate-600'
                  }`}
                >
                  <p className={`text-xs font-mono mb-3 ${colors.text}`}>// {cat}</p>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS[cat].map(s => (
                      <span key={s.name} className={`tag ${colors.bg} ${colors.text} border ${colors.border}`}>
                        {s.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Soft skills */}
        <div className="mt-10 card p-6">
          <p className="text-xs font-mono text-slate-500 mb-4">// Soft Skills & Competencies</p>
          <div className="flex flex-wrap gap-3">
            {['Problem Solving', 'Team Collaboration', 'Communication', 'Content Writing', 'Event Coordination', 'Leadership', 'Adaptability', 'Critical Thinking'].map(skill => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full text-sm font-medium bg-slate-800 text-slate-300 border border-slate-700 hover:border-blue-500/50 hover:text-blue-300 transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
