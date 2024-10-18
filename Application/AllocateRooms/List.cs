using Domain.Models.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Student_Result
{
    public class List 
    {
        public class Query : IRequest<List<AllocateRoomDto>> { }
             public class Handler : IRequestHandler<Query, List<AllocateRoomDto>>
                {
                     private readonly ApplicationDataContext _context; 
                    public Handler(ApplicationDataContext context )
                    {
                       _context = context;
                    }
                    public async Task<List<AllocateRoomDto>> Handle(Query request, CancellationToken cancellationToken)
                    {
                //my code goes here

                var roomsAllocated = await (from ra in _context.AllocateRooms
                                      join dept in _context.Departments on ra.DepartmentId equals dept.DepartmentId
                                      join course in _context.Courses on ra.CourseId equals course.CourseId
                                      join room in _context.Rooms on ra.RoomId equals room.RoomId
                                      join day in _context.Days on ra.DayId equals day.DayId

                                      select new AllocateRoomDto()
                                      {
                                          Id = ra.Id,
                                          DeptId = dept.DepartmentId,
                                          DeptName = dept.Name,
                                          CourseId = course.CourseId,
                                          CourseName = course.Name,
                                          RoomId = room.RoomId,
                                          RoomNo = room.RoomNo,
                                          DayId = day.DayId,
                                          DayName = day.Name,
                                          TimeTo = ra.TimeTo,
                                          TimeFrom = ra.TimeFrom
                                      }).ToListAsync();

                return  roomsAllocated;
            }
        }
    }
}
