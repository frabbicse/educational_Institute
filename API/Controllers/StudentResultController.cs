using System.Collections.Generic;
using System.Threading.Tasks;
using Application.StudentResults;
using Domain.Models.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentResultController : ControllerBase
    {
        private readonly IMediator _mediator;

        public StudentResultController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<StudentResultDto>>> GetStudentResultList()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult< StudentResultDto>> GetStudentResultDetail(int id)
        {
            return await _mediator.Send(new Detail.Query());
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> PostStudentResult(Create.Command command)
        {
            return await _mediator.Send(command);
        }
    }
}