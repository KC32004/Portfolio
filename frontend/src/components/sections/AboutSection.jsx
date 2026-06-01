import { motion } from 'framer-motion'
import { Brain, Code2, Database, Globe, Eye, Blocks } from 'lucide-react'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { PERSONAL } from '../../data/portfolioData'

const interests = [
  { icon: <Brain size={18} />, label: 'Artificial Intelligence', color: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-500/20' },
  { icon: <Eye size={18} />, label: 'Computer Vision', color: 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-100 dark:border-violet-500/20' },
  { icon: <Database size={18} />, label: 'Data Science', color: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-100 dark:border-cyan-500/20' },
  { icon: <Code2 size={18} />, label: 'Full Stack Dev', color: 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300 border-green-100 dark:border-green-500/20' },
  { icon: <Blocks size={18} />, label: 'Blockchain / Web3', color: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-500/20' },
  { icon: <Globe size={18} />, label: 'Web Technologies', color: 'bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-100 dark:border-pink-500/20' }
]

const stats = [
  { value: '8.48', label: 'CGPA', sub: 'B.E. AI & DS' },
  { value: '5+', label: 'Projects', sub: 'Built & shipped' },
  { value: '5+', label: 'Hackathons', sub: 'Participated' },
  { value: '7+', label: 'Certifications', sub: 'Completed' }
]

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="section-alt">
      <div className="section-container">
        <SectionHeader label="About Me" title="Who I Am" subtitle="A passionate AI & Data Science graduate driven to build practical, intelligent solutions" />
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div className="space-y-5">
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>I'm an <strong className="text-slate-900 dark:text-white">Artificial Intelligence & Data Science</strong> undergraduate at SDM Institute of Technology, Ujire — graduating in 2026 with a CGPA of <strong className="text-blue-600 dark:text-blue-400">8.48</strong>.</p>
              <p>My work spans from building an <strong className="text-slate-900 dark:text-white">AI-powered virtual try-on app</strong> using computer vision, to <strong className="text-slate-900 dark:text-white">decentralised applications</strong> on Ethereum with Solidity smart contracts.</p>
              <p>Currently interning at <strong className="text-slate-900 dark:text-white">Hindustan Aeronautics Limited (HAL)</strong>, developing internal web applications using ASP.NET — bridging software and aerospace engineering.</p>
              <p>Beyond code, I hold an <strong className="text-slate-900 dark:text-white">NCC 'A' Certificate</strong>, won <strong className="text-slate-900 dark:text-white">1st place</strong> at Yugma TechFest Ideathon, and actively lead events through IRCS and NSS.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-500/5 border-l-4 border-blue-500 rounded-r-xl p-4">
              <p className="text-xs font-mono text-blue-600 dark:text-blue-400 mb-1.5">Career Objective</p>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">Seeking roles in AI/ML, computer vision, or full-stack development where I can build impactful, data-driven systems and grow at the frontier of intelligent technology.</p>
            </div>
          </div>
          {/* Right */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              {stats.map(({ value, label, sub }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="card p-5 text-center hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl font-bold gradient-text font-display">{value}</div>
                  <div className="text-slate-800 dark:text-white font-semibold text-sm mt-1">{label}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{sub}</div>
                </motion.div>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Areas of Interest</p>
              <div className="grid grid-cols-2 gap-2">
                {interests.map(({ icon, label, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm font-medium ${color}`}
                  >
                    {icon} {label}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
