using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DXDemo.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "person_infos",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    name = table.Column<string>(maxLength: 400, nullable: false),
                    sex = table.Column<string>(nullable: true),
                    dob = table.Column<string>(nullable: true),
                    bio = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_person_infos", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "actors",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    person_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_actors", x => x.id);
                    table.ForeignKey(
                        name: "FK_actors_person_infos_person_id",
                        column: x => x.person_id,
                        principalTable: "person_infos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "producers",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    person_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_producers", x => x.id);
                    table.ForeignKey(
                        name: "FK_producers_person_infos_person_id",
                        column: x => x.person_id,
                        principalTable: "person_infos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "movies",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    name = table.Column<string>(nullable: true),
                    year_of_release = table.Column<DateTime>(nullable: false),
                    plot = table.Column<string>(nullable: true),
                    poster = table.Column<string>(nullable: true),
                    producer_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movies", x => x.id);
                    table.ForeignKey(
                        name: "FK_movies_producers_producer_id",
                        column: x => x.producer_id,
                        principalTable: "producers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "movie_actors",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    movie_id = table.Column<int>(nullable: false),
                    actor_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movie_actors", x => x.id);
                    table.ForeignKey(
                        name: "FK_movie_actors_actors_actor_id",
                        column: x => x.actor_id,
                        principalTable: "actors",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_movie_actors_movies_movie_id",
                        column: x => x.movie_id,
                        principalTable: "movies",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_actors_person_id",
                table: "actors",
                column: "person_id");

            migrationBuilder.CreateIndex(
                name: "IX_movie_actors_actor_id",
                table: "movie_actors",
                column: "actor_id");

            migrationBuilder.CreateIndex(
                name: "IX_movie_actors_movie_id",
                table: "movie_actors",
                column: "movie_id");

            migrationBuilder.CreateIndex(
                name: "IX_movies_producer_id",
                table: "movies",
                column: "producer_id");

            migrationBuilder.CreateIndex(
                name: "IX_producers_person_id",
                table: "producers",
                column: "person_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "movie_actors");

            migrationBuilder.DropTable(
                name: "actors");

            migrationBuilder.DropTable(
                name: "movies");

            migrationBuilder.DropTable(
                name: "producers");

            migrationBuilder.DropTable(
                name: "person_infos");
        }
    }
}
