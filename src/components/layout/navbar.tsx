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

const customNavigationMenuTriggerStyle = cn(
  navigationMenuTriggerStyle(),
  'relative bg-transparent text-muted-foreground cursor-pointer',
  'hover:bg-accent hover:text-accent-foreground',
  'focus:bg-accent focus:text-accent-foreground',
  'data-active:font-semibold data-active:bg-transparent data-active:text-accent-foreground',
  'data-[state=open]:bg-transparent data-[state=open]:text-accent-foreground'
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

  const isHeroGlass = Boolean(scroll && isHome);

  const heroNavItemClassName = isHeroGlass
    ? cn(
        'text-white',
        'hover:bg-white/10 hover:text-white',
        'focus:bg-white/10 focus:text-white',
        'data-active:text-white',
        'data-[state=open]:bg-white/10 data-[state=open]:text-white'
      )
    : undefined;

  const heroDropdownContentClassName = isHeroGlass
    ? 'bg-black/60 text-white/90 backdrop-blur-xl backdrop-saturate-150 border border-white/10 shadow-2xl rounded-3xl p-0 pr-0'
    : undefined;

  return (
    <section
      className={cn(
        'inset-x-0 top-0 py-4 transition-all duration-300',
        isHeroGlass ? 'fixed z-50' : 'sticky z-40',
        isHeroGlass
          ? scrolled
            ? 'bg-black/[0.06] backdrop-blur-lg backdrop-saturate-150 border-b border-white/10'
            : 'bg-black/[0.03] backdrop-blur-lg backdrop-saturate-150'
          : scroll
            ? scrolled
              ? 'bg-muted/50 backdrop-blur-md border-b supports-backdrop-filter:bg-muted/50'
              : 'bg-transparent'
            : 'border-b bg-muted/50'
      )}
    >
      <Container className="px-4">
        {/* desktop navbar */}
        <nav className="hidden lg:flex">
          {/* logo and name */}
          <div className="flex items-center">
            <LocaleLink href="/" className="flex items-center space-x-2">
              <Logo />
              <span
                className={cn(
                  'text-xl font-semibold',
                  isHeroGlass && 'text-white'
                )}
              >
                {t('Metadata.name')}
              </span>
            </LocaleLink>
          </div>

          {/* menu links */}
          <div className="flex-1 flex items-center justify-center space-x-2">
            <NavigationMenu className="relative" viewport={!isHeroGlass}>
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
                        className={cn(
                          customNavigationMenuTriggerStyle,
                          heroNavItemClassName
                        )}
                      >
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent
                        className={cn(heroDropdownContentClassName)}
                      >
                        {isHeroGlass ? (
                          <ul className="w-64 space-y-1 p-5">
                            {item.items?.map((subItem, subIndex) => (
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
                                      'block rounded-2xl px-6 py-3 text-white/80 transition-colors',
                                      'hover:bg-white/10 hover:text-white'
                                    )}
                                  >
                                    {subItem.title}
                                  </LocaleLink>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="grid w-[400px] gap-4 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
                                        'group flex select-none flex-row items-center gap-4 rounded-md',
                                        'p-2 leading-none no-underline outline-hidden transition-colors',
                                        isHeroGlass
                                          ? 'hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white'
                                          : 'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                                        isSubItemActive &&
                                          (isHeroGlass
                                            ? 'bg-white/10 text-white'
                                            : 'bg-accent text-accent-foreground')
                                      )}
                                    >
                                      <div
                                        className={cn(
                                          'flex size-8 shrink-0 items-center justify-center transition-colors',
                                          'bg-transparent text-muted-foreground',
                                          'group-hover:bg-transparent group-hover:text-accent-foreground',
                                          'group-focus:bg-transparent group-focus:text-accent-foreground',
                                          isSubItemActive &&
                                            'bg-transparent text-accent-foreground'
                                        )}
                                      >
                                        {subItem.icon ? subItem.icon : null}
                                      </div>
                                      <div className="flex-1">
                                        <div
                                          className={cn(
                                            'text-sm font-medium text-muted-foreground',
                                            'group-hover:bg-transparent group-hover:text-accent-foreground',
                                            'group-focus:bg-transparent group-focus:text-accent-foreground',
                                            isSubItemActive &&
                                              'bg-transparent text-accent-foreground'
                                          )}
                                        >
                                          {subItem.title}
                                        </div>
                                        {subItem.description && (
                                          <div
                                            className={cn(
                                              'text-sm text-muted-foreground',
                                              'group-hover:bg-transparent group-hover:text-accent-foreground/80',
                                              'group-focus:bg-transparent group-focus:text-accent-foreground/80',
                                              isSubItemActive &&
                                                'bg-transparent text-accent-foreground/80'
                                            )}
                                          >
                                            {subItem.description}
                                          </div>
                                        )}
                                      </div>
                                      {subItem.external && (
                                        <ArrowUpRightIcon
                                          className={cn(
                                            'size-4 shrink-0 text-muted-foreground',
                                            'group-hover:bg-transparent group-hover:text-accent-foreground',
                                            'group-focus:bg-transparent group-focus:text-accent-foreground',
                                            isSubItemActive &&
                                              'bg-transparent text-accent-foreground'
                                          )}
                                        />
                                      )}
                                    </LocaleLink>
                                  </NavigationMenuLink>
                                </li>
                              );
                            })}
                          </ul>
                        )}
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
                        className={cn(
                          customNavigationMenuTriggerStyle,
                          heroNavItemClassName
                        )}
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
                    })
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
