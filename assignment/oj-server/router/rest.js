const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const nodeRestClient = require('node-rest-client').Client;
const restClient = new nodeRestClient();

const ProblemService = require('../services/problemService');

EXECUTOR_SERVER_URL = 'http://localhost:5000/build_and_run_results';
// method name , method 对应的URI, POST/GET
restClient.registerMethod('build_and_run_results', EXECUTOR_SERVER_URL, 'POST');

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

// post /api/v1/build_and_run_results
router.post('/build_and_run_results', jsonParser, (req, res) => {
  const userCodes = req.body.userCodes;
  const lang = req.body.lang;
  console.log('lang: ',lang, 'userCodes', userCodes);

  restClient.methods.build_and_run_results(
    {
      data: {code: userCodes, lang: lang},
      headers: {'Content-Type': 'application/json'}
    },
    (data, response) => {
      const text = `Build result:  ${data['build']}, Execution result: ${data['run']}`;
      data['text'] = text;
      res.json(data);
    });
});

module.exports = router;
