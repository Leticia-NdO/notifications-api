import { Request, Response } from "express";
import { Op } from "sequelize";
import Notification from "../entities/Notification";
import UserCollection from "../entities/UserCollection";
import UserNotification from "../entities/UserNotification";


class NotificationController {

    async create(request: Request, response: Response) {

        const notification: any = await Notification.create({

            notification_description: request.body.notification_description,
            notification_image_url: request.body.notification_image_url,
            notification_backdrop_path: request.body.notification_backdrop_path,
            media_id: request.body.media_id,
        }).catch((err) => {
            console.log(err)
            return response.status(500).send()
        })

        // [x] depois de criar uma notificação, vamos fazer um findAll em user collection por registros que tem o mesmo media_id e que tenham following = true.

        const usersToReceiveNotification: any = await UserCollection.findAll({
            where: {
                [Op.or]: [
                    {
                        media_id: notification.dataValues.media_id,
                        following: true
                    },
                    {
                        followingAll: true
                    }
                ],

            }
        }).catch((err) => {
            console.log(err)
            return response.status(500).send()
        })

        // [x] Então, vamos criar os registros na tabela de user_notification com os user_ids do findAll, o id da notificação e o read setado como false.


        for (let i = 0; i < usersToReceiveNotification.length; i++) {

            await UserNotification.create({
                user_id: usersToReceiveNotification[i].dataValues.user_id,
                notification_id: notification.dataValues.id,
                read_at: null,
                isRead: false
            }).then((userNotification) => {
                console.log(userNotification)
            }).catch((err) => {
                console.log(err)
                return response.status(500).send()
            })
        }

        return response.status(201).json(notification)
    }
}

export default new NotificationController()