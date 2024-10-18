using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Domain.Models.DTOs
{
    public class CourseDto
    {
        public int Id { get; set; }
         
        public string Code { get; set; }
         
        public string Name { get; set; } 
        public double Credit { get; set; }
        public string Description { get; set; } 
        public int  DeptId { get; set; } 
        public string DeptName { get; set; } 
        public int SemId { get; set; } 
        public string SemesterName { get; set; }         
  
    }


    // View Results 
    public class VM_ViewResult
    { 
        public string RegNo { get; set; } 
        public string StudentName { get; set; }
        public string Email { get; set; }
        public string Department { get; set; }
    }
}