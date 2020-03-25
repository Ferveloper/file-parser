#!/bin/bash
docker stop ferbosonit/file-parser:latest || echo \"El contenedor ferbosonit/file-parser:latest no está ejecutándose\"
docker container rm ferbosonit/file-parser:latest || echo \"El contenedor ferbosonit/file-parser:latest no existe\"
docker image rm ferbosonit/file-parser:latest || echo \"La imagen ferbosonit/file-parser:latest no existe\*
docker build -t ferbosonit/file-parser:latest .
docker run -d -p 3000:3000 --name ferbosonit/file-parser:latest ferbosonit/file-parser:latest