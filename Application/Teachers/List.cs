using MediatR;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Models.View;
using Microsoft.EntityFrameworkCore;

namespace Application.Teachers
{
    public class List
    {
        public class Query : IRequest<List<TeacherDto>> { }
        public class Handler : IRequestHandler<Query, List<TeacherDto>>
        {
            private readonly ApplicationDataContext _context;

            public Handler(ApplicationDataContext context)
            {
                _context = context;
            }
            public async Task<List<TeacherDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                //my code goes here
                var teachers = await (from t in _context.Teachers
                                      join d in _context.Departments on t.DepartmentId equals d.DepartmentId
                                      join ds in _context.Designations on t.DesignationId equals ds.DesignationId
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
                                      }).ToListAsync();

                return teachers;
            }
        }
    }
}
