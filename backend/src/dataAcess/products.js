import { Mongo } from "../../database/mongo.js";
import { ObjectId } from "mongodb";


const collectionName = 'products'

export default class ProductDataAcess {

    async getProduct(){
        const result = await Mongo.db
        .collection(collectionName)
        .find({})
        .toArray()

        return result; 
    }

    async getAvaliableProducts(){
        const result = await Mongo.db
        .collection(collectionName)
        .find({ available : true })
        .toArray()

        return result; 
    }

    async addProduct(productData){

        const result = await Mongo.db
        .collection(collectionName)
        .insertOne(productData); 
    
        return result; 
        
    }
    
    async deleteProduct(productId){
        const result = await Mongo.db
        .collection(collectionName)
        .findOneAndDelete({_id: new ObjectId(productId)})

        return result; 
    }

    async updateProduct(productId , productData){
        const result = await Mongo.db
        .collection(collectionName)
        .findOneAndUpdate(
        { _id: new ObjectId(productId) },
        { $set: productData }
        );

    }
}