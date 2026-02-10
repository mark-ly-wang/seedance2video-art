'use client';

import { Banner } from 'fumadocs-ui/components/banner';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

/**
 * Marketing announcement bar (dismissible).
 *
 * Rules:
 * - Reuse existing library component (fumadocs Banner) instead of inventing a new close mechanism.
 * - Dismissal resets daily by using a date-scoped banner id.
 */
export function AnnouncementBar() {
  const t = useTranslations('Marketing.announcement');

  const bannerId = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `marketing-${yyyy}-${mm}-${dd}`;
  }, []);

  // Banner reads localStorage key: nd-banner-${id}
  // By changing id daily we make the banner re-appear each day.

  return (
    <Banner
      id={bannerId}
      changeLayout={true}
      height="2.75rem"
      className="border-b border-white/10 bg-black/35 text-white/90 backdrop-blur-md"
    >
      <a href={t('href')} className="truncate">
        <span className="font-medium">{t('text')}</span>
        <span className="ml-2 text-white/75">{t('cta')}</span>
      </a>
    </Banner>
  );
}
