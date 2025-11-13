import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import * as requestIp from 'request-ip'
export const CurrentAgent = createParamDecorator(
    (data : never, context : ExecutionContext) => {
        const request = context.switchToHttp().getRequest()

        return {...request['headers'], remoteAddress : request.clientIp ?? requestIp.getClientIp(request)}
    }
)