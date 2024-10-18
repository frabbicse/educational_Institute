using Domain.Models.DB;
using Domain.Models.Entity;

namespace Domain.Models.DTOs
{
    public class Resutl
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }
        public int GradeId { get; set; }
        public Grade Grade { get; set; }
    }
}