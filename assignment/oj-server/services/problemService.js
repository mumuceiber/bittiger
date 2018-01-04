const ProblemModel = require('../models/problemModel')

const getProblems = function(){
  return new Promise( (resolve, reject) => {
    console.log('problem service get problems')
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
  return new Promise( (resolve, reject) => {
    console.log('problem service get problem')
    ProblemModel.findOne({id:id}, (err, problem) => {
      if(err){
        reject(err);
      }else{
        resolve(problem);
      }
    });
  });
}

const addProblem = function(newProblem){
  return new Promise( (resolve, reject) => {
    console.log('problem service add problem');
    ProblemModel.findOne({name: newProblem.name}, (err, data) => {
      if(data){
        reject('Problem already exists!');
      }else{
        ProblemModel.count({}, (err, count) => {
          if(err){
            reject('Error when get number of problems');
          }else{
            newProblem.id = count + 1;
            const mongoProblem = new ProblemModel(newProblem);
            mongoProblem.save();
            resolve(mongoProblem);
          }
        });
      }
    });
  });
}

module.exports = {
  getProblems,
  getProblem,
  addProblem
}
