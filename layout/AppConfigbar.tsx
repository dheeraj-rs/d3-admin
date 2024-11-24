'use client';
import Slider from '@/components/Slider/Slider';
import { ThemeManager } from '@/lib/ThemeManager';
import { classNames } from '@/lib/utils';
import { useContext, useEffect, useState } from 'react';
import { AppConfigProps, LayoutConfig, LayoutState } from '../types/layout';
import { LayoutContext } from './context/layoutcontext';

const AppConfigbar = (props: AppConfigProps) => {
    const [scales] = useState([10, 11, 12, 13, 14, 15, 16]);
    const { layoutConfig, setLayoutConfig, setLayoutState, layoutState, onSidebarAutoOverlayToggle } = useContext(LayoutContext);

    useEffect(() => {
        setLayoutState((prevState: LayoutState) => ({
            ...prevState,
            configSidebarVisible: true,
        }));
    }, [setLayoutState]);

    const changeInputStyle = (e: { value: string }) => {
        setLayoutConfig((prevState: LayoutConfig) => ({
            ...prevState,
            inputStyle: e.value,
        }));
    };

    const changeRipple = (e: { value: boolean }) => {
        ThemeManager.ripple = e.value;
        setLayoutConfig((prevState: LayoutConfig) => ({
            ...prevState,
            ripple: e.value,
        }));
    };

    const changeMenuMode = (e: { value: string }) => {
        setLayoutConfig((prevState: LayoutConfig) => ({
            ...prevState,
            menuMode: e.value,
        }));
    };

    const changeTheme = (theme: string, colorScheme: string) => {
        ThemeManager.changeTheme?.(layoutConfig.theme, theme, 'theme-css', () => {
            setLayoutConfig((prevState: LayoutConfig) => ({
                ...prevState,
                theme,
                colorScheme,
            }));
        });
    };

    useEffect(() => {
        document.documentElement.style.fontSize = layoutConfig.scale + 'px';
    }, [layoutConfig.scale]);

    const RippleToggle = () => {
        const { layoutConfig, setLayoutConfig } = useContext(LayoutContext);
        const toggleRipple = () => {
            const newValue = !layoutConfig.ripple;
            ThemeManager.ripple = newValue;
            setLayoutConfig((prevState: LayoutConfig) => ({
                ...prevState,
                ripple: newValue,
            }));
        };

        return (
            <div className="ripple-toggle">
                <button className={`toggle-button ${layoutConfig.ripple ? 'active' : ''}`} onClick={toggleRipple} title="Toggle Ripple Effect">
                    <i className="pi pi-circle-fill ripple-icon"></i>
                    <span>Ripple</span>
                </button>
            </div>
        );
    };

    const ThemeButton = ({ theme, colorScheme, image, alt }: { theme: string; colorScheme: 'light' | 'dark'; image: string; alt: string }) => (
        <button className={`theme-button ${colorScheme}`} onClick={() => changeTheme(theme, colorScheme)} title={alt}>
            <img src={image} alt={alt} />
            <div className="theme-overlay">
                <i className="pi pi-check"></i>
            </div>
        </button>
    );

    const ThemeCategory = ({
        title,
        themes,
    }: {
        title: string;
        themes: Array<{ theme: string; colorScheme: 'light' | 'dark'; image: string; alt: string }>;
    }) => (
        <div className="theme-category">
            <h6>{title}</h6>
            <div className="theme-grid">
                {themes.map((theme) => (
                    <ThemeButton key={theme.theme} {...theme} />
                ))}
            </div>
        </div>
    );

    return (
        <>
            <div className="scale-control">
                <div className="scale-header">
                    <h5>Scale</h5>
                    <span className="scale-value">{layoutConfig.scale}px</span>
                </div>
                <div className="slider-container">
                    <Slider
                        value={layoutConfig.scale}
                        onChange={(e) => {
                            setLayoutConfig((prevState: LayoutConfig) => ({
                                ...prevState,
                                scale: e.value as number,
                            }));
                        }}
                        min={scales[0]}
                        max={scales[scales.length - 1]}
                        step={1}
                    />
                    <div className="scale-markers">
                        {scales.map((scale) => (
                            <div
                                key={scale}
                                className={classNames('marker', {
                                    active: scale === layoutConfig.scale,
                                })}
                                onClick={() => {
                                    setLayoutConfig((prevState: LayoutConfig) => ({
                                        ...prevState,
                                        scale: scale,
                                    }));
                                }}
                            >
                                <span className="dot"></span>
                                <span className="label">{scale}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <h5 className="config-title">Menu Type</h5>
            <div className="menu-type-selector">
                <button
                    className={`menu-type-btn ${layoutConfig.menuMode === 'static' ? 'active' : ''}`}
                    onClick={() => changeMenuMode({ value: 'static' })}
                    title="Static Menu"
                >
                    <i className="pi pi-lock"></i>
                    <span>Static</span>
                </button>
                <button
                    className={`menu-type-btn ${layoutConfig.menuMode === 'overlay' ? 'active' : ''}`}
                    onClick={() => changeMenuMode({ value: 'overlay' })}
                    title="Overlay Menu"
                >
                    <i className="pi pi-bars"></i>
                    <span>Overlay</span>
                </button>
            </div>

            {layoutConfig.menuMode === 'static' && (
                <>
                    <h5>Menu Mode</h5>
                    <div className="menu-mode-selector">
                        <button
                            className={classNames('mode-button', {
                                active: !layoutState.sidebarAutoOverlayActive,
                            })}
                            onClick={() => onSidebarAutoOverlayToggle()}
                        >
                            <i className="pi pi-arrows-alt"></i>
                            <span>Default</span>
                        </button>
                        <button
                            className={classNames('mode-button', {
                                active: layoutState.sidebarAutoOverlayActive,
                            })}
                            onClick={() => onSidebarAutoOverlayToggle()}
                        >
                            <i className="pi pi-sync"></i>
                            <span>Auto</span>
                        </button>
                    </div>
                </>
            )}

            <h5>Input Style</h5>
            <div className="input-style-selector">
                <button
                    className={`style-button ${layoutConfig.inputStyle === 'outlined' ? 'active' : ''}`}
                    onClick={() => changeInputStyle({ value: 'outlined' })}
                    title="Outlined Input Style"
                >
                    <i className="pi pi-circle-off"></i>
                    <span>Outlined</span>
                </button>
                <button
                    className={`style-button ${layoutConfig.inputStyle === 'filled' ? 'active' : ''}`}
                    onClick={() => changeInputStyle({ value: 'filled' })}
                    title="Filled Input Style"
                >
                    <i className="pi pi-circle-fill"></i>
                    <span>Filled</span>
                </button>
            </div>

            <h5>Ripple Effect</h5>
            <RippleToggle />

            <h5>Themes</h5>
            <ThemeCategory
                title="Bootstrap"
                themes={[
                    {
                        theme: 'bootstrap4-light-blue',
                        colorScheme: 'light',
                        image: '/layout/images/themes/bootstrap4-light-blue.svg',
                        alt: 'Bootstrap Light Blue',
                    },
                    {
                        theme: 'bootstrap4-light-purple',
                        colorScheme: 'light',
                        image: '/layout/images/themes/bootstrap4-light-purple.svg',
                        alt: 'Bootstrap Light Purple',
                    },
                    { theme: 'bootstrap4-dark-blue', colorScheme: 'dark', image: '/layout/images/themes/bootstrap4-dark-blue.svg', alt: 'Bootstrap Dark Blue' },
                    {
                        theme: 'bootstrap4-dark-purple',
                        colorScheme: 'dark',
                        image: '/layout/images/themes/bootstrap4-dark-purple.svg',
                        alt: 'Bootstrap Dark Purple',
                    },
                ]}
            />
            <ThemeCategory
                title="Material Design"
                themes={[
                    { theme: 'md-light-indigo', colorScheme: 'light', image: '/layout/images/themes/md-light-indigo.svg', alt: 'Material Light Indigo' },
                    {
                        theme: 'md-light-deeppurple',
                        colorScheme: 'light',
                        image: '/layout/images/themes/md-light-deeppurple.svg',
                        alt: 'Material Light DeepPurple',
                    },
                    { theme: 'md-dark-indigo', colorScheme: 'dark', image: '/layout/images/themes/md-dark-indigo.svg', alt: 'Material Dark Indigo' },
                    {
                        theme: 'md-dark-deeppurple',
                        colorScheme: 'dark',
                        image: '/layout/images/themes/md-dark-deeppurple.svg',
                        alt: 'Material Dark DeepPurple',
                    },
                ]}
            />
            <ThemeCategory
                title="Material Design Compact"
                themes={[
                    { theme: 'mdc-light-indigo', colorScheme: 'light', image: '/layout/images/themes/md-light-indigo.svg', alt: 'Material Light Indigo' },
                    {
                        theme: 'mdc-light-deeppurple',
                        colorScheme: 'light',
                        image: '/layout/images/themes/md-light-deeppurple.svg',
                        alt: 'Material Light Deep Purple',
                    },
                    { theme: 'mdc-dark-indigo', colorScheme: 'dark', image: '/layout/images/themes/md-dark-indigo.svg', alt: 'Material Dark Indigo' },
                    {
                        theme: 'mdc-dark-deeppurple',
                        colorScheme: 'dark',
                        image: '/layout/images/themes/md-dark-deeppurple.svg',
                        alt: 'Material Dark Deep Purple',
                    },
                ]}
            />
            <ThemeCategory
                title="Tailwind"
                themes={[{ theme: 'tailwind-light', colorScheme: 'light', image: '/layout/images/themes/tailwind-light.png', alt: 'Tailwind Light' }]}
            />
            <ThemeCategory
                title="Fluent UI"
                themes={[{ theme: 'fluent-light', colorScheme: 'light', image: '/layout/images/themes/fluent-light.png', alt: 'Fluent Light' }]}
            />
            <ThemeCategory
                title="PrimeOne Design - 2022"
                themes={[
                    { theme: 'lara-light-indigo', colorScheme: 'light', image: '/layout/images/themes/lara-light-indigo.png', alt: 'Lara Light Indigo' },
                    { theme: 'lara-light-blue', colorScheme: 'light', image: '/layout/images/themes/lara-light-blue.png', alt: 'Lara Light Blue' },
                    { theme: 'lara-light-purple', colorScheme: 'light', image: '/layout/images/themes/lara-light-purple.png', alt: 'Lara Light Purple' },
                    { theme: 'lara-light-teal', colorScheme: 'light', image: '/layout/images/themes/lara-light-teal.png', alt: 'Lara Light Teal' },
                    { theme: 'lara-dark-indigo', colorScheme: 'dark', image: '/layout/images/themes/lara-dark-indigo.png', alt: 'Lara Dark Indigo' },
                    { theme: 'lara-dark-blue', colorScheme: 'dark', image: '/layout/images/themes/lara-dark-blue.png', alt: 'Lara Dark Blue' },
                    { theme: 'lara-dark-purple', colorScheme: 'dark', image: '/layout/images/themes/lara-dark-purple.png', alt: 'Lara Dark Purple' },
                    { theme: 'lara-dark-teal', colorScheme: 'dark', image: '/layout/images/themes/lara-dark-teal.png', alt: 'Lara Dark Teal' },
                ]}
            />
            <ThemeCategory
                title="PrimeOne Design - 2021"
                themes={[
                    { theme: 'saga-blue', colorScheme: 'light', image: '/layout/images/themes/saga-blue.png', alt: 'Saga Blue' },
                    { theme: 'saga-green', colorScheme: 'light', image: '/layout/images/themes/saga-green.png', alt: 'Saga Green' },
                    { theme: 'saga-orange', colorScheme: 'light', image: '/layout/images/themes/saga-orange.png', alt: 'Saga Orange' },
                    { theme: 'saga-purple', colorScheme: 'light', image: '/layout/images/themes/saga-purple.png', alt: 'Saga Purple' },
                    { theme: 'vela-blue', colorScheme: 'dark', image: '/layout/images/themes/vela-blue.png', alt: 'Vela Blue' },
                    { theme: 'vela-green', colorScheme: 'dark', image: '/layout/images/themes/vela-green.png', alt: 'Vela Green' },
                    { theme: 'vela-orange', colorScheme: 'dark', image: '/layout/images/themes/vela-orange.png', alt: 'Vela Orange' },
                    { theme: 'vela-purple', colorScheme: 'dark', image: '/layout/images/themes/vela-purple.png', alt: 'Vela Purple' },
                    { theme: 'arya-blue', colorScheme: 'dark', image: '/layout/images/themes/arya-blue.png', alt: 'Arya Blue' },
                    { theme: 'arya-green', colorScheme: 'dark', image: '/layout/images/themes/arya-green.png', alt: 'Arya Green' },
                    { theme: 'arya-orange', colorScheme: 'dark', image: '/layout/images/themes/arya-orange.png', alt: 'Arya Orange' },
                    { theme: 'arya-purple', colorScheme: 'dark', image: '/layout/images/themes/arya-purple.png', alt: 'Arya Purple' },
                ]}
            />
        </>
    );
};

export default AppConfigbar;
