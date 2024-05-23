// @ts-ignore
import $ from 'jquery'
import EmailProtectionModel from '../models/email-protection.js'
import emailProtectionTemplate from '../templates/email-protection.js'
import SearchModel from '../models/search.js'
import searchTemplate from '../templates/search.js'
import Parent from '../base/view.js'
import { CtaRotationModel } from '../models/cta-rotation.js'
import ctaRotationView from '../templates/cta-rotation.js'
import browserUIWrapper, { platform } from '../../browser/communication.js'
import { sectionsFromSiteTrackers, trackerNetworksTemplate } from '../templates/page-trackers.js'
import { nonTrackersTemplate, sectionsFromSiteNonTracker } from '../templates/page-non-trackers.js'
import { heroFromTabNonTrackers, heroFromTabTrackers } from '../templates/shared/hero.js'
import { KeyInsightView } from '../templates/key-insights'
import { BreakageFormModel } from '../models/breakage-form.js'
import { createPlatformFeatures } from '../platform-features.mjs'
import { CookiePromptModel } from '../models/cookie-prompt.js'
import { BreakageFormView, ToggleReportView } from './breakage-form'
import pageConnectionTemplate from './../templates/page-connection.js'
import breakageFormTemplate from './../templates/breakage-form.js'
import EmailProtectionView from './email-protection.js'
import SearchView from './search.js'
import CtaRotationView from './cta-rotation.js'
import TrackerNetworksView from './../views/tracker-networks.js'
import { MainNavView } from './main-nav'
import { CookiePromptView } from './cookie-prompt'
import { FireDialog } from './fire-dialog.js'
import { toggleReportTemplate } from '../components/toggle-report'

/**
 * @constructor
 */
function Site(ops) {
    this.model = ops.model
    this.pageView = ops.pageView
    this.template = ops.template
    this.features = createPlatformFeatures(platform)

    // cache 'body' selector
    this.$body = $('body')

    // get data from background process, then re-render template with it
    this.model
        .getBackgroundTabData()
        .then(() => {
            // render template for the first time here
            Parent.call(this, ops)
            // @ts-ignore
            this._setup()
        })
        .catch((e) => {
            console.log('❌ [views/site.es6.js] --> ', e)
        })
}

Site.prototype = $.extend({}, Parent.prototype, {
    _changePermission: function (e) {
        this.model.updatePermission(e.target.name, e.target.value)
    },

    // NOTE: after ._setup() is called this view listens for changes to
    // site model and re-renders every time model properties change
    _setup: function () {
        this._cacheElems('.js-site', ['report-broken', 'permission', 'done'])

        this.bindEvents([
            [this.$reportbroken, 'click', this._onReportBrokenSiteClick],
            [this.$done, 'click', this._done],
            [this.$permission, 'change', this._changePermission],
            [this.store.subscribe, 'action:site', this._handleEvents],
        ])

        window.addEventListener('open-feedback', (e) => {
            this._onReportBrokenSiteClick(e)
        })

        this._setupPrimaryScreen()
        const url = new URL(window.location.href)

        if (this.features.initialScreen === 'breakageForm') {
            this.showBreakageForm({ immediate: true })
        }

        if (this.features.initialScreen === 'promptBreakageForm') {
            this.showBreakageForm({ immediate: true, includeToggle: false })
        }

        if (this.features.initialScreen === 'toggleReport') {
            const opener = url.searchParams.get('opener') || 'menu'
            this.showToggleReport({ immediate: true, opener })
        }

        setTimeout(() => {
            browserUIWrapper.firstRenderComplete?.()
        }, 100)
    },
    _handleEvents(event) {
        if (event.action === 'navigate') {
            if (event.data?.target === 'connection') {
                this._showPageConnection()
            }
            if (event.data?.target === 'trackers') {
                this._showPageTrackers()
            }
            if (event.data?.target === 'nonTrackers') {
                this._showPageNonTrackers()
            }
            if (event.data?.target === 'consentManaged') {
                this._showPageConsent(false)
            }
            if (event.data?.target === 'cookieHidden') {
                this._showPageConsent(true)
            }
            // todo(v2): fire button support
            if (event.data?.target === 'fireButton') {
                this._showFireModal()
            }
        }
    },

    _onReportBrokenSiteClick: function (e) {
        e.preventDefault()

        if (this.model && this.model.disabled) {
            return
        }

        this.model
            .checkBrokenSiteReportHandled()
            .then((handled) => {
                if (!handled) {
                    this.showBreakageForm({ eventTarget: e.target, immediate: false })
                }
            })
            .catch((e) => {
                console.error('could not check', e)
            })
    },

    /**
     * @param {object} opts
     * @param {boolean} opts.immediate
     * @param {boolean} [opts.includeToggle=true] - default is true
     * @param {HTMLElement} [opts.eventTarget]
     */
    showBreakageForm: function ({ immediate, includeToggle = true, eventTarget }) {
        if (eventTarget) {
            blur(eventTarget)
        }
        this.views.slidingSubview = new BreakageFormView({
            template: breakageFormTemplate,
            model: new BreakageFormModel({ site: this.model, opener: 'dashboard' }),
            mainModel: this.model,
            immediate,
            includeToggle,
        })
    },

    /**
     * @param {object} opts
     * @param {boolean} opts.immediate
     * @param {HTMLElement} [opts.eventTarget]
     * @param {string} opts.opener
     */
    showToggleReport: function ({ immediate, eventTarget, opener }) {
        if (eventTarget) {
            blur(eventTarget)
        }
        document.body.dataset.screen = 'toggleReport'
        this.views.slidingSubview = new ToggleReportView({
            template: toggleReportTemplate,
            model: new BreakageFormModel({ site: this.model, opener }),
            mainModel: this.model,
            immediate,
        })
    },

    _showPageTrackers: function () {
        if (this.$body.hasClass('is-disabled')) return
        this.views.slidingSubview = new TrackerNetworksView({
            template: trackerNetworksTemplate,
            heroFn: heroFromTabTrackers,
            detailsFn: sectionsFromSiteTrackers,
        })
    },

    _showPageNonTrackers: function () {
        if (this.$body.hasClass('is-disabled')) return
        this.views.slidingSubview = new TrackerNetworksView({
            template: nonTrackersTemplate,
            heroFn: heroFromTabNonTrackers,
            detailsFn: sectionsFromSiteNonTracker,
        })
    },

    _showPageConnection: function () {
        if (this.$body.hasClass('is-disabled')) return
        this.views.slidingSubview = new TrackerNetworksView({
            template: pageConnectionTemplate,
        })
    },

    /**
     * @param {boolean} isCosmetic
     */
    _showPageConsent: function (isCosmetic) {
        this.views.slidingSubview = new CookiePromptView({
            model: new CookiePromptModel({
                site: this.model,
                isCosmetic,
            }),
        })
    },

    _showFireModal() {
        this.dialog = new FireDialog({
            model: this.model,
            appendTo: $('#site-info-container'),
        })
    },

    _done: function () {
        this.model.close()
    },
    _setupPrimaryScreen() {
        this.views.mainNav = new MainNavView({
            model: this.model,
            appendTo: $('#main-nav'),
            store: this.store,
        })
        this.views.keyInsight = new KeyInsightView({
            model: this.model,
            appendTo: $('#key-insight'),
            store: this.store,
        })
        if (this.model.tab?.search) {
            this.views.search = new SearchView({
                pageView: this,
                model: new SearchModel({ searchText: '', showFireButton: this.model.fireButton?.enabled }),
                appendTo: $('#search-form-container'),
                template: searchTemplate,
            })
        }

        // does the device support CTA screens?
        if (this.model.tab?.ctaScreens && !this.views.ctaRotations) {
            this.views.ctaRotations = new CtaRotationView({
                pageView: this,
                model: new CtaRotationModel({ emailProtectionUserData: this.model.emailProtectionUserData }),
                appendTo: $('#cta-rotation'),
                template: ctaRotationView,
            })
        }

        // does the device support Email Protection?
        if (this.model.tab?.emailProtection) {
            this.views.emailProtection = new EmailProtectionView({
                model: new EmailProtectionModel({ emailProtectionUserData: this.model.emailProtectionUserData }),
                appendTo: $('#email-alias-container'),
                template: emailProtectionTemplate,
            })
        }
    },
})

/**
 * @param {HTMLElement | null} target
 */
function blur(target) {
    const closest = target?.closest?.('a')
    if (closest && typeof closest.blur === 'function') {
        closest.blur()
    }
}

export default Site
