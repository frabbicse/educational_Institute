using Domain.Models.Entity;
using MediatR;
using Microsoft.EntityFrameworkCore.Internal;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Enroll_Course
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int StudentId { get; set; }
            public int CourseId { get; set; }
            public DateTime Date { get; set; }
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
                var enrolledCourse = new EnrollCourse
                {
                    StudentId = request.StudentId,
                    CourseId = request.CourseId,
                    Date = request.Date
                };
                _context.EnrollCourses.Add(enrolledCourse);

                if (!_context.EnrollCourses.Any(s => s.StudentId == request.StudentId && s.CourseId == request.CourseId))
                {
                    var success = await _context.SaveChangesAsync() > 0;
                    if (success)
                        return Unit.Value;
                    throw new Exception("Problem saving changes");
                }
                throw new Exception("Exists");
            }
        }
    }
}
