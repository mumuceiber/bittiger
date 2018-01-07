const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const ProblemService = require('../services/problemService')

//get /api/v1/problems
router.get('/problems', (req, res) => {
  ProblemService.getProblems()
    .then( problems => res.json(problems));
});

// get /api/v1/problems/:id
router.get('/problems/:id', (req, res) => {
  const id = req.params.id;
  console.log('server side get problem:id' + id);
  ProblemService.getProblem(+id)
    .then( problem => res.json(problem));
});

// post /api/v1/problems
router.post('/problems', jsonParser, (req, res) => {
  ProblemService.addProblem(req.body)
    .then( problem => {
      res.json(problem);
    }, (error) => {
      res.status(400).send(' rest Problem already exists!');
    });
});

module.exports = router;
