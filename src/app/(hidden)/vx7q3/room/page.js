'use client';
// v3 media + camera + calls
import { useState, useEffect, useRef, useCallback } from 'react';
import { useWebRTC } from '@/hooks/useWebRTC';
import { CameraCapture } from '@/components/sc/CameraCapture';
import { CallUI } from '@/components/sc/CallUI';

function Tick({ status }) {
  if (status === 'sent') {
    return <span className="text-zinc-500">✓</span>;
  }
  if (status === 'delivered') {
    return <span className="text-zinc-400">✓✓</span>;
  }
  if (status === 'seen') {
    return <span className="text-blue-400">✓✓</span>;
  }
  return null;
}

function Avatar({ name }) {
  const isUser1 = name === 'user1';
  return (
    <div
      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
        isUser1
          ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white'
          : 'bg-gradient-to-br from-emerald-500 to-cyan-500 text-white'
      }`}
    >
      {isUser1 ? 'U' : 'S'}
    </div>
  );
}

function SettingsPanel({ config, onUpdate, onClose }) {
  const [deleteMode, setDeleteMode] = useState(config.deleteMode);
  const [minutes, setMinutes] = useState(config.deleteAfterMinutes);

  function handleSave() {
    onUpdate({ deleteMode, deleteAfterMinutes: minutes });
    onClose();
  }

  return (
    <div className="absolute right-0 top-full z-10 mt-2 w-64 rounded-lg border border-zinc-700 bg-zinc-900 p-4 shadow-xl">
      <p className="mb-3 text-xs font-medium text-zinc-300">Message Settings</p>

      <div className="space-y-2">
        {[
          { value: 'time', label: 'Auto-delete after time' },
          { value: 'on-seen', label: 'Delete on seen' },
          { value: 'manual', label: 'Keep until restart' },
        ].map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
            <input
              type="radio"
              name="deleteMode"
              value={opt.value}
              checked={deleteMode === opt.value}
              onChange={(e) => setDeleteMode(e.target.value)}
              className="accent-blue-500"
            />
            {opt.label}
          </label>
        ))}
      </div>

      {deleteMode === 'time' && (
        <div className="mt-3">
          <label className="text-[10px] text-zinc-500">Delete after (minutes)</label>
          <input
            type="number"
            min="1"
            max="1440"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="mt-1 w-full rounded border border-zinc-700 bg-zinc-800 px-2 py-1.5 text-xs text-zinc-100 focus:border-zinc-500 focus:outline-none"
          />
        </div>
      )}

      <button
        onClick={handleSave}
        className="mt-3 w-full rounded bg-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-100 hover:bg-zinc-600"
      >
        Save
      </button>
    </div>
  );
}

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [me, setMe] = useState('');
  const [otherOnline, setOtherOnline] = useState(false);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [config, setConfig] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState('');
  const [mediaPreview, setMediaPreview] = useState(null); // { type, data, name }
  const [showCamera, setShowCamera] = useState(false);
  const messagesEndRef = useRef(null);
  const seenRef = useRef(new Set());
  const fileInputRef = useRef(null);

  // WebRTC calls
  const {
    callState,
    callType,
    localStream,
    remoteStream,
    isMuted,
    isCameraOff,
    startCall,
    acceptCall,
    rejectCall,
    endCall,
    toggleMute,
    toggleCamera,
    processSignals,
  } = useWebRTC();

  const poll = useCallback(async () => {
    try {
      const res = await fetch('/api/sc/messages');
      if (res.status === 401) {
        window.location.href = '/vx7q3';
        return;
      }
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
        setMe(data.me);
        setOtherOnline(data.otherOnline);

        // Mark unseen messages from others as seen
        for (const msg of data.messages) {
          if (msg.senderName !== data.me && msg.status !== 'seen' && !seenRef.current.has(msg.id)) {
            seenRef.current.add(msg.id);
            fetch(`/api/sc/messages/${msg.id}/seen`, { method: 'PATCH' });
          }
        }
      }
    } catch {
      // silent retry on next poll
    }
  }, []);

  // SSE connection with auto-reconnect + visibility optimization
  const eventSourceRef = useRef(null);
  const visibleRef = useRef(true);

  const connectSSE = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    const es = new EventSource('/api/sc/stream');
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.messages) {
          setMessages(data.messages);
          setMe(data.me);
          setOtherOnline(data.otherOnline);

          // Mark unseen messages from others as seen
          for (const msg of data.messages) {
            if (msg.senderName !== data.me && msg.status !== 'seen' && !seenRef.current.has(msg.id)) {
              seenRef.current.add(msg.id);
              fetch(`/api/sc/messages/${msg.id}/seen`, { method: 'PATCH' });
            }
          }
        }
        // Forward WebRTC signals from SSE to the hook
        if (data.signals && data.signals.length > 0) {
          processSignals(data.signals);
        }
      } catch {}
    };

    es.onerror = () => {
      es.close();
      // Reconnect after a short delay if tab is visible
      if (visibleRef.current) {
        setTimeout(connectSSE, 1000);
      }
    };
  }, []);

  useEffect(() => {
    // Initial fetch for immediate load, then SSE takes over
    poll();
    connectSSE();

    // Page Visibility: stop SSE when hidden, resume when visible
    function handleVisibility() {
      if (document.hidden) {
        visibleRef.current = false;
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
      } else {
        visibleRef.current = true;
        poll(); // quick refresh on return
        connectSSE();
      }
    }

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [poll, connectSSE]);

  useEffect(() => {
    // Load config
    fetch('/api/sc/config')
      .then((r) => r.json())
      .then((d) => d.config && setConfig(d.config))
      .catch(() => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    if ((!text.trim() && !mediaPreview) || sending) return;

    setSending(true);
    setError('');

    try {
      const body = { text: text.trim() };
      if (mediaPreview) {
        body.media = { type: mediaPreview.type, data: mediaPreview.data };
      }

      const res = await fetch('/api/sc/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setText('');
        setMediaPreview(null);
        poll(); // immediate refresh
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to send');
      }
    } catch {
      setError('Connection failed');
    } finally {
      setSending(false);
    }
  }

  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    if (!isImage && !isVideo) {
      setError('Only images and videos are allowed');
      return;
    }

    // Validate size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File too large (max 5MB)');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setMediaPreview({
        type: isImage ? 'image' : 'video',
        data: reader.result,
        name: file.name,
      });
      setError('');
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be selected again
    e.target.value = '';
  }

  async function handleConfigUpdate(updates) {
    try {
      const res = await fetch('/api/sc/config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (data.config) setConfig(data.config);
    } catch {
      // silent
    }
  }

  return (
    <div className="flex h-screen w-full max-w-lg flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${otherOnline ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
          <span className="text-xs text-zinc-400">
            {otherOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        {/* Call buttons - hidden for now, implementation ready */}
        <div className="flex items-center gap-1">
          {false && <button
            onClick={() => startCall('audio')}
            disabled={!otherOnline || callState !== 'idle'}
            className="rounded p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Audio call"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
          </button>}
          {false && <button
            onClick={() => startCall('video')}
            disabled={!otherOnline || callState !== 'idle'}
            className="rounded p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-blue-400 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Video call"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </button>}

          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="rounded p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
              aria-label="Settings"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            {showSettings && config && (
              <SettingsPanel
                config={config}
                onUpdate={handleConfigUpdate}
                onClose={() => setShowSettings(false)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Config indicator */}
      {config && config.deleteMode !== 'manual' && (
        <div className="border-b border-zinc-800/50 px-4 py-1.5 text-center text-[10px] text-zinc-600">
          {config.deleteMode === 'time'
            ? `Messages auto-delete after ${config.deleteAfterMinutes} min`
            : 'Messages delete on seen'}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-xs text-zinc-600 mt-20">No messages yet. Say something.</p>
        )}
        {messages.map((msg) => {
          const isMine = msg.senderName === me;
          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
              {!isMine && <Avatar name={msg.senderName} />}
              <div
                className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${
                  isMine
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : 'bg-zinc-800 text-zinc-100 rounded-bl-md'
                }`}
              >
                {msg.media && msg.media.type === 'image' && (
                  <img
                    src={msg.media.data}
                    alt="Shared image"
                    className="mb-1.5 max-h-60 w-full rounded-lg object-cover"
                  />
                )}
                {msg.media && msg.media.type === 'video' && (
                  <video
                    src={msg.media.data}
                    controls
                    className="mb-1.5 max-h-60 w-full rounded-lg"
                  />
                )}
                {msg.text && <p className="break-words whitespace-pre-wrap">{msg.text}</p>}
                <div className={`mt-1 flex items-center gap-1 text-[10px] ${isMine ? 'justify-end' : 'justify-start'}`}>
                  <span className={isMine ? 'text-blue-200' : 'text-zinc-500'}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {isMine && <Tick status={msg.status} />}
                </div>
              </div>
              {isMine && <Avatar name={msg.senderName} />}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 py-1 text-center text-xs text-red-400">{error}</div>
      )}

      {/* Input */}
      <form onSubmit={handleSend} className="border-t border-zinc-800 px-4 py-3">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Media preview */}
        {mediaPreview && (
          <div className="mb-2 flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 p-2">
            {mediaPreview.type === 'image' ? (
              <img src={mediaPreview.data} alt="Preview" className="h-12 w-12 rounded object-cover" />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded bg-zinc-700 text-zinc-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
            <span className="flex-1 truncate text-xs text-zinc-400">{mediaPreview.name}</span>
            <button
              type="button"
              onClick={() => setMediaPreview(null)}
              className="rounded p-1 text-zinc-500 hover:bg-zinc-700 hover:text-zinc-300"
              aria-label="Remove media"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="flex gap-2">
          {/* Attach button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
            aria-label="Attach image or video"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>

          {/* Camera button */}
          <button
            type="button"
            onClick={() => setShowCamera(true)}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
            aria-label="Take photo"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
            </svg>
          </button>

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            autoComplete="off"
            className="flex-1 rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={sending || (!text.trim() && !mediaPreview)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-500 disabled:opacity-40"
            aria-label="Send"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>

      {/* Camera capture overlay */}
      {showCamera && (
        <CameraCapture
          onSend={async (media) => {
            const res = await fetch('/api/sc/messages', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text: '', media: { type: media.type, data: media.data } }),
            });
            if (!res.ok) {
              const data = await res.json();
              setError(data.error || 'Failed to send photo');
            }
          }}
          onCapture={(media) => {
            setMediaPreview(media);
          }}
          onClose={() => setShowCamera(false)}
        />
      )}

      {/* Call UI overlay */}
      <CallUI
        callState={callState}
        callType={callType}
        localStream={localStream}
        remoteStream={remoteStream}
        isMuted={isMuted}
        isCameraOff={isCameraOff}
        onAccept={acceptCall}
        onReject={rejectCall}
        onEnd={endCall}
        onToggleMute={toggleMute}
        onToggleCamera={toggleCamera}
      />
    </div>
  );
}
