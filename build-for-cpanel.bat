@echo off
echo ==========================================
echo Building NaviDropTaxi for cPanel Deployment
echo ==========================================
echo.

echo Step 1: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b %errorlevel%
)
echo ✓ Dependencies installed
echo.

echo Step 2: Building application...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b %errorlevel%
)
echo ✓ Build completed successfully
echo.

echo Step 3: Verifying build output...
if not exist "dist\index.js" (
    echo ERROR: Backend build not found (dist\index.js)
    pause
    exit /b 1
)
echo ✓ Backend built: dist\index.js

if not exist "dist\public" (
    echo ERROR: Frontend build not found (dist\public)
    pause
    exit /b 1
)
echo ✓ Frontend built: dist\public\
echo.

echo ==========================================
echo BUILD SUCCESSFUL!
echo ==========================================
echo.
echo Next steps:
echo 1. Upload these to cPanel:
echo    - dist/ folder
echo    - package.json
echo    - package-lock.json
echo    - .htaccess
echo    - shared/ folder (if exists)
echo.
echo 2. DO NOT upload:
echo    - node_modules/
echo    - client/ and server/ folders
echo    - .git/ and .vscode/
echo.
echo 3. On cPanel server, run:
echo    npm install --omit=dev
echo.
echo See DEPLOYMENT.md for detailed instructions.
echo ==========================================
echo.
pause

