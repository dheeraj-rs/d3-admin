import React, { useRef, useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import TransitionGroupContext from './TransitionGroupContext';

// Constants for transition states
export const UNMOUNTED = 'unmounted';
export const EXITED = 'exited';
export const ENTERING = 'entering';
export const ENTERED = 'entered';
export const EXITING = 'exiting';

type TransitionStatus = typeof UNMOUNTED | typeof EXITED | typeof ENTERING | typeof ENTERED | typeof EXITING;

export interface TransitionProps {
    nodeRef?: React.RefObject<HTMLElement>;
    in?: boolean;
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
    appear?: boolean;
    enter?: boolean;
    exit?: boolean;
    timeout: number | { enter?: number; exit?: number; appear?: number };
    addEndListener?: (node: HTMLElement, done: () => void) => void;
    onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
    onEntering?: (node: HTMLElement, isAppearing: boolean) => void;
    onEntered?: (node: HTMLElement, isAppearing: boolean) => void;
    onExit?: (node: HTMLElement) => void;
    onExiting?: (node: HTMLElement) => void;
    onExited?: (node: HTMLElement) => void;
    children: React.ReactElement | ((status: TransitionStatus) => React.ReactElement);
}

const Transition: React.FC<TransitionProps> = ({
    nodeRef: nodeRefProp,
    children,
    in: inProp,
    mountOnEnter,
    unmountOnExit,
    appear = false,
    enter = true,
    exit = true,
    timeout,
    addEndListener,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited
}) => {
    const nodeRef = useRef<HTMLElement | null>(null);
    const [status, setStatus] = useState<TransitionStatus>(() => {
        let initialStatus: TransitionStatus;
        if (!inProp) {
            if (unmountOnExit || mountOnEnter) {
                initialStatus = UNMOUNTED;
            } else {
                initialStatus = EXITED;
            }
        } else {
            if (appear) {
                initialStatus = EXITED;
            } else {
                initialStatus = ENTERED;
            }
        }
        return initialStatus;
    });

    const transitionGroupContext = useContext(TransitionGroupContext);

    useEffect(() => {
        if (inProp && status === UNMOUNTED) {
            setStatus(EXITED);
        }
    }, [inProp, status]);

    const getTimeouts = () => {
        let exit: number, enter: number, appear: number;

        exit = enter = appear = typeof timeout === 'number' ? timeout : 0;

        if (timeout != null && typeof timeout !== 'number') {
            exit = timeout.exit ?? exit;
            enter = timeout.enter ?? enter;
            appear = timeout.appear ?? enter;
        }

        return { exit, enter, appear };
    };

    const updateStatus = (mounting = false, nextStatus: TransitionStatus | null) => {
        if (nextStatus !== null) {
            if (nextStatus === ENTERING) {
                performEnter(mounting);
            } else {
                performExit();
            }
        } else if (unmountOnExit && status === EXITED) {
            setStatus(UNMOUNTED);
        }
    };

    const performEnter = (mounting: boolean) => {
        const node = nodeRefProp?.current ?? nodeRef.current;
        if (!node) return;

        const timeouts = getTimeouts();
        const appearing = mounting;

        if ((!mounting && !enter) || !node) {
            setStatus(ENTERED);
            onEntered?.(node, appearing);
            return;
        }

        onEnter?.(node, appearing);

        setStatus(ENTERING);
        onEntering?.(node, appearing);

        const enterTimeout = appearing ? timeouts.appear : timeouts.enter;

        if (enterTimeout) {
            const timer = setTimeout(() => {
                setStatus(ENTERED);
                onEntered?.(node, appearing);
            }, enterTimeout);

            return () => clearTimeout(timer);
        }

        setStatus(ENTERED);
        onEntered?.(node, appearing);
    };

    const performExit = () => {
        const node = nodeRefProp?.current ?? nodeRef.current;
        if (!node) return;

        const timeouts = getTimeouts();

        if (!exit || !node) {
            setStatus(EXITED);
            onExited?.(node);
            return;
        }

        onExit?.(node);

        setStatus(EXITING);
        onExiting?.(node);

        if (timeouts.exit) {
            const timer = setTimeout(() => {
                setStatus(EXITED);
                onExited?.(node);
            }, timeouts.exit);

            return () => clearTimeout(timer);
        }

        setStatus(EXITED);
        onExited?.(node);
    };

    useEffect(() => {
        let nextStatus: TransitionStatus | null = null;
        if (inProp) {
            if (status !== ENTERING && status !== ENTERED) {
                nextStatus = ENTERING;
            }
        } else {
            if (status === ENTERING || status === ENTERED) {
                nextStatus = EXITING;
            }
        }

        updateStatus(false, nextStatus);
    }, [inProp, status]);

    if (status === UNMOUNTED) {
        return null;
    }

    if (typeof children === 'function') {
        return children(status);
    }

    const child = React.Children.only(children);
    return React.cloneElement(child, {
        ref: nodeRef
    });
};

Transition.defaultProps = {
    in: false,
    mountOnEnter: false,
    unmountOnExit: false,
    appear: false,
    enter: true,
    exit: true
};

export default Transition;
