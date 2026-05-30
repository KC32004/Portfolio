import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Inbox, Mail, MailOpen, Trash2, Search, LogOut, RefreshCw,
  Calendar, User, MessageSquare, TrendingUp, CheckCircle, Clock, Code2
} from 'lucide-react'
import { contactService, authService } from '../services/api'

function StatCard({ icon, label, value, color }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 mb-1">{label}</p>
          <p className={`text-3xl font-bold font-display ${color}`}>{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color.replace('text-', 'bg-').replace('-400', '-500/10')}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [stats, setStats] = useState({ total: 0, unread: 0, monthly: 0 })
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState(null)

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true)
      const params = {}
      if (search) params.search = search
      if (filter === 'read') params.read = true
      if (filter === 'unread') params.read = false
      const res = await contactService.getAll(params)
      setMessages(res.data.data)
      setStats(res.data.stats)
    } catch { navigate('/admin/login') }
    finally { setLoading(false) }
  }, [search, filter, navigate])

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) { navigate('/admin/login'); return }
    authService.getMe().then(res => setAdmin(res.data.data)).catch(() => navigate('/admin/login'))
    fetchMessages()
  }, [fetchMessages, navigate])

  const handleToggleRead = async (id, e) => {
    e && e.stopPropagation()
    await contactService.toggleRead(id)
    fetchMessages()
    if (selected?._id === id) setSelected(prev => ({ ...prev, isRead: !prev.isRead }))
  }

  const handleDelete = async (id, e) => {
    e && e.stopPropagation()
    if (!confirm('Delete this message?')) return
    await contactService.delete(id)
    if (selected?._id === id) setSelected(null)
    fetchMessages()
  }

  const handleSelect = async (msg) => {
    setSelected(msg)
    if (!msg.isRead) {
      await contactService.toggleRead(msg._id)
      fetchMessages()
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin/login')
  }

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Top bar */}
      <header className="bg-slate-900/80 backdrop-blur border-b border-slate-800 px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <Code2 size={14} className="text-white" />
          </div>
          <span className="font-bold text-white text-sm font-display">Admin Dashboard</span>
          {admin && <span className="hidden sm:block text-xs text-slate-500">— {admin.email}</span>}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchMessages} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
          <a href="/" className="text-xs text-slate-400 hover:text-white transition-colors hidden sm:block">Portfolio ↗</a>
          <button onClick={logout} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={<Inbox size={18} className="text-blue-400" />} label="Total Messages" value={stats.total} color="text-blue-400" />
          <StatCard icon={<Mail size={18} className="text-red-400" />} label="Unread" value={stats.unread} color="text-red-400" />
          <StatCard icon={<TrendingUp size={18} className="text-green-400" />} label="This Month" value={stats.monthly} color="text-green-400" />
          <StatCard icon={<CheckCircle size={18} className="text-violet-400" />} label="Read" value={stats.total - stats.unread} color="text-violet-400" />
        </div>

        {/* Messages panel */}
        <div className="grid lg:grid-cols-5 gap-4 h-[calc(100vh-260px)]">
          {/* List */}
          <div className="lg:col-span-2 card flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-800 space-y-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search messages..."
                  className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex gap-1.5">
                {['all', 'unread', 'read'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                      filter === f ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12 text-slate-600">
                  <Inbox size={32} className="mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No messages</p>
                </div>
              ) : (
                messages.map(msg => (
                  <div
                    key={msg._id}
                    onClick={() => handleSelect(msg)}
                    className={`p-4 border-b border-slate-800 cursor-pointer hover:bg-slate-800/50 transition-colors ${selected?._id === msg._id ? 'bg-blue-600/10 border-l-2 border-l-blue-500' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        {!msg.isRead && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                        <span className={`text-sm font-medium truncate ${msg.isRead ? 'text-slate-400' : 'text-white'}`}>{msg.fullName}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={e => handleToggleRead(msg._id, e)} className="p-1 text-slate-600 hover:text-blue-400 transition-colors">
                          {msg.isRead ? <MailOpen size={13} /> : <Mail size={13} />}
                        </button>
                        <button onClick={e => handleDelete(msg._id, e)} className="p-1 text-slate-600 hover:text-red-400 transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{msg.subject}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{new Date(msg.createdAt).toLocaleDateString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Detail */}
          <div className="lg:col-span-3 card overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div key={selected._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
                  <div className="p-6 border-b border-slate-800">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-white text-lg">{selected.subject}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1.5 text-xs text-slate-400"><User size={12} /> {selected.fullName}</span>
                          <span className="flex items-center gap-1.5 text-xs text-slate-400"><Mail size={12} /> {selected.email}</span>
                          <span className="flex items-center gap-1.5 text-xs text-slate-400"><Clock size={12} /> {formatDate(selected.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => handleToggleRead(selected._id)} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-blue-400 transition-colors">
                          {selected.isRead ? <MailOpen size={15} /> : <Mail size={15} />}
                        </button>
                        <button onClick={() => handleDelete(selected._id)} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 transition-colors">
                          <Trash2 size={15} />
                        </button>
                        <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors text-xs font-medium flex items-center gap-1">
                          <MessageSquare size={14} /> Reply
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-6 overflow-y-auto">
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-slate-600 gap-3">
                  <MessageSquare size={40} className="opacity-30" />
                  <p className="text-sm">Select a message to view</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}
