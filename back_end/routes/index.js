var express = require('express');
var router = express.Router();
var axios = require('axios');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('HELLO');
});

router.get("/nicedays", function (req, res) {
  const { lat, lon, startdate, enddate } = req.query;

  const curr = moment(startdate).startOf('day');
  const end = moment(enddate).startOf('day');
  let requests = [];
  while(!curr.isAfter(end)) {
    const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${lat},${lon},${
      `${curr.format("YYYY-MM-DD")}T00:00:00`}?exclude=currently,hourly`;

    requests.push(axios(url));
    curr.add(1, 'days');
  }

  axios.all(requests)
    .then(dayArray => {
      res.json({
        data: dayArray.map(day => day.data),
        error: null
      })
    })
    .catch(error => res.json({ data: [], error }));
});

module.exports = router;
