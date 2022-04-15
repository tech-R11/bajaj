require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;

// using middlewares
app.use(cors());
app.disable('x-powered-by');
app.use(express.json({ limit: '5mb' }));
app.use(
  express.urlencoded({ extended: false, limit: '5mb', parameterLimit: 5000 })
);

const func = async (req, res, next) => {
  try {
    if (req.body.data === undefined) {
      throw new Error('Data is not defined in body');
    }

    const data = req.body.data;

    const letterArray = [];
    const numberArray = [];

    for (const element of data) {
      if(isNaN(element) && typeof element === 'string') {
      letterArray.push(element);

    } else if (Number(element)) {
      numberArray.push(element);
      }
    }

    res.json({
      is_success: true,
      user_id: "rishabh_verma_11052000",
      email: "rv9669953043@gmail.com",
      roll_number: "0101CS191090",
      numbers: numberArray,
      alphabets: letterArray
    })

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
  return next();
}

const router = express.Router();

app.use('/', router.post('/bfhl', func));

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
})
