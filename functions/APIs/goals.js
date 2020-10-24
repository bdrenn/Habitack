const { db } = require("../util/admin")

// Get All Goals in collection
exports.getAllGoals = (request, response) => {
  db.collection("goals")
    .get()
    .then((data) => {
      let goals = []
      data.forEach((doc) => {
        goals.push({
          goalsId: doc.id,
          title: doc.data().title,
          start: doc.data().start,
          end: doc.data().end,
          completion: doc.data().completion
        })
      })
      return response.json(goals)
    })
    .catch((err) => {
      console.error(err)
      return response.status(500).json({ error: err.code })
    })
}

// Add a new goal
exports.addGoal = (request, response) => {

  // Check Request params exist
  if (request.body.title.trim() === ''){
    return response.status(400).json({title: 'Must not be empty'})
  }
  if (request.body.start.trim() === '') {
    return response.status(400).json({start: 'must not be empty'})
  }
  if (request.body.end.trim() === '') {
    return response.status(400).json({end: 'must not be empty'})
  }
  if (request.body.completion === null) {
    return response.status(400).json({completion: 'must not be empty'})
  }

  const newGoal = {
    title: request.body.title,
    start: request.body.start,
    end: request.body.end,
    completion: request.body.completion
  }
  db
    .collection('goals')
    .add(newGoal)
    .then((doc)=>{
      const responseGoal = newGoal;
      responseGoal.id = doc.id;
      return response.json(responseGoal);
    })
    .catch((err) => {
      response.status(500).json({error: 'Something went wrong'});
      console.error(err);
    });
};

// Delete a goal 
exports.deleteGoal = (request, response) => {
  const document = db.doc(`/goals/${request.params.goalId}`);
  console.log(document);
  document
    .get()
    .then((doc) => {
      if(!doc.exists) {
        return response.status(404).json({error: 'Goal not found!'})
      }
      return document.delete();
    })
    .then(() => {
      response.json({message: 'Delete was successful!'});
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({error: err.code});
    });
}

// Edit a goal
exports.editGoal = (request, response) => {
  let document = db.collection('goals').doc(`${request.params.goalId}`);
  document.update(request.body)
  .then(() => {
    response.json({message: 'Updated successfully!'});
  })
  .catch((err) => {
    console.error(err);
    return response.status(500).json({
      error: err.code
    });
  });
};
