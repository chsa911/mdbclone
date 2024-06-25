const router = require("express").Router();
const Movie = require("../models/Movie");
const movies = require("../config/movies.json");
//Route for getting all movies
router.get("/movies", async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;
		const search = req.query.search || "";
		let sort = req.query.sort || "rating";
		let genre = req.query.genre || "All";

		const genreOptions = [
			"Action",
			"Romance",
			"Fantasy",
			"Drama",
			"Crime",
			"Adventure",
			"Thriller",
			"Sci-fi",
			"Music",
			"Family",
		];

		genre === "All"
			? (genre = [...genreOptions])
			: (genre = req.query.genre.split(","));
		req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

		let sortBy = {};
		if (sort[1]) {
			sortBy[sort[0]] = sort[1];
		} else {
			sortBy[sort[0]] = "asc";
		}

		const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
			.where("genre")
			.in([...genre])
			.sort(sortBy)
			.skip(page * limit)
			.limit(limit);

		const total = await Movie.countDocuments({
			genre: { $in: [...genre] },
			name: { $regex: search, $options: "i" },
		});

		const response = {
			error: false,
			total,
			page: page + 1,
			limit,
			genres: genreOptions,
			movies,
		};

		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
});
// Route for Save a new Movie
router.post('/', async (request, response) => {
  try {
    if (
    //das5
      !request.body.name ||
      !request.body.img ||
      !request.body.year||
      !request.body.rating ||
      !request.body.genre

    ) {
      return response.status(400).send({
        message: 'Send all required fields: name, img, year',
      });
    }
    const newMovie = {
    //das5
      name: request.body.name,
      img: request.body.img,
      year: request.body.year,
      rating: request.body.rating,
      genre: request.body.genre,
    };

    const movie = await movie.create(newMovie);

    return response.status(201).send(movie);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

 /*const insertMovies = async () => {
     try {
         const docs = await Movie.insertMany(movies);
         return Promise.resolve(docs);
     } catch (err) {
         return Promise.reject(err)
     }
 };

 insertMovies()
     .then((docs) => console.log(docs))
     .catch((err) => console.log(err))
*/
module.exports = router;
