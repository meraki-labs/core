import type { PropsWithChildren } from 'react';
import { TabItem, type BreadcrumbItem } from '@/types';

import { AppShell } from '@/layouts/app/_components/app-shell';
import { AppContent } from '@/layouts/app/_components/app-content';
import { AppHeader } from '@/layouts/app/app-header-layout/app-header';

export default function AppHeaderLayout({ children, breadcrumbs, tabs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[], tabs?: TabItem[] }>) {
  return (
    <AppShell>
      <AppHeader breadcrumbs={breadcrumbs} />
      <AppContent>{children}</AppContent>
    </AppShell>
  );
}
