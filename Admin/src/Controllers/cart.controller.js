const cartServices = require("../Services/cart.services");

const addToCartController = async (req, res) => {
    try{
        const cart = await cartServices.addToCart(req.body);
        console.log(req.body);
        if(cart){
            res.status(200).json({ message: 'Product added to cart', cart });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCartController = async (req, res) => {
    try {
        const { user_id } = req.params;
        const cart = await cartServices.getCart(user_id);
        if (cart) {
            res.status(200).json({ message: 'Cart', cart });
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteCartController = async (req, res) => {
    const { id } = req.params;
    const resultDelete = await cartServices.deleteCart(id);
    if (resultDelete) {
        res.status(200).json({ message: 'Cart deleted' });
    } else {
        res.status(404).json({ message: 'Cart not found' });
    }
}

const updateCartController = async (req, res) => {
    const { id } = req.params;
    const updateCart = req.body;
    const resultUpdate = await cartServices.updateCart(id, updateCart);
    const cart = await cartServices.updateCart(id, updateCart);
    if (resultUpdate) {
        res.status(200).json({ message: 'Cart updated', cart });
    } else {
        res.status(404).json({ message: 'Cart not found' });
    }
}

module.exports = {
    addToCartController,
    getCartController,
    deleteCartController,
    updateCartController
};

