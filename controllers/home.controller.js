class Home {
  static home(req, res) {
    res.status(201).json({
      msg: 'Welcome to the game..',
      title: 'Node Game App',
      author: 'Andar Pratama',
      version: 2.0,
      repo: 'https://github.com/andarpratama/node-game-app',
    });
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
