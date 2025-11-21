/**
 * ICAR National Imperatives
 * These are the 8 urgent priorities that ICAR highlights.
 * Organizations and projects can be tagged with these imperatives for filtering.
 */
export const NATIONAL_IMPERATIVES = [
    'Suicide Prevention',
    'Trauma Recovery & PTSD Treatment',
    'Mental Health Access & Equity',
    'Community Resilience Building',
    'Youth Mental Health',
    'Elderly & Vulnerable Populations',
    'Emergency Response & Crisis Intervention',
    'Research & Innovation in Mental Health',
] as const;

export type NationalImperative = typeof NATIONAL_IMPERATIVES[number];

/**
 * Check if a string is a valid National Imperative
 */
export function isNationalImperative(value: string): value is NationalImperative {
    return (NATIONAL_IMPERATIVES as readonly string[]).includes(value);
}

