const initialState = {
    token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluaXN0cmFkb3IiLCJuYmYiOjE2NTIxNTc3NjksImV4cCI6MTY1MjE1OTIwOSwiaWF0IjoxNjUyMTU3NzY5LCJpc3MiOiJodHRwOi8vbXZjLmViY2FsLmR0cmF2ZWxsZXIuY29tIiwiYXVkIjoiaHR0cDovL212Yy5lYmNhbC5kdHJhdmVsbGVyLmNvbSJ9.mIOu5eTdwuvD7FpsePm18z_rBBRY2xGv8nAKgaydC8Q",
    user: null,
    name : null,
    role : null
}

export const login_data = (state = initialState,action) => {
    if(action.type === "@type/save-login"){
        return state = action.playload
    }

    return state
}