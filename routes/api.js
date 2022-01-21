const express = require("express");
const router = express.Router();
const db = require("../http/queries");
const bodyParser = require('body-parser')


router.get('/', (req, res, next)=>{
    res.render("index");
});


router.get('/reports', db.getIncidents);

router.post('/report-incident', db.createIncident);

module.exports = router;