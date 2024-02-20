import {ObjectId} from "mongodb";
import {securityRepositories} from "../repositories/security-repository";

export const securityService = {
    async createDevice(device: any): Promise<ObjectId | boolean> {
        return  await securityRepositories.createDevice(device)
    }
}