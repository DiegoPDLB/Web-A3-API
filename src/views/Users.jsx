import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export default function Users({ token }) {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/users`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error fetching users');
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!token) throw new Error('Debes iniciar sesión para crear usuarios');
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error creating user');
      setForm({ name: '', username: '', password: '' });
      fetchUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar usuario?')) return;
    try {
      if (!token) throw new Error('Debes iniciar sesión para eliminar usuarios');
      const res = await fetch(`${API_URL}/users/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error deleting user');
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Usuarios</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} disabled={!token} />
        <input name="username" placeholder="Usuario" value={form.username} onChange={handleChange} disabled={!token} />
        <input name="password" placeholder="Password" value={form.password} onChange={handleChange} disabled={!token} />
        <button type="submit" disabled={loading || !token}>Agregar</button>
        {!token && <div style={{ color: 'gray', marginTop: 8 }}>Inicia sesión para crear o eliminar usuarios</div>}
      </form>

      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ul>
          {users.map(u => (
            <li key={u._id}>
              {u.name} ({u.username}) <button onClick={() => handleDelete(u._id)} disabled={!token}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
