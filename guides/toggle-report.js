/**
 * @module Toggle Report
 *
 * @category guides
 *
 * @description
 *
 * ## Step 1: Open the dashboard with params
 *
 *  - `screen=toggleReport`
 *  - `opener=menu`
 *    - or `opener=dashboard`
 *
 * ## Step 2: Ensure base data is present
 *
 * When opening the dashboard, there are requirements like `locale` and others that should be met.
 * Note: you may to stub some data with empty arrays - please see the previous breakage form work as reference.
 *
 * ## Step 3: Implement the **new** data handler
 *
 * This is called immediately to retrieve the data needed to render the list.
 *
 * <details>
 *   <summary>Sample JSON response 📝</summary>
 *
 *   ```json
 *   [[include:toggle-report-screen.json]]```
 * </details>
 *
 *   - WebKit: {@link "macOS integration".privacyDashboardGetToggleReportOptions}
 *   - Other platforms will be added
 *
 * ## Step 4: Implement new handlers
 *
 * The following are all sent in response to user interactions
 *
 * ### 👆Sending/rejecting the report
 *   - WebKit: {@link "macOS integration".privacyDashboardSendToggleReport}
 *   - WebKit: {@link "macOS integration".privacyDashboardRejectToggleReport}
 *
 * ### 👆Tapping the 'see what's sent' list
 *   - Webkit: {@link "macOS integration".privacyDashboardSeeWhatIsSent}
 *
 * ### 👆Tapping anywhere on the success screen (macos only)
 *   - Webkit: {@link "macOS integration".privacyDashboardClose}
 *
 * ## opener=menu
 *  <iframe width=360 height=600 src="/app-debug/html/ios.html?screen=toggleReport&opener=menu"></iframe>
 *  <iframe width=360 height=600 src="/app-debug/html/macos.html?screen=toggleReport&opener=menu"></iframe>*
 *
 * ## opener=dashboard
 *  <iframe width=360 height=600 src="/app-debug/html/ios.html?screen=toggleReport&opener=dashboard"></iframe>
 *  <iframe width=360 height=600 src="/app-debug/html/macos.html?screen=toggleReport&opener=dashboard"></iframe>
 *
 * ## screen=breakageForm
 *  <iframe width=360 height=600 src="/app-debug/html/ios.html?screen=breakageForm"></iframe>
 */

export {}
