@ECHO OFF

set name_library=mp-forest-mantenimiento-correspondencia
echo %name_library%
CMD /C ng build %name_library% --prod
ECHO Copiar Assets
mkdir .\dist\%name_library%\assets
mkdir .\dist\%name_library%\assets\i18n
xcopy src\assets\%name_library%\i18n .\dist\%name_library%\assets\i18n
ECHO Copiar Archivos de Configuracion
xcopy projects\%name_library%\src\config.ts .\dist\%name_library%
xcopy projects\%name_library%\src\path.json .\dist\%name_library%
xcopy .npmrc .\dist\%name_library%
