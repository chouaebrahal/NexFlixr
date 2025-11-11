import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useThemeStore } from './useThemeStore';

// Mock window.matchMedia for testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated but needed for older browsers
    removeListener: vi.fn(), // Deprecated but needed for older browsers
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('useThemeStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    useThemeStore.setState({
      theme: 'light',
    });
  });

  it('should initialize with light theme by default', () => {
    const { theme } = useThemeStore.getState();
    expect(theme).toBe('light');
  });

  it('should toggle theme from light to dark', () => {
    const { toggleTheme } = useThemeStore.getState();
    toggleTheme();
    const { theme } = useThemeStore.getState();
    expect(theme).toBe('dark');
  });

  it('should toggle theme from dark to light', () => {
    // First set to dark
    useThemeStore.setState({ theme: 'dark' });
    
    const { toggleTheme } = useThemeStore.getState();
    toggleTheme();
    const { theme } = useThemeStore.getState();
    expect(theme).toBe('light');
  });
});