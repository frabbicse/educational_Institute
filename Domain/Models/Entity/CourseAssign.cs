using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models.Entity
{
    public class CourseAssign
    {
        public int Id { get; set; }
        public int DepartmentId { get; set; }
        [ForeignKey("DepartmentId")]
        public Department Department { get; set; }
        public int TeacherId { get; set; }
        [ForeignKey("TeacherId")]
        public Teacher Teacher { get; set; }
        public int CourseId { get; set; }
        [ForeignKey("CourseId")]
        public Course Course { get; set; }        
        public double RemainingCredit { get; set; }         
    }
}