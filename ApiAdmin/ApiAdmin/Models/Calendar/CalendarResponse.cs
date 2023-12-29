using System.Collections.Generic;

namespace ApiAdmin.Models.Calendar
{
    public class CalendarResponse
    {
        public int Status { get; set; }
        public string Message { get; set; }
        
        public Data Data { get; set; }
    }

    public class Data
    {
        public List<Calendar> schedules { get; set; }
    }
}
