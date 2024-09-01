const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to check working hours
function checkWorkingHours(req, res, next) {
    const now = new Date();
    const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hour = now.getHours(); // 0 to 23

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Allow access
    } else {
        res.status(403).send('Access forbidden: Available only during working hours (Monday to Friday, 09:00 to 17:00)');
    }
}

app.use(checkWorkingHours);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/our-services', (req, res) => {
    res.render('our-services');
});

app.get('/contact-us', (req, res) => {
    res.render('contact-us');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
