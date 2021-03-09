const Order = require('../models/order.model');

//


exports.create = (req, res) => {

    const order = new Order({
        total: req.body.total,
        user: req.body.user,
        products: req.body.products,

    });

    order.save()
        .then((data) => {

            res.send({
                order: data,
            });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating order"
            });
        });

};

exports.getOrder = (req, res) => {
    Order.findById(req.params.id).populate('products').populate('user')
        .then((data) => {
            res.send({
                order: data,
                created: true


            })

        })


        .catch((err) => res.send(err));
};

exports.getOrders = (req, res) => {
    Order.find()
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Order with id $(req.params.id) not found`

                });
            }
            res.send(data);
        })
        .catch((err) => res.send(err));
};

