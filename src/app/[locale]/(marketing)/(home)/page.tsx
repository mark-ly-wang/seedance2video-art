import HeroSection from '@/components/blocks/hero/hero';
import FaqSection from '@/components/blocks/faqs/faqs';
import CrispChat from '@/components/layout/crisp-chat';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { getSession } from '@/lib/server';
import { constructMetadata } from '@/lib/metadata';
import { Routes } from '@/routes';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

/**
 * https://next-intl.dev/docs/environments/actions-metadata-route-handlers#metadata-api
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    pathname: '',
  });
}

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage(props: HomePageProps) {
  const { locale } = await props.params;
  const session = await getSession();

  const primaryHref = session?.user ? Routes.Dashboard : Routes.Login;

  return (
    <div className="flex flex-col">
      <HeroSection primaryHref={primaryHref} secondaryHref={Routes.Features} />

      {/* Trust strip (avoid using unlicensed logos) */}
      <section className="px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-3xl border bg-muted/30 px-6 py-10 text-center">
          <p className="text-sm text-muted-foreground">
            面向电商广告与接单交付的短视频生成
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['电商广告', '口播转广告', '品牌短片', '教育课程'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border bg-background/70 px-3 py-1 text-sm text-foreground/90"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section id="features" className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              AI 视频最大的问题不是画质，是不可控。
            </h2>
            <p className="mt-4 text-balance text-muted-foreground">
              很多人做视频靠抽卡：分镜没导演感，人物与场景容易漂移，返工成本高，难以稳定商用。
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                title: '抽卡成本高',
                desc: '同一句话反复试，时间与预算被随机性吃掉。',
              },
              {
                title: '分镜缺乏导演感',
                desc: '镜头节奏乱，卖点讲不清，只像片段拼接。',
              },
              {
                title: '人物一致性差',
                desc: '换脸/换衣/气质漂移，导致反复重做。',
              },
              {
                title: '场景一致性差',
                desc: '光照、色调、质感飘，做不成“像广告”的成片。',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border bg-background p-6 shadow-sm"
              >
                <div className="text-lg font-semibold">{item.title}</div>
                <div className="mt-2 text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-muted/30 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              把“抽卡生成”，变成可控迭代。
            </h2>
            <p className="mt-4 text-balance text-muted-foreground">
              我们不承诺 100%
              不漂移，但会通过多镜头叙事与一致性机制，显著减少返工，让结果更可交付。
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  title: '多镜头叙事更稳',
                  desc: '从片段到成片：镜头有节奏，结构更清晰。',
                },
                {
                  title: '人物与场景更一致',
                  desc: '跨镜头保持主体与风格更连贯，减少“每镜重生”。',
                },
                {
                  title: '支持局部重做',
                  desc: '不满意就重做某些镜头/片段，不必推倒重来。',
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border bg-background p-5"
                >
                  <div className="font-semibold">{f.title}</div>
                  <div className="mt-1 text-muted-foreground">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* visual placeholder */}
          <div className="relative overflow-hidden rounded-3xl border bg-background p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.16),transparent_55%),radial-gradient(circle_at_85%_30%,rgba(236,72,153,0.12),transparent_55%),radial-gradient(circle_at_55%_85%,rgba(34,197,94,0.10),transparent_60%)]" />
            <div className="relative">
              <div className="text-sm font-medium text-muted-foreground">
                示例：同一脚本，多镜头成片
              </div>
              <div className="mt-4 grid gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border bg-background/80 px-4 py-3 backdrop-blur"
                  >
                    <span className="text-sm">镜头 {i}</span>
                    <span className="text-xs text-muted-foreground">
                      可重做
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              三步，从想法到可交付视频
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: '输入',
                desc: '一句话/脚本，或上传首帧图。',
              },
              {
                title: '生成',
                desc: '得到多镜头成片；不满意可局部重做。',
              },
              {
                title: '导出',
                desc: '直接用于投放素材或交片交付。',
              },
            ].map((s, idx) => (
              <div
                key={s.title}
                className="rounded-2xl border bg-background p-6"
              >
                <div className="text-sm text-muted-foreground">
                  Step {idx + 1}
                </div>
                <div className="mt-2 text-lg font-semibold">{s.title}</div>
                <div className="mt-2 text-muted-foreground">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="bg-muted/30 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              看结果，不看参数
            </h2>
            <p className="mt-4 text-balance text-muted-foreground">
              用同一套卖点/脚本，快速生成多版本，方便测试与迭代。
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { title: '电商上新', meta: '10 镜头 · 15s' },
              { title: '促销活动', meta: '12 镜头 · 30s' },
              { title: '口播转广告', meta: '8 镜头 · 15s' },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border bg-background p-4"
              >
                <div className="aspect-[9/16] w-full overflow-hidden rounded-xl border bg-muted" />
                <div className="mt-4 flex items-center justify-between">
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-sm text-muted-foreground">{c.meta}</div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  支持局部重做与版本对比
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" className="rounded-xl px-6">
              <LocaleLink href={primaryHref}>免费开始生成</LocaleLink>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* Final CTA */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl rounded-3xl border bg-background p-10 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            现在开始，生成一条可交付的视频
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-muted-foreground">
            面向商用交付：多镜头叙事更稳，人物与场景更一致，返工更少。
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="rounded-xl px-6">
              <LocaleLink href={primaryHref}>免费开始生成</LocaleLink>
            </Button>
          </div>
        </div>
      </section>

      <CrispChat />
    </div>
  );
}
