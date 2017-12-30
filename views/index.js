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

    reloadEmbed();

    SANDBOX_CONTROLS.find("td > button.btn.btn-primary").click(function() {
        let owningRow = $(this).closest("tr");
        owningRow.find(".sandbox-property.on input[type='checkbox']").each(function() {
            $(this).prop("checked", false);
            updateToggleState($(this));
        });
        owningRow.find("input[id$='sandbox']")
            .each(function() {
                $(this).prop("checked", true);
                updateToggleState($(this));
            });
        reloadEmbed();
    });

    SANDBOX_CONTROLS.find("input[type='checkbox']").change(function() {
        updateToggleState($(this));
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
    let cspSandboxed = OPTION_STATE.csp.sandbox.is(":checked");
    let iframeSandboxed = OPTION_STATE.iframe.sandbox.is(":checked");
    EMBED_CONTAINER.find("iframe").remove();
    let embed = $("<iframe />");
    let source = "/embedded/" + $("#v-pills-tab .active").data().view;
    if (cspSandboxed) {
        source += "/sandbox";
        CSP_CONTROLS.find(".sandbox-property.on input[type='checkbox']:checked").each(function() {
            source += `/${$(this).data().controls}`;
        });
    }
    source += `/x${Math.floor(Math.random() * 10000)}`;
    embed.attr("src", source);
    if (iframeSandboxed) {
        let options = [];
        IFRAME_CONTROLS.find(".sandbox-property.on input[type='checkbox']:checked").each(function() {
            options.push(`allow-${$(this).data().controls}`);
        });
        embed.attr("sandbox", options.join(" "));
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
    $(OPTION_STATE[source].controls).find(".sandbox-property.on input[type='checkbox']").each(function() {
        toggleInteraction($(this), !sandboxed);
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
    SANDBOX_CONTROLS
        .find(".sandbox-property")
        .addClass("off")
        .removeClass("on");
    SANDBOX_CONTROLS.find(".sandbox-property input[type='checkbox']").prop("checked", false);
}

function generateControls() {
    clearControls();
    const addedProps = $("#v-pills-tab .active").data().props || [];
    for (const prop of addedProps) {
        SANDBOX_CONTROLS
            .find(`.sandbox-allow-${prop}`)
            .removeClass("off")
            .addClass("on")
            .find("input[type='checkbox']")
            .each(function() {
                updateToggleState($(this));
            });
    }
}
