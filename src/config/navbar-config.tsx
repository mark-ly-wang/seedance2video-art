'use client';

import { useTranslations } from 'next-intl';

import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';

export function useNavbarLinks(): NestedMenuItem[] {
  const t = useTranslations('Marketing.navbar');

  return [
    {
      title: t('toolkit.title'),
      href: '/#toolkit',
      external: false,
    },
    {
      title: t('templates.title'),
      href: '/#templates',
      external: false,
    },
    {
      title: t('pricing.title'),
      href: Routes.Pricing,
      external: false,
    },
  ];
}
