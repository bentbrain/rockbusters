"use client";

import posthog from "posthog-js";

type CaptureProperties = Record<string, boolean | number | string>;
type GameResult = "lost" | "won";

let isAnalyticsEnabled = false;

export function setAnalyticsEnabled(enabled: boolean) {
  isAnalyticsEnabled = enabled;
}

function captureEvent(eventName: string, properties: CaptureProperties) {
  if (!isAnalyticsEnabled) return;
  posthog.capture(eventName, properties);
}

interface GameLoadedProperties {
  dayId: number;
  guessesMade: number;
  hasSavedProgress: boolean;
  isComplete: boolean;
}

interface GuessSubmittedProperties {
  dayId: number;
  guessNumber: number;
  guessesRemaining: number;
  isCorrect: boolean;
  isFinalGuess: boolean;
  revealedCharacters: number;
}

interface GameCompletedProperties {
  dayId: number;
  guessCount: number;
  result: GameResult;
}

interface ResultsCopiedProperties {
  dayId: number;
  guessCount: number;
  progress: string;
  result: GameResult;
}

interface PanelOpenedProperties {
  panel: "help" | "statistics";
  trigger: "icon" | "text";
}

export function trackGameLoaded(properties: GameLoadedProperties) {
  captureEvent("rockbusters_game_loaded", {
    day_id: properties.dayId,
    guesses_made: properties.guessesMade,
    has_saved_progress: properties.hasSavedProgress,
    is_complete: properties.isComplete,
  });
}

export function trackGuessSubmitted(properties: GuessSubmittedProperties) {
  captureEvent("rockbusters_guess_submitted", {
    day_id: properties.dayId,
    guess_number: properties.guessNumber,
    guesses_remaining: properties.guessesRemaining,
    is_correct: properties.isCorrect,
    is_final_guess: properties.isFinalGuess,
    revealed_characters: properties.revealedCharacters,
  });
}

export function trackGameCompleted(properties: GameCompletedProperties) {
  captureEvent("rockbusters_game_completed", {
    day_id: properties.dayId,
    guess_count: properties.guessCount,
    result: properties.result,
  });
}

export function trackResultsCopied(properties: ResultsCopiedProperties) {
  captureEvent("rockbusters_results_copied", {
    day_id: properties.dayId,
    guess_count: properties.guessCount,
    progress: properties.progress,
    result: properties.result,
  });
}

export function trackPanelOpened(properties: PanelOpenedProperties) {
  captureEvent("rockbusters_panel_opened", {
    panel: properties.panel,
    trigger: properties.trigger,
  });
}
