'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslations } from 'next-intl';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export default function FaqSection() {
  const t = useTranslations('HomePage.faqs');

  const faqItems: FAQItem[] = [
    {
      id: 'item-1',
      question: t('items.item-1.question'),
      answer: t('items.item-1.answer'),
    },
    {
      id: 'item-2',
      question: t('items.item-2.question'),
      answer: t('items.item-2.answer'),
    },
    {
      id: 'item-3',
      question: t('items.item-3.question'),
      answer: t('items.item-3.answer'),
    },
    {
      id: 'item-4',
      question: t('items.item-4.question'),
      answer: t('items.item-4.answer'),
    },
    {
      id: 'item-5',
      question: t('items.item-5.question'),
      answer: t('items.item-5.answer'),
    },
  ];

  return (
    <section id="faqs" className="bg-[#0A0A0A] px-6 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <div>
            <span className="text-sm font-bold tracking-widest text-[#FFD700] uppercase">
              {t('title')}
            </span>
            <h2 className="mt-4 text-balance font-bricolage-grotesque text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl">
              {t('subtitle')}
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-none bg-white/[0.03] px-6 transition-colors hover:bg-white/[0.05]"
              >
                <AccordionTrigger className="py-6 text-left text-lg font-medium text-white hover:no-underline hover:text-[#FFD700]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-7 text-white/60">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
