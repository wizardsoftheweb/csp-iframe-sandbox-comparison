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
const SCROLL_SPY_SHIFT_REDUCTION = 10;

let MAIN_NAV_HEIGHT_CONTRIBUTION;
let SCROLL_SPY_SHIFT;

$(document).ready(function() {
    MAIN_NAV_HEIGHT_CONTRIBUTION = Math.min(
        parseInt(MAIN_NAV.css("max-height")),
        MAIN_NAV.height()
    );

    SCROLL_SPY_SHIFT = Math.max(
        MAIN_NAV_HEIGHT_CONTRIBUTION,
        $("body").data().offset - SCROLL_SPY_SHIFT_REDUCTION
    );

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
        console.log(triggeredHash);

        history.replaceState({},
            "",
            currentHref.replace(storedHash, "") + triggeredHash
        );
    });

    $("a[href^='#']").not("a[href='#']").click(function(event) {
        const target = $($.attr(this, "href"));
        if (target) {
            event.preventDefault();
            scrollToElement(target);
        }
    });

    rebuildAllControlStates();

    reloadEmbed();

    SANDBOX_CONTROLS.find("input[type='checkbox']").change(function() {
        reloadEmbed();
    });

    SANDBOX_CONTROLS.find("td > button.btn.btn-primary").click(function() {
        let owningRow = $(this).closest("tr");
        owningRow.find("input[id$='sandbox']").bootstrapToggle("on");
        owningRow.find("input[id*='-allow-']").each(function() {
            $(this)
                .bootstrapToggle("enable")
                .bootstrapToggle("off");
        });
        reloadEmbed();
    });
});

function scrollToElement(target, scrollTime = 300) {
    $("html, body").animate({
        scrollTop: target.offset().top - SCROLL_SPY_SHIFT
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
    OPTION_STATE[source].controls.toggleClass("danger", !sandboxed);
    OPTION_STATE[source].controls.find("th, td:not(.always-enabled) .btn").toggleClass("disabled", !sandboxed);
    toggleToggleInteraction(OPTION_STATE[source].scripts, !sandboxed);
    rebuildSingleModalState(source, !sandboxed || !OPTION_STATE[source].scripts.is(":checked"));
    // if (sandboxed) {
    //     OPTION_STATE[source].controls.tooltip("destroy");
    // } else {
    //     OPTION_STATE[source].controls.find("td, th").tooltip("destroy");
    //     OPTION_STATE[source].controls.tooltip({
    //         title: `The ${source} sandbox is not currently enabled`
    //     });
    // }
}

function toggleToggleInteraction(toggleElement, disabled = true) {
    toggleElement.bootstrapToggle(disabled ? "disable" : "enable");
    toggleElement.parent().find(".btn").toggleClass("disabled", disabled);
}

function rebuildSingleModalState(source, scriptsDisabled = true) {
    toggleToggleInteraction(OPTION_STATE[source].modals, scriptsDisabled);
    // OPTION_STATE[source].modals.closest("td")
    //     .toggleClass("opt-disabled", scriptsDisabled)
    //     .tooltip(
    //         scriptsDisabled ? {
    //             title: "<code>allow-scripts</code> must be enabled",
    //             html: true,
    //             container: "#sandbox-controls",
    //         } :
    //             "destroy"
    //     );
}
