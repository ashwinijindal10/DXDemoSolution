using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DXDemo.Models;

namespace DXDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorController : ControllerBase
    {
        private readonly MDBContext _context;

        public ActorController(MDBContext context)
        {
            _context = context;
        }

        // GET: api/Actor
        [HttpGet]
        public IEnumerable<actor> Getactors()
        {
            return _context.actors;
        }

        // GET: api/Actor/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Getactor([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var actor = await _context.actors.FindAsync(id);

            if (actor == null)
            {
                return NotFound();
            }

            return Ok(actor);
        }

        // PUT: api/Actor/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Putactor([FromRoute] int id, [FromBody] actor actor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != actor.id)
            {
                return BadRequest();
            }

            _context.Entry(actor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!actorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Actor
        [HttpPost]
        public async Task<IActionResult> Postactor([FromBody] actor actor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.actors.Add(actor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getactor", new { id = actor.id }, actor);
        }

        // DELETE: api/Actor/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deleteactor([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var actor = await _context.actors.FindAsync(id);
            if (actor == null)
            {
                return NotFound();
            }

            _context.actors.Remove(actor);
            await _context.SaveChangesAsync();

            return Ok(actor);
        }

        private bool actorExists(int id)
        {
            return _context.actors.Any(e => e.id == id);
        }
    }
}