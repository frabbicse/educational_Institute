using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.IRepositoryService
{
    public interface IGenericRepositoryService<T> where T : class
    {
        Task<List<T>> GetAll();

        Task<List<T>> GetAllJoinQuery();
        Task<T> GetbyId(object id);
        void Insert(T obj);
        void Update(T obj);
        void Delete(object id);
        Task<int> Save();
    }
}
