using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Models.DB;

namespace Domain.Models.Entity
{
    public class Course
    {
        public int CourseId { get; set; }         
        public string Code { get; set; }         
        public string Name { get; set; }

        [Column(TypeName = "decimal(18,1)")]
        public double Credit { get; set; }
        public string Description { get; set; }         
        public int  DepartmentId { get; set; }
        [ForeignKey("DepartmentId")]
        public Department Department { get; set; }         
        public int SemesterId { get; set; }
        [ForeignKey("SemesterId")]
        public Semester Semester { get; set; }        
        public bool IsActive { get; set; }
    }

    public class EnrollCourse
    {
        public int Id { get; set; } 
        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public Student Student { get; set; }
        public int CourseId { get; set; }
        [ForeignKey("CourseId")]
        public Course Course { get; set; }
        [DataType(DataType.Date)]
        public DateTime Date { get; set; } 
    }
}