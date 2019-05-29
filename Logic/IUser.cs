using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dependencies.Logic
{
    public interface IUser
    {
        Task AddUser(User user);
        Task UpdateUser(User user);
        Task DeleteUser(int id);
        Task<List<User>> GetUsers();
    }
}
