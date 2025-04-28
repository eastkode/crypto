@echo off
REM === Folder and File Structure Script for Clean URLs (Windows Batch) ===
REM Run this script from your project root (where index.html is located)

REM Create folders for sections and categories
mkdir about
mkdir contact
mkdir privacy-policy
mkdir terms-of-use
mkdir live-prices
mkdir news
mkdir categories
mkdir categories\bitcoin
mkdir categories\ethereum
mkdir categories\altcoins
mkdir categories\defi
mkdir categories\nfts
mkdir categories\regulations
mkdir categories\blockchain-technology
mkdir categories\market-analysis

REM Move main section files into their folders
move about.html about\index.html
move contact.html contact\index.html
move privacy-policy.html privacy-policy\index.html
move terms-of-use.html terms-of-use\index.html
move live-prices.html live-prices\index.html
move news.html news\index.html
move categories.html categories\index.html

REM Copy categories index.html as placeholder for each category
copy categories\index.html categories\bitcoin\index.html
copy categories\index.html categories\ethereum\index.html
copy categories\index.html categories\altcoins\index.html
copy categories\index.html categories\defi\index.html
copy categories\index.html categories\nfts\index.html
copy categories\index.html categories\regulations\index.html
copy categories\index.html categories\blockchain-technology\index.html
copy categories\index.html categories\market-analysis\index.html

echo.
echo Folder structure and file moves complete!
pause
