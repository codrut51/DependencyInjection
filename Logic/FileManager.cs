using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Dependencies.Logic
{
    public class FileManager
    {
        private string _path = "log.txt";
        private Dictionary<string, string> results;
        public FileManager()
        {
            results = new Dictionary<string, string>();
        }
        public FileManager(string path)
        {
            _path = path;
            results = new Dictionary<string, string>();
        }

        public async void WriteToFile(string key, string value)
        {
            using (StreamWriter sw = new StreamWriter(_path))
            {
                await sw.WriteLineAsync($"{key}:{value}");
            }
        }

        public Dictionary<string, string> ReadFromFile()
        {
            using (StreamReader sr = new StreamReader(_path))
            {
                string line = "";
                while ((line = sr.ReadLine()) != null)
                {
                    string[] arr = line.Split(":");
                    if(arr.Length > 1)
                    {
                        results.Add(arr[0], arr[1]);
                    }
                }
            }
            return results;
        }
    }
}
