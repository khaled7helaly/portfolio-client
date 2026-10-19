import { useAsync } from './useAsync';
import { getProfile } from '@/services';

/**
 * Fetches the profile data.
 * Returns { data: Profile | null, loading, error, reload }.
 */
export function useProfile() {
  return useAsync(getProfile);
}