import { Seo } from '@/seo/Seo';
import { buildPersonJsonLd } from '@/seo/structuredData';
import { IntroStage } from '@/sections/intro/IntroStage';
import { useProfile } from '@/hooks/useProfile';

/**
 * Home page — assembles the IntroStage (Hero + About) and future sections.
 * The SEO component updates the document head with the Person JSON-LD.
 */
export default function HomePage() {
  const { data: profile } = useProfile();

  return (
    <>
      {profile && (
        <Seo
          path="/"
          jsonLd={buildPersonJsonLd(profile)}
        />
      )}

      {profile && <IntroStage profile={profile} />}
    </>
  );
}
