using Domain.Models.DB;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Rooms
{
    public class List
    {
        public class Query : IRequest<List<Room>> { }

        public class Handler : IRequestHandler<Query, List<Room>>
        {
            private readonly ApplicationDataContext _context;

            public Handler(ApplicationDataContext context)
            {
                _context = context;
            }
            public async Task<List<Room>> Handle(Query request, CancellationToken cancellationToken)
            {
                var rooms = await _context.Rooms.ToListAsync();

                return rooms;
            }
        }
    }
}
