/* eslint-disable @typescript-eslint/no-explicit-any */

// Type declarations for the YouTube IFrame Player API
// https://developers.google.com/youtube/iframe_api_reference

interface YTPlayerEvent {
  target: YTPlayerInstance;
  data?: number;
}

interface YTPlayerInstance {
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  setVolume(volume: number): void;
  getVolume(): number;
  destroy(): void;
  getPlayerState(): number;
}

interface YTPlayerOptions {
  videoId: string;
  width?: string | number;
  height?: string | number;
  playerVars?: {
    autoplay?: 0 | 1;
    mute?: 0 | 1;
    playsinline?: 0 | 1;
    rel?: 0 | 1;
    controls?: 0 | 1;
    modestbranding?: 0 | 1;
    enablejsapi?: 0 | 1;
    origin?: string;
    loop?: 0 | 1;
    [key: string]: any;
  };
  events?: {
    onReady?: (event: YTPlayerEvent) => void;
    onStateChange?: (event: YTPlayerEvent) => void;
    onError?: (event: YTPlayerEvent) => void;
  };
}

interface YTNamespace {
  Player: new (
    elementId: string | HTMLElement,
    options: YTPlayerOptions
  ) => YTPlayerInstance;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
}

interface Window {
  YT: YTNamespace;
  onYouTubeIframeAPIReady: (() => void) | undefined;
}
