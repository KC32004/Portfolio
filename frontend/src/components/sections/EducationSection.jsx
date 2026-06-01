import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Star } from 'lucide-react'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { EDUCATION } from '../../data/portfolioData'

export default function EducationSection() {
  return (
    <SectionWrapper id="education" className="section-alt">
      <div className="section-container">
        <SectionHeader label="Education" title="Academic Background" subtitle="Building a strong foundation in AI, Data Science and Computer Science" />
        <div className="max-w-4xl mx-auto space-y-5">
          {/* Main degree */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="card p-7 border-t-4 border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                  <GraduationCap size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">{EDUCATION[0].degree}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mt-0.5">{EDUCATION[0].institution}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar size={11}/> {EDUCATION[0].period}</span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20">
                      <Star size={11}/> CGPA {EDUCATION[0].cgpa}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Relevant Coursework</p>
                <div className="flex flex-wrap gap-1.5">
                  {EDUCATION[0].coursework.map(c => (
                    <span key={c} className="tag bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-500/20">{c}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Achievements</p>
                <ul className="space-y-1.5">
                  {EDUCATION[0].achievements.map(a => (
                    <li key={a} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <span className="text-yellow-500 mt-0.5">★</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
          {/* Secondary */}
          <div className="grid md:grid-cols-2 gap-4">
            {EDUCATION.slice(1).map((edu, i) => (
              <motion.div key={i} initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.1 }}
                className="card p-5 hover:shadow-sm transition-all"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <GraduationCap size={18} className="text-slate-500 dark:text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{edu.institution}</p>
                    <div className="flex gap-2 mt-1.5 flex-wrap">
                      <span className="text-xs text-slate-400">{edu.period}</span>
                      {edu.percentage && <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full border border-green-200 dark:border-green-500/20">{edu.percentage}</span>}
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
