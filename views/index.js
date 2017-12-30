const EMBED_CONTAINER = $("#embed-here");
const SANDBOX_CONTROLS = $("#sandbox-controls");
const OPTION_STATE = {
    csp: {
        controls: $("#csp-controls"),
        sandbox: $("#csp-sandbox"),
        scripts: $("#csp-allow-scripts"),
        modals: $("#csp-allow-modals"),
    },
    iframe: {
        controls: $("#iframe-controls"),
        sandbox: $("#iframe-sandbox"),
        scripts: $("#iframe-allow-scripts"),
        modals: $("#iframe-allow-modals"),
    },
};
const MAIN_NAV = $("#main-nav");
const SCROLL_SPY_SHIFT = 10;

let MAIN_NAV_HEIGHT_CONTRIBUTION;
let SCROLL_SPY_OFFSET;

$(document).ready(function() {
    MAIN_NAV_HEIGHT_CONTRIBUTION = parseInt(MAIN_NAV.css("height"));
    SCROLL_SPY_OFFSET = MAIN_NAV_HEIGHT_CONTRIBUTION + SCROLL_SPY_SHIFT;
    // $("body>.jumbotron-fluid").css("margin-top", `${SCROLL_SPY_OFFSET}px`);
    $("body").scrollspy({
        target: "#main-nav",
        offset: SCROLL_SPY_OFFSET
    });

    // @todo: write-up around this answer
    // https://stackoverflow.com/a/23084780/2877698
    // https://caniuse.com/#search=replaceState
    // https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_replaceState%28%29_method
    $(window).on("activate.bs.scrollspy", function(event) {
        const currentHref = location.href;
        const storedHash = location.hash;
        const triggeredHash = $("#main-nav a.active")
            .attr("href")
            .replace("#top", "");
        history.replaceState({},
            "",
            currentHref.replace(storedHash, "") + triggeredHash
        );
    });

    $("a[href^='#']").not("a[href='#']").click(function(event) {
        const target = $($.attr(this, "href"));
        if (target && target.length > 0) {
            event.preventDefault();
            scrollToElement(target);
        }
    });

    rebuildAllControlStates();

    reloadEmbed();

    SANDBOX_CONTROLS.find("input[type='checkbox']").change(function() {
        updateToggleState($(this));
        reloadEmbed();
    });

    SANDBOX_CONTROLS.find("td > button.btn.btn-primary").click(function() {
        let owningRow = $(this).closest("tr");
        owningRow.find("input[id$='sandbox']")
            .prop("checked", true);
        owningRow.find("input[id*='-allow-']").each(function() {
            $(this).prop("checked", false);
        });
        owningRow.find("input[type='checkbox']").each(function() {
            updateToggleState($(this));
        });
        reloadEmbed();
    });
});

function scrollToElement(target, scrollTime = 300) {
    $("html, body").animate({
        scrollTop: target.offset().top - SCROLL_SPY_OFFSET
    },
    scrollTime,
    function() {
        target.focus();
    }
    );
}

function reloadEmbed() {
    EMBED_CONTAINER.find("iframe").remove();
    let embed = $("<iframe />");
    let source = "modals";
    let cspSandboxed = OPTION_STATE.csp.sandbox.is(":checked");
    if (cspSandboxed) {
        source += "?sandbox=on";
        if (OPTION_STATE.csp.scripts.is(":checked")) {
            source += "+scripts";
        }
        if (OPTION_STATE.csp.modals.is(":checked")) {
            source += "+modals";
        }
    }
    embed.attr("src", source);
    let iframeSandboxed = OPTION_STATE.iframe.sandbox.is(":checked");
    if (iframeSandboxed) {
        let options = [];
        if (OPTION_STATE.iframe.scripts.is(":checked")) {
            options.push("allow-scripts");
            if (OPTION_STATE.iframe.modals.is(":checked")) {
                options.push("allow-modals");
            }
        }
        if (options) {
            embed.attr("sandbox", options.join(" "));
        }
    }
    EMBED_CONTAINER.append(embed);
    rebuildAllControlStates(cspSandboxed, iframeSandboxed);
}

function rebuildAllControlStates(cspSandboxed = true, iframeSandboxed = true) {
    rebuildSingleControlState("csp", cspSandboxed);
    rebuildSingleControlState("iframe", iframeSandboxed);
}

function rebuildSingleControlState(source, sandboxed = true) {
    OPTION_STATE[source].controls.toggleClass("bg-secondary", !sandboxed);
    OPTION_STATE[source].controls.find("th, td:not(.always-enabled) .btn").toggleClass("disabled", !sandboxed);
    toggleInteraction(OPTION_STATE[source].scripts, !sandboxed);
    rebuildSingleModalState(source, !sandboxed || !OPTION_STATE[source].scripts.is(":checked"));
    if (sandboxed) {
        OPTION_STATE[source].controls.tooltip("dispose");
    } else {
        OPTION_STATE[source].controls.find("td, th").tooltip("dispose");
        OPTION_STATE[source].controls.tooltip({
            title: `The ${source} sandbox is not currently enabled`,
            html: true,
            container: "#sandbox-controls",
        });
    }
}

function toggleInteraction(control, disabled = true) {
    control.prop("disabled", disabled);
    const label = control.closest("label");
    if (label.length > 0) {
        label.toggleClass("opt-disabled", disabled);
        label.toggleClass("disabled", disabled);
        const currentClasses = label.attr("class");
        if (disabled && currentClasses) {
            label.attr(
                "class",
                currentClasses
                    .replace(
                        /btn-([a-z]+)( |$)/,
                        "btn-outline-$1$2"
                    )
            );
        } else {
            label.attr(
                "class",
                currentClasses
                    .replace(
                        /btn-outline-([a-z]+)( |$)/,
                        "btn-$1$2"
                    )
            );
        }
    }
}

function rebuildSingleModalState(source, scriptsDisabled = true) {
    toggleInteraction(OPTION_STATE[source].modals, scriptsDisabled);
    OPTION_STATE[source].modals.closest("td")
        .tooltip(
            scriptsDisabled ? {
                title: "<code>allow-scripts</code> must be enabled",
                html: true,
                container: "#sandbox-controls",
            } :
                "dispose"
        );
}

function updateToggleState(target) {
    const active = target.is(":checked");
    const label = target.closest("label");
    label.toggleClass("active", active);
    label.toggleClass("btn-success", active);
    label.toggleClass("btn-danger", !active);
    label.find(".toggle-state-desc").text(active ? "On" : "Off");
}
