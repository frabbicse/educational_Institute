using Domain.Models.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Students
{
    public class List
    {
        public class Query : IRequest<List<StudentDto>> { }
        public class Handler : IRequestHandler<Query, List<StudentDto>>
        {
            private readonly ApplicationDataContext _context;
            public Handler(ApplicationDataContext context)
            {
                _context = context;
            }
            public async Task<List<StudentDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                //my code goes here
                var students = await (from s in _context.Students
                                      join d in _context.Departments on s.DepartmentId equals d.DepartmentId
                                      select new StudentDto()
                                      {
                                          Id = s.StudentId,
                                          Name = s.Name,
                                          Email = s.Email,
                                          ContactNo = s.ContactNo,
                                          Date = s.Date,
                                          Address = s.Address,
                                          RegNo = s.RegNo,
                                          DeptId = d.DepartmentId,
                                          DeptName = d.Name
                                      }).ToListAsync();
                return students;
            }
        }
    }
}
