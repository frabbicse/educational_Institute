using Domain.Models.Entity;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Student_Result
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int DeptId { get; set; }
            public int CourseId { get; set; }
            public int RoomId { get; set; }
            public int DayId { get; set; }
            public DateTime TimeFrom { get; set; }
            public DateTime TimeTo { get; set; }
            public bool IsActive { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly ApplicationDataContext _context;
            public Handler(ApplicationDataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var allocateRoom = new AllocateRoom
                {
                    DepartmentId = request.DeptId,
                    CourseId = request.CourseId,
                    RoomId = request.RoomId,
                    DayId = request.DayId,
                    TimeFrom = request.TimeFrom,
                    TimeTo = request.TimeTo


                };
                _context.AllocateRooms.Add(allocateRoom);

                //if (_context.AllocateRooms.Any(a => a.DeptId != request.DeptId && a.CourseId != request.CourseId && a.DayId != request.DayId))
                //{
                //    if (_context.AllocateRooms.Any(a => a.RoomId != request.RoomId && a.TimeFrom != request.TimeFrom))
                //    {
                        var success = await _context.SaveChangesAsync() > 0;
                        if (success)
                            return Unit.Value;
                       throw new Exception("Problem saving changes");
                //    }
                //}
                //throw new Exception("Exists");

            }
        }
    }
}
