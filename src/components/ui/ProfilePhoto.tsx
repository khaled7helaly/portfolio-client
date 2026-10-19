import './ProfilePhoto.css';
import { UI } from '@/content/ui';

interface ProfilePhotoProps {
  src: string;
  alt: string;
  /** Width in px — used for the img width/height attributes (LCP optimisation). */
  width: number;
  /** Height in px — derived from 4:5 ratio if not supplied. */
  height?: number;
  /** When true this is the LCP element: fetchpriority="high", no lazy loading. */
  priority?: boolean;
  className?: string;
}

/**
 * Portrait photo with a 1px frame line behind it.
 * Falls back to a "KH" monogram when the image file is absent or fails to load.
 * The fallback has identical dimensions so there is no layout shift.
 */
export function ProfilePhoto({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
}: ProfilePhotoProps) {
  const h = height ?? Math.round((width * 5) / 4);

  function handleError(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    img.style.display = 'none';
    const fallback = img.nextElementSibling as HTMLElement | null;
    if (fallback) fallback.style.display = 'flex';
  }

  return (
    <div
      className={`profile-photo${className ? ' ' + className : ''}`}
      style={{ '--photo-w': `${width}px`, '--photo-h': `${h}px` } as React.CSSProperties}
    >
      {/* Frame line (decoration, behind the photo) */}
      <span className="profile-photo__frame" aria-hidden="true" />

      {/* Portrait */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={h}
        className="profile-photo__img"
        loading={priority ? undefined : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        onError={handleError}
      />

      {/* Monogram fallback (hidden by default, shown if image fails) */}
      <span
        className="profile-photo__monogram"
        aria-label={UI.photo.monogramAriaLabel}
        style={{ display: 'none' }}
      >
        {UI.photo.monogramLabel}
      </span>
    </div>
  );
}
