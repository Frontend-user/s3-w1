import {Router, Request, Response} from "express";
import {querySecurityRepositories} from "../query-repository/query-security-repository";
import {securityRepositories} from "../repositories/security-repository";
import {refreshTokenValidator, tokenValidationMiddleware} from "../../auth/validation/tokenValidator";
import {HTTP_STATUSES} from "../../common/constants/http-statuses";
import {jwtService} from "../../application/jwt-service";

export const securityRouter = Router({})


securityRouter.get('/',
    refreshTokenValidator,
    tokenValidationMiddleware,
    async (req: Request, res: Response) => {

        const devices = await querySecurityRepositories.getAllDevices(req.cookies.refreshToken)
        if (devices.length > 0) {
            res.send(devices)
        } else {
            res.sendStatus(401)
        }
    })


securityRouter.delete('/',
    refreshTokenValidator,
    tokenValidationMiddleware,
    async (req: Request, res: Response) => {

        await securityRepositories.deleteDevices(req.cookies.refreshToken)
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)

    })


securityRouter.delete('/:deviceId',
    refreshTokenValidator,
    tokenValidationMiddleware,
    async (req: Request, res: Response) => {
        if (!req.params.deviceId) {
            res.sendStatus(404)
            return
        }
        let userId = await jwtService.checkRefreshToken(req.cookies.refreshToken)
        let session = await querySecurityRepositories.getDeviceByDeviceId(req.params.deviceId)
        if (session) {
            if (session.userId !== userId) {
                res.sendStatus(403)
                return
            }
        }
        const resp = await securityRepositories.deleteDeviceById(req.params.deviceId)
        if (!resp) {
            res.sendStatus(404)
            return
        }

        res.sendStatus(204)


    })
