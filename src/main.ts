import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./core/filters/http-exception.filter";
import { TransformInterceptor } from "./core/interceptors/transform.interceptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global api prefix
  app.setGlobalPrefix("/api");

  app.useGlobalPipes(new ValidationPipe());

  // global http exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // global result transform interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  // swagger config
  const swaggerOptions = new DocumentBuilder()
    .setTitle("博客管理后台")
    .setDescription("管理后台接口文档")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup("docs", app, document);

  await app.listen(3000);
}

bootstrap();
