/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useContext, useEffect, useRef } from 'react';
import AppFooter from './AppFooter';
import AppSidebar from './AppSidebar';
import AppTopbar from './AppTopbar';
import { LayoutContext } from './context/layoutcontext';
import { ChildContainerProps, LayoutState, AppTopbarRef } from '@/types';
import { usePathname, useSearchParams } from 'next/navigation';
import AppConfigbar from './AppConfigbar';
import { useEventListener, useUnmountEffect } from '@/hooks';
import { classNames } from '@/lib/utils';
import AppMenu from './AppMenu';
import Searchbar from './Searchbar';

const Layout = ({ children }: ChildContainerProps) => {
    const { layoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
    const topbarRef = useRef<AppTopbarRef>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const configbarRef = useRef<HTMLDivElement>(null);
    const bottombarRef = useRef<HTMLDivElement>(null);
    const searchbarRef = useRef<HTMLDivElement>(null);
    const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] = useEventListener({
        type: 'click',
        listener: (event) => {
            const isOutsideClicked = !(
                sidebarRef.current?.isSameNode(event.target as Node) ||
                sidebarRef.current?.contains(event.target as Node) ||
                configbarRef.current?.isSameNode(event.target as Node) ||
                configbarRef.current?.contains(event.target as Node) ||
                topbarRef.current?.menubutton?.isSameNode(event.target as Node) ||
                topbarRef.current?.menubutton?.contains(event.target as Node) ||
                topbarRef.current?.toolbarbutton?.isSameNode(event.target as Node) ||
                topbarRef.current?.toolbarbutton?.contains(event.target as Node)
            );

            if (isOutsideClicked) {
                hideMenu();
            }
        }
    });

    const pathname = usePathname();
    const searchParams = useSearchParams();
    useEffect(() => {
        hideMenu();
        hideProfileMenu();
    }, [pathname, searchParams]);

    const [bindProfileMenuOutsideClickListener, unbindProfileMenuOutsideClickListener] = useEventListener({
        type: 'click',
        listener: (event) => {
            const isOutsideClicked = !(
                topbarRef.current?.topbarmenu?.isSameNode(event.target as Node) ||
                topbarRef.current?.topbarmenu?.contains(event.target as Node) ||
                topbarRef.current?.topbarmenubutton?.isSameNode(event.target as Node) ||
                topbarRef.current?.topbarmenubutton?.contains(event.target as Node) ||
                topbarRef.current?.toolbarbutton?.isSameNode(event.target as Node) ||
                topbarRef.current?.toolbarbutton?.contains(event.target as Node)
            );

            if (isOutsideClicked) {
                hideProfileMenu();
            }
        }
    });

    const hideMenu = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            overlayMenuActive: false,
            overlayConfigActive: false,
            staticMenuMobileActive: false,
            staticConfigMobileActive: false,
            menuHoverActive: false
        }));
        unbindMenuOutsideClickListener();
        unblockBodyScroll();
    };

    const hideProfileMenu = () => {
        setLayoutState((prevLayoutState: LayoutState) => ({
            ...prevLayoutState,
            profileSidebarVisible: false
        }));
        unbindProfileMenuOutsideClickListener();
    };

    const blockBodyScroll = (): void => {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    };

    const unblockBodyScroll = (): void => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    useEffect(() => {
        if (layoutState.overlayMenuActive || layoutState.overlayConfigActive || layoutState.staticMenuMobileActive || layoutState.staticConfigMobileActive) {
            bindMenuOutsideClickListener();
        }

        layoutState.staticMenuMobileActive && blockBodyScroll();
        layoutState.staticConfigMobileActive && blockBodyScroll();
    }, [layoutState.overlayMenuActive, layoutState.overlayConfigActive, layoutState.staticMenuMobileActive, layoutState.staticConfigMobileActive]);

    useEffect(() => {
        if (layoutState.profileSidebarVisible) {
            bindProfileMenuOutsideClickListener();
        }
    }, [layoutState.profileSidebarVisible]);

    useUnmountEffect(() => {
        unbindMenuOutsideClickListener();
        unbindProfileMenuOutsideClickListener();
    });

    const sampleClass = 'layout-topbar-inactive toggle__sidebar-left layout__sidebar-static layout__sidebar-default-active layout-topbar-inactive3 bento-topbar-active bento-bottombar-active'


    const containerClass = classNames('layout-wrapper bento-topbar-active layout-topbar-inactive3', {
        'layout-overlay ': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-sidebar-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-static-config-inactive': layoutState.staticConfigDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-static-bottombar-inactive': layoutState.staticBottombarDesktopInactive,
        'layout-static-bottombar-mobile-active ': layoutState.staticBottombarMobileActive,
        'layout-overlay-sidebar-active': layoutState.overlayMenuActive,
        'layout-overlay-config-active': layoutState.overlayConfigActive,
        'layout-mobile-sidebar-active': layoutState.staticMenuMobileActive,
        'layout-mobile-active-right': layoutState.staticConfigMobileActive,
        'p-input-filled': layoutConfig.inputStyle === 'filled',
        'p-ripple-disabled': !layoutConfig.ripple
    });
    

    return (
        <React.Fragment>
            <div className={containerClass}>
                <AppTopbar ref={topbarRef} />
                <div ref={sidebarRef} className="layout-sidebar">
                    <AppMenu />
                </div>
                {/* <Searchbar searchbarRef={searchbarRef}  /> */}
                <div ref={configbarRef} className="layout-config">
                    <AppConfigbar />
                </div>
                <div className="layout-main-container">
                    <div className="layout-main">{children}</div>
                    <AppFooter />
                </div>

                <div ref={bottombarRef} className="layout-bottombar">
                    <div className="layout-bottombar-desktop" />
                    <div className="layout-bottombar-mobile" />
                </div>

                <div className="layout-mask"></div>
            </div>
        </React.Fragment>
    );
};

export default Layout;
