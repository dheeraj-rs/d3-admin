/* eslint-disable react/display-name */
import React, {
  useState,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { LayoutContextProps } from "@/types";
import { menuItems } from "@/public/demo/data/menuItems";

interface SearchableItem {
  label: string;
  items?: SearchableItem[];
  [key: string]: any;
}

interface SearchConfig {
  searchKeys?: string[];
  maxResults: number;
  minSearchLength: number;
  fuzzySearch?: boolean;
  searchMode?: 'simple' | 'advanced';
}

// Add default search configuration
const DEFAULT_SEARCH_CONFIG: SearchConfig = {
  maxResults: 10,
  minSearchLength: 1,
  fuzzySearch: false,
  // searchMode: 'simple'  
  searchMode: 'advanced'
};

interface AppSearchProps<T extends SearchableItem> {
  searchbarRef: React.RefObject<HTMLDivElement>;
  type?: 'menu' | 'pageContent';
  items?: T[];
  onSearchResults?: (results: T[]) => void;
  searchConfig?: Partial<SearchConfig>;
  placeholder?: string;
}

const Searchbar = <T extends SearchableItem>({
  searchbarRef,
  type = 'menu',
  items: propItems,
  searchConfig: userSearchConfig,
  placeholder = "Search items...",
  onSearchResults = () => {}
}: AppSearchProps<T>) => {
  
  // Merge default sources with provided items
  const searchSources = {
    menu: propItems || menuItems,
    pageContent: propItems || []
  };

  // Merge search configurations
  const searchConfig = useMemo(() => ({
    ...DEFAULT_SEARCH_CONFIG,
    ...userSearchConfig
  }), [userSearchConfig]);

  const items = searchSources[type];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const { setLayoutState, setLayoutConfig, layoutConfig } = 
    useContext(LayoutContext) as LayoutContextProps;

  // Auto-detect searchable keys from the first item
  const detectSearchableKeys = useCallback((items: T[]): string[] => {
    if (!items?.length) return ['label'];
    const firstItem = items[0];
    return Object.keys(firstItem).filter(key => 
      typeof firstItem[key] === 'string' || 
      typeof firstItem[key] === 'number'
    );
  }, []);

  const filterItems = useCallback(
    (searchItems: T[], term: string): T[] => {
      if (!term || term.length < searchConfig.minSearchLength) return [];
      if (!searchItems?.length) return [];

      const searchableKeys = searchConfig.searchKeys || detectSearchableKeys(searchItems);
      const terms = searchConfig.searchMode === 'advanced' 
        ? term.toLowerCase().match(/"[^"]+"|[^\s]+/g)?.map(t => t.replace(/"/g, '')) || []
        : [term.toLowerCase()];

      return searchItems.reduce<T[]>((filtered, item) => {
        const matchesSearch = terms.every(termPart => {
          // Check if it's a field-specific search (field:value)
          const fieldSearch = termPart.match(/^(\w+):(.+)$/);
          
          if (fieldSearch && searchConfig.searchMode === 'advanced') {
            const [, field, value] = fieldSearch;
            return typeof item[field] === 'string' && 
                   item[field].toLowerCase().includes(value.toLowerCase());
          }

          // Regular search across all searchable keys
          return searchableKeys.some(key => {
            const value = item[key];
            if (value == null) return false;
            
            const stringValue = String(value).toLowerCase();
            if (searchConfig.fuzzySearch) {
              // Simple fuzzy matching
              return termPart.split('').every(char => 
                stringValue.includes(char.toLowerCase())
              );
            }
            return stringValue.includes(termPart);
          });
        });

        const filteredChildren = item.items
          ? filterItems(item.items as T[], term)
          : [];

        if (matchesSearch || filteredChildren.length > 0) {
          const newItem = { ...item } as T;
          if (filteredChildren.length > 0) {
            newItem.items = filteredChildren;
          }
          return [...filtered, newItem];
        }

        return filtered;
      }, []).slice(0, searchConfig.maxResults);
    },
    [searchConfig, detectSearchableKeys]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setSearchTerm(newValue);
      
      const newResults = filterItems(items as T[], newValue);
      
      if (type === 'menu') {
        setLayoutState((prev) => ({
          ...prev,
          searchSidebarItems: newResults as any
        }));
      } else {
        onSearchResults(newResults);
      }
    },
    [items, type, filterItems, setLayoutState, onSearchResults]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setLayoutConfig((prev) => ({
          ...prev,
          secretKey: searchTerm
        }));
        console.log( searchTerm);
      }
    },
    [searchTerm, setLayoutConfig]
  );

  const filteredItems = filterItems(items as T[], searchTerm);

  const hasResults = filteredItems?.length > 0;

  const iconClassName = `pi ${
    searchTerm && !hasResults ? "pi-exclamation-triangle" : "pi-search"
  }`;

  const iconStyle: React.CSSProperties | undefined =
    searchTerm && !hasResults ? { color: "red" } : undefined;

  return (
    <>
    <div ref={searchbarRef} className="layout__searchbar">
      <div className="searchbar-container">
        <input
          type="text"
          className="searchbar-input"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          spellCheck="false"
        />
      
      
 
     
      
        
        <div className="icon-container">

      
          <div className="icon">
            <i className={iconClassName} style={iconStyle} />
          </div>
        </div>
        <i className="pi pi-times clear-icon" />

      </div>

      
      
    </div>
    
    </>
  );
}

export default Searchbar;
