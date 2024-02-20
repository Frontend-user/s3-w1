import {devicesCollection} from "../../db";
import {jwtService} from "../../application/jwt-service";

export const securityRepositories = {

    async createDevice(device: any) {
        const response = await devicesCollection.insertOne(device)
        return response ? response.insertedId : false
    },
    async deleteDevices(refreshToken: string) {
        let token = await jwtService.getRefreshToken(refreshToken)
        let deviceId = token.deviceId
        let userId = token.userId

        const response = await devicesCollection.deleteMany({$and: [{deviceId: {$ne: deviceId}}, {userId: userId}]})
        return !!response.deletedCount
    },
    async updateDevice(refreshToken: string) {
        let token = await jwtService.getRefreshToken(refreshToken)
        console.log(token, 'token')
        let deviceId = token.deviceId
        const response = await devicesCollection.updateOne({deviceId: deviceId}, {$set: {'lastActiveDate':  new Date(token.iat).toISOString()}})
        return !!response
    },
    async deleteDeviceById(deviceId: string) {
        const response = await devicesCollection.deleteOne({deviceId: deviceId})
        return !!response.deletedCount
    }
}