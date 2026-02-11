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
  const toolkitCaption = t('toolkit.caption');

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
    <div className="flex flex-col bg-background">
      {/* Hero frozen by request */}
      <HeroSection primaryHref={primaryHref} secondaryHref="#showcase" />

      <ToolkitShowcase title={toolkitTitle} caption={toolkitCaption} />

      {/* Pain points */}
      <section id="features" className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {t('pain.title')}
            </h2>
            <p className="mt-4 text-balance text-muted-foreground">
              {t('pain.subtitle')}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-14">
            {painItems.map((item, index) => (
              <article
                key={item.title}
                className="group rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-white/20"
              >
                <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-2 text-xs font-semibold text-foreground/80">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                {t('solution.title')}
              </h2>
              <p className="mt-4 max-w-2xl text-balance text-muted-foreground">
                {t('solution.subtitle')}
              </p>

              <div className="mt-10 space-y-4">
                {solutionItems.map((item, index) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-xs font-semibold text-foreground/80">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-black/30 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.16),transparent_55%),radial-gradient(circle_at_85%_30%,rgba(236,72,153,0.12),transparent_55%),radial-gradient(circle_at_55%_85%,rgba(34,197,94,0.08),transparent_60%)]" />
                <div className="relative">
                  <div className="text-xs font-semibold tracking-[0.08em] text-foreground/70 uppercase">
                    {t('solution.visual.title')}
                  </div>
                  <div className="mt-4 grid gap-3">
                    {[1, 2, 3, 4].map((index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3"
                      >
                        <span className="text-sm font-medium">
                          {t('solution.visual.shotLabel', { index })}
                        </span>
                        <span className="rounded-full border border-white/20 bg-white/[0.04] px-2.5 py-1 text-xs text-foreground/75">
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
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {t('how.title')}
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-14">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-3xl border border-white/10 bg-white/[0.02] p-7"
              >
                <div className="inline-flex rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs font-medium text-foreground/75">
                  {t('how.stepLabel', { index: index + 1 })}
                </div>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {t('showcase.title')}
            </h2>
            <p className="mt-4 text-balance text-muted-foreground">
              {t('showcase.subtitle')}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-14">
            {showcaseCards.map((card, index) => (
              <article
                key={card.title}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition-colors hover:border-white/20"
              >
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-gradient-to-b from-white/[0.14] via-white/[0.06] to-white/[0.02]">
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/25 to-transparent" />
                  <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/15 bg-black/25 px-3 py-2 text-xs text-foreground/80 backdrop-blur-sm">
                    {card.meta}
                  </div>
                  <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-xs font-medium text-foreground/80">
                    #{index + 1}
                  </div>
                </div>
                <div className="space-y-2 p-5">
                  <div className="text-base font-semibold">{card.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {card.meta}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t('showcase.cardHint')}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" className="h-11 rounded-full px-7">
              <LocaleLink href={primaryHref}>{t('showcase.cta')}</LocaleLink>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* Final CTA */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/12 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-10 text-center shadow-[0_18px_40px_rgba(0,0,0,0.25)] sm:p-14">
          <h2 className="mx-auto max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {t('final.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-muted-foreground">
            {t('final.subtitle')}
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="h-11 rounded-full px-7">
              <LocaleLink href={primaryHref}>{t('final.cta')}</LocaleLink>
            </Button>
          </div>
        </div>
      </section>

      <CrispChat />
    </div>
  );
}
