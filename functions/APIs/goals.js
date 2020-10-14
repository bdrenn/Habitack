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
          body: doc.data().body,
          start: doc.data().start,
          end: doc.data().end   
        })
      })
      return response.json(goals)
    })
    .catch((err) => {
      console.error(err)
      return response.status(500).json({ error: err.code })
    })
}

