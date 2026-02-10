import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import type { ReactNode } from 'react';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Fixed overlay header stack (announcement + navbar) */}
      <div className="fixed inset-x-0 top-0 z-50">
        <AnnouncementBar />
        <Navbar scroll={true} />
      </div>

      {/*
        Keep content below the header stack.
        Banner uses CSS var --fd-banner-height when open.
      */}
      <main
        className="flex-1"
        style={{ paddingTop: 'calc(var(--fd-banner-height, 0px) + 72px)' }}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
