import HeroSection from '@/components/blocks/hero/hero';
import SeedanceArtFollowingSections from '@/components/blocks/landing/seedance-art-following-sections';
import FeaturedAiModels from '@/components/blocks/landing/featured-ai-models';
import ToolkitShowcase from '@/components/blocks/landing/toolkit-showcase';
import CrispChat from '@/components/layout/crisp-chat';
import { constructMetadata } from '@/lib/metadata';
import { getSession } from '@/lib/server';
import { Routes } from '@/routes';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

/**
 * https://next-intl.dev/docs/environments/actions-metadata-route-handlers#metadata-api
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    pathname: '',
  });
}

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage(props: HomePageProps) {
  const { locale } = await props.params;
  const session = await getSession();

  const t = await getTranslations({ locale, namespace: 'HomePage.landing' });

  const primaryHref = session?.user ? Routes.Dashboard : Routes.Login;

  const toolkitTitle = t('toolkit.title');
  const toolkitSubtitle = t('toolkit.subtitle');
  const toolkitCta = t('toolkit.cta');
  const toolkitImageAlt = t('toolkit.imageAlt');

  return (
    <div className="flex flex-col bg-black text-white">
      {/* Hero frozen by request */}
      <HeroSection primaryHref={primaryHref} />

      <ToolkitShowcase
        title={toolkitTitle}
        subtitle={toolkitSubtitle}
        ctaLabel={toolkitCta}
        ctaHref={primaryHref}
        imageAlt={toolkitImageAlt}
      />

      <FeaturedAiModels />

      <SeedanceArtFollowingSections />

      <CrispChat />
    </div>
  );
}
