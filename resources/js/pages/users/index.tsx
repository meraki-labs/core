import { useState } from 'react'
import { SharedPageProps, type BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import UsersLayout from './layout';
import { DataTable } from './data-table';
import { userColumn } from './columns';

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

export interface UsersPageProps extends SharedPageProps {
  users: {
    data: any[]
    links: { label: string; url: string | null; active: boolean }[]
  },
  filters: {
    keywords?: string
    sort?: string
    order?: 'asc' | 'desc'
  }
}

export default function Users() {
  const { users, filters } = usePage<UsersPageProps>().props
  const [keywords, setKeywords] = useState(filters.keywords || '')
  const [sort, setSort] = useState(filters.sort || 'created_at')
  const [order, setOrder] = useState(filters.order || 'asc')

  const handleSearch = (e: any) => {
    e.preventDefault()
    router.get(route('users.index'), {
      keywords,
      sort: sort,
      order: order,
    }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  const toggleSorting = (field: any) => {
    const nextType = sort === field && order === 'asc' ? 'desc' : 'asc'
    setSort(field)
    setOrder(nextType)

    router.get(route('users.index'), {
      keywords,
      sort: field,
      order: nextType,
    }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  return (
    <UsersLayout breadcrumbs={breadcrumbs}>
      <DataTable data={users.data} columns={userColumn} />
    </UsersLayout >
  );
}
