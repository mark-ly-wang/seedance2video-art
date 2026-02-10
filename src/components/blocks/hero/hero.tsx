'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export type HeroSectionProps = {
  primaryHref: string;
  secondaryHref?: string;
};

export default function HeroSection({
  primaryHref,
  secondaryHref = '/#showcase',
}: HeroSectionProps) {
  const t = useTranslations('HomePage.hero');

  const models = t.raw('models') as unknown;
  const modelList = Array.isArray(models) ? (models as string[]) : [];

  return (
    <section className="relative min-h-[80svh] overflow-hidden bg-black sm:min-h-[100svh]">
      {/* Hero background video (no overlay). Keep inside the hero stacking context. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black"
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/hero-poster.jpg"
        >
          <source src="/media/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[80svh] max-w-7xl flex-col items-center justify-center px-6 pb-14 pt-14 text-center sm:min-h-[100svh] sm:pb-24 sm:pt-16">
        {/* Center pill announcement (not dismissible) */}
        <LocaleLink href={t('pill.href')}>
          <Badge
            variant="outline"
            className={cn(
              'mb-6 border-white/20 bg-white/10 px-4 py-1.5 text-white/90 backdrop-blur-md',
              'hover:bg-white/15'
            )}
          >
            <span className="mr-2">{t('pill.text')}</span>
            <span className="text-white/75">{t('pill.cta')}</span>
          </Badge>
        </LocaleLink>

        <h1 className="text-balance font-bricolage-grotesque text-5xl leading-[1.05] tracking-tight text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.55)] sm:text-6xl lg:text-7xl">
          {t('title')}
        </h1>

        <p className="mt-5 max-w-3xl text-balance text-lg text-white/85 drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]">
          {t('description')}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-full px-8">
            <LocaleLink href={primaryHref}>{t('primary')}</LocaleLink>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className={cn(
              'rounded-full px-8',
              'border-white/25 bg-white/5 text-white hover:bg-white/10'
            )}
          >
            <LocaleLink href={secondaryHref}>
              <span className="mr-2">{t('secondary')}</span>
              <ArrowRight className="size-4" />
            </LocaleLink>
          </Button>
        </div>

        {/* Model strip */}
        <div className="mt-12 w-full max-w-5xl">
          <div className="rounded-full border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/85">
              {modelList.map((name) => (
                <span key={name} className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-white/70" />
                  <span className="font-medium">{name}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 text-xs text-white/70 drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)]">
            {t('modelsHint')}
          </div>
        </div>
      </div>
    </section>
  );
}
