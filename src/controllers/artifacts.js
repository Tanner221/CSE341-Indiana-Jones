const { response, request } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const returnArtifacts = async (req, res) => {
  const result = await mongodb.getDb().db('IndianaJones').collection('Artifacts').find();
  result.toArray().then(
    (items) => {
      res.status(200).json(items);
    }
  )
}

const returnArtifact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('IndianaJones').collection('Artifacts').find({ _id: userId });
  result.toArray().then(
    (items) => {
      res.status(200).json(items[0]);
    }
  )
}

const addArtifact = async (req, res) => {
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