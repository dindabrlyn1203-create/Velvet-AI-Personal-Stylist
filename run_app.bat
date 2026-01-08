@echo off
title Academic AI Assistant Launcher
color 0b

echo ===================================================
echo   Academic AI Assistant (PHP + Localhost Version)
echo ===================================================
echo.

:: Check for PHP
php --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0c
    echo [ERROR] PHP is not installed or not in your PATH.
    echo.
    echo Please install PHP (or XAMPP) and add it to your Environment Variables.
    echo Detailed instructions are in README.md
    echo.
    pause
    exit /b
)

echo [OK] PHP found.
echo.
echo Starting Local Server at http://localhost:8000...
echo Close this window to stop the application.
echo.

:: Open Browser
start http://localhost:8000

:: Start PHP Server (Blocking)
php -S localhost:8000 -t public backend/server.php
