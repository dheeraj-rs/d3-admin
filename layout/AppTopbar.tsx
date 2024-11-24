import { classNames } from '@/lib/utils';
import { AppTopbarRef } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, onConfigToggle, onBottombarToggle, showProfileSidebar, onTopbarToggle } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const toolbarbuttonRef = useRef(null);
    const pathname = usePathname();
    const pathSegments = pathname?.split('/').filter(Boolean) || [];

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
        toolbarbutton: toolbarbuttonRef.current,
    }));

    return (
        <div className="layout-topbar">
            <div className="layout-topbar-mask" />
            <div className="layout-topbar-main">
                <div className="topbar-start">
                    <Link href="/" className="logo-row">
                        <Image
                            src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`}
                            width={40}
                            height={40}
                            alt="logo"
                            className="w-[2.5rem] h-[2.5rem]"
                        />
                        <span className="logo-text">D-Admin</span>
                    </Link>
                    <nav className="breadcrumb">
                        <Link href="/" className="breadcrumb-link">
                            Pages
                        </Link>
                        {pathSegments.map((segment, index) => (
                            <React.Fragment key={index}>
                                <span className="breadcrumb-separator">/</span>
                                <Link href={'/' + pathSegments.slice(0, index + 1).join('/')} className="breadcrumb-segment">
                                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                                </Link>
                            </React.Fragment>
                        ))}
                    </nav>
                </div>

                <div className="topbar-center">
                    <div className="topbar-message">
                        <i className="pi pi-bell" />
                        <span>You have 4 new messages</span>
                    </div>
                </div>

                <div className="topbar-end">
                    <div
                        className={classNames('layout-topbar-menu', {
                            'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible,
                        })}
                    >
                        <div className="layout-button-container">
                            <button type="button" className="p-link layout-topbar-button" onClick={onMenuToggle}>
                                <i className="pi pi-bars" />
                                <span>Menu</span>
                            </button>
                            <button type="button" className="p-link layout-topbar-button" onClick={onTopbarToggle}>
                                <i className="pi pi-window-maximize" />
                                <span>Header</span>
                            </button>
                            <button type="button" className="p-link layout-topbar-button" onClick={onBottombarToggle}>
                                <i className="pi pi-tablet" />
                                <span>Footer</span>
                            </button>
                            <button type="button" className="p-link layout-topbar-button" onClick={onConfigToggle}>
                                <i className="pi pi-sliders-h" />
                                <span>Settings</span>
                            </button>
                        </div>

                        <div className="topbar-actions">
                            <button type="button" className="p-link layout-topbar-button">
                                <i className="pi pi-calendar"></i>
                                <span>Calendar</span>
                            </button>
                            <button type="button" className="p-link layout-topbar-button">
                                <i className="pi pi-user"></i>
                                <span>Profile</span>
                            </button>
                            <Link href="/documentation">
                                <button type="button" className="p-link layout-topbar-button">
                                    <i className="pi pi-cog"></i>
                                    <span>Settings</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <button
                    ref={topbarmenubuttonRef}
                    type="button"
                    className="p-link layout-topbar-button layout-topbar-menu-button"
                    onMouseDown={showProfileSidebar}
                >
                    <i className="pi pi-ellipsis-v" />
                </button>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
