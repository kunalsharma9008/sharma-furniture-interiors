# Photo and video admin

## Open and use the admin page

Run the site locally, then visit `http://localhost:3000/admin` and sign in with the admin password. The project has a private `.env.local` file with the admin password and session-signing secret. Keep it private; `.gitignore` excludes it. To change the password, edit `ADMIN_PASSWORD` in `.env.local` and restart the Next.js server.

Choose **Service gallery** to upload into one of the site's service categories, or **Portfolio** to add work to Living Rooms, Kitchens, Bedrooms & Wardrobes, Bespoke Furniture, or Workspaces & Commercial. Select multiple photos and videos at once. Supported photos are JPG, PNG, and WebP up to 10 MB each. Supported videos are MP4 and WebM up to 100 MB each. Uploads are processed one at a time.

The website media library shows newly uploaded files as well as the existing local inspiration photos and Portfolio cover photos. Use the filter to find an image. **Delete** permanently removes a new upload. **Remove from website** hides an existing inspiration image from the galleries; the original file stays in the project folder, and it disappears from the normal admin views. To restore one, choose **Removed from website · Restore** in the media filter.

Files are saved under `public/images/uploads/services/<service-id>/` or `public/images/uploads/portfolio/<category>/`; upload details are recorded in `data/userUploads.json`. Removed inspiration image paths are recorded in `data/hiddenInspiration.json`.

## Hosting note

This filesystem storage is persistent for local development and for a server with a persistent disk. Serverless hosts can discard files written at runtime, so configure persistent object storage before using this admin upload feature on a deployed serverless website. The current project has no storage account or credentials configured.