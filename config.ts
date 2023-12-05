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
    dev: "develop_bgnews",
  },
  DATABASE: {
    prod: "bot",
    dev: "develop_bgnews",
  },
  PASSWORD: {
    prod: "",
    dev: "G$ONJ-^pmfMb}K6(",
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
