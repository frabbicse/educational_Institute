using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Models.Entity
{
    public class AppUser: IdentityUser
    {
        public string DisplayName{ get; set; }
    }
}
