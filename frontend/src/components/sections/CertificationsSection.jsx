import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { CERTIFICATIONS, ACHIEVEMENTS } from '../../data/portfolioData'

const certGrad = { 'AI/ML':'from-indigo-500 to-blue-500','Programming':'from-purple-500 to-violet-500','Database':'from-emerald-500 to-teal-500','Development':'from-orange-400 to-amber-500','Marketing':'from-pink-500 to-rose-500','Business':'from-yellow-500 to-amber-500' }

export default function CertificationsSection() {
  return (
    <SectionWrapper id="certifications" className="section-white">
      <div className="container-xl">
        <SectionHeader eyebrow="Credentials" title="Certifications & Achievements" subtitle="Continuous learning and competitive recognition" />
        <div className="mb-14">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Professional Certifications</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div key={cert.name}
                initial={{ opacity:0, scale:0.94 }} whileInView={{ opacity:1, scale:1 }}
                viewport={{ once:true }} transition={{ delay:i*0.05 }}
                className="card-hover p-5 group cursor-default"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${certGrad[cert.category]||'from-indigo-500 to-purple-500'} flex items-center justify-center mb-4 shadow-md`}>
                  <Award size={18} className="text-white" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{cert.name}</h4>
                <p className="text-slate-400 text-xs">{cert.issuer}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-mono text-slate-400">{cert.year}</span>
                  <span className="pill text-xs">{cert.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Hackathons & Awards</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((ach, i) => (
              <motion.div key={ach.event}
                initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.07 }}
                className="card-hover p-5"
              >
                <div className="text-4xl font-bold font-display text-slate-100 dark:text-slate-800 mb-3 leading-none">{ach.rank}</div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{ach.event}</h4>
                <p className="text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">{ach.org}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{ach.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
