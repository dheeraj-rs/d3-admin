'use client';
import React, { useRef, useState, Suspense } from 'react';
import { Toast, ToastRef } from '@/components/Toast/Toast';
import { Button } from '@/components/Button/Button';
import { InputText } from '@/components/InputText/InputText';

import { Message } from '@/components/Message/Message';
import { Messages, MessagesRef } from '@/components/Messages/Messages';

// Create a loading component for Suspense
const Loading = () => <div>Loading...</div>;

// Main component wrapped in Suspense
const MessagesContent = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const toast = useRef<ToastRef>(null);
    const message = useRef<MessagesRef>(null);

    const addSuccessMessage = () => {
        message.current?.show({ severity: 'success', content: 'Message Detail' });
    };

    const addInfoMessage = () => {
        message.current?.show({ severity: 'info', content: 'Message Detail' });
    };

    const addWarnMessage = () => {
        message.current?.show({ severity: 'warn', content: 'Message Detail' });
    };

    const addErrorMessage = () => {
        message.current?.show({ severity: 'error', content: 'Message Detail' });
    };

    const showSuccess = () => {
        toast.current?.show({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Message Detail',
            life: 3000
        });
    };

    const showInfo = () => {
        toast.current?.show({
            severity: 'info',
            summary: 'Info Message',
            detail: 'Message Detail',
            life: 3000
        });
    };

    const showWarn = () => {
        toast.current?.show({
            severity: 'warn',
            summary: 'Warn Message',
            detail: 'Message Detail',
            life: 3000
        });
    };

    const showError = () => {
        toast.current?.show({
            severity: 'error',
            summary: 'Error Message',
            detail: 'Message Detail',
            life: 3000
        });
    };

    return (
        <div className="grid">
            <div className="col-12 lg:col-6">
                <div className="card">
                    <h5>Toast</h5>
                    <div className="flex flex-wrap gap-2">
                        <Toast ref={toast} />
                        <Button type="button" onClick={showSuccess} label="Success" severity="success" />
                        <Button type="button" onClick={showInfo} label="Info" severity="info" />
                        <Button type="button" onClick={showWarn} label="Warn" severity="warning" />
                        <Button type="button" onClick={showError} label="Error" severity="danger" />
                    </div>
                </div>
            </div>

            <div className="col-12 lg:col-6">
                <div className="card">
                    <h5>Messages</h5>
                    <div className="flex flex-wrap gap-2">
                        <Button label="Success" type="button" onClick={addSuccessMessage} severity="success" />
                        <Button label="Info" type="button" onClick={addInfoMessage} severity="info" />
                        <Button label="Warn" type="button" onClick={addWarnMessage} severity="warning" />
                        <Button label="Error" type="button" onClick={addErrorMessage} severity="danger" />
                    </div>
                    <Messages ref={message} />
                </div>
            </div>

            <div className="col-12 lg:col-8">
                <div className="card">
                    <h5>Inline</h5>
                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                        <label htmlFor="username1" className="col-fixed w-9rem">
                            Username
                        </label>
                        <InputText id="username1" value={username} onChange={(e) => setUsername(e.target.value)} required className="p-invalid" />
                        <Message severity="error" text="Username is required" />
                    </div>
                    <div className="flex align-items-center flex-wrap gap-2">
                        <label htmlFor="email" className="col-fixed w-9rem">
                            Email
                        </label>
                        <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-invalid" />
                        <Message severity="error" />
                    </div>
                </div>
            </div>

            <div className="col-12 lg:col-4">
                <div className="card">
                    <h5>Help Text</h5>
                    <div className="field p-fluid">
                        <label htmlFor="username2">Username</label>
                        <InputText id="username2" type="text" className="p-invalid" aria-describedby="username-help" />
                        <small id="username-help" className="p-error">
                            Enter your username to reset your password.
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Export the wrapped component
const MessagesDemo = () => {
    return (
        <Suspense fallback={<Loading />}>
            <MessagesContent />
        </Suspense>
    );
};

export default MessagesDemo;
