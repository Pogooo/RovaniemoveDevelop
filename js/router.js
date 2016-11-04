angular.module('App', ['ui.router', 'formPosts', 'ngAnimate', 'ui.bootstrap', 'imageCropper', 'angularFileUpload', 'ngImgCrop', 'angular-svg-round-progressbar'])
.provider('modalState', function($stateProvider) {
  var provider = this;
  var modalResult;
  this.$get = function() {
    return provider;
  };
  this.state = function(stateName, options) {
    var modalInstance;
    $stateProvider.state(stateName, {
      url: options.url,
      onEnter: ['$uibModal', '$state', function($uibModal, $state) {
        modalInstance = $uibModal.open(options);
        // When the modal uses $close({..}), the data (=result) will be assigned to the parent state as 'modalResult'.
        modalInstance.result.then(function(result) {
          modalResult = result;
        }).finally(function() { // modal closes
          if(modalResult) {
            $state.get('^').modalResult = modalResult;
          }
          modalInstance = modalResult = null;
          if ($state.$current.name === stateName) {
            $state.go('^'); // go to parent state
          }
        });
      }],
      onExit: function() {
        if (modalInstance) {
          modalInstance.close();
        }
      }
    });
    return provider;
  };
})

.config(function($stateProvider, $urlRouterProvider, modalStateProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/login");
  //
  // Now set up the states
  $stateProvider

// Login state
  .state('login', {
    url: "/login",
    views: {
      'content': {
        templateUrl: "partials/login.html",
        controller: 'LoginCtrl'
      }
    }
  })

// Register state
  .state('register', {
    url: "/register",
    views: {
      'content': {
        templateUrl: "partials/register.html",
        controller: 'RegisterCtrl'
      }
    }
  })

// User state
	.state('user', {
    url: "/user",
	  views: {
		  'content': {
			  templateUrl: "partials/user.html",
        controller: 'UserCtrl'
		  }
	  }
	})
	
// User page's error
	.state('user.error', {
    url: "/error",
	  views: {
		  'menucontent@user': {
			  templateUrl: "partials/error.html",
        controller: 'ErrorCtrl'
		  }
	  }
	})

// Ranking state
	.state('user.ranking', {
    url: "/ranking",
	  views: {
		  'menucontent@user': {
			  templateUrl: "partials/ranking.html",
			  controller: 'RankingCtr'
		  }
	  }
	})

// Events state
	.state('user.events', {
    url: "/events",
	  views: {
		  'menucontent@user': {
			  templateUrl: "partials/events.html",
			  controller: 'EventsCtrl'
		  }
	  }
	})

// Profile state
	.state('user.profile', {
    url: "/profile/:userName",
	  views: {
		  'menucontent@user': {
			  templateUrl: "partials/profile.html",
			  controller: "ProfileCtrl"
		  }
	  }
	})

// Settings state
	.state('user.settings', {
    url: "/settings",
	  views: {
		  'menucontent@user': {
			  templateUrl: "partials/settings.html",
			  controller: "SettingsCtrl"
		  }
	  }
	})

// Logout state	
	.state('user.logout', {
    url: "/logout",
	  views: {
		  'menucontent@user': {
			  templateUrl: "partials/logout.html",
			  controller: "LogoutCtrl"
		  }
	  }
	})

// Admin state
  .state('admin', {
    url: "/admin",
    views: {
      'content': {
        templateUrl: "partials/admin.html",
        controller: 'AdminCtrl'
      }
    }
  })

// Admin add state
  .state('admin.add', {
    url: "/adminAdd",
    views: {
      'menucontent@admin': {
        templateUrl: "partials/adminAdd.html",
        controller: 'adminAddCtrl'
      }
    }
  })

// Admin feedback state
  .state('admin.feedback', {
    url: "/adminFeedback",
    views: {
      'menucontent@admin': {
        templateUrl: "partials/adminFeedback.html",
        controller: 'adminFeedbackCtrl'
      }
    }
  })

// Admin delet state
  .state('admin.delete', {
    url: "/adminDelete",
    views: {
      'menucontent@admin': {
        templateUrl: "partials/adminDelete.html",
        controller: 'adminDeleteCtrl'
      }
    }
  })
	
	modalStateProvider.state('user.profile.pictureweb', {
    url: '/pictureweb',
    controller: 'userProfPictureWebCtrl',
    templateUrl: 'partials/modals/profilepictureUpload-browser.html'
  })
	
	// Profile picture state
	modalStateProvider.state('user.profile.picture', {
    url: "/picture/:imgSrc",
		templateUrl: "partials/modals/profilepictureUpload.html",
		controller: "userProfPictureCtrl",
	})
})

// Singleton Shared User
.service('sharedUser', function() {
  var userID;
  var username;
  var points;
  var classroomID;
  var schoolID;
  var profilePicture;
	var admin;
  var sick;

  return {
    getUserID: function() {
      return userID;
    },
    getUsername: function() {
      return username;
    },
    getPoints: function() {
      return points;
    },
		getAdmin: function() {
      return admin;
    },
    getClassroomID: function() {
      return classroomID;
    },
    getSchoolID: function() {
      return schoolID;
    },
    getProfilePicture: function() {
      return profilePicture;
    },
    getSick: function() {
      return sick;
    },
    setUserID: function(_userID) {
      userID  = _userID;
    },
    setUsername: function(_username) {
      username  = _username;
    },
    setPoints: function(_points) {
      points  = _points;
    },
    setClassroomID: function(_classroomID) {
      classroomID = _classroomID;
    },
    setSchoolID: function(_schoolID) {
      schoolID  = _schoolID;
    },
    setProfilePicture: function(_profilePicture) {
      profilePicture  = _profilePicture;
    },
		setAdmin: function(_admin) {
      admin  = _admin;
    },
    setSick: function(_sick) {
      sick  = _sick;
    }
  }
})

// Admin Controller
.controller('AdminCtrl', function($scope, $http) {
})

// User Controller
.controller('UserCtrl', function($scope, $http, sharedUser) {
	$scope.admin = sharedUser.getAdmin();
})

// Error Controller
.controller('ErrorCtrl', function($scope, $http) {  
  // TODO
})

// Register Controller
.controller('RegisterCtrl', function($scope, $http, $state) {
	$scope.result           = false;
  $scope.schoolsList      = [];
  $scope.classroomsList   = [];
  $scope.school           = false; //for the class ng-show
 
  $http.get('http://89.90.16.70/Rovaniemove/API/schools')
  .success(function(data, status, headers) {
    $scope.schoolsList    = data.Schools;

    $scope.changed = function() {
      $http.get('http://89.90.16.70/Rovaniemove/API/classrooms/' + $scope.school)
      .success(function(data, status, headers) {
        $scope.classroomsList   = data.Classrooms;
      });
    }
  });

  $scope.onRegisterClick  = function(view) {
    if($scope.gender && $scope.firstname && $scope.lastname && $scope.username && $scope.school && $scope.classroom && $scope.password && $scope.passwordCheck) {
      if($scope.password == $scope.passwordCheck) {
        $gender = 1;

        if($scope.gender == 'F') {
          $gender = 2;
        }

        $params = {
          'gender': $gender,
          'firstname': $scope.firstname,
          'lastname': $scope.lastname,
          'username': $scope.username,
          'schoolID': $scope.school,
          'classroomID': $scope.classroom,
          'password': $scope.password,
          'admin': 0,
          'sick': 0
        };

        $http.post('http://89.90.16.70/Rovaniemove/API/register', $params)
        .success(function(data, status, headers) {
          if(data.Success == 1) {
            function confirmCallback() {
              $state.go('login');
            }
            navigator.notification.confirm(data.Message, confirmCallback, 'Rekisteröidy', ['OK']);
          } else {
            navigator.notification.confirm(data.Message, confirmCallback, 'Rekisteröidy', ['OK']);
          }
        }); 
      } else {
        function alertDismissed() {
          $scope.password       = '';
          $scope.passwordCheck  = '';
        }
        navigator.notification.alert('Eri salasanaa', alertDismissed, 'Rekisteröidy', 'OK');
      }
    } else {
      navigator.notification.alert('Täytä kaikki kentät', null, 'Rekisteröidy', 'OK');
    }
  }

  $scope.onSigninClick  = function(view) {
    $state.go('login');
  }
})

// Login Controller
.controller('LoginCtrl', function($scope, $http, $state, sharedUser) {
	
  $scope.onLoginClick = function() {
    if($scope.username && $scope.password) {
      $http.post('http://89.90.16.70/Rovaniemove/API/login', {'username': $scope.username, 'password': $scope.password})
      .success(function(data, status, headers) {
        if(data.Success == 1) {
					var storage = window.localStorage;
					storage.setItem("name", $scope.username); // Pass a key name and its value to add or update that key.
					storage.setItem("password", $scope.password); // Pass a key name and its value to add or update that key.
					
          sharedUser.setUserID(data.User['id']);
          sharedUser.setUsername(data.User['username']);
          sharedUser.setPoints(data.User['points']);
          sharedUser.setSchoolID(data.User['school']);
          sharedUser.setClassroomID(data.User['classroom']);
          sharedUser.setProfilePicture(data.User['pictureUrl']);
					sharedUser.setAdmin(data.User['admin']);
          sharedUser.setSick(data.User['sick']);

          $state.go('user.profile');
        }else {
          function alertDismissed() {
            $scope.password = '';
          }
          navigator.notification.alert(data.Message, alertDismissed, 'Kirjaudu sisään', 'OK');
        }
      });
    }else {
      navigator.notification.alert('Täytä kaikki kentät', null, 'Kirjaudu sisään', 'OK');
    }
  }
	
	if(window.localStorage.getItem("name") != null && window.localStorage.getItem("password") != null) {
		var storage = window.localStorage;
		$scope.username = storage.getItem("name");
		$scope.password = storage.getItem("password");
		$scope.onLoginClick();
	}
})

// Profile Controller
.controller('ProfileCtrl', function($scope, sharedUser, $http, $state, $stateParams) {	
  $scope.achievementsList   = [];
	$scope.valami             = $stateParams;
	var profilePicture        = document.getElementById('profilePicture');
	
	$scope.searchEnter = function(){
		$state.go('user.profile', {userName: $scope.search});
	};
	
	$scope.searchForAnother = $stateParams.userName;
	
	if($scope.searchForAnother != ""){
		//load searched user's data
		$http.get('http://89.90.16.70/Rovaniemove/API/search/' + $stateParams.userName)
      .success(function(data, status, headers) {
				console.log("kapott data: ", data);
        if(data.User[0]['userID'] != null) {
          $scope.result       = data.User;
          $scope.username     = data.User[0]['username'];
          $scope.time         = data.User[0]['points'];
          var timeDay         = data.User[0]['SUM(duration)'];
          var timeWeek        = data.TimeWeek[0]['SUM(duration)'];
					$scope.userid       = data.User[0]['userID'];

					if(data.User[0]['pictureUrl'] == null) {
						profilePicture.src  = "img/usermale.png";
					} else {
						profilePicture.src  = data.User[0]['pictureUrl'];
					}
          
          if(!timeDay)
            timeDay  = 0;
          else if(timeDay > 180) {
            timeDay  = 180;
          }

          if(!timeWeek)
            timeWeek  = 0;
          else if(timeWeek > 1260) {
            timeWeek  = 1260;
          }

					$scope.timeDayP   = Math.floor(timeDay/1.8);
          $scope.timeWeekP  = Math.floor(timeWeek/12.6);
          $scope.timeDay    = timeDay;
          $scope.timeWeek   = timeWeek;
					
					$http.get('http://89.90.16.70/Rovaniemove/API/achievements/' + $scope.userid)
					.success(function(data, status, headers) {
						$scope.achievementsList = data.Achievements;
					});
					$http.get('http://89.90.16.70/Rovaniemove/API/activities/' + $scope.userid)
					.success(function(data, status, headers) {
						$scope.activities = data.Activities;

            for (i = 0; i < $scope.activities.length; i ++) {
              if($scope.activities[i]['level'] == 1 || $scope.activities[i]['level'] == '1') {
                $scope.activities[i]['points']  = parseInt($scope.activities[i]['duration']) * 10;
              } 
              else if($scope.activities[i]['level'] == 2 || $scope.activities[i]['level'] == '2'){
                $scope.activities[i]['points']  = parseInt($scope.activities[i]['duration']) * 20;
              }
            }
					});
        }
				else{
					$state.go("user.error");
				}		
    });
	}
	else {
		//load logged user's data
		
		$http.get('http://89.90.16.70/Rovaniemove/API/achievements/' + sharedUser.getUserID())
		.success(function(data, status, headers) {
			$scope.achievementsList = data.Achievements;
		});

		$scope.username = sharedUser.getUsername();

    if(!sharedUser.getProfilePicture()) {
      profilePicture.src    = "img/usermale.png";
    } else {
      profilePicture.src  = sharedUser.getProfilePicture();
    }
		
		$http.get('http://89.90.16.70/Rovaniemove/API/time/' + sharedUser.getUserID())
		.success(function(data, status, headers) {
      $scope.time     = data.Points[0]['points'];
      var resTimeDay  = parseInt(data.TimeDay[0]['SUM(duration)']);
      var resTimeWeek = parseInt(data.TimeWeek[0]['SUM(duration)']);

      if(!resTimeDay)
        resTimeDay  = 0;
      else if(resTimeDay > 180) {
        resTimeDay  = 180;
      }

      if(!resTimeWeek)
        resTimeWeek  = 0;
      else if(resTimeWeek > 1260) {
        resTimeWeek  = 1260;
      }

      $scope.timeDayP   = Math.floor(resTimeDay/1.8);
      $scope.timeWeekP  = Math.floor(resTimeWeek/12.6);
      $scope.timeDay    = resTimeDay;
      $scope.timeWeek   = resTimeWeek;
    });
		
		$http.get('http://89.90.16.70/Rovaniemove/API/activities/' + sharedUser.getUserID())
		.success(function(data, status, headers) {
			$scope.activities = data.Activities;

      for (i = 0; i < $scope.activities.length; i ++) {
        if($scope.activities[i]['level'] == 1 || $scope.activities[i]['level'] == '1') {
          $scope.activities[i]['points']  = parseInt($scope.activities[i]['duration']) * 10;
        } 
        else if($scope.activities[i]['level'] == 2 || $scope.activities[i]['level'] == '2'){
          $scope.activities[i]['points']  = parseInt($scope.activities[i]['duration']) * 20;
        }
      }
		});
	}
	
  $scope.$watch( function () { return $state.current.modalResult; }, function (result) {
    if(angular.isDefined(result) && result.successPictureUpload) { // it may be necessary to add a check if the result is really a Project Obj (if there are more modals with `projects` as parent state!)
			//image upload
			profilePicture.src = result.pictureSrc;
			sharedUser.setProfilePicture(result.pictureSrc);
			result.successPictureUpload = false;
    }
	});
  
  $scope.onClickPicture = function() {
		if($scope.searchForAnother == '') {
			//check the desktop browser
			//var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
			if (device.platform == 'browser') {
				$state.go("user.profile.pictureweb");
			}
			else {
				$state.go("user.profile.picture");
			}
		}
	}
})

// Profile picture Controller
.controller('userProfPictureCtrl', function($scope, sharedUser, $stateParams, FileUploader) {
	var uploader = $scope.uploader = new FileUploader({
		url: "http://89.90.16.70/Rovaniemove/API/pictureupload"
	});
	
	uploader.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
  });
	
	uploader.onAfterAddingFile = function(item) {
    item.croppedImage = '';
    var reader = new FileReader();
    reader.onload = function(event) {
      $scope.$apply(function(){
        item.image = event.target.result;
      });
    };
    reader.readAsDataURL(item._file);

    if (uploader.queue.length > 1) {
      uploader.queue.splice(0, 1);
    }
  };
	
	uploader.onBeforeUploadItem = function(item) {
		console.info('onBeforeUploadItem', item);
		console.log(item._file);
		
    var blob = dataURItoBlob(item.croppedImage);
    item._file = blob;

    item.formData.push({userid: sharedUser.getUserID()});
  };
	
	
	var dataURItoBlob = function(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for(var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: mimeString});
  };
	
	uploader.onSuccessItem  = function(item, response, status, headers) {
		var data = {
      "successPictureUpload" :  true,
			"pictureSrc": response.Message
    }
    $scope.$close(data);
	};
	
	$scope.close = function() {
		$scope.$close();
	}
	
	$scope.cameraPic = function() {
		$options  = {
			quality: 25, 
			destinationType: Camera.DestinationType.FILE_URI, 
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			encodingType: Camera.EncodingType.JPEG,
			sourceType: Camera.PictureSourceType.CAMERA
		};
		if(device.platform == "iOS"){
      alert("IPHONE");
			$options['destinationType'] = Camera.DestinationType.NATIVE_URI;
		}
	
		navigator.camera.getPicture (
			function(imgSrc) {
				sharedUser.setProfilePicture(imgSrc);


 					function getFileEntry(imgUri) {
             $scope.$apply(function (){
									var dummy = new FileUploader.FileItem(uploader, {
											lastModifiedDate: new Date(),
											size: 1e6,
											type: 'image/jpeg',
											name: 'test_file_name'
									});
									//dummy.isUploaded = true;
									//dummy.isSuccess = true;
									
									dummy.croppedImage = '';
									var reader = new FileReader();
									reader.onload = function(event) {
										$scope.$apply(function(){
											dummy.image = event.target.result;
										});
									};
									
									console.log("valamivan");
									dummy.image = imgUri;
									
									uploader.queue.push(dummy);
									
									if (uploader.queue.length > 1) {
										uploader.queue.splice(0, 1);
									}
								});

						window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {
							
								

								// Do something with the FileEntry object, like write to it, upload it, etc.
								// writeFile(fileEntry, imgUri);
								//uploader.queue.push(fileEntry);
								//console.log("got file: " + fileEntry.fullPath);
								// displayFileData(fileEntry.nativeURL, "Native URL");

						}, function () {
							// If don't get the FileEntry (which may happen when testing
							// on some emulators), copy to a new FileEntry.
								createNewFileEntry(imgUri);
						});
					} 
					
					uploader.onSuccessItem  = function(item, response, status, headers) {
						var data = {
							"successPictureUpload" :  true,
							"pictureSrc": response.Message
						}
						$scope.$close(data);
					};
				
					getFileEntry(imgSrc);

				$scope.result = 'http://89.90.16.70/Rovaniemove/API/change/picture/' + imgSrc + '/' + sharedUser.getUserID();
			},
			null,
			$options
		);
	} ;
	
	uploader.onSuccessItem = function(item, response, status, headers) {
		var data = {
			"successPictureUpload" :  true,
			"pictureSrc": response.Message
		}
		$scope.$close(data);
	};
	
		uploader.onErrorItem = function(item, response, status, headers) {
	};
})

// Profile picture web Controller
.controller('userProfPictureWebCtrl', function($scope, sharedUser, FileUploader) {
	$scope.fileUploadURL = "http://89.90.16.70/Rovaniemove/API/pictureupload";
	
	$scope.cancel = function () {
    $state.go('^');
  }
	
	var uploader = $scope.uploader = new FileUploader({
		url: "http://89.90.16.70/Rovaniemove/API/pictureupload"
	});
	
	uploader.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
  });
	
	uploader.onAfterAddingFile = function(item) {
    item.croppedImage = '';
    var reader = new FileReader();
    reader.onload = function(event) {
      $scope.$apply(function(){
        item.image = event.target.result;
      });
    };
    reader.readAsDataURL(item._file);

    if (uploader.queue.length > 1) {
      uploader.queue.splice(0, 1);
    }
  };
	
	uploader.onBeforeUploadItem = function(item) {
		console.info('onBeforeUploadItem', item);
		console.log(item._file);
		
    var blob = dataURItoBlob(item.croppedImage);
    item._file = blob;

    item.formData.push({userid: sharedUser.getUserID()});
  };
	
	var dataURItoBlob = function(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for(var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: mimeString});
  };
	
	uploader.onSuccessItem  = function(item, response, status, headers) {
		var data = {
      "successPictureUpload" :  true,
			"pictureSrc": response.Message
    }
    $scope.$close(data);
	};
	
  /* 	uploader.onCompleteAll = function(){
    var data = {
      "successPictureUpload" :  true
    }
    $scope.$close(data);
  }; */

	$scope.cropImageAndUpload = function(base64) {
		var profilePicture = document.getElementById('profilePicture');
		profilePicture.src = base64;
		sharedUser.setProfilePicture(imgSrc);
	};
})

// Events Controller
.controller('EventsCtrl', function($scope, $http, sharedUser) {
  $scope.durations  = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 150, 180];
  
  $http.get('http://89.90.16.70/Rovaniemove/API/sports')
  .success(function(data, status, headers) {
        $scope.sportsList    = data.Sports;
  });
  
  $scope.sport = false; //For the activity's name ng-show

  $scope.onAddClick = function () {
    if($scope.sport && $scope.duration && $scope.level) {
      $level  = 1;

      if($scope.level == 'H') {
        $level  = 2;
      }

      $date       = new Date();
      $month      = parseInt($date.getMonth());

      if($month == 11) {
        $month  = 0;
      } else {
        $month++;
      }
        
      $dateTime   = $date.getFullYear() + '-' + $month + '-' + $date.getDate() + ' ' + $date.getHours() + ':' + $date.getMinutes() + ':' + $date.getSeconds();

      $params = {
        'sportID': $scope.sport,
        'datetime': $dateTime, 
        'duration': $scope.duration, 
        'level': $level, 
        'userID': sharedUser.getUserID()
      };
            
      $http.post('http://89.90.16.70/Rovaniemove/API/activities', $params)
      .success(function(data, status, headers) {
        if(data.Success == 1) {
          function onConfirm(buttonIndex) {
            if(buttonIndex == 1) {
              $scope.school   = '';
              $scope.duration = '';
            }
          }
          navigator.notification.confirm(data.Message, onConfirm, 'Aktiivisuus', ['OK']);
        } else {
          navigator.notification.alert(data.Message, null, 'Aktiivisuus', 'OK');
        }        
      });
    } else {
      navigator.notification.alert('Täytä kaikki kentät', null, 'Aktiivisuus', 'OK');
    }
  }
})

// Ranking Controller
.controller('RankingCtr', function($scope, $http) {
  $scope.currenttable = "school";

  $http.get('http://89.90.16.70/Rovaniemove/API/ranking/school')
	.success(function(data, status, headers) {
    if(data.Success == 1) {
      $scope.tabledata = data.Result;

      for(i = 0; i < $scope.tabledata.length; i++) {
        if($scope.tabledata[i]['points'] == 0 || $scope.tabledata[i]['points'] == '0' || $scope.tabledata[i]['points'] == null) {
          $scope.tabledata[i]['points'] = 0;
        }
      }
    }
  });

	$scope.tableChange = function(tablename) {
		$scope.currenttable = tablename;

		$http.get('http://89.90.16.70/Rovaniemove/API/ranking/' + tablename)
		.success(function(data, status, headers) {
      if(data.Success == 1) {
        $scope.tabledata = data.Result;

        for(i = 0; i < $scope.tabledata.length; i++) {
          if($scope.tabledata[i]['points'] == 0 || $scope.tabledata[i]['points'] == '0' || $scope.tabledata[i]['points'] == null) {
            $scope.tabledata[i]['points'] = 0;
          }
        }
      }        
    });
	};
})

// Settings Controller
.controller('SettingsCtrl', function($scope, $http, $uibModal, sharedUser, $state) {
	$scope.admin = sharedUser.getAdmin();
  $scope.result_feedback  = '';
	
  var   storage = window.localStorage;
  
  $scope.onClickPasswordChange = function() {
    $scope.result           = '';

    if(!$scope.password.old || !$scope.password.new1 || !$scope.password.new2) {
      $scope.result = 'Täytä kaikki kentät';
      return false;
    }

    if($scope.password.old != storage.getItem("password")) {
      $scope.result = 'Väärä nykyinen salasana';
      return false;
    }

    if($scope.password.new1 != $scope.password.new2) {
      $scope.result = 'Eri salasanaa';
      return false;
    }

    $http.put('http://89.90.16.70/Rovaniemove/API/password/' + $scope.password.new1 + '/' + sharedUser.getUserID())
    .success(function(data, status, headers) {
      function onConfirm(buttonIndex) {
        storage.setItem("password", $scope.password.new1);
        $scope.password.old   = '';
        $scope.password.new1  = '';
        $scope.password.new2  = '';
      }
      navigator.notification.confirm(data.Message, onConfirm, 'Muokkaa', ['OK']); 
    });
  }

  $scope.onClickFeedback = function () {
    $scope.result_feedback  = '';

    if(!$scope.feedback) {
      $scope.result_feedback = 'Palaute kenttä tyhjäksi';
      return false;
    }

    $http.post('http://89.90.16.70/Rovaniemove/API/feedbacks', {'senderID': sharedUser.getUserID(), 'description': $scope.feedback})
    .success(function(data, status, headers) {
      function onConfirm(buttonIndex) {
        $scope.feedback = '';
      }
      navigator.notification.confirm(data.Message, onConfirm, 'Muokkaa', ['OK']);     
    });
  }

  $scope.onSickChange = function () {
    $scope.result_sick  = '';
    var sickState = 0;

    if($scope.sickBox == 1 || $scope.sickBox == '1') {
      sickState = 1;
    }

    $http.put('http://89.90.16.70/Rovaniemove/API/sick/' + sickState + '/' + sharedUser.getUserID())
    .success(function(data, status, headers) {
      $scope.result_sick  = data.Message;
      sharedUser.setSick(sickState);
    });
  }
})

// Logout Controller
.controller('LogoutCtrl', function($scope, $state) {  
	var storage = window.localStorage;
	storage.removeItem("name");
	storage.removeItem("password");
	
	$state.go("login");
})

// Admin Add Controller
.controller('adminAddCtrl', function($scope, $http, sharedUser) {
  $scope.result         = '';
  $scope.schoolsList    = [];
  $scope.classroomsList = [];
  $scope.durations      = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 150, 180];
  $scope.school         = false; //for the class ng-show
  $scope.schoolAddClass = false;
  $scope.sport          = false; //For the activity's name ng-show
 
  $http.get('http://89.90.16.70/Rovaniemove/API/schools')
  .success(function(data, status, headers) {
    $scope.schoolsList    = data.Schools;
  });

  $http.get('http://89.90.16.70/Rovaniemove/API/sports')
  .success(function(data, status, headers) {
    $scope.sportsList    = data.Sports;
  });

  $scope.changed = function() {
    $http.get('http://89.90.16.70/Rovaniemove/API/classrooms/' + $scope.school)
    .success(function(data, status, headers) {
      $scope.classroomsList   = data.Classrooms;
    });
  }

  $scope.onAddUserClick  = function(view) {
    $scope.user_result  = '';

    if($scope.gender && $scope.firstname && $scope.lastname && $scope.username && $scope.school && $scope.classroom && $scope.password && $scope.passwordCheck && $scope.admin) {
      if($scope.password == $scope.passwordCheck) {
        $gender = 1;
        $admin  = 0;

        if($scope.gender == 'F') {
          $gender = 2;
        }

        if($scope.admin == '1'  || $scope.admin == 1) {
          $admin  = 1;
        }

        $params = {
          'gender': $gender,
          'firstname': $scope.firstname,
          'lastname': $scope.lastname,
          'username': $scope.username,
          'schoolID': $scope.school,
          'classroomID': $scope.classroom,
          'password': $scope.password,
          'admin': $admin,
          'sick': 0
        };

        $http.post('http://89.90.16.70/Rovaniemove/API/register', $params)
        .success(function(data, status, headers) {
          $scope.user_result  = data.Message;
        });  
      } else {
        $scope.user_result  = 'Eri salasanaa';
      }
    } else {
      $scope.user_result  = 'Täytä kaikki kentät';
    }
  }

  $scope.onAddSchoolClick = function() {
    $scope.school_result = '';

    if($scope.schoolname) {
      $http.post('http://89.90.16.70/Rovaniemove/API/schools', {'name': $scope.schoolname})
      .success(function(data, status, headers) {
        $scope.school_result  = data.Message;
        $scope.schoolname     = '';
      }); 
    } 
    else {
      $scope.school_result = 'Tyhjät kentät';
    }
  }

  $scope.onAddClassroomClick = function() {
    $scope.classroom_result = '';

    if($scope.classroomname && $scope.schoolAddClass) {
      $http.post('http://89.90.16.70/Rovaniemove/API/classrooms', {'name': $scope.classroomname, 'schoolID': $scope.schoolAddClass})
      .success(function(data, status, headers) {
        $scope.classroom_result = data.Message;
        $scope.classroomname    = '';
      }); 
    } 
    else {
      $scope.classroom_result = 'Tyhjät kentät';
    }
  }


  $scope.onAddAchievementClick  = function() {
    $scope.achievement_result  = '';

    if($scope.achievementName && $scope.description && $scope.limite) {
      if(typeof($scope.limite) == 'number') {
        $http.post('http://89.90.16.70/Rovaniemove/API/achievements', {'name': $scope.achievementName, 'description': $scope.description, 'limit': $scope.limite})
        .success(function(data, status, headers) {
          $scope.achievement_result = data.Message;
          
          $scope.achievementName  = '';
          $scope.description      = '';
          $scope.limite            = '';
        }); 
      } else {
        $scope.achievement_result = 'Raja ei ole numero';
        $scope.limite            = '';
      }
    } 
    else {
      $scope.achievement_result = 'Tyhjät kentät';
    }
  }

  $scope.onAddSportClick  = function() {
    $scope.sport_result  = '';

    if($scope.sportname) {
      $http.post('http://89.90.16.70/Rovaniemove/API/sports', {'name': $scope.sportname})
      .success(function(data, status, headers) {
        $scope.sport_result = data.Message;
      }); 
    } 
    else {
      $scope.sport_result = 'Tyhjät kentät';
    }
  }
})

// Admin Edit Controller
.controller('adminDeleteCtrl', function($scope, $http) {
  $scope.result     = '';
  $scope.itemsList  = [];
  $scope.currenttable = 'user';
  
  $http.get('http://89.90.16.70/Rovaniemove/API/list/user')
  .success(function(data, status, headers) {
    $scope.result     = data.Items;
    $scope.itemsList  = data.Items;
  });

  $scope.tableChange = function(tablename) {
    $scope.currenttable = tablename;

    $http.get('http://89.90.16.70/Rovaniemove/API/list/' + $scope.currenttable)
    .success(function(data, status, headers) {
      if(data.Success == 1) {
        $scope.itemsList     = data.Items;
      }        
    });
  };

  $scope.onItemClick  = function(itemID) {
    function onConfirm(buttonIndex) {
      if(buttonIndex == 1) {
        $http.delete('http://89.90.16.70/Rovaniemove/API/delete/' + $scope.currenttable + '/' + itemID)
        .success(function(data, status, headers) {
          $http.get('http://89.90.16.70/Rovaniemove/API/list/' + $scope.currenttable)
          .success(function(data, status, headers) {
            $scope.itemsList     = data.Items;
          });
        });
      } else if(buttonIndex == 2) {
        return
      }
    }

    navigator.notification.confirm (
      'Are you sure you want to remove it?',
      onConfirm,            
      'Delete',          
      ['Ok','Cancel']    
    );
  }
})

// Admin Feedback Controller
.controller('adminFeedbackCtrl', function($scope, $http) {
  $http.get('http://89.90.16.70/Rovaniemove/API/feedbacks')
	.success(function(data, status, headers) {
    $scope.tabledata = data.Feedbacks;
  });
})

.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        })
		}
});
	
angular.module('formPosts', [], function($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  /**
  * The workhorse; converts an object to x-www-form-urlencoded serialization.
  * @param {Object} obj
  * @return {String}
  */
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for(name in obj) {
      value = obj[name];

      if(value instanceof Array) {
        for(i = 0; i < value.length; ++i) {
          subValue    = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj    = {};
          innerObj[fullSubName] = subValue;
          query       += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue    = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj    = {};
          innerObj[fullSubName] = subValue;
          query       += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
}) 