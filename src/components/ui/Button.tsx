import './Button.css';

type ButtonVariant = 'primary' | 'ghost';

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  /** Render as a link (default) or pass children only for a span-like button. */
  href?: string;
}

/**
 * Button component — always renders as an <a> when href is present.
 * In Batch 1 only links are needed (Download CV, Scroll).
 */
export function Button({ variant = 'primary', href, children, className = '', ...props }: ButtonProps) {
  const cls = `btn btn--${variant}${className ? ' ' + className : ''}`;
  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }
  return <span className={cls}>{children}</span>;
}
