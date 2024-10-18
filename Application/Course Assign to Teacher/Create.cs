using Domain.Models.Entity;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Course_Assign_to_Teacher
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int DeptId { get; set; }
            public int TeacherId { get; set; }
            public int CourseId { get; set; }
            public double RemainingCredit { get; set; }
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
                var courseAssign = new CourseAssign
                {
                    DepartmentId = request.DeptId,
                    TeacherId = request.TeacherId,
                    CourseId = request.CourseId,
                    RemainingCredit = request.RemainingCredit
                };

                _context.AssignCourses.Add(courseAssign);


                if (_context.AssignCourses.Any(ca => ca.TeacherId == request.TeacherId))
                {
                    if (_context.AssignCourses.Any(ca => ca.CourseId == request.CourseId))
                    {
                        throw new Exception("course assigned to same teacher");
                    }
                    else
                    {
                        var success = await _context.SaveChangesAsync() > 0;
                        if (success)
                            return Unit.Value;
                        throw new Exception("Problem saving changes");

                    }
                }
                else
                {
                    if (_context.AssignCourses.Any(ca => ca.CourseId == request.CourseId))
                    {
                        throw new Exception("already course assigned to teacher");
                    }
                    else
                    {
                        var success = await _context.SaveChangesAsync() > 0;
                        if (success)
                            return Unit.Value;
                        throw new Exception("Problem saving changes");
                    }
                }
            }
        }
    }
}
