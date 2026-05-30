import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Star } from 'lucide-react'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { EDUCATION } from '../../data/portfolioData'

export default function EducationSection() {
  return (
    <SectionWrapper id="education" className="bg-slate-950">
      <div className="section-container">
        <SectionHeader label="Education" title="Academic Background" subtitle="Building a strong foundation in AI, Data Science and Computer Science" />

        <div className="max-w-4xl mx-auto">
          {/* Main degree — featured */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8 mb-8 relative overflow-hidden border-blue-500/20"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-violet-500 to-blue-600" />
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-blue-600/5" />
            <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex gap-5 items-start">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30 shrink-0">
                  <GraduationCap size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">{EDUCATION[0].degree}</h3>
                  <p className="text-blue-400 font-semibold mt-0.5">{EDUCATION[0].institution}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <Calendar size={11} /> {EDUCATION[0].period}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                      <Star size={11} /> CGPA {EDUCATION[0].cgpa}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-mono text-slate-500 mb-3">// Relevant Coursework</p>
                <div className="flex flex-wrap gap-2">
                  {EDUCATION[0].coursework.map(c => (
                    <span key={c} className="tag bg-blue-500/10 text-blue-300 border border-blue-500/20">{c}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-mono text-slate-500 mb-3">// Achievements</p>
                <ul className="space-y-1.5">
                  {EDUCATION[0].achievements.map(a => (
                    <li key={a} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-yellow-500 mt-0.5">★</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Secondary degrees */}
          <div className="grid md:grid-cols-2 gap-5">
            {EDUCATION.slice(1).map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="card p-5 hover:border-slate-600 transition-colors"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                    <GraduationCap size={18} className="text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{edu.degree}</h4>
                    <p className="text-slate-400 text-sm mt-0.5">{edu.institution}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-slate-500">{edu.period}</span>
                      {edu.percentage && (
                        <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                          {edu.percentage}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
