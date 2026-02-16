import { useEffect, useState } from 'react';

// Use environment variable for the backend URL
// In Vercel, the rewrite makes /api/guestbook available on the same domain
const API_URL = import.meta.env.VITE_API_URL || '/api/guestbook';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        setEntries(await res.json());
      } else {
        console.error('Failed to load entries');
      }
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setForm({ name: '', message: '' });
      await load();
    } catch (error) {
      console.error('Error saving entry:', error);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      await load();
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>My Profile & Guestbook</h1>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Sign the Guestbook</h2>
        <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            style={{ padding: '0.5rem' }}
          />
          <textarea
            placeholder="Message"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            required
            rows={4}
            style={{ padding: '0.5rem' }}
          />
          <button type="submit" disabled={loading} style={{ padding: '0.5rem', cursor: 'pointer' }}>
            {loading ? 'Signing...' : 'Sign Guestbook'}
          </button>
        </form>
      </div>

      <hr />

      <h2>Messages</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {entries.length === 0 ? <p>No entries yet.</p> : entries.map(e => (
          <div key={e.id} style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '4px', background: '#f9f9f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{e.name}</strong>
              <small>{new Date(e.created_at).toLocaleDateString()}</small>
            </div>
            <p style={{ margin: '0.5rem 0' }}>{e.message}</p>
            <button onClick={() => remove(e.id)} style={{ fontSize: '0.8rem', color: 'red', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
