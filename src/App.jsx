import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  query,
} from 'firebase/firestore'
import { auth, db } from './firebase.js'
import { PEOPLE } from './tokens.js'
import { oklch } from './utils.js'
import Login from './components/Login.jsx'
import Jar from './components/Jar.jsx'
import PiggyBank from './components/PiggyBank.jsx'
import EntryModal from './components/EntryModal.jsx'
import ViewEntriesModal from './components/ViewEntriesModal.jsx'
import PiggyFormModal from './components/PiggyFormModal.jsx'
import PiggyHistoryModal from './components/PiggyHistoryModal.jsx'

export default function App() {
  const [user, setUser] = useState(undefined) // undefined = loading, null = signed out
  const [activeTab, setActiveTab] = useState('shivali')
  const [entries, setEntries] = useState([]) // all entries, all people
  const [piggyHistory, setPiggyHistory] = useState([])
  const [currency, setCurrency] = useState(() => localStorage.getItem('fj_currency') || 'EUR')

  // modal state
  const [addModal, setAddModal] = useState(null) // { jarKey } | null
  const [editEntry, setEditEntry] = useState(null) // { jarKey, entry } | null
  const [viewJar, setViewJar] = useState(null) // 'happy' | 'hurtful' | null
  const [piggyForm, setPiggyForm] = useState(null) // 'add' | 'remove' | null
  const [piggyHistoryOpen, setPiggyHistoryOpen] = useState(false)

  useEffect(() => onAuthStateChanged(auth, setUser), [])

  useEffect(() => {
    if (!user) return
    const unsubEntries = onSnapshot(query(collection(db, 'entries')), (snap) => {
      setEntries(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    const unsubPiggy = onSnapshot(query(collection(db, 'piggyHistory')), (snap) => {
      setPiggyHistory(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return () => {
      unsubEntries()
      unsubPiggy()
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem('fj_currency', currency)
  }, [currency])

  if (user === undefined) return null
  if (!user) return <Login />

  const palette = PEOPLE[activeTab]
  const forTab = (jarKey) =>
    entries.filter((e) => e.person === activeTab && e.jar === jarKey)

  async function saveEntry(jarKey, data) {
    await setDoc(doc(db, 'entries', data.id), {
      person: activeTab,
      jar: jarKey,
      date: data.date,
      description: data.description,
      size: data.size,
      tag: data.tag,
    })
    setAddModal(null)
    setEditEntry(null)
  }

  async function deleteEntry(id) {
    await deleteDoc(doc(db, 'entries', id))
    setEditEntry(null)
  }

  async function savePiggy(entry) {
    await setDoc(doc(db, 'piggyHistory', entry.id), entry)
    setPiggyForm(null)
  }

  async function deletePiggy(id) {
    await deleteDoc(doc(db, 'piggyHistory', id))
  }

  const piggyTotal = piggyHistory.reduce((sum, h) => sum + h.amount, 0)

  return (
    <div className="page">
      <div className="blob blob-tr" />
      <div className="blob blob-bl" />
      <div className="content">
        <div className="header">
          <p className="title">Feelings Jars</p>
          <p className="subtitle">a little jar for the little moments</p>
        </div>

        <div className="tabs">
          {Object.entries(PEOPLE).map(([key, p]) => (
            <button
              key={key}
              className={`tab-btn ${activeTab === key ? 'active' : ''}`}
              style={activeTab === key ? { background: oklch(p.tabAccent) } : undefined}
              onClick={() => setActiveTab(key)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="jars-row">
          <Jar
            jarKey="happy"
            entries={forTab('happy')}
            palette={palette}
            accent={palette.happyAccent}
            tilt="neg"
            onAdd={() => setAddModal({ jarKey: 'happy' })}
          />
          <Jar
            jarKey="hurtful"
            entries={forTab('hurtful')}
            palette={palette}
            accent={palette.hurtfulAccent}
            tilt="pos"
            onAdd={() => setAddModal({ jarKey: 'hurtful' })}
          />
        </div>

        <div className="entry-buttons">
          <button className="pill-btn" onClick={() => setViewJar('happy')}>View happy entries</button>
          <button className="pill-btn" onClick={() => setViewJar('hurtful')}>View hurtful entries</button>
        </div>

        {activeTab === 'shivali' && (
          <PiggyBank
            totalEUR={piggyTotal}
            currency={currency}
            onToggleCurrency={() => setCurrency((c) => (c === 'INR' ? 'EUR' : 'INR'))}
            onAdd={() => setPiggyForm('add')}
            onRemove={() => setPiggyForm('remove')}
            onHistory={() => setPiggyHistoryOpen(true)}
          />
        )}

        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <button className="link-btn" onClick={() => signOut(auth)}>Sign out</button>
        </div>
      </div>

      {addModal && (
        <EntryModal
          jarKey={addModal.jarKey}
          personLabel={palette.label}
          onSave={(data) => saveEntry(addModal.jarKey, data)}
          onClose={() => setAddModal(null)}
        />
      )}

      {editEntry && (
        <EntryModal
          jarKey={editEntry.jarKey}
          personLabel={palette.label}
          existing={editEntry.entry}
          onSave={(data) => saveEntry(editEntry.jarKey, data)}
          onDelete={deleteEntry}
          onClose={() => setEditEntry(null)}
        />
      )}

      {viewJar && (
        <ViewEntriesModal
          jarKey={viewJar}
          entries={forTab(viewJar)}
          accentColor={oklch(viewJar === 'happy' ? palette.happyAccent : palette.hurtfulAccent)}
          onEdit={(entry) => {
            setViewJar(null)
            setEditEntry({ jarKey: viewJar, entry })
          }}
          onDelete={deleteEntry}
          onClose={() => setViewJar(null)}
        />
      )}

      {piggyForm && (
        <PiggyFormModal
          mode={piggyForm}
          currency={currency}
          onSave={savePiggy}
          onClose={() => setPiggyForm(null)}
        />
      )}

      {piggyHistoryOpen && (
        <PiggyHistoryModal
          history={piggyHistory}
          currency={currency}
          onDelete={deletePiggy}
          onClose={() => setPiggyHistoryOpen(false)}
        />
      )}
    </div>
  )
}
