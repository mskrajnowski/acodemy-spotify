angular.module('app', [])
.filter('duration', function() {
  return function(durationMs) {
    var seconds = Math.round(durationMs / 1000);
    var minutes = Math.floor(seconds / 60);
    seconds %= 60;

    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };
})
.provider('SpotifyApi', function($sceDelegateProvider) {
  var whitelist = $sceDelegateProvider.resourceUrlWhitelist();
  whitelist.push('https://p.scdn.co/mp3-preview/**');
  $sceDelegateProvider.resourceUrlWhitelist(whitelist);

  this.apiUrl = 'https://api.spotify.com/v1';
  this.defaults = {
    params: {
      limit: 10
    }
  };

  this.$get = function($http) {
    return {
      apiUrl: this.apiUrl,
      defaults: this.defaults,
      search: function(query, types) {
        var url = this.apiUrl + '/search';
        var config = angular.copy(this.defaults);

        config.params.q = query;
        config.params.type = types.join(',');

        return $http.get(url, config);
      }
    };
  };
})
.directive('playButton', function($document) {
  class PlayButton {
    constructor($scope, $element) {
      this.injects = {$scope, $element};
      this.audio = $element.find('audio')[0];

      this.states = {
        stopped: {
          iconClass: 'fa fa-play',
          next: this.play.bind(this)
        },
        paused: {
          iconClass: 'fa fa-play',
          next: this.play.bind(this)
        },
        playing: {
          iconClass: 'fa fa-pause',
          next: this.pause.bind(this)
        }
      };

      this.state = this.states.stopped;
    }

    link() {
      const {$scope} = this.injects;

      PlayButton.list.push(this);

      $scope.$on('$destroy', () => {
        const index = PlayButton.list.indexOf(this);
        if (index >= 0) {
          PlayButton.list.splice(index, 1);
        }
      });

      this.audio.addEventListener('ended', () =>
        $scope.$apply(() => this.state = this.states.stopped)
      );

      $scope.$watch(
        () => this.src,
        (newSrc, oldSrc) => {
          if (oldSrc && this.state !== this.states.stopped) {
            this.stop();
          }
        }
      );
    }

    play() {
      PlayButton
      .list
      .filter((player) => player !== this)
      .forEach((player) => player.stop());

      if (this.audio.src !== this.src) {
        this.audio.src = this.src;
        this.audio.load();
      }

      this.audio.play();
      this.state = this.states.playing;
    }

    stop() {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.state = this.states.stopped;
    }

    pause() {
      this.audio.pause();
      this.state = this.states.paused;
    }
  }

  PlayButton.list = [];

  const document = $document[0];
  const template = document.getElementById('playButtonTemplate');

  return {
    restrict: 'E',
    require: ['playButton'],
    scope: {
      src: '@'
    },
    bindToController: true,
    controllerAs: 'button',
    template: template.innerHTML,
    link: function($scope, $element, $attrs, [ctrl]) {
      ctrl.link();
    },
    controller: PlayButton
  };
})
.controller('MainController', function($scope, $location, SpotifyApi) {
  $scope.search = $location.search().q || '';
  $scope.searchResults = {};

  $scope.$watch('search', (search) => {
    $location.search('q', search || null);

    if (!search) {
      $scope.searchResults = {};
      return;
    }

    SpotifyApi
    .search(search, ['album', 'artist', 'track'])
    .then((response) => $scope.searchResults = response.data);
  });

});
