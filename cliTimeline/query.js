"use strict";

/**
 * @memberof CLI
 * @desc
 * Calls to repository to query for Objects are done through this sub-command
 */

//
// Imports
//
var log = require("../lib/util/log");
var cmdCore = require("./core");
var fs = require("fs");

//
// Action
//
module.exports = function(params, options) {
    var queryParams = params || {},
        includeDetails = true;

    // eg: tenant=1,name="mPulse Demo"
    if (typeof queryParams === "string") {
        var matchMultiParam = queryParams.match(/(.*,.*|=)/g);

        if (matchMultiParam && matchMultiParam.length > 1) {
            queryParams = queryParams.split(",");
        }
    }

    cmdCore.init(options);

    cmdCore.connectToRepository(options, function(err, timeline) {
        cmdCore.handleError(err);

        timeline.getTimelineObjectsList(queryParams, function(err, data) {
            cmdCore.handleError(err);

            if (options.parent.output) {
                fs.writeFileSync(options.parent.output, JSON.stringify(data));
            } else {
                log.info(data);
            }
        });
    });
};
