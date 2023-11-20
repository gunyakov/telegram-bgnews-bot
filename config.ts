import { Mode } from "./src/enums";

export var MODE: Mode = Mode.dev;
export var BOT_TOKEN: { [key in Mode]: string } = {
  prod: "",
  dev: "6942784764:AAFzvohXh2RGh3rRE2dx-xVGVpAKVP0r53w",
};
export var SERVER_IP = "somedomain.com";
export var WEBHOOK_PORT = 9777;
export var DB = {
  HOST: {
    prod: "localhost",
    dev: "localhost",
  },
  USER: {
    prod: "bot",
    dev: "goodzon",
  },
  DATABASE: {
    prod: "bot",
    dev: "bot_test",
  },
  PASSWORD: {
    prod: "",
    dev: "",
  },
};
export var LOG = {
  LENGTH: 30,
  MAIN: {
    success: true,
    info: true,
    error: true,
    warning: true,
  },
  DB: {
    success: true,
    info: true,
    error: true,
    warning: true,
  },
  BOT: {
    success: true,
    info: true,
    error: true,
    warning: true,
  },
  SERVICE: {
    success: true,
    info: true,
    error: true,
    warning: true,
  },
  SESSION: {
    success: true,
    info: true,
    error: true,
    warning: true,
  },
};
