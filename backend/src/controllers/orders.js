
import OrdersDataAcess from '../dataAcess/orders.js';
import { ok , serverError } from '../helpers/httpResponse.js';



export default class OrdersControllers {
    constructor() {
        this.dataAcess = new OrdersDataAcess()
    }
    
    
    async getOrder() {
        try{
            const orders = await this.dataAcess.getOrder()
            return ok(orders)
        }catch(error){
            return serverError(error); 
        }
    }    

    async addOrder(orderData) {
        try{
            const orders = await this.dataAcess.addOrder(orderData)

            return ok(orders)
        }catch(error){
            return serverError(error); 
        }
    }    


    
    async deleteOrder(orderId) {
        try{
            const result  = await this.dataAcess.deleteOrder(orderId)

            return ok(result)
        }catch(error){
            return serverError(error); 
        }
    }    

    async updateOrder(orderId , orderData) {
        try{
            const result  = await this.dataAcess.updateOrder(orderId , orderData)
            return ok(result)
        }catch(error){
            return serverError(error); 
        }
    }    

}



