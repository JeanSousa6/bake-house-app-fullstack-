import { error } from "console";
import { Mongo } from "../../database/mongo.js";
import { ObjectId } from "mongodb";


const collectionName = 'orders'

export default class OrdersDataAcess {

    async getOrder(){
        const result = await Mongo.db
        .collection(collectionName)
            .aggregate([
                {
                    $lookup : {
                        from: 'orderItems',
                        localField : '_id',
                        foreignField: 'orderId',
                        as: 'orderItems'
                    }
                },
                {
                    $lookup : {
                        from:'users',
                        localField:'userId',
                        foreignField:'_id',
                        as: 'userData'
                    }
                },
                {
                    $project : {
                        'userData.password' : 0,
                        'userData.salt' : 0,
                    }
                },
                {
                    $unwind: '$orderItems'
                },
                {
                    $lookup : {
                        from:'products',
                        localField:'orderItems.productId',
                        foreignField:'_id',
                        as: 'orderItems.itemDetails'
                    }
                }
            ])
        .toArray()

        return result; 
    }

    async addOrder(orderData){

        const { items , ...orderDataRest } = orderData

        orderDataRest.createdAt = new Date();
        orderDataRest.pickupStatus = 'Pending';
        orderDataRest.userId = new ObjectId(orderDataRest.userId);

        const newOrder = await Mongo.db
        .collection(collectionName)
        .insertOne(orderDataRest)

        if(!newOrder.insertedId){
            throw new Error('Order cannot be inserted')
        }
       
       items.map((item) => {
            item.productId = new ObjectId(item.productId)
            item.orderId = new ObjectId(newOrder.insertedId)
       }) 


        const result = await Mongo.db
        .collection('orderItems')
        .insertMany(items); 
    
        return result; 
        
    }
    
    async deleteOrder(orderId){
        const result = await Mongo.db
        .collection(collectionName)
        .findOneAndDelete({_id: new ObjectId(orderId)})

        return result; 
    }

    async updateOrder(orderId , orderData){
        const result = await Mongo.db
        .collection(collectionName)
        .findOneAndUpdate(
        { _id: new ObjectId(orderId) },
        { $set: orderData }
        );

    }
}