import { useLocation } from 'react-router-dom';
import React from 'react';
import ReactGA from 'react-ga4';

export function Analytics() {
    const location = useLocation();
    React.useEffect(() => {
        ReactGA.initialize('G-XLWB6G867G');
    }, []);
    React.useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search + window.location.hash);
    }, [location]);
    return <></>;
}
