using System.IO;
using Newtonsoft.Json;

namespace ApiAdmin.Service.File
{
    public class Files
    {
        public static TModel MapperFile<TModel> (string Path)
        {
            TModel Model = default;

            if (System.IO.File.Exists(Path))
            {
                using (StreamReader GetFile = new StreamReader(Path))
                {
                    string File = GetFile.ReadToEnd();
                    Model = JsonConvert.DeserializeObject<TModel>(File);
                }
            }

            return Model;
        }
    }
}