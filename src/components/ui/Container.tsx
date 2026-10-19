import './Container.css';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/** Max-width content container, centered with padding. */
export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`container${className ? ' ' + className : ''}`}>
      {children}
    </div>
  );
}
