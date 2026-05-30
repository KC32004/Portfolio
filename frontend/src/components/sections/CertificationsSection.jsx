import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { CERTIFICATIONS, ACHIEVEMENTS } from '../../data/portfolioData'

const categoryColors = {
  'AI/ML': 'from-blue-600 to-cyan-600',
  'Programming': 'from-violet-600 to-purple-600',
  'Database': 'from-green-600 to-teal-600',
  'Development': 'from-orange-600 to-amber-600',
  'Marketing': 'from-pink-600 to-rose-600',
  'Business': 'from-yellow-600 to-orange-600'
}

export default function CertificationsSection() {
  return (
    <SectionWrapper id="certifications" className="bg-slate-900/50">
      <div className="section-container">
        <SectionHeader label="Credentials" title="Certifications & Achievements" subtitle="Continuous learning across AI, development, and professional skills" />

        {/* Certifications */}
        <div className="mb-16">
          <p className="text-xs font-mono text-slate-500 mb-6">// Professional Certifications</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="card p-5 group hover:border-slate-600 transition-all duration-300 cursor-default"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${categoryColors[cert.category] || 'from-blue-600 to-violet-600'} flex items-center justify-center mb-4 shadow-lg`}>
                  <Award size={18} className="text-white" />
                </div>
                <h4 className="font-semibold text-white text-sm leading-tight mb-2 group-hover:text-blue-300 transition-colors">
                  {cert.name}
                </h4>
                <p className="text-slate-400 text-xs">{cert.issuer}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800">
                  <span className="text-xs font-mono text-slate-500">{cert.year}</span>
                  <span className={`tag bg-gradient-to-r ${categoryColors[cert.category] || 'from-blue-600 to-violet-600'} text-white bg-clip-text`} style={{ background: 'none', WebkitBackgroundClip: 'unset' }}>
                    <span className="text-blue-400 text-xs">{cert.category}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <p className="text-xs font-mono text-slate-500 mb-6">// Hackathons & Awards</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((ach, i) => (
              <motion.div
                key={ach.event}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="card p-5 hover:border-slate-600 transition-all"
              >
                <div className="text-3xl font-bold font-display text-slate-700 mb-3">{ach.rank}</div>
                <h4 className="font-semibold text-white text-sm mb-1">{ach.event}</h4>
                <p className="text-blue-400 text-xs font-medium mb-3">{ach.org}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{ach.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
