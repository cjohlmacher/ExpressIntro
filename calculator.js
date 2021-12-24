const express = require('express');
const { getMean, getMedian, getMode } = require('./methods');
const ExpressError = require('./expressError');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.send("Provide numbers to mean, median, or mode endpoints");
});

app.use((req,res,next) => {
    if (req.query.numbers) {
        req.query.numbers = req.query.numbers.split(',');
        req.query.numbers = req.query.numbers.map((num) => {
            return parseInt(num);
        });
        if (req.query.numbers.includes(NaN)) {
            try {
                throw new ExpressError('Invalid query input',400)
            } catch (e) {
                return next(e);
            }
        };
    } else {
        try {
            throw new ExpressError('Numbers required',400)
        } catch (e) {
            return next(e);
        }
    }
    next();
});

app.get('/mean', (req,res) => {
    const mean = getMean(req.query.numbers);
    res.status(200).json({'response': {operation: "mean", value: mean}});
});

app.get('/median', (req,res) => {
    const median = getMedian(req.query.numbers);
    res.status(200).json({'response': {operation: "median", value: median}});
});

app.get('/mode', (req,res) => {
    const mode = getMode(req.query.numbers);
    res.status(200).json({'response': {operation: "mode", value: mode}});
})

app.get('/all', (req,res) => {
    const mean = getMean(req.query.numbers);
    const median = getMedian(req.query.numbers);
    const mode = getMode(req.query.numbers);
    res.status(200).json(
        {'response': 
            {operation: "all", 
            mean: mean,
            median: median,
            mode: mode,
        }
    });
});

app.use( (req,res,next) => {
    const e = new ExpressError("Page Not Found",404);
    next(e);
});

app.use( (error,req,res,next) => {
    let status = error.status || 500;
    let msg = error.message;
    res.status(status).json({error: {msg,status}});
})

app.listen(PORT, (req,res) => {
    console.log(`Listening on port ${PORT}`)
});
