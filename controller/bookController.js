const { Book, Author } = require("../model/model");

const bookController = {
  addBook: async (req, res) => {
    try {
      const newBook = new Book(req.body);
      const saveBook = await newBook.save();
      if (req.body.author) {
        //const author = Author.find({_id: req.body.author}); //you can use the syntax like this
        const author = Author.findById(req.body.author);
        await author.updateOne({ $push: { books: saveBook._id } });
      }
      res.status(200).json(saveBook);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAllBook: async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getABook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id).populate("author");
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);

      if (req.body.author) {
        //const author = Author.find({_id: req.body.author}); //you can use the syntax like this
        const author = Author.findById(req.body.author);
        await author.updateOne({ $push: { books: book._id } });
      }
      res.status(200).json("Updated successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteBook: async (req, res) => {
    try {
      await Author.updateMany(
        { books: req.params.id },
        { $pull: { books: req.params.id } }
      );
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json("deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = bookController;
