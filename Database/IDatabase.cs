using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dependencies.Database
{
    public interface IDatabase : IDisposable
    {
        MySqlConnection Connection { get; }
    }
}
