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
    public class PersonController : ControllerBase
    {
        private readonly MDBContext _context;

        public PersonController(MDBContext context)
        {
            _context = context;
        }

        // GET: api/Person
        [HttpGet]
        public IEnumerable<person_info> Getperson_infos()
        {
            return _context.person_infos;
        }

        // GET: api/Person/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Getperson_info([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var person_info = await _context.person_infos.FindAsync(id);

            if (person_info == null)
            {
                return NotFound();
            }

            return Ok(person_info);
        }

        // PUT: api/Person/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Putperson_info([FromRoute] int id, [FromBody] person_info person_info)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != person_info.id)
            {
                return BadRequest();
            }

            _context.Entry(person_info).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!person_infoExists(id))
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

        // POST: api/Person
        [HttpPost]
        public async Task<IActionResult> Postperson_info([FromBody] person_info person_info)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.person_infos.Add(person_info);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getperson_info", new { id = person_info.id }, person_info);
        }

        // DELETE: api/Person/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deleteperson_info([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var person_info = await _context.person_infos.FindAsync(id);
            if (person_info == null)
            {
                return NotFound();
            }

            _context.person_infos.Remove(person_info);
            await _context.SaveChangesAsync();

            return Ok(person_info);
        }

        private bool person_infoExists(int id)
        {
            return _context.person_infos.Any(e => e.id == id);
        }
    }
}