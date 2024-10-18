using Domain.Models.Entity;
using MediatR;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.StudentResults
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int StudentId { get; set; }
            public int CourseId { get; set; }
            public int GradeId { get; set; }
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
                var sResult = new StudentResult
                {
                    StudentId = request.StudentId,
                    CourseId = request.CourseId,
                    GradeId = request.GradeId
                };
                _context.StudentsResults.Add(sResult);
                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                    return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}
