'use client';
import { ChildContainerProps, LayoutConfig, LayoutContextProps, LayoutState } from '@/types';
import { createContext, useState } from 'react';
export const LayoutContext = createContext({} as LayoutContextProps);

export const LayoutProvider = ({ children }: ChildContainerProps) => {
    const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
        ripple: false,
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'light',
        theme: 'lara-light-indigo',
        scale: 14,
        secretKey: '',
    });

    const [layoutState, setLayoutState] = useState<LayoutState>({
        staticMenuDesktopInactive: false,
        staticConfigDesktopInactive: false,
        staticBottombarDesktopInactive: false,
        overlayMenuActive: false,
        overlayConfigActive: false,
        overlayBottombarActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        topbarAutoHide: false,
        staticMenuMobileActive: false,
        staticConfigMobileActive: false,
        staticBottombarMobileActive: false,
        menuHoverActive: false,
        sidebarAutoOverlayActive: false,
        searchSidebarItems: [],
    });

    const onMenuToggle = () => {
        if (isOverlay()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, overlayMenuActive: !prevLayoutState.overlayMenuActive }));
        }

        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive }));
        } else {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive }));
        }
    };

    const onConfigToggle = () => {
        if (isOverlay()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, overlayConfigActive: !prevLayoutState.overlayConfigActive }));
        }

        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticConfigDesktopInactive: !prevLayoutState.staticConfigDesktopInactive }));
        } else {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticConfigMobileActive: !prevLayoutState.staticConfigMobileActive }));
        }
    };

    const onBottombarToggle = () => {
        if (isOverlay()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, overlayBottombarActive: !prevLayoutState.overlayBottombarActive }));
        }

        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticBottombarDesktopInactive: !prevLayoutState.staticBottombarDesktopInactive }));
        } else {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticBottombarMobileActive: !prevLayoutState.staticBottombarMobileActive }));
        }
    };

    const onTopbarToggle = () => {
        setLayoutState((prevLayoutState) => ({ ...prevLayoutState, topbarAutoHide: !prevLayoutState.topbarAutoHide }));
    };

    const onSidebarAutoOverlayToggle = () => {
        setLayoutState((prevLayoutState) => ({ ...prevLayoutState, sidebarAutoOverlayActive: !prevLayoutState.sidebarAutoOverlayActive }));
    };

    const showProfileSidebar = () => {
        setLayoutState((prevLayoutState) => ({ ...prevLayoutState, profileSidebarVisible: !prevLayoutState.profileSidebarVisible }));
    };

    const isOverlay = () => {
        return layoutConfig.menuMode === 'overlay';
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const value: LayoutContextProps = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        onMenuToggle,
        showProfileSidebar,
        onConfigToggle,
        onBottombarToggle,
        onTopbarToggle,
        onSidebarAutoOverlayToggle,
    };

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};
