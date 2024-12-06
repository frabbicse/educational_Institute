using Domain.Models.DB;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Semesters
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public string Name { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly ApplicationDataContext _context;

            public Handler(ApplicationDataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    var duplicate = await _context.Semesters.AnyAsync(sem => sem.Name == request.Name);
                    if (!duplicate)
                    {
                        var semester = new Semester
                        {
                            Name = request.Name
                        };
                        _context.Semesters.Add(semester);
                        var success = await _context.SaveChangesAsync() > 0;
                        if (success)
                            return Unit.Value;
                        throw new Exception("Problem saving changes");
                    }
                    else
                    {
                        throw new Exception("Semester already exists!");
                    }
                }
                catch (Exception e)
                {

                    throw new Exception(e.Message);
                }
            }
        } 
    }
}
