import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page - Rendering', () => {
  it('should have home page text', () => {
    render(<Home />);
    expect(screen.getByText('BUZZR')).toBeInTheDocument();
  });

  it('should have home page buttons', () => {
    render(<Home />);
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Buzzr' })).toBeInTheDocument();
  });
});