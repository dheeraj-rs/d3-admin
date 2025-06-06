import { AppMenuItem } from '@/types';

export const menuItems: AppMenuItem[] = [
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }],
    },
    {
        label: 'Element',
        items: [
            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
            { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
            { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
            { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
            { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
            { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
            { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
            { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
            { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
            { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
            { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' },
        ],
    },
    {
        label: 'Blocks',
        items: [
            { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
            { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://blocks.d-admin.org', target: '_blank' },
        ],
    },
    {
        label: 'Utils',
        items: [
            { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
            { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://d-admin.org/', target: '_blank' },
        ],
    },
    {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            {
                label: 'Landing',
                icon: 'pi pi-fw pi-globe',
                to: '/landing',
            },
            {
                label: 'Auth',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-sign-in',
                        to: '/auth/login',
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        to: '/auth/error',
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/access',
                    },
                ],
            },
            {
                label: 'Crud',
                icon: 'pi pi-fw pi-pencil',
                to: '/pages/crud',
            },
            {
                label: 'Timeline',
                icon: 'pi pi-fw pi-calendar',
                to: '/pages/timeline',
            },
            {
                label: 'Not Found',
                icon: 'pi pi-fw pi-exclamation-circle',
                to: '/pages/notfound',
            },
            {
                label: 'Empty',
                icon: 'pi pi-fw pi-circle-off',
                to: '/pages/empty',
            },
        ],
    },
    {
        label: 'Tree',
        items: [
            {
                label: 'Submenu 1',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 1.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                        ],
                    },
                    {
                        label: 'Submenu 1.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }],
                    },
                ],
            },
            {
                label: 'Submenu 2',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 2.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                        ],
                    },
                    {
                        label: 'Submenu 2.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }],
                    },
                ],
            },
        ],
    },
    {
        label: 'Started',
        items: [
            {
                label: 'Documentation',
                icon: 'pi pi-fw pi-question',
                to: '/documentation',
            },
            {
                label: 'Figma',
                url: 'https://www.dheerajrs.com/',
                icon: 'pi pi-fw pi-pencil',
                target: '_blank',
            },
            {
                label: 'View Source',
                icon: 'pi pi-fw pi-search',
                url: 'https://github.com/dheeraj-rs',
                target: '_blank',
            },
        ],
    },
];
