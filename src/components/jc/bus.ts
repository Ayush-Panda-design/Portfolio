import { useSyncExternalStore } from "react";

/**
 * A tiny bridge between page components and the photo scenes behind them.
 * Components switch lights on (hover, open, scroll); the scene renders them.
 */
const hot = new Map<string, boolean>();
const subs = new Set<() => void>();

export function setHot(key: string, on: boolean) {
  if (!!hot.get(key) === on) return;
  hot.set(key, on);
  subs.forEach((s) => s());
}

export function useHot(key?: string) {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb);
      return () => subs.delete(cb);
    },
    () => (key ? !!hot.get(key) : false),
    () => false,
  );
}

const progress = new Map<string, number>();
const plisteners = new Map<string, Set<(v: number) => void>>();

export function setProgress(key: string, v: number) {
  progress.set(key, v);
  plisteners.get(key)?.forEach((l) => l(v));
}

export function onProgress(key: string, cb: (v: number) => void) {
  let s = plisteners.get(key);
  if (!s) plisteners.set(key, (s = new Set()));
  s.add(cb);
  cb(progress.get(key) ?? 0);
  return () => {
    s!.delete(cb);
  };
}
