using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using Domain.Models.Entity;
using Persistence;
using FluentValidation;
using Application.Errors;
using System.Net;

namespace Application.Departments
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public string Code { get; set; }
            public string Name { get; set; }
        }

        public class CommandValidator: AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Code).NotEmpty();
                RuleFor(x => x.Name).NotEmpty(); 
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
                var department = new Department
                {
                    Code = request.Code,
                    Name = request.Name
                };

                _context.Departments.Add(department);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;
                throw new RestException(HttpStatusCode.NotFound,"Problem saving changes");
            }
        }
    }
}
