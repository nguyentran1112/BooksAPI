const { Author, Book } = require("../model/model");

const authorController = {
  addAuthor: async (req, res) => {
    try {
        const newAuthor = new Author(req.body);
        const saveAuthor = await newAuthor.save();
        res.status(200).json(saveAuthor);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
  },
  getAllAuthor: async (req, res) => {
    try {
        const authors  = await Author.find();
        res.status(200).json(authors);
    } catch (err) {
        res.status(500).json(err);
    }
  },
  getAnAuthor: async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).populate("books");
        res.status(200).json(author);
    } catch (err) {
        res.status(500).json(err);
    }
  },
  updateAnAuthor: async (req, res) => {
    try {
      const author =  await Author.findById(req.params.id)
      await author.updateOne({$set: req.body});
      res.status(200).json('Updated successfully');
    } catch (error) {
      res.status(500).json(error)
    }
  },
  deleteAnAuthor: async (req, res) => {
    try {
      await Book.updateMany({author: req.params.id}, {author: null})
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json('Deleted successfully');

    } catch (error) {
     res.status(500).json(error) 
     console.log(error)
    }
  }
};
module.exports = authorController;
