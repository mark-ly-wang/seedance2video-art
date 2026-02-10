import { Ripple } from '@/components/magicui/ripple';
import { AnimatedGroup } from '@/components/tailark/motion/animated-group';
import { TextEffect } from '@/components/tailark/motion/text-effect';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      y: 12,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        bounce: 0.22,
        duration: 1.2,
      },
    },
  },
};

export type HeroSectionProps = {
  primaryHref: string;
  secondaryHref?: string;
};

export default function HeroSection({
  primaryHref,
  secondaryHref = '/#showcase',
}: HeroSectionProps) {
  const t = useTranslations('HomePage.hero');

  return (
    <main id="hero" className="relative overflow-hidden">
      {/* Artlist-like soft background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.12),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.10),transparent_40%),radial-gradient(circle_at_55%_85%,rgba(34,197,94,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.65),transparent_40%,rgba(255,255,255,0.6))] dark:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),transparent_40%,rgba(0,0,0,0.45))]" />
      </div>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-16 sm:pt-20 lg:pt-24">
          <Ripple />

          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left: copy */}
            <div className="lg:col-span-6">
              <AnimatedGroup variants={transitionVariants}>
                <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                  {t('previewBadge')}
                </div>
              </AnimatedGroup>

              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="mt-5 text-balance text-5xl font-bricolage-grotesque leading-[1.05] tracking-tight md:text-6xl"
              >
                {t('title')}
              </TextEffect>

              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.35}
                as="p"
                className="mt-5 max-w-2xl text-balance text-lg text-muted-foreground"
              >
                {t('description')}
              </TextEffect>

              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.55,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
                className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
              >
                <div
                  key={1}
                  className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                >
                  <Button
                    asChild
                    size="lg"
                    className="w-full rounded-xl px-6 text-base sm:w-auto"
                  >
                    <LocaleLink href={primaryHref}>
                      <span className="text-nowrap">{t('primary')}</span>
                    </LocaleLink>
                  </Button>
                </div>

                <Button
                  key={2}
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-xl px-6"
                >
                  <LocaleLink href={secondaryHref}>
                    <span className="text-nowrap">{t('secondary')}</span>
                  </LocaleLink>
                </Button>
              </AnimatedGroup>

              <div className="mt-6 text-sm text-muted-foreground">
                {t('previewHint')}
              </div>
            </div>

            {/* Right: product preview placeholder */}
            <div className="lg:col-span-6">
              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.6,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
              >
                <div className="relative overflow-hidden rounded-3xl border bg-background/60 p-4 shadow-sm backdrop-blur">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.12),transparent_45%),radial-gradient(circle_at_75%_35%,rgba(236,72,153,0.10),transparent_50%),radial-gradient(circle_at_55%_80%,rgba(34,197,94,0.08),transparent_55%)]" />

                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border bg-muted/40">
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.06))] dark:bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.22))]" />
                    <div className="absolute left-4 top-4 rounded-full border bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                      {t('previewBadge')}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="grid gap-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between rounded-xl border bg-background/70 px-4 py-3 text-sm backdrop-blur"
                          >
                            <span className="text-muted-foreground">
                              {t('previewShotLabel', { index: i })}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {t('previewShotStatus')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedGroup>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-10 sm:h-14 lg:h-18" />
      </section>
    </main>
  );
}
