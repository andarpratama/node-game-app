
class Home {
   static home(req, res) {
        res.json({
            msg: 'Welcome to the game..',
            title: 'Node Game App',
            author: 'Andar Pratama',
            repo: 'https://github.com/andarpratama/node-game-app'
        })
   }

   static author(req, res){
       res.json({
           name: 'Andar Pratama',
           address: 'Tangerang',
           phone: '081283699257',
           education: 'Bachelor Degree in Informatics Engineering',
           instagram: '@andar.pratama_'
       })
   }
}

module.exports = Home;