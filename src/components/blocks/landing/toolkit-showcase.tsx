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
    <section className="px-6 py-14 sm:py-18 lg:flex lg:min-h-[100svh] lg:items-center lg:py-6">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance font-bricolage-grotesque text-5xl leading-[0.96] tracking-tight sm:text-7xl">
            {title}
          </h2>

          {subtitle ? (
            <p className="mt-4 text-balance text-lg text-foreground/82 sm:text-[1.55rem] sm:leading-tight">
              {subtitle}
            </p>
          ) : null}

          {ctaLabel && ctaHref ? (
            <div className="mt-6 flex justify-center">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full border border-[#f4e07a]/50 bg-[linear-gradient(180deg,#ffe46f_0%,#e5ca46_100%)] px-10 text-lg font-semibold text-black shadow-[0_10px_28px_rgba(0,0,0,0.35)] hover:brightness-105"
              >
                <LocaleLink href={ctaHref}>{ctaLabel}</LocaleLink>
              </Button>
            </div>
          ) : null}
        </div>

        <div className="mx-auto mt-8 flex w-full justify-center lg:mt-6">
          <Image
            src="/media/toolkit-showcase-grid-20260211.webp"
            alt={imageAlt}
            width={3840}
            height={1732}
            className="h-auto w-full max-w-[96rem] object-contain lg:max-h-[56svh] lg:w-auto lg:max-w-full"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
