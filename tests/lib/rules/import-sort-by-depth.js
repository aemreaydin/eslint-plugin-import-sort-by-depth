/**
 * @fileoverview Sorts import statements starting from node_modules, then onto user&#39;s own files
 * @author Emre AYDIN
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/import-sort-by-depth"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
var ruleTester = new RuleTester();
ruleTester.run("import-sort-by-depth", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
