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
    <section className="overflow-x-clip px-6 pt-6 pb-10 sm:pt-8 sm:pb-12 lg:min-h-[100svh] lg:pt-0 lg:pb-2">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance font-bricolage-grotesque text-5xl leading-[0.96] tracking-tight sm:text-7xl">
            {title}
          </h2>

          {subtitle ? (
            <p className="mt-1.5 text-balance text-base text-foreground/82 sm:text-[1.12rem] sm:leading-[1.3]">
              {subtitle}
            </p>
          ) : null}

          {ctaLabel && ctaHref ? (
            <div className="mt-4 flex justify-center">
              <Button
                asChild
                className="h-[3.05rem] rounded-full border border-[#f4e07a]/70 bg-[linear-gradient(180deg,#fff0ad_0%,#ffe075_40%,#e2bc3a_100%)] px-11 text-[0.98rem] font-semibold text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(108,82,20,0.28),0_11px_22px_rgba(0,0,0,0.34)] hover:brightness-105"
              >
                <LocaleLink href={ctaHref}>{ctaLabel}</LocaleLink>
              </Button>
            </div>
          ) : null}
        </div>

        <div className="mx-auto mt-5 flex w-full justify-center lg:mt-3">
          <div className="relative left-1/2 w-full max-w-[96rem] -translate-x-1/2 lg:w-[150%] lg:max-w-none">
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
