import HeroSection from '@/components/blocks/hero/hero';
import FaqSection from '@/components/blocks/faqs/faqs';
import CrispChat from '@/components/layout/crisp-chat';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { getSession } from '@/lib/server';
import { constructMetadata } from '@/lib/metadata';
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

  const trustTags = [
    t('trust.tags.tag-1'),
    t('trust.tags.tag-2'),
    t('trust.tags.tag-3'),
    t('trust.tags.tag-4'),
  ];

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
    <div className="flex flex-col">
      <HeroSection primaryHref={primaryHref} secondaryHref={Routes.Features} />

      {/* Trust strip (avoid using unlicensed logos) */}
      <section className="px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-3xl border bg-muted/30 px-6 py-10 text-center">
          <p className="text-sm text-muted-foreground">{t('trust.title')}</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {trustTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border bg-background/70 px-3 py-1 text-sm text-foreground/90"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section id="features" className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {t('pain.title')}
            </h2>
            <p className="mt-4 text-balance text-muted-foreground">
              {t('pain.subtitle')}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {painItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border bg-background p-6 shadow-sm"
              >
                <div className="text-lg font-semibold">{item.title}</div>
                <div className="mt-2 text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-muted/30 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {t('solution.title')}
            </h2>
            <p className="mt-4 text-balance text-muted-foreground">
              {t('solution.subtitle')}
            </p>

            <div className="mt-8 space-y-4">
              {solutionItems.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border bg-background p-5"
                >
                  <div className="font-semibold">{f.title}</div>
                  <div className="mt-1 text-muted-foreground">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* visual placeholder */}
          <div className="relative overflow-hidden rounded-3xl border bg-background p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.16),transparent_55%),radial-gradient(circle_at_85%_30%,rgba(236,72,153,0.12),transparent_55%),radial-gradient(circle_at_55%_85%,rgba(34,197,94,0.10),transparent_60%)]" />
            <div className="relative">
              <div className="text-sm font-medium text-muted-foreground">
                {t('solution.visual.title')}
              </div>
              <div className="mt-4 grid gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border bg-background/80 px-4 py-3 backdrop-blur"
                  >
                    <span className="text-sm">
                      {t('solution.visual.shotLabel', { index: i })}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {t('solution.visual.action')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {t('how.title')}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, idx) => (
              <div
                key={s.title}
                className="rounded-2xl border bg-background p-6"
              >
                <div className="text-sm text-muted-foreground">
                  {t('how.stepLabel', { index: idx + 1 })}
                </div>
                <div className="mt-2 text-lg font-semibold">{s.title}</div>
                <div className="mt-2 text-muted-foreground">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="bg-muted/30 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {t('showcase.title')}
            </h2>
            <p className="mt-4 text-balance text-muted-foreground">
              {t('showcase.subtitle')}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {showcaseCards.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border bg-background p-4"
              >
                <div className="aspect-[9/16] w-full overflow-hidden rounded-xl border bg-muted" />
                <div className="mt-4 flex items-center justify-between">
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-sm text-muted-foreground">{c.meta}</div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {t('showcase.cardHint')}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" className="rounded-xl px-6">
              <LocaleLink href={primaryHref}>{t('showcase.cta')}</LocaleLink>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* Final CTA */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl rounded-3xl border bg-background p-10 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {t('final.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-muted-foreground">
            {t('final.subtitle')}
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="rounded-xl px-6">
              <LocaleLink href={primaryHref}>{t('final.cta')}</LocaleLink>
            </Button>
          </div>
        </div>
      </section>

      <CrispChat />
    </div>
  );
}
