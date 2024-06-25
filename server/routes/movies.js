const router = require("express").Router();
//const router = express.Router()

const Movie = require("../models/movie");
const movies = require("../config/movies.json");
//const axios = require("axios")
const express = require("express")
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true }));


//const router = express.Router();

/*
router.post("/api/movies", async (req, res) => {
//console.log(req.body);
//res.send(req.body);

  try {
    let newDocument = {
          name: req.body.name,
        img: req.body.img,
        year: req.body.year,
        rating: req.body.rating,
        genre: req.body.genre,

    };
    let collection = await db.collection("movies");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
}
});
*/
// Route for Save a new Movie
router.post("/", async (req, res) => {
  try {
   if (
    //das5
      !req.body.name ||
      !req.body.img ||
      !req.body.year||
      !req.body.rating ||
      !req.body.genre

    ) {
      return response.status(400).json({ message:
       "Send all required fields: name, img, year, rating, genre" });

    }
    const newMovie = {
    //das5
      name: req.body.name,
      img: req.body.img,
      year: req.body.year,
      rating: req.body.rating,
      genre: req.body.genre,
    };

    const movie = await movie.create(newMovie);

    return response.status(201).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

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
// Route for Update a Book
router.put("/:id", async (req, res) => {
  try {
    if (
  //das5
      !req.body.name ||
      !req.body.img ||
      !req.body.year||
      !req.body.rating ||
      !req.body.genre
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = req.params;

    const result = await Movie.findByIdAndUpdate(id, req.body);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully' });
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
//export default router;
