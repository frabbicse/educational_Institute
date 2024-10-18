using Domain.Models.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.StudentResults
{
   public class Detail
    {
        public class Query : IRequest<StudentResultDto> 
        {
            public int Id { get; set; }
        }
             public class Handler : IRequestHandler<Query, StudentResultDto>
                {
                     private readonly ApplicationDataContext _context; 
                    public Handler(ApplicationDataContext context )
                    {
                       _context = context;
                    }
                    public async Task<StudentResultDto> Handle(Query request, CancellationToken cancellationToken)
                    {
                //my code goes here

                var sresult = (from result in _context.StudentsResults
                              join st in _context.Students on result.StudentId equals st.StudentId
                              join c in _context.Courses on result.CourseId equals c.CourseId
                              join g in _context.Grades on result.GradeId equals g.GradeId
                              where result.Id == request.Id
                              select new StudentResultDto()
                              {
                                  Id = result.Id,
                                  StudentId = st.StudentId,
                                  StudentRegNo = st.RegNo,
                                  StudentName = st.Name,
                                  StudentEmail = st.Email,
                                  CourseId = c.CourseId,
                                  CourseName = c.Name,
                                  GradeId = g.GradeId,
                                  GradeName = g.GradeName
                              });
                return await sresult.SingleOrDefaultAsync();
            }
                }
    }
}
