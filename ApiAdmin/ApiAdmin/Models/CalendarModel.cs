using ApiAdmin.Models.Calendar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiAdmin.Models
{
    public class CalendarModel
    {
        public List<Schedule> Schedules { get; set; }
    }

    public class Schedule
    {
        public string Tour { get; set; }
        public string Location { get; set; }
        public List<string> Date { get; set; }
        public int ToDate { get; set; }
        public Dictionary<string, bool> Week { get; set; }
        public List<NextDate> NextDates { get; set; }
    }

    public class NextDate
    {
        public string StartDate { get; set; }
        public string EndDate { get; set; }
    }
}