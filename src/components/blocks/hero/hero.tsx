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
    <section className="relative overflow-hidden bg-black sm:min-h-[100svh]">
      {/* Hero background video (no overlay). Keep inside the hero stacking context. */}
      <div className="relative z-0 aspect-video w-full overflow-hidden bg-black sm:absolute sm:inset-0 sm:aspect-auto">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/70 to-transparent sm:hidden"
        />
        <video
          aria-hidden
          className="pointer-events-none h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/hero-poster.jpg"
        >
          <source src="/media/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Mobile pill pinned to the video */}
        <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center px-6 sm:hidden">
          <LocaleLink href={t('pill.href')}>
            <Badge
              variant="outline"
              className={cn(
                'border-white/20 bg-white/10 px-4 py-1.5 text-white/90 backdrop-blur-md',
                'hover:bg-white/15'
              )}
            >
              <span className="mr-2">{t('pill.text')}</span>
              <span className="text-white/75">{t('pill.cta')}</span>
            </Badge>
          </LocaleLink>
        </div>
      </div>

      {/* Mobile content: keep 16:9 video + 6px title overlap rule */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pb-14 pt-0 text-center sm:hidden">
        <h1 className="text-balance font-bricolage-grotesque -mt-1.5 text-4xl leading-[1.05] tracking-tight text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.55)]">
          {t('title')}
        </h1>

        <p className="mt-6 max-w-4xl text-balance text-base text-white/85 drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]">
          {t('description')}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full px-9 text-base font-semibold shadow-[0_10px_35px_rgba(0,0,0,0.35)]"
          >
            <LocaleLink href={primaryHref}>{t('primary')}</LocaleLink>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className={cn(
              'h-12 rounded-full px-9 text-base',
              'border-white/25 bg-white/5 text-white hover:bg-white/10'
            )}
          >
            <LocaleLink href={secondaryHref}>
              <span className="mr-2">{t('secondary')}</span>
              <ArrowRight className="size-4" />
            </LocaleLink>
          </Button>
        </div>

        <div className="mt-14 w-full max-w-[46rem]">
          <div className="rounded-full bg-gradient-to-b from-white/45 via-white/22 to-white/8 p-[1.5px] shadow-[0_14px_34px_rgba(0,0,0,0.45)]">
            <div className="rounded-full border border-white/15 bg-transparent px-5 py-3">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/90">
                {modelList.map((name) => (
                  <span key={name} className="inline-flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-white/75" />
                    <span className="font-medium">{name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-white/70 drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)]">
            {t('modelsHint')}
          </div>
        </div>
      </div>

      {/* Desktop content: ratio-locked layout to match reference rhythm */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        <div className="pointer-events-auto absolute inset-x-0 top-[31svh] -translate-y-1/2 px-6 text-center">
          <LocaleLink href={t('pill.href')} className="inline-flex">
            <Badge
              variant="outline"
              className={cn(
                'border-white/20 bg-white/10 px-5 py-2 text-white/90 backdrop-blur-md',
                'hover:bg-white/15'
              )}
            >
              <span className="mr-2">{t('pill.text')}</span>
              <span className="text-white/75">{t('pill.cta')}</span>
            </Badge>
          </LocaleLink>
        </div>

        <div className="absolute inset-x-0 top-[40svh] -translate-y-1/2 px-6 text-center">
          <h1 className="mx-auto max-w-6xl text-balance font-bricolage-grotesque text-6xl leading-[1.04] tracking-tight text-white drop-shadow-[0_10px_36px_rgba(0,0,0,0.58)] lg:text-7xl">
            {t('title')}
          </h1>
        </div>

        <div className="absolute inset-x-0 top-[53svh] -translate-y-1/2 px-6 text-center">
          <p className="mx-auto max-w-4xl text-balance text-xl text-white/85 drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]">
            {t('description')}
          </p>
        </div>

        <div className="pointer-events-auto absolute inset-x-0 top-[63svh] -translate-y-1/2 px-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full px-9 text-base font-semibold shadow-[0_10px_35px_rgba(0,0,0,0.35)]"
            >
              <LocaleLink href={primaryHref}>{t('primary')}</LocaleLink>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className={cn(
                'h-12 rounded-full px-9 text-base',
                'border-white/25 bg-white/5 text-white hover:bg-white/10'
              )}
            >
              <LocaleLink href={secondaryHref}>
                <span className="mr-2">{t('secondary')}</span>
                <ArrowRight className="size-4" />
              </LocaleLink>
            </Button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-[7svh] px-6">
          <div className="mx-auto w-full max-w-[46rem]">
            <div className="rounded-full bg-gradient-to-b from-white/45 via-white/22 to-white/8 p-[1.5px] shadow-[0_14px_34px_rgba(0,0,0,0.45)]">
              <div className="rounded-full border border-white/15 bg-transparent px-6 py-3.5">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-base text-white/90">
                  {modelList.map((name) => (
                    <span key={name} className="inline-flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-white/75" />
                      <span className="font-medium">{name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
