/**
 * @module Simple Breakage Report
 *
 * @category guides
 *
 * @description
 *
 * ## Step 1: Open the dashboard with params
 *
 *  - `screen=simpleBreakageReport`
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
 *   [[include:simple-report-screen.json]]```
 * </details>
 *
 *   - WebKit: {@link "macOS integration".privacyDashboardGetSimpleReportOptions}
 *   - Other platforms will be added
 *
 * ## Step 4: Implement the 'Send' and 'Don't send' handlers
 *
 * Both of these take no params and they return no data.
 *
 * - {@link common.sendSimpleBreakageReport}
 * - {@link common.rejectSimpleBreakageReport}
 *   - WebKit: {@link "macOS integration".privacyDashboardSendSimpleBreakageReport}
 *   - WebKit: {@link "macOS integration".privacyDashboardRejectSimpleBreakageReport}
 *
 * ## opener=menu
 *  <iframe width=360 height=600 src="/app-debug/html/ios.html?screen=simpleBreakageReport&opener=menu"></iframe>
 *  <iframe width=360 height=600 src="/app-debug/html/macos.html?screen=simpleBreakageReport&opener=menu"></iframe>*
 *
 * ## opener=dashboard
 *  <iframe width=360 height=600 src="/app-debug/html/ios.html?screen=simpleBreakageReport&opener=dashboard"></iframe>
 *  <iframe width=360 height=600 src="/app-debug/html/macos.html?screen=simpleBreakageReport&opener=dashboard"></iframe>
 *
 * ## screen=breakageForm
 *  <iframe width=360 height=600 src="/app-debug/html/ios.html?screen=breakageForm"></iframe>
 */

export {}
