import React from 'react';
import './Title.scss';

interface TitleProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  align?: 'center' | 'left' | 'right';
  size?: 'lg' | 'xxl';
}

const Title = ({ type = 'h1', children, className = '', align = 'left', size, ...props }: TitleProps) => {

  const classNames = () => {
    const classNamesObj = {
      [`title--${size}`]: size,
      [`title--${align}`]: align,
    }

    return Object.entries(classNamesObj).join(' ');
  }

  return React.createElement(
    type,
    {
      ...props,
      className: `title ${classNames()} ${className}`,
    },
    children,
  );
};

export default Title;
