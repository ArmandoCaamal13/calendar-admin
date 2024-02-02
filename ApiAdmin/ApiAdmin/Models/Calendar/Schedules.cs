using Newtonsoft.Json;
using System.Collections.Generic;

namespace ApiAdmin.Models.Calendar
{
    public class Calendar
    {
        public List<Schedules> Schedules { get; set; }
        //public List<string> ModeOnlyProgram { get; set; }
    }
    public class Schedules
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
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public Week Week { get; set; }
    }
}
