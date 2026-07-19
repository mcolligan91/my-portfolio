import { useEffect, useState } from 'react';

interface UseTypewriterOptions {
  text: string;
  speedMs?: number;
  onDone?: () => void;
}

/**
 * Types out `text` one character at a time. If the user has requested
 * reduced motion, skips straight to the full text so nobody is stuck
 * waiting on an animation they've asked their OS to minimize.
 */
export function useTypewriter({ text, speedMs = 90, onDone }: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      currentIndex += 1;
      setDisplayedText(text.slice(0, currentIndex));

      if (currentIndex >= text.length) {
        clearInterval(intervalId);
        setIsDone(true);
        onDone?.();
      }
    }, speedMs);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speedMs]);

  return { displayedText, isDone };
}