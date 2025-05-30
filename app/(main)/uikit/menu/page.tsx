'use client';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/Button/Button';
import { InputText } from '@/components/InputText/InputText';
import { BreadCrumb } from '@/components/Menu/BreadCrumb';
import { ContextMenu, ContextMenuRef } from '@/components/Menu/ContextMenu';
import { MegaMenu, MegaMenuItem } from '@/components/Menu/MegaMenu';
import { Menu, MenuRef } from '@/components/Menu/Menu';
import { Menubar } from '@/components/Menu/Menubar';
import { PanelMenu } from '@/components/Menu/PanelMenu';
import { Steps } from '@/components/Menu/Steps';
import { TabMenu } from '@/components/Menu/TabMenu';
import { TieredMenu } from '@/components/Menu/TieredMenu';

// Update the type to include the show method
interface ExtendedContextMenuRef extends ContextMenuRef {
    show: (event: React.MouseEvent) => void;
}

// Move the component definition to a separate client component
const MenuDemo = ({ children }: any) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const menu = useRef<MenuRef>(null);
    const contextMenu = useRef<ExtendedContextMenuRef>(null);
    const router = useRouter();
    const pathname = usePathname();

    const checkActiveIndex = useCallback(() => {
        const paths = pathname.split('/');
        const currentPath = paths[paths.length - 1];

        switch (currentPath) {
            case 'seat':
                setActiveIndex(1);
                break;
            case 'payment':
                setActiveIndex(2);
                break;
            case 'confirmation':
                setActiveIndex(3);
                break;
            default:
                break;
        }
    }, [pathname]);

    useEffect(() => {
        checkActiveIndex();
    }, [checkActiveIndex]);

    const nestedMenuitems = [
        {
            label: 'Customers',
            icon: 'pi pi-fw pi-table',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus',
                    items: [
                        {
                            label: 'Customer',
                            icon: 'pi pi-fw pi-plus',
                        },
                        {
                            label: 'Duplicate',
                            icon: 'pi pi-fw pi-copy',
                        },
                    ],
                },
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-user-edit',
                },
            ],
        },
        {
            label: 'Orders',
            icon: 'pi pi-fw pi-shopping-cart',
            items: [
                {
                    label: 'View',
                    icon: 'pi pi-fw pi-list',
                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-search',
                },
            ],
        },
        {
            label: 'Shipments',
            icon: 'pi pi-fw pi-envelope',
            items: [
                {
                    label: 'Tracker',
                    icon: 'pi pi-fw pi-compass',
                },
                {
                    label: 'Map',
                    icon: 'pi pi-fw pi-map-marker',
                },
                {
                    label: 'Manage',
                    icon: 'pi pi-fw pi-pencil',
                },
            ],
        },
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-fw pi-cog',
                },
                {
                    label: 'Billing',
                    icon: 'pi pi-fw pi-file',
                },
            ],
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-sign-out',
        },
    ];

    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [{ label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];

    const wizardItems = [
        { label: 'Personal', command: () => router.push('/uikit/menu') },
        { label: 'Seat', command: () => router.push('/uikit/menu/seat') },
        { label: 'Payment', command: () => router.push('/uikit/menu/payment') },
        {
            label: 'Confirmation',
            command: () => router.push('/uikit/menu/confirmation'),
        },
    ];

    const tieredMenuItems = [
        {
            label: 'Customers',
            icon: 'pi pi-fw pi-table',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus',
                    items: [
                        {
                            label: 'Customer',
                            icon: 'pi pi-fw pi-plus',
                        },
                        {
                            label: 'Duplicate',
                            icon: 'pi pi-fw pi-copy',
                        },
                    ],
                },
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-user-edit',
                },
            ],
        },
        {
            label: 'Orders',
            icon: 'pi pi-fw pi-shopping-cart',
            items: [
                {
                    label: 'View',
                    icon: 'pi pi-fw pi-list',
                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-search',
                },
            ],
        },
        {
            label: 'Shipments',
            icon: 'pi pi-fw pi-envelope',
            items: [
                {
                    label: 'Tracker',
                    icon: 'pi pi-fw pi-compass',
                },
                {
                    label: 'Map',
                    icon: 'pi pi-fw pi-map-marker',
                },
                {
                    label: 'Manage',
                    icon: 'pi pi-fw pi-pencil',
                },
            ],
        },
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-fw pi-cog',
                },
                {
                    label: 'Billing',
                    icon: 'pi pi-fw pi-file',
                },
            ],
        },
        {
            separator: true,
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-sign-out',
        },
    ];

    const overlayMenuItems = [
        {
            label: 'Save',
            icon: 'pi pi-save',
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh',
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
        },
        {
            separator: true,
        },
        {
            label: 'Home',
            icon: 'pi pi-home',
        },
    ];

    const menuitems = [
        {
            label: 'Customers',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                },
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-user-edit',
                },
            ],
        },
        {
            label: 'Orders',
            items: [
                {
                    label: 'View',
                    icon: 'pi pi-fw pi-list',
                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-search',
                },
            ],
        },
    ];

    const contextMenuItems = [
        {
            label: 'Save',
            icon: 'pi pi-save',
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh',
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
        },
        {
            separator: true,
        },
        {
            label: 'Options',
            icon: 'pi pi-cog',
        },
    ];

    const megamenuItems: MegaMenuItem[] = [
        {
            label: 'Fashion',
            icon: 'pi pi-fw pi-tag',
            items: [
                {
                    label: 'Woman',
                    items: [{ label: 'Woman Item' }, { label: 'Woman Item' }, { label: 'Woman Item' }],
                },
            ],
        },
        {
            label: 'Electronics',
            icon: 'pi pi-fw pi-desktop',
            items: [
                {
                    label: 'Computer',
                    items: [{ label: 'Computer Item' }, { label: 'Computer Item' }],
                },
                {
                    label: 'Camcorder',
                    items: [{ label: 'Camcorder Item' }, { label: 'Camcorder Item' }, { label: 'Camcorder Item' }],
                },
            ],
        },
        {
            label: 'Furniture',
            icon: 'pi pi-fw pi-image',
            items: [
                {
                    label: 'Living Room',
                    items: [{ label: 'Living Room Item' }, { label: 'Living Room Item' }],
                },
                {
                    label: 'Kitchen',
                    items: [{ label: 'Kitchen Item' }, { label: 'Kitchen Item' }, { label: 'Kitchen Item' }],
                },
                {
                    label: 'Bedroom',
                    items: [{ label: 'Bedroom Item' }, { label: 'Bedroom Item' }],
                },
                {
                    label: 'Outdoor',
                    items: [{ label: 'Outdoor Item' }, { label: 'Outdoor Item' }, { label: 'Outdoor Item' }],
                },
            ],
        },
        {
            label: 'Sports',
            icon: 'pi pi-fw pi-star',
            items: [
                {
                    label: 'Basketball',
                    items: [{ label: 'Basketball Item' }, { label: 'Basketball Item' }],
                },
                {
                    label: 'Football',
                    items: [{ label: 'Football Item' }, { label: 'Football Item' }, { label: 'Football Item' }],
                },
                {
                    label: 'Tennis',
                    items: [{ label: 'Tennis Item' }, { label: 'Tennis Item' }],
                },
            ],
        },
    ];

    const panelMenuitems = [
        {
            label: 'Customers',
            icon: 'pi pi-fw pi-table',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus',
                    items: [
                        {
                            label: 'Customer',
                            icon: 'pi pi-fw pi-plus',
                        },
                        {
                            label: 'Duplicate',
                            icon: 'pi pi-fw pi-copy',
                        },
                    ],
                },
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-user-edit',
                },
            ],
        },
        {
            label: 'Orders',
            icon: 'pi pi-fw pi-shopping-cart',
            items: [
                {
                    label: 'View',
                    icon: 'pi pi-fw pi-list',
                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-search',
                },
            ],
        },
        {
            label: 'Shipments',
            icon: 'pi pi-fw pi-envelope',
            items: [
                {
                    label: 'Tracker',
                    icon: 'pi pi-fw pi-compass',
                },
                {
                    label: 'Map',
                    icon: 'pi pi-fw pi-map-marker',
                },
                {
                    label: 'Manage',
                    icon: 'pi pi-fw pi-pencil',
                },
            ],
        },
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-fw pi-cog',
                },
                {
                    label: 'Billing',
                    icon: 'pi pi-fw pi-file',
                },
            ],
        },
    ];

    const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        menu.current?.toggle(event);
    };

    const onContextRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
        contextMenu.current?.show(event);
    };

    const menubarEndTemplate = () => {
        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="text" placeholder="Search" />
            </span>
        );
    };

    return (
        <div className="grid p-fluid">
            <div className="col-12">
                <div className="card">
                    <h5>Menubar</h5>
                    <Menubar model={nestedMenuitems} end={menubarEndTemplate}></Menubar>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <h5>Breadcrumb</h5>
                    <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
                </div>
            </div>

            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>Steps</h5>
                    <Steps model={wizardItems} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e)} readOnly={false} />
                    {pathname === '/uikit/menu' ? (
                        <div className="flex align-items-center py-5 px-3">
                            <i className="pi pi-fw pi-user mr-2 text-2xl" />
                            <p className="m-0 text-lg">Personal Component Content via Child Route</p>
                        </div>
                    ) : (
                        <>{children}</>
                    )}
                </div>
            </div>

            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>TabMenu</h5>
                    <TabMenu model={wizardItems} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e)} />
                    {pathname === '/uikit/menu' ? (
                        <div className="flex align-items-center py-5 px-3">
                            <i className="pi pi-fw pi-user mr-2 text-2xl" />
                            <p className="m-0 text-lg">Personal Component Content via Child Route</p>
                        </div>
                    ) : (
                        <>{children}</>
                    )}
                </div>
            </div>

            <div className="col-12 md:col-4">
                <div className="card">
                    <h5>Tiered Menu</h5>
                    <TieredMenu model={tieredMenuItems} />
                </div>
            </div>

            <div className="col-12 md:col-4">
                <div className="card">
                    <h5>Plain Menu</h5>
                    <Menu model={menuitems} />
                </div>
            </div>

            <div className="col-12 md:col-4">
                <div className="card">
                    <h5>Overlay Menu</h5>

                    <Menu ref={menu} model={overlayMenuItems} popup />
                    <Button type="button" label="Options" icon="pi pi-angle-down" onClick={toggleMenu} style={{ width: 'auto' }} />
                </div>

                <div className="card" onContextMenu={onContextRightClick}>
                    <h5>ContextMenu</h5>
                    Right click to display.
                    <ContextMenu ref={contextMenu} model={contextMenuItems} breakpoint="767px" />
                </div>
            </div>

            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>MegaMenu - Horizontal</h5>
                    <MegaMenu model={megamenuItems} breakpoint="767px" />

                    <h5 style={{ marginTop: '1.55em' }}>MegaMenu - Vertical</h5>
                    <MegaMenu model={megamenuItems} orientation="vertical" breakpoint="767px" />
                </div>
            </div>

            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>PanelMenu</h5>
                    <PanelMenu model={panelMenuitems} />
                </div>
            </div>
        </div>
    );
};

export default MenuDemo;
