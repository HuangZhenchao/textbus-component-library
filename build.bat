@echo off
echo "使用bat脚本复制文件夹和文件:"
echo.
xcopy D:\codehub\web\textbus-component-library\compile\*.* D:\codehub\web\note-vue\node_modules\@huangzc\textbus\compile\ /s /e /c /y /h /r
copy /y D:\codehub\web\textbus-component-library\package.json  D:\codehub\web\note-vue\node_modules\@huangzc\textbus\package.json


