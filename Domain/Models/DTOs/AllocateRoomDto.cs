using System;
using System.Collections.Generic;
using System.Linq;

namespace Domain.Models.DTOs
{
    public class AllocateRoomDto
    {
        public int Id { get; set; }

        public int DeptId { get; set; }
        public string DeptName { get; set; }
        
        public int CourseId { get; set; }
        public string CourseName { get; set; }

        public int RoomId { get; set; }
        public string RoomNo { get; set; }
       
        public int DayId { get; set; }
        public string DayName { get; set; }

        public DateTime TimeFrom { get; set; }

       public DateTime TimeTo { get; set; }
  }
}