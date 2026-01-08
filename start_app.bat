@echo off
echo Starting Velvet AI Fashion Stylist...
echo.

:: Check if PHP is in PATH
php -v >nul 2>&1
if %errorlevel% equ 0 goto :FOUND_PHP

echo PHP not found in PATH. Checking C:\xampp\php...
if exist "C:\xampp\php\php.exe" (
    set "PATH=C:\xampp\php;%PATH%"
    echo Found PHP in C:\xampp\php. Added to PATH for this session.
    goto :FOUND_PHP
)

echo PHP is not installed or not in your PATH.
echo Please install PHP (or XAMPP) and try again.
pause
exit /b

:FOUND_PHP
echo PHP is ready.
php -v
echo.

echo Starting Local Server at http://localhost:8000
echo Do not close this window while using the application.
echo.

start http://localhost:8000
php -S localhost:8000
pause
