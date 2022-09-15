import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    // 兼容数据验证报出的错误提示
    const message = exception['response']['message'] || exception['response'] || `${status >= 500 ? "Service Error" : "Client Error"}`;

    const errorResponse = {
      data: null,
      message,
      code: -1
    };

    response.status(status);
    response.header("Content-Type", "application/json;charset=utf-8");
    response.send(errorResponse);
  }
}
