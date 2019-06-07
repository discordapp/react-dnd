import React from 'react';
import Container from './Container';
export default function SortableStressTest() {
    // Avoid rendering on server because the big data list is generated
    const [shouldRender, setShouldRender] = React.useState(false);
    // Won't fire on server.
    React.useEffect(() => setShouldRender(true), []);
    return React.createElement(React.Fragment, null, shouldRender && React.createElement(Container, null));
}
