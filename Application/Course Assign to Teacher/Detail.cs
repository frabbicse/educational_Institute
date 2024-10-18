using Domain.Models.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Course_Assign_to_Teacher
{
   public class Detail
    {
        public class Query : IRequest<CourseAssignDto> 
        {
            public int Id { get; set; }
        }
             public class Handler : IRequestHandler<Query, CourseAssignDto>
                {
                     private readonly ApplicationDataContext _context; 
                    public Handler(ApplicationDataContext context )
                    {
                       _context = context;
                    }
                    public async Task<CourseAssignDto> Handle(Query request, CancellationToken cancellationToken)
                    {
                //my code goes here

                var courses = await (from ca in _context.AssignCourses
                               join d in _context.Departments on ca.DepartmentId equals d.DepartmentId
                               join t in _context.Teachers on ca.TeacherId equals t.Id
                               join c in _context.Courses on ca.CourseId equals c.CourseId

                               where c.CourseId == request.Id

                               select new CourseAssignDto()
                               {
                                   Id = ca.Id,
                                   DeptId = d.DepartmentId,
                                   Department = d.Name,
                                   TeacherId = t.Id,
                                   TeacherName = t.Name,
                                   CreditTaken = t.CreditTaken,
                                   RemainingCredit = ca.RemainingCredit,
                                   Credit = c.Credit,
                                   CourseId = c.CourseId,
                                   CourseName = c.Name
                               }).FirstOrDefaultAsync();
                return courses;
            }
        }
    }
}
