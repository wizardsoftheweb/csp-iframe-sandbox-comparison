const express = require("express");
const app = express();

const SANDBOX_VALUES = [
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

function isAValidOption(optionToTest) {
    return -1 < SANDBOX_VALUES.indexOf(optionToTest.replace("allow-", ""));
}

function parseSandboxRequest(req) {
    if (req && req.param && req.param("sandbox")) {
        return ["sandbox"].concat(
            req.param("sandbox")
                .split("+")
                .map((possibleValue) => {
                    if (isAValidOption(possibleValue)) {
                        return `allow-${possibleValue}`;
                    }
                })
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
