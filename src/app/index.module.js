import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

import './routes/home/home.module';
import './routes/album/album.module';
import './routes/artist/artist.module';

export default
  angular
  .module('acodemy.spotify', [
    'ngRoute',

    'acodemy.spotify.routes.home',
    'acodemy.spotify.routes.album',
    'acodemy.spotify.routes.artist',
  ])
  .config(config)
  .config(routerConfig)
  .run(runBlock);
