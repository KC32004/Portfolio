import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { CERTIFICATIONS, ACHIEVEMENTS } from '../../data/portfolioData'

const certColors = {
  'AI/ML':        'bg-blue-600',
  'Programming':  'bg-violet-600',
  'Database':     'bg-green-600',
  'Development':  'bg-orange-500',
  'Marketing':    'bg-pink-600',
  'Business':     'bg-yellow-600'
}

export default function CertificationsSection() {
  return (
    <SectionWrapper id="certifications" className="section-light">
      <div className="section-container">
        <SectionHeader label="Credentials" title="Certifications & Achievements" subtitle="Continuous learning across AI, development, and professional skills" />

        {/* Certifications */}
        <div className="mb-14">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-5">Professional Certifications</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div key={cert.name}
                initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }}
                viewport={{ once:true }} transition={{ delay: i*0.05 }}
                whileHover={{ y:-3 }}
                className="card p-5 hover:shadow-md transition-all group cursor-default"
              >
                <div className={`w-10 h-10 rounded-xl ${certColors[cert.category] || 'bg-blue-600'} flex items-center justify-center mb-4 shadow-sm`}>
                  <Award size={18} className="text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm leading-tight mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cert.name}</h4>
                <p className="text-slate-400 text-xs">{cert.issuer}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-mono text-slate-400">{cert.year}</span>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{cert.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-5">Hackathons & Awards</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((ach, i) => (
              <motion.div key={ach.event}
                initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay: i*0.07 }}
                whileHover={{ y:-3 }}
                className="card p-5 hover:shadow-md transition-all"
              >
                <div className="text-3xl font-bold font-display text-slate-200 dark:text-slate-700 mb-3">{ach.rank}</div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{ach.event}</h4>
                <p className="text-blue-600 dark:text-blue-400 text-xs font-medium mb-2">{ach.org}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{ach.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
