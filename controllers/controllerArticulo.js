const express = require('express');
const router = express.Router();
const Articulo = require("../models/articulo");

//Aqui van todos los métodos para operar en la BD


router.post('/crear', (req, res) => {
  var myArticulo = new Articulo(req.body);
  myArticulo.save((err, result) => {
    res.status(200).send({ message: result });
  });
})

router.get('/buscar/:id', (req, res) => {
  var _id = req.params.id;
  Articulo.find({ _id: _id }, function (err, result) {
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
  Articulo.find({}, function (err, result) {
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
  Articulo.findOneAndDelete({ _id: _id }, function (err, Producto) {
    if (err) {
      console.log(err);
      return res.json(500, {
        message: "No hemos encontrado la carrera",
      });
    }
    return res.json(Producto);
  });
})

router.put('/editar/:id', (req, res) => {
  var id = req.params.id;
  Articulo.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true },
    function (err, Articulo) {
      if (err) res.send(err);
      res.json(Articulo);
    }
  );
})

/*
function deleteArticuloById(req, res) {
  var _id = req.params.id;
  Articulo.findByIdAndRemove(_id, function (err, Producto) {
    if (err) {
      console.log(err);
      return res.json(500, {
        message: "No hemos encontrado la carrera",
      });
    }
    return res.json(Producto);
  });
}*/

module.exports = router