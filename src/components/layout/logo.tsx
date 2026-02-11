'use client';

import { websiteConfig } from '@/config/website';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  const logoLight = websiteConfig.metadata.images?.logoLight ?? '/logo.png';
  const logoDark = websiteConfig.metadata.images?.logoDark ?? logoLight;

  // Dark-only: always render the dark logo to avoid hydration flicker.
  const logo = logoDark;

  return (
    <Image
      src={logo}
      alt="Logo"
      title="Logo"
      width={96}
      height={96}
      className={cn('size-8 rounded-md', className)}
    />
  );
}
