import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Inbox, Mail, MailOpen, Trash2, Search, LogOut, RefreshCw,
  User, MessageSquare, TrendingUp, CheckCircle, Clock, Code2, X
} from 'lucide-react'
import { contactService } from '../services/api'
import { useAuth } from '../context/AuthContext'

function StatCard({ icon, label, value, color }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 mb-1">{label}</p>
          <p className={`text-3xl font-bold font-display ${color}`}>{value ?? '—'}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-slate-800`}>
          <span className={color}>{icon}</span>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { admin, logout } = useAuth()
  const [messages, setMessages] = useState([])
  const [stats, setStats] = useState({ total: 0, unread: 0, monthly: 0 })
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')
  const searchTimeout = useRef(null)

  // Fetch messages — does NOT redirect on error (prevents logout loop)
  const fetchMessages = useCallback(async (searchVal = search, filterVal = filter) => {
    try {
      setLoading(true)
      setFetchError('')
      const params = {}
      if (searchVal) params.search = searchVal
      if (filterVal === 'read') params.read = true
      if (filterVal === 'unread') params.read = false
      const res = await contactService.getAll(params)
      setMessages(res.data.data || [])
      setStats(res.data.stats || { total: 0, unread: 0, monthly: 0 })
    } catch (err) {
      // Only redirect if truly unauthorized — not on network errors
      if (err.response?.status === 401) {
        logout()
        navigate('/admin/login', { replace: true })
      } else {
        setFetchError('Failed to load messages. Check your connection.')
      }
    } finally {
      setLoading(false)
    }
  }, [logout, navigate]) // removed search/filter from deps — passed as args instead

  // Initial load only
  useEffect(() => {
    fetchMessages('', 'all')
  }, []) // eslint-disable-line

  // Debounced search
  useEffect(() => {
    clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => fetchMessages(search, filter), 400)
    return () => clearTimeout(searchTimeout.current)
  }, [search, filter]) // eslint-disable-line

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  const handleToggleRead = async (id, e) => {
    e?.stopPropagation()
    try {
      await contactService.toggleRead(id)
      setMessages(prev => prev.map(m => m._id === id ? { ...m, isRead: !m.isRead } : m))
      if (selected?._id === id) setSelected(prev => ({ ...prev, isRead: !prev.isRead }))
      // Update unread count
      setStats(prev => {
        const msg = messages.find(m => m._id === id)
        return { ...prev, unread: msg?.isRead ? prev.unread + 1 : Math.max(0, prev.unread - 1) }
      })
    } catch { /* silent */ }
  }

  const handleDelete = async (id, e) => {
    e?.stopPropagation()
    if (!confirm('Delete this message permanently?')) return
    try {
      await contactService.delete(id)
      setMessages(prev => prev.filter(m => m._id !== id))
      if (selected?._id === id) setSelected(null)
      setStats(prev => ({ ...prev, total: Math.max(0, prev.total - 1) }))
    } catch { /* silent */ }
  }

  const handleSelect = async (msg) => {
    setSelected(msg)
    if (!msg.isRead) handleToggleRead(msg._id)
  }

  const formatDate = (d) => new Date(d).toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Top bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 h-14 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <Code2 size={14} className="text-white" />
          </div>
          <span className="font-bold text-white text-sm font-display">Admin Dashboard</span>
          {admin && (
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-800 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              {admin.email}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchMessages(search, filter)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
            title="Refresh"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
          <a href="/" className="text-xs text-slate-400 hover:text-white transition-colors hidden sm:block">
            View Portfolio ↗
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-5 h-full">

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
            <StatCard icon={<Inbox size={18} />} label="Total Messages" value={stats.total} color="text-blue-400" />
            <StatCard icon={<Mail size={18} />} label="Unread" value={stats.unread} color="text-red-400" />
            <StatCard icon={<TrendingUp size={18} />} label="This Month" value={stats.monthly} color="text-green-400" />
            <StatCard icon={<CheckCircle size={18} />} label="Read" value={stats.total - stats.unread} color="text-violet-400" />
          </div>

          {/* Error banner */}
          {fetchError && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 shrink-0">
              {fetchError}
              <button onClick={() => fetchMessages(search, filter)} className="ml-auto underline text-xs">Retry</button>
            </div>
          )}

          {/* Messages Panel */}
          <div className="grid lg:grid-cols-5 gap-4 flex-1 min-h-0">
            {/* List */}
            <div className="lg:col-span-2 card flex flex-col min-h-0 overflow-hidden">
              {/* Filters */}
              <div className="p-4 border-b border-slate-800 space-y-3 shrink-0">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search messages..."
                    className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
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
                      {f === 'unread' && stats.unread > 0 && (
                        <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5">{stats.unread}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message list */}
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-12 text-slate-600">
                    <Inbox size={32} className="mx-auto mb-2 opacity-40" />
                    <p className="text-sm">No messages yet</p>
                  </div>
                ) : (
                  messages.map(msg => (
                    <div
                      key={msg._id}
                      onClick={() => handleSelect(msg)}
                      className={`p-4 border-b border-slate-800/60 cursor-pointer hover:bg-slate-800/40 transition-colors ${
                        selected?._id === msg._id ? 'bg-blue-600/10 border-l-2 border-l-blue-500 pl-3.5' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          {!msg.isRead && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-0.5" />}
                          <span className={`text-sm font-medium truncate ${msg.isRead ? 'text-slate-400' : 'text-white'}`}>
                            {msg.fullName}
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5 shrink-0">
                          <button
                            onClick={e => handleToggleRead(msg._id, e)}
                            className="p-1.5 text-slate-600 hover:text-blue-400 transition-colors rounded"
                            title={msg.isRead ? 'Mark unread' : 'Mark read'}
                          >
                            {msg.isRead ? <MailOpen size={12} /> : <Mail size={12} />}
                          </button>
                          <button
                            onClick={e => handleDelete(msg._id, e)}
                            className="p-1.5 text-slate-600 hover:text-red-400 transition-colors rounded"
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 truncate ml-4">{msg.subject}</p>
                      <p className="text-xs text-slate-700 mt-0.5 ml-4">{new Date(msg.createdAt).toLocaleDateString('en-IN')}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Detail panel */}
            <div className="lg:col-span-3 card overflow-hidden flex flex-col min-h-0">
              <AnimatePresence mode="wait">
                {selected ? (
                  <motion.div
                    key={selected._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col h-full"
                  >
                    {/* Detail header */}
                    <div className="p-5 border-b border-slate-800 shrink-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="font-bold text-white text-base leading-tight truncate">{selected.subject}</h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                            <span className="flex items-center gap-1.5 text-xs text-slate-400">
                              <User size={12} /> {selected.fullName}
                            </span>
                            <a href={`mailto:${selected.email}`} className="flex items-center gap-1.5 text-xs text-blue-400 hover:underline">
                              <Mail size={12} /> {selected.email}
                            </a>
                            <span className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Clock size={12} /> {formatDate(selected.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => handleToggleRead(selected._id)}
                            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-blue-400 transition-colors"
                            title={selected.isRead ? 'Mark as unread' : 'Mark as read'}
                          >
                            {selected.isRead ? <MailOpen size={15} /> : <Mail size={15} />}
                          </button>
                          <button
                            onClick={() => handleDelete(selected._id)}
                            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                          <a
                            href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors"
                          >
                            <MessageSquare size={13} /> Reply
                          </a>
                          <button
                            onClick={() => setSelected(null)}
                            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors lg:hidden"
                          >
                            <X size={15} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Message body */}
                    <div className="flex-1 p-5 overflow-y-auto">
                      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-slate-700 gap-3 p-8"
                  >
                    <MessageSquare size={48} className="opacity-20" />
                    <p className="text-sm text-slate-500">Select a message to read it</p>
                    <p className="text-xs text-slate-700">Click any message from the list on the left</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
