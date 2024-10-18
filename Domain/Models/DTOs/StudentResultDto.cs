namespace Domain.Models.DTOs
{
    public class StudentResultDto
    {
        public int Id { get; set; }
        
        public int StudentId { get; set; } 
        public string StudentRegNo { get; set; } 
        public string StudentName { get; set; } 
        public string StudentEmail { get; set; } 
        public string StudentDepartment { get; set; } 
        public int CourseId { get; set; } 
        public string CourseName { get; set; } 
        public int GradeId { get; set; } 
        public string GradeName { get; set; } 
  }
}