/**
 * @module PlatformFeatures
 */

/**
 * @typedef Platform
 * @property {"ios" | "android" | "macos" | "browser" | "windows"} name
 */

/**
 * @typedef {import("../../../schema/__generated__/schema.types").EventOrigin['screen']} InitialScreen
 */

/**
 * @param {Platform} platform
 * @return {PlatformFeatures}
 */
export function createPlatformFeatures(platform) {
    /** @type {Platform["name"][]} */
    const desktop = ['windows', 'macos', 'browser'];

    const includeToggleOnBreakageForm = true;

    /** @type {InitialScreen} */
    let screen = 'primaryScreen';
    const url = new URL(window.location.href);

    // prettier-ignore
    const acceptedScreenParam = [
        'breakageForm',
        'breakageFormCategorySelection',
        'breakageFormFinalStep',
        'toggleReport'
    ];

    if (url.searchParams.has('screen')) {
        const param = url.searchParams.get('screen');
        if (typeof param === 'string' && acceptedScreenParam.includes(/** @type {string} */ (param))) {
            screen = /** @type {any} */ (param);
        }
    }

    /** @type {'dashboard' | 'menu'} */
    let opener = 'menu';
    if (url.searchParams.get('opener') === 'dashboard') {
        opener = 'dashboard';
    }

    // allow randomization to be disabled in a URL param
    let randomisedCategories = true;
    if (url.searchParams.get('randomisedCategories') === 'false') randomisedCategories = false;

    // which kind of select element should the breakage form use?
    /** @type {"default" | "material-web-dialog"} */
    let breakageFormCategorySelect = 'default';
    if (platform.name === 'android' && typeof CSSLayerBlockRule === 'function') {
        breakageFormCategorySelect = 'material-web-dialog';
    }
    if (url.searchParams.get('breakageFormCategorySelect') === 'material-web-dialog') {
        breakageFormCategorySelect = 'material-web-dialog';
    }
    if (url.searchParams.get('breakageFormCategorySelect') === 'default') {
        breakageFormCategorySelect = 'default';
    }

    return new PlatformFeatures({
        spinnerFollowingProtectionsToggle: platform.name !== 'android' && platform.name !== 'windows',
        supportsHover: desktop.includes(platform.name),
        initialScreen: screen,
        opener,
        supportsInvalidCertsImplicitly: platform.name !== 'browser' && platform.name !== 'windows',
        supportsPhishingWarning: platform.name !== 'browser',
        supportsMalwareWarning: platform.name !== 'browser',
        includeToggleOnBreakageForm,
        randomisedCategories,
        breakageFormCategorySelect,
    });
}

/**
 * Use an instance of this class to determine what features are supported on a
 * given platform
 */
export class PlatformFeatures {
    /**
     * @param {object} params
     * @param {boolean} params.spinnerFollowingProtectionsToggle
     * @param {boolean} params.supportsHover
     * @param {InitialScreen} params.initialScreen
     * @param {'dashboard' | 'menu'} params.opener
     * @param {boolean} params.supportsInvalidCertsImplicitly
     * @param {boolean} params.includeToggleOnBreakageForm
     * @param {boolean} params.supportsPhishingWarning
     * @param {boolean} params.supportsMalwareWarning
     * @param {boolean} params.randomisedCategories
     * @param {"default" | "material-web-dialog"} params.breakageFormCategorySelect
     */
    constructor(params) {
        /**
         * Should the toggle convert to a spinner when toggled
         * @type {boolean}
         */
        this.spinnerFollowingProtectionsToggle = params.spinnerFollowingProtectionsToggle;
        /**
         * Does the current platform support hover interactions?
         * @type {boolean}
         */
        this.supportsHover = params.supportsHover;
        /**
         * Does the current platform support hover interactions?
         * @type {boolean}
         */
        this.supportsInvalidCertsImplicitly = params.supportsInvalidCertsImplicitly;
        /**
         * Does the current platform support hover interactions?
         * @type {InitialScreen}
         */
        this.initialScreen = params.initialScreen;
        /**
         * Does the current platform support hover interactions?
         * @type {'dashboard' | 'menu'}
         */
        this.opener = params.opener;
        /**
         * Should the toggle functionality be included on the breakage form?
         * @type {boolean}
         */
        this.includeToggleOnBreakageForm = params.includeToggleOnBreakageForm;
        /**
         * Does the current platform support phishing warnings?
         * @type {boolean}
         */
        this.supportsPhishingWarning = params.supportsPhishingWarning;
        /**
         * Does the current platform support phishing warnings?
         * @type {boolean}
         */
        this.supportsMalwareWarning = params.supportsMalwareWarning;
        /**
         * Whether or to randomize the categories in the breakage form
         * @type {boolean}
         */
        this.randomisedCategories = params.randomisedCategories;
        /**
         * Whether we should use the material web dialog for the breakage form
         * @type {"default" | "material-web-dialog"}
         */
        this.breakageFormCategorySelect = params.breakageFormCategorySelect;
    }
}

/**
 * Feature Settings are settings that might be delivered remotely, like UI experiments
 */
export class FeatureSettings {
    /**
     * @param {object} params
     * @param {import("../../../schema/__generated__/schema.types").PrimaryScreen} [params.primaryScreen]
     * @param {import("../../../schema/__generated__/schema.types").WebBreakageForm} [params.webBreakageForm]
     */
    constructor(params) {
        /** @type {import("../../../schema/__generated__/schema.types").PrimaryScreen} */
        this.primaryScreen = params.primaryScreen || { layout: 'default' };
        /** @type {import("../../../schema/__generated__/schema.types").WebBreakageForm} */
        this.webBreakageForm = params.webBreakageForm || { state: 'enabled' };
    }

    /**
     * @param {import("../../../schema/__generated__/schema.types").RemoteFeatureSettings|undefined} settings
     * @param {Platform} platform
     */
    static create(settings, platform) {
        switch (platform.name) {
            case 'android': {
                return new FeatureSettings({
                    webBreakageForm: { state: 'disabled' },
                    ...settings,
                });
            }
            default: {
                return new FeatureSettings(settings || {});
            }
        }
    }
}
