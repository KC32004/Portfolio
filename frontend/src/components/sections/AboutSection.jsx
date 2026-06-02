import { motion } from 'framer-motion'
import { Brain, Code2, Database, Eye, Blocks, Globe } from 'lucide-react'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { PERSONAL } from '../../data/portfolioData'

const interests = [
  { icon:<Brain size={16}/>, label:'Artificial Intelligence', c:'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-500/20' },
  { icon:<Eye size={16}/>, label:'Computer Vision', c:'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-500/20' },
  { icon:<Database size={16}/>, label:'Data Science', c:'bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-100 dark:border-sky-500/20' },
  { icon:<Code2 size={16}/>, label:'Full Stack Dev', c:'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-500/20' },
  { icon:<Blocks size={16}/>, label:'Blockchain / Web3', c:'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-500/20' },
  { icon:<Globe size={16}/>, label:'Web Technologies', c:'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-100 dark:border-rose-500/20' },
]
const stats = [
  { v:'8.48', l:'CGPA', s:'B.E. AI & DS' },
  { v:'5+', l:'Projects', s:'Built & shipped' },
  { v:'5+', l:'Hackathons', s:'Participated' },
  { v:'7+', l:'Certifications', s:'Completed' },
]

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="section-gray">
      <div className="container-xl">
        <SectionHeader eyebrow="About Me" title="Building Intelligent Solutions" subtitle="A passionate AI & Data Science graduate driven to create real-world impact" />
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div className="space-y-5">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">I'm an <strong className="text-slate-900 dark:text-white font-semibold">Artificial Intelligence & Data Science</strong> undergraduate at SDM Institute of Technology, Ujire graduating in 2026 with a CGPA of <strong className="text-indigo-600 dark:text-indigo-400">8.48</strong>.</p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">From building an <strong className="text-slate-900 dark:text-white">AI virtual try-on platform</strong> with computer vision, to a <strong className="text-slate-900 dark:text-white">blockchain dApp</strong> on Ethereum. I love building systems that push the boundaries of what's possible.</p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Currently interning at <strong className="text-slate-900 dark:text-white">Hindustan Aeronautics Limited (HAL)</strong>, building internal web apps using ASP.NET bridging software and aerospace engineering.</p>
            <div className="border-l-4 border-indigo-500 pl-5 py-1 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-r-xl">
              <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1.5">Career Objective</p>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">Seeking impactful roles in AI/ML, computer vision, or full-stack development where I can build data-driven systems and grow at the frontier of intelligent technology.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              {stats.map(({ v, l, s }, i) => (
                <motion.div key={l}
                  initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }}
                  viewport={{ once:true }} transition={{ delay: i*0.07 }}
                  className="card p-5 text-center hover:shadow-lg transition-all"
                >
                  <div className="text-3xl font-bold font-display text-gradient">{v}</div>
                  <div className="text-slate-800 dark:text-white font-semibold text-sm mt-1">{l}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{s}</div>
                </motion.div>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Areas of Interest</p>
              <div className="grid grid-cols-2 gap-2">
                {interests.map(({ icon, label, c }, i) => (
                  <motion.div key={label}
                    initial={{ opacity:0, x:12 }} whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }} transition={{ delay: i*0.06 }}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm font-semibold ${c}`}
                  >{icon}{label}</motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
