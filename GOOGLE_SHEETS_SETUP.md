# Google Sheets enquiry setup

The form sends only the details it asks for: name, phone number, selected service, and project details. The script adds the date and time automatically in Pune time.

1. Open the Google Sheet you shared.
2. Select Extensions, then Apps Script.
3. Replace the starter code with the contents of google-sheets/Code.gs and save.
4. In Project Settings, add a Script Property named INQUIRY_WEB_APP_SECRET. Use the secret provided in this conversation.
5. Select Deploy, New deployment, choose Web app, set Execute as to Me, and choose Anyone for access.
6. Deploy and approve Google permissions. Copy the web app URL ending in /exec and provide it so it can be added to website .env.local.
7. Restart the website.

The spreadsheet itself stays private. The secret is required to write rows.