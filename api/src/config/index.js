//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License
//
"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
var nconf = require("nconf");
var path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
var env = process.env.NODE_ENV || "development";
var fileName = "config.json";
if (env === "development") {
    dotenv.config();
}
/**
 * These settings contain sensitive information and should not be
 * stored in the repo. They are extracted from environment variables
 * and added to the config.
 */
// overrides are always as defined
nconf.overrides({
    environment: env,
    port: process.env.PORT || 8100,
    db: {
        host: process.env.POSTGRESQL_HOST,
        user: process.env.APP_DB_USER,
        password: process.env.APP_DB_PASSWORD
    },
    geo: {
        baseURL: process.env.GEO_BASEURL
    }
});
// load other properties from file.
nconf
    .argv()
    .env()
    .file({ file: path.join(__dirname, "" + fileName) });
exports["default"] = nconf;
