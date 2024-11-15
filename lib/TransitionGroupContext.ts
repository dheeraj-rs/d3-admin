import React from 'react';

export interface TransitionGroupContextValue {
    isMounting: boolean;
}

const TransitionGroupContext = React.createContext<TransitionGroupContextValue | null>(null);

export default TransitionGroupContext;
