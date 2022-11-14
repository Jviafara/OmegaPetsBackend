const express = require('express');
const router = express.Router();
const Rol = require("../models/rol");

//Aqui van todos los métodos para operar en la BD


router.post('/crear', (req, res) => {
  var myRol = new Rol(req.body);
  myRol.save((err, result) => {
    res.status(200).send({ message: result });
  });
})

router.get('/buscar/:id', (req, res) => {
  var _id = req.params.id;
  Rol.find({ _id: _id }, function (err, result) {
    if (err) {
      res
        .status(500)
        .send({ message: "Error al momento de ejecutar la solicitud" });
    } else {
      if (!result) {
        res
          .status(404)
          .send({ message: "El registro a buscar no se encuentra disponible" });
      } else {
        res.status(200)
          .send({ result });
      }
    }
  });
})


router.get('/listar', (req, res) => {
  Rol.find({}, function (err, result) {
    if (err) {
      res.status(500)
        .send({ message: "Error al momento de ejecutar la solicitud" });
    } else {
      if (!result) {
        res.status(404)
          .send({ message: "El registro a buscar no se encuentra disponible" });
      } else {
        res.status(200)
          .send({ result });
      }
    }
  });
})


router.delete('/borrar/:id', (req, res) => {
  var _id = req.params.id;
  Rol.findOneAndDelete({ _id: _id }, function (err, Rol) {
    if (err) {
      console.log(err);
      return res.json(500, {
        message: "No hemos encontrado la carrera",
      });
    }
    return res.json(Rol);
  });
})

router.put('/editar/:id', (req, res) => {
  var id = req.params.id;
  Rol.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true },
    function (err, Rol) {
      if (err) res.send(err);
      res.json(Rol);
    }
  );
})

/*
function deleteRolById(req, res) {
  var _id = req.params.id;
  Rol.findByIdAndRemove(_id, function (err, Rol) {
    if (err) {
      console.log(err);
      return res.json(500, {
        message: "No hemos encontrado la carrera",
      });
    }
    return res.json(Rol);
  });
}*/

module.exports = router