using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Departments;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Domain.Models.Entity;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class DepartmentController : BaseController
    {
        private readonly IMediator _mediator;

        public DepartmentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
 
        public async Task<ActionResult<List<Department>>> GetDepartmentList()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        
        public async Task<ActionResult<Department>> GetDepartmentDetail(int id)
        {
            return await _mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateDepartment(Create.Command command)
        {
            return await _mediator.Send(command);
        }
    }
}