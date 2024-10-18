using Domain.Models.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Students
{
    public class Detail
    {
        public class Query : IRequest<StudentDto> 
        {
            public int Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, StudentDto>
        {
            private readonly ApplicationDataContext _context;
            public Handler(ApplicationDataContext context)
            {
                _context = context;
            }
            public async Task<StudentDto> Handle(Query request, CancellationToken cancellationToken)
            {
                //my code goes here
                var student = await (from s in _context.Students
                                join d in _context.Departments on s.DepartmentId equals d.DepartmentId
                                where s.StudentId == request.Id
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
                                }).SingleOrDefaultAsync();
                return student;
            }
        }
    }
}
