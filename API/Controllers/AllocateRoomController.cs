using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Student_Result;
using Domain.Models.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AllocateRoomController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<AllocateRoomDto>>> GetAllocateRoomList()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AllocateRoomDto>> GetAllocateRoomDetail(int id)
        {
            return await Mediator.Send(new Detail.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> PostAllocateRoom(Create.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}