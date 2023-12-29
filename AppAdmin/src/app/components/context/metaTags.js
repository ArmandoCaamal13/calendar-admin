import React, { createContext, useState, useEffect } from 'react'
import { GetSeoXMl } from "api/service/file"

export const MetaTagsContext = createContext();

export const MetaTagsProvider = ({ children }) => {
    const [data, setData] = useState();
    useEffect(async () => {
        const fetchedData = await GetSeoXMl();
        setData(fetchedData);
    }, []);
    
    return (
        <MetaTagsContext.Provider value={{ data, setData }}>
            {children}
        </MetaTagsContext.Provider>
    )
}

