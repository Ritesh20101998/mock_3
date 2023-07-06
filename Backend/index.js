const express = require('express')
const {connection} = require("./config/db")
const Book = require("./models/book.model")
require('dotenv').config()
const BookRouter = express()

BookRouter.use(express.json())

BookRouter.get("/",(req,res)=>{
    res.send("Welcome to the Book Finder..")
})

BookRouter.get('/books', async (req, res) => {
    const books = await Book.find();
    res.send(books);
});
  
BookRouter.post('/books', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.send({ message: 'Book added successfully' });
    } catch (err) {
        res.send({ message: err.message });
    }
});
  
BookRouter.delete('/books/:id', async (req, res) => {
    try{
        const { id } = req.params;
        let book = await Book.findByIdAndDelete(id);
        if(!book){
            return res.send({ message: 'Book not found' });
        }
        res.send({ message: 'Book deleted successfully' });
    } catch (err) {
        res.send({ message: err.message });
    }
});
  
BookRouter.get('/books/filter', async (req, res) => {
    try {
        const { genre } = req.query;
        const books = await Book.find({ genre });
        res.send(books);
    } catch (err) {
        res.send({ message: err.message });
    }
});
  
BookRouter.get('/books/sort', async (req, res) => {
    try {
        const sort = {};
        sort[req.query.sortBy] = req.query.order;
        const books = await Book.find().sort(sort);
        res.json(books);
    } catch (err) {
        res.send({ message: err.message });
    }
});

BookRouter.listen(process.env.port,async(req,res)=>{
    try{
        await connection 
        console.log("server listening")
    } catch(err){
        console.log(err.message)
    }
    console.log("server running on port 4100")
})