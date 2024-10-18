using Infrastructure.IRepositoryService;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.RepositoryServices
{
    public class GenericRepositoryService<T> : IGenericRepositoryService<T> where T : class
    {
        private readonly ApplicationDataContext _context;
        private DbSet<T> table = null;

        public GenericRepositoryService(ApplicationDataContext context)
        {
            _context = context;
            table = _context.Set<T>();
        }

        public void Delete(object id)
        {
            T existing = table.Find(id);
            table.Remove(existing);
        }

        public async Task<List<T>> GetAll()
        {
            return await table.ToListAsync();
        }

        public Task<List<T>> GetAllJoinQuery()
        {
            var obj = from 
        }

        public async Task<T> GetbyId(object id)
        {
            return await table.FindAsync(id);
        }

        public void Insert(T obj)
        {
            table.Add(obj);
        }

        public async Task<int> Save()
        {
         var inserted =   await _context.SaveChangesAsync();

            return inserted;
        }

        public void Update(T obj)
        {
            table.Attach(obj);
            _context.Entry(obj).State = EntityState.Modified;
        }
  
    }
}
