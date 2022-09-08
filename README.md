Backend Developer Test

Construcción de una API REST que se enlazó a una base de datos (MySQL) para su funcionamiento. Se proporciona el archivo sql para la construcción rápida de la base de datos y que además contiene datos que se utilizaron para las pruebas en conexión. También se comparte el diagrama de entidad-relación de la base de datos con la que se trabajó.

Iniciando el proyecto:

1- Instalar dependencias con npm install.

2- Luego levantar el servidor con npm start que ocupará el puerto 8000.

Colección en postman donde se indica el uso de la API: https://www.getpostman.com/collections/081177fabdbcb1d5131a

¡¨¨¨DATO IMPORTANTE¨¨!

Se desarrollo el proyecto con Docker de manera local (uso de docker-compose), por lo que para poder ejecutar el proyecto desde otro dispositivo se deberán cambiar las credenciales y configuraciones en el archivo config.json ubicado en la carpeta config que esta dentro de la carpeta database. Adicionalmente, se agrega la propiedad "port" al archivo config.json para lograr enlazar la base de datos, por lo que esta propiedad puede llegar a afectar la ejecución del proyecto.