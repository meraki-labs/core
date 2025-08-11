import { cn } from '@/lib/utils';
import { type LucideProps } from 'lucide-react';
import { type ComponentType } from 'react';
import * as Icons from "lucide-react";
import { LucideIcon } from 'lucide-react';

interface IconProps extends Omit<LucideProps, 'ref'> {
    iconNode: ComponentType<LucideProps>;
}

export function Icon({ iconNode: IconComponent, className, ...props }: IconProps) {
    return <IconComponent className={cn('h-4 w-4', className)} {...props} />;
}

export function getLucideIcon(name?: string | LucideIcon): LucideIcon {
    const Icon = Icons[name as keyof typeof Icons] as LucideIcon;
    return Icon || Icons.CircleHelp;
}
