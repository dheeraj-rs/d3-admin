/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import { classNames } from '@/lib/utils';
const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, onConfigToggle, onBottombarToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const toolbarbuttonRef = useRef(null);
    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
        toolbarbutton: toolbarbuttonRef.current
    }));

    return (
        <div className="layout-topbar">
            <div className="layout-topbar-main">
                <div className="topbar-header">
                    <nav className="breadcrumb">
                        <span className="breadcrumb-link">Pages</span> / Main Page
                    </nav>
                    <h1 className="title">Main Page</h1>
                </div>
                {/* <Link href="/" className="layout-topbar-logo">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} alt="logo" />
                <span>SAKAI</span>
            </Link> */}

                <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                    <i className="pi pi-bars" />
                </button>

                <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                    <i className="pi pi-ellipsis-v" />
                </button>

                <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                    <div className="layout-button-container">
                        <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                            {/* <i className="pi pi-bars" /> */}
                            <img src="/layout/layout-left-bar.svg" alt="logo" />
                        </button>
                        <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                            {/* <i className="pi pi-bars" /> */}
                            <img src="/layout/layout-top-bar.svg" alt="logo" />
                        </button>

                        <button type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onBottombarToggle}>
                            {/* <i className="pi pi-bars" /> */}
                            <img src="/layout/layout-bottom-bar.svg" alt="logo" />
                        </button>

                        <button ref={toolbarbuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onConfigToggle}>
                            {/* <i className="pi pi-bars" /> */}
                            <img src="/layout/layout-right-bar.svg" alt="logo" />
                        </button>
                    </div>
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
            <div className="layout-topbar-mini"></div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
