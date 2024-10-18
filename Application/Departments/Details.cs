using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Domain.Models.Entity;
using Persistence;
using Application.Errors;

namespace Application.Departments
{
    public  class Details
    {
        public class Query : IRequest<Department>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Department>
        {
            private readonly ApplicationDataContext _context;

            public Handler(ApplicationDataContext context)
            {
                _context = context;
            }
            public async Task<Department> Handle(Query request, CancellationToken cancellationToken)
            {
                var department = await _context.Departments.FindAsync(request.Id);
                if (department == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound, new { department = "Not Found" }); 

                return department;
            }
        }
    }
}
