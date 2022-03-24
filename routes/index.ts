import express from "express";
import bookservice from "./bookservice";
import contact_us from "./contact_us";
import login from "./login";
import subscribeuser from "./subscribeuser";
import customer from "./customer";
import serviceprovider from "./serviceprovider";

const app = express();

app.use('/',contact_us);
app.use('/',subscribeuser);
app.use('/',login);
app.use('/',bookservice);
app.use('/',customer);
app.use('/',serviceprovider);

export = app;