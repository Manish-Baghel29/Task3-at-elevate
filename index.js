const express= require('express');
const app= express();
const path = require('path');
const uuid4= require('uuid4');
const methodOverride=require('method-override');

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,('/views')));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'/public')));
app.use(methodOverride('_method'));

let books = [
    {
        id:uuid4(),
        title:'Mahabharat',
        author:'Ved Vyash',
    },
    {
        id:uuid4(),
        title:'Mathematics IX',
        author:'RD Sharma',
    }
];

// index route
app.get('/books' , (req , res)=>{
    res.render('index.ejs',{ books });
});

// new route
app.get('/books/new', (req,res)=>{
    res.render('new.ejs');
});

// add route
app.post('/books',(req,res)=>{
    let { title , author }= req.body;
    books.push({
        id:uuid4(),
        title,
        author,
    });
    res.redirect('/books');
});

// edit route
app.get('/books/:id/edit', (req, res) => {
    let { id } = req.params;
    let book = books.find(p => p.id === id);
    res.render("edit.ejs", { book });
});

// update route
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    let { title, author} = req.body;
    let book = books.find(p => p.id === id);
    book.title = title;
    book.author=author;
    res.redirect("/books");
});

// destroy route
app.delete('/books/:id', (req, res) => {
    let { id } = req.params;
    books = books.filter(p => p.id != id);
    res.redirect("/books");
});

app.listen(3000,()=>{
    console.log("Server is listening at port : 3000");
});