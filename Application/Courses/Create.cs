using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Models.Entity;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Courses
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public string Code { get; set; }
            public string Name { get; set; }
            public double Credit { get; set; }
            public string Description { get; set; }
            public int DeptId { get; set; }
            public int SemId { get; set; }
            public bool IsActive { get; set; }
        }

        public class CourseValidator : AbstractValidator<Command>
        {
            public CourseValidator()
            {
                RuleFor(x => x.Code).NotEmpty().WithMessage("enter code")
                    .MinimumLength(5);
                RuleFor(x => x.Name).NotEmpty().WithMessage("enter name");
                RuleFor(x => x.Credit)
                    .NotEmpty().WithMessage("enter credit")
                     .InclusiveBetween(.5,5);
                RuleFor(x => x.Code).NotEmpty().WithMessage("enter code");

                RuleFor(x => x.DeptId).NotEmpty().WithMessage("select one");
                RuleFor(x => x.SemId).NotEmpty().WithMessage("select one");
            } 
        }

        // public class CourseValidator : IAbs

        public class Handler : IRequestHandler<Command>
        {
            private readonly ApplicationDataContext _context;

            public Handler(ApplicationDataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                if(!_context.Courses.Any(c=> c.Code == request.Code && c.Name == request.Name))
                {
                    var course = new Course
                    {
                        Code = request.Code,
                        Name = request.Name,
                        Credit = request.Credit,
                        Description = request.Description,
                        DepartmentId = request.DeptId,
                        SemesterId = request.SemId
                    };
                    _context.Courses.Add(course);
                    var success = await _context.SaveChangesAsync() > 0;
                    if (success)
                        return Unit.Value;
                    throw new Exception("Problem saving changes");
                }
                else
                {
                    throw new Exception("Exists");
                }

                
            }
        }
    }
}