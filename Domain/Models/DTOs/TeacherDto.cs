namespace Domain.Models.View
{
    public class TeacherDto
    {
        public int TeacherId { get; set; }
         
        public string Name { get; set; }
         
        public string Address { get; set; }
         
        public string Email { get; set; }
         
        public string ContactNo { get; set; }
         
        public int DesigId { get; set; }
        public string Designation { get; set; }
         
        public int DeptId { get; set; }

        public string DepartmentName { get; set; }
 
        public double CreditTaken { get; set; }
         
        public double RemainingCredit { get; set; }
      
    }
}