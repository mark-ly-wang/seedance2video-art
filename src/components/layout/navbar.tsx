'use client';

import { LoginWrapper } from '@/components/auth/login-wrapper';
import Container from '@/components/layout/container';
import { Logo } from '@/components/layout/logo';
import { ModeSwitcher } from '@/components/layout/mode-switcher';
import { NavbarMobile } from '@/components/layout/navbar-mobile';
import { UserButton } from '@/components/layout/user-button';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useNavbarLinks } from '@/config/navbar-config';
import { useScroll } from '@/hooks/use-scroll';
import { LocaleLink, useLocalePathname } from '@/i18n/navigation';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { Routes } from '@/routes';
import { ArrowUpRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import LocaleSwitcher from './locale-switcher';

interface NavBarProps {
  scroll?: boolean;
}

const glassNavigationMenuTriggerStyle = cn(
  navigationMenuTriggerStyle(),
  'relative rounded-full bg-transparent text-foreground/80 cursor-pointer',
  'hover:bg-foreground/10 hover:text-foreground',
  'focus:bg-foreground/10 focus:text-foreground',
  'data-active:font-semibold data-active:bg-transparent data-active:text-foreground',
  'data-[state=open]:bg-foreground/10 data-[state=open]:text-foreground'
);

export function Navbar({ scroll }: NavBarProps) {
  const t = useTranslations();
  const scrolled = useScroll(50);
  const menuLinks = useNavbarLinks();
  const localePathname = useLocalePathname();
  const isHome = localePathname === '/';
  const [mounted, setMounted] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const currentUser = session?.user;
  // console.log(`Navbar, user:`, user);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isOverlay = Boolean(scroll && isHome);

  const glassDropdownContentClassName = cn(
    'w-[22rem] max-w-[calc(100vw-3rem)] p-0',
    'group-data-[viewport=false]/navigation-menu:bg-background/70',
    'group-data-[viewport=false]/navigation-menu:text-foreground',
    'group-data-[viewport=false]/navigation-menu:left-0',
    'group-data-[viewport=false]/navigation-menu:backdrop-blur-2xl',
    'group-data-[viewport=false]/navigation-menu:backdrop-saturate-150',
    'group-data-[viewport=false]/navigation-menu:border-foreground/10',
    'group-data-[viewport=false]/navigation-menu:shadow-2xl',
    'group-data-[viewport=false]/navigation-menu:rounded-3xl'
  );

  return (
    <section
      className={cn(
        'inset-x-0 top-0 py-4 transition-all duration-300',
        isOverlay ? 'fixed z-50' : 'sticky z-40',
        scroll
          ? scrolled
            ? 'bg-background/70 backdrop-blur-xl backdrop-saturate-150 border-b border-foreground/10'
            : 'bg-background/40 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b bg-background/70 backdrop-blur-xl backdrop-saturate-150'
      )}
    >
      <Container className="px-4">
        {/* desktop navbar */}
        <nav className="hidden lg:flex">
          {/* logo and name */}
          <div className="flex items-center">
            <LocaleLink href="/" className="flex items-center space-x-2">
              <Logo />
              <span className="text-xl font-semibold">
                {t('Metadata.name')}
              </span>
            </LocaleLink>
          </div>

          {/* menu links */}
          <div className="flex-1 flex items-center justify-center space-x-2">
            <NavigationMenu className="relative" viewport={false}>
              <NavigationMenuList className="flex items-center">
                {menuLinks?.map((item, index) =>
                  item.items ? (
                    <NavigationMenuItem key={index} className="relative">
                      <NavigationMenuTrigger
                        data-active={
                          item.items.some((subItem) =>
                            subItem.href
                              ? localePathname.startsWith(subItem.href)
                              : false
                          )
                            ? 'true'
                            : undefined
                        }
                        className={glassNavigationMenuTriggerStyle}
                      >
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent
                        className={glassDropdownContentClassName}
                      >
                        <ul className="w-full space-y-1.5 p-2.5 text-left">
                          {item.items?.map((subItem, subIndex) => {
                            const isSubItemActive =
                              subItem.href &&
                              localePathname.startsWith(subItem.href);
                            return (
                              <li key={subIndex}>
                                <NavigationMenuLink asChild>
                                  <LocaleLink
                                    href={subItem.href || '#'}
                                    target={
                                      subItem.external ? '_blank' : undefined
                                    }
                                    rel={
                                      subItem.external
                                        ? 'noopener noreferrer'
                                        : undefined
                                    }
                                    className={cn(
                                      'flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left',
                                      'whitespace-nowrap text-sm font-medium text-foreground/85 transition-colors',
                                      'hover:bg-foreground/10 hover:text-foreground',
                                      'focus:bg-foreground/10 focus:text-foreground',
                                      isSubItemActive &&
                                        'bg-foreground/10 text-foreground'
                                    )}
                                  >
                                    <span className="whitespace-nowrap text-left">
                                      {subItem.title}
                                    </span>
                                    {subItem.external && (
                                      <ArrowUpRightIcon className="ml-auto size-4 shrink-0 opacity-70" />
                                    )}
                                  </LocaleLink>
                                </NavigationMenuLink>
                              </li>
                            );
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        asChild
                        active={
                          item.href
                            ? item.href === '/'
                              ? localePathname === '/'
                              : localePathname.startsWith(item.href)
                            : false
                        }
                        className={glassNavigationMenuTriggerStyle}
                      >
                        <LocaleLink
                          href={item.href || '#'}
                          target={item.external ? '_blank' : undefined}
                          rel={
                            item.external ? 'noopener noreferrer' : undefined
                          }
                        >
                          {item.title}
                        </LocaleLink>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* navbar right show sign in or user */}
          <div className="flex items-center gap-x-4">
            {!mounted || isPending ? (
              <Skeleton className="size-8 border rounded-full" />
            ) : currentUser ? (
              <>
                {/* <CreditsBalanceButton /> */}
                <UserButton user={currentUser} />
              </>
            ) : (
              <div className="flex items-center gap-x-4">
                <LoginWrapper mode="modal" asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    {t('Common.login')}
                  </Button>
                </LoginWrapper>

                <LocaleLink
                  href={Routes.Register}
                  className={cn(
                    buttonVariants({
                      variant: 'default',
                      size: 'sm',
                    }),
                    'border-[#f3d13e] bg-[#FFD700] text-black hover:bg-[#ffe34a] hover:text-black'
                  )}
                >
                  {t('Common.signUp')}
                </LocaleLink>
              </div>
            )}

            <ModeSwitcher />
            <LocaleSwitcher />
          </div>
        </nav>

        {/* mobile navbar */}
        <NavbarMobile className="lg:hidden" />
      </Container>
    </section>
  );
}
