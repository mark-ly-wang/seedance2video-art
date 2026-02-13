'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { Routes } from '@/routes';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const STOCK_ITEMS = [
  {
    key: 'music',
    image: '/media/artlist-home/music.jpg',
    titleKey: 'catalog.items.music.title',
    hrefKey: 'catalog.items.music.href',
  },
  {
    key: 'sfx',
    image: '/media/artlist-home/sfx.jpg',
    titleKey: 'catalog.items.sfx.title',
    hrefKey: 'catalog.items.sfx.href',
  },
  {
    key: 'footage',
    image: '/media/artlist-home/footage.jpg',
    titleKey: 'catalog.items.footage.title',
    hrefKey: 'catalog.items.footage.href',
  },
  {
    key: 'templates',
    image: '/media/artlist-home/templates.jpg',
    titleKey: 'catalog.items.templates.title',
    hrefKey: 'catalog.items.templates.href',
  },
] as const;

const CREATOR_POINT_KEYS = [
  'creators.points.point-1',
  'creators.points.point-2',
  'creators.points.point-3',
] as const;

const FAQ_IDS = [
  'item-1',
  'item-2',
  'item-3',
  'item-4',
  'item-5',
  'item-6',
  'item-7',
  'item-8',
  'item-9',
] as const;

export default function ArtlistFollowingSections() {
  const t = useTranslations('HomePage.landing.artlist');

  return (
    <>
      <section className="relative overflow-hidden bg-black px-7 py-24 sm:py-28 lg:py-32">
        <Image
          src="/media/artlist-home/why-artlist-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/43" />
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/85 via-black/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-5 px-2 md:flex-row md:items-center md:justify-between md:gap-8 lg:px-8">
          <h2 className="whitespace-pre-line font-serif text-[2.55rem] font-light leading-[0.9] tracking-[-0.025em] text-white sm:text-[3.35rem] lg:text-[4.35rem]">
            {t('creators.title')}
          </h2>

          <div className="space-y-4 lg:space-y-5">
            {CREATOR_POINT_KEYS.map((pointKey) => (
              <div
                key={pointKey}
                className="flex items-center gap-2.5 text-white lg:gap-3.5"
              >
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/70 text-[10px] leading-none lg:h-5 lg:w-5 lg:text-xs">
                  ✓
                </span>
                <p className="text-base leading-[1.1] tracking-[-0.02em] sm:text-lg lg:text-[1.35rem]">
                  {t(pointKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-7 py-24 sm:py-28 lg:py-32">
        <div className="mx-auto w-full max-w-[1536px]">
          <h2 className="mx-auto max-w-[700px] whitespace-pre-line text-center font-serif text-[2.85rem] font-light leading-[0.88] tracking-[-0.03em] text-white sm:text-[3.8rem] lg:text-[5.25rem]">
            {t('catalog.title')}
          </h2>

          <div className="mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:hidden">
            {STOCK_ITEMS.map((item) => (
              <a
                key={item.key}
                href={t(item.hrefKey)}
                className="group relative block min-w-[78vw] flex-shrink-0 snap-start overflow-hidden rounded-[1rem] bg-[#171717] sm:min-w-[48vw]"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={item.image}
                    alt={t(item.titleKey)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 640px) 48vw, 78vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 lg:px-7 lg:py-6">
                    <p className="text-[1.45rem] font-medium tracking-[-0.02em] text-white sm:text-[1.7rem] lg:text-[1.95rem]">
                      {t(item.titleKey)}
                    </p>
                    <p className="text-sm font-medium text-white/90 sm:text-base lg:text-lg">
                      {t('catalog.explore')}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-9 hidden grid-cols-4 gap-6 lg:grid">
            {STOCK_ITEMS.map((item) => (
              <a
                key={item.key}
                href={t(item.hrefKey)}
                className="group relative block overflow-hidden rounded-[1.25rem] bg-[#171717]"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={item.image}
                    alt={t(item.titleKey)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 px-5 py-4 lg:px-7 lg:py-6">
                    <p className="text-[1.95rem] font-medium tracking-[-0.02em] text-white">
                      {t(item.titleKey)}
                    </p>
                    <p className="mt-2 text-lg font-medium text-white/90">
                      {t('catalog.explore')}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-[1200px] text-center text-sm leading-[1.45] tracking-[-0.01em] text-white/82 sm:text-base lg:mt-10 lg:text-lg">
            {t.rich('catalog.description', {
              music: (chunks) => (
                <a
                  href={t('catalog.items.music.href')}
                  className="underline underline-offset-2"
                >
                  {chunks}
                </a>
              ),
              sfx: (chunks) => (
                <a
                  href={t('catalog.items.sfx.href')}
                  className="underline underline-offset-2"
                >
                  {chunks}
                </a>
              ),
              footage: (chunks) => (
                <a
                  href={t('catalog.items.footage.href')}
                  className="underline underline-offset-2"
                >
                  {chunks}
                </a>
              ),
              templates: (chunks) => (
                <a
                  href={t('catalog.items.templates.href')}
                  className="underline underline-offset-2"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
      </section>

      <section className="bg-black px-4 py-24 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto w-full max-w-[1536px] lg:grid lg:grid-cols-[minmax(0,1fr)_clamp(22rem,30vw,31rem)] lg:items-start lg:gap-10">
          <div className="lg:pl-[8.3333%]">
            <h2 className="whitespace-pre-line font-serif text-[3rem] font-light leading-[0.88] tracking-[-0.03em] text-white sm:text-[4.5rem] lg:text-[5.5rem]">
              {t('plan.title')}
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-10 lg:mt-14">
              <article className="flex flex-col gap-8">
                <div>
                  <h3 className="text-[2rem] font-medium leading-[0.9] tracking-[-0.02em] text-white sm:text-[2.25rem]">
                    {t('plan.creators.title')}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl lg:leading-[1.28]">
                    {t('plan.creators.description')}
                  </p>
                </div>
                <Button
                  asChild
                  className="h-[3.125rem] w-full rounded-full border border-white bg-transparent px-8 text-lg font-medium text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18),inset_0_10px_26px_rgba(255,255,255,0.04)] backdrop-blur-sm transition hover:bg-transparent hover:shadow-[inset_5px_0_10px_2px_#ffff5e,inset_0_3px_10px_2px_#ffff5e,inset_-5px_0_10px_2px_#ffff5e,inset_0_-2px_10px_2px_#ffff5e,inset_0_20px_20px_20px_#ffda2a] sm:w-[14.375rem]"
                >
                  <LocaleLink href={Routes.Pricing}>
                    {t('plan.creators.cta')}
                  </LocaleLink>
                </Button>
              </article>

              <article className="flex flex-col gap-8">
                <div>
                  <h3 className="text-[2rem] font-medium leading-[0.9] tracking-[-0.02em] text-white sm:text-[2.25rem]">
                    {t('plan.business.title')}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl lg:leading-[1.28]">
                    {t('plan.business.description')}
                  </p>
                </div>
                <Button
                  asChild
                  className="h-[3.125rem] w-full rounded-full border border-white bg-transparent px-8 text-lg font-medium text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18),inset_0_10px_26px_rgba(255,255,255,0.04)] backdrop-blur-sm transition hover:bg-transparent hover:shadow-[inset_5px_0_10px_2px_#ffff5e,inset_0_3px_10px_2px_#ffff5e,inset_-5px_0_10px_2px_#ffff5e,inset_0_-2px_10px_2px_#ffff5e,inset_0_20px_20px_20px_#ffda2a] sm:w-[14.375rem]"
                >
                  <LocaleLink href={Routes.Pricing}>
                    {t('plan.business.cta')}
                  </LocaleLink>
                </Button>
              </article>
            </div>
          </div>

          <div className="relative mt-10 hidden h-[clamp(27.8rem,31vw,38.6rem)] w-[clamp(21.9rem,30vw,30.7rem)] overflow-hidden lg:block">
            <Image
              src="/media/artlist-home/plan-1.jpg"
              alt={t('plan.creators.imageAlt')}
              fill
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 31vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="relative bg-black px-4 pt-24 sm:pt-28 lg:px-8 lg:pt-32">
        <div className="relative mx-auto w-full">
          <Image
            src="/media/artlist-home/running-mobile-1.jpg"
            alt={t('startFree.imageAlt')}
            width={1320}
            height={520}
            className="h-auto w-full rounded-lg object-cover lg:hidden"
            sizes="100vw"
          />
          <Image
            src="/media/artlist-home/running-desktop-1.jpg"
            alt={t('startFree.imageAlt')}
            width={1920}
            height={756}
            className="hidden h-auto w-full rounded-3xl object-cover lg:block"
            sizes="(min-width: 1024px) 100vw, 0px"
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-5 sm:p-8">
            <Button
              asChild
              className="pointer-events-auto h-14 w-full max-w-[37rem] rounded-full border border-white bg-white/10 px-8 text-xl font-medium text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25),inset_0_14px_30px_rgba(255,255,255,0.18)] backdrop-blur-md transition hover:bg-white/15 hover:text-white lg:h-28 lg:text-[2.875rem]"
            >
              <LocaleLink href={Routes.Pricing}>
                {t('startFree.cta')}
              </LocaleLink>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="faqs"
        className="bg-black px-4 py-24 sm:py-28 lg:px-8 lg:py-32"
      >
        <div className="mx-auto flex w-full max-w-[1316px] flex-col gap-14">
          <h2 className="font-serif text-[3rem] font-light leading-[0.88] tracking-[-0.03em] text-white sm:text-[4.5rem] lg:text-[5.5rem]">
            {t('faq.title')}
          </h2>

          <Accordion
            type="single"
            collapsible
            className="mt-8 border-t border-white/15 lg:mt-10"
          >
            {FAQ_IDS.map((id) => (
              <AccordionItem
                key={id}
                value={id}
                className="border-b border-white/15 px-0"
              >
                <AccordionTrigger className="py-6 text-left text-lg font-medium tracking-[-0.01em] text-white hover:no-underline sm:py-7 sm:text-[1.65rem]">
                  {t(`faq.items.${id}.question`)}
                </AccordionTrigger>
                <AccordionContent className="pb-7 pr-8 text-base leading-7 text-white/82 sm:text-lg">
                  {t.rich(`faq.items.${id}.answer`, {
                    linkMusic: (chunks) => (
                      <a
                        href={t('faq.links.musicLicensing')}
                        className="underline underline-offset-2"
                      >
                        {chunks}
                      </a>
                    ),
                    linkAiSuite: (chunks) => (
                      <a
                        href={t('faq.links.aiSuite')}
                        className="underline underline-offset-2"
                      >
                        {chunks}
                      </a>
                    ),
                    linkAiVoiceover: (chunks) => (
                      <a
                        href={t('faq.links.aiVoiceover')}
                        className="underline underline-offset-2"
                      >
                        {chunks}
                      </a>
                    ),
                    linkMusicSfx: (chunks) => (
                      <a
                        href={t('faq.links.musicSfx')}
                        className="underline underline-offset-2"
                      >
                        {chunks}
                      </a>
                    ),
                    linkFootageTemplates: (chunks) => (
                      <a
                        href={t('faq.links.footageTemplates')}
                        className="underline underline-offset-2"
                      >
                        {chunks}
                      </a>
                    ),
                    linkArtlistMax: (chunks) => (
                      <a
                        href={t('faq.links.artlistMax')}
                        className="underline underline-offset-2"
                      >
                        {chunks}
                      </a>
                    ),
                    linkAiImageGenerators: (chunks) => (
                      <a
                        href={t('faq.links.aiImageGenerators')}
                        className="underline underline-offset-2"
                      >
                        {chunks}
                      </a>
                    ),
                    linkVideoGeneration: (chunks) => (
                      <a
                        href={t('faq.links.videoGeneration')}
                        className="underline underline-offset-2"
                      >
                        {chunks}
                      </a>
                    ),
                    linkAiVoiceovers: (chunks) => (
                      <a
                        href={t('faq.links.aiVoiceovers')}
                        className="underline underline-offset-2"
                      >
                        {chunks}
                      </a>
                    ),
                    linkBusinessPlan: (chunks) => (
                      <a
                        href={t('faq.links.businessPlan')}
                        className="underline underline-offset-2"
                      >
                        {chunks}
                      </a>
                    ),
                    linkTextToVideo: (chunks) => (
                      <a
                        href={t('faq.links.textToVideo')}
                        className="underline underline-offset-2"
                      >
                        {chunks}
                      </a>
                    ),
                    linkImageToImage: (chunks) => (
                      <a
                        href={t('faq.links.imageToImage')}
                        className="underline underline-offset-2"
                      >
                        {chunks}
                      </a>
                    ),
                    linkVoiceToVoice: (chunks) => (
                      <a
                        href={t('faq.links.voiceToVoice')}
                        className="underline underline-offset-2"
                      >
                        {chunks}
                      </a>
                    ),
                    linkVoiceCloning: (chunks) => (
                      <a
                        href={t('faq.links.voiceCloning')}
                        className="underline underline-offset-2"
                      >
                        {chunks}
                      </a>
                    ),
                    linkTerms: (chunks) => (
                      <a
                        href={t('faq.links.termsOfUse')}
                        className="underline underline-offset-2"
                      >
                        {chunks}
                      </a>
                    ),
                  })}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="mt-7 text-base text-white/82 sm:text-lg">
            {t.rich('faq.helpText', {
              help: (chunks) => (
                <a
                  href={t('faq.links.help')}
                  className="underline underline-offset-2"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
      </section>
    </>
  );
}
