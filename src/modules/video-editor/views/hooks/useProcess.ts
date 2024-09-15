import { useEffect } from 'react';
import { ProcessEvent } from '../../constants';
import { Listener } from '../../types/video-editor.type';

interface UseProcessOptions {
  onStart?: Listener;
  onEnd?: Listener;
  onError?: Listener;
}

export function useProcess({ onStart, onEnd, onError }: UseProcessOptions = {}) {
  useEffect(() => {
    if (!onStart) return;
    window.videoEditorApi.on(ProcessEvent.Start, onStart);
    return () => {
      window.videoEditorApi.off(ProcessEvent.Start, onStart);
    };
  }, []);

  useEffect(() => {
    if (!onEnd) return;
    window.videoEditorApi.on(ProcessEvent.End, onEnd);
    return () => {
      window.videoEditorApi.off(ProcessEvent.End, onEnd);
    };
  }, []);

  useEffect(() => {
    if (!onError) return;
    window.videoEditorApi.on(ProcessEvent.Error, onError);
    return () => {
      window.videoEditorApi.off(ProcessEvent.Error, onError);
    };
  }, []);
}
