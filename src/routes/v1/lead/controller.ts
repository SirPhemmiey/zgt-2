import statusCode from 'http-status-codes';
import Boom from 'boom';
import { messages } from '../../../utils/constants';
import { Response, Request } from 'express';
import { ResponseFormat } from '../../../core/ResponseFormat';
import { ServiceContainer } from '../../../di-container';
import { LeadRequestForm } from '../../../services/LeadService/LeadService';

const response = new ResponseFormat();

export const submitRequest = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    const body = req.body as LeadRequestForm;
    return base.leadService.submitLeadRequest(body).then(() => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {message: "Request successfully submitted"},
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
};

export const createLead = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    const body = req.body as LeadRequestForm;
    return base.leadService.createLead(body).then(() => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {message: "Lead successfully created"},
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
};

export const getAllLeads = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    return base.leadService.getAllLeads().then((leads) => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {leads},
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
};

export const deleteAll = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    return base.leadService.deleteAll().then(() => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                message: 'Successfully deleted'
            },
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
};