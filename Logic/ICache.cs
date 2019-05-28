using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dependencies.Logic
{
    interface ICache
    {
        Dictionary<string, string> GetCache();
        string AddCache(string key, string value);
    }
}
