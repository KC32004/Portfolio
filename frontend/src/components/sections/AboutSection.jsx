import { motion } from 'framer-motion'
import { Brain, Code2, Database, Globe, Eye, Blocks } from 'lucide-react'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { PERSONAL } from '../../data/portfolioData'

const interests = [
  { icon: <Brain size={20} />, label: 'Artificial Intelligence', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  { icon: <Eye size={20} />, label: 'Computer Vision', color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
  { icon: <Database size={20} />, label: 'Data Science', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  { icon: <Code2 size={20} />, label: 'Full Stack Dev', color: 'text-green-400 bg-green-500/10 border-green-500/20' },
  { icon: <Blocks size={20} />, label: 'Blockchain', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  { icon: <Globe size={20} />, label: 'Web Technologies', color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' }
]

const stats = [
  { value: '8.48', label: 'CGPA', sublabel: 'B.E. AI & DS' },
  { value: '5+', label: 'Projects', sublabel: 'Built & deployed' },
  { value: '5+', label: 'Hackathons', sublabel: 'Participated' },
  { value: '7+', label: 'Certifications', sublabel: 'Completed' }
]

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="bg-slate-950">
      <div className="section-container">
        <SectionHeader label="About Me" title="Who I Am" subtitle="AI & Data Science undergraduate passionate about building intelligent real-world solutions" />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div className="space-y-6">
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                I'm an <span className="text-blue-400 font-medium">Artificial Intelligence and Data Science</span> undergraduate at SDM Institute of Technology, Ujire  graduated in 2026 with a CGPA of 8.48. I'm driven by the intersection of machine learning, full-stack engineering, and emerging technologies.
              </p>
              <p>
                My work spans a wide range from building an <span className="text-violet-400 font-medium">AI-powered virtual try-on fashion application</span> using computer vision, to developing <span className="text-amber-400 font-medium">decentralised applications</span> with Solidity smart contracts.
              </p>
              <p>
                I'm currently interning at <span className="text-blue-400 font-medium">Hindustan Aeronautics Limited (HAL)</span>, building internal web interfaces using ASP.NET — a uniquely grounding experience bridging software and aerospace engineering.
              </p>
              <p className="text-slate-400">
                Beyond code, I hold an <strong className="text-white">NCC 'A' Certificate</strong>, have won a <strong className="text-white">hackathon 1st place</strong> at JNNCE Shivamogga, and Event Coordinator of IRCS and a memeber of NSS. I believe technology is most powerful when it solves real, tangible problems.
              </p>
            </div>

            {/* Career objective */}
            <div className="glass rounded-xl p-5 border-l-2 border-blue-500">
              <p className="text-sm font-mono text-blue-400 mb-2">// Career Objective</p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Seeking a challenging role where I can leverage my expertise in AI/ML, computer vision, and full-stack development to build systems that make a measurable impact while continuing to grow at the frontier of intelligent technology.
              </p>
            </div>
          </div>

          {/* Right: Stats + Interests */}
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label, sublabel }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="card p-5 text-center hover:border-blue-500/30 transition-colors"
                >
                  <div className="text-3xl font-bold gradient-text font-display">{value}</div>
                  <div className="text-white font-medium text-sm mt-1">{label}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{sublabel}</div>
                </motion.div>
              ))}
            </div>

            {/* Interests */}
            <div>
              <p className="text-sm font-mono text-slate-500 mb-4">// Areas of Interest</p>
              <div className="grid grid-cols-2 gap-3">
                {interests.map(({ icon, label, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03 }}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${color} text-sm font-medium`}
                  >
                    {icon}
                    <span>{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="glass rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 text-lg">📍</div>
              <div>
                <div className="text-white font-medium text-sm">{PERSONAL.location}</div>
                {/*<div className="text-slate-500 text-xs mt-0.5">{PERSONAL.college}</div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
