using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models.Entity
{
    public class MainMenu
    {
        [Key]
        public int MenuId { get; set; }
        [DisplayName("Name")]
        [Required(ErrorMessage = "Enter name")]
        public string MenuName { get; set; }
    }

    public class SubMenu
    {
        [Key]
        public int SubMenuId { get; set; }
        
        [DisplayName("Main Menu")]
        public int MenuParentId { get; set; }
        [ForeignKey("MenuParentId")]
        public MainMenu MainMenu { get; set; }

        [DisplayName("Sub Menu")]
        public string SubMenuName { get; set; }
        [DisplayName("Controller")]
        public string ControllerName { get; set; }
        [DisplayName("Action Name")]
        public string ActionName { get; set; }

    }

}