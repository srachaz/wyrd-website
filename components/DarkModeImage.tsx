"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";

interface DarkModeImageProps {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

const colorSchemeQuery = "(prefers-color-scheme: dark)";

function subscribeToColorScheme(callback: () => void) {
  const mediaQuery = window.matchMedia(colorSchemeQuery);
  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
}

function getColorSchemeSnapshot() {
  return window.matchMedia(colorSchemeQuery).matches;
}

function getServerColorSchemeSnapshot() {
  return false;
}

export const DarkModeImage = ({
  lightSrc,
  darkSrc,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: DarkModeImageProps) => {
  const isDark = useSyncExternalStore(
    subscribeToColorScheme,
    getColorSchemeSnapshot,
    getServerColorSchemeSnapshot,
  );

  return (
    <Image
      src={isDark ? darkSrc : lightSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
};
