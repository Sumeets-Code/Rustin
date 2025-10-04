import productService from "../services/product.service"

const createProduct = async (req, res) => {
    try {
        const createdProduct = await productService.createProduct(req.body);
        return res.status(200).send(createProduct);
    } catch (err) {
        return res.status(500).send({error: err.message});
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        await productService.deleteProduct(productId);
        return res.status(200).send({message: "Product deleted"});
    } catch (err) {
        return res.status(500).send({error: err.message});
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.updateProduct(productId, req.body);
        return res.status(200).send(product, {message: "Product Updated"});
    } catch (err) {
        return res.status(500).send({error: err.message});
    }
}

const findProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.findProductById(productId);
        return res.status(200).send(product);
    } catch (err) {
        return res.status(500).send({error: err.message});
    }
}

const getAllProducts = async (req, res) => {
    const productId = req.params.id;
    try {
        const products = await productService.getAllProducts(req.query);
        return res.status(200).send(products);
    } catch (err) {
        return res.status(500).send({error: err.message});
    }
}


const createMultipleProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const products = await productService.createMultipleProduct(productId);
        return res.status(200).send({message: "Products created successfully"});
    } catch (err) {
        return res.status(500).send({error: err.message});
    }
}


export default { createProduct, findProductById, getAllProducts, createMultipleProduct, updateProduct, deleteProduct };