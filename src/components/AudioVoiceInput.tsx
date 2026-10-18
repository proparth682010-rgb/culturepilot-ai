import React, { useState, useRef } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';

interface AudioVoiceInputProps {
  onTranscribed: (text: string) => void;
  className?: string;
  buttonLabel?: string;
}

export const AudioVoiceInput: React.FC<AudioVoiceInputProps> = ({
  onTranscribed,
  className = '',
  buttonLabel,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        // Stop audio tracks
        stream.getTracks().forEach((track) => track.stop());
        await processAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone access denied or error:', err);
      // Informative alert or quiet fallback
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processAudio = async (blob: Blob) => {
    setIsTranscribing(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        const res = await fetch('/api/audio/transcribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            audioBase64: base64Data,
            mimeType: blob.type || 'audio/webm',
          }),
        });
        const data = await res.json();
        if (data.text) {
          onTranscribed(data.text);
        }
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error('Failed to transcribe audio:', err);
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      {isRecording ? (
        <button
          type="button"
          onClick={stopRecording}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-900/60 border border-red-700 text-red-200 text-xs font-mono animate-pulse cursor-pointer"
          title="Stop recording"
        >
          <Square className="w-3.5 h-3.5 fill-current" />
          <span>Listening (Click to Stop)</span>
        </button>
      ) : isTranscribing ? (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-stone-300 text-xs font-mono">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#d4a373]" />
          <span>Transcribing Voice...</span>
        </div>
      ) : (
        <button
          type="button"
          onClick={startRecording}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700 text-xs font-mono transition-colors cursor-pointer"
          title="Speak your taste preferences (gemini-3.5-transcribe)"
        >
          <Mic className="w-3.5 h-3.5 text-[#d4a373]" />
          <span>{buttonLabel || 'Voice Input'}</span>
        </button>
      )}
    </div>
  );
};
