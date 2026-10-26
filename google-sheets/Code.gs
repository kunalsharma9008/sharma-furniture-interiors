const SPREADSHEET_ID = '1Pb8bKw9A1ggMgAKGpoTMc4zxNwO-rNQXZgZ-xdRqlpE';
const HEADERS = ['Enquiry received at (Pune time)', 'Name', 'Phone number', 'Service', 'Project details'];

function doGet() {
  return jsonResponse_({ ok: true, message: 'The enquiry sheet connection is ready.' });
}

function doPost(e) {
  try {
    const expectedSecret = PropertiesService.getScriptProperties().getProperty('INQUIRY_WEB_APP_SECRET');
    const receivedSecret = e && e.parameter ? e.parameter.secret : '';
    if (!expectedSecret || receivedSecret !== expectedSecret) {
      return jsonResponse_({ ok: false, error: 'Not allowed.' });
    }

    const data = JSON.parse(e.postData.contents || '{}');
    const name = cleanText_(data.name, 120);
    const phone = cleanText_(data.phone, 40);
    const service = cleanText_(data.service, 120);
    const projectDetails = cleanText_(data.projectDetails, 2000);
    if (!name || !phone || !service) {
      return jsonResponse_({ ok: false, error: 'Name, phone number, and service are required.' });
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    spreadsheet.setSpreadsheetTimeZone('Asia/Kolkata');
    const sheet = spreadsheet.getSheets()[0];
    if (!sheet) throw new Error('The spreadsheet has no sheet tab.');

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    } else {
      const existingHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getDisplayValues()[0];
      if (HEADERS.some((header, index) => existingHeaders[index] !== header)) {
        return jsonResponse_({
          ok: false,
          error: 'The first row must contain the enquiry column headings.'
        });
      }
    }

    sheet.appendRow([
      new Date(),
      safeCell_(name),
      safeCell_(phone),
      safeCell_(service),
      safeCell_(projectDetails)
    ]);
    sheet.getRange(sheet.getLastRow(), 1).setNumberFormat('dd mmm yyyy, hh:mm AM/PM');
    return jsonResponse_({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, error: 'Could not save this enquiry.' });
  }
}

function cleanText_(value, limit) {
  return typeof value === 'string' ? value.trim().slice(0, limit) : '';
}

function safeCell_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function jsonResponse_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}