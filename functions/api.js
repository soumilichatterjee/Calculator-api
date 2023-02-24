const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use(cors());
router.post('/calculate', (req, res) => {
  const { num1, num2, operation } = req.body;
  let result;

  switch (operation) {
    case 'addition':
      result = num1 + num2;
      break;
    case 'subtraction':
      result = num1 - num2;
      break;
    case 'multiplication':
      result = num1 * num2;
      break;
    default:
      return res.status(400).send('Invalid operation');
  }

  res.send(result.toString());
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
