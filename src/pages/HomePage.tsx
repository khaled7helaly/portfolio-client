import { Seo } from '@/seo/Seo';

/**
 * Home page — assembles all enabled sections.
 * Will be populated with IntroStage, Hero, About and future sections in later milestones.
 */
export default function HomePage() {
  return (
    <>
      <Seo />
      <div style={{
        minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-body)', color: 'var(--color-muted)', fontSize: '0.875rem',
      }}>
        
      </div>
    </>
  );
}