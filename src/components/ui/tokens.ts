// ICAR Design Tokens
export const ICAR_TOKENS = {
  colors: {
    // Primary (Sea Green) - Updated to match website
    primary: {
      darkest: '#004d57',
      darker: '#02808b',
      base: '#02808b',
      light: '#83c5be',
      offWhite: '#f0f9fa',
    },
    // Accent (Orange) - Updated to match website
    accent: {
      base: '#d95222',
      hover: '#c0451a',
      light: '#ffddd2',
    },
    // Peach/Coral (from brand guidelines)
    peach: {
      base: '#ffb4a0',
      light: '#ffddd2',
    },
    coral: {
      base: '#ff8c6b',
    },
    // Brown (from website palette)
    brown: {
      dark: '#48231a',
    },
    // Grays
    gray: {
      50: '#f8f9fa',
      100: '#e9ecef',
      200: '#dee2e6',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#6c757d',
      800: '#343a40',
    },
    // Status
    success: '#10b981',
    warning: '#f59e0b',
    destructive: '#ef4444',
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  fonts: {
    heading: "'Roboto Slab', serif",
    body: "'Calibri', 'Segoe UI', sans-serif",
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 2px 4px rgba(0, 0, 0, 0.05)',
    lg: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
} as const;
