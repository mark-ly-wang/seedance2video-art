import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import Image from 'next/image';

interface ToolkitShowcaseProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageAlt: string;
}

export default function ToolkitShowcase({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  imageAlt,
}: ToolkitShowcaseProps) {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="flex flex-col items-start text-left">
            <h2 className="text-balance font-bricolage-grotesque text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
              {title}
            </h2>

            {subtitle ? (
              <p className="mt-6 max-w-lg text-lg text-white/60 sm:text-xl">
                {subtitle}
              </p>
            ) : null}

            {ctaLabel && ctaHref ? (
              <div className="mt-8">
                <Button
                  asChild
                  className="group relative h-12 overflow-hidden rounded-full border border-[#FFD700]/40 bg-[#FFD700]/10 px-8 text-base font-medium text-[#FFD700] transition-all duration-300 hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-black hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                >
                  <LocaleLink href={ctaHref}>
                    <span className="relative z-10">{ctaLabel}</span>
                  </LocaleLink>
                </Button>
              </div>
            ) : null}
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="absolute -inset-4 rounded-[30px] bg-gradient-to-r from-[#FFD700]/10 to-transparent blur-2xl lg:-inset-8" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
              <Image
                src="/media/toolkit-showcase-grid-20260211.webp"
                alt={imageAlt}
                width={3840}
                height={1732}
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
