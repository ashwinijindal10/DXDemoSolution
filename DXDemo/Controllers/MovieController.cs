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
    public class MovieController : ControllerBase
    {
        private readonly MDBContext _context;

        public MovieController(MDBContext context)
        {
            _context = context;
        }

        // GET: api/Movie
        [HttpGet]
        public IEnumerable<movie> Getmovies()
        {
            return _context.movies;
        }

        // GET: api/Movie/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Getmovie([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var movie = await _context.movies.FindAsync(id);

            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }

        // PUT: api/Movie/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Putmovie([FromRoute] int id, [FromBody] movie movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != movie.id)
            {
                return BadRequest();
            }

            _context.Entry(movie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!movieExists(id))
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

        // POST: api/Movie
        [HttpPost]
        public async Task<IActionResult> Postmovie([FromBody] movie movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.movies.Add(movie);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getmovie", new { id = movie.id }, movie);
        }

        // DELETE: api/Movie/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletemovie([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var movie = await _context.movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }

            _context.movies.Remove(movie);
            await _context.SaveChangesAsync();

            return Ok(movie);
        }

        private bool movieExists(int id)
        {
            return _context.movies.Any(e => e.id == id);
        }
    }
}