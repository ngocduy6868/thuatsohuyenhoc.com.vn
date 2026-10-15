@echo off
chcp 65001 >nul
title THUẬT SỐ HUYỀN HỌC - KHỞI ĐỘNG HỆ THỐNG
color 0F

:MENU
cls
echo =========================================================================
echo                  THUẬT SỐ HUYỀN HỌC - KHỞI ĐỘNG WEBSITE
echo =========================================================================
echo.
echo    [1] Mở Trang Chủ PC (Toàn màn hình máy tính)
echo    [2] Mở Giao Diện Mobile (Cửa sổ chuẩn kích thước điện thoại)
echo    [3] Mở Trang Viết Bài (Soạn thảo và quản lý bài viết)
echo    [0] Thoát
echo.
echo =========================================================================
set /p opt="Vui lòng nhập lựa chọn của bạn (1, 2, 3 hoặc 0) rồi nhấn Enter: "

if "%opt%"=="1" goto OPEN_PC
if "%opt%"=="2" goto OPEN_MOBILE
if "%opt%"=="3" goto OPEN_VIETBAI
if "%opt%"=="0" goto EXIT_PROG

echo.
echo Lựa chọn không hợp lệ, vui lòng thử lại!
timeout /t 2 >nul
goto MENU

:OPEN_PC
echo.
echo Đang mở Trang Chủ PC...
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --new-window "%~dp0index.html"
) else if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --new-window "%~dp0index.html"
) else if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --new-window "%~dp0index.html"
) else (
    start "" "%~dp0index.html"
)
exit

:OPEN_MOBILE
echo.
echo Đang mở Giao Diện Mobile (Kích thước 412x860)...
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --new-window --window-size=412,860 "%~dp0index.html"
) else if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --new-window --window-size=412,860 "%~dp0index.html"
) else if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --new-window --window-size=412,860 "%~dp0index.html"
) else (
    start "" "%~dp0index.html"
)
exit

:OPEN_VIETBAI
echo.
echo Đang mở Trang Viết Bài...
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --new-window "%~dp0viet-bai.html"
) else if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --new-window "%~dp0viet-bai.html"
) else if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --new-window "%~dp0viet-bai.html"
) else (
    start "" "%~dp0viet-bai.html"
)
exit

:EXIT_PROG
exit
