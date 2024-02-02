using System;

namespace ApiAdmin.Utils
{
    public class Fetch
    {
        public static Model Get<Model>(RequestFetch parameters)
        {
            Model Response = default(Model);

            try
            {
                //var client = new RestClient(parameters.Url)
                //{
                //    Timeout = -1
                //};
                //var request = new RestRequest(Method.GET);
                //IRestResponse response = client.Execute(request);
                //Response = JsonConvert.DeserializeObject<Model>(response.Content);
            }
            catch (Exception error)
            {
                System.Diagnostics.Debug.WriteLine(error);
            }

            return Response;
        }

        public static Model Post<Model,Data>(RequestFetch<Data> parameters)
        {
            Model Response = default(Model);

            try
            {
                //var client = new RestClient(parameters.Url)
                //{
                //    Timeout = -1
                //};
                //var request = new RestRequest(Method.POST);
                //request.AddHeader("Content-Type", "application/json");
                //request.AddParameter("application/json", JsonConvert.SerializeObject(parameters.Data), ParameterType.RequestBody);

                //IRestResponse response = client.Execute(request);
                //Response = JsonConvert.DeserializeObject<Model>(response.Content);
            }
            catch (Exception error)
            {
                System.Diagnostics.Debug.WriteLine(error);
            }

            return Response;
        }
    }

    public class RequestFetch
    {
        public string Url { get; set; }
    }

    public class RequestFetch<Model>
    {
        public string Url { get; set; }
        public Model Data { get; set; }
    }

}