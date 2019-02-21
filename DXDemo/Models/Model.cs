using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DXDemo.Models
{

    public class MDBContext : DbContext
    {
        public MDBContext(DbContextOptions<MDBContext> options)
            : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<person_info> person_infos { get; set; }
        public DbSet<actor> actors { get; set; }
        public DbSet<producer> producers { get; set; }
        public DbSet<movie> movies { get; set; }
        public DbSet<movie_actor> movie_actors { get; set; }
    }


    public class person_info
    {
        [Key]
        public int id { get; set; }

        [Required]
        [MaxLength(400)]
        public string name { get; set; }
        public string sex { get; set; }
        public string dob { get; set; }
        public string bio { get; set; }
    }

    public class actor
    {
        [Key]
        public int id { get; set; }

        [ForeignKey("person_info")]
        public int person_id { get; set; }
        public virtual person_info person_info { get; set; }

        public virtual ICollection<movie_actor> movie_actors { get; set; }
    }

    public class producer
    {
        [Key]
        public int id { get; set; }

        [ForeignKey("person_info")]
        public int person_id { get; set; }

        public virtual person_info person_info { get; set; }    
    }

    public class movie
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public int year_of_release { get; set; }
        public string plot { get; set; }
        public string poster { get; set; }

        [ForeignKey("producer")]
        public int producer_id { get; set; }

        public virtual producer producer { get; set; }
        public virtual ICollection<movie_actor> movie_actors { get; set; }
    }

    public class movie_actor
    {
        [Key]
        public int id { get; set; }
        
        [ForeignKey("movie")]
        public int movie_id { get; set; }

        [ForeignKey("actor")]
        public int actor_id { get; set; }

        public virtual actor actor { get; set; }
        public virtual movie movie { get; set; }
    }
   

}
