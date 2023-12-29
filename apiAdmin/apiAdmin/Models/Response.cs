using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace apiAdmin.Models
{
    public class Response
    {
        public int Status { get; set; }
        public string Message { get; set; }
        
        public Data Data { get; set; }
    }

    public class Data
    {
        public List<Schedule> schedules { get; set; }
    }
}
