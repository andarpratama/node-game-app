const farmModel = require("../models/Farm");
const { $where } = require("../models/Users");
const userModel = require("../models/Users");

class Farm {
  // static getAll(req, res) {
  //    farmModel.find()
  //       .then((result) => {
  // if(!result.data){
  //    throw { name: "Data Empty" };
  // }
  // res.status(201).json({
  //    succes: true,
  //    message: 'Success find all farms',
  //    data: result
  // })
  //       })
  //       .catch((err) => {
  //          throw ({name: 'Failed_get_all'})
  //       })
  // }

  static async getAll(req, res, next) {
    try {
      const idUser = req.userID;
      const foundUser = await userModel.findById(idUser)
      const idFarms = foundUser.resource.farms
      const foundFarm = await farmModel.find( { _id : { $in : idFarms } } );
      if (foundFarm.length === 0) {
        res.status(201).json({
          succes: true,
          message: "Data is empty",
          data: [],
        });
      } else {
        res.status(201).json({
          succes: true,
          message: "Success find all farms",
          data: foundFarm,
        });
      }
    } catch (error) {
       console.log(error)
      next(error);
    }
  }

  static getOne(req, res) {
    const { id } = req.params;
    farmModel
      .findById(id)
      .then((result) => {
        res
          .status(201)
          .json({ 
            success: true,
            message: `Success find farm with id : ${id}`, 
            data: result });
      })
      .catch((err) => {
        throw { name: "Failed_get_detail" };
      });
  }

  static async deleteAll(req, res, next){
     try {
      await farmModel.deleteMany()
      res.status(201).json({
         succes: true,
         message: "Success delete all farms",
       });
     } catch (error) {
        next(error)
     }
  }

  static async createFarm(req, res, next) {
    try {
      const name = {name: req.body.name};
      const id = req.userID;
      if (!req.body.name) {
        throw { name: "Name Required" };
      }

      const users = await userModel.findById(id);
      let gold = users.resource.golds;
      let food = users.resource.foods;
      // console.log(users)

      if (gold >= 30 && food >= 10) {
        const createFarm = await farmModel.create(name);
        const pushFarm = await userModel.findByIdAndUpdate(
          users.id,
          { $push: { "resource.farms": createFarm.id } },
          { new: true }
        );
        res
          .status(201)
          .json({ success: true, message: "Success creating new Farm", data: createFarm });
      } else {
        res.status(500).json({ msg: "Gold or food is not enough.." });
      }
    } catch (error) {
       console.log(error)
      next(error)
    }
    // farmModel.create({name})
    //    .then((result) => {
    //       res.status(201).json({message: 'Success creating new Farm', data: result})
    //    })
    //    .catch((err) => {
    //       throw({name: 'Failed_created'})
    //    })
  }

  static updateFarm(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    farmModel
      .findByIdAndUpdate(id, { name }, { new: true })
      .then((result) => {
        res
          .status(201)
          .json({
            success: true,
            message: `Success updated farm with id : ${id}`,
            data: result,
          });
      })
      .catch((err) => {
        throw { name: "Failed_updated" };
      });
  }

  static deleteFarm(req, res) {
    const { id } = req.params;
    farmModel
      .findByIdAndDelete(id)
      .then((result) => {
        res
          .status(201)
          .json({ 
            success: true,
            message: `Success deleted farm with id : ${id}` });
      })
      .catch((err) => {
        throw { name: "Failed_deleted" };
      });
  }

  static collect(req, res) {
    farmModel
      .findById(req.params.id)
      .then((foundFarm) => {
        if (foundFarm.earn !== 0) {
          farmModel
            .findByIdAndUpdate(
              foundFarm.id,
              { $inc: { earn: -foundFarm.earn } },
              { new: true }
            )
            .then((_) => {});
        } else {
          res.status(500).json({ message: "Gold in farm is empty" });
          res.end();
        }
        userModel
          .findByIdAndUpdate(
            req.userID,
            { $inc: { "resource.foods": foundFarm.earn } },
            { new: true }
          )
          .then((updatedUser) => {
            if (updatedUser.resource.golds > 1000) {
              userModel.findByIdAndUpdate(
                req.userID,
                { "resource.foods": 1000 },
                { new: true }
              );
            }
            res
              .status(200)
              .json({
                message: "Success collect the farm..",
                incrementFood: `+ ${foundFarm.earn}`,
                dataGolds: updatedUser.resource.golds,
                dataFoods: updatedUser.resource.foods,
              });
          })
          .catch((err) =>
            res
              .status(500)
              .json({ message: "Failed collect the farm..", data: err })
          );
      })
      .catch((err) =>
        res.status(500).json({ message: "Failed collect the farm.." })
      );
  }
}

module.exports = Farm;
