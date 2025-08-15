import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { TabItem, type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    tabs?: TabItem[];
}

export default ({ children, breadcrumbs, tabs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} tabs={tabs} {...props}>
        {children}
    </AppLayoutTemplate>
);
