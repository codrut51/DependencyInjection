using Dependencies.Database;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace Dependencies.Logic
{
    public class User
    {
        public int User_id;
        public string Username;
        public string Password;
    }

    public class UsersQuery : IUser
    {
        [JsonIgnore]
        private IDatabase _database;
        private int lastId=0;
        public UsersQuery(IDatabase database)
        {
            _database = database;
        }

        public async Task AddUser(User user)
        {
            var cmd = _database.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = $"INSERT INTO `user` (`username`, `password`) VALUES ('{user.Username}', '{user.Password}')";
            await cmd.ExecuteNonQueryAsync();
            lastId = (int)cmd.LastInsertedId;
        }

        public async Task UpdateUser(User user)
        {
            var cmd = _database.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = $"UPDATE `user` SET `username`='{user.Username}'`password`='{user.Password}' WHERE `user_id` = '{user.User_id}'";
            await cmd.ExecuteNonQueryAsync();
        }

        public async Task DeleteUser(int id)
        {
            var cmd = _database.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = $"DELETE FROM `user` WHERE `user_id` = {id}";
            await cmd.ExecuteNonQueryAsync();
        }

        public async Task<List<User>> GetUsers()
        {
            var cmd = _database.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = $"SELECT `user_id`, `username`, `password` FROM `user`";
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        private async Task<List<User>> ReadAllAsync(DbDataReader reader)
        {
            var users = new List<User>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var post = new User()
                    {
                        User_id = await reader.GetFieldValueAsync<int>(0),
                        Username = await reader.GetFieldValueAsync<string>(1),
                        Password = await reader.GetFieldValueAsync<string>(2)
                    };
                    users.Add(post);
                }
            }
            return users;
        }
    }
}
