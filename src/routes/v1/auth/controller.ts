import statusCode from 'http-status-codes';
import Boom from 'boom';
import { messages } from '../../../utils/constants';
import { Response, Request, Router } from 'express';
import { ResponseFormat } from '../../../core/ResponseFormat';
import { ServiceContainer } from '../../../di-container';

const response = new ResponseFormat();

export const generateToken = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    return base.authService.generateToken({email: req.body.email, userId: '61ded6d3248bfc0030304e6d'}).then((token) => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: token,
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
};

export const login = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    return base.authService.login({email: req.body.email, password: req.body.password}).then((result) => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: { token: result.token, id: result.id },
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
};