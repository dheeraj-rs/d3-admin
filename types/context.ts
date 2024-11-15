import { ReactNode } from "react";

interface BottomBarState {
  isEnabled: boolean;
  isMobile: boolean;
  hoverStyle: "width" | "both" | null;
}

interface LayoutConfig {
  colorScheme: string;
  theme: string;
  scale: number;
  direction: "ltr" | "rtl";
}

interface MenuItem {
  label: string;
  icon: string;
  items?: MenuItem[];
  to?: string;
  badge?: string;
  url?: string;
  className?: string;
  preventExact?: boolean;
  target?: string;
}

interface LayoutState {
  isSidebarLeftVisible: boolean;
  isSidebarRightVisible: boolean;
  isNavbarFixed: boolean;
  isSidebarFixed: boolean;
  leftSidebarMode: "auto" | "mini" | "auto-default" | "default";
  rightSidebarMode: "auto" | "mini" | "auto-default" | "default";
  bottomBar: BottomBarState;
  isNotificationBarVisible: boolean;
  isMobileActive: boolean;
  isModalVisible: boolean;
  isSearchbarVisible: boolean;
  searchSidebarItems: MenuItem[];
  profileSidebarVisible: boolean;
}

interface LayoutProviderProps {
  children: ReactNode;
}

interface LayoutContextType {
  onConfigToggle: () => void;
  showProfileSidebar: boolean;
  onBottombarToggle: () => void;
  setMouseOverLabel: (label: string) => void;
  layoutState: LayoutConfig;
  layoutConfig: LayoutConfig;
  setLayoutConfig: React.Dispatch<React.SetStateAction<LayoutConfig>>;
  setLayoutState: React.Dispatch<React.SetStateAction<LayoutState>>;
  onMenuToggle: (sidebarType: string) => void;
  mouseOverLabel: string;
}

interface MenuProviderProps {
  children: ReactNode;
}

interface MenuContextType {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

export type {
  LayoutConfig,
  LayoutState,
  LayoutProviderProps,
  LayoutContextType,
  MenuProviderProps,
  MenuContextType,
};
