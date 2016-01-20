(function(){
	app.controller('VideoController', ['$scope', '$location', '$timeout', 'dataService', 'DataSource', function($scope, $location, $timeout, dataService, DataSource){
		$scope.error = '';

		function newVideoPlayer(video){
			video.entryId = getEntryID(video);
			// $("#videoHolder").html(
			//     '<video width="100%" height="100%" controls poster="'+ video.thumbnail_loc.__text +'">' +
			//         '<source src="'+ video.content_loc.__text +'" type="video/mp4"></source>' +
			//     '</video>');

			// jwPlayer
			// var playerInstance = jwplayer("videoHolder");
			// 	playerInstance.setup({
			// 	    file: video.content_loc.__text,
			// 	    image: video.thumbnail_loc.__text,
			// 	    width: 'auto',
			// 	    height: 400,
			// 	    title: video.title.__text,
			// 	    description: video.description.__text,
			// 	    mediaid: '123456'
			// 	})


			kWidget.embed({
				'targetId': 'videoHolder',
				'wid': '_1949551',
				'uiconf_id' : '30806841',
				'entry_id' : video.entryId,
				'flashvars':{ // flashvars allows you to set runtime uiVar configuration overrides. 
					'autoPlay': false
				},
				'params':{ // params allows you to set flash embed params such as wmode, allowFullScreen etc
					'wmode': 'transparent' 
				}
			});
		}

		function getEntryID(video){
			var theUrl = video.content_loc.__text.split('entryId/'),
				secondHalf = theUrl[1].split('/'),
				entryId = secondHalf[0];

			console.log(entryId);

			return entryId;
		}

		if($scope.$parent.currentCategory.video === undefined){
			$location.url('talk');
		}
		else{
			$scope.video = $.extend(true, {}, $scope.$parent.currentCategory.video);
			newVideoPlayer($scope.video);
			$scope.playlist = $scope.$parent.currentCategory.playlist;

			// $scope.scrollerWidth = $scope.playlist.length * 175;
			$timeout(function(){
				console.log('timeout');
				$('.multiple-items').slick({
					  infinite: false,
					  slidesToShow: 3,
					  slidesToScroll: 2,
					  arrows: false
					});
			}, 10);

			console.log('past');
			
		}
		

		$scope.playVideo = function(video){			
			newVideoPlayer(video);
		};

	}]);

})();