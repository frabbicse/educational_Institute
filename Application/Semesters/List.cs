using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Models.DB;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Semesters
{
    public class List
    {
        public class Query : IRequest<List<Semester>> { }
        public class Handler : IRequestHandler<Query, List<Semester>>
        {
            private readonly ApplicationDataContext _context;

            public Handler(ApplicationDataContext context)
            {
                _context = context;
            }
            public async Task<List<Semester>> Handle(Query request, CancellationToken cancellationToken)
            {
                var semesters = await _context.Semesters.ToListAsync();
                return semesters;
            }
        }
    }
}
