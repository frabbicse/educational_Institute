using System;

namespace Domain.Models.DTOs
{
    public class EnrollCourseDto
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public string RegNo { get; set; }
        public string StudentName { get; set; }
        public string StudentEmail { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int CourseId { get; set; }
        public string CourseName { get; set; }
        public DateTime DateTime { get; set; } 
 
    }
}