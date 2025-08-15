import { router, usePage } from "@inertiajs/react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useEffect, useState } from "react";
import { TabItem } from "@/types";

export function NavTabs({ tabs }: { tabs: TabItem[] }) {
    const { url } = usePage()
    const currentPath = url
    const [tab, setTab] = useState(currentPath)

    useEffect(() => {
        setTab(currentPath)
    }, [currentPath])

    const handleChange = (value: string) => {
        router.visit(`${value}`)
    }

    return (
        <>
            {tabs.length > 0 && (
                <Tabs value={tab} onValueChange={handleChange} defaultValue=''>
                    <TabsList>
                        {tabs.map((item, index) => (
                            <TabsTrigger key={index} value={item.href} className='cursor-pointer'>{item.title}</TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            )}
        </>
    )
}
