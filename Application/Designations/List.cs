using MediatR;
using Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Models.Entity;
using Microsoft.EntityFrameworkCore;
using Domain.Models.DB;

namespace Application.Designations
{
    public class List
    {
        public class Query : IRequest<List<Designation>> { }
         

        public class Handler : IRequestHandler<Query, List<Designation>>
        {
            private readonly ApplicationDataContext _context;

            public Handler(ApplicationDataContext context)
            {
                _context = context;
            }
            public async Task<List<Designation>> Handle(Query request, CancellationToken cancellationToken)
            {
                var designations = await _context.Designations.ToListAsync();

                return designations;
            }
        }
    }
}
