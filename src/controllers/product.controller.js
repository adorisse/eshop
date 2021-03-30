const Product = require('../models/product.model');

//


exports.create = (req, res) => {

    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
        category: req.body.category,
    });

    product
    .save()
    .then((data) => {
      res.send({
        product: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: 500,
        message: err.message || 'some error occured while creating the product!',
      });
    });
};

exports.getProduct = (req, res) => {
  Product.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Product with id ${req.params.id} not found!`,
        });
      }
      res.send({
        message: `Product with id ${req.params.id} exist!`,
        product: data
      });
    })
    .catch((err) => res.send(err));
};

exports.getProducts = (req, res) => {
  Product.find()
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Products not found!`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};


exports.update = async (req, res) => {
  const updates = Object.keys(req.body)
  try{
      const product = await Product.findById(req.params.id)
      updates.forEach((update)=>{
        product[update] = req.body[update]
      })
      await product.save()

      if(!product){
          res.satatus(404).send({
              message: `Product with id ${req.params.id} not found!`})
      }
      res.send({
          message: `Product with id ${req.params.id} has been updated successfully !`,
          product 
      })
  } catch(err){
      res.send(err)
  }
}

exports.delete = async (req, res) => {
  try{
      const product = await Product.findByIdAndDelete(req.params.id)
      if(!product){
          res.satatus(404).send({
              message: `Product with id ${req.params.id} not found!`
          })
      }
      res.send({
          message: `Product with id ${req.params.id} was deleted successfully!`,
          product 
      })
  } catch(err){
      res.send(err)
  }
};
