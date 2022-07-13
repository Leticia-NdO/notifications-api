import { Router, Request, Response } from 'express';
import NotificationController from './controllers/NotificationController';
import UserNotificationController from './controllers/UserNotificationController';
import UserCollectionController from './controllers/UserCollectionController';
import TokenController from './helpers/TokenController'
import AccessControl from './helpers/accessControl'

// Rotas

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'Você está conectado!' });
})

// Rota para mandar notificações

routes.post('/notification', TokenController.authenticateToken, AccessControl.isAdmin, NotificationController.create)

// Rotas de notificações de usuário

routes.get('/notifications/:userId', TokenController.authenticateToken, AccessControl.isUserOrAdmin, UserNotificationController.findAll)

routes.put('/notification/:id', TokenController.authenticateToken, AccessControl.isUserOrAdmin, UserNotificationController.update)

routes.delete('/notificationDestroyOne/:id', TokenController.authenticateToken, AccessControl.isUserOrAdmin, UserNotificationController.destroyOne)

routes.delete('/notificationDestroyAll/:userId', TokenController.authenticateToken, AccessControl.isUserOrAdmin, UserNotificationController.destroyAll)

// [x] Rotas referentes à user_collection

routes.post('/switchFollowing', TokenController.authenticateToken, AccessControl.isUserOrAdmin, UserCollectionController.switchFollowing)

routes.post('/switchFavorite', TokenController.authenticateToken, AccessControl.isUserOrAdmin, UserCollectionController.switchFavorite)

routes.post('/switchFollowingAll', TokenController.authenticateToken, AccessControl.isUserOrAdmin, UserCollectionController.switchFollowingAll)

export { routes };

