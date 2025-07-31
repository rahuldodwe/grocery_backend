import AdminJS from "adminjs";
import AdminJSFastify from "@adminjs/fastify";
import * as AdminJSMongoose from "@adminjs/mongoose";
import * as Models from "../models/index.js";
import { authenticate, COOKIE_PASSWORD, sessionStore  } from "./config.js";
import { dark, light, noSidebar } from "@adminjs/themes";

AdminJS.registerAdapter(AdminJSMongoose);

export const admin = new AdminJS({
    resources:[
        {
            resource: Models.Customer,
            options: {
                listProperties: ["phone", "role", "isActivated"],
                filterProperties: ["phone", "role"],
            },
        },
        {
            resource: Models.DeliveryPartner,
            options: {
                listProperties: ["email", "role", "isActivated"],
                filterProperties: ["email", "role"],
            },
        },
        {
            resource: Models.Admin,
            options: {
                listProperties: ["email", "role", "isActivated"],
                filterProperties: ["email", "role"],
            },
        },
        { resource: Models.Branch },
        { resource: Models.Product },
        { resource: Models.Category },
        { resource: Models.Order },
        { resource: Models.Counter },
    ],
    branding: {
        companyName: "Grocery Delivery App",
        withMadeWithLove: false,
    },
    defaultTheme: dark.id,
    availableThemes: [dark,light,noSidebar],
    rootpath:'/admin',
});

export const buildAdminRouter = async(app)=> {
    await AdminJSFastify.buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            coockiePassword: COOKIE_PASSWORD ,
            coockieName: 'adminjs',
        },
        app,
        {
            store:sessionStore,
            saveUninitialized: true,
            secret: COOKIE_PASSWORD,
            coockie: {
                httpOnly: process.env.NODE_ENV === "production",
                secure: process.env.NODE_ENV === "production",
            },
        },
    );
};