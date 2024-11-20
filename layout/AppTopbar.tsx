/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import { classNames } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, onConfigToggle, onBottombarToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const toolbarbuttonRef = useRef(null);
    const pathname = usePathname();

    const pathSegments = pathname?.split('/').filter(Boolean) || [];
    const currentPage = pathSegments[pathSegments.length - 1] || 'Home';
    const formattedPage = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
        toolbarbutton: toolbarbuttonRef.current
    }));

    return (
        <div className="layout-topbar">
            <div className="layout-topbar-main">
                <div className="topbar-start">
                    <Link href="/" className="logo-row">
                        <Image 
                            src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} 
                            width={45} 
                            height={45} 
                            alt="logo"
                        />
                        <span className="logo-text">D-Admin</span>
                    </Link>
                    <nav className="breadcrumb">
                        <Link href="/" className="breadcrumb-link">Pages</Link>
                        {pathSegments.map((segment, index) => (
                            <React.Fragment key={index}>
                                <span className="breadcrumb-separator">/</span>
                                <Link 
                                    href={'/' + pathSegments.slice(0, index + 1).join('/')}
                                    className="breadcrumb-segment"
                                >
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
                    <div className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                        <div className="layout-button-container">
                            <button type="button" className="p-link layout-topbar-button" onClick={onMenuToggle}>
                                <i className="pi pi-bars" />
                                <span>Left Menu</span>
                            </button>
                            <button type="button" className="p-link layout-topbar-button" onClick={onBottombarToggle}>
                                <i className="pi pi-bars" />
                                <span>Bottom Menu</span>
                            </button>
                            <button type="button" className="p-link layout-topbar-button" onClick={onConfigToggle}>
                                <i className="pi pi-bars" />
                                <span>Right Menu</span>
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
                        onClick={showProfileSidebar}
                    >
                        <i className="pi pi-ellipsis-v" />
                    </button>
            </div>
            <div className="layout-topbar-mask"/>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
