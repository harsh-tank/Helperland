import express from "express";
import bookservice from "./bookservice";
import contact_us from "./contact_us";
import login from "./login";
import subscribeuser from "./subscribeuser";

const app = express();

app.use('/',contact_us);
app.use('/',subscribeuser);
app.use('/',login);
app.use('/',bookservice);

export = app;