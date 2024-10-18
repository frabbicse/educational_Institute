using Domain.Models.Entity;
using FluentValidation;
using MediatR;
using Persistence;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Teachers
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Address { get; set; }
            public string Email { get; set; }
            public string ContactNo { get; set; }
            public int DesigId { get; set; }
            public int DeptId { get; set; }
            public double CreditTaken { get; set; } 
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(t => t.Name).NotEmpty().WithMessage("Provdie name");

                RuleFor(t => t.Email).EmailAddress().WithMessage("please, put valide email address");
                RuleFor(t => t.ContactNo).NotEmpty().WithMessage("provide contact no");
                RuleFor(t => t.DesigId).NotEmpty().WithMessage("select one");
                RuleFor(t => t.DeptId).NotEmpty().WithMessage("select one");
                RuleFor(t => t.CreditTaken).NotEmpty().WithMessage("number credits taken");
            }
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
                //if (request.Id == 0)
                //{
                    if (_context.Teachers.Any(t => t.Email != request.Email))
                    {
                        var teacher = new Teacher
                        {
                            Name = request.Name,
                            Address = request.Address,
                            Email = request.Email,
                            ContactNo = request.ContactNo,
                            DesignationId = request.DesigId,
                            DepartmentId = request.DeptId,
                            CreditTaken = request.CreditTaken 
                        };
                        _context.Teachers.Add(teacher);
                        var success = await _context.SaveChangesAsync() > 0;
                        if (success)
                            return Unit.Value;
                        throw new Exception("Problem saving changes");
                    }
                    else
                    {
                        throw new Exception("Exists");
                    }
                //}
                //else
                //{

                //}
            }
        }
    }
}
