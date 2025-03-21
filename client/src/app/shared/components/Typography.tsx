import { ReactNode, HTMLAttributes } from 'react';

type TypographyType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  type?: TypographyType;
  children: ReactNode;
  className?: string;
}

const typographyStyles: Record<TypographyType, string> = {
  h1: 'text-3xl font-bold',
  h2: 'text-2xl font-semibold',
  h3: 'text-xl font-semibold',
  h4: 'text-lg font-medium',
  h5: 'text-base font-medium',
  h6: 'text-sm font-medium',
  p: 'text-base',
  span: 'text-base',
};

const Typography = ({ type = 'p', children, className = '', ...props }: TypographyProps) => {
  const Tag = type;

  return (
    <Tag className={`${typographyStyles[type]} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default Typography;
