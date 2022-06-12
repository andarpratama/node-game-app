const marketModel = require('../models/Market')
const userModel = require('../models/Users')

class Market {
  static async getAll(req, res, next) {
    try {
        let result = await userModel.findById(req.userID)
        let marketID =  result.resource.markets

        const markets = await marketModel.find({
            '_id' : {$in: marketID}
        },)

        res.status(200).json({
            success: true,
            message: 'Success find all markets', 
            marketsID: result.resource.markets,
            data: markets
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
  }
   

  static getOne(req, res) {
    const { id } = req.params;
    marketModel.findById(id)
      .then((result) => {
        res.status(201).json({ 
            success: true,
            message: `Success find market with id : ${id}`, 
            data: result });
      })
      .catch((err) => {
        throw ({name: 'Failed_get_detail'})
      });
     
  }

  static async createMarket(req, res) {
     const { name } = req.body
     try {
        const users = await userModel.findById(req.userID)
        let gold = users.resource.golds
        let food = users.resource.foods

        if (gold >= 30 && food >= 10) {
           const createMarket = await marketModel.create({ name, users: req.userID });
           const payment = await userModel.findByIdAndUpdate(users.id, {$inc: {'resource.golds': -30, 'resource.foods': -10}}, {new: true})
           const pushMarket = await userModel.findByIdAndUpdate(users.id, {$push: {'resource.markets': createMarket.id}}, {new: true})
           res.status(201).json({
               success: true,
               message: 'Success created market..', 
               data: createMarket})
         } else {
           res.status(500).json({
               success: false,
               message: 'Gold or food is not enough..'
            })
        }
     } catch (err) {
         throw({name: 'Failed_created'})
     }
  } 

  static async updateMarket(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    await marketModel.findByIdAndUpdate(id, { name }, { new: true })
      .then((result) => {
        res.status(201).json({
            success: true,
            message: `Success updating market with id : ${id}`,
            data: result,});
      })
      .catch((err) => {
        throw({name: 'Failed_updated'})
      });
  }

  static deleteMarket(req, res) {
     const { id } = req.params;
     userModel.findByIdAndUpdate(req.userID, { $pull: { 'resource.markets': req.params.id } }, { new: true }).then()
     marketModel.findByIdAndDelete(id)
      .then((result) => {
        res.status(201).json({ 
          success: true,
          message: `Success deleting market with id : ${id}` });
      })
      .catch((err) => {
        res.status(500).json({ msg: 'Failed deleting market', data: err });
      });
  }

   
   static collect(req, res) {
      marketModel.findById(req.params.id)
      .then((foundMarket) => {
         if (foundMarket.earn !== 0) {
            marketModel.findByIdAndUpdate(foundMarket.id, { $inc: { 'earn': - foundMarket.earn } }, { new: true })
            .then((_) => {})
         } else {
            res.status(500).json({ 
              success: false,
              message: 'Gold in market is empty' }
              )
            res.end()
         }

         userModel.findByIdAndUpdate(req.userID, {$inc: {'resource.golds': foundMarket.earn}}, {new: true})
         .then((updatedUser)=>{
            if (updatedUser.resource.golds > 1000) {
               userModel.findByIdAndUpdate(req.userID, {'resource.golds': 1000}, {new: true})
            }
            res.status(200).json({
              success: true,
              message: 'Success collect the market', 
              incrementGold: `+ ${foundMarket.earn}`, 
              dataGolds: updatedUser.resource.golds, 
              dataFoods: updatedUser.resource.foods
            })
         })
         .catch((err)=> res.status(500).json({
           success: false,
           message: 'Failed collect the market..', 
           data: err}))
      })
      .catch((err)=> res.status(500).json({msg: 'Failed collect the market..'}))
      
  }

   
}
module.exports = Market