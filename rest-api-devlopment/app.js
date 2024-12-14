const express = require("express");
const app = express();

//Middleware
app.use(express.json());

let books = [
  {
    id: "1",
    title: "Book 1",
  },
  {
    id: "2",
    title: "Book 2",
  },
];

//intro route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our bookstore api",
  });
});

//get all books
app.get("/get", (req, res) => {
  res.json(books);
});


//get a single book using the concept of dynamic route
app.get("/get/:id", (req, res) => {
    const book = books.find((item) => item.id === req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({
        message: "Book not found! Please try with a different Book ID",
      });
    }
  });



  //add a new book means create a new book
app.post("/add", (req, res) => {
    const newBook = {
      id: Math.floor(Math.random() * 1000).toString(),
      title: `Book ${Math.floor(Math.random() * 1000)}`,
    };
  
    books.push(newBook);
    res.status(200).json({
      data: newBook,
      message: "New book is added successfully",
    });
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});