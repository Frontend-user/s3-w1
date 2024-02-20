import {devicesCollection, usersCollection} from "../../db";
import {changeIdFormat,  deleteMongoUserId} from "../../common/custom-methods/change-id-format";
import {jwtService} from "../../application/jwt-service";

export const querySecurityRepositories = {

    async getAllDevices(refreshToken:string) {
        const tokenData = await jwtService.getRefreshToken(refreshToken)
        const response = await devicesCollection.find({userId: tokenData.userId}).toArray()
        const devices = response.map((i=> deleteMongoUserId(i)))
        return devices ? devices : []
    },
    async getDeviceByDeviceId(deviceId:string){
        const response = await devicesCollection.findOne({deviceId: deviceId})
        return response ? response : false
    },
    async getDeviceByDateAndDeviceId(oldTokenData:any){
      return  await devicesCollection.findOne({$and: [{deviceId: oldTokenData.deviceId}, {lastActiveDate: new Date(oldTokenData.iat).toISOString()}]})
    }

}