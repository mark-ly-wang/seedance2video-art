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
    <section id="toolkit" className="relative w-full bg-black py-10 sm:py-14">
      <div className="mx-auto max-w-[1536px] px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-bricolage-grotesque text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/72 sm:mt-2 sm:text-xl">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative mx-auto mt-5 w-full max-w-[1536px] md:mt-0">
          {ctaLabel && ctaHref && (
            <>
              <div className="mb-6 md:hidden">
                <Button
                  asChild
                  size="lg"
                  className="group relative h-12 w-full overflow-hidden rounded-full border border-white/20 bg-gradient-to-br from-[#FFD700] via-[#F4DC6A] to-[#FFD700] px-10 text-base font-semibold text-black/90 shadow-[0_0_20px_rgba(255,215,0,0.3)] backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-[#ffe033] hover:via-[#ffeb85] hover:to-[#ffe033] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]"
                >
                  <LocaleLink href={ctaHref}>
                    <span className="relative z-10">{ctaLabel}</span>
                    <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white/40 to-transparent opacity-100" />
                  </LocaleLink>
                </Button>
              </div>

              <div className="absolute left-1/2 top-6 z-10 hidden -translate-x-1/2 md:block">
                <Button
                  asChild
                  size="lg"
                  className="group relative h-12 overflow-hidden rounded-full border border-white/20 bg-gradient-to-br from-[#FFD700] via-[#F4DC6A] to-[#FFD700] px-10 text-base font-semibold text-black/90 shadow-[0_0_20px_rgba(255,215,0,0.3)] backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-[#ffe033] hover:via-[#ffeb85] hover:to-[#ffe033] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]"
                >
                  <LocaleLink href={ctaHref}>
                    <span className="relative z-10">{ctaLabel}</span>
                    <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white/40 to-transparent opacity-100" />
                  </LocaleLink>
                </Button>
              </div>
            </>
          )}

          <div className="hidden w-full md:block">
            <Image
              src="/media/toolkit-showcase-grid-20260211.webp"
              alt={imageAlt}
              width={3840}
              height={1732}
              className="h-auto w-full object-cover"
              sizes="(min-width: 768px) 1300px, 100vw"
              priority
            />
          </div>

          <div className="block w-full md:hidden">
            <Image
              src="/media/ai-toolkit-image_390.webp"
              alt={imageAlt}
              width={780}
              height={900}
              className="h-auto w-full object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
