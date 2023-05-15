import { it, describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Title from '.';

describe('Title', () => {
  it('should render the correct tag type', () => {
    const { container } = render(<Title type='h1' />);
    const headingElement = container.firstChild as HTMLHeadingElement;

    expect(headingElement.tagName).toMatch('H1');
  });

  it('should render the children text', () => {
    const textToRender = 'Title Render';
    render(<Title type='h1'>{textToRender}</Title>);

    screen.getByText(textToRender);
  });
});
