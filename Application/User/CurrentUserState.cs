using Application.Errors;
using Application.Interfaces;
using Domain.Models.Entity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class CurrentUserState
    {
        public class Query : IRequest<User>
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IUserAccessor _userAccessor;

            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, IUserAccessor userAccessor)
            {
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
                _userAccessor = userAccessor;
            }
            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                //my code goes here
                var user = await _userManager.FindByIdAsync(request.Id);
                if (user != null) {
                    return new User
                    {
                        DisplayName = user.DisplayName,                        
                        UserName = user.UserName,
                        Image = null
                    };
                }
                throw new RestException(HttpStatusCode.NotFound, "Not Found");

            }
        }
    }
}
