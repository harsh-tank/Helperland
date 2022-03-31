import express from "express";
import router, { routes } from "./routes/index";
import multer from "multer";
import cors from "cors";
import {sequelize} from "./models";
import  swaggerJSDoc from "swagger-jsdoc";
import  swaggerUI from "swagger-ui-express";
import cookieParser from "cookie-parser";

const corsOptions = {
    origin: `http://localhost:${process.env.PORT}`
  };

  const app = express();

  const swaggerOption={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Helperland APIs',
            version: '1.0.0',
            description:'Helperland APIs',
            contact:{
                name:'Harsh Tank',
                email:'harshptank2212@gmail.com'
            },
            servers:[
                {
                url: "http://localhost:3000"
                }
            ]
        }
    },
    apis:["routes/admin.ts","routes/bookservice.ts","routes/contact_us.ts",
    "routes/customer.ts","routes/login.ts","routes/serviceprovider.ts","routes/subscribeuser.ts"]
}
const swaggerDocs = swaggerJSDoc(swaggerOption);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
  
  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false}));
  app.use(multer({dest:'uploadFiles'}).single('file'));
  require('dotenv').config();

app.use('/',router);

app.listen(process.env.PORT, () => {
  console.log(`Server rocking at ${process.env.PORT}`)
  sequelize.authenticate().then(async() => {
      console.log("database connected");

    //   try {
    //       await sequelize.sync();
    //   } catch (error) {
    //       console.log(error)
    //   }

  }).catch( (e: any) => {
      console.log(e.message)
  })
})