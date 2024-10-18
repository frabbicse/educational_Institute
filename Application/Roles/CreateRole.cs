using Application.Errors;

using MediatR;

using Microsoft.AspNetCore.Identity;

using Persistence;

using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Roles
{
    public class CreateRole
    {
        public class Command : IRequest
        {
            public int RoleId { get; set; }
            public string RoleName { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly ApplicationDataContext _context;
            private readonly RoleManager<IdentityRole> _roleManager;

            public Handler(ApplicationDataContext context, RoleManager<IdentityRole> roleManager)
            {
                _context = context;
                _roleManager = roleManager;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                bool roleExists = await _roleManager.RoleExistsAsync(request.RoleName);

                if (!roleExists)
                {
                    var role = new IdentityRole
                    {
                        Name = request.RoleName,

                    };

                    var result = await _roleManager.CreateAsync(role);
                    if (result.Succeeded)
                        return Unit.Value;
                    throw new RestException(HttpStatusCode.BadRequest);
                }

                throw new RestException(HttpStatusCode.AlreadyReported); 
            }
        }
    }
}
