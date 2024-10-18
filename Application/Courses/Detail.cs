using System.Threading;
using System.Threading.Tasks;
using Domain.Models.DTOs;
using System.Linq;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Courses
{
    public class Detail
    {
        public class Query : IRequest<CourseDto>
        {

            public int Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, CourseDto>
        {
            private readonly ApplicationDataContext _context;

            public Handler(ApplicationDataContext context)
            {
                _context = context;
            }
            public async Task<CourseDto> Handle(Query request, CancellationToken cancellationToken)
            {
                //my code goes here
                var course = await (from c in _context.Courses
                                    join d in _context.Departments on c.DepartmentId equals d.DepartmentId
                                    join s in _context.Semesters on c.SemesterId equals s.SemesterId
                                    where c.CourseId == request.Id
                                    select new CourseDto()
                                    {
                                        Id = c.CourseId,
                                        Code = c.Code,
                                        Name = c.Name,
                                        Credit = c.Credit,
                                        Description = c.Description,
                                        DeptName = d.Name,
                                        SemesterName = s.Name
                                    }).FirstOrDefaultAsync();
                return course;
            }
        }
    }
}