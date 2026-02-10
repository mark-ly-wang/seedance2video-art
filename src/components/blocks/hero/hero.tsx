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
    <main id="hero" className="overflow-hidden">
      {/* background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 isolate hidden opacity-70 contain-strict lg:block"
      >
        <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
      </div>

      <section>
        <div className="relative pt-16 sm:pt-20">
          <div className="mx-auto max-w-7xl px-6">
            <Ripple />

            <div className="text-center sm:mx-auto">
              {/* title */}
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="text-balance text-5xl font-bricolage-grotesque xl:text-[5rem]"
              >
                {t('title')}
              </TextEffect>

              {/* description */}
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.45}
                as="p"
                className="mx-auto mt-6 max-w-3xl text-balance text-lg text-muted-foreground"
              >
                {t('description')}
              </TextEffect>

              {/* action buttons */}
              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.65,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
                className="mt-10 flex flex-row items-center justify-center gap-4"
              >
                <div
                  key={1}
                  className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                >
                  <Button
                    asChild
                    size="lg"
                    className="rounded-xl px-6 text-base"
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
                  className="h-10.5 rounded-xl px-6"
                >
                  <LocaleLink href={secondaryHref}>
                    <span className="text-nowrap">{t('secondary')}</span>
                  </LocaleLink>
                </Button>
              </AnimatedGroup>
            </div>
          </div>

          {/* preview placeholder (avoid licensed screenshots) */}
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                  },
                },
              },
              ...transitionVariants,
            }}
          >
            <div className="relative mt-10 overflow-hidden px-2 sm:mt-14 md:mt-20">
              <div
                aria-hidden
                className="bg-linear-to-b to-muted/55 absolute inset-0 z-10 from-transparent from-35%"
              />

              <div className="inset-shadow-2xs ring-muted/50 dark:inset-shadow-white/20 bg-muted/40 relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/10 ring-1">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border bg-background">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_75%_35%,rgba(236,72,153,0.14),transparent_50%),radial-gradient(circle_at_55%_80%,rgba(34,197,94,0.10),transparent_55%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.05))] dark:bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.22))]" />

                  <div className="relative z-10 flex h-full flex-col justify-end p-6">
                    <div className="w-fit rounded-full border bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                      {t('previewBadge')}
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground">
                      {t('previewHint')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedGroup>
        </div>
      </section>
    </main>
  );
}
