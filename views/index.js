const EMBED_CONTAINER = $("#embed-here");
const SANDBOX_CONTROLS = $("#sandbox-controls");
const CONTROL_HEADER = $("#sandbox-controls-header");
const CSP_CONTROLS = $("#csp-controls");
const IFRAME_CONTROLS = $("#iframe-controls");
const OPTION_STATE = {
    csp: {
        controls: $("#csp-controls"),
        sandbox: $("#csp-sandbox"),
    },
    iframe: {
        controls: $("#iframe-controls"),
        sandbox: $("#iframe-sandbox"),
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

    $("#v-pills-tab a").click(function(event) {
        event.preventDefault();
        $("#v-pills-tab .active").removeClass("active");
        $(this).addClass("active");
        generateControls();
        reloadEmbed();
    });

    rebuildAllControlStates();

    reloadEmbed();

    SANDBOX_CONTROLS.find("td > button.btn.btn-primary").click(function() {
        let owningRow = $(this).closest("tr");
        owningRow.find("input[id$='sandbox']")
            .prop("checked", true);
        owningRow.find("input[type='checkbox']").not("input[id$='sandbox']").each(function() {
            $(this).prop("checked", false);
        });
        owningRow.find("input[type='checkbox']").each(function() {
            updateToggleState($(this));
        });
        reloadEmbed();
    });
});

function enableControls() {
    SANDBOX_CONTROLS.find("input[type='checkbox']").change(function() {
        updateToggleState($(this));
        reloadEmbed();
    });
}

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
    let source = $("#v-pills-tab .active").data().view;
    let cspSandboxed = OPTION_STATE.csp.sandbox.is(":checked");
    if (cspSandboxed) {
        source += "?sandbox=on";
        CSP_CONTROLS.find(".generated input").each(function() {
            if ($(this).is(":checked")) {
                source += `+${$(this).data().controls}`;
            }
        });
    }
    embed.attr("src", source);
    let iframeSandboxed = OPTION_STATE.iframe.sandbox.is(":checked");
    if (iframeSandboxed) {
        let options = [];
        IFRAME_CONTROLS.find(".generated input").each(function() {
            if ($(this).is(":checked")) {
                options.push(`allow-${$(this).data().controls}`);
            }
        });
        if (options) {
            embed.attr("sandbox", options.join(" "));
        }
    }
    EMBED_CONTAINER.append(embed);
    rebuildAllControlStates(cspSandboxed, iframeSandboxed);
    SANDBOX_CONTROLS.find("input[type='checkbox']").change(function() {
        updateToggleState($(this));
        reloadEmbed();
    });
}

function rebuildAllControlStates(cspSandboxed = true, iframeSandboxed = true) {
    rebuildSingleControlState("csp", cspSandboxed);
    rebuildSingleControlState("iframe", iframeSandboxed);
}

function rebuildSingleControlState(source, sandboxed = true) {
    OPTION_STATE[source].controls.toggleClass("bg-secondary", !sandboxed);
    OPTION_STATE[source].controls.find("th, td:not(.always-enabled) .btn").toggleClass("disabled", !sandboxed);
    $(OPTION_STATE[source].controls).find("input[type='checkbox']").each(function() {
        updateToggleState($(this));
    });
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

function updateToggleState(target) {
    const active = target.is(":checked");
    const label = target.closest("label");
    label.toggleClass("active", active);
    label.toggleClass("btn-success", active);
    label.toggleClass("btn-danger", !active);
    label.find(".toggle-state-desc").text(active ? "On" : "Off");
}

function clearControls() {
    SANDBOX_CONTROLS.find(".generated").remove();
}

function generateControls() {
    clearControls();
    const addedProps = $("#v-pills-tab .active").data().props || [];
    for (const prop of addedProps) {
        enableHeader(prop);
        enableToggle(prop);
    }
}

function enableHeader(prop) {
    const controlHeader = $($("#control-header").html());
    controlHeader.find("code").text(`allow-${prop}`);
    controlHeader.insertBefore(CONTROL_HEADER.find(".reset"));
}

function enableToggle(prop) {
    const control = $($("#control-cell").html());
    const cspControl = control.clone();
    cspControl.find("input").data("controls", prop);
    cspControl.insertBefore(CSP_CONTROLS.find(".reset"));
    const iframeControl = control.clone();
    iframeControl.find("input").data("controls", prop);
    iframeControl.insertBefore(IFRAME_CONTROLS.find(".reset"));
}
