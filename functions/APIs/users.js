// users.js

const { admin, db } = require("../util/admin")
const config = require("../util/config")

const firebase = require("firebase")

firebase.initializeApp(config)

const { validateLoginData, validateSignUpData } = require("../util/validators")
const crypto = require('crypto')

// Login
exports.loginUser = (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password,
  }
 
  const { valid, errors } = validateLoginData(user)
  if (!valid) return response.status(400).json(errors)

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken()
    })
    .then((token) => {
      return response.json({ token })
    })
    .catch((error) => {
      console.error(error)
      return response
        .status(403)
        .json({ general: "wrong credentials, please try again" })
    })
}

exports.signUpUser = (request, response) => {
  const newUser = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    phoneNumber: request.body.phoneNumber,
    country: request.body.country,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    username: request.body.username,
  }

  const { valid, errors } = validateSignUpData(newUser)

  if (!valid) return response.status(400).json(errors)

  let token, userId
  db.doc(`/users/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return response
          .status(400)
          .json({ username: "this username is already taken" })
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password)
      }
    })
    .then((data) => {
      userId = data.user.uid
      return data.user.getIdToken()
    })
    .then((idtoken) => {
      token = idtoken
      const userCredentials = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        displayname: newUser.username,
        phoneNumber: newUser.phoneNumber,
        country: newUser.country,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      }
      return db.collection("users").doc(`${userCredentials.username}`).set(userCredentials)
    })
    .then(() => {
      return response.status(201).json({ token })
    })
    .catch((err) => {
      console.error(err)
      if (err.code === "auth/email-already-in-use") {
        return response.status(400).json({ email: "Email already in use" })
      } else {
        return response
          .status(500)
          .json({ general: "Something went wrong, please try again" })
      }
    })
}

exports.getCurrentUser = (request, response) => {
  let userData = {};
db
  .doc(`/users/${request.user.username}`)
  .get()
  .then((doc) => {
    if (doc.exists) {
              userData.userCredentials = doc.data();
              return response.json(userData);
    }	
  })
  .catch((error) => {
    console.error(error);
    return response.status(500).json({ error: error.code });
  });
}

exports.updateName = (request, response) => {
  let document = db.collection('users').doc(`${request.body.userName}`);
    return document.update({
        firstName: request.body.firstName,
        lastName: request.body.lastName
    })
  .then(() => {
      response.json({message: 'updated successfully'})
  })
  .catch((err) => {
      console.error("Error updating name: ", error);
      });
}

exports.updateEmail = (request, response) => {
  let document = db.collection('users').doc(`${request.body.userName}`);
   document.update({
        email: request.body.email
    })
  .then(() => {
      response.json({message: 'updated successfully'})
  })
  .catch((err) => {
      console.error("Error updating email: ", error);
      })
      var user = firebase.auth().currentUser;
      console.log(user.email)
      return firebase.auth().currentUser.updateEmail(request.body.email)
    .then(() => {
      response.json({ message: "success using auth"} )
    })
    .catch(err => {
      console.error("Error updating with auth: ", err)
    })
}

exports.updatePass = (request, response) => {
      return firebase.auth().currentUser.updatePassword(request.body.passOne)
    .then(() => {
      response.json({ message: "success using auth"} )
    })
    .catch(err => {
      console.error("Error updating with auth: ", err)
    })
}

exports.changeDisplay = (request, response) => {
  let document = db.collection('users').doc(`${request.body.userName}`);
    return document.update({
        displayname: request.body.displayName,
    })
  .then(() => {
      response.json({message: 'updated successfully'})
  })
  .catch((err) => {
      console.error("Error updating name: ", error);
      });
}


exports.addProfilePic = (request, response) => {
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
        imageFileName = `${id}_${request.user.username}_profile.${imageExtension}`;
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

        return db.collection("users").doc(`${request.user.username}`).set({imageUrl}, {merge: true});
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

exports.getProfilePic = (request, response) => {
  let userPic = {}
  db.collection("users").doc(`${request.user.username}`).get()
  .then((doc) => {
    userPic.pic = doc.data().imageUrl
    return response.json(userPic)
  })
  .catch((err) => {
    console.log(err)
  })
}