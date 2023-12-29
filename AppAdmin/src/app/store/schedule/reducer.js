const DEFAULT_SCHEDULE_STATE = [
    {
        Tour: '',
        Location: '',
        Date: [],
        ToDate: 0,
        Week: {
            Sunday: false,
            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
        },
        NextDates: []
    }    
]

const ScheduleReducer = (state = DEFAULT_SCHEDULE_STATE, action) => {
    if(action.type === "GET_SCHEDULE"){
        return state
    }

    if(action.type === "@type/set-schedule"){
        return state =  action.payload
    }

    return state
}



export { ScheduleReducer }