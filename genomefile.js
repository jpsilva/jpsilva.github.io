const browserSync = require('browser-sync'),
      genome = require('genome'),
      slm = require('slm'),
      stylus = require('stylus');

genome.tasks = {
  * slmToHtml() {
    let file = yield 'src/index.slm'.read();
    return 'index.html'.write(slm.render(file));
  },

  * fontSlmToHtml() {
    let file = yield 'src/webfonts/index.slm'.read();
    return 'webfonts/index.html'.write(slm.render(file));
  },

  * stylusToCss() {
    let file = yield 'src/styles/site.styl'.read();
    return 'styles/site.css'.write(stylus(file).render());
  },

  * watch() {
    yield genome.spawn(['slmToHtml', 'fontSlmToHtml', 'stylusToCss']);

    let server = serve();

    'src/index.slm'.onChange('slmToHtml');
    'src/webfonts/index.slm'.onChange('fontSlmToHtml');
    'src/styles/**/*.styl'.onChange('stylusToCss');
    '**/*.{css,html,jpeg,jpg,gif,png,svg}'.onChange(server.reload);
  }
};

function serve() {
  let server = browserSync.create();

  server.init({
    server: {
      baseDir: '.'
    },
    open: false,
    reloadOnRestart: true,
    notify: false,
    ghostMode: false
  });

  return server;
}

genome.run('watch');
