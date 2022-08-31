"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const my_app_controller_1 = require("./my-app.controller");
const my_app_service_1 = require("./my-app.service");
describe('MyAppController', () => {
    let myAppController;
    beforeEach(async () => {
        const app = await testing_1.Test.createTestingModule({
            controllers: [my_app_controller_1.MyAppController],
            providers: [my_app_service_1.MyAppService],
        }).compile();
        myAppController = app.get(my_app_controller_1.MyAppController);
    });
    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(myAppController.getHello()).toBe('Hello World!');
        });
    });
});
//# sourceMappingURL=my-app.controller.spec.js.map