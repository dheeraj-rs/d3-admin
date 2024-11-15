'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { AppConfigProps, LayoutConfig, LayoutState } from '../types/layout';
import { LayoutContext } from './context/layoutcontext';
import { classNames } from '@/lib/utils';
import CustomPrime from '@/lib/CustomPrimeAPI';
import { Button } from '@/components/Button/Button';
import RadioButton from '@/components/RadioButton/RadioButton';
import InputSwitch from '@/components/InputSwitch/InputSwitch';

const AppConfigbar = (props: AppConfigProps) => {
    const [scales] = useState([12, 13, 14, 15, 16]);
    const { layoutConfig, setLayoutConfig, setLayoutState } = useContext(LayoutContext);
    useEffect(() => {
        setLayoutState((prevState: LayoutState) => ({
            ...prevState,
            configSidebarVisible: true
        }));
    }, []);

    const changeInputStyle = (e: { value: string }) => {
        setLayoutConfig((prevState: LayoutConfig) => ({
            ...prevState,
            inputStyle: e.value
        }));
    };

    const changeRipple = (e: { value: boolean }) => {
        CustomPrime.ripple = e.value;
        setLayoutConfig((prevState: LayoutConfig) => ({
            ...prevState,
            ripple: e.value
        }));
    };

    const changeMenuMode = (e: { value: string }) => {
        setLayoutConfig((prevState: LayoutConfig) => ({
            ...prevState,
            menuMode: e.value
        }));
    };

    const changeTheme = (theme: string, colorScheme: string) => {
        CustomPrime.changeTheme?.(layoutConfig.theme, theme, 'theme-css', () => {
            setLayoutConfig((prevState: LayoutConfig) => ({
                ...prevState,
                theme,
                colorScheme
            }));
        });
    };

    const decrementScale = () => {
        setLayoutConfig((prevState: LayoutConfig) => ({
            ...prevState,
            scale: prevState.scale - 1
        }));
    };

    const incrementScale = () => {
        setLayoutConfig((prevState: LayoutConfig) => ({
            ...prevState,
            scale: prevState.scale + 1
        }));
    };

    const applyScale = () => {
        document.documentElement.style.fontSize = layoutConfig.scale + 'px';
    };

    useEffect(() => {
        applyScale();
    }, [layoutConfig.scale]);

    return (
        <>
            <h5>Scale</h5>
            <div className="flex align-items-center">
                <Button icon="pi pi-minus" type="button" onClick={decrementScale} rounded text className="w-2rem h-2rem mr-2" disabled={layoutConfig.scale === scales[0]}></Button>
                <div className="flex gap-2 align-items-center">
                    {scales.map((item) => {
                        return (
                            <i
                                className={classNames('pi pi-circle-fill', {
                                    'text-primary-500': item === layoutConfig.scale,
                                    'text-300': item !== layoutConfig.scale
                                })}
                                key={item}
                            ></i>
                        );
                    })}
                </div>
                <Button icon="pi pi-plus" type="button" onClick={incrementScale} rounded text className="w-2rem h-2rem ml-2" disabled={layoutConfig.scale === scales[scales.length - 1]}></Button>
            </div>

            <h5>Menu Type</h5>
            <div className="flex">
                <div className="field-radiobutton flex-1">
                    <RadioButton name="menuMode" value={'static'} checked={layoutConfig.menuMode === 'static'} onChange={(e) => changeMenuMode(e)} inputId="mode1"></RadioButton>
                    <label htmlFor="mode1">Static</label>
                </div>
                <div className="field-radiobutton flex-1">
                    <RadioButton name="menuMode" value={'overlay'} checked={layoutConfig.menuMode === 'overlay'} onChange={(e) => changeMenuMode(e)} inputId="mode2"></RadioButton>
                    <label htmlFor="mode2">Overlay</label>
                </div>
            </div>

            <h5>Input Style</h5>
            <div className="flex">
                <div className="field-radiobutton flex-1">
                    <RadioButton name="inputStyle" value={'outlined'} checked={layoutConfig.inputStyle === 'outlined'} onChange={(e) => changeInputStyle(e)} inputId="outlined_input"></RadioButton>

                    <label htmlFor="outlined_input">Outlined</label>
                </div>
                <div className="field-radiobutton flex-1">
                    <RadioButton name="inputStyle" value={'filled'} checked={layoutConfig.inputStyle === 'filled'} onChange={(e) => changeInputStyle(e)} inputId="filled_input"></RadioButton>
                    <label htmlFor="filled_input">Filled</label>
                </div>
            </div>

            <button className="p-ripple">add new</button>

            <h5>Ripple Effect</h5>
            <InputSwitch checked={layoutConfig.ripple as boolean} value={layoutConfig.ripple as boolean} onChange={(e) => changeRipple(e)}></InputSwitch>

            <h5>Bootstrap</h5>
            <div className="grid">
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('bootstrap4-light-blue', 'light')}>
                        <img src="/layout/images/themes/bootstrap4-light-blue.svg" className="w-2rem h-2rem" alt="Bootstrap Light Blue" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('bootstrap4-light-purple', 'light')}>
                        <img src="/layout/images/themes/bootstrap4-light-purple.svg" className="w-2rem h-2rem" alt="Bootstrap Light Purple" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('bootstrap4-dark-blue', 'dark')}>
                        <img src="/layout/images/themes/bootstrap4-dark-blue.svg" className="w-2rem h-2rem" alt="Bootstrap Dark Blue" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('bootstrap4-dark-purple', 'dark')}>
                        <img src="/layout/images/themes/bootstrap4-dark-purple.svg" className="w-2rem h-2rem" alt="Bootstrap Dark Purple" />
                    </button>
                </div>
            </div>

            <h5>Material Design</h5>
            <div className="grid">
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('md-light-indigo', 'light')}>
                        <img src="/layout/images/themes/md-light-indigo.svg" className="w-2rem h-2rem" alt="Material Light Indigo" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('md-light-deeppurple', 'light')}>
                        <img src="/layout/images/themes/md-light-deeppurple.svg" className="w-2rem h-2rem" alt="Material Light DeepPurple" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('md-dark-indigo', 'dark')}>
                        <img src="/layout/images/themes/md-dark-indigo.svg" className="w-2rem h-2rem" alt="Material Dark Indigo" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('md-dark-deeppurple', 'dark')}>
                        <img src="/layout/images/themes/md-dark-deeppurple.svg" className="w-2rem h-2rem" alt="Material Dark DeepPurple" />
                    </button>
                </div>
            </div>

            <h5>Material Design Compact</h5>
            <div className="grid">
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('mdc-light-indigo', 'light')}>
                        <img src="/layout/images/themes/md-light-indigo.svg" className="w-2rem h-2rem" alt="Material Light Indigo" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('mdc-light-deeppurple', 'light')}>
                        <img src="/layout/images/themes/md-light-deeppurple.svg" className="w-2rem h-2rem" alt="Material Light Deep Purple" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('mdc-dark-indigo', 'dark')}>
                        <img src="/layout/images/themes/md-dark-indigo.svg" className="w-2rem h-2rem" alt="Material Dark Indigo" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('mdc-dark-deeppurple', 'dark')}>
                        <img src="/layout/images/themes/md-dark-deeppurple.svg" className="w-2rem h-2rem" alt="Material Dark Deep Purple" />
                    </button>
                </div>
            </div>

            <h5>Tailwind</h5>
            <div className="grid">
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('tailwind-light', 'light')}>
                        <img src="/layout/images/themes/tailwind-light.png" className="w-2rem h-2rem" alt="Tailwind Light" />
                    </button>
                </div>
            </div>

            <h5>Fluent UI</h5>
            <div className="grid">
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('fluent-light', 'light')}>
                        <img src="/layout/images/themes/fluent-light.png" className="w-2rem h-2rem" alt="Fluent Light" />
                    </button>
                </div>
            </div>

            <h5>PrimeOne Design - 2022</h5>
            <div className="grid">
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('lara-light-indigo', 'light')}>
                        <img src="/layout/images/themes/lara-light-indigo.png" className="w-2rem h-2rem" alt="Lara Light Indigo" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('lara-light-blue', 'light')}>
                        <img src="/layout/images/themes/lara-light-blue.png" className="w-2rem h-2rem" alt="Lara Light Blue" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('lara-light-purple', 'light')}>
                        <img src="/layout/images/themes/lara-light-purple.png" className="w-2rem h-2rem" alt="Lara Light Purple" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('lara-light-teal', 'light')}>
                        <img src="/layout/images/themes/lara-light-teal.png" className="w-2rem h-2rem" alt="Lara Light Teal" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('lara-dark-indigo', 'dark')}>
                        <img src="/layout/images/themes/lara-dark-indigo.png" className="w-2rem h-2rem" alt="Lara Dark Indigo" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('lara-dark-blue', 'dark')}>
                        <img src="/layout/images/themes/lara-dark-blue.png" className="w-2rem h-2rem" alt="Lara Dark Blue" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('lara-dark-purple', 'dark')}>
                        <img src="/layout/images/themes/lara-dark-purple.png" className="w-2rem h-2rem" alt="Lara Dark Purple" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('lara-dark-teal', 'dark')}>
                        <img src="/layout/images/themes/lara-dark-teal.png" className="w-2rem h-2rem" alt="Lara Dark Teal" />
                    </button>
                </div>
            </div>

            <h5>PrimeOne Design - 2021</h5>
            <div className="grid">
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('saga-blue', 'light')}>
                        <img src="/layout/images/themes/saga-blue.png" className="w-2rem h-2rem" alt="Saga Blue" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('saga-green', 'light')}>
                        <img src="/layout/images/themes/saga-green.png" className="w-2rem h-2rem" alt="Saga Green" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('saga-orange', 'light')}>
                        <img src="/layout/images/themes/saga-orange.png" className="w-2rem h-2rem" alt="Saga Orange" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('saga-purple', 'light')}>
                        <img src="/layout/images/themes/saga-purple.png" className="w-2rem h-2rem" alt="Saga Purple" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('vela-blue', 'dark')}>
                        <img src="/layout/images/themes/vela-blue.png" className="w-2rem h-2rem" alt="Vela Blue" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('vela-green', 'dark')}>
                        <img src="/layout/images/themes/vela-green.png" className="w-2rem h-2rem" alt="Vela Green" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('vela-orange', 'dark')}>
                        <img src="/layout/images/themes/vela-orange.png" className="w-2rem h-2rem" alt="Vela Orange" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('vela-purple', 'dark')}>
                        <img src="/layout/images/themes/vela-purple.png" className="w-2rem h-2rem" alt="Vela Purple" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('arya-blue', 'dark')}>
                        <img src="/layout/images/themes/arya-blue.png" className="w-2rem h-2rem" alt="Arya Blue" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('arya-green', 'dark')}>
                        <img src="/layout/images/themes/arya-green.png" className="w-2rem h-2rem" alt="Arya Green" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('arya-orange', 'dark')}>
                        <img src="/layout/images/themes/arya-orange.png" className="w-2rem h-2rem" alt="Arya Orange" />
                    </button>
                </div>
                <div className="col-3">
                    <button className="p-link w-2rem h-2rem" onClick={() => changeTheme('arya-purple', 'dark')}>
                        <img src="/layout/images/themes/arya-purple.png" className="w-2rem h-2rem" alt="Arya Purple" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default AppConfigbar;
