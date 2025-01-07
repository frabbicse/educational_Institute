using Domain.Models.DB;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Days
{
    public class List
    {
        public class Query : IRequest<List<Day>> { }

        public class Handler : IRequestHandler<Query, List<Day>>
        {
            private readonly ApplicationDataContext _context;

            public Handler(ApplicationDataContext context)
            {
                _context = context;
            }

            public async Task<List<Day>> Handle(Query request, CancellationToken cancellationToken)
            {
                var days = await _context.Days.ToListAsync();

                return days;
            }
        }
    }
}
