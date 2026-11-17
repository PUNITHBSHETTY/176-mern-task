const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let items = [
    { id: 1, name: "Pencil", price: 15 }
];

let nextId = 2;

// GET - Display items
app.get('/items', (req, res) => {
    res.json(items);
});

// POST - Add item
app.post('/items', (req, res) => {
    const item = {
        id: items.length ?
    Math.max(...items.map(i => i.id)) + 1 : 1,
        name: req.body.name,
        price: req.body.price
    };
    items.push(item);
    res.json(item);
});

// PUT - Update item
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    if (!item) return res.status(404).send("Item not found");
    item.name = req.body.name;
    item.price = req.body.price;
    res.json(item);
});

// DELETE - Remove item
app.delete('/items/:id', (req, res) => {
    items = items.filter(i => i.id != req.params.id);
    res.json({ message: "Item deleted" });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});