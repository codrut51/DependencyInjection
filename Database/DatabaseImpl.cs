using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dependencies.Database
{
    public class DatabaseImpl : IDatabase
    {
        public MySqlConnection Connection { get;  }

        public DatabaseImpl(string connectionString)
        {
            Connection = new MySqlConnection(connectionString);
            Connection.Open();
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}
