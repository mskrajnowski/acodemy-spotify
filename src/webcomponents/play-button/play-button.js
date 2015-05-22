(function() {
  const states = {
    stopped: {
      iconClass: 'fa fa-play',
      next: 'play'
    },
    paused: {
      iconClass: 'fa fa-play',
      next: 'play'
    },
    playing: {
      iconClass: 'fa fa-pause',
      next: 'pause'
    }
  };

  const players = [];

  Polymer('play-button', {
    src: '',
    iconClass: '',

    get state() {
      return this._state;
    },

    set state(name) {
      this._state = name;
      this.iconClass = states[name].iconClass;
    },

    ready: function() {
      this.state = 'stopped';
    },

    attached: function() {
      players.push(this);
    },

    detached: function() {
      const index = players.indexOf(this);

      if (index >= 0) {
        players.splice(index, 1);
      }
    },

    onClick: function() {
      const nextMethod = states[this.state].next;
      this[nextMethod]();
    },

    srcChanged: function(oldValue, newValue) {
      this.stop();
    },

    play: function() {
      players
      .filter((other) => other !== this)
      .forEach((other) => other.stop());

      if (this.src !== this.$.audio.src) {
        this.$.audio.src = this.src;
        this.$.audio.load();
      }

      this.$.audio.play();
      this.state = 'playing';
    },

    pause: function() {
      this.$.audio.pause();
      this.state = 'paused';
    },

    stop: function() {
      this.$.audio.pause();
      this.$.audio.currentTime = 0;
      this.state = 'stopped';
    }

  });

})();
