# How to Connect Your Questionnaire to Google Sheets

To save the questionnaire answers to a Google Sheet, you need to set up a Google Apps Script. Follow these steps:

## Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it something like "WhyMe Questionnaire Responses".
3. In the first row (Header Row), add the following column names to match your questionnaire data:
   - `timestamp`
   - `language`
   - `age_group`
   - `identity`
   - `silent_struggle`
   - `life_heavy`
   - `comfortable_talking`
   - `coping_mechanisms`
   - `personal_help`
   - `group_activity`
   - `barriers`
   - `design_support`

## Step 2: Create the Apps Script
1. In your Google Sheet, go to **Extensions** > **Apps Script**.
2. Delete any code in the `Code.gs` file and paste the following code:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  try {
    // Parse the incoming JSON data
    var data = JSON.parse(e.postData.contents);
    
    // Prepare the row data
    var rowData = [
      new Date(), // timestamp
      data.language || '',
      data.age_group || '',
      data.identity || '',
      data.silent_struggle || '',
      data.life_heavy || '',
      data.comfortable_talking || '',
      // Handle arrays (like multiple choice) by joining them
      Array.isArray(data.coping_mechanisms) ? data.coping_mechanisms.join(', ') : (data.coping_mechanisms || ''),
      data.personal_help || '',
      data.group_activity || '',
      Array.isArray(data.barriers) ? data.barriers.join(', ') : (data.barriers || ''),
      data.design_support || ''
    ];
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click the **Save** icon (floppy disk).

## Step 3: Deploy as Web App
1. Click the **Deploy** button (blue button top right) > **New deployment**.
2. Click the **Select type** gear icon > **Web app**.
3. Fill in the details:
   - **Description**: Questionnaire Collector
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone** (This is crucial so the website can send data without login)
4. Click **Deploy**.
5. You might be asked to authorize the script. Click **Review permissions**, choose your account, click **Advanced** > **Go to (Script Name) (unsafe)** > **Allow**.
6. Copy the **Web App URL** (it ends with `/exec`).

## Troubleshooting

### "Response was blocked by CORB" Error
If you see a **CORB** error in the console, it usually means one of two things:

1.  **Permissions are wrong (Most Common):**
    - You likely set "Who has access" to **"Only myself"** or **"Anyone with Google Account"**.
    - **Fix:** Go back to your Apps Script. Click **Deploy** > **Manage deployments**. Click the **Edit** (pencil) icon next to your deployment. Change "Who has access" to **"Anyone"**. Click **Deploy**.

2.  **Script is returning JSON:**
    - Sometimes the browser blocks the response if it's JSON.
    - **Fix:** Update your `Code.gs` to return simple text instead.
    - Change this line:
      ```javascript
      return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' })).setMimeType(ContentService.MimeType.JSON);
      ```
    - To this:
      ```javascript
      return ContentService.createTextOutput("Success");
      ```
    - **Important:** You MUST click **Deploy** > **New deployment** after changing the code for it to take effect. Select "Web app", set "Who has access" to "Anyone", and Deploy. Update the URL in `script.js` if it changed (it usually changes if you create a *new* deployment, but if you edit the existing one correctly it might not. Safest is to treat it as a new URL).

### Data not appearing in Sheet
- Check if you copied the URL correctly.
- Ensure you are looking at the correct sheet.
- Check the "Executions" tab in the Apps Script editor to see if the script ran and if there were errors.

## Step 4: Update Your Code
1. Open `script.js` in your project.
2. Find the line:
   ```javascript
   const GOOGLE_SCRIPT_URL = '...';
   ```
3. Replace the URL inside the quotes with your new **Web App URL**.

## Step 5: Test
1. Open your website.
2. Fill out the questionnaire and submit.
3. Check your Google Sheet to see the new row appear!
