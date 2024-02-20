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
exports.securityRouter = void 0;
const express_1 = require("express");
const query_security_repository_1 = require("../query-repository/query-security-repository");
const security_repository_1 = require("../repositories/security-repository");
const tokenValidator_1 = require("../../auth/validation/tokenValidator");
const http_statuses_1 = require("../../common/constants/http-statuses");
const jwt_service_1 = require("../../application/jwt-service");
exports.securityRouter = (0, express_1.Router)({});
exports.securityRouter.get('/', tokenValidator_1.refreshTokenValidator, tokenValidator_1.tokenValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const devices = yield query_security_repository_1.querySecurityRepositories.getAllDevices(req.cookies.refreshToken);
    if (devices.length > 0) {
        res.send(devices);
    }
    else {
        res.sendStatus(401);
    }
}));
exports.securityRouter.delete('/', tokenValidator_1.refreshTokenValidator, tokenValidator_1.tokenValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield security_repository_1.securityRepositories.deleteDevices(req.cookies.refreshToken);
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
}));
exports.securityRouter.delete('/:deviceId', tokenValidator_1.refreshTokenValidator, tokenValidator_1.tokenValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.deviceId) {
        res.sendStatus(404);
        return;
    }
    let userId = yield jwt_service_1.jwtService.checkRefreshToken(req.cookies.refreshToken);
    let session = yield query_security_repository_1.querySecurityRepositories.getDeviceByDeviceId(req.params.deviceId);
    if (session) {
        if (session.userId !== userId) {
            res.sendStatus(403);
            return;
        }
    }
    const resp = yield security_repository_1.securityRepositories.deleteDeviceById(req.params.deviceId);
    if (!resp) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
}));
//# sourceMappingURL=security-router.js.map