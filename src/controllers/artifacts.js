const { response, request } = require('express');
const { validationResult } = require('express-validator');
const mongodb = require('../db/connect');
const { BSONTypeError } = require('bson');
const ObjectId = require('mongodb').ObjectId;

const returnArtifacts = async (req, res) => {
  const result = await mongodb.getDb().db('IndianaJones').collection('Artifacts').find();
  result.toArray().then(
    (items) => {
      if(items.length > 0){
        res.status(200).json(items);
      }
      else{
        res.status(404).json({
          message: "Someone stole all the artifacts!"
        })
      }
    }
  )
}

const returnArtifact = async (req, res) => {
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
  const result = await mongodb.getDb().db('IndianaJones').collection('Artifacts').find({ _id: userId });
  result.toArray()
  .then(
    (items) => {
      if(items.length > 0){
      res.status(200).json(items[0]);
      }
      else{
        res.status(404).json({
          message: "Artifact not found"
        })
      }
    }
  )
}

const addArtifact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const newArtifact = {
    name: req.body.name,
    type: req.body.type,
    dateAquired: req.body.dateAquired,
    details: req.body.details,
    isMagic: req.body.isMagic,
    value: req.body.value
  }
  const result = await mongodb.getDb().db('IndianaJones').collection('Artifacts').insertOne(newArtifact);

  if(result.acknowledged){
    res.status(201).json({
      message: "New artifact added",
      body: result
    });
  } else{
    res.status(500).json(response.error || "Unknown Error");
  }
}

module.exports = {
  returnArtifacts,
  returnArtifact,
  addArtifact
}