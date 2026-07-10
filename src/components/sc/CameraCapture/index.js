'use client';

import { useState, useRef, useEffect } from 'react';

export function CameraCapture({ onCapture, onSend, onClose }) {
  const [error, setError] = useState('');
  const [captured, setCaptured] = useState(null);
  const [sending, setSending] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const mountedRef = useRef(true);

  function stopAllTracks(stream) {
    if (stream) {
      stream.getTracks().forEach((t) => {
        t.stop();
        t.enabled = false;
      });
    }
  }

  function stopCamera() {
    const s = streamRef.current;
    streamRef.current = null;
    stopAllTracks(s);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }

  // Single effect: acquire camera, clean up on unmount
  // Uses mountedRef to handle React Strict Mode double-mount
  useEffect(() => {
    mountedRef.current = true;
    let localStream = null;

    (async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });

        // If component unmounted while awaiting, kill the stream immediately
        if (!mountedRef.current) {
          mediaStream.getTracks().forEach((t) => t.stop());
          return;
        }

        localStream = mediaStream;
        streamRef.current = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        if (!mountedRef.current) return;
        if (err.name === 'NotAllowedError') {
          setError('Camera access denied. Please allow camera permissions.');
        } else if (err.name === 'NotFoundError') {
          setError('No camera found on this device.');
        } else {
          setError('Failed to access camera.');
        }
      }
    })();

    return () => {
      mountedRef.current = false;
      // Stop whatever stream was acquired in THIS effect instance
      if (localStream) {
        localStream.getTracks().forEach((t) => t.stop());
      }
      // Also stop streamRef in case it was set by retake
      if (streamRef.current && streamRef.current !== localStream) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  function handleCapture() {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

    // STOP CAMERA FIRST — before any state change that could trigger re-render
    stopCamera();
    setCaptured(dataUrl);
  }

  async function handleRetake() {
    setCaptured(null);
    setError('');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch {
      setError('Failed to restart camera.');
    }
  }

  async function handleSendNow() {
    if (!captured || sending) return;
    setSending(true);
    stopCamera();
    await onSend({ type: 'image', data: captured, name: 'camera-photo.jpg' });
    setSending(false);
    onClose();
  }

  function handleSendWithText() {
    if (!captured) return;
    stopCamera();
    // Attach to chat input so user can add text
    onCapture({ type: 'image', data: captured, name: 'camera-photo.jpg' });
    onClose();
  }

  function handleClose() {
    stopCamera();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-4">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-zinc-200">Camera</h3>
          <button
            onClick={handleClose}
            className="rounded p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
            aria-label="Close camera"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Error state */}
        {error && (
          <div className="flex h-64 items-center justify-center rounded-lg bg-zinc-800">
            <p className="px-4 text-center text-xs text-red-400">{error}</p>
          </div>
        )}

        {/* Camera preview — always mounted so ref is stable, hidden when captured */}
        {!error && (
          <div className={`relative overflow-hidden rounded-lg bg-black ${captured ? 'hidden' : ''}`}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-64 w-full object-cover"
              onLoadedMetadata={(e) => e.target.play()}
            />
          </div>
        )}

        {/* Captured preview */}
        {captured && (
          <div className="overflow-hidden rounded-lg">
            <img src={captured} alt="Captured" className="h-64 w-full object-cover" />
          </div>
        )}

        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Actions */}
        <div className="mt-3 flex gap-2">
          {!captured && !error && (
            <button
              onClick={handleCapture}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
              </svg>
              Capture
            </button>
          )}
          {captured && (
            <>
              <button
                onClick={handleRetake}
                disabled={sending}
                className="rounded-lg border border-zinc-700 px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 disabled:opacity-40"
              >
                Retake
              </button>
              <button
                onClick={handleSendNow}
                disabled={sending}
                className="flex-1 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-40"
              >
                {sending ? 'Sending...' : 'Send'}
              </button>
              <button
                onClick={handleSendWithText}
                disabled={sending}
                className="rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-700 disabled:opacity-40"
              >
                + Text
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
