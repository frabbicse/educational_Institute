using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Teachers;
using Domain.Models.View;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TeacherController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<TeacherDto>>> GetTeacherList()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TeacherDto>> GetTeacherDetail(int id)
        {
            return await _mediator.Send(new Detail.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateTeacher(Create.Command command)
        {
            return await _mediator.Send(command);
        }
    }
}