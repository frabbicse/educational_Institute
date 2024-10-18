using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Enroll_Course;
using Domain.Models.DTOs;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollCourseController : ControllerBase
    {
        private readonly IMediator _mediator;

        public EnrollCourseController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<EnrollCourseDto>>> GetEnrolledCourseList()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EnrollCourseDto>> GetEnrolledCourseDetail()
        {
            return await _mediator.Send(new Detail.Query());
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateEnrolledCourse(Create.Command command)
        {
            return await _mediator.Send(command);
        }
    }
}