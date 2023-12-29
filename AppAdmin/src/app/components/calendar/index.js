const Calendar = (function () {
    function CALENDAR(props) {
        const {
            selector,
            lang,
            formatMonth = 'long',
            formatWeekDay = 'short',
            onSelect = () => { },
            initialDate,
            selectedWeek,
            selectedDate,
            selectedUpdated,
            selectedNextDates,
            closeDate,
            defaultLocation = null
        } = props
        const date = new Date()
        let CONFIGURATION_DATE = {}
        //let SELECTED_WEEK = props.selectedWeek || {};
        const today = new Date()
        const week = [...Array(7).keys()]
        const monthsKey = [...Array(12).keys()]
        const formatLocaleMonth = new Intl.DateTimeFormat(lang, { month: formatMonth })
        const formatLocaleDays = new Intl.DateTimeFormat(lang, { weekday: formatWeekDay })
        const MonthsNames = monthsKey.map(index => formatLocaleMonth.format(new Date(date.getFullYear(), index)))
        const WeekDaysNames = week.map(index => formatLocaleDays.format(new Date(2021, 10, index + 1)))
        const DaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const BASE_CALENDAR = () => {
            document.querySelector(selector).innerHTML = ''
            const _BaseCalendar = document.createElement('main')
            const html = `
                <div class = 'calendar'>
                    <div class='calendar__title-box'>
                        <span class = "calendar__button" id = "Prev">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
                            </svg>
                        </span>
                        <span class="calendar__title-date" id = "Mouth"></span>
                        <span class = "calendar__button" id = "Next">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/>
                            </svg>
                        </span>
                    </div>
                    <div class="calendar__content">
                        <div class="calendar__week" id = "week_days"></div>                    
                        <div class="calendar__content-days" id ="days"></div>
                    </div>
                </div>        
            `
            _BaseCalendar.innerHTML = html
            _BaseCalendar.querySelector('#Prev').classList.add('calendar__button--disabled')
            _BaseCalendar.querySelector('#Prev').addEventListener('click', PREV_MOUTH)
            _BaseCalendar.querySelector('#Next').addEventListener('click', NEXT_MOUTH)
            _BaseCalendar.querySelector('#days').innerHTML = CREATE_MOUTH()
            _BaseCalendar.querySelector('#week_days').innerHTML = CREATE_DAYS()
            _BaseCalendar.querySelector('#Mouth').innerHTML = `${MonthsNames[date.getMonth()]} ${date.getFullYear()}`
            if (date.getTime() > today.getTime()) {
                _BaseCalendar.querySelector('#Prev').classList.remove('calendar__button--disabled')
            }
            return _BaseCalendar
        }
        const CREATE_DAYS = () => {
            return (`
                <span class = "calendar__week-name">${WeekDaysNames[6]}</span>
                <span class = "calendar__week-name">${WeekDaysNames[0]}</span>
                <span class = "calendar__week-name">${WeekDaysNames[1]}</span>
                <span class = "calendar__week-name">${WeekDaysNames[2]}</span>
                <span class = "calendar__week-name">${WeekDaysNames[3]}</span>
                <span class = "calendar__week-name">${WeekDaysNames[4]}</span>
                <span class = "calendar__week-name">${WeekDaysNames[5]}</span>
            `)
        }
        const CREATE_MOUTH = () => {
            //console.log('Date range updated:' ,selectedNextDates)
            //console.log('week of range: ', selectedNextDates.week)
            const CalendarSizeInDays = [...Array(42).keys()];
            const SizePreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
            const SizeMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
            let calendar_content = '';
            let MonthDays = 1, NextMonthDays = 1;

            CalendarSizeInDays.map(calendarSizeDaysCounter => {
                if (calendarSizeDaysCounter >= FirstDayMonth() && MonthDays <= SizeMonth) {
                    const dayOfWeekNum = (calendarSizeDaysCounter - FirstDayMonth() + date.getDay() + 7) % 7;
                    const dayOfWeek = DaysOfWeek[dayOfWeekNum];
                    const currentDate = new Date(date.getFullYear(), date.getMonth(), MonthDays);
                    const isSelected = selectedWeek && selectedWeek[selectedWeek.length - 1] && selectedWeek[selectedWeek.length - 1][dayOfWeek];
                    const isDisabled = selectedDate.includes(formatDate(currentDate)) || selectedUpdated.includes(formatDate(currentDate)); 
                    const dayClass = isSelected ? 'calendar__day--active' : '';
                    const disabledClass = isDisabled ? 'calendar__day--selected' : '';
                    //console.log(`Fecha deshabilitada: ${isDisabled}`);
                    const isInRange = currentDate >= new Date(selectedNextDates.startDate) && currentDate <= new Date(selectedNextDates.endDate);
                    const shouldAffectWeek = isInRange && selectedNextDates.week[dayOfWeek];
                    const rangeClass = shouldAffectWeek ?  'calendar__day--active' : '';
                    calendar_content += `
                        <span class="calendar__day ${dayClass} ${disabledClass} ${rangeClass} js-Date">    
                            ${MonthDays}
                        </span>
                    `;
                    MonthDays++;
                } else {
                    if (calendarSizeDaysCounter < FirstDayMonth()) {
                        let CalculatePreviousDyasOfMonth = (SizePreviousMonth - (FirstDayMonth() - 1)) + calendarSizeDaysCounter;
                        calendar_content += `<span class="calendar__day calendar__previusMonth js-Date-after">${CalculatePreviousDyasOfMonth}</span>`;
                    } else {
                        calendar_content += `<span class="calendar__day js-Date-next">${NextMonthDays}</span>`;
                        NextMonthDays++;
                    }
                }
            });
            return calendar_content;
        };

        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}/${month}/${day}`;
        };

        const CREATE_CALENDAR = () => {
            const _BaseCalendar = BASE_CALENDAR()
            let MonthSelectCalendar = date.getMonth()
            let MonthDate = []
            date.setDate(1)
            _BaseCalendar.querySelector('#days').innerHTML = CREATE_MOUTH();
            _BaseCalendar.querySelectorAll(".js-Date").forEach((day, index) => {
                MonthDate.push(new Date(date))
                let _date = IterarDate()
                if (DAY_PAST() && DATE_AVAILABLE(_date) && DAY_AVAILABLE(_date)) {
                    day.addEventListener('click', () => {
                        RemoveClass()
                        onSelect(MonthDate[index])
                        day.classList.add("calendar__day-select")
                    })
                }
                else {
                    if ((index + 1 == today.getDate()) && CurrentDate()) {
                        day.classList.add("calendar__today")
                    }
                    day.classList.add('calendar__disabled')
                }
                if (date.getMonth() == MonthSelectCalendar) date.setDate(date.getDate() + 1)
            });
            _BaseCalendar.querySelectorAll(".js-Date-next").forEach((day) => day.addEventListener('click', () => NEXT_MOUTH()))
            _BaseCalendar.querySelectorAll(".js-Date-after").forEach((day) => day.addEventListener('click', () => PREV_MOUTH()))
            date.setMonth(date.getMonth() - 1)
            document.querySelector(selector).appendChild(_BaseCalendar)
        }
        const NEXT_MOUTH = () => {
            date.setMonth(date.getMonth() + 1)
            CREATE_CALENDAR()
        }
        const PREV_MOUTH = () => {
            if (date.getTime() > today.getTime()) {
                date.setMonth(date.getMonth() - 1)
                CREATE_CALENDAR()
            }
        }
        const DAY_PAST = () => {
            const { ToDate } = CONFIGURATION_DATE || {}
            let currentDayTime = today.getTime()
            let DaysMonthTime = date.getTime() // count increment 
            let DaysMonth = date.getDate() // count increment
            let DisableDaysTo = (parseInt(ToDate ? ToDate : 0) + today.getDate()) // day disabled
            let ActiveDay = currentDayTime >= DaysMonthTime ? false : true
            if (ActiveDay && CurrentDate() && DaysMonth <= DisableDaysTo) {
                ActiveDay = false
            }
            return ActiveDay
        }
        const DATE_AVAILABLE = (dates) => {
            const { Date } = CONFIGURATION_DATE || {}
            return Date ? !Date.includes(dates) : true
        }
        const DAY_AVAILABLE = (dates) => {
            const { NextDates, Week, Ignore } = CONFIGURATION_DATE || {}
            let _NextDate = []
            _NextDate = NextDates ? NextDates?.filter(nextDate => FilterNextDayCurrent(dates, nextDate)) : []
            let active_day = (_NextDate.length > 0) ? _NextDate[0].Week[GET_DATE()] : Week ? Week[GET_DATE()] : true
            return Ignore?.includes(dates) ? true : active_day === undefined ? true : active_day
        }
        const FILTER_DATA_DATE = (Tour = null, location = null) => {
            const _location = location ? location : defaultLocation
            CONFIGURATION_DATE = closeDate
                ? closeDate.filter(
                    value =>
                        value?.Location === _location &&
                        (Tour !== null ? value.Tour === Tour : true)
                )[0]
                : [];
        }
        const RESET_CALENDAR = (tour = null, location = null, week) => {
            //console.log('Recibiendo datos en RESET_CALENDAR:', tour, location, week);
            FILTER_DATA_DATE(tour, location, week)
            //SELECTED_WEEK = receivedWeek;
            CREATE_CALENDAR(week)
        }
        const INIT = () => {
            FILTER_DATA_DATE()
            CREATE_CALENDAR()
        }
        // helpers
        const FirstDayMonth = () => new Date(date.getFullYear(), date.getMonth(), 1).getDay()
        const CurrentDate = () => date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
        const IterarDate = () => FormatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
        const GET_DATE = () => DaysOfWeek[date.getDay()]
        const FilterNextDayCurrent = (date, nextDate) => {
            const dateCurrent = new Date(date).getTime()
            const dateNextStart = new Date(nextDate.StartDate).getTime()
            return dateCurrent >= dateNextStart && (nextDate.EndDate ? dateCurrent <= new Date(nextDate.EndDate).getTime() : true)
        }
        const FormatDate = (year, mouth, day) => {
            const Mouth = mouth < 10 ? `0${mouth}` : mouth
            const Day = day < 10 ? `0${day}` : day
            return `${year}/${Mouth}/${Day}`
        }
        const RemoveClass = () => {
            document.querySelectorAll('.calendar__day-select').forEach(daysSelect => {
                daysSelect.classList.remove('calendar__day-select')
            })
        }
        INIT()

        return {
            RESET_CALENDAR
        }
    }

    return CALENDAR
})()

export default Calendar