import { useState, useEffect, useRef, useCallback } from 'react';

export default function useUndoRedo(initialState) {
  const [present, setPresent] = useState(initialState);
  const pastRef = useRef([]);
  const futureRef = useRef([]);
  const debounceTimerRef = useRef(null);
  const lastSavedStateRef = useRef(initialState);

  // Reset the history stack when form is re-initialized (e.g. editing a different doctor)
  const reset = useCallback((newState) => {
    setPresent(newState);
    pastRef.current = [];
    futureRef.current = [];
    lastSavedStateRef.current = newState;
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  }, []);

  const pushToPast = useCallback((state) => {
    const presentStr = JSON.stringify(state);
    const lastSavedStr = JSON.stringify(lastSavedStateRef.current);

    // Only push if there is an actual difference between current and last saved state
    if (presentStr !== lastSavedStr) {
      pastRef.current.push(JSON.parse(lastSavedStr));
      lastSavedStateRef.current = JSON.parse(presentStr);
      futureRef.current = []; // Clear redo stack on new change
    }
  }, []);

  // Set the state, optionally debouncing the history push (for text inputs)
  const updateState = useCallback((newState, immediate = false) => {
    setPresent((prev) => {
      const resolvedState = typeof newState === 'function' ? newState(prev) : newState;

      if (immediate) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        pushToPast(resolvedState);
      } else {
        // Debounce history recording (e.g. 600ms) to group fast typing sessions
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        const stateToSave = resolvedState;
        debounceTimerRef.current = setTimeout(() => {
          pushToPast(stateToSave);
        }, 600);
      }

      return resolvedState;
    });
  }, [pushToPast]);

  const undo = useCallback(() => {
    if (pastRef.current.length === 0) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const previous = pastRef.current.pop();
    futureRef.current.unshift(JSON.parse(JSON.stringify(present)));
    setPresent(previous);
    lastSavedStateRef.current = previous;
  }, [present]);

  const redo = useCallback(() => {
    if (futureRef.current.length === 0) return;

    const next = futureRef.current.shift();
    pastRef.current.push(JSON.parse(JSON.stringify(present)));
    setPresent(next);
    lastSavedStateRef.current = next;
  }, [present]);

  const canUndo = pastRef.current.length > 0;
  const canRedo = futureRef.current.length > 0;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    state: present,
    setState: updateState,
    undo,
    redo,
    canUndo,
    canRedo,
    reset
  };
}
