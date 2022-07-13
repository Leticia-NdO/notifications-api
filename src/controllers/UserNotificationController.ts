import { Request, Response } from "express";
import UserNotification from "../entities/UserNotification";


class UserNotificationController {

    async findAll(request: Request, response: Response) {

        await UserNotification.findAll({
            where: {
                user_id: request.params.userId
            }
        }).then((notifications) => {

            return response.status(200).json(notifications)

        }).catch((err) => {

            return response.status(500)
        })
    }

    async update(request: Request, response: Response) {

        await UserNotification.update(request.body, {
            where: {
                id: request.params.id
            }
        }).catch(() => {
            return response.status(500)
        })

        return response.status(204)

    }

    async destroyOne(request: Request, response: Response) {

        await UserNotification.destroy({
            where: {
                id: request.params.id
            }
        }).catch(() => {
            return response.status(500)
        })

        return response.status(204)
    }

    async destroyAll(request: Request, response: Response) {

        await UserNotification.destroy({
            where: {
                user_id: request.params.userId
            }
        }).catch(() => {
            return response.status(500)
        })

        return response.status(204)
    }
}

export default new UserNotificationController()
