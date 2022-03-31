"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const models_1 = require("./models");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const corsOptions = {
    origin: `http://localhost:${process.env.PORT}`
};
const app = (0, express_1.default)();
const swaggerOption = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Helperland APIs',
            version: '1.0.0',
            description: 'Helperland APIs',
            contact: {
                name: 'Harsh Tank',
                email: 'harshptank2212@gmail.com'
            },
            servers: [
                {
                    url: "http://localhost:3000"
                }
            ]
        }
    },
    apis: ["routes/admin.ts", "routes/bookservice.ts", "routes/contact_us.ts",
        "routes/customer.ts", "routes/login.ts", "routes/serviceprovider.ts", "routes/subscribeuser.ts"]
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOption);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, multer_1.default)({ dest: 'uploadFiles' }).single('file'));
require('dotenv').config();
app.use('/', index_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server rocking at ${process.env.PORT}`);
    models_1.sequelize.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("database connected");
        //   try {
        //       await sequelize.sync();
        //   } catch (error) {
        //       console.log(error)
        //   }
    })).catch((e) => {
        console.log(e.message);
    });
});
