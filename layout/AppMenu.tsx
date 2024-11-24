import { menuItems } from '@/public/demo/data/menuItems';
import { AppMenuItem, LayoutContextProps } from '@/types';
import React, { useContext, useRef } from 'react';
import AppMenuitem from './AppMenuitem';
import AppMenuSearchbar from './AppMenuSearchbar';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';

const AppMenu = ({ sidebarRef }: { sidebarRef: React.RefObject<HTMLDivElement> }) => {
    const searchbarRef = useRef<HTMLDivElement>(null);

    const { layoutState } = useContext(LayoutContext as unknown as React.Context<LayoutContextProps>);

    const items: AppMenuItem[] = layoutState?.searchSidebarItems?.length ? layoutState.searchSidebarItems : menuItems;

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {items.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
                <AppMenuSearchbar searchbarRef={searchbarRef} sidebarRef={sidebarRef} />
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
