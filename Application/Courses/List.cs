using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using System.Linq;
using Domain.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Application.Courses
{
    public class List
    {
        public class Query : IRequest<List<CourseDto>> { }
        public class Handler : IRequestHandler<Query, List<CourseDto>>
        {
            private readonly ApplicationDataContext _context;

            public Handler(ApplicationDataContext context)
            {
                _context = context;
            }
            public async Task<List<CourseDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                //my code goes here

                var courses = await (from c in _context.Courses
                                     join d in _context.Departments on c.DepartmentId equals d.DepartmentId
                               join s in _context.Semesters on c.SemesterId equals s.SemesterId
                               select new  CourseDto()
                               {
                                   Id = c.CourseId,
                                   Code = c.Code,
                                   Name = c.Name,
                                   Credit = c.Credit,
                                   Description = c.Description,
                                   DeptName = d.Name,
                                   SemesterName = s.Name
                               }).ToListAsync();
                return courses;
            }
        }
    }
}
