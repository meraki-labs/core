import { Link, usePage } from '@inertiajs/react';
import { SharedPageProps, type NavItem } from '@/types';

//Shadcn UI
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';

//Blocks
import AppLogo from '@/components/blocks/brand/app-logo';

//Parts
import { NavMain } from '@/layouts/app/_components/nav-main';
import { NavUser } from '@/layouts/app/_components/nav-user';
import { NavFooter } from '@/layouts/app/_components/nav-footer';

const footerNavItems: NavItem[] = [
  {
    title: 'Repository',
    href: 'https://github.com/laravel/react-starter-kit',
    icon: 'Folder',
  },
  {
    title: 'Documentation',
    href: 'https://laravel.com/docs/starter-kits#react',
    icon: 'BookOpen',
  },
];

export function AppSidebar() {
  const { menus = [] } = usePage<SharedPageProps>().props ?? {}

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={menus} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
