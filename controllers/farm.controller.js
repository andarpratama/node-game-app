const farmModel = require('../models/Farm')
const userModel = require('../models/Users')

class Farm {
   static getAll(req, res) {
      farmModel.find()
         .then((result) => {
            res.status(201).json({msg: 'Success find all farms', data: result})
         })
         .catch((err) => {
            throw ({name: 'Failed_get_all'})
         })
   }

   static getOne(req, res) {
      const { id } = req.params
      farmModel.findById(id)
         .then((result) => {
            res.status(201).json({msg: `Success find farm with id : ${id}`, data: result})
         })
         .catch((err) => {
            throw ({name: 'Failed_get_detail'})
         })
   }

   static createFarm(req, res) {
      const {name} = req.body
      farmModel.create({name})
         .then((result) => {
            res.status(201).json({msg: 'Success creating new Farm', data: result})
         })
         .catch((err) => {
            throw({name: 'Failed_created'})
         })
   }

   static updateFarm(req, res) {
      const { id } = req.params
      const { name } = req.body
      farmModel.findByIdAndUpdate(id, {name}, {new: true})
         .then((result) => {
            res.status(201).json({msg: `Success updating farm with id : ${id}`, data: result})
         })
         .catch((err) => {
            throw({name: 'Failed_updated'})
         })
   }

   static deleteFarm(req, res) {
      const { id } = req.params
      farmModel.findByIdAndDelete(id)
         .then((result) => {
            res.status(201).json({msg: `Success deleting farm with id : ${id}`})
         })
         .catch((err) => {
            throw({name: 'Failed_deleted'})
         })
   }

   static collect(req, res) {
      farmModel.findById(req.params.id)
      .then((foundFarm) => {
         console.log(foundFarm)
         if (foundFarm.earn !== 0) {
            farmModel.findByIdAndUpdate(foundFarm.id, { $inc: { 'earn': - foundFarm.earn } }, { new: true })
            .then((_) => {})
         } else {
            res.status(500).json({ msg: 'Gold in farm is empty' })
            res.end()
         }

         console.log(1)
         console.log(req.userID)
         userModel.findByIdAndUpdate(req.userID, {$inc: {'resource.foods': foundFarm.earn}}, {new: true})
         .then((updatedUser)=>{
            console.log(updatedUser)
            if (updatedUser.resource.golds > 1000) {
               userModel.findByIdAndUpdate(req.userID, {'resource.foods': 1000}, {new: true})
            }
            res.status(200).json({msg: 'Success collect the farm..', incrementFood: `+ ${foundFarm.earn}`, dataGolds: updatedUser.resource.golds, dataFoods: updatedUser.resource.foods})
         })
         .catch((err)=> res.status(500).json({msg: 'Failed collect the farm..', data: err}))
      })
      .catch((err)=> res.status(500).json({msg: 'Failed collect the farm..'}))
      
  }
}

module.exports = Farm