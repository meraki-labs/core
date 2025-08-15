import { ReactNode } from 'react'
import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, TabItem } from '@/types'

interface UserLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function UsersLayout({ children, breadcrumbs, ...props }: UserLayoutProps) {
    const tabs: TabItem[] = [
        {
            title: 'List',
            href: route('users.index', [], false)
        },
        {
            title: 'Deleted',
            href: route('users.trashed', [], false)
        },
        {
            title: 'Setting',
            href: route('users.index', [], false)
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs} tabs={tabs} {...props}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {children}
            </div>

        </AppLayout>
    )
}
