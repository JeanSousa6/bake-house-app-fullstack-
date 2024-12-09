import ProductDataAcess from '../dataAcess/products.js'
import { ok , serverError } from '../helpers/httpResponse.js';



export default class ProductsControllers {
    constructor() {
        this.dataAcess = new ProductDataAcess()
    }
    
    
    async getProduct() {
        try{
            const products = await this.dataAcess.getProduct()
            return ok(products)
        }catch(error){
            return serverError(error); 
        }
    }    


    async getAvailableProducts() {
        try{
            const products = await this.dataAcess.getAvailableProducts()

            return ok(products)
        }catch(error){
            return serverError(error); 
        }
    }    

    async addProducts(productData) {
        try{
            const products = await this.dataAcess.addProduct(productData)

            return ok(products)
        }catch(error){
            return serverError(error); 
        }
    }    


    
    async deleteProduct(productId) {
        try{
            const result  = await this.dataAcess.deleteProduct(productId)

            return ok(result)
        }catch(error){
            return serverError(error); 
        }
    }    

    async updateProduct(productId , productData) {
        try{
            const result  = await this.dataAcess.updateProduct(productId , productData)
            return ok(result)
        }catch(error){
            return serverError(error); 
        }
    }    

}



