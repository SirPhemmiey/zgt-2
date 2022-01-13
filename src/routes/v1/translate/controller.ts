import statusCode from 'http-status-codes';
import Boom from 'boom';
import { messages } from '../../../utils/constants';
import { Response, Request, Router } from 'express';
import { ResponseFormat } from '../../../core/ResponseFormat';
import { ServiceContainer } from '../../../di-container';

const response = new ResponseFormat();

export const translatePage = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    return base.translateService.translate(req.params.url).then((content) => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: content,
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
};