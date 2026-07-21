import { useEffect, useState } from 'react';

interface UseTypewriterOptions {
  text: string;
  speedMs?: number;
  startDelayMs?: number;
  onDone?: () => void;
}

/**
 * Waits `startDelayMs` (so a cursor can blink alone first), then types out
 * `text` one character at a time.
 */
export function useTypewriter({ text, speedMs = 90, startDelayMs = 0, onDone }: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      setHasStarted(true);
      let currentIndex = 0;
      intervalId = setInterval(() => {
        currentIndex += 1;
        setDisplayedText(text.slice(0, currentIndex));

        if (currentIndex >= text.length) {
          clearInterval(intervalId);
          setIsDone(true);
          onDone?.();
        }
      }, speedMs);
    }, startDelayMs);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speedMs, startDelayMs]);

  return { displayedText, hasStarted, isDone };
}