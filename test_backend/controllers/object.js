const Object = require('../models/Object');

exports.getAllObject = (req, res, next) => {
  Object.find()
    .then(objects => res.status(200).json(objects))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneObject = (req, res, next) => {
  Object.findOne({ _id: req.params.id })
    .then(object => res.status(200).json(object))
    .catch(error => res.status(404).json({ error }));
};

exports.updateOneObject = (req, res, next) => {
  Object.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.createObject = (req, res, next) => {
  delete req.body._id;
  const object = new Object({
    ...req.body
  });
  object.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteObject = (req, res, next) => {
  Object.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};