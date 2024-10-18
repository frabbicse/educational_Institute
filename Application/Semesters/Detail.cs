using Domain.Models.DB;
using MediatR;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Semesters
{
    public class Detail
    {
        public class Query : IRequest<Semester>
        {
            public int Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Semester>
        {
            private readonly ApplicationDataContext _context;

            public Handler(ApplicationDataContext context)
            {
                _context = context;
            }
            public async Task<Semester> Handle(Query request, CancellationToken cancellationToken)
            {
                //my code goes here
                var semester = await _context.Semesters.FindAsync(request.Id);
                return semester;
            }
        }
    }
}
