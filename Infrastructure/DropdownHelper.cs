using Persistence;
using System.Collections.Generic;

namespace Domain.Infrastructure
{

    public class DropDownData
    {
        private readonly ApplicationDataContext _context;

        public DropDownData(ApplicationDataContext context)
        {
            _context = context;
        }
        

        public string Text { get; set; }

        public string Value { get; set; }

        public DropDownData()
        {

        }

        public DropDownData(string txt, string val)
        {
            Text = txt;
            Value = val;
        }

        /// <summary>
        /// Get Department data from Database and Load dropdown list....
        /// </summary>
        /// <returns></returns>
        //public List<object> GetDeptList()
        //{
        //    var deptList = new List<object>();

        //    foreach (var Depts in _context.Departments)
        //    {
        //        deptList.Add(new { Text = Depts.Name, Value = Depts.Id });
        //    }
        //    return deptList;
        //}


        /// <summary>
        /// Get Department data from Database and Load dropdown list....
        /// </summary>
        /// <returns></returns>
        //public List<object> GetDesignationList()
        //{
        //    var designationList = new List<object>();

        //    foreach (var designation in _context.Designations)
        //    {
        //        designationList.Add(new { Text = designation.Name, Value = designation.Id });
        //    }
        //    return designationList;
        //}

       /// <summary>
       /// Teacher List For dropdown.....
       /// </summary>
       /// <returns></returns>
        //public List<object> GetTeacherList()
        //{
        //    var teacherList = new List<object>();

        //    foreach (var teacher in _context.Teachers)
        //    {
        //        teacherList.Add(new { Text = teacher.Name, Value = teacher.Id });
        //    }
        //    return teacherList;
        //}

        /// <summary>
        /// Course List for dropdown
        /// </summary>
        /// <returns></returns>
        //public List<object> GetCourseList()
        //{
        //    var courseList = new List<object>();

        //    foreach (var course in _context.Courses)
        //    {
        //        courseList.Add(new { Text = course.Name, Value = course.Id });
        //    }
        //    return courseList;
        //}
    }
}