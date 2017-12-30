const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const nunjucks = require("nunjucks");
const path = require("path");

const app = express();
app.use(bodyParser.json({type: ["application/json", "application/csp-report"]}));

const STRIPPED_SANDBOX_VALUES = [
    "forms",
    "same-origin",
    "scripts",
    "popups",
    "modals",
    "orientation-lock",
    "pointer-lock",
    "presentation",
    "popups-to-escape-sandbox",
    "top-navigation",
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

function parseSandboxRequest(options) {
    return ["sandbox"].concat(
        options
            .reduce(
                reduceToProperOptions,
                []
            )
    );
}

function determineCspHeaders(req, res, next) {
    res.cspOptions = [];
    if (req.params && req.params.viewToRender) {
        const exploded = req.url.split("/");
        exploded.splice(0, 3);
        if (-1 < exploded.indexOf("sandbox")) {
            res.cspOptions = parseSandboxRequest(exploded);
            res.set("Content-Security-Policy", res.cspOptions.join(" "));
        }
    }
    next();
}


function determineEmbeddedView(req, res, next) {
    const possibleView = `${req.params.viewToRender || "embedded"}.html.j2`;
    if (fs.existsSync(path.join(__dirname, "views", possibleView))) {
        res.actualView = possibleView;
    } else {
        res.actualView = "embedded.html.j2";
    }
    next();
}

nunjucks.configure("views", {
    autoescape: true,
    express: app,
    noCache: true,
    watch: true
});

// app.all("*", buildCspResFromReq);

app.post("/csp-violation-report", (req, res) => {
    console.log(req.body);
    res.sendStatus(204);
});

app.get("/", (req, res) => {
    res.render("index.html.j2");
});

app.get(
    ["/embedded/:viewToRender", "/embedded/:viewToRender/*"],
    determineEmbeddedView,
    determineCspHeaders,
    (req, res) => {
        res.set("Cache-Control", "no-cache");
        res.render(res.actualView, {cspOptions: res.cspOptions});
    }
);

app.get("*", (req, res) => {
    res.status(404).send("Route not defined");
});

app.listen(9001, "127.0.0.200", () => {
    console.log("Example app listening on port 127.0.0.200:9001!");
});

app.listen(9001, "127.0.0.201", () => {
    console.log("Example app listening on port 127.0.0.201:9001!");
});
