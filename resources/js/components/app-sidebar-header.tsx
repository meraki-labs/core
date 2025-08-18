import { Breadcrumbs } from '@/components/blocks/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { TabItem, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { NavTabs } from '@/components/blocks/nav-tabs';

export function AppSidebarHeader({ breadcrumbs = [], tabs = [] }: { breadcrumbs?: BreadcrumbItemType[], tabs?: TabItem[] }) {
  return (
    <header className="flex h-16 shrink-0 items-center border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
      <div className="flex w-full items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
          <SidebarTrigger className="-ml-1" />
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>

        <NavTabs tabs={tabs} />
      </div>
    </header>
  );
}
