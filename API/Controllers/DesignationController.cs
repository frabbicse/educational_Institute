using Application.Designations;
using Domain.Models.DB;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DesignationController : BaseController
    {
        private readonly IMediator _mediator;

        public DesignationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET: api/designation
        [HttpGet]
        public async Task<ActionResult<List<Designation>>> GetDesignationList()
        {
            return await _mediator.Send(new List.Query());
        }
    }
}
