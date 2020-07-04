// back.js
export default class Back {
	constructor(){
		import('./firebase-app.js').then(() => this.startFirebase())
	}

	startFirebase(){
		console.log("firebase-app module loaded");
      	var config = {
    		apiKey: "AIzaSyBvJ1UAm4EvsT9-iGNV7fCISDbA38K0INQ",
    		authDomain: "nodeweaver-3db7c.firebaseapp.com",
    		databaseURL: "https://nodeweaver-3db7c.firebaseio.com",
    		projectId: "nodeweaver-3db7c",
    		storageBucket: "nodeweaver-3db7c.appspot.com",
    		messagingSenderId: "201179043760"
  		};
  		firebase.initializeApp(config);
  		import('./firebase-auth.js').then(() => this.loadAuthUI())
	}

	loadAuthUI(){
		console.log("firebase-auth module loaded");
		import('https://www.gstatic.com/firebasejs/ui/4.5.1/firebase-ui-auth.js').then(() => this.startUser())
	}

	startUser(){
		console.log("firebaseUI module loaded");

		var provider = new firebase.auth.GoogleAuthProvider();

		// Initialize the FirebaseUI Widget using Firebase.
		var ui = new firebaseui.auth.AuthUI(firebase.auth());

		var uiConfig = {
  			callbacks: {
    			signInSuccessWithAuthResult: function(authResult, redirectUrl) {
    				signedIn();
    				return false;
    			},
    			uiShown: function() {
    				document.getElementById('loader').style.display = 'none';
    			}
  			},
 			// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
 			signInFlow: 'popup',
 			signInSuccessUrl: '/',
 			signInOptions: [
    			// Leave the lines as is for the providers you want to offer your users.
    			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    			firebase.auth.EmailAuthProvider.PROVIDER_ID
			]
			// Terms of service url.
			// tosUrl: '<your-tos-url>',
			// Privacy policy url.
			// privacyPolicyUrl: '<your-privacy-policy-url>'
		};
		// The start method will wait until the DOM is loaded.
		var user = firebase.auth().currentUser;
		if (user) {
			console.log("user " + user + " already signed in");
			this.signedIn();
		} else {
			console.log("no user yet, wait for initialisation");
			
			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
				  console.log("State changed - user " + user + " already signed in");
				  this.signedIn();
				} else {
				  console.log("no user signed in");
				  ui.start('#firebaseui-auth-container', uiConfig);
				}
			});
		}
	}

	signedIn(){
		var user = firebase.auth().currentUser;
		document.getElementById('loader').style.display = 'none';
		//var database = firebase.database();

		//firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
  			//console.log("SNAPSHOT:", snapshot.val().mapDataText);
  			//document.getElementById("rootnode").outerHTML = snapshot.val().mapDataText;
  			//scanNodes();
			//addLines();
		//});
		console.log("signedIn", user);
		var textContent;
		if(user.displayName){textContent = user.displayName;} else {textContent = user.email;}
				var newText = document.createElement("DIV");//console.log("2");

				
				newText.setAttribute("class", "nodetitle");//console.log("3");
				var t = document.createTextNode(textContent);//console.log("4");       // Create a text node
				newText.appendChild(t);//console.log("5");
				var nodeReplace = document.getElementById("logintext");
				nodeReplace.parentNode.replaceChild (newText, nodeReplace);
				newText.style.position = 'absolute';
				newText.style.right = '64px';
				newText.style.top = '10px';	
				if(user.photoURL){
					var newImage = document.createElement("IMG");

					newImage.src = user.photoURL;
					newText.parentNode.appendChild(newImage);
					newImage.style.width = "50px";
					newImage.style.height = "50px";
					newImage.style.position = 'absolute';
					newImage.style.right = '2px';
					newImage.style.top = '2px';
		}
	}
}

