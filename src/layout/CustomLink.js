import React from 'react';
import { useMatch, useResolvedPath, Link } from 'react-router-dom';

let matchedPathname

export const CustomLink = ({ children, to }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
    matchedPathname = match?.pathname

    return (
        <>
            <Link
                to={to}
            >
                {children}
            </Link>
        </>
    )
};

export { matchedPathname }


