using Application.Days;
using Domain.Models.DB;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class DayController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DayController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Day>>> Days()
        {
             return await _mediator.Send(new List.Query());
        }
    }
}
