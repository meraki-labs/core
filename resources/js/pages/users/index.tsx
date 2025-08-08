import React, { useState } from 'react'
import AppLayout from '@/layouts/app-layout';
import { SharedPageProps, TabItem, type BreadcrumbItem } from '@/types';
import { router, usePage, Head } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import UsersLayout from './layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users Component',
        href: route('users.index'),
    },
    {
        title: 'Users List',
        href: route('users.index'),
    },
];

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

export interface UsersPageProps extends SharedPageProps {
    users: {
        data: any[]
        links: { label: string; url: string | null; active: boolean }[]
    }
    filters: {
        search?: string
        sort_by?: string
        sort_type?: 'asc' | 'desc'
    }
}

export default function Users() {
    const { users, filters } = usePage<UsersPageProps>().props
    const [search, setSearch] = useState(filters.search || '')
    const [sortBy, setSortBy] = useState(filters.sort_by || 'created_at')
    const [sortType, setSortType] = useState(filters.sort_type || 'desc')

    const handleSearch = (e: any) => {
        e.preventDefault()
        router.get(route('users.index'), {
            search,
            sort_by: sortBy,
            sort_type: sortType,
        }, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    const toggleSort = (field: any) => {
        const nextType = sortBy === field && sortType === 'asc' ? 'desc' : 'asc'
        setSortBy(field)
        setSortType(nextType)

        router.get(route('users.index'), {
            search,
            sort_by: field,
            sort_type: nextType,
        }, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs} tabs={tabs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Search */}
                {/* <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Tìm kiếm..."
                            className="border px-3 py-2 rounded w-full max-w-sm"
                        />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                            Tìm
                        </button>
                    </form> */}

                <Table>
                    <TableCaption>A list of your users.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] cursor-pointer" onClick={() => toggleSort('name')}>Name</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort('email')}>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.data.length > 0 ? (
                            users.data.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>Active</TableCell>
                                    <TableCell className="text-right">
                                        <a href='#'>Edit</a>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">No users found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex flex-wrap gap-2 mt-6">
                    {users.links.map((link, i) => (
                        <button
                            key={i}
                            disabled={!link.url}
                            onClick={() => link.url && router.get(link.url)}
                            className={`px-3 py-1 border rounded text-sm ${link.active ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                                }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
