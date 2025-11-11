import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading Component', () => {
  it('renders the loading animation', () => {
    render(<Loading />);
    
    // Find the loading SVG element by its role
    const loadingElement = screen.getByRole('status');
    
    // Verify the loading element is present
    expect(loadingElement).toBeInTheDocument();
  });

  it('contains the spinner SVG', () => {
    render(<Loading />);
    
    // Find the SVG element inside the loading component
    const svgElement = screen.getByRole('status').querySelector('svg');
    
    // Verify the SVG element exists
    expect(svgElement).toBeInTheDocument();
  });

  it('has the correct accessibility attributes', () => {
    render(<Loading />);
    
    const svgElement = screen.getByRole('status').querySelector('svg');
    
    // Verify the SVG has the correct accessibility attributes
    expect(svgElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('has the visually hidden "Loading..." text', () => {
    render(<Loading />);
    
    // Find the visually hidden loading text
    const loadingText = screen.getByText('Loading...');
    
    // Verify the loading text is present (for screen readers)
    expect(loadingText).toBeInTheDocument();
    
    // Verify it has the 'sr-only' class which makes it invisible to sighted users
    expect(loadingText).toHaveClass('sr-only');
  });

  it('has the correct CSS classes for animation', () => {
    render(<Loading />);
    
    const svgElement = screen.getByRole('status').querySelector('svg');
    
    // Verify that the animation class 'animate-spin' is applied
    expect(svgElement).toHaveClass('animate-spin');
  });

  it('has the centering container', () => {
    render(<Loading />);
    
    // The main div element itself has the container classes
    const container = screen.getByRole('status').closest('div');
    
    // Verify the container has classes to center its content
    expect(container).toHaveClass('h-full', 'min-h-screen', 'min-w-full', 'grid', 'place-items-center');
  });
});