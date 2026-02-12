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
    <section className="relative w-full bg-black py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <div className="flex max-w-xl flex-col items-start">
            <h2 className="font-bricolage-grotesque text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-5 text-lg leading-relaxed text-white/72 sm:text-xl">
                {subtitle}
              </p>
            )}

            {ctaLabel && ctaHref && (
              <div className="mt-8">
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-white/25 bg-black/20 px-8 text-base font-medium text-white hover:border-white hover:bg-white hover:text-black"
                >
                  <LocaleLink href={ctaHref}>{ctaLabel}</LocaleLink>
                </Button>
              </div>
            )}
          </div>

          <div className="relative w-full">
            <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#111]">
              <Image
                src="/media/toolkit-showcase-grid-20260211.webp"
                alt={imageAlt}
                width={3840}
                height={1732}
                className="h-auto w-full object-cover opacity-92"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
