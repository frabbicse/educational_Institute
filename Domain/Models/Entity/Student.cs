using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Models.DB;

namespace Domain.Models.Entity
{
    public class Student
    {
        public int StudentId { get; set; }         
        public string Name { get; set; } 
        [EmailAddress]
        public string Email { get; set; } 
        public string ContactNo { get; set; } 
        public DateTime Date { get; set; } 
        public string Address { get; set; } 
        public int DepartmentId { get; set; }        
        [ForeignKey("DepartmentId")]
        public Department Department { get; set; } 
        public string RegNo { get; set; }
    }

    public class StudentResult
    {
        public int Id { get; set; } 
        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public Student Student { get; set; } 
        public int CourseId { get; set; }
        [ForeignKey("CourseId")]
        public Course Course { get; set; } 
        public int GradeId { get; set; }
        [ForeignKey("GradeId")]
        public Grade Grade { get; set; } 
    }
}