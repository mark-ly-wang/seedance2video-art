'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export type HeroSectionProps = {
  primaryHref: string;
};

type ModelKey =
  | 'seedance'
  | 'sora'
  | 'veo'
  | 'nanobanana'
  | 'kling'
  | 'z-image'
  | 'seedream';

type ModelItem = {
  name: string;
  key: ModelKey;
};

const FALLBACK_MODELS = [
  'Seedance',
  'Sora',
  'Veo',
  'Kling',
  'Nano Banana',
  'Z-Image',
  'Seedream',
];

function swapKlingAndNanoBanana(items: ModelItem[]): ModelItem[] {
  const next = [...items];
  const klingIndex = next.findIndex((item) => item.key === 'kling');
  const nanoIndex = next.findIndex((item) => item.key === 'nanobanana');

  if (klingIndex === -1 || nanoIndex === -1) {
    return next;
  }

  [next[klingIndex], next[nanoIndex]] = [next[nanoIndex], next[klingIndex]];
  return next;
}

function toModelKey(name: string): ModelKey | null {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (normalized === 'seedance') {
    return 'seedance';
  }
  if (normalized === 'sora') {
    return 'sora';
  }
  if (normalized === 'veo') {
    return 'veo';
  }
  if (normalized === 'nanobanana') {
    return 'nanobanana';
  }
  if (normalized === 'kling') {
    return 'kling';
  }
  if (normalized === 'zimage') {
    return 'z-image';
  }
  if (normalized === 'seedream') {
    return 'seedream';
  }

  return null;
}

function SoraLogo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      className={cn('h-full w-auto text-white', className)}
    >
      <g clipPath="url(#sora-logo-clip)">
        <path
          d="M7.59767 7.31867V5.44599C7.59767 5.28803 7.6567 5.16996 7.79499 5.09124L11.5595 2.92338C12.0722 2.62766 12.6828 2.48991 13.3136 2.48991C15.6788 2.48991 17.177 4.32324 17.177 6.2741C17.177 6.41185 17.177 6.56981 17.1573 6.72724L13.2545 4.44078C13.0179 4.30302 12.7817 4.30302 12.545 4.44078L7.59767 7.31867ZM16.3883 14.6115V10.137C16.3883 9.86097 16.2697 9.66364 16.0335 9.52589L11.0861 6.648L12.7025 5.7215C12.8402 5.64278 12.9588 5.64278 13.0966 5.7215L16.8611 7.88936C17.945 8.52014 18.6742 9.86043 18.6742 11.1614C18.6742 12.6591 17.7876 14.0393 16.3877 14.6105L16.3883 14.6115ZM6.43449 10.6694L4.81817 9.72321C4.68041 9.6445 4.62085 9.52589 4.62085 9.36846V5.03221C4.62085 2.92338 6.23717 1.32673 8.42524 1.32673C9.25335 1.32673 10.0219 1.60277 10.6724 2.09527L6.78924 4.34238C6.55256 4.48013 6.43449 4.67745 6.43449 4.95349V10.6694ZM9.91339 12.6798L7.59714 11.3789V8.6196L9.91339 7.31867L12.2291 8.6196V11.3789L9.91339 12.6798ZM11.4015 18.6718C10.5734 18.6718 9.80489 18.3957 9.15442 17.9032L13.0375 15.6561C13.2742 15.5184 13.3923 15.321 13.3923 15.045V9.3291L15.0283 10.2753C15.166 10.354 15.2251 10.4726 15.2251 10.63V14.9663C15.2251 17.0751 13.5891 18.6718 11.4015 18.6718ZM6.7302 14.2765L2.9657 12.1086C1.88176 11.4778 1.15258 10.1375 1.15258 8.8366C1.15258 7.31867 2.05941 5.95871 3.45873 5.38749V9.88118C3.45873 10.1572 3.5768 10.3545 3.81348 10.4923L8.74117 13.35L7.12484 14.2765C6.98709 14.3552 6.86796 14.3552 6.7302 14.2765ZM6.5132 17.5091C4.28577 17.5091 2.64977 15.8338 2.64977 13.7643C2.64977 13.6069 2.66945 13.4489 2.68913 13.2915L6.57224 15.5386C6.80892 15.6763 7.0456 15.6763 7.28174 15.5386L12.2291 12.6809V14.5536C12.2291 14.711 12.1701 14.8296 12.0318 14.9083L8.26728 17.0767C7.75457 17.3724 7.14399 17.5102 6.5132 17.5102V17.5091ZM11.4015 19.8546C13.7864 19.8546 15.7771 18.1596 16.2308 15.9125C18.438 15.3407 19.8576 13.2713 19.8576 11.1624C19.8576 9.78278 19.2662 8.44249 18.2019 7.47663C18.3003 7.06285 18.3599 6.64853 18.3599 6.23474C18.3599 3.41641 16.0734 1.30706 13.4322 1.30706C12.9003 1.30706 12.3876 1.38577 11.8749 1.56341C10.9877 0.695948 9.76553 0.144409 8.42577 0.144409C6.04091 0.144409 4.05016 1.83945 3.59648 4.08656C1.38873 4.65831 -0.0302734 6.72778 -0.0302734 8.8366C-0.0302734 10.2162 0.561155 11.5565 1.62541 12.5224C1.52701 12.9362 1.46745 13.3505 1.46745 13.7643C1.46745 16.5826 3.75391 18.692 6.39513 18.692C6.92699 18.692 7.43971 18.6133 7.95242 18.4356C8.83956 19.3031 10.0612 19.8546 11.4015 19.8546Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="sora-logo-clip">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className={cn('h-full w-auto text-white', className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.849469 11.4677C0.309542 10.4023 0 9.20011 0 7.91873C0 6.63732 0.309542 5.43513 0.849469 4.36969C2.15244 1.77813 4.82322 0 7.91873 0C10.0568 0 11.8421 0.784666 13.2171 2.06608L10.9494 4.33371C10.1216 3.55622 9.08492 3.15308 7.91873 3.15308C5.85986 3.15308 4.11053 4.54247 3.48424 6.41417C3.32587 6.8893 3.23226 7.39319 3.23226 7.91873C3.23226 8.44424 3.32587 8.94817 3.48424 9.42329L3.47487 9.43047H3.48424C4.11053 11.3022 5.85986 12.6916 7.91873 12.6916C8.98414 12.6916 9.884 12.4036 10.5895 11.9285C11.4318 11.367 11.9933 10.5319 12.1804 9.54566H7.91873V6.47894H15.3767C15.4703 6.99728 15.5207 7.53718 15.5207 8.0987C15.5207 10.5103 14.6568 12.5404 13.1595 13.9226C11.8493 15.132 10.0568 15.8374 7.91873 15.8374C4.82322 15.8374 2.15244 14.0593 0.849469 11.475V11.4677Z"
        fill="currentColor"
      />
    </svg>
  );
}

function KlingLogo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      className={cn('h-full w-auto text-white', className)}
    >
      <path
        d="M9.39506 0.0269398C9.8995 -0.000516998 10.19 -0.00498672 10.6302 0.00459125C12.8646 0.105479 16.0591 1.41702 17.4155 3.23492C18.7739 5.05473 17.3416 8.25569 16.207 9.90885L20 13.6628C17.4162 19.0622 10.6516 21.7134 5.13843 18.7991C4.28775 18.3496 2.81657 17.3318 2.3627 16.4979C1.32205 14.5842 2.72126 11.7797 3.75024 10.1081L0 6.43843V6.24751C0.560851 4.67417 1.83816 3.26876 3.18161 2.25031C4.91733 0.934293 7.02003 0.207644 9.39506 0.0269398ZM14.5763 2.23753C14.3053 2.19411 14.0971 1.99362 13.8631 1.88762C9.86903 0.0748297 5.09693 1.36275 2.33418 4.62564C2.1442 4.84977 1.25008 6.0004 1.30519 6.20154L4.50302 9.36546C6.68547 6.55528 9.84439 3.57526 13.3774 2.55425C13.7418 2.44889 14.1043 2.42399 14.4492 2.33331C14.5095 2.31735 14.5951 2.31735 14.5763 2.23753ZM15.484 9.42995C16.9734 7.52393 18.6922 2.65322 14.4875 3.00888C13.1116 3.12509 11.6916 3.91304 10.5265 4.5918C10.437 4.72142 10.6367 4.62436 10.6802 4.61543C14.0537 3.91432 16.205 6.15875 15.484 9.42995ZM11.6482 5.1205C8.63256 5.26928 5.53459 8.17524 5.071 11.0703C4.58406 14.1104 6.88063 15.5062 9.70369 14.6678C12.4107 13.8639 15.176 10.7638 14.9569 7.87832C14.8207 6.08468 13.4364 5.03239 11.6482 5.1205ZM9.39376 15.4143C7.73196 15.7667 6.00337 15.4934 4.98671 14.0465C4.2871 13.0511 4.31045 12.0013 4.46152 10.8539C4.46735 10.8073 4.51663 10.578 4.40511 10.6706C3.43578 12.0696 1.75452 15.7067 3.82092 16.7833C5.40491 17.6083 8.05421 16.3574 9.39376 15.4143ZM5.37703 17.706C6.08247 18.2008 7.04921 18.5629 7.90313 18.7557C12.1377 19.7109 16.6719 17.5578 18.7045 13.8531L15.4529 10.7032C14.101 12.5089 12.4425 14.1647 10.5797 15.4653C9.0767 16.5151 7.23595 17.531 5.37703 17.706Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ByteDanceLogo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 18 16"
      fill="none"
      className={cn('h-full w-auto text-white', className)}
    >
      <path
        d="M3.06965 14.0137L6.10352e-05 14.803V0.817383L3.06965 1.6067V14.0137Z"
        fill="currentColor"
      />
      <path
        d="M17.8982 14.8334L14.8228 15.6228V0L17.8982 0.783475V14.8334Z"
        fill="currentColor"
      />
      <path
        d="M7.94179 14.4414L4.87219 15.2308V6.99255L7.94179 7.78184V14.4414Z"
        fill="currentColor"
      />
      <path
        d="M9.94312 5.77012L13.0185 4.98077V13.219L9.94312 12.4296V5.77012Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ZImageLogo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      fill="none"
      className={cn('h-full w-auto text-white', className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.0525 1L4.9635 2.4765H0.3265L1.415 1H6.053H6.0525ZM11.627 9.524L10.539 11H5.918L7.005 9.524H11.627ZM12 1L4.632 11H0L7.368 1H12Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ModelLogo({
  model,
  className,
}: {
  model: ModelKey;
  className?: string;
}) {
  if (model === 'seedance' || model === 'seedream') {
    return <ByteDanceLogo className={className} />;
  }
  if (model === 'veo' || model === 'nanobanana') {
    return <GoogleLogo className={className} />;
  }
  if (model === 'sora') {
    return <SoraLogo className={className} />;
  }
  if (model === 'kling') {
    return <KlingLogo className={className} />;
  }

  return <ZImageLogo className={className} />;
}

export default function HeroSection({ primaryHref }: HeroSectionProps) {
  const t = useTranslations('HomePage.hero');
  const [videoReady, setVideoReady] = useState(false);
  const posterSrc = '/media/hero-poster.jpg';
  const rawModels = t.raw('models');
  const parsedModels = Array.isArray(rawModels)
    ? rawModels.filter((item): item is string => typeof item === 'string')
    : [];

  const fallbackItems: ModelItem[] = FALLBACK_MODELS.map((name) => ({
    name,
    key: toModelKey(name) as ModelKey,
  }));

  const currentItems: ModelItem[] = parsedModels
    .map((name) => {
      const key = toModelKey(name);
      if (!key) {
        return null;
      }
      return { name, key };
    })
    .filter((item): item is ModelItem => item !== null);

  const modelItems = swapKlingAndNanoBanana(
    currentItems.length === 7 ? currentItems : fallbackItems
  );
  const mobileTopRow = modelItems.slice(0, 4);
  const mobileBottomRow = modelItems.slice(4);

  return (
    <section className="relative min-h-[78svh] overflow-hidden bg-black text-white md:min-h-[100svh]">
      <div className="absolute inset-0 z-0 hidden md:block">
        <div
          className={cn(
            'absolute inset-0 bg-cover bg-center transition-opacity duration-700',
            videoReady ? 'opacity-0' : 'opacity-100'
          )}
          style={{ backgroundImage: `url(${posterSrc})` }}
        />
        <div className="absolute inset-0 z-10 bg-black/34" />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-1000',
            videoReady ? 'opacity-100' : 'opacity-0'
          )}
        >
          <source src="/media/hero-bg.webm" type="video/webm" />
          <source src="/media/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-x-0 bottom-0 z-20 h-44 bg-gradient-to-t from-black via-black/65 to-transparent" />
      </div>

      <div className="relative md:hidden">
        {/* Video container: full width, ~1:1 aspect, extends under header */}
        <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
          <div
            className={cn(
              'absolute inset-0 bg-cover bg-center transition-opacity duration-700',
              videoReady ? 'opacity-0' : 'opacity-100'
            )}
            style={{ backgroundImage: `url(${posterSrc})` }}
          />
          <div className="absolute inset-0 z-10 bg-black/34" />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={posterSrc}
            onLoadedData={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000',
              videoReady ? 'opacity-100' : 'opacity-0'
            )}
          >
            <source src="/media/hero-bg-mobile.webm" type="video/webm" />
            <source src="/media/hero-bg-mobile.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-black via-black/70 to-transparent" />

          {/* Pill badge at top of video */}
          <div className="absolute inset-x-0 top-20 z-30 flex justify-center">
            <LocaleLink href={t('pill.href')}>
              <Badge
                variant="outline"
                className="border-white/25 bg-black/35 px-3 py-1 text-xs font-medium text-white/92 backdrop-blur-md hover:bg-black/45"
              >
                <span className="mr-1.5 opacity-85">{t('pill.text')}</span>
                <span className="font-semibold text-primary">
                  {t('pill.cta')}
                </span>
              </Badge>
            </LocaleLink>
          </div>
        </div>

        {/* Content - title overlaps video bottom edge, then CTA, capsule, description */}
        <div className="relative z-30 -mt-6 px-5 pb-8">
          <h1 className="mx-auto max-w-[14ch] text-balance text-center font-bricolage-grotesque text-[2.5rem] font-bold leading-[0.96] tracking-tight text-white">
            {t('title')}
          </h1>

          <Button
            asChild
            size="lg"
            className="group relative mt-5 h-12 w-full overflow-hidden rounded-full border border-white/30 bg-primary/88 text-base font-semibold text-primary-foreground shadow-lg backdrop-blur-xl supports-[backdrop-filter]:bg-primary/75 transition-all duration-300 hover:scale-[1.01] hover:bg-primary/95 hover:shadow-xl active:scale-[0.99]"
          >
            <LocaleLink href={primaryHref}>
              <span className="relative z-10">{t('primary')}</span>
              <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white/32 to-transparent opacity-100" />
            </LocaleLink>
          </Button>

          {/* Mobile Capsule - transparent interior */}
          <div className="mt-6 w-full rounded-[20px] border border-white/25 p-[1px]">
            <div className="relative rounded-[18px] border border-white/12 px-3 py-3.5 backdrop-blur-[2px]">
              <div className="pointer-events-none absolute inset-x-6 top-0 h-6 rounded-full bg-gradient-to-b from-white/20 to-transparent" />

              <div className="relative space-y-2.5">
                <div className="flex items-center justify-center gap-3">
                  {mobileTopRow.map((item) => (
                    <span
                      key={item.key}
                      className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-white/90"
                    >
                      <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center">
                        <ModelLogo model={item.key} />
                      </span>
                      <span className="truncate text-[11px] font-medium leading-none">
                        {item.name}
                      </span>
                    </span>
                  ))}
                </div>

                <div className="mx-auto flex items-center justify-center gap-3">
                  {mobileBottomRow.map((item) => (
                    <span
                      key={item.key}
                      className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-white/90"
                    >
                      <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center">
                        <ModelLogo model={item.key} />
                      </span>
                      <span className="truncate text-[11px] font-medium leading-none">
                        {item.name}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-5 max-w-[22rem] text-balance text-center text-[14px] leading-relaxed text-white/75">
            {t('description')}
          </p>
        </div>
      </div>

      <div className="relative z-30 mx-auto hidden min-h-[100svh] w-full max-w-[1600px] flex-col px-8 pb-10 pt-28 md:flex">
        <div className="mx-auto flex w-full max-w-[1360px] flex-1 flex-col items-center justify-center text-center">
          <LocaleLink href={t('pill.href')}>
            <Badge
              variant="outline"
              className="border-white/25 bg-black/35 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-md hover:bg-black/45"
            >
              <span className="mr-2 opacity-85">{t('pill.text')}</span>
              <span className="font-semibold text-primary">
                {t('pill.cta')}
              </span>
            </Badge>
          </LocaleLink>

          <h1 className="mt-6 whitespace-nowrap font-bricolage-grotesque text-[clamp(2.9rem,4.8vw,4.8rem)] font-bold leading-[0.94] tracking-tight text-white">
            {t('title')}
          </h1>

          <p className="mt-5 max-w-3xl text-balance text-[clamp(1.05rem,1.35vw,1.45rem)] leading-[1.3] text-white/82">
            {t('description')}
          </p>

          <Button
            asChild
            size="lg"
            className="group relative mt-9 h-[52px] overflow-hidden rounded-full border border-white/30 bg-primary/88 px-10 text-[1.25rem] font-semibold text-primary-foreground shadow-lg backdrop-blur-xl supports-[backdrop-filter]:bg-primary/75 transition-all duration-300 hover:scale-[1.01] hover:bg-primary/95 hover:shadow-xl active:scale-[0.99]"
          >
            <LocaleLink href={primaryHref}>
              <span className="relative z-10">{t('primary')}</span>
              <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white/32 to-transparent opacity-100" />
            </LocaleLink>
          </Button>
        </div>

        <div className="mx-auto w-full max-w-[980px]">
          <div className="relative rounded-full border border-white/25 p-[1px]">
            <div className="relative rounded-full border border-white/12 px-6 py-3.5 backdrop-blur-[2px]">
              <div className="pointer-events-none absolute inset-x-10 top-0 h-8 rounded-full bg-gradient-to-b from-white/30 to-transparent" />

              <div className="relative flex items-center justify-center gap-6">
                {modelItems.map((item) => (
                  <span
                    key={item.key}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-[0.98rem] text-white/95"
                  >
                    <span className="inline-flex h-[18px] w-[18px] items-center justify-center text-white/95">
                      <ModelLogo model={item.key} />
                    </span>
                    <span className="font-medium tracking-[0.01em]">
                      {item.name}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
