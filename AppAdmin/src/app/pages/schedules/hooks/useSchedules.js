import { useEffect, useState } from 'react'
import * as http from '../../../api/service/httpService'

const useSchedules = (initialData) => {
    const [schedules, setSchedules] = useState(initialData);

    const addSchedule = ({ schema, value, key }) => {
        const updatedSchedules = [...schedules];
        const scheduleToUpdate = updatedSchedules[key];

        if (scheduleToUpdate) {
            if (schema === 'Week') {
                scheduleToUpdate[schema] = Boolean(value);
            } else {
                setSchedules(updatedSchedules);
            }
        }
    };

    const addListSchedule = () => {
        const _schedules = [...schedules]
        _schedules.push({
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
        })
        setSchedules(_schedules)
    }

    return [
        schedules,
        setSchedules,
        addSchedule,
        addListSchedule,
    ]
}


export default useSchedules