# Deployment Guide for cPanel

This guide explains how to deploy your NaviDropTaxi application to cPanel hosting.

## Prerequisites

Before deploying, ensure your cPanel hosting has:
- ✅ Node.js support (version 18+ recommended)
- ✅ SSH/Terminal access
- ✅ Sufficient storage space (at least 500MB)
- ✅ PostgreSQL database (if using database features)

## Step 1: Build Your Application Locally

On your local Windows machine, run:

```bash
npm install
npm run build
```

This will create a `dist` folder with:
- `dist/public/` - Your compiled React frontend
- `dist/index.js` - Your compiled Express backend

## Step 2: Prepare Files for Upload

### Files/Folders to Upload to cPanel:
```
├── dist/                 # (Built files from Step 1)
├── node_modules/         # (Upload or install on server)
├── package.json
├── package-lock.json
├── drizzle.config.ts     # (If using database)
└── shared/               # (Contains schema.ts)
```

### Files NOT to Upload:
- `client/` (source files - already compiled)
- `server/` (source files - already compiled)
- `.git/`
- `.vscode/`
- `node_modules/` (better to install on server)

## Step 3: Upload to cPanel

### Option A: Using File Manager
1. Log into cPanel
2. Open **File Manager**
3. Navigate to your application directory (e.g., `/home/username/public_html/navitaxi`)
4. Upload all files from Step 2
5. Extract if you uploaded as a ZIP

### Option B: Using FTP/SFTP
1. Use FileZilla or WinSCP
2. Connect to your cPanel server
3. Upload all files to your application directory

## Step 4: Setup Node.js Application in cPanel

1. **Open Node.js App Manager:**
   - In cPanel, search for **"Setup Node.js App"** or **"Node.js Selector"**

2. **Create New Application:**
   - Click **"Create Application"**
   - **Node.js version**: Select 18.x or higher
   - **Application mode**: Production
   - **Application root**: `/home/username/navitaxi` (your app directory)
   - **Application URL**: Your domain or subdomain
   - **Application startup file**: `dist/index.js`
   - **Environment variables**: Add these:
     ```
     NODE_ENV=production
     PORT=YOUR_ASSIGNED_PORT (cPanel will provide this)
     ```

3. **Click "Create"**

## Step 5: Install Dependencies on Server

After creating the Node.js app, cPanel will show you commands. Open **Terminal** in cPanel:

```bash
# Navigate to your app directory
cd /home/username/navitaxi

# Install production dependencies only
npm install --omit=dev

# Or if you want all dependencies (for safety)
npm install
```

## Step 6: Configure Environment Variables

In the Node.js App settings, add these environment variables:

```bash
NODE_ENV=production
PORT=<assigned_by_cpanel>

# If using database:
DATABASE_URL=postgresql://username:password@localhost:5432/dbname

# Add any other required variables
```

## Step 7: Start the Application

In cPanel Node.js App Manager:
1. Click **"Restart"** or **"Start"** button
2. Check the status - it should show "Running"

## Step 8: Configure Domain/Subdomain

### For Main Domain:
The app should be accessible at your main domain automatically.

### For Subdomain:
1. Go to **Subdomains** in cPanel
2. Create subdomain (e.g., `app.yourdomain.com`)
3. Point it to your application directory
4. In Node.js App settings, select this subdomain

## Step 9: Setup Reverse Proxy (If Needed)

If cPanel doesn't auto-configure the proxy, you may need to add this to `.htaccess`:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:YOUR_PORT/$1 [P,L]
```

## Updating Your Application

When you make changes:

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Upload only the `dist` folder** to cPanel (overwrite existing)

3. **Restart the app** in Node.js App Manager

## Troubleshooting

### App Won't Start:
```bash
# SSH into server and check logs
cd /home/username/navitaxi
npm start 2>&1 | tee app.log
```

### Check Application Logs:
In cPanel Node.js App Manager, click "Open logs"

### Port Issues:
- Always use the PORT environment variable provided by cPanel
- Don't hardcode port 5000 - it may be blocked

### Module Not Found Errors:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Database Connection:
- Ensure DATABASE_URL is correct in environment variables
- Check if PostgreSQL is accessible from your app

## Performance Tips

1. **Enable Production Mode:** Ensure `NODE_ENV=production`
2. **Use PM2 (if available):** Some cPanel setups support PM2 for better process management
3. **Enable Compression:** Already included in Express setup
4. **Monitor Resources:** Check cPanel resource usage regularly

## Alternative Deployment: Manual Start Script

If Node.js App Manager doesn't work, create a `start.sh` file:

```bash
#!/bin/bash
export NODE_ENV=production
export PORT=5000
cd /home/username/navitaxi
node dist/index.js
```

Make it executable:
```bash
chmod +x start.sh
```

Run it in a screen session:
```bash
screen -S navitaxi
./start.sh
# Press Ctrl+A then D to detach
```

## Security Checklist

- ✅ Set strong database passwords
- ✅ Keep `node_modules` outside public_html if possible
- ✅ Set proper file permissions (644 for files, 755 for directories)
- ✅ Enable SSL certificate (Let's Encrypt in cPanel)
- ✅ Don't commit sensitive data to git

## Support

If you encounter issues specific to your hosting provider, contact their support and mention:
- "I need to deploy a Node.js Express application"
- "The app is built with Vite and requires Node.js 18+"
- "Entry point is dist/index.js"

---

**Created for NaviDropTaxi by Naveen Kumar**

