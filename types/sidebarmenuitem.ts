import { RefObject } from 'react';

// interface MenuItem {
//   label: string;
//   icon: string;
//   items?: MenuItem[];
//   to?: string;
//   badge?: string;
//   url?: string;
//   className?: string;
//   preventExact?: boolean;
//   target?: string;
// }

interface MenuItem {
    seperator?: boolean;
    label: string;
    icon?: string;
    to?: string;
    url?: string;
    items?: MenuItem[];
    visible?: boolean;
    disabled?: boolean;
    target?: string;
    className?: string;
    replaceUrl?: boolean;
    badgeClass?: string;
    command?: (args: { originalEvent: React.MouseEvent; item: MenuItem }) => void;
}

interface AppSidebarMenuItemProps {
    item: MenuItem;
    index: number;
    parentKey?: string;
    root?: boolean;
    className?: string;
}

interface AppSidebarSearchProps {
    searchbarRef: RefObject<HTMLDivElement>;
}

export type { MenuItem, AppSidebarSearchProps, AppSidebarMenuItemProps };
