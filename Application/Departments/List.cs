using MediatR;
using Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Models.Entity;
using Microsoft.EntityFrameworkCore;

namespace Application.Departments
{
    public class List
    {
        public class Query : IRequest<List<Department>> { }
         

        public class Handler : IRequestHandler<Query, List<Department>>
        {
            private readonly ApplicationDataContext _context;

            public Handler(ApplicationDataContext context)
            {
                _context = context;
            }
            public async Task<List<Department>> Handle(Query request, CancellationToken cancellationToken)
            {
                var departments = await _context.Departments.ToListAsync();

                return departments;
            }
        }
    }
}
