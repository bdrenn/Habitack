const { admin, db } = require("../util/admin")
const firebase = require("firebase")
const config = require("../util/config")
const crypto = require('crypto')

// Get All Goals in collection
exports.getAllGoals = (request, response) => {
  db.collection("users").doc(`${request.user.username}`).collection("goals")
    .get()
    .then((data) => {
      let goals = []
      data.forEach((doc) => {
        console.log(doc.data())
        goals.push({
          goalsId: doc.id,
          title: doc.data().title,
          start: doc.data().start,
          end: doc.data().end,
          completion: doc.data().completion,
          imageUrl: doc.data().imageUrl
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

  let completion = [];
  let startDate = new Date(request.body.start + "Z");
  let endDate = new Date(request.body.end + "Z");

  let timeDiff = endDate.getTime() - startDate.getTime();
  let dayDiff = Math.abs(timeDiff / (1000 * 3600 * 24));
  
  for ( i = 0; i < dayDiff; i++) {
    completion.push("");
  }

  const newGoal = {
    title: request.body.title,
    start: request.body.start,
    end: request.body.end,
    imageUrl: "",
    completion
  }
  db
    .collection("users").doc(`${request.user.username}`).collection("goals").doc(`${newGoal.title}`)
    .set(newGoal)
    .then((doc)=>{
      const responseGoal = newGoal;
      return response.json(responseGoal);
    })
    .catch((err) => {
      response.status(500).json({error: 'Something went wrong'});
      console.error(err);
    });
};

//update the completion of a goal per day
exports.updateCompletionField = (request, response) => {
  let completion = request.body.completion
  let goalRef = db.collection("users").doc(`${request.user.username}`).collection("goals").doc(`${request.params.goalId}`);
  goalRef
     .get()
     .then((doc) => {
       if(!doc.exists) {
        return response.status(404).json({error: 'Goal not found!'})
       }
       return goalRef.set({
         completion
  }, {merge: true})
})
.then(() => {
  response.json({message: "goal completion updated"})
})
.catch((err) => {
  console.log(err)
})
}

// Delete a goal 
exports.deleteGoal = (request, response) => {
  let document = db.collection("users").doc(`${request.user.username}`).collection("goals").doc(`${request.params.goalId}`)
  console.log(document)
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
       console.log(err)
       return response.status(500).json({error: err.code})
     })
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
        imageFileName = `${id}${request.user.username}.${imageExtension}`;
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

        return db.collection("users").doc(`${request.user.username}`).collection("goals").doc(`${request.params.goalId}`).set({imageUrl}, {merge: true});
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

exports.getGoalPic = (request, response) => {
  let userPic = {}
  db.collection("users").doc(`${request.user.username}`).collection("goals").doc(`${request.params.goalId}`).get()
  .then((doc) => {
    userPic.pic = doc.data().imageUrl
    return response.json(userPic)
  })
  .catch((err) => {
    console.log(err)
  })
}