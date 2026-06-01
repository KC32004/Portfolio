import { Github, Linkedin, Mail, Code2, Heart } from 'lucide-react'
import { PERSONAL, NAV_LINKS } from '../../data/portfolioData'

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.getElementById(href.replace('#',''))
    if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 64; window.scrollTo({ top, behavior:'smooth' }) }
  }
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 border-t border-slate-800">
      <div className="section-container py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Code2 size={16} className="text-white" /></div>
              <span className="font-bold text-white font-display">K. Chandana</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">AI & Data Science Graduate building intelligent, practical solutions. Available for opportunities from 2026.</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Quick Links</p>
            <div className="grid grid-cols-2 gap-1">
              {NAV_LINKS.map(l => (
                <button key={l.label} onClick={() => scrollTo(l.href)} className="text-left text-sm text-slate-400 hover:text-white transition-colors py-1">{l.label}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Connect</p>
            <div className="space-y-2.5">
              <a href={`mailto:${PERSONAL.email}`} className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors"><Mail size={14}/> {PERSONAL.email}</a>
              <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors"><Github size={14}/> github.com/KC32004</a>
              <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors"><Linkedin size={14}/> linkedin.com/in/k-chandana</a>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">© 2026 K Chandana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
