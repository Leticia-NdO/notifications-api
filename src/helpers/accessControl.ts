import { NextFunction, Request, Response } from "express";
import Bundle from "./bundle";


class AccessControl {

    isAdmin(request: Request, response: Response, next: NextFunction): void {

        const user = Bundle.getBundle(request, null)

        if (user.models.role != "admin") {
            response.status(401).send("Acesso não autorizado.");
        }

        next()
    }

    isUserOrAdmin(request: Request, response: Response, next: NextFunction): void {
        const user = Bundle.getBundle(request, null)

        const userId = request.params.id;

        if (user.models.id != userId && user.models.role != "admin") {
            response.status(401).send("Acesso não autorizado.");
        }

        next();
    }
}

export default new AccessControl()