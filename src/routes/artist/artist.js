angular.module('acodemy-app.routes.artist', [
  'ngRoute',

  'acodemy-app.apis.spotify',
  'acodemy-app.filters.duration',
])
.config(function($routeProvider) {
  $routeProvider
    .when('/artist/:id', {
      templateUrl: 'routes/artist/artist.html',
      controller: 'ArtistRouteController'
    });
})
.controller('ArtistRouteController', function(
  $scope, $routeParams, $q, SpotifyApi
) {
  $scope.artist = {};
  $scope.albums = [];
  $scope.topTracks = [];
  $scope.relatedArtists = [];

  $q.all([
    SpotifyApi.getArtist($routeParams.id),
    SpotifyApi.getArtistsAlbums($routeParams.id),
    SpotifyApi.getArtistsTopTracks($routeParams.id),
    SpotifyApi.getRelatedArtists($routeParams.id)
  ])
  .then((results) => {
    [
      $scope.artist,
      $scope.albums,
      $scope.topTracks,
      $scope.relatedArtists
    ] = results;
  });
});