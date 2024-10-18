using Domain.Models.Entity;

namespace Domain.Models.DTOs
{
    public class ViewCourseStat
    {
        public int  DeptId { get; set; }
        public Department Department { get; set; } 
    }
}