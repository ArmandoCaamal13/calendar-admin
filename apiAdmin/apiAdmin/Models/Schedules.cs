using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace apiAdmin.Models
{
    public class Schedules
    {
        public string key { get; set; }
        public string site { get; set; }
        public List<Schedule> schedules { get; set; }
        public List<string> ModeOnlyProgram { get; set; }
    }
    public class Schedule
    {

        public string Tour { get; set; }
        public string Location { get; set; }
        public List<string> Date { get; set; }
        public int ToDate { get; set; }
        public Week Week { get; set; }
        public List<NextDates> NextDates { get; set; }
    }

    public class Week
    {
        public bool Sunday { get; set; }
        public bool Monday { get; set; }
        public bool Tuesday { get; set; }
        public bool Wednesday { get; set; }
        public bool Thursday { get; set; }
        public bool Friday { get; set; }
        public bool Saturday { get; set; }
    }

    public class NextDates
    {
        public string startDate { get; set; }
        public string endDate { get; set; }
        public Week week { get; set; }
    }
}
