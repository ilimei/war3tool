import React, { Suspense } from 'react';


export default function loadCMP(loadFn: () => any) {
    const OtherComponent = React.lazy(loadFn);

    return function MyComponent() {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <OtherComponent />
            </Suspense>
        );
    }
}
