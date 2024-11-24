import { useEventListener } from '@/hooks';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { menuItems } from '@/public/demo/data/menuItems';
import { AppSearchProps, LayoutContextProps, SearchableItem, SearchConfig } from '@/types';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const DEFAULT_SEARCH_CONFIG: SearchConfig = {
    maxResults: 10,
    minSearchLength: 1,
    fuzzySearch: false,
    searchMode: 'advanced',
};

const AppMenuSearchbar = <T extends SearchableItem>({
    searchbarRef,
    sidebarRef,
    type = 'menu',
    items: propItems,
    searchConfig: userSearchConfig,
    placeholder = 'Search items...',
    onSearchResults = () => {},
}: AppSearchProps<T>) => {
    const searchSources = {
        menu: propItems || menuItems,
        pageContent: propItems || [],
    } as const;

    type SearchSourceType = keyof typeof searchSources;
    const items = searchSources[type as SearchSourceType];

    const searchConfig = useMemo(
        () => ({
            ...DEFAULT_SEARCH_CONFIG,
            ...userSearchConfig,
        }),
        [userSearchConfig]
    );

    const [searchTerm, setSearchTerm] = useState<string>('');
    const { setLayoutState, setLayoutConfig, layoutConfig } = useContext(LayoutContext) as LayoutContextProps;

    const detectSearchableKeys = useCallback((items: T[]): string[] => {
        if (!items?.length) return ['label'];
        const firstItem = items[0];
        return Object.keys(firstItem).filter((key) => typeof firstItem[key] === 'string' || typeof firstItem[key] === 'number');
    }, []);

    const filterItems = useCallback(
        (searchItems: T[], term: string): T[] => {
            if (!term || term.length < searchConfig.minSearchLength) return [];
            if (!searchItems?.length) return [];

            const searchableKeys = searchConfig.searchKeys || detectSearchableKeys(searchItems);
            const terms =
                searchConfig.searchMode === 'advanced'
                    ? term
                          .toLowerCase()
                          .match(/"[^"]+"|[^\s]+/g)
                          ?.map((t) => t.replace(/"/g, '')) || []
                    : [term.toLowerCase()];

            return searchItems
                .reduce<T[]>((filtered, item) => {
                    const matchesSearch = terms.every((termPart) => {
                        const fieldSearch = termPart.match(/^(\w+):(.+)$/);
                        if (fieldSearch && searchConfig.searchMode === 'advanced') {
                            const [, field, value] = fieldSearch;
                            return typeof item[field] === 'string' && item[field].toLowerCase().includes(value.toLowerCase());
                        }
                        return searchableKeys.some((key: keyof T) => {
                            const value = item[key];
                            if (value == null) return false;
                            const stringValue = String(value).toLowerCase();
                            if (searchConfig.fuzzySearch) {
                                return termPart.split('').every((char) => stringValue.includes(char.toLowerCase()));
                            }
                            return stringValue.includes(termPart);
                        });
                    });

                    const filteredChildren = item.items ? filterItems(item.items as T[], term) : [];

                    if (matchesSearch || filteredChildren.length > 0) {
                        const newItem = { ...item } as T;
                        if (filteredChildren.length > 0) {
                            newItem.items = filteredChildren;
                        }
                        return [...filtered, newItem];
                    }

                    return filtered;
                }, [])
                .slice(0, searchConfig.maxResults);
        },
        [searchConfig, detectSearchableKeys]
    );
    const clearTimeoutRef = useRef<NodeJS.Timeout>();

    const handleClear = useCallback(() => {
        setSearchTerm('');
        if (type === 'menu') {
            setLayoutState((prev) => ({
                ...prev,
                searchSidebarItems: [],
            }));
        } else {
            onSearchResults([]);
        }
    }, [type, setLayoutState, onSearchResults]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setSearchTerm(newValue);

            // Reset timeout when user is typing
            if (clearTimeoutRef.current) {
                clearTimeout(clearTimeoutRef.current);
            }

            const newResults = filterItems(items as T[], newValue);

            if (type === 'menu') {
                setLayoutState((prev) => ({
                    ...prev,
                    searchSidebarItems: newResults as any,
                }));
            } else {
                onSearchResults(newResults);
            }
        },
        [items, type, filterItems, setLayoutState, onSearchResults]
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                setLayoutConfig((prev) => ({
                    ...prev,
                    secretKey: searchTerm,
                }));
                console.log(searchTerm);
            } else if (e.key === 'Escape') {
                handleClear();
            }
        },
        [searchTerm, setLayoutConfig, handleClear]
    );

    const filteredItems = filterItems(items as T[], searchTerm);

    const hasResults = filteredItems?.length > 0;

    const iconClassName = `pi ${searchTerm && !hasResults ? 'pi-exclamation-triangle' : 'pi-search'}`;

    const iconStyle: React.CSSProperties | undefined = searchTerm && !hasResults ? { color: 'red' } : undefined;

    const [bindSearchOutsideClickListener, unbindSearchOutsideClickListener] = useEventListener({
        type: 'click',
        listener: (event) => {
            const isOutsideClicked = !(
                searchbarRef.current?.isSameNode(event.target as Node) ||
                searchbarRef.current?.contains(event.target as Node) ||
                sidebarRef?.current?.isSameNode(event.target as Node) ||
                sidebarRef?.current?.contains(event.target as Node)
            );

            if (isOutsideClicked && searchTerm) {
                handleClear();
            }
        },
    });

    useEffect(() => {
        if (searchTerm) {
            bindSearchOutsideClickListener();
        }
        return () => {
            unbindSearchOutsideClickListener();
        };
    }, [searchTerm, bindSearchOutsideClickListener, unbindSearchOutsideClickListener]);

    return (
        <>
            <div ref={searchbarRef} className="layout__searchbar">
                <div className="searchbar-container ">
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
                        <div className="icon" onDoubleClick={handleClear}>
                            <i className={iconClassName} style={iconStyle} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppMenuSearchbar;
