using Domain.Models.Entity;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Students
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public string ContactNo { get; set; }
            public DateTime Date { get; set; }
            public string Address { get; set; }
            public int DeptId { get; set; }
            public string RegNo { get; set; }
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
                var student = new Student
                {
                    Name = request.Name,
                    Email = request.Email,
                    ContactNo = request.ContactNo,
                    Date = request.Date,
                    Address = request.Address,
                    DepartmentId = request.DeptId,
                    RegNo = request.RegNo
                };
                _context.Students.Add(student);

                if (_context.Students.Any(s => s.RegNo != request.RegNo))
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
