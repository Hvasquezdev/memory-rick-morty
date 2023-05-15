import { it, describe, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from '.';

describe('Button', () => {
  it('should render', () => {
    render(<Button />);
  });

  it('should have the right color class', () => {
    const { container } = render(<Button color='green-300' />);
    const buttonEl = container.firstChild as HTMLButtonElement;

    expect(buttonEl.className).toMatch(/green-300/);
  });

  it('should render the correct children text', () => {
    const textToRender = 'Button text';
    render(<Button>{textToRender}</Button>);

    screen.getByText(textToRender);
  });

  it('should call onClick method correctly', () => {
    const mockClickFn = vi.fn();
    const { container } = render(<Button onClick={mockClickFn} />);

    const buttonEl = container.firstChild as HTMLButtonElement;
    fireEvent.click(buttonEl);

    expect(mockClickFn).toBeCalled();
  });
});
