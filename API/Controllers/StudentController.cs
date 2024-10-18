using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Students;
using Domain.Models.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IMediator _mediator;

        public StudentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<StudentDto>>> GetStudentList()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StudentDto>> GetStudentDetail(int id)
        {
            return await _mediator.Send(new Detail.Query {Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateStudent(Create.Command command)
        {
            return await _mediator.Send(command);
        }
    }
}