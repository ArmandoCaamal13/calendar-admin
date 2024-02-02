using Newtonsoft.Json;


namespace ApiAdmin.Models.Htpp
{
    public class Response
    {
        public int Status { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public object Error { get; set; }
    }
}