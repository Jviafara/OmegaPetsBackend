const express = require('express');
const router = express.Router();
const Factura = require("../models/facturas");

//Aqui van todos los métodos para operar en la BD


router.post('/crear', (req, res) => {
  var myFactura = new Factura(req.body);
  myFactura.save((err, result) => {
    res.status(200).send({ message: result });
  });
})

router.get('/buscar/:id', (req, res) => {
  var _id = req.params.id;
  Factura.find({ _id: _id }, function (err, result) {
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
          .send(result );
      }
    }
  });
})


router.get('/listar', (req, res) => {
  Factura.find({}, function (err, result) {
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
  Factura.findOneAndDelete({ _id: _id }, function (err, Factura) {
    if (err) {
      console.log(err);
      return res.json(500, {
        message: "No hemos encontrado la carrera",
      });
    }
    return res.json(Factura);
  });
})

router.put('/editar/:id', (req, res) => {
  var id = req.params.id;
  Factura.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true },
    function (err, Factura) {
      if (err) res.send(err);
      res.json(Factura);
    }
  );
})

/*
function deleteFacturaById(req, res) {
  var _id = req.params.id;
  Factura.findByIdAndRemove(_id, function (err, Factura) {
    if (err) {
      console.log(err);
      return res.json(500, {
        message: "No hemos encontrado la carrera",
      });
    }
    return res.json(Factura);
  });
}*/

module.exports = router