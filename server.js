const express = require("express");
const app = express();

const STRIPPED_SANDBOX_VALUES = [
    // "forms",
    // "same-origin",
    "scripts",
    // "popups,",
    "modals,",
    // "orientation-lock,",
    // "pointer-lock,",
    // "presentation,",
    // "popups-to-escape-sandbox,",
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
    if (req && req.param && req.param("sandbox")) {
        return req.param("sandbox")
            .split("+")
            .reduce(
                reduceToProperOptions,
                ["sandbox"]
            );
    }
    return [];
}

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(9001, () => {
    console.log("Example app listening on port 9001!");
});
