const browserSync = require('browser-sync'),
      cpx = require('cpx'),
      genome = require('genome'),
      slm = require('slm'),
      stylus = require('stylus');

genome.tasks = {
  * copyImages() {
    return cpx.copySync('src/images/*.{jpeg,jpg,gif,png,svg}', 'images');
  },

  * slmToHtml() {
    let file = yield 'src/index.slm'.read();
    return 'index.html'.write(slm.render(file));
  },

  * stylusToCss() {
    let file = yield 'src/styles/site.styl'.read();
    return 'styles/site.css'.write(stylus(file).render());
  },

  * watch() {
    yield genome.spawn(['copyImages', 'slmToHtml', 'stylusToCss']);

    let server = serve();

    'src/images/*.{jpeg,jpg,gif,png,svg}'.onChange('copyImages');
    'src/index.slm'.onChange('slmToHtml');
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
