using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models.DB
{
    public class Day
    {
        public int DayId { get; set; }
        public string Name { get; set; }
    }


    public class Designation
    {
        public int DesignationId { get; set; }
        public string Name { get; set; }
    }

    public class Grade
    {
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal GradePoint { get; set; }
    }

    public class Room
    {
        public int RoomId { get; set; }
        public string Name { get; set; }
        public string RoomNo { get; set; }
    }

    public class Semester
    {
        public int SemesterId { get; set; }
        public string Name { get; set; }
    }
}