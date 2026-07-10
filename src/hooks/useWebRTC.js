'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
];

export function useWebRTC() {
  const [callState, setCallState] = useState('idle'); // idle | calling | incoming | connected | ended
  const [callType, setCallType] = useState(null); // 'audio' | 'video'
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  const pcRef = useRef(null);
  const signalPollRef = useRef(null);
  const pendingCandidatesRef = useRef([]);
  const incomingOfferRef = useRef(null);

  // --- Signaling helpers ---

  async function sendSignal(type, payload) {
    try {
      await fetch('/api/sc/signal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, payload }),
      });
    } catch {
      // silent
    }
  }

  async function pollSignals() {
    try {
      const res = await fetch('/api/sc/signal');
      if (!res.ok) return [];
      const data = await res.json();
      return data.signals || [];
    } catch {
      return [];
    }
  }

  // --- Peer connection setup ---

  function createPeerConnection() {
    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendSignal('ice-candidate', { candidate: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    pc.oniceconnectionstatechange = () => {
      if (pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'failed') {
        endCall();
      }
    };

    pcRef.current = pc;
    return pc;
  }

  // --- Start a call (caller side) ---

  const startCall = useCallback(async (type) => {
    setCallType(type);
    setCallState('calling');

    // Send call request to other user
    await sendSignal('call-request', { callType: type });

    // Start polling for response
    startSignalPolling();
  }, []);

  // --- Accept incoming call ---

  const acceptCall = useCallback(async () => {
    const offer = incomingOfferRef.current;
    const type = callType;

    setCallState('connected');
    await sendSignal('call-accept', { callType: type });

    // Get local media
    const constraints = {
      audio: true,
      video: type === 'video',
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);

      const pc = createPeerConnection();
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      if (offer) {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        // Flush pending ICE candidates
        for (const candidate of pendingCandidatesRef.current) {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        }
        pendingCandidatesRef.current = [];

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        await sendSignal('answer', { sdp: answer });
      }
    } catch (err) {
      console.error('Failed to accept call:', err);
      endCall();
    }
  }, [callType]);

  // --- Reject incoming call ---

  const rejectCall = useCallback(() => {
    sendSignal('call-reject', {});
    cleanup();
  }, []);

  // --- End call ---

  const endCall = useCallback(() => {
    sendSignal('call-end', {});
    cleanup();
  }, []);

  function cleanup() {
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (localStream) {
      localStream.getTracks().forEach((t) => t.stop());
    }
    setLocalStream(null);
    setRemoteStream(null);
    setCallState('idle');
    setCallType(null);
    setIsMuted(false);
    setIsCameraOff(false);
    incomingOfferRef.current = null;
    pendingCandidatesRef.current = [];
    stopSignalPolling();
  }

  // --- Toggle controls ---

  const toggleMute = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  }, [localStream]);

  const toggleCamera = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOff(!videoTrack.enabled);
      }
    }
  }, [localStream]);

  // --- Signal polling loop (legacy - kept for fallback but SSE is primary) ---

  function startSignalPolling() {
    if (signalPollRef.current) return;
    signalPollRef.current = setInterval(handleSignals, 1000);
  }

  function stopSignalPolling() {
    if (signalPollRef.current) {
      clearInterval(signalPollRef.current);
      signalPollRef.current = null;
    }
  }

  async function handleSignals() {
    const signals = await pollSignals();
    processSignals(signals);
  }

  // Process signals from any source (SSE push or polling)
  async function processSignals(signals) {
    for (const signal of signals) {
      switch (signal.type) {
        case 'call-request': {
          setCallType(signal.payload.callType);
          setCallState('incoming');
          startSignalPolling();
          break;
        }

        case 'call-accept': {
          // Other user accepted — now create offer
          const type = signal.payload.callType || callType;
          const constraints = { audio: true, video: type === 'video' };

          try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            setLocalStream(stream);

            const pc = createPeerConnection();
            stream.getTracks().forEach((track) => pc.addTrack(track, stream));

            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            await sendSignal('offer', { sdp: offer });

            setCallState('connected');
          } catch (err) {
            console.error('Failed to create offer:', err);
            endCall();
          }
          break;
        }

        case 'offer': {
          if (pcRef.current) {
            // Already have a connection — set remote description
            await pcRef.current.setRemoteDescription(new RTCSessionDescription(signal.payload.sdp));
            for (const candidate of pendingCandidatesRef.current) {
              await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
            }
            pendingCandidatesRef.current = [];

            const answer = await pcRef.current.createAnswer();
            await pcRef.current.setLocalDescription(answer);
            await sendSignal('answer', { sdp: answer });
          } else {
            // Store for when we accept
            incomingOfferRef.current = signal.payload.sdp;
          }
          break;
        }

        case 'answer': {
          if (pcRef.current) {
            await pcRef.current.setRemoteDescription(new RTCSessionDescription(signal.payload.sdp));
            for (const candidate of pendingCandidatesRef.current) {
              await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
            }
            pendingCandidatesRef.current = [];
          }
          break;
        }

        case 'ice-candidate': {
          if (pcRef.current && pcRef.current.remoteDescription) {
            await pcRef.current.addIceCandidate(new RTCIceCandidate(signal.payload.candidate));
          } else {
            pendingCandidatesRef.current.push(signal.payload.candidate);
          }
          break;
        }

        case 'call-reject': {
          cleanup();
          break;
        }

        case 'call-end': {
          cleanup();
          break;
        }
      }
    }
  }

  // Start polling when not idle (to catch incoming calls when idle, we do a slow poll)
  // DISABLED: call buttons are hidden, no idle polling needed to save Vercel invocations
  // Re-enable when call feature is shown in UI
  useEffect(() => {
    // const idlePoll = setInterval(async () => {
    //   if (callState === 'idle') {
    //     const signals = await pollSignals();
    //     for (const signal of signals) {
    //       if (signal.type === 'call-request') {
    //         setCallType(signal.payload.callType);
    //         setCallState('incoming');
    //         startSignalPolling();
    //       }
    //     }
    //   }
    // }, 2000);

    return () => {
      // clearInterval(idlePoll);
      stopSignalPolling();
    };
  }, [callState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pcRef.current) pcRef.current.close();
      if (localStream) localStream.getTracks().forEach((t) => t.stop());
      stopSignalPolling();
    };
  }, []);

  return {
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
    processSignals, // Called by SSE handler when signals arrive
  };
}
