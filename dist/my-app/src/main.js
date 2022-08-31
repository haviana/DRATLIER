"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const my_app_module_1 = require("./my-app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(my_app_module_1.MyAppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('MonoRepo Example')
        .setDescription('The monorepo API description')
        .setVersion('1.0')
        .addTag('monorepo')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map