using Domain.Models.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
   public class Seed
    {
        public static async  Task SeedData(ApplicationDataContext context, UserManager<AppUser>userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Fazle ",
                        UserName = "FR" ,
                        Email = "fr@mail.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Fazle R. ",
                        UserName = "FRab" ,
                        Email = "fra@mail.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Rabbi ",
                        UserName = "FRAbb" ,
                        Email = "frab@mail.com"
                    }
                };

                foreach(var user in users)
                {
                 await   userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

        }
    }
}
