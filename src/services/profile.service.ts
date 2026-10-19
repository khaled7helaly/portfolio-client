/**
 * Profile service — returns the Profile view-model.
 *
 * LOCAL DATA SOURCE: imports from src/data/profile.ts.
 * API UPGRADE: replace the import below with:
 *   const res = await fetch(import.meta.env.VITE_API_BASE + '/profile');
 *   return res.json();
 */
import type { Profile } from '@/types';
import { profile } from '@/data/profile';

export async function getProfile(): Promise<Profile> {
  // Simulate async boundary so the API swap is a drop-in replacement.
  return profile;
}