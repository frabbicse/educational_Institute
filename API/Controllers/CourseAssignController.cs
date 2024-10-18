using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Course_Assign_to_Teacher;
using Domain.Models.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseAssignController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CourseAssignController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET: api/CourseAssign
        [HttpGet]
        public async Task<ActionResult<List<CourseAssignDto>>> GetCourseAssignList()
        {
            return await _mediator.Send(new List.Query());
        }

        // GET: api/CourseAssign/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<CourseAssignDto>> GetCourseAssignDetail(int id)
        {
            return await _mediator.Send(new Detail.Query { Id = id});
        }

        // POST: api/CourseAssign
        [HttpPost]
        public async Task<ActionResult<Unit>> CreateCourseAssign(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        // PUT: api/CourseAssign/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
