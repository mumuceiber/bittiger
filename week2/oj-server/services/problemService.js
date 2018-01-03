const ProblemModel = require('../models/problemModel');
const getProblems = function(){
  console.log('problem service get problems');
  return new Promise((resolve, reject) =>{
    ProblemModel.find({}, (err, problems) => {
      if(err){
        reject(err);
      }else{
        resolve(problems);
      }
    });
  });
}

const getProblem = function(id){
  console.log('problem service get problem')
  return new Promise((resolve, reject) => {
    ProblemModel.findOne({id: id}, (err, problem) => {
      if(err){
        reject(err);
      }else{
        resolve(problem);
      }
    });
  });
}

const addProblem = function(newProblem){
  console.log('problem service add problem');
  return new Promise((resolve, reject) => {
    // check by name
    ProblemModel.findOne({name: newProblem.name}, (err, data) =>{
      if(data){
        reject('Problem already exists!');
      }else{
        // save to mongodb
        ProblemModel.count({}, (err, count) => {
          newProblem.id = count + 1;
          const mongoProblem  = new ProblemModel(newProblem);
          mongoProblem.save();
          resolve(mongoProblem);
        });
      }
    });
  });
}

//
// var problems = [
//   {
//     "id":1,
//     "name":"Two Sum",
//     "desc":"Given an array of integers",
//     "difficulty":"easy"
//   },
//   {
//     "id":2,
//     "name":"Three Sum",
//     "desc":"Given an array of integers",
//     "difficulty":"medium"
//   },
//   {
//     "id":3,
//     "name":"Four Sum",
//     "desc":"Given an array of integers",
//     "difficulty":"hard"
//   }
// ];

// const getProblems = function(){
//   console.log('In the problem service get problems');
//   return new Promise( function(resolve, reject){
//     resolve(problems);
//   });
//
// }
//
// const getProblem = function(id) {
//   console.log('In the problem service get one problem');
//   return new Promise((resolve, reject) => {
//     resolve(problems.find( problem => problem.id === id ));
//   });
// }
//
// const addProblem = function(newProblem){
//   console.log('In the problem service add problem');
//   return new Promise((resolve, reject) => {
//     if(problems.find(problem => problem.name === newProblem.name)){
//       reject('Problem already exists!');
//     }else{
//       newProblem.id = problems.length + 1;
//       problems.push(newProblem);
//       resolve(newProblem);
//     }
//   });
// }
// module.exprots.getProblems = getProblems;

module.exprots = {
  getProblems: getProblems,
  getProblem: getProblem,
  addProblem: addProblem
}
