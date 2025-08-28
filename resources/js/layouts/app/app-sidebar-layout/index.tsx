import { type PropsWithChildren } from 'react';
import { TabItem, type BreadcrumbItem } from '@/types';

import { AppShell } from '@/layouts/app/_components/app-shell';
import { AppContent } from '@/layouts/app/_components/app-content';

import { AppSidebar } from './app-sidebar';
import { AppSidebarHeader } from './app-sidebar-header';

export default function AppSidebarLayout({ children, breadcrumbs = [], tabs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[], tabs?: TabItem[] }>) {
  return (
    <AppShell variant="sidebar">
      <AppSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden">
        <AppSidebarHeader breadcrumbs={breadcrumbs} tabs={tabs} />
        {children}
      </AppContent>
    </AppShell>
  );
}
