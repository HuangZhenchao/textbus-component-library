@echo off
echo "使用bat脚本复制文件夹和文件:"
echo.
xcopy D:\codehub\web\textbus-component-library\dist\*.* D:\codehub\server\note-server-local\public\ /s /e /c /y /h /r