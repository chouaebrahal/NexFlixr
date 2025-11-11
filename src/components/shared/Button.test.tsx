import { describe, it, expect, vi  } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders with the correct text', () => {
    render(<Button text="Click me" />);
    
    // Get the button element by its text content
    const buttonElement = screen.getByText('Click me');
    
    // Verify the button is in the document
    expect(buttonElement).toBeInTheDocument();
  });

  it('applies custom class names', () => {
    render(<Button text="Test Button" className="custom-class another-class" />);
    
    const buttonElement = screen.getByText('Test Button');
    
    // Verify that custom classes are applied along with default ones
    expect(buttonElement).toHaveClass('custom-class', 'another-class');
  });

  it('calls handleClick when clicked', () => {
    // Create a mock function to track if it gets called
    const handleClick = vi.fn();
    render(<Button text="Click me" handleClick={handleClick} />);
    
    const buttonElement = screen.getByText('Click me');
    
    // Simulate clicking the button
    fireEvent.click(buttonElement);
    
    // Verify that the handleClick function was called once
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with default styling classes', () => {
    render(<Button text="Styled Button" />);
    
    const buttonElement = screen.getByText('Styled Button');
    
    // Check for some of the default classes applied to the button
    expect(buttonElement).toHaveClass('text-white', 'bg-primary', 'rounded-full');
  });

  it('is of type button', () => {
    render(<Button text="Submit" />);
    
    const buttonElement = screen.getByText('Submit');
    
    // Check that the button has the correct type attribute
    expect(buttonElement).toHaveAttribute('type', 'button');
  });
});