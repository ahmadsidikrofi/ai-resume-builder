import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function fileReplacer(key, value) {
  return value instanceof File ? 
  {
    name: value.name,
    size: value.size,
    type: value.type,
    lastModified: value.lastModified
  } : value
}