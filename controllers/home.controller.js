class Home {
  static home(req, res, next) {
    try {
      res.status(201).json({
        msg: 'Welcome to the game..',
        title: 'Node Game App',
        author: 'Andar Pratama',
        detail_author: 'https://node-game-app.herokuapp.com/author',
        version: 2.0,
        repo: 'https://github.com/andarpratama/node-game-app',
        slide: 'https://bit.ly/3s4CRjH',
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static author(req, res) {
    res.status(201).json({
      name: 'Andar Pratama',
      address: 'Tangerang',
      phone: '081283699257',
      education: 'Bachelor Degree in Informatics Enginering',
      instagram: '@andar.pratama_',
      github: 'https://github.com/andarpratama',
      linkedin: 'https://www.linkedin.com/in/andarpratama/',
    });
  }
}

module.exports = Home;
