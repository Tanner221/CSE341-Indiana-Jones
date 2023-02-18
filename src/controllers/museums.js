const { BSONTypeError } = require('bson');
const ObjectId = require('mongodb').ObjectId;

const returnMuseums = async(req, res) => {
  res.status(201).json({message:'Return Museum list'});
}

const returnMuseum = async(req,res) => {
  let userId;
  try{
     userId = new ObjectId(req.params.id);
  }
  catch(e){
    if(e instanceof BSONTypeError){
      res.status(400).json({
        message: "Bad id type"
      })
    }
  }
  res.status(201).json({message:`Return museum with id of ${userId}`});
}

module.exports = {
  returnMuseums,
  returnMuseum
}