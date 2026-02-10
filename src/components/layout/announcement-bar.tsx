'use client';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

type AnnouncementBarProps = {
  storageKey?: string;
  className?: string;
};

export function AnnouncementBar({
  storageKey = 'announcement:home:v1:dismissed',
  className,
}: AnnouncementBarProps) {
  const t = useTranslations('Marketing.announcement');
  const [dismissed, setDismissed] = useState(true);

  const href = useMemo(() => {
    const raw = t.raw('href');
    return typeof raw === 'string' ? raw : '#';
  }, [t]);

  useEffect(() => {
    try {
      const v = localStorage.getItem(storageKey);
      setDismissed(v === '1');
    } catch {
      setDismissed(false);
    }
  }, [storageKey]);

  if (dismissed) return null;

  return (
    <div
      className={cn(
        'w-full border-b bg-background/60 backdrop-blur-md',
        'supports-[backdrop-filter]:bg-background/50',
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-sm">
        <a
          href={href}
          className="truncate text-foreground/90 hover:text-foreground"
        >
          <span className="font-medium">{t('text')}</span>
          <span className="ml-2 text-foreground/70">{t('cta')}</span>
        </a>

        <button
          type="button"
          aria-label={t('close')}
          className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={() => {
            setDismissed(true);
            try {
              localStorage.setItem(storageKey, '1');
            } catch {
              // ignore
            }
          }}
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
