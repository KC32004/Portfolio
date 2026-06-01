import { motion } from 'framer-motion'
import { MapPin, Calendar, Briefcase } from 'lucide-react'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { EXPERIENCE } from '../../data/portfolioData'

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience" className="section-light">
      <div className="section-container">
        <SectionHeader label="Experience" title="Work & Internships" subtitle="Gaining real-world industry exposure alongside academic excellence" />
        <div className="max-w-4xl mx-auto space-y-6">
          {EXPERIENCE.map((exp, i) => (
            <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}>
              <div className="card p-7 hover:shadow-md transition-all border-l-4 border-blue-500">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">{exp.role}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mt-0.5">{exp.company}</p>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20">
                      <Calendar size={11} /> {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin size={11} /> {exp.location}
                    </span>
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">{exp.description}</p>
                <div className="mb-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Responsibilities</p>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((r, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                        <span className="text-blue-500 mt-1 shrink-0">▸</span>{r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map(t => (
                      <span key={t} className="tag bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
