using Domain.Models.View;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Teachers
{
   public class Detail
    {
        public class Query : IRequest<TeacherDto>
        {
            public int Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, TeacherDto>
        {
            private readonly ApplicationDataContext _context;

            public Handler(ApplicationDataContext context)
            {
                _context = context;
            }
            public async Task<TeacherDto> Handle(Query request, CancellationToken cancellationToken)
            {
                //my code goes here
                var teacher = await (from t in _context.Teachers
                                join d in _context.Departments on t.DepartmentId equals d.DepartmentId
                                join ds in _context.Designations on t.DesignationId equals ds.DesignationId
                                where t.Id == request.Id
                                select new TeacherDto()
                                {
                                    TeacherId = t.Id,
                                    Name = t.Name,
                                    Address = t.Address,
                                    Email = t.Email,
                                    CreditTaken = t.CreditTaken,
                                    ContactNo = t.ContactNo,
                                    Designation = ds.Name,
                                    DepartmentName = d.Name
                                }).FirstOrDefaultAsync();
                return teacher;
            }
        }
    }
}
