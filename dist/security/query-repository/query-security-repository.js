"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.querySecurityRepositories = void 0;
const db_1 = require("../../db");
const change_id_format_1 = require("../../common/custom-methods/change-id-format");
const jwt_service_1 = require("../../application/jwt-service");
exports.querySecurityRepositories = {
    getAllDevices(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield jwt_service_1.jwtService.getRefreshToken(refreshToken);
            const response = yield db_1.devicesCollection.find({ userId: tokenData.userId }).toArray();
            const devices = response.map((i => (0, change_id_format_1.deleteMongoUserId)(i)));
            return devices ? devices : [];
        });
    },
    getDeviceByDeviceId(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield db_1.devicesCollection.findOne({ deviceId: deviceId });
            return response ? response : false;
        });
    },
    getDeviceByDateAndDeviceId(oldTokenData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.devicesCollection.findOne({ $and: [{ deviceId: oldTokenData.deviceId }, { lastActiveDate: new Date(oldTokenData.iat).toISOString() }] });
        });
    }
};
//# sourceMappingURL=query-security-repository.js.map