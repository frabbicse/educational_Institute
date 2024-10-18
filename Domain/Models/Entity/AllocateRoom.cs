using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Models.DB;

namespace Domain.Models.Entity
{
    public class AllocateRoom
    {
        [Key]
        public int Id { get; set; }         
        public int DepartmentId { get; set; } 
        [ForeignKey("DepartmentId")]
        public virtual Department Department { get; set; } 
        public int CourseId { get; set; } 
        [ForeignKey("CourseId")]
        public virtual Course Course { get; set; } 
        public int RoomId { get; set; } 
        [ForeignKey("RoomId")]
        public virtual Room Room { get; set; } 
        public int DayId { get; set; } 
        [ForeignKey("DayId")]
        public virtual Day Day { get; set; }
        public DateTime TimeFrom { get; set; }
        public DateTime TimeTo { get; set; }
        public bool IsActive { get; set; }
    }
}