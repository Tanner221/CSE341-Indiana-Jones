const validation = require('../validation');
const { requiresAuth } = require('express-openid-connect');
const { validationResult } = require('express-validator');
const mongodb = require('../db/connect');

const { BSONTypeError } = require('bson');
const ObjectId = require('mongodb').ObjectId;

const returnMuseums = async(req, res) => {
  const result = await mongodb.getDb().db('IndianaJones').collection('Museums').find();
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

const addMuseum = async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newMuseum = {
    name: req.body.name,
    location: req.body.location,
    artifact_count: req.body.artifact_count
  }

  const result = await mongodb.getDb().db('IndianaJones').collection('Museums').insertOne(newMuseum);

  if(result.acknowledged){
    res.status(201).json({
      message: "New museum added",
      body: result
    });
  } else{
    res.status(500).json(response.error || "Unknown Error");
  }
}

const deleteMuseum = async(req, res) => {
  let museumId;
  try{
     museumId = new ObjectId(req.params.id);
  }
  catch(e){
    if(e instanceof BSONTypeError){
      res.status(400).json({
        message: "Bad id type"
      })
    }
  }

  const result = await mongodb.getDb().db('IndianaJones').collection('Museums').remove({ _id: museumId }, true);

  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Unknown Error Ocurred');
  }
}

const updateMuseum = async(req, res) => {
//validate for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try{
    museumId = new ObjectId(req.params.id);
 }
 catch(e){
   if(e instanceof BSONTypeError){
     res.status(400).json({
       message: "Bad id type"
     })
   }
 }

 const Museum = {
  name: req.body.name,
  location: req.body.location,
  artifact_count: req.body.artifact_count
}

const result = await mongodb.getDb().db('IndianaJones').collection('Museums').replaceOne({ _id: museumId }, Museum);

if (result.modifiedCount > 0) {
  res.status(200).json({
    message: 'Contact Modified Sucessfully',
    body: result
  });
} else {
  res.status(500).json(res.error || 'Unknown Error Occured');
}
}

module.exports = {
  returnMuseums,
  returnMuseum,
  addMuseum,
  deleteMuseum,
  updateMuseum
}