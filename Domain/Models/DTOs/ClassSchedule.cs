using Domain.Models.Entity;

namespace Domain.Models.DTOs
{
    public class ClassSchedule
    {
        public int Id { get; set; }
        public int DeptId { get; set; }
        public Department Department { get; set; }
    }
}