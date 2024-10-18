using Domain;
using Microsoft.EntityFrameworkCore;
using Domain.Models.DB;
using Domain.Models.Entity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class ApplicationDataContext : IdentityDbContext<AppUser>
    {
        public ApplicationDataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Value> Values { get; set; }

        //public DbSet<MainMenu> Menus { get; set; }
        //public DbSet<SubMenu> SubMenus { get; set; }

        public DbSet<Department> Departments { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<CourseAssign> AssignCourses { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<AllocateRoom> AllocateRooms { get; set; }


        public DbSet<EnrollCourse> EnrollCourses { get; set; }

        public DbSet<StudentResult> StudentsResults { get; set; }


        public DbSet<Semester> Semesters { get; set; }
        public DbSet<Designation> Designations { get; set; }
        public DbSet<Day> Days { get; set; }
        public DbSet<Room> Rooms { get; set; }      
        public DbSet<Grade> Grades { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Menu
            //modelBuilder.Entity<SubMenu>()
            //    .HasRequired(c => c.MainMenu)
            //    .WithMany()
            //    .HasForeignKey(c => c.MenuParentId)
            //    .WillCascadeOnDelete(false);

            ////Teacher
            //modelBuilder.Entity<Teacher>()
            //    .HasRequired(c => c.Department)
            //    .WithMany()
            //    .HasForeignKey(c => c.DeptId)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<Teacher>()
            //    .HasRequired(c => c.Designation)
            //    .WithMany()
            //    .HasForeignKey(c => c.DesigId)
            //    .WillCascadeOnDelete(false);


            ////Student
            //modelBuilder.Entity<Student>()
            //    .HasRequired(c => c.Department)
            //    .WithMany()
            //    .HasForeignKey(c => c.DeptId);

            ////Allocate Rooms
            //modelBuilder.Entity<AllocateRoom>()
            //    .HasRequired(c => c.Department)
            //    .WithMany()
            //    .HasForeignKey(c => c.DeptId);

            //modelBuilder.Entity<AllocateRoom>()
            //    .HasRequired(c => c.Course)
            //    .WithMany()
            //    .HasForeignKey(c => c.CourseId);

            //modelBuilder.Entity<AllocateRoom>()
            //    .HasRequired(c => c.Room)
            //    .WithMany()
            //    .HasForeignKey(c => c.RoomId);

            //modelBuilder.Entity<AllocateRoom>()
            //    .HasRequired(c => c.Day)
            //    .WithMany()
            //    .HasForeignKey(c => c.DeptId);

            ////Enrol Course
            //modelBuilder.Entity<EnrollCourse>()
            //    .HasRequired(c => c.Student) // relation with Student
            //    .WithMany()
            //    .HasForeignKey(c => c.StudentId);

            //modelBuilder.Entity<EnrollCourse>()
            //    .HasRequired(c => c.Course) // relation with Course
            //    .WithMany()
            //    .HasForeignKey(c => c.CourseId);

            ////Student Result
            //modelBuilder.Entity<StudentResult>()
            //    .HasRequired(c => c.Student) // relation with Student
            //    .WithMany()
            //    .HasForeignKey(c => c.StudentId);

            //modelBuilder.Entity<StudentResult>()
            //    .HasRequired(c => c.Course) // relation with Course
            //    .WithMany()
            //    .HasForeignKey(c => c.CourseId);

            //modelBuilder.Entity<StudentResult>()
            //    .HasRequired(c => c.Grade) // relation with Grade
            //    .WithMany()
            //    .HasForeignKey(c => c.GradeId);

            //// Course 
            //modelBuilder.Entity<Course>()
            //    .HasRequired(c => c.Department)
            //    .WithMany()
            //    .HasForeignKey(c => c.DeptId)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<Course>()
            //    .HasRequired(c => c.Teacher)
            //    .WithMany()
            //    .HasForeignKey(c => c.TeacherId)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<Course>()
            //    .HasRequired(c => c.Semester)
            //    .WithMany()
            //    .HasForeignKey(c => c.SemId)
            //    .WillCascadeOnDelete(false);

            ////semester
            //modelBuilder.Entity<Student>()
            //    .HasRequired(c => c.Department)
            //    .WithMany()
            //    .HasForeignKey(c => c.DeptId)
            //    .WillCascadeOnDelete(false);

            modelBuilder.Entity<Value>()
                .HasData(
                new Value { Id = 1, Name = "Value-1" },
                new Value { Id = 2, Name = "Value-2" },
                new Value { Id = 3, Name = "Value-3" },
                new Value { Id = 4, Name = "Value-4" }
                );
        }
    }
}
