import FaqSection from '@/components/blocks/faqs/faqs';
import HeroSection from '@/components/blocks/hero/hero';
import ToolkitShowcase from '@/components/blocks/landing/toolkit-showcase';
import CrispChat from '@/components/layout/crisp-chat';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
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

  const painItems = [
    {
      title: t('pain.items.item-1.title'),
      desc: t('pain.items.item-1.desc'),
    },
    {
      title: t('pain.items.item-2.title'),
      desc: t('pain.items.item-2.desc'),
    },
    {
      title: t('pain.items.item-3.title'),
      desc: t('pain.items.item-3.desc'),
    },
    {
      title: t('pain.items.item-4.title'),
      desc: t('pain.items.item-4.desc'),
    },
  ];

  const solutionItems = [
    {
      title: t('solution.items.item-1.title'),
      desc: t('solution.items.item-1.desc'),
    },
    {
      title: t('solution.items.item-2.title'),
      desc: t('solution.items.item-2.desc'),
    },
    {
      title: t('solution.items.item-3.title'),
      desc: t('solution.items.item-3.desc'),
    },
  ];

  const steps = [
    {
      title: t('how.steps.step-1.title'),
      desc: t('how.steps.step-1.desc'),
    },
    {
      title: t('how.steps.step-2.title'),
      desc: t('how.steps.step-2.desc'),
    },
    {
      title: t('how.steps.step-3.title'),
      desc: t('how.steps.step-3.desc'),
    },
  ];

  const showcaseCards = [
    {
      title: t('showcase.cards.card-1.title'),
      meta: t('showcase.cards.card-1.meta'),
    },
    {
      title: t('showcase.cards.card-2.title'),
      meta: t('showcase.cards.card-2.meta'),
    },
    {
      title: t('showcase.cards.card-3.title'),
      meta: t('showcase.cards.card-3.meta'),
    },
  ];

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

      {/* Pain points */}
      <section id="features" className="bg-[#0A0A0A] px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 md:mb-24">
            <span className="text-sm font-bold tracking-widest text-[#FFD700] uppercase">
              {t('pain.eyebrow')}
            </span>
            <h2 className="mt-4 max-w-4xl text-balance font-bricolage-grotesque text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
              {t('pain.title')}
            </h2>
            <p className="mt-6 max-w-2xl text-xl text-white/60">
              {t('pain.subtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {painItems.map((item, index) => (
              <article
                key={item.title}
                className="group relative overflow-hidden bg-white/[0.03] p-8 transition-colors hover:bg-white/[0.05] sm:p-10"
              >
                <div className="absolute top-0 right-0 p-8 opacity-20 font-bricolage-grotesque text-6xl font-bold text-white transition-opacity group-hover:opacity-40">
                  0{index + 1}
                </div>
                <h3 className="mt-8 text-2xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-lg text-white/60">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-black px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <span className="text-sm font-bold tracking-widest text-[#FFD700] uppercase">
                {t('solution.eyebrow')}
              </span>
              <h2 className="mt-4 text-balance font-bricolage-grotesque text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl">
                {t('solution.title')}
              </h2>
              <p className="mt-6 text-xl text-white/60">
                {t('solution.subtitle')}
              </p>

              <div className="mt-12 space-y-12 border-l border-white/10 pl-8">
                {solutionItems.map((item, index) => (
                  <article key={item.title} className="relative">
                    <span className="absolute -left-[37px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FFD700]" />
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-lg text-white/60">{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#111]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD700]/10 via-transparent to-transparent" />
                <div className="flex h-full flex-col justify-between p-8">
                  <div className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">
                    {t('solution.visual.title')}
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b border-white/10 py-4 last:border-0"
                      >
                        <span className="font-mono text-sm text-white/80">
                          {t('solution.visual.shotLabel', { index })}
                        </span>
                        <span className="text-xs font-medium text-[#FFD700] uppercase">
                          {t('solution.visual.action')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#0A0A0A] px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center md:mb-24">
            <span className="text-sm font-bold tracking-widest text-[#FFD700] uppercase">
              {t('how.eyebrow')}
            </span>
            <h2 className="mx-auto mt-4 max-w-3xl text-balance font-bricolage-grotesque text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl">
              {t('how.title')}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="relative pt-8">
                <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent" />
                <span className="font-mono text-sm text-[#FFD700]">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-2xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-4 text-lg text-white/60">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="bg-black px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 md:mb-24">
            <span className="text-sm font-bold tracking-widest text-[#FFD700] uppercase">
              {t('showcase.eyebrow')}
            </span>
            <h2 className="mt-4 max-w-4xl text-balance font-bricolage-grotesque text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
              {t('showcase.title')}
            </h2>
            <p className="mt-6 max-w-2xl text-xl text-white/60">
              {t('showcase.subtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {showcaseCards.map((card, index) => (
              <article
                key={card.title}
                className="group cursor-pointer overflow-hidden bg-[#111]"
              >
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-white/5 transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="text-lg font-bold text-white">
                      {card.title}
                    </div>
                    <div className="mt-1 font-mono text-xs text-[#FFD700]">
                      {card.meta}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Button
              asChild
              className="group relative h-14 overflow-hidden rounded-full border border-[#FFD700] bg-transparent px-10 text-lg font-medium text-[#FFD700] transition-all duration-300 hover:bg-[#FFD700] hover:text-black"
            >
              <LocaleLink href={primaryHref}>
                <span className="relative z-10">{t('showcase.cta')}</span>
              </LocaleLink>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* Final CTA */}
      <section className="bg-[#FFD700] px-6 py-24 text-black sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-sm font-bold tracking-widest text-black/60 uppercase">
            {t('final.eyebrow')}
          </span>
          <h2 className="mt-6 text-balance font-bricolage-grotesque text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
            {t('final.title')}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-xl font-medium text-black/70">
            {t('final.subtitle')}
          </p>
          <div className="mt-10 flex justify-center">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-black px-10 text-lg font-bold text-white hover:bg-black/80"
            >
              <LocaleLink href={primaryHref}>{t('final.cta')}</LocaleLink>
            </Button>
          </div>
        </div>
      </section>

      <CrispChat />
    </div>
  );
}
