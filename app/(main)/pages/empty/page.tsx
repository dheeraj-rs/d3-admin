import React from 'react';
import { Suspense } from 'react';
export default function EmptyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EmptyPageContent />
        </Suspense>
    );
}

function EmptyPageContent() {
    return (
        <div>
            Empty Page Content
        </div>
    );
}