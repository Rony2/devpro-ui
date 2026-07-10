'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [ownerKey, setOwnerKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [currentPin, setCurrentPin] = useState('');
  const [customPin, setCustomPin] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function apiCall(action, newPin) {
    const res = await fetch('/api/sc/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ownerKey, action, newPin }),
    });
    return res.json();
  }

  async function handleAuth(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const data = await apiCall('get');
      if (data.error) {
        setMessage(data.error);
      } else {
        setAuthenticated(true);
        setCurrentPin(data.pin);
      }
    } catch {
      setMessage('Connection failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerate() {
    setLoading(true);
    try {
      const data = await apiCall('generate');
      if (data.pin) {
        setCurrentPin(data.pin);
        setMessage('New PIN generated. All sessions cleared.');
      }
    } catch {
      setMessage('Failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleSetCustom(e) {
    e.preventDefault();
    if (customPin.length < 4) {
      setMessage('PIN must be at least 4 characters');
      return;
    }
    setLoading(true);
    try {
      const data = await apiCall('set', customPin);
      if (data.pin) {
        setCurrentPin(data.pin);
        setCustomPin('');
        setMessage('PIN updated. All sessions cleared.');
      } else {
        setMessage(data.error || 'Failed');
      }
    } catch {
      setMessage('Failed');
    } finally {
      setLoading(false);
    }
  }

  if (!authenticated) {
    return (
      <div className="w-full max-w-xs">
        <form onSubmit={handleAuth} className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur">
          <p className="mb-4 text-center text-xs text-zinc-500">Admin Access</p>
          <input
            type="password"
            value={ownerKey}
            onChange={(e) => setOwnerKey(e.target.value)}
            placeholder="Owner key"
            required
            autoComplete="off"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-center text-sm text-zinc-100 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
          {message && <p className="mt-2 text-center text-xs text-red-400">{message}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-white disabled:opacity-50"
          >
            {loading ? '...' : 'Authenticate'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xs">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur">
        <p className="mb-6 text-center text-xs text-zinc-500">PIN Management</p>

        <div className="mb-6 rounded-lg bg-zinc-800 p-4 text-center">
          <p className="text-xs text-zinc-500">Current PIN</p>
          <p className="mt-1 font-mono text-lg tracking-widest text-zinc-100">{currentPin}</p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mb-4 w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
        >
          Generate Random PIN
        </button>

        <form onSubmit={handleSetCustom} className="space-y-3">
          <input
            type="text"
            value={customPin}
            onChange={(e) => setCustomPin(e.target.value)}
            placeholder="Set custom PIN (4-20 chars)"
            autoComplete="off"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
          <button
            type="submit"
            disabled={loading || customPin.length < 4}
            className="w-full rounded-lg bg-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-100 hover:bg-zinc-600 disabled:opacity-50"
          >
            Set Custom PIN
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-xs text-emerald-400">{message}</p>
        )}

        <p className="mt-6 text-center text-[10px] text-zinc-600">
          Changing PIN kicks all users and clears messages.
        </p>
      </div>
    </div>
  );
}
