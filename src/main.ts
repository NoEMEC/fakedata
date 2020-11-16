import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import config from 'config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const serverConfig = config.get('server');
    const port = process.env.PORT || serverConfig.port;
    const options = new DocumentBuilder()
        .setTitle('FakeData API')
        .setDescription(
            'RestFull And GraphQL API fake data for test your FrontEnd Aplications Easy',
        )
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('v1/doc', app, document);
    await app.listen(port);
}
bootstrap();
