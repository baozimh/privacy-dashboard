// Generated by ts-to-zod
import { z } from "zod";

export const protectionsDisabledReasonSchema = z.literal("protectionDisabled");

export const ownedByFirstPartyReasonSchema = z.literal("ownedByFirstParty");

export const ruleExceptionReasonSchema = z.literal("ruleException");

export const adClickAttributionReasonSchema = z.literal("adClickAttribution");

export const otherThirdPartyRequestReasonSchema = z.literal("otherThirdPartyRequest");

export const screenKindSchema = z.union([z.literal("primaryScreen"), z.literal("breakageForm"), z.literal("promptBreakageForm"), z.literal("toggleReport"), z.literal("categoryTypeSelection"), z.literal("categorySelection"), z.literal("choiceToggle"), z.literal("choiceBreakageForm"), z.literal("connection"), z.literal("trackers"), z.literal("nonTrackers"), z.literal("consentManaged"), z.literal("cookieHidden")]);

export const wvVersionTitleSchema = z.literal("wvVersion");

export const requestsTitleSchema = z.literal("requests");

export const featuresTitleSchema = z.literal("features");

export const appVersionTitleSchema = z.literal("appVersion");

export const atbTitleSchema = z.literal("atb");

export const errorDescriptionsTitleSchema = z.literal("errorDescriptions");

export const extensionVersionTitleSchema = z.literal("extensionVersion");

export const httpErrorCodesTitleSchema = z.literal("httpErrorCodes");

export const lastSentDayTitleSchema = z.literal("lastSentDay");

export const deviceTitleSchema = z.literal("device");

export const osTitleSchema = z.literal("os");

export const listVersionsTitleSchema = z.literal("listVersions");

export const reportFlowTitleSchema = z.literal("reportFlow");

export const siteUrlTitleSchema = z.literal("siteUrl");

export const didOpenReportInfoTitleSchema = z.literal("didOpenReportInfo");

export const toggleReportCounterTitleSchema = z.literal("toggleReportCounter");

export const openerContextTitleSchema = z.literal("openerContext");

export const userRefreshCountTitleSchema = z.literal("userRefreshCount");

export const jsPerformanceTitleSchema = z.literal("jsPerformance");

export const stateBlockedSchema = z.object({
    blocked: z.object({})
});

export const stateAllowedSchema = z.object({
    allowed: z.object({
        reason: z.union([protectionsDisabledReasonSchema, ownedByFirstPartyReasonSchema, ruleExceptionReasonSchema, adClickAttributionReasonSchema, otherThirdPartyRequestReasonSchema])
    })
});

export const extensionMessageGetPrivacyDashboardDataSchema = z.object({
    messageType: z.literal("getPrivacyDashboardData"),
    options: z.object({
        tabId: z.number().optional().nullable()
    })
});

export const emailProtectionUserDataSchema = z.object({
    nextAlias: z.string()
});

export const protectionsStatusSchema = z.object({
    unprotectedTemporary: z.boolean(),
    enabledFeatures: z.array(z.string()),
    allowlisted: z.boolean(),
    denylisted: z.boolean()
});

export const localeSettingsSchema = z.object({
    locale: z.string()
});

export const phishingStatusSchema = z.object({
    phishingStatus: z.boolean()
});

export const parentEntitySchema = z.object({
    displayName: z.string(),
    prevalence: z.number()
});

export const fireButtonSchema = z.object({
    enabled: z.boolean()
});

export const searchSchema = z.object({
    term: z.string()
});

export const breakageReportRequestSchema = z.object({
    category: z.string().optional(),
    description: z.string().optional()
});

export const setListOptionsSchema = z.object({
    lists: z.array(z.object({
        list: z.union([z.literal("allowlisted"), z.literal("denylisted")]),
        domain: z.string(),
        value: z.boolean()
    }))
});

export const windowsIncomingVisibilitySchema = z.object({
    Feature: z.literal("PrivacyDashboard"),
    Name: z.literal("VisibilityChanged"),
    Data: z.object({
        isVisible: z.boolean()
    })
});

export const cookiePromptManagementStatusSchema = z.object({
    consentManaged: z.boolean(),
    cosmetic: z.boolean().optional(),
    optoutFailed: z.boolean().optional(),
    selftestFailed: z.boolean().optional(),
    configurable: z.boolean().optional()
});

export const refreshAliasResponseSchema = z.object({
    personalAddress: z.string(),
    privateAddress: z.string()
});

export const extensionMessageSetListOptionsSchema = z.object({
    messageType: z.literal("setLists"),
    options: setListOptionsSchema
});

export const fireOptionSchema = z.object({
    name: z.union([z.literal("CurrentSite"), z.literal("LastHour"), z.literal("Last24Hour"), z.literal("Last7days"), z.literal("Last4Weeks"), z.literal("AllTime")]),
    selected: z.boolean().optional(),
    options: z.object({
        since: z.number().optional(),
        origins: z.array(z.string()).optional()
    }),
    descriptionStats: z.object({
        clearHistory: z.boolean(),
        site: z.string().optional(),
        duration: z.union([z.literal("hour"), z.literal("day"), z.literal("week"), z.literal("month"), z.literal("all")]),
        openTabs: z.number(),
        cookies: z.number(),
        pinnedTabs: z.number()
    })
});

export const primaryScreenSchema = z.object({
    layout: z.union([z.literal("default"), z.literal("highlighted-protections-toggle")])
});

export const eventOriginSchema = z.object({
    screen: screenKindSchema
});

export const siteUrlAdditionalDataSchema = z.object({
    url: z.string()
});

export const closeMessageParamsSchema = z.object({
    eventOrigin: eventOriginSchema
});

export const categoryTypeSelectedSchema = z.object({
    name: z.literal("categoryTypeSelected"),
    value: z.union([z.literal("notWorking"), z.literal("dislike"), z.literal("general")])
});

export const categorySelectedSchema = z.object({
    name: z.literal("categorySelected"),
    value: z.union([z.literal("blocked"), z.literal("layout"), z.literal("empty-spaces"), z.literal("paywall"), z.literal("videos"), z.literal("comments"), z.literal("login"), z.literal("shopping"), z.literal("other")])
});

export const dataItemIdSchema = z.union([wvVersionTitleSchema, requestsTitleSchema, featuresTitleSchema, appVersionTitleSchema, atbTitleSchema, errorDescriptionsTitleSchema, extensionVersionTitleSchema, httpErrorCodesTitleSchema, lastSentDayTitleSchema, deviceTitleSchema, osTitleSchema, listVersionsTitleSchema, reportFlowTitleSchema, siteUrlTitleSchema, didOpenReportInfoTitleSchema, toggleReportCounterTitleSchema, openerContextTitleSchema, userRefreshCountTitleSchema, jsPerformanceTitleSchema]);

export const detectedRequestSchema = z.object({
    url: z.string(),
    eTLDplus1: z.string().optional(),
    pageUrl: z.string(),
    state: z.union([stateBlockedSchema, stateAllowedSchema]),
    entityName: z.string().optional(),
    category: z.string().optional(),
    prevalence: z.number().optional(),
    ownerName: z.string().optional()
});

export const tabSchema = z.object({
    id: z.number().optional(),
    url: z.string(),
    upgradedHttps: z.boolean(),
    protections: protectionsStatusSchema,
    localeSettings: localeSettingsSchema.optional(),
    phishingStatus: phishingStatusSchema.optional(),
    parentEntity: parentEntitySchema.optional(),
    specialDomainName: z.string().optional()
});

export const breakageReportSchema = z.object({
    request: breakageReportRequestSchema.optional(),
    response: z.object({}).optional()
});

export const fireButtonDataSchema = z.object({
    options: z.array(fireOptionSchema)
});

export const remoteFeatureSettingsSchema = z.object({
    primaryScreen: primaryScreenSchema.optional()
});

export const setProtectionParamsSchema = z.object({
    isProtected: z.boolean(),
    eventOrigin: eventOriginSchema
});

export const toggleReportScreenDataItemSchema = z.object({
    id: dataItemIdSchema,
    additional: siteUrlAdditionalDataSchema.optional()
});

export const telemetrySpanSchema = z.object({
    attributes: z.union([categoryTypeSelectedSchema, categorySelectedSchema]),
    eventOrigin: eventOriginSchema
});

export const requestDataSchema = z.object({
    requests: z.array(detectedRequestSchema),
    installedSurrogates: z.array(z.string()).optional()
});

export const getPrivacyDashboardDataSchema = z.object({
    requestData: requestDataSchema,
    emailProtectionUserData: emailProtectionUserDataSchema.optional(),
    tab: tabSchema,
    fireButton: fireButtonSchema.optional()
});

export const windowsViewModelSchema = z.object({
    protections: protectionsStatusSchema,
    rawRequestData: requestDataSchema,
    tabUrl: z.string(),
    upgradedHttps: z.boolean(),
    parentEntity: parentEntitySchema.optional(),
    permissions: z.array(z.unknown()).optional(),
    certificates: z.array(z.unknown()).optional(),
    cookiePromptManagementStatus: cookiePromptManagementStatusSchema.optional()
});

export const toggleReportScreenSchema = z.object({
    data: z.array(toggleReportScreenDataItemSchema)
});

export const windowsIncomingViewModelSchema = z.object({
    Feature: z.literal("PrivacyDashboard"),
    Name: z.literal("ViewModelUpdated"),
    Data: windowsViewModelSchema
});

export const windowsIncomingMessageSchema = z.union([windowsIncomingVisibilitySchema, windowsIncomingViewModelSchema]);

export const apiSchema = z.object({
    "request-data": requestDataSchema,
    "extension-message-get-privacy-dashboard-data": extensionMessageGetPrivacyDashboardDataSchema,
    "get-privacy-dashboard-data": getPrivacyDashboardDataSchema.optional(),
    "search-message": searchSchema.optional(),
    "breakage-report": breakageReportSchema,
    "set-list": setListOptionsSchema.optional(),
    "windows-incoming-message": windowsIncomingMessageSchema.optional(),
    "locale-settings": localeSettingsSchema.optional(),
    "refresh-alias-response": refreshAliasResponseSchema.optional(),
    exe: extensionMessageSetListOptionsSchema.optional(),
    "fire-button": fireButtonDataSchema.optional(),
    "feature-settings": remoteFeatureSettingsSchema.optional(),
    "set-protection": setProtectionParamsSchema.optional(),
    "toggle-report-screen": toggleReportScreenSchema.optional(),
    "close-message": closeMessageParamsSchema.optional(),
    "telemetry-span": telemetrySpanSchema.optional()
});

