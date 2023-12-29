import React, { createContext, useState, useEffect } from 'react'
import { GetSeoXMlString } from "api/service/file"

export const MetaSeoContext = createContext()

export const MetaSeoProvider = ({ children }) => {
    const [data, setData] = useState()
    useEffect(async () => {
        setData(await GetSeoXMlString())
    }, [])
    return (
        <MetaSeoContext.Provider
            value={{ data, setData }}
        >
            {children}
        </MetaSeoContext.Provider>
    )
}

