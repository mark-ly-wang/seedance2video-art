'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

interface ModelCard {
  nameKey:
    | 'models.seedance_2_0.name'
    | 'models.kling_2_6.name'
    | 'models.kling_3_0_pro.name'
    | 'models.kling_o1_pro.name'
    | 'models.kling_turbo.name'
    | 'models.kling_omni_image.name'
    | 'models.veo_3_1.name'
    | 'models.sora.name'
    | 'models.wan_2_6.name'
    | 'models.seedream_4_5.name'
    | 'models.flux_2_dev.name'
    | 'models.flux_2_pro.name'
    | 'models.gpt_image_1_5.name'
    | 'models.grok_imagine.name'
    | 'models.imagen_4_ultra.name'
    | 'models.z_image_turbo.name'
    | 'models.nano_banana_pro.name'
    | 'models.cartesia_sonic_4.name'
    | 'models.eleven_alpha.name'
    | 'models.minimax_speech_4.name';
  descriptionKey:
    | 'models.seedance_2_0.description'
    | 'models.kling_2_6.description'
    | 'models.kling_3_0_pro.description'
    | 'models.kling_o1_pro.description'
    | 'models.kling_turbo.description'
    | 'models.kling_omni_image.description'
    | 'models.veo_3_1.description'
    | 'models.sora.description'
    | 'models.wan_2_6.description'
    | 'models.seedream_4_5.description'
    | 'models.flux_2_dev.description'
    | 'models.flux_2_pro.description'
    | 'models.gpt_image_1_5.description'
    | 'models.grok_imagine.description'
    | 'models.imagen_4_ultra.description'
    | 'models.z_image_turbo.description'
    | 'models.nano_banana_pro.description'
    | 'models.cartesia_sonic_4.description'
    | 'models.eleven_alpha.description'
    | 'models.minimax_speech_4.description';
  image: string;
  logo: string;
}

const CARDS_PER_STEP = 2;

const MODELS: ModelCard[] = [
  {
    nameKey: 'models.seedance_2_0.name',
    descriptionKey: 'models.seedance_2_0.description',
    image: '/media/featured_ai_models/seedance-2-0.avif',
    logo: '/media/featured_ai_models/logos/bytedance.svg',
  },
  {
    nameKey: 'models.kling_2_6.name',
    descriptionKey: 'models.kling_2_6.description',
    image: '/media/featured_ai_models/kling2-6Bg-1.avif',
    logo: '/media/featured_ai_models/logos/kling.svg',
  },
  {
    nameKey: 'models.kling_3_0_pro.name',
    descriptionKey: 'models.kling_3_0_pro.description',
    image: '/media/featured_ai_models/Kling-3-0-pro.avif',
    logo: '/media/featured_ai_models/logos/kling.svg',
  },
  {
    nameKey: 'models.kling_o1_pro.name',
    descriptionKey: 'models.kling_o1_pro.description',
    image: '/media/featured_ai_models/klingO1ProBg.avif',
    logo: '/media/featured_ai_models/logos/kling.svg',
  },
  {
    nameKey: 'models.kling_turbo.name',
    descriptionKey: 'models.kling_turbo.description',
    image: '/media/featured_ai_models/klingTurboBg.avif',
    logo: '/media/featured_ai_models/logos/kling.svg',
  },
  {
    nameKey: 'models.kling_omni_image.name',
    descriptionKey: 'models.kling_omni_image.description',
    image: '/media/featured_ai_models/klingOmniImageBg.avif',
    logo: '/media/featured_ai_models/logos/kling.svg',
  },
  {
    nameKey: 'models.veo_3_1.name',
    descriptionKey: 'models.veo_3_1.description',
    image: '/media/featured_ai_models/veo31Bg.avif',
    logo: '/media/featured_ai_models/logos/google.svg',
  },
  {
    nameKey: 'models.sora.name',
    descriptionKey: 'models.sora.description',
    image: '/media/featured_ai_models/soraBg.avif',
    logo: '/media/featured_ai_models/logos/openai.svg',
  },
  {
    nameKey: 'models.wan_2_6.name',
    descriptionKey: 'models.wan_2_6.description',
    image: '/media/featured_ai_models/wan-2-6.avif',
    logo: '/media/featured_ai_models/logos/wan.svg',
  },
  {
    nameKey: 'models.seedream_4_5.name',
    descriptionKey: 'models.seedream_4_5.description',
    image: '/media/featured_ai_models/seedream4-5Bg-1.avif',
    logo: '/media/featured_ai_models/logos/bytedance.svg',
  },
  {
    nameKey: 'models.flux_2_dev.name',
    descriptionKey: 'models.flux_2_dev.description',
    image: '/media/featured_ai_models/flux2DevBg1.avif',
    logo: '/media/featured_ai_models/logos/flux.svg',
  },
  {
    nameKey: 'models.flux_2_pro.name',
    descriptionKey: 'models.flux_2_pro.description',
    image: '/media/featured_ai_models/flux2ProBg1.avif',
    logo: '/media/featured_ai_models/logos/flux.svg',
  },
  {
    nameKey: 'models.gpt_image_1_5.name',
    descriptionKey: 'models.gpt_image_1_5.description',
    image: '/media/featured_ai_models/GPT-image-1-5.avif',
    logo: '/media/featured_ai_models/logos/openai.svg',
  },
  {
    nameKey: 'models.grok_imagine.name',
    descriptionKey: 'models.grok_imagine.description',
    image: '/media/featured_ai_models/grokImagineBg.avif',
    logo: '/media/featured_ai_models/logos/grok.svg',
  },
  {
    nameKey: 'models.imagen_4_ultra.name',
    descriptionKey: 'models.imagen_4_ultra.description',
    image: '/media/featured_ai_models/Imagen-4-Ultra.avif',
    logo: '/media/featured_ai_models/logos/google.svg',
  },
  {
    nameKey: 'models.z_image_turbo.name',
    descriptionKey: 'models.z_image_turbo.description',
    image: '/media/featured_ai_models/z-image-turbo.avif',
    logo: '/media/featured_ai_models/logos/z-image.svg',
  },
  {
    nameKey: 'models.nano_banana_pro.name',
    descriptionKey: 'models.nano_banana_pro.description',
    image: '/media/featured_ai_models/nanoBananaProBg.avif',
    logo: '/media/featured_ai_models/logos/google.svg',
  },
  {
    nameKey: 'models.cartesia_sonic_4.name',
    descriptionKey: 'models.cartesia_sonic_4.description',
    image: '/media/featured_ai_models/Cartesia-Sonic-4.avif',
    logo: '/media/featured_ai_models/logos/cartesia.svg',
  },
  {
    nameKey: 'models.eleven_alpha.name',
    descriptionKey: 'models.eleven_alpha.description',
    image: '/media/featured_ai_models/eleven_alpha.avif',
    logo: '/media/featured_ai_models/logos/eleven.svg',
  },
  {
    nameKey: 'models.minimax_speech_4.name',
    descriptionKey: 'models.minimax_speech_4.description',
    image: '/media/featured_ai_models/MiniMax-Speech-4.avif',
    logo: '/media/featured_ai_models/logos/minimax.svg',
  },
];

export default function FeaturedAiModels() {
  const t = useTranslations('HomePage.landing.featuredModels');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activePage, setActivePage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const firstCard = el.firstElementChild as HTMLDivElement | null;
    const cardWidth = firstCard?.offsetWidth ?? 280;
    const gap = 16;
    const cardStride = cardWidth + gap;
    const cardsPerPage = Math.max(1, Math.floor(el.clientWidth / cardStride));
    const pages =
      Math.max(0, MODELS.length - cardsPerPage) / CARDS_PER_STEP + 1;
    const computedTotalPages = Math.max(1, Math.ceil(pages));
    const firstVisibleCard = Math.round(el.scrollLeft / cardStride);
    const currentPage = Math.min(
      computedTotalPages - 1,
      Math.max(0, Math.round(firstVisibleCard / CARDS_PER_STEP))
    );

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    setTotalPages(computedTotalPages);
    setActivePage(currentPage);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;

    const firstCard = el.firstElementChild as HTMLDivElement | null;
    const cardWidth = firstCard?.offsetWidth ?? 280;
    const gap = 16;
    const distance = (cardWidth + gap) * CARDS_PER_STEP;

    el.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  }, []);

  const scrollToPage = useCallback(
    (page: number) => {
      const el = scrollRef.current;
      if (!el) return;

      const firstCard = el.firstElementChild as HTMLDivElement | null;
      const cardWidth = firstCard?.offsetWidth ?? 280;
      const gap = 16;
      const cardStride = cardWidth + gap;
      const clampedPage = Math.max(0, Math.min(page, totalPages - 1));

      el.scrollTo({
        left: clampedPage * CARDS_PER_STEP * cardStride,
        behavior: 'smooth',
      });
    },
    [totalPages]
  );

  return (
    <section className="relative w-full bg-black py-10 sm:py-14">
      <div className="mx-auto max-w-[1536px] px-6">
        <div className="mb-8">
          <h2 className="font-bricolage-grotesque text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {t('title')}
          </h2>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]"
          >
            {MODELS.map((model) => (
              <div
                key={model.nameKey}
                className="relative aspect-[10/11] min-w-[220px] flex-shrink-0 snap-start overflow-hidden rounded-lg sm:min-w-[280px]"
              >
                <Image
                  src={model.image}
                  alt={t(model.nameKey)}
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 280px, 220px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={model.logo}
                      alt=""
                      aria-hidden
                      width={20}
                      height={20}
                      className="h-5 w-auto"
                    />
                    <p className="text-sm font-semibold text-white sm:text-base">
                      {t(model.nameKey)}
                    </p>
                  </div>
                  {model.descriptionKey && (
                    <p className="mt-1 line-clamp-2 text-xs text-white/70">
                      {t(model.descriptionKey)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label={t('scrollLeftAria')}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={`page-${index}`}
                type="button"
                onClick={() => scrollToPage(index)}
                aria-label={t('paginationAria', { page: index + 1 })}
                className={`h-2.5 rounded-full transition-all ${
                  index === activePage
                    ? 'w-5 bg-white'
                    : 'w-2.5 bg-white/35 hover:bg-white/55'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label={t('scrollRightAria')}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
