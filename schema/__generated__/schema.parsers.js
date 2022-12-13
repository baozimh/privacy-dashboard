// Generated by ts-to-zod
import { z } from "zod";

export const protectionsDisabledReasonSchema = z.literal("protectionDisabled");

export const ownedByFirstPartyReasonSchema = z.literal("ownedByFirstParty");

export const ruleExceptionReasonSchema = z.literal("ruleException");

export const adClickAttributionReasonSchema = z.literal("adClickAttribution");

export const otherThirdPartyRequestReasonSchema = z.literal("otherThirdPartyRequest");

export const stateBlockedSchema = z.object({
    blocked: z.record(z.unknown())
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

export const parentEntitySchema = z.object({
    displayName: z.string(),
    prevalence: z.number()
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
    optoutFailed: z.boolean().optional(),
    selftestFailed: z.boolean().optional()
});

export const refreshAliasResponseSchema = z.object({
    personalAddress: z.string(),
    privateAddress: z.string()
});

export const extensionMessageSetListOptionsSchema = z.object({
    messageType: z.literal("setLists"),
    options: setListOptionsSchema
});

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
    parentEntity: parentEntitySchema.optional(),
    specialDomainName: z.string().optional()
});

export const breakageReportSchema = z.object({
    request: breakageReportRequestSchema.optional(),
    response: z.record(z.unknown()).optional()
});

export const requestDataSchema = z.object({
    requests: z.array(detectedRequestSchema),
    installedSurrogates: z.array(z.string()).optional()
});

export const getPrivacyDashboardDataSchema = z.object({
    requestData: requestDataSchema,
    emailProtectionUserData: emailProtectionUserDataSchema.optional(),
    tab: tabSchema
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
    exe: extensionMessageSetListOptionsSchema.optional()
});

