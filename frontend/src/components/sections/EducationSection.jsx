import { motion } from 'framer-motion'
import { GraduationCap, Star } from 'lucide-react'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { EDUCATION } from '../../data/portfolioData'

export default function EducationSection() {
  return (
    <SectionWrapper id="education" className="section-gray">
      <div className="container-xl">
        <SectionHeader eyebrow="Education" title="Academic Background" subtitle="A strong foundation in AI, Data Science, and Computer Science" />
        <div className="max-w-3xl mx-auto space-y-5">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="card p-8 border-t-4 border-indigo-500 hover:shadow-xl transition-all"
          >
            <div className="flex items-start gap-5 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shrink-0 shadow-lg">
                <GraduationCap size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{EDUCATION[0].degree}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold">{EDUCATION[0].institution}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-xs text-slate-400">{EDUCATION[0].period}</span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-500/20">
                    <Star size={11}/> CGPA {EDUCATION[0].cgpa}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Relevant Coursework</p>
                <div className="flex flex-wrap gap-1.5">
                  {EDUCATION[0].coursework.map(c => <span key={c} className="pill text-xs">{c}</span>)}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Achievements</p>
                <ul className="space-y-2">
                  {EDUCATION[0].achievements.map(a => (
                    <li key={a} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <span className="text-amber-500 mt-0.5 shrink-0">★</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4">
            {EDUCATION.slice(1).map((edu, i) => (
              <motion.div key={i} initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                className="card p-5 hover:shadow-md transition-all"
              >
                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <GraduationCap size={18} className="text-slate-500 dark:text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{edu.degree}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{edu.institution}</p>
                    <div className="flex gap-2 mt-1.5 flex-wrap">
                      <span className="text-xs text-slate-400">{edu.period}</span>
                      {edu.percentage && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400">{edu.percentage}</span>}
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
