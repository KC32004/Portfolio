import { motion } from 'framer-motion'
import { MapPin, Calendar, Briefcase } from 'lucide-react'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { EXPERIENCE } from '../../data/portfolioData'

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience" className="bg-slate-900/50">
      <div className="section-container">
        <SectionHeader label="Experience" title="Work & Internships" subtitle="Building real-world expertise through industry exposure" />

        <div className="max-w-4xl mx-auto space-y-8">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Timeline connector */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-transparent ml-5 hidden sm:block" />

              <div className="sm:pl-14">
                {/* Timeline dot */}
                <div className="absolute left-0 top-6 hidden sm:flex">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <Briefcase size={18} className="text-white" />
                  </div>
                </div>

                <div className="card p-7 hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display">{exp.role}</h3>
                      <p className="text-blue-400 font-semibold mt-0.5">{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <Calendar size={11} /> {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin size={11} /> {exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{exp.description}</p>

                  <div className="space-y-2 mb-5">
                    <p className="text-xs font-mono text-slate-500">// Key Responsibilities</p>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((r, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <span className="text-blue-500 mt-1 shrink-0">▸</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-mono text-slate-500 mb-2">// Technologies Used</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map(tech => (
                        <span key={tech} className="tag bg-slate-800 text-slate-300 border border-slate-700 font-mono">{tech}</span>
                      ))}
                    </div>
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
