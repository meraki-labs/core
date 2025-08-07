import { PropsWithChildren } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { router, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button, Input } from '@headlessui/react'

export default function UsersLayout({ children }: PropsWithChildren) {
    const { url } = usePage()
    const currentPath = (url.split('/').pop() || '' ).split('?').shift() || ''
    const [tab, setTab] = useState(currentPath)

    useEffect(() => {
        setTab(currentPath)
    }, [currentPath])

    const handleChange = (value: string) => {
        router.visit(`/users/${value}`)
    }

    return (
        <div className='w-full mx-auto space-y-4'>
            <div className='w-full flex items-center justify-between flex-wrap rounded-md bg-background shadow-sm'>
                <Tabs value={tab} onValueChange={handleChange} defaultValue=''>
                    <TabsList>
                        <TabsTrigger value="index" className='cursor-pointer'>List</TabsTrigger>
                        <TabsTrigger value="trashed" className='cursor-pointer'>Deleted</TabsTrigger>
                        <TabsTrigger value="settings" className='cursor-pointer'>Setting</TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* Input + Button */}
                <div className="flex items-center gap-2">
                    <Input placeholder="Tìm kiếm..." className="w-64" />
                    <Button>Tìm</Button>
                </div>
            </div>
            <Card>
                <CardContent>
                    {children}
                </CardContent >
            </Card>
        </div>
    )
}
