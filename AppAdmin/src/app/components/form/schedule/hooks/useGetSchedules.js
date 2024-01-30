import React, { useEffect, useState } from 'react'
import { getSchedules } from 'api/schedules'
import { addSchedule } from 'storage/schedule/action'
import { useDispatch } from 'react-redux'

const statusSuccessfullCode = 200
const statusSuccessfullMessage = "SUCCESSFUL"

const useGetSchedules = (endpoint = null) => {
    const [filterParameters, setFilterParameters] = useState({ location: null, tour: null, schedules: [] })
    const [isSuccessfull, setIsSuccessfull] = useState(false)
    const filterSchedule = useFilterSchedules(filterParameters)
    const dispatch = useDispatch()

    useEffect(() => {
        async function scheduleGet() {
            if (endpoint) {
                const schedulesResponse = await getSchedules(endpoint)
                if (schedulesResponse?.Status === statusSuccessfullCode && statusSuccessfullMessage === statusSuccessfullMessage) {
                    const getSchedules = schedulesResponse?.Data?.Schedules || []
                    dispatch(addSchedule(getSchedules))
                    setFilterParameters({ location: null, tour: null, schedules: getSchedules })
                    setIsSuccessfull(true)
                }
            }
        }
    }, [endpoint])

    return {
        ...filterSchedule,
        status: isSuccessfull,
        data: filterParameters.all,
        filterSchedules: (location = null, tour = null) => {
            setFilterParameters({ ...filterParameters, location: location, tour: tour })
        }
    }
}


const useFilterSchedules = ({ schedules, location = null, tour = null }) => {
    const [list_all_Location, set_list_all_location] = useState([])
    const [list_tour_by_location, set_list_tour_by_location] = useState([])
    const [select_tour, set_select_tour] = useState(null)

    useEffect(() => {
        if (schedules && location === null) {
            const location_is_exist = []
            set_list_all_location(schedules.filter(item => {
                if (location_is_exist.includes(item.Location)) {
                    return false
                }
                location_is_exist.push(item.Location)
                return true
            }))
        }

        if (location && tour === null) {
            const filter_schedules_by_location = schedules.filter((item, key) => {
                if (item.Location === location) {
                    item.identification = key
                    return true
                }
            })

            set_list_tour_by_location(filter_schedules_by_location)
        }

        if (tour) {
            set_select_tour(list_tour_by_location.filter((item) => item.Tour === tour)[0])
        }

    }, [schedules, location, tour])

    return {
        location: list_all_Location,
        tour: list_tour_by_location,
        selectTour: select_tour,
        all: schedules
    }
}


export default useGetSchedules