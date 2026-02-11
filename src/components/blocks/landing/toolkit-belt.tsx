interface ToolkitBeltProps {
  title: string;
  items: string[];
}

export default function ToolkitBelt({ title, items }: ToolkitBeltProps) {
  return (
    <section className="px-6 py-12 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm font-medium tracking-wide text-foreground/75">
          {title}
        </p>

        <div className="mt-6">
          <div className="mx-auto w-full max-w-[68rem] rounded-full bg-gradient-to-b from-white/45 via-white/20 to-white/8 p-[1.5px] shadow-[0_14px_34px_rgba(0,0,0,0.45)]">
            <div className="rounded-full border border-white/15 bg-transparent">
              {/* Desktop belt */}
              <div className="hidden items-center justify-center gap-3 px-6 py-3.5 sm:flex">
                {items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-white/90"
                  >
                    <span className="size-1.5 rounded-full bg-white/75" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>

              {/* Mobile belt */}
              <div className="overflow-x-auto px-3 py-3 sm:hidden">
                <div className="inline-flex min-w-max items-center gap-3 pr-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.03] px-3.5 text-sm text-white/90"
                    >
                      <span className="size-1.5 rounded-full bg-white/75" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
