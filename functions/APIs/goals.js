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

// Upload profile picture
exports.addGoalPic = (request, response) => {
  //imports
  const BusBoy = require('busboy');
	const path = require('path');
	const os = require('os');
	const fs = require('fs');
  const busboy = new BusBoy({ headers: request.headers });
  const id = crypto.randomBytes(8).toString('hex');
  
  //let myCollection = db.doc(`/goals/${request.user.username}/${request.body.title}`)
  

	let imageFileName;
  let imageToBeUploaded = {};
  //check if it is a image
	busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
		if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
			return response.status(400).json({ error: 'Wrong file type submited' });
    }
    //get the extension .jpg etc
    const imageExtension = filename.split('.')[filename.split('.').length - 1];
    
        //filename is username.extension
        imageFileName = `${id} + ${request.user.username}.${imageExtension}`;
    const filePath = path.join(os.tmpdir(), imageFileName);
    
		imageToBeUploaded = { filePath, mimetype };
		file.pipe(fs.createWriteStream(filePath));
    });

    busboy.on('field', function(fieldname, val) {    
      request.body[fieldname] = val;
});

	busboy.on('finish', () => {
		admin
			.storage()
			.bucket()
			.upload(imageToBeUploaded.filePath, {
				resumable: false,
				metadata: {
					metadata: {
						contentType: imageToBeUploaded.mimetype
					}
				}
			})
			.then(() => {
        
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
				return db.collection("goals").doc(`${request.user.username}`).collection("exercises").doc(request.body.title).set({
					imageUrl}, {merge: true}
				);
			})
			.then(() => {
				return response.json({ message: 'Image uploaded successfully' });
			})
			.catch((error) => {
				console.error(error);
				return response.status(500).json({ error: error.code });
			});
	});
	busboy.end(request.rawBody);
};
