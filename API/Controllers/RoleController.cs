using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Application.Roles;

using MediatR;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RoleController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateRole(CreateRole.Command command)
        {
            return await _mediator.Send(command);
        }
    }
}
