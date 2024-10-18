namespace Domain.Models.DTOs
{
    public class Vm_SubMenu
    {
        

        public int SubMenuId { get; set; }
        public int MenuParentId { get; set; }
        public string MainMenuName { get; set; }
        public string SubMenuName { get; set; }
        public string ControllerName { get; set; }
        public string ActionName { get; set; }

        //public List<Vm_SubMenu> ListVmSubMenu()
        //{
        //    var list = (from sm in db.SubMenus
        //        join m in db.Menus on sm.MenuParentId equals m.MenuId
        //        select new Vm_SubMenu()
        //        {
        //            SubMenuId = sm.SubMenuId,
        //            MenuParentId = m.MenuId,
        //            MainMenuName = m.MenuName,
        //            ControllerName = sm.ControllerName,
        //            ActionName = sm.ActionName
        //        }).ToList();
        //    return list;
        //}
    }
}