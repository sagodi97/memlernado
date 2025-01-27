import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// lib/utils.ts

export function parseError(error: unknown): string {
  if (error instanceof Error) {
    // Check if the error is from Appwrite
    if (error.name === "AppwriteException") {
      return error.message;
    }
    // Handle other known error types here
    // ...

    // Default error message for generic Error objects
    return error.message;
  }

  // Handle non-Error objects
  return "An unknown error occurred";
}
