import test from "./test.config";
import dev from "./dev.config";
import prod from "./prod.config";

const env = process.env.NODE_ENV;
const config = env === "test" ? test : env === "production" ? prod : dev;

module.exports = config;
