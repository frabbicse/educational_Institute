using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Courses;
using Domain;
using Domain.Models.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CourseController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<CourseDto>>> Get()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CourseDto>> Get(int id)
        {
            return await _mediator.Send(new Detail.Query { Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Post(Create.Command command)
        {
            return await _mediator.Send(command);
        }

    }
}