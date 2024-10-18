using Domain.Models.DB;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models.Entity
{
    public class Teacher
    {
        public int Id { get; set; }         
        public string Name { get; set; } 
        public string Address { get; set; } 
        public string Email { get; set; }         
        public string ContactNo { get; set; }
        public int DesignationId { get; set; }
        [ForeignKey("DesignationId")]
        public Designation Designation { get; set; }        
        public int DepartmentId { get; set; }
        [ForeignKey("DepartmentId")]
        public Department Department { get; set; }       
        public double CreditTaken { get; set; } 
    }
}