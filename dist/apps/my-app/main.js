/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/my-app/src/auth/auth.module.ts":
/*!*********************************************!*\
  !*** ./apps/my-app/src/auth/auth.module.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const entities_1 = __webpack_require__(/*! ../users/entities */ "./apps/my-app/src/users/entities/index.ts");
const users_module_1 = __webpack_require__(/*! ../users/users.module */ "./apps/my-app/src/users/users.module.ts");
const users_service_1 = __webpack_require__(/*! ../users/users.service */ "./apps/my-app/src/users/users.service.ts");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/my-app/src/auth/auth.service.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const local_strategy_1 = __webpack_require__(/*! ./local.strategy */ "./apps/my-app/src/auth/local.strategy.ts");
const dotenv = __webpack_require__(/*! dotenv */ "dotenv");
dotenv.config();
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule,
            typeorm_1.TypeOrmModule.forFeature([entities_1.User]),
            jwt_1.JwtModule.register({
                secret: process.env.SECRET_KEY,
                signOptions: { expiresIn: '60s' },
            }),
        ],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, users_service_1.UsersService],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./apps/my-app/src/auth/auth.service.ts":
/*!**********************************************!*\
  !*** ./apps/my-app/src/auth/auth.service.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! ../users/entities */ "./apps/my-app/src/users/entities/index.ts");
const users_service_1 = __webpack_require__(/*! ../users/users.service */ "./apps/my-app/src/users/users.service.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const constants_1 = __webpack_require__(/*! ./constants */ "./apps/my-app/src/auth/constants.ts");
let AuthService = class AuthService {
    constructor(usersService, userRepository, jwtService) {
        this.usersService = usersService;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async validateUser(username, pass) {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { username: user.username, sub: user.userId };
        console.log(constants_1.jwtConstants.secret);
        console.log(process.env.SECRET_KEY);
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _c : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./apps/my-app/src/auth/constants.ts":
/*!*******************************************!*\
  !*** ./apps/my-app/src/auth/constants.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: process.env.SECRET_KEY,
};


/***/ }),

/***/ "./apps/my-app/src/auth/local-auth.guard.ts":
/*!**************************************************!*\
  !*** ./apps/my-app/src/auth/local-auth.guard.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
};
LocalAuthGuard = __decorate([
    (0, common_1.Injectable)()
], LocalAuthGuard);
exports.LocalAuthGuard = LocalAuthGuard;


/***/ }),

/***/ "./apps/my-app/src/auth/local.strategy.ts":
/*!************************************************!*\
  !*** ./apps/my-app/src/auth/local.strategy.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const passport_local_1 = __webpack_require__(/*! passport-local */ "passport-local");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/my-app/src/auth/auth.service.ts");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    async validate(username, password) {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),

/***/ "./apps/my-app/src/my-app.controller.ts":
/*!**********************************************!*\
  !*** ./apps/my-app/src/my-app.controller.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MyAppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ./auth/auth.service */ "./apps/my-app/src/auth/auth.service.ts");
const local_auth_guard_1 = __webpack_require__(/*! ./auth/local-auth.guard */ "./apps/my-app/src/auth/local-auth.guard.ts");
const my_app_service_1 = __webpack_require__(/*! ./my-app.service */ "./apps/my-app/src/my-app.service.ts");
let MyAppController = class MyAppController {
    constructor(myAppService, authService) {
        this.myAppService = myAppService;
        this.authService = authService;
    }
    getHello() {
        return this.myAppService.getHello();
    }
    async login(req) {
        return this.authService.login(req.user);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], MyAppController.prototype, "getHello", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('auth/login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MyAppController.prototype, "login", null);
MyAppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof my_app_service_1.MyAppService !== "undefined" && my_app_service_1.MyAppService) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], MyAppController);
exports.MyAppController = MyAppController;


/***/ }),

/***/ "./apps/my-app/src/my-app.module.ts":
/*!******************************************!*\
  !*** ./apps/my-app/src/my-app.module.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MyAppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const auth_module_1 = __webpack_require__(/*! ./auth/auth.module */ "./apps/my-app/src/auth/auth.module.ts");
const auth_service_1 = __webpack_require__(/*! ./auth/auth.service */ "./apps/my-app/src/auth/auth.service.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const my_app_controller_1 = __webpack_require__(/*! ./my-app.controller */ "./apps/my-app/src/my-app.controller.ts");
const my_app_service_1 = __webpack_require__(/*! ./my-app.service */ "./apps/my-app/src/my-app.service.ts");
const entities_1 = __webpack_require__(/*! ./users/entities */ "./apps/my-app/src/users/entities/index.ts");
const users_module_1 = __webpack_require__(/*! ./users/users.module */ "./apps/my-app/src/users/users.module.ts");
const users_service_1 = __webpack_require__(/*! ./users/users.service */ "./apps/my-app/src/users/users.service.ts");
let MyAppModule = class MyAppModule {
};
MyAppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            jwt_1.JwtModule,
            typeorm_1.TypeOrmModule.forFeature([entities_1.User]),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: +configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: entities_1.default,
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
        ],
        controllers: [my_app_controller_1.MyAppController],
        providers: [my_app_service_1.MyAppService, auth_service_1.AuthService, users_service_1.UsersService],
    })
], MyAppModule);
exports.MyAppModule = MyAppModule;


/***/ }),

/***/ "./apps/my-app/src/my-app.service.ts":
/*!*******************************************!*\
  !*** ./apps/my-app/src/my-app.service.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MyAppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let MyAppService = class MyAppService {
    getHello() {
        return 'Hello World!';
    }
};
MyAppService = __decorate([
    (0, common_1.Injectable)()
], MyAppService);
exports.MyAppService = MyAppService;


/***/ }),

/***/ "./apps/my-app/src/users/dto/create-user.dto.ts":
/*!******************************************************!*\
  !*** ./apps/my-app/src/users/dto/create-user.dto.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateUserDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, swagger_1.ApiProperty)({ description: 'Username', minimum: 3, default: 1 }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(8),
    (0, swagger_1.ApiProperty)({
        description: 'Password',
        minimum: 8,
        default: 1,
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({ description: 'Email', minimum: 8, default: 1 }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
exports.CreateUserDto = CreateUserDto;


/***/ }),

/***/ "./apps/my-app/src/users/dto/update-user.dto.ts":
/*!******************************************************!*\
  !*** ./apps/my-app/src/users/dto/update-user.dto.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const create_user_dto_1 = __webpack_require__(/*! ./create-user.dto */ "./apps/my-app/src/users/dto/create-user.dto.ts");
class UpdateUserDto extends (0, swagger_1.PartialType)(create_user_dto_1.CreateUserDto) {
}
exports.UpdateUserDto = UpdateUserDto;


/***/ }),

/***/ "./apps/my-app/src/users/entities/index.ts":
/*!*************************************************!*\
  !*** ./apps/my-app/src/users/entities/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./apps/my-app/src/users/entities/user.entity.ts");
Object.defineProperty(exports, "User", ({ enumerable: true, get: function () { return user_entity_1.User; } }));
const entities = [user_entity_1.User];
exports["default"] = entities;


/***/ }),

/***/ "./apps/my-app/src/users/entities/user.entity.ts":
/*!*******************************************************!*\
  !*** ./apps/my-app/src/users/entities/user.entity.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'bigint',
        name: 'user_id',
    }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'email_address',
        nullable: false,
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;


/***/ }),

/***/ "./apps/my-app/src/users/users.controller.ts":
/*!***************************************************!*\
  !*** ./apps/my-app/src/users/users.controller.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./apps/my-app/src/users/users.service.ts");
const create_user_dto_1 = __webpack_require__(/*! ./dto/create-user.dto */ "./apps/my-app/src/users/dto/create-user.dto.ts");
const update_user_dto_1 = __webpack_require__(/*! ./dto/update-user.dto */ "./apps/my-app/src/users/dto/update-user.dto.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    findAll() {
        return this.usersService.findAll();
    }
    findOne(username) {
        return this.usersService.findOne(username);
    }
    update(id, updateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }
    remove(id) {
        return this.usersService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: [create_user_dto_1.CreateUserDto] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [typeof (_c = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _c : Object])
], UsersController);
exports.UsersController = UsersController;


/***/ }),

/***/ "./apps/my-app/src/users/users.module.ts":
/*!***********************************************!*\
  !*** ./apps/my-app/src/users/users.module.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./apps/my-app/src/users/users.service.ts");
const users_controller_1 = __webpack_require__(/*! ./users.controller */ "./apps/my-app/src/users/users.controller.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const user_entity_1 = __webpack_require__(/*! ./entities/user.entity */ "./apps/my-app/src/users/entities/user.entity.ts");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),

/***/ "./apps/my-app/src/users/users.service.ts":
/*!************************************************!*\
  !*** ./apps/my-app/src/users/users.service.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const Repository_1 = __webpack_require__(/*! typeorm/repository/Repository */ "typeorm/repository/Repository");
const user_entity_1 = __webpack_require__(/*! ./entities/user.entity */ "./apps/my-app/src/users/entities/user.entity.ts");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    create(createUserDto) {
        const newUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
    }
    findAll() {
        return this.userRepository.find();
    }
    findOne(username) {
        return this.userRepository.findOneBy({ username: username });
    }
    update(id, updateUserDto) {
        return this.userRepository.update(id, updateUserDto);
    }
    remove(id) {
        return this.userRepository.delete(id);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof Repository_1.Repository !== "undefined" && Repository_1.Repository) === "function" ? _a : Object])
], UsersService);
exports.UsersService = UsersService;


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "typeorm/repository/Repository":
/*!************************************************!*\
  !*** external "typeorm/repository/Repository" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("typeorm/repository/Repository");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************************!*\
  !*** ./apps/my-app/src/main.ts ***!
  \*********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const my_app_module_1 = __webpack_require__(/*! ./my-app.module */ "./apps/my-app/src/my-app.module.ts");
const dotenv = __webpack_require__(/*! dotenv */ "dotenv");
dotenv.config();
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEdBQUcsSUFBSSx5QkFBZSxFQUFFO1NBQ2pDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQztTQUM1QixjQUFjLENBQUMsOEJBQThCLENBQUM7U0FDOUMsVUFBVSxDQUFDLEtBQUssQ0FBQztTQUNqQixNQUFNLENBQUMsVUFBVSxDQUFDO1NBQ2xCLEtBQUssRUFBRSxDQUFDO0lBRVgsTUFBTSxRQUFRLEdBQUcsdUJBQWEsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzNELHVCQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFDRCxTQUFTLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21vbm8tcmVwby8uL2FwcHMvbXktYXBwL3NyYy9hdXRoL2F1dGgubW9kdWxlLnRzIiwid2VicGFjazovL21vbm8tcmVwby8uL2FwcHMvbXktYXBwL3NyYy9hdXRoL2F1dGguc2VydmljZS50cyIsIndlYnBhY2s6Ly9tb25vLXJlcG8vLi9hcHBzL215LWFwcC9zcmMvYXV0aC9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vbW9uby1yZXBvLy4vYXBwcy9teS1hcHAvc3JjL2F1dGgvbG9jYWwtYXV0aC5ndWFyZC50cyIsIndlYnBhY2s6Ly9tb25vLXJlcG8vLi9hcHBzL215LWFwcC9zcmMvYXV0aC9sb2NhbC5zdHJhdGVneS50cyIsIndlYnBhY2s6Ly9tb25vLXJlcG8vLi9hcHBzL215LWFwcC9zcmMvbXktYXBwLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vbW9uby1yZXBvLy4vYXBwcy9teS1hcHAvc3JjL215LWFwcC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vbW9uby1yZXBvLy4vYXBwcy9teS1hcHAvc3JjL215LWFwcC5zZXJ2aWNlLnRzIiwid2VicGFjazovL21vbm8tcmVwby8uL2FwcHMvbXktYXBwL3NyYy91c2Vycy9kdG8vY3JlYXRlLXVzZXIuZHRvLnRzIiwid2VicGFjazovL21vbm8tcmVwby8uL2FwcHMvbXktYXBwL3NyYy91c2Vycy9kdG8vdXBkYXRlLXVzZXIuZHRvLnRzIiwid2VicGFjazovL21vbm8tcmVwby8uL2FwcHMvbXktYXBwL3NyYy91c2Vycy9lbnRpdGllcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tb25vLXJlcG8vLi9hcHBzL215LWFwcC9zcmMvdXNlcnMvZW50aXRpZXMvdXNlci5lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vbW9uby1yZXBvLy4vYXBwcy9teS1hcHAvc3JjL3VzZXJzL3VzZXJzLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vbW9uby1yZXBvLy4vYXBwcy9teS1hcHAvc3JjL3VzZXJzL3VzZXJzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly9tb25vLXJlcG8vLi9hcHBzL215LWFwcC9zcmMvdXNlcnMvdXNlcnMuc2VydmljZS50cyIsIndlYnBhY2s6Ly9tb25vLXJlcG8vZXh0ZXJuYWwgY29tbW9uanMgXCJAbmVzdGpzL2NvbW1vblwiIiwid2VicGFjazovL21vbm8tcmVwby9leHRlcm5hbCBjb21tb25qcyBcIkBuZXN0anMvY29uZmlnXCIiLCJ3ZWJwYWNrOi8vbW9uby1yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwiQG5lc3Rqcy9jb3JlXCIiLCJ3ZWJwYWNrOi8vbW9uby1yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwiQG5lc3Rqcy9qd3RcIiIsIndlYnBhY2s6Ly9tb25vLXJlcG8vZXh0ZXJuYWwgY29tbW9uanMgXCJAbmVzdGpzL3Bhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vbW9uby1yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwiQG5lc3Rqcy9zd2FnZ2VyXCIiLCJ3ZWJwYWNrOi8vbW9uby1yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwiQG5lc3Rqcy90eXBlb3JtXCIiLCJ3ZWJwYWNrOi8vbW9uby1yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwiY2xhc3MtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vbW9uby1yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vbW9uby1yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwicGFzc3BvcnQtbG9jYWxcIiIsIndlYnBhY2s6Ly9tb25vLXJlcG8vZXh0ZXJuYWwgY29tbW9uanMgXCJ0eXBlb3JtXCIiLCJ3ZWJwYWNrOi8vbW9uby1yZXBvL2V4dGVybmFsIGNvbW1vbmpzIFwidHlwZW9ybS9yZXBvc2l0b3J5L1JlcG9zaXRvcnlcIiIsIndlYnBhY2s6Ly9tb25vLXJlcG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbW9uby1yZXBvLy4vYXBwcy9teS1hcHAvc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUGFzc3BvcnRNb2R1bGUgfSBmcm9tICdAbmVzdGpzL3Bhc3Nwb3J0JztcbmltcG9ydCB7IFR5cGVPcm1Nb2R1bGUgfSBmcm9tICdAbmVzdGpzL3R5cGVvcm0nO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3VzZXJzL2VudGl0aWVzJztcbmltcG9ydCB7IFVzZXJzTW9kdWxlIH0gZnJvbSAnLi4vdXNlcnMvdXNlcnMubW9kdWxlJztcbmltcG9ydCB7IFVzZXJzU2VydmljZSB9IGZyb20gJy4uL3VzZXJzL3VzZXJzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBKd3RNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2p3dCc7XG5pbXBvcnQgeyBMb2NhbFN0cmF0ZWd5IH0gZnJvbSAnLi9sb2NhbC5zdHJhdGVneSc7XG5cbmltcG9ydCAqIGFzIGRvdGVudiBmcm9tICdkb3RlbnYnO1xuZG90ZW52LmNvbmZpZygpO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFVzZXJzTW9kdWxlLFxuICAgIFBhc3Nwb3J0TW9kdWxlLFxuICAgIFR5cGVPcm1Nb2R1bGUuZm9yRmVhdHVyZShbVXNlcl0pLFxuICAgIEp3dE1vZHVsZS5yZWdpc3Rlcih7XG4gICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52LlNFQ1JFVF9LRVksXG4gICAgICBzaWduT3B0aW9uczogeyBleHBpcmVzSW46ICc2MHMnIH0sXG4gICAgfSksXG4gIF0sXG5cbiAgcHJvdmlkZXJzOiBbQXV0aFNlcnZpY2UsIExvY2FsU3RyYXRlZ3ksIFVzZXJzU2VydmljZV0sXG4gIGV4cG9ydHM6IFtBdXRoU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhNb2R1bGUge31cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RSZXBvc2l0b3J5IH0gZnJvbSAnQG5lc3Rqcy90eXBlb3JtJztcbmltcG9ydCB7IFJlcG9zaXRvcnkgfSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi91c2Vycy9lbnRpdGllcyc7XG5pbXBvcnQgeyBVc2Vyc1NlcnZpY2UgfSBmcm9tICcuLi91c2Vycy91c2Vycy5zZXJ2aWNlJztcbmltcG9ydCB7IEp3dFNlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2p3dCc7XG5pbXBvcnQgeyBjb25zdGFudHMgfSBmcm9tICdidWZmZXInO1xuaW1wb3J0IHsgand0Q29uc3RhbnRzIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdXNlcnNTZXJ2aWNlOiBVc2Vyc1NlcnZpY2UsXG4gICAgQEluamVjdFJlcG9zaXRvcnkoVXNlcikgcHJpdmF0ZSByZWFkb25seSB1c2VyUmVwb3NpdG9yeTogUmVwb3NpdG9yeTxVc2VyPixcbiAgICBwcml2YXRlIGp3dFNlcnZpY2U6IEp3dFNlcnZpY2UsXG4gICkge31cblxuICBhc3luYyB2YWxpZGF0ZVVzZXIodXNlcm5hbWU6IHN0cmluZywgcGFzczogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy51c2Vyc1NlcnZpY2UuZmluZE9uZSh1c2VybmFtZSk7XG4gICAgaWYgKHVzZXIgJiYgdXNlci5wYXNzd29yZCA9PT0gcGFzcykge1xuICAgICAgY29uc3QgeyBwYXNzd29yZCwgLi4ucmVzdWx0IH0gPSB1c2VyO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgYXN5bmMgbG9naW4odXNlcjogYW55KSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IHsgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUsIHN1YjogdXNlci51c2VySWQgfTtcbiAgICBjb25zb2xlLmxvZyhqd3RDb25zdGFudHMuc2VjcmV0KTtcbiAgICBjb25zb2xlLmxvZyhwcm9jZXNzLmVudi5TRUNSRVRfS0VZKTtcbiAgICByZXR1cm4ge1xuICAgICAgYWNjZXNzX3Rva2VuOiB0aGlzLmp3dFNlcnZpY2Uuc2lnbihwYXlsb2FkKSxcbiAgICB9O1xuICB9XG59XG4iLCJleHBvcnQgY29uc3Qgand0Q29uc3RhbnRzID0ge1xuICBzZWNyZXQ6IHByb2Nlc3MuZW52LlNFQ1JFVF9LRVksXG59O1xuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYWxBdXRoR3VhcmQgZXh0ZW5kcyBBdXRoR3VhcmQoJ2xvY2FsJykge31cbiIsImltcG9ydCB7IFN0cmF0ZWd5IH0gZnJvbSAncGFzc3BvcnQtbG9jYWwnO1xuaW1wb3J0IHsgUGFzc3BvcnRTdHJhdGVneSB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgVW5hdXRob3JpemVkRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhbFN0cmF0ZWd5IGV4dGVuZHMgUGFzc3BvcnRTdHJhdGVneShTdHJhdGVneSkge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBhc3luYyB2YWxpZGF0ZSh1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy5hdXRoU2VydmljZS52YWxpZGF0ZVVzZXIodXNlcm5hbWUsIHBhc3N3b3JkKTtcbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oKTtcbiAgICB9XG4gICAgcmV0dXJuIHVzZXI7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbnRyb2xsZXIsIEdldCwgUG9zdCwgVXNlR3VhcmRzLCBSZXF1ZXN0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnQG5lc3Rqcy9wYXNzcG9ydCc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aC9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9jYWxBdXRoR3VhcmQgfSBmcm9tICcuL2F1dGgvbG9jYWwtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBNeUFwcFNlcnZpY2UgfSBmcm9tICcuL215LWFwcC5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoKVxuZXhwb3J0IGNsYXNzIE15QXBwQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgbXlBcHBTZXJ2aWNlOiBNeUFwcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KClcbiAgZ2V0SGVsbG8oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5teUFwcFNlcnZpY2UuZ2V0SGVsbG8oKTtcbiAgfVxuXG4gIEBVc2VHdWFyZHMoTG9jYWxBdXRoR3VhcmQpXG4gIEBQb3N0KCdhdXRoL2xvZ2luJylcbiAgYXN5bmMgbG9naW4oQFJlcXVlc3QoKSByZXEpIHtcbiAgICByZXR1cm4gdGhpcy5hdXRoU2VydmljZS5sb2dpbihyZXEudXNlcik7XG4gIH1cbn1cbiIsIlxuaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnTW9kdWxlLCBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xuaW1wb3J0IHsgVHlwZU9ybU1vZHVsZSB9IGZyb20gJ0BuZXN0anMvdHlwZW9ybSc7XG5pbXBvcnQgeyBBdXRoTW9kdWxlIH0gZnJvbSAnLi9hdXRoL2F1dGgubW9kdWxlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBKd3RNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2p3dCc7XG5pbXBvcnQgeyBNeUFwcENvbnRyb2xsZXIgfSBmcm9tICcuL215LWFwcC5jb250cm9sbGVyJztcbmltcG9ydCB7IE15QXBwU2VydmljZSB9IGZyb20gJy4vbXktYXBwLnNlcnZpY2UnO1xuaW1wb3J0IGVudGl0aWVzLCB7IFVzZXIgfSBmcm9tICcuL3VzZXJzL2VudGl0aWVzJztcbmltcG9ydCB7IFVzZXJzTW9kdWxlIH0gZnJvbSAnLi91c2Vycy91c2Vycy5tb2R1bGUnO1xuaW1wb3J0IHsgVXNlcnNTZXJ2aWNlIH0gZnJvbSAnLi91c2Vycy91c2Vycy5zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBBdXRoTW9kdWxlLFxuICAgIEp3dE1vZHVsZSxcbiAgICBUeXBlT3JtTW9kdWxlLmZvckZlYXR1cmUoW1VzZXJdKSxcbiAgICBDb25maWdNb2R1bGUuZm9yUm9vdCh7IGlzR2xvYmFsOiB0cnVlIH0pLFxuICAgIFR5cGVPcm1Nb2R1bGUuZm9yUm9vdEFzeW5jKHtcbiAgICAgIGltcG9ydHM6IFtDb25maWdNb2R1bGVdLFxuICAgICAgdXNlRmFjdG9yeTogKGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UpID0+ICh7XG4gICAgICAgIHR5cGU6ICdwb3N0Z3JlcycsXG4gICAgICAgIGhvc3Q6IGNvbmZpZ1NlcnZpY2UuZ2V0KCdEQl9IT1NUJyksXG4gICAgICAgIHBvcnQ6ICtjb25maWdTZXJ2aWNlLmdldDxudW1iZXI+KCdEQl9QT1JUJyksXG4gICAgICAgIHVzZXJuYW1lOiBjb25maWdTZXJ2aWNlLmdldCgnREJfVVNFUk5BTUUnKSxcbiAgICAgICAgcGFzc3dvcmQ6IGNvbmZpZ1NlcnZpY2UuZ2V0KCdEQl9QQVNTV09SRCcpLFxuICAgICAgICBkYXRhYmFzZTogY29uZmlnU2VydmljZS5nZXQoJ0RCX0RBVEFCQVNFJyksXG4gICAgICAgIGVudGl0aWVzOiBlbnRpdGllcyxcbiAgICAgICAgc3luY2hyb25pemU6IHRydWUsXG4gICAgICB9KSxcbiAgICAgIGluamVjdDogW0NvbmZpZ1NlcnZpY2VdLFxuICAgIH0pLFxuICAgIFVzZXJzTW9kdWxlLFxuICBdLFxuICBjb250cm9sbGVyczogW015QXBwQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW015QXBwU2VydmljZSwgQXV0aFNlcnZpY2UsIFVzZXJzU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIE15QXBwTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTXlBcHBTZXJ2aWNlIHtcbiAgZ2V0SGVsbG8oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ0hlbGxvIFdvcmxkISc7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFwaVByb3BlcnR5IH0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcbmltcG9ydCB7IElzRW1haWwsIElzTm90RW1wdHksIE1pbkxlbmd0aCB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5cbmV4cG9ydCBjbGFzcyBDcmVhdGVVc2VyRHRvIHtcbiAgQElzTm90RW1wdHkoKVxuICBATWluTGVuZ3RoKDMpXG4gIEBBcGlQcm9wZXJ0eSh7IGRlc2NyaXB0aW9uOiAnVXNlcm5hbWUnLCBtaW5pbXVtOiAzLCBkZWZhdWx0OiAxIH0pXG4gIHVzZXJuYW1lOiBzdHJpbmc7XG5cbiAgQElzTm90RW1wdHkoKVxuICBATWluTGVuZ3RoKDgpXG4gIEBBcGlQcm9wZXJ0eSh7XG4gICAgZGVzY3JpcHRpb246ICdQYXNzd29yZCcsXG4gICAgbWluaW11bTogOCxcbiAgICBkZWZhdWx0OiAxLFxuICB9KVxuICBwYXNzd29yZDogc3RyaW5nO1xuXG4gIEBJc05vdEVtcHR5KClcbiAgQElzRW1haWwoKVxuICBAQXBpUHJvcGVydHkoeyBkZXNjcmlwdGlvbjogJ0VtYWlsJywgbWluaW11bTogOCwgZGVmYXVsdDogMSB9KVxuICBlbWFpbDogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHsgUGFydGlhbFR5cGUgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgQ3JlYXRlVXNlckR0byB9IGZyb20gJy4vY3JlYXRlLXVzZXIuZHRvJztcblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVVzZXJEdG8gZXh0ZW5kcyBQYXJ0aWFsVHlwZShDcmVhdGVVc2VyRHRvKSB7fVxuIiwiaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlci5lbnRpdHknO1xuXG5jb25zdCBlbnRpdGllcyA9IFtVc2VyXTtcblxuZXhwb3J0IHsgVXNlciB9O1xuZXhwb3J0IGRlZmF1bHQgZW50aXRpZXM7XG4iLCJpbXBvcnQgeyBDb2x1bW4sIEVudGl0eSwgUHJpbWFyeUdlbmVyYXRlZENvbHVtbiB9IGZyb20gJ3R5cGVvcm0nO1xuXG5ARW50aXR5KClcbmV4cG9ydCBjbGFzcyBVc2VyIHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oe1xuICAgIHR5cGU6ICdiaWdpbnQnLFxuICAgIG5hbWU6ICd1c2VyX2lkJyxcbiAgfSlcbiAgaWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKHtcbiAgICBudWxsYWJsZTogZmFsc2UsXG4gICAgZGVmYXVsdDogJycsXG4gIH0pXG4gIHVzZXJuYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbih7XG4gICAgbmFtZTogJ2VtYWlsX2FkZHJlc3MnLFxuICAgIG51bGxhYmxlOiBmYWxzZSxcbiAgICBkZWZhdWx0OiAnJyxcbiAgfSlcbiAgZW1haWw6IHN0cmluZztcblxuICBAQ29sdW1uKHtcbiAgICBudWxsYWJsZTogZmFsc2UsXG4gICAgZGVmYXVsdDogJycsXG4gIH0pXG4gIHBhc3N3b3JkOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQge1xuICBDb250cm9sbGVyLFxuICBHZXQsXG4gIFBvc3QsXG4gIEJvZHksXG4gIFBhdGNoLFxuICBQYXJhbSxcbiAgRGVsZXRlLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBVc2Vyc1NlcnZpY2UgfSBmcm9tICcuL3VzZXJzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3JlYXRlVXNlckR0byB9IGZyb20gJy4vZHRvL2NyZWF0ZS11c2VyLmR0byc7XG5pbXBvcnQgeyBVcGRhdGVVc2VyRHRvIH0gZnJvbSAnLi9kdG8vdXBkYXRlLXVzZXIuZHRvJztcbmltcG9ydCB7IEFwaUJvZHkgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuXG5AQ29udHJvbGxlcigndXNlcnMnKVxuZXhwb3J0IGNsYXNzIFVzZXJzQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgdXNlcnNTZXJ2aWNlOiBVc2Vyc1NlcnZpY2UpIHt9XG5cbiAgQFBvc3QoKVxuICBAQXBpQm9keSh7IHR5cGU6IFtDcmVhdGVVc2VyRHRvXSB9KVxuICBjcmVhdGUoQEJvZHkoKSBjcmVhdGVVc2VyRHRvOiBDcmVhdGVVc2VyRHRvKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlcnNTZXJ2aWNlLmNyZWF0ZShjcmVhdGVVc2VyRHRvKTtcbiAgfVxuXG4gIEBHZXQoKVxuICBmaW5kQWxsKCkge1xuICAgIHJldHVybiB0aGlzLnVzZXJzU2VydmljZS5maW5kQWxsKCk7XG4gIH1cblxuICBAR2V0KCc6dXNlcm5hbWUnKVxuICBmaW5kT25lKEBQYXJhbSgndXNlcm5hbWUnKSB1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlcnNTZXJ2aWNlLmZpbmRPbmUodXNlcm5hbWUpO1xuICB9XG5cbiAgQFBhdGNoKCc6aWQnKVxuICB1cGRhdGUoQFBhcmFtKCdpZCcpIGlkOiBzdHJpbmcsIEBCb2R5KCkgdXBkYXRlVXNlckR0bzogVXBkYXRlVXNlckR0bykge1xuICAgIHJldHVybiB0aGlzLnVzZXJzU2VydmljZS51cGRhdGUoK2lkLCB1cGRhdGVVc2VyRHRvKTtcbiAgfVxuXG4gIEBEZWxldGUoJzppZCcpXG4gIHJlbW92ZShAUGFyYW0oJ2lkJykgaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnVzZXJzU2VydmljZS5yZW1vdmUoK2lkKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlcnNTZXJ2aWNlIH0gZnJvbSAnLi91c2Vycy5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJzQ29udHJvbGxlciB9IGZyb20gJy4vdXNlcnMuY29udHJvbGxlcic7XG5pbXBvcnQgeyBUeXBlT3JtTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy90eXBlb3JtJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL2VudGl0aWVzL3VzZXIuZW50aXR5JztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtUeXBlT3JtTW9kdWxlLmZvckZlYXR1cmUoW1VzZXJdKV0sXG4gIGNvbnRyb2xsZXJzOiBbVXNlcnNDb250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbVXNlcnNTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgVXNlcnNNb2R1bGUge31cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RSZXBvc2l0b3J5IH0gZnJvbSAnQG5lc3Rqcy90eXBlb3JtJztcbmltcG9ydCB7IFJlcG9zaXRvcnkgfSBmcm9tICd0eXBlb3JtL3JlcG9zaXRvcnkvUmVwb3NpdG9yeSc7XG5pbXBvcnQgeyBDcmVhdGVVc2VyRHRvIH0gZnJvbSAnLi9kdG8vY3JlYXRlLXVzZXIuZHRvJztcbmltcG9ydCB7IFVwZGF0ZVVzZXJEdG8gfSBmcm9tICcuL2R0by91cGRhdGUtdXNlci5kdG8nO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vZW50aXRpZXMvdXNlci5lbnRpdHknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlcnNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdFJlcG9zaXRvcnkoVXNlcikgcHJpdmF0ZSByZWFkb25seSB1c2VyUmVwb3NpdG9yeTogUmVwb3NpdG9yeTxVc2VyPixcbiAgKSB7fVxuICBjcmVhdGUoY3JlYXRlVXNlckR0bzogQ3JlYXRlVXNlckR0bykge1xuICAgIGNvbnN0IG5ld1VzZXIgPSB0aGlzLnVzZXJSZXBvc2l0b3J5LmNyZWF0ZShjcmVhdGVVc2VyRHRvKTtcbiAgICByZXR1cm4gdGhpcy51c2VyUmVwb3NpdG9yeS5zYXZlKG5ld1VzZXIpO1xuICB9XG5cbiAgZmluZEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy51c2VyUmVwb3NpdG9yeS5maW5kKCk7XG4gIH1cblxuICBmaW5kT25lKHVzZXJuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy51c2VyUmVwb3NpdG9yeS5maW5kT25lQnkoeyB1c2VybmFtZTogdXNlcm5hbWUgfSk7XG4gIH1cblxuICB1cGRhdGUoaWQ6IG51bWJlciwgdXBkYXRlVXNlckR0bzogVXBkYXRlVXNlckR0bykge1xuICAgIHJldHVybiB0aGlzLnVzZXJSZXBvc2l0b3J5LnVwZGF0ZShpZCwgdXBkYXRlVXNlckR0byk7XG4gIH1cblxuICByZW1vdmUoaWQ6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLnVzZXJSZXBvc2l0b3J5LmRlbGV0ZShpZCk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29tbW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29uZmlnXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2p3dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL3Bhc3Nwb3J0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvc3dhZ2dlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL3R5cGVvcm1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3MtdmFsaWRhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydC1sb2NhbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0eXBlb3JtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR5cGVvcm0vcmVwb3NpdG9yeS9SZXBvc2l0b3J5XCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBOZXN0RmFjdG9yeSB9IGZyb20gJ0BuZXN0anMvY29yZSc7XG5pbXBvcnQgeyBEb2N1bWVudEJ1aWxkZXIsIFN3YWdnZXJNb2R1bGUgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgTXlBcHBNb2R1bGUgfSBmcm9tICcuL215LWFwcC5tb2R1bGUnO1xuaW1wb3J0ICogYXMgZG90ZW52IGZyb20gJ2RvdGVudic7IC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbW90ZG90bGEvZG90ZW52I2hvdy1kby1pLXVzZS1kb3RlbnYtd2l0aC1pbXBvcnRcblxuZG90ZW52LmNvbmZpZygpO1xuXG5hc3luYyBmdW5jdGlvbiBib290c3RyYXAoKSB7XG4gIGNvbnN0IGFwcCA9IGF3YWl0IE5lc3RGYWN0b3J5LmNyZWF0ZShNeUFwcE1vZHVsZSk7XG4gIGNvbnN0IGNvbmZpZyA9IG5ldyBEb2N1bWVudEJ1aWxkZXIoKVxuICAgIC5zZXRUaXRsZSgnTW9ub1JlcG8gRXhhbXBsZScpXG4gICAgLnNldERlc2NyaXB0aW9uKCdUaGUgbW9ub3JlcG8gQVBJIGRlc2NyaXB0aW9uJylcbiAgICAuc2V0VmVyc2lvbignMS4wJylcbiAgICAuYWRkVGFnKCdtb25vcmVwbycpXG4gICAgLmJ1aWxkKCk7XG5cbiAgY29uc3QgZG9jdW1lbnQgPSBTd2FnZ2VyTW9kdWxlLmNyZWF0ZURvY3VtZW50KGFwcCwgY29uZmlnKTtcbiAgU3dhZ2dlck1vZHVsZS5zZXR1cCgnYXBpJywgYXBwLCBkb2N1bWVudCk7XG4gIGF3YWl0IGFwcC5saXN0ZW4oMzAwMCk7XG59XG5ib290c3RyYXAoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==