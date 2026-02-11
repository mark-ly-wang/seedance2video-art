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
    <section id="faqs" className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.1em] text-foreground/70 uppercase">
            {t('title')}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {t('subtitle')}
          </h2>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mt-12 w-full rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-3 sm:px-8"
        >
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b border-white/10"
            >
              <AccordionTrigger className="cursor-pointer py-5 text-left text-base font-medium leading-7 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="pb-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
