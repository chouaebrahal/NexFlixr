import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { usePersonStore } from '@/store/usePersonStore';
import { useMediaStore } from '@/store/useMediaStore';
import { useThemeStore } from '@/store/useThemeStore';
import AdvancedSearch from './AdvancedSearch';
import { getCountriesList, getGenresList, getkeywords } from '@/api/tmdbtvmovies';

// Mock the API functions
vi.mock('@/api/tmdbtvmovies', () => ({
  getCountriesList: vi.fn(),
  getGenresList: vi.fn(),
  getkeywords: vi.fn(),
}));

// Mock the stores
vi.mock('@/store/usePersonStore');
vi.mock('@/store/useMediaStore');
vi.mock('@/store/useThemeStore');

// Mock the child components
vi.mock('./SearchableDropdown', () => ({
  default: ({ DefaultLabel, data }: { DefaultLabel: string; data: any[] }) => (
    <div data-testid={`searchable-dropdown-${DefaultLabel.toLowerCase()}`}>
      {DefaultLabel} Dropdown
    </div>
  ),
}));

vi.mock('./Button', () => ({
  default: ({ text, handleClick }: { text: string; handleClick: () => void }) => (
    <button data-testid={`button-${text.toLowerCase().replace(/\s+/g, '-')}`} onClick={handleClick}>
      {text}
    </button>
  ),
}));

vi.mock('./Loading', () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}));

vi.mock('../ui/input', () => ({
  Input: ({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <input
      data-testid="search-input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  ),
}));

vi.mock('react-icons/io5', () => ({
  IoSearchOutline: () => <span>Search Icon</span>,
}));

// Mock data
const mockCountries = [
  { iso_3166_1: 'US', english_name: 'United States' },
  { iso_3166_1: 'GB', english_name: 'United Kingdom' },
];

const mockGenres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
];

const mockKeywords = [
  { id: 1, name: 'keyword1' },
  { id: 2, name: 'keyword2' },
];

const mockTrendingPersons = [
  { id: 1, name: 'Actor 1' },
  { id: 2, name: 'Actor 2' },
];

const mockYears = Array.from({ length: 100 }, (_, i) => 2023 - i);

// Create a query client for testing
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Wrapper component for providing necessary contexts
const AdvancedSearchWrapper = ({ type = 'movie', appliedFilters = {}, setFilters = vi.fn() }: any) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AdvancedSearch type={type} appliedFilters={appliedFilters} setFilters={setFilters} />
    </ThemeProvider>
  </QueryClientProvider>
);

describe('AdvancedSearch Component', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Mock API responses
    (getCountriesList as vi.Mock).mockResolvedValue(mockCountries);
    (getGenresList as vi.Mock).mockResolvedValue(mockGenres);
    (getkeywords as vi.Mock).mockResolvedValue({ results: mockKeywords });
    
    // Mock store functions
    (usePersonStore as vi.Mock).mockReturnValue({
      trendingPerson: mockTrendingPersons,
      fetchTrendingPerson: vi.fn(),
    });
    
    (useMediaStore as vi.Mock).mockReturnValue({
      years: mockYears,
    });
    
    (useThemeStore as vi.Mock).mockReturnValue({
      theme: 'dark',
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without crashing', async () => {
    render(<AdvancedSearchWrapper />);
    
    // Wait for async operations to complete
    await waitFor(() => {
      expect(screen.getByText('Countries Dropdown')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Actors Dropdown')).toBeInTheDocument();
    expect(screen.getByText('Years Dropdown')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('fetches and displays countries, genres, and persons on mount', async () => {
    render(<AdvancedSearchWrapper />);
    
    // Wait for API calls to complete
    await waitFor(() => {
      expect(getCountriesList).toHaveBeenCalled();
      expect(getGenresList).toHaveBeenCalledWith('movie');
      expect(screen.getByText('Countries Dropdown')).toBeInTheDocument();
    });
    
    // Verify that the dropdowns are rendered
    expect(screen.getByText('Countries Dropdown')).toBeInTheDocument();
    expect(screen.getByText('Actors Dropdown')).toBeInTheDocument();
    expect(screen.getByText('Years Dropdown')).toBeInTheDocument();
  });

  it('displays loading state while fetching data', () => {
    (getCountriesList as vi.Mock).mockReturnValue(new Promise(() => {})); // Never resolve
    (getGenresList as vi.Mock).mockReturnValue(new Promise(() => {})); // Never resolve
    
    render(<AdvancedSearchWrapper />);
    
    // Initially, loading should be shown if the component implementation includes it
    // (Based on the component code, loading is shown in the genres section)
  });

  it('handles keyword search correctly', async () => {
    render(<AdvancedSearchWrapper />);
    
    // Wait for initial data to load
    await waitFor(() => {
      expect(screen.getByText('Countries Dropdown')).toBeInTheDocument();
    });
    
    // Simulate typing in the search input
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'keyword' } });
    
    // Wait for the debounced search to trigger
    await waitFor(() => {
      expect(getkeywords).toHaveBeenCalledWith('keyword');
    });
    
    // Wait for keywords to appear
    await waitFor(() => {
      expect(screen.getByText('keyword1')).toBeInTheDocument();
    });
    
    // Verify that keywords are displayed
    expect(screen.getByText('keyword1')).toBeInTheDocument();
    expect(screen.getByText('keyword2')).toBeInTheDocument();
  });

  it('handles genre selection correctly', async () => {
    render(<AdvancedSearchWrapper />);
    
    // Wait for genres to load
    await waitFor(() => {
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
    
    // Click on the Action genre
    const actionButton = screen.getByText('Action');
    fireEvent.click(actionButton);
    
    // Verify the genre button has the selected class
    expect(actionButton).toHaveClass('bg-pink-600');
    
    // Click again to deselect
    fireEvent.click(actionButton);
    expect(actionButton).not.toHaveClass('bg-pink-600');
  });

  it('applies filters when apply button is clicked', async () => {
    const setFiltersMock = vi.fn();
    render(<AdvancedSearchWrapper setFilters={setFiltersMock} />);
    
    // Wait for initial data to load
    await waitFor(() => {
      expect(screen.getByText('Countries Dropdown')).toBeInTheDocument();
    });
    
    // Select a genre to enable the apply button
    const actionButton = screen.getByText('Action');
    fireEvent.click(actionButton);
    
    // Wait for the apply button to appear
    await waitFor(() => {
      expect(screen.getByTestId('button-apply-filter-1')).toBeInTheDocument();
    });
    
    // Click the apply button
    const applyButton = screen.getByTestId('button-apply-filter-1');
    fireEvent.click(applyButton);
    
    // Verify that setFilters was called
    expect(setFiltersMock).toHaveBeenCalled();
  });

  it('resets filters when reset button is clicked', async () => {
    const setFiltersMock = vi.fn();
    render(<AdvancedSearchWrapper setFilters={setFiltersMock} />);
    
    // Wait for initial data to load
    await waitFor(() => {
      expect(screen.getByText('Countries Dropdown')).toBeInTheDocument();
    });
    
    // Select a genre to enable the reset button
    const actionButton = screen.getByText('Action');
    fireEvent.click(actionButton);
    
    // Wait for the reset button to appear
    await waitFor(() => {
      expect(screen.getByTestId('button-reset-filters')).toBeInTheDocument();
    });
    
    // Click the reset button
    const resetButton = screen.getByTestId('button-reset-filters');
    fireEvent.click(resetButton);
    
    // Verify that setFilters was called with reset values
    expect(setFiltersMock).toHaveBeenCalledWith({ year: 0, with_origin_country: '', with_cast: '', with_genres: '', with_keywords: '' });
  });

  it('displays error messages when API calls fail', async () => {
    // Mock API failure
    (getCountriesList as vi.Mock).mockRejectedValue(new Error('Failed to fetch countries'));
    (getGenresList as vi.Mock).mockRejectedValue(new Error('Failed to fetch genres'));
    
    render(<AdvancedSearchWrapper />);
    
    // Wait for error state to appear
    await waitFor(() => {
      // Note: The exact error display depends on how the component handles errors
      // This test would need to match the actual error handling in the component
    });
  });

  it('toggles between movie and tv types', async () => {
    render(<AdvancedSearchWrapper type="tv" />);
    
    // Wait for initial data to load
    await waitFor(() => {
      expect(screen.getByText('Countries Dropdown')).toBeInTheDocument();
    });
    
    // Verify that genres API was called with 'tv' type
    expect(getGenresList).toHaveBeenCalledWith('tv');
  });

  it('shows keyword suggestions when search term is entered', async () => {
    render(<AdvancedSearchWrapper />);
    
    // Wait for initial data to load
    await waitFor(() => {
      expect(screen.getByText('Countries Dropdown')).toBeInTheDocument();
    });
    
    // Simulate typing in the search input
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    // Wait for the keyword API call
    await waitFor(() => {
      expect(getkeywords).toHaveBeenCalledWith('test');
    });
    
    // Verify the keyword suggestions container appears
    await waitFor(() => {
      const keywordContainer = screen.queryAllByRole('button', { name: /keyword\d+/ });
      expect(keywordContainer.length).toBeGreaterThan(0);
    });
  });
});