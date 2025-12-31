@echo off
echo ========================================
echo Seeding All About Pages
echo ========================================
echo.

cd /d "%~dp0"

echo Running Our Team Page Seed...
node src/scripts/seedOurTeamPageData.js
if %errorlevel% neq 0 (
    echo ERROR: Our Team Page seed failed!
    pause
    exit /b %errorlevel%
)
echo.

echo Running Software Architecture Page Seed...
node src/scripts/seedSoftwareArchitecturePageData.js
if %errorlevel% neq 0 (
    echo ERROR: Software Architecture Page seed failed!
    pause
    exit /b %errorlevel%
)
echo.

echo Running Vision Mission Page Seed...
node src/scripts/seedVisionMissionPageData.js
if %errorlevel% neq 0 (
    echo ERROR: Vision Mission Page seed failed!
    pause
    exit /b %errorlevel%
)
echo.

echo Running Timelines Page Seed...
node src/scripts/seedTimelinesPageData.js
if %errorlevel% neq 0 (
    echo ERROR: Timelines Page seed failed!
    pause
    exit /b %errorlevel%
)
echo.

echo ========================================
echo All About Pages Seeded Successfully!
echo ========================================
echo.
echo Pages Ready:
echo   - Our Team
echo   - Software Architecture
echo   - Vision, Mission and Values
echo   - Timelines and Milestones
echo.
echo Visit:
echo   http://localhost:3000/about/our-team
echo   http://localhost:3000/about/software-architecture-the-engine-behind-our-solution
echo   http://localhost:3000/about/vision-mission-and-core-values
echo   http://localhost:3000/about/timelines-and-milestones
echo.
pause
