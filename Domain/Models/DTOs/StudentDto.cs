using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Domain.Models.DTOs
{
    public class StudentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string ContactNo { get; set; }
        public DateTime Date { get; set; }
        public string Address { get; set; }
        public int DeptId { get; set; }
        [DisplayName("Department")]
        public string DeptName { get; set; }
        public string RegNo { get; set; }
    
    }
}