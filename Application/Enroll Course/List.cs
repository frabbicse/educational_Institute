using Domain.Models.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Enroll_Course
{
    public class List
    {
        public class Query : IRequest<List<EnrollCourseDto>> { }
        public class Handler : IRequestHandler<Query, List<EnrollCourseDto>>
        {
            private readonly ApplicationDataContext _context;
            public Handler(ApplicationDataContext context)
            {
                _context = context;
            }
            public async Task<List<EnrollCourseDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                //my code goes here

                var courses = (from ec in _context.EnrollCourses
                               join st in _context.Students on ec.StudentId equals st.StudentId
                               join dept in _context.Departments on st.DepartmentId equals dept.DepartmentId
                               join course in _context.Courses on ec.CourseId equals course.CourseId
                               select new EnrollCourseDto()
                               {
                                   Id = ec.Id,
                                   StudentId = st.StudentId,
                                   RegNo = st.RegNo,
                                   DepartmentName = dept.Name,
                                   CourseId = course.CourseId,
                                   CourseName = course.Name,
                                   DateTime = ec.Date
                               });
                return await courses.ToListAsync();
            }
        }
    }
}
