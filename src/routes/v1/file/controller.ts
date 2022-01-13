import statusCode from 'http-status-codes';
import Boom from 'boom';
import { messages } from '../../../utils/constants';
import { Response, Request } from 'express';
import { ResponseFormat } from '../../../core/ResponseFormat';
import { ServiceContainer } from '../../../di-container';

const response = new ResponseFormat();

export const downloadFile = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    return base.fileService.download(req.params.identifier).then((stream) => {
        res.statusCode = 200;
        stream.pipe(res).on('finish', () => {
            console.log('Stream Finished');
        }).on('error', (err) => {
            console.log('Stream error', err);
        })
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
};

export const uploadFile = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    const documentFile = (req as any).file;
    const userId = "61ded6d3248bfc0030304e6d";
    const filename = documentFile.originalname;
    return base.fileService.upload(userId, documentFile.buffer, filename).then((url) => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                message: 'File uploaded successfully',
                identifier: url
            },
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
}