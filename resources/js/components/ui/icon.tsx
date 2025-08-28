import { cn } from '@/lib/utils';
import * as Icons from "lucide-react";
import { type LucideProps } from 'lucide-react';
import { LucideIcon as LucideIconType } from 'lucide-react';

type IconKey = keyof typeof Icons;

interface IconProps extends Omit<LucideProps, 'ref'> {
  iconNode: IconKey | LucideIconType;
  fallback?: LucideIconType;
}

export function Icon({ iconNode, className, fallback, ...props }: IconProps) {
  const ResolvedIcon: LucideIconType | undefined =
    typeof iconNode === 'string'
      ? (Icons[iconNode as IconKey] as LucideIconType | undefined)
      : iconNode;

  const IconComponent = ResolvedIcon ?? fallback ?? (Icons.CircleHelp as LucideIconType);

  return <IconComponent className={cn('h-4 w-4', className)} {...props} />;
}
