@echo off
REM === GitHub Auto Push Script for Windows ===
REM Set your GitHub username and repo name below
set GITHUB_USER=YOUR_USERNAME
set REPO_NAME=crypto-news-website

REM Change to your project directory
cd /d "%~dp0"

REM Initialize git if not already done
if not exist .git (
    git init
    git remote add origin https://github.com/eastkode/crypto.git
)

REM Add all files (including new/changed ones)
git add .

REM Commit with a message
git commit -m "Update static site and automation files"

REM Set main branch (if not already set)
git branch -M main

REM Push to GitHub
REM (You may be prompted for your GitHub credentials or token)
git push -u origin main

echo.
echo All files have been pushed to GitHub!
pause
