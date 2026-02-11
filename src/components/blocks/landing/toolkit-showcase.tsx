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
    <section className="overflow-x-clip px-6 pt-8 pb-12 sm:pt-10 sm:pb-14 lg:min-h-[100svh] lg:pt-2 lg:pb-4">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance font-bricolage-grotesque text-5xl leading-[0.96] tracking-tight sm:text-7xl">
            {title}
          </h2>

          {subtitle ? (
            <p className="mt-2.5 text-balance text-base text-foreground/82 sm:text-[1.24rem] sm:leading-[1.35]">
              {subtitle}
            </p>
          ) : null}

          {ctaLabel && ctaHref ? (
            <div className="mt-5 flex justify-center">
              <Button
                asChild
                className="h-[3.35rem] rounded-full border border-[#f4e07a]/65 bg-[linear-gradient(180deg,#ffe98e_0%,#f9dd65_42%,#e2be3c_100%)] px-11 text-base font-semibold text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.62),0_12px_24px_rgba(0,0,0,0.34)] hover:brightness-105"
              >
                <LocaleLink href={ctaHref}>{ctaLabel}</LocaleLink>
              </Button>
            </div>
          ) : null}
        </div>

        <div className="mx-auto mt-6 flex w-full justify-center lg:mt-4">
          <div className="relative left-1/2 w-full max-w-[96rem] -translate-x-1/2 lg:w-[118%] lg:max-w-none">
            <Image
              src="/media/toolkit-showcase-grid-20260211.webp"
              alt={imageAlt}
              width={3840}
              height={1732}
              className="h-auto w-full object-contain"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
