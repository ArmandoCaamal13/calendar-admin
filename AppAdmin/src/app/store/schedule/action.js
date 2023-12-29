const GetSchedule = () => {
    return {
        type: "GET_SCHEDULE"
    }
}

const addSchedule = (schedule) => {
    return {
        type: "@type/set-schedule",
        payload: schedule
    }
}

export {
    GetSchedule,
    addSchedule
}