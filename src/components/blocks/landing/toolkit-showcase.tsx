import Image from 'next/image';

interface ToolkitShowcaseProps {
  title: string;
  caption?: string;
}

export default function ToolkitShowcase({
  title,
  caption,
}: ToolkitShowcaseProps) {
  return (
    <section className="px-6 py-12 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm font-medium tracking-wide text-foreground/75">
          {title}
        </p>

        <div className="mt-6">
          <div className="mx-auto w-full max-w-[72rem] rounded-[28px] bg-gradient-to-b from-white/40 via-white/18 to-white/7 p-[1.5px] shadow-[0_16px_38px_rgba(0,0,0,0.5)]">
            <div className="overflow-hidden rounded-[26px] border border-white/15 bg-black/35">
              <Image
                src="/media/toolkit-showcase-ref.webp"
                alt="AI Toolkit showcase"
                width={1280}
                height={659}
                className="h-auto w-full object-cover"
                priority={false}
              />
            </div>
          </div>
          {caption ? (
            <p className="mt-3 text-center text-xs text-foreground/60">
              {caption}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
