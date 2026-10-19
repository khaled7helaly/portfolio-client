/**
 * Inline SVG icon set. Only icons actually used in Batch 1 are included.
 * Add new icons here as needed; never import an external icon library.
 *
 * Usage: <Icon name="arrow-down" aria-hidden />
 */
type IconName = 'arrow-down' | 'download' | 'menu' | 'close';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

const paths: Record<IconName, React.ReactNode> = {
  'arrow-down': (
    <path
      d="M12 5v14M5 12l7 7 7-7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  download: (
    <>
      <path
        d="M12 3v12M8 11l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M3 17v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
  menu: (
    <path
      d="M4 6h16M4 12h16M4 18h16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  ),
  close: (
    <path
      d="M18 6 6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  ),
};

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
