using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiAdmin.Models.Calendar
{
    public class DataModel
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
    }
}