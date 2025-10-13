# Quick Deployment Checklist

## Before Deployment

- [ ] All features tested locally
- [ ] Environment variables documented
- [ ] Database connection string ready
- [ ] Domain/subdomain decided

## Build Process

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Build the application
npm run build

# 3. Verify build output
# Check that these exist:
#   - dist/index.js (backend)
#   - dist/public/ (frontend files)
```

## Files to Upload to cPanel

### Required:
- [ ] `dist/` folder (entire folder)
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `shared/` folder (if exists)
- [ ] `.htaccess` (for routing)

### Optional:
- [ ] `drizzle.config.ts` (if using database)
- [ ] Any environment-specific config files

### DO NOT Upload:
- [ ] ❌ `node_modules/` (install on server instead)
- [ ] ❌ `client/` (source files)
- [ ] ❌ `server/` (source files)
- [ ] ❌ `.git/`
- [ ] ❌ `.vscode/`
- [ ] ❌ `.env` files

## On cPanel

- [ ] Node.js App created in "Setup Node.js App"
- [ ] Node.js version: 18.x or higher selected
- [ ] Application mode: Production
- [ ] Application startup file: `dist/index.js`
- [ ] Environment variables added:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=<assigned_port>`
  - [ ] `DATABASE_URL=<your_db_url>` (if applicable)

## Install Dependencies on Server

```bash
cd /home/username/your-app-directory
npm install --omit=dev
```

- [ ] Dependencies installed successfully
- [ ] No error messages in terminal

## Start Application

- [ ] Click "Start" or "Restart" in Node.js App Manager
- [ ] Status shows "Running"
- [ ] Check application logs for errors

## Testing

- [ ] Visit your domain/subdomain
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Forms submit properly
- [ ] API endpoints respond
- [ ] Check browser console for errors

## Post-Deployment

- [ ] SSL certificate installed (Let's Encrypt)
- [ ] HTTPS redirect working
- [ ] Monitor resource usage
- [ ] Set up regular backups

## Common Issues & Quick Fixes

### App won't start:
```bash
# Check logs
cd /home/username/your-app-directory
cat logs/error.log
```

### "Module not found" errors:
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Port conflicts:
- Use the PORT variable from cPanel, don't hardcode

### Database connection fails:
- Verify DATABASE_URL in environment variables
- Check database server is accessible

---

**Last Updated:** Ready for deployment!

