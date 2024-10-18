using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Domain.Models.DTOs
{
    public class CourseAssignDto
    {
        public int Id { get; set; } 
        public int DeptId { get; set; }
        public string Department { get; set; }
        public int TeacherId { get; set; }
        public string TeacherName { get; set; }
        public double CreditTaken { get; set; }
        public double RemainingCredit { get; set; }
        public int CourseId { get; set; }
        public string CourseName { get; set; }
        public double Credit { get; set; }    
    }
}