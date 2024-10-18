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
    public class List
    {
        public class Query : IRequest<List<StudentResultDto>> { }
             public class Handler : IRequestHandler<Query, List<StudentResultDto>>
                {
                     private readonly ApplicationDataContext _context; 
                    public Handler(ApplicationDataContext context )
                    {
                       _context = context;
                    }
                    public async Task<List<StudentResultDto>> Handle(Query request, CancellationToken cancellationToken)
                    {
                //my code goes here


                var sresult =  (from result in _context.StudentsResults
                              join st in _context.Students on result.StudentId equals st.StudentId
                              join c in _context.Courses on result.CourseId equals c.CourseId
                              join g in _context.Grades on result.GradeId equals g.GradeId
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
                return await sresult.ToListAsync();
            }
        }
    }
}
