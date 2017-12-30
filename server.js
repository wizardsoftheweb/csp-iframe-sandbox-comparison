const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

const STRIPPED_SANDBOX_VALUES = [
    // "forms",
    // "same-origin",
    "scripts",
    // "popups,",
    "modals",
    // "orientation-lock",
    // "pointer-lock",
    // "presentation",
    // "popups-to-escape-sandbox",
    // "top-navigation",
];

function cleanSandboxOption(optionToClean) {
    return optionToClean.replace("allow-", "");
}

function isAValidStrippedOption(strippedOptionToTest) {
    return -1 < STRIPPED_SANDBOX_VALUES.indexOf(strippedOptionToTest);
}

function reduceToProperOptions(accumulator, currentOption) {
    let strippedCurrentOption = cleanSandboxOption(currentOption);
    if (isAValidStrippedOption(strippedCurrentOption)) {
        accumulator.push(`allow-${strippedCurrentOption}`);
    }
    return accumulator;
}

function parseSandboxRequest(req) {
    if (req && req.query && req.query.sandbox) {
        return (req.query.sandbox || "")
            .split(/[+ ]/)
            .reduce(
                reduceToProperOptions,
                ["sandbox"]
            );
    }
    return [];
}

function buildCspResFromReq(req, res, next) {
    let cspOptions = parseSandboxRequest(req);
    res.cspOptions = cspOptions || [];
    if (res.cspOptions.length > 0) {
        res.set("Content-Security-Policy", cspOptions.join(" "));
    }
    next();
}

nunjucks.configure("views", {
    autoescape: true,
    express: app,
    noCache: true,
    watch: true
});

app.all("*", buildCspResFromReq);

app.get("/", (req, res) => {
    res.render("index.html.j2");
});

app.get("/modals", (req, res) => {
    res.render("modals.html.j2", {cspOptions: res.cspOptions});
});

app.listen(9001, () => {
    console.log("Example app listening on port 9001!");
});
