<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>Proyecto Backend - xacademy-challenge</h1>

<p>Este proyecto es el backend para la gestión de datos de jugadores de FIFA. Sigue los siguientes pasos para configurarlo en tu entorno de desarrollo.</p>

<h2>Requisitos Previos</h2>
<ol>
  <li><a href="https://nodejs.org/">Node.js</a> (versión 14 o superior)</li>
  <li><a href="https://www.docker.com/get-started">Docker</a></li>
  <li><a href="https://tableplus.com/">TablePlus</a> u otro cliente MySQL (opcional, para ver la base de datos).</li>
</ol>

<h2>Configuración del Proyecto</h2>

<ol>
  <li><strong>Clona el repositorio</strong>:
    <pre><code>git clone https://github.com/HernanArevalo/xacademy-backend
cd xacademy-backend
    </code></pre>
  </li>

  <li><strong>Instala las dependencias</strong>:
    <pre><code>npm install</code></pre>
  </li>

  <li><strong>Crea y configura la base de datos con Docker</strong>:
    <ul>
      <li>Inicia un contenedor MySQL en Docker:
        <pre><code>docker run --name xacademy-challenge -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:latest
        </code></pre>
      </li>
      <li>Ingresa a Docker para crear la base de datos <code>fifa_local</code>:
        <pre><code>docker exec -it xacademy-challenge mysql -uroot -proot -e "CREATE DATABASE fifa_local;"</code></pre>
      </li>
    </ul>
  </li>

  <li><strong>Carga los datos iniciales de los jugadores</strong>:
    <ul>
      <li>Desde el directorio raíz del proyecto, ejecuta:
        <pre><code>docker exec -i xacademy-challenge mysql -uroot -proot fifa_local &lt; ./src/database/fifa_male_players.sql
docker exec -i xacademy-challenge mysql -uroot -proot fifa_local &lt; ./src/database/fifa_female_players.sql</code></pre>
      </li>
    </ul>
  </li>

  <li><strong>Configura las variables de entorno</strong>:
    <p>Crea un archivo <code>.env</code> en el directorio raíz del proyecto y agrega las siguientes variables:</p>
    <pre><code>DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=fifa_local
DB_PORT=3306</code></pre>
  </li>
</ol>

<h2>Iniciar el Servidor en Modo Desarrollo</h2>
<ol>
  <li><strong>Ejecuta el servidor</strong>:
    <pre><code>npm run dev</code></pre>
    <p>Esto iniciará el servidor en <code>localhost</code> en el puerto especificado.</p>
  </li>
</ol>

<h2>Conexión a la Base de Datos (opcional)</h2>

<p>Para ver los datos de la base en un cliente MySQL como TablePlus:</p>

<ol>
  <li><strong>Conéctate</strong> usando los siguientes datos:
    <ul>
      <li>Host: <code>localhost</code></li>
      <li>Usuario: <code>root</code></li>
      <li>Contraseña: <code>root</code></li>
      <li>Base de Datos: <code>fifa_local</code></li>
      <li>Puerto: <code>3306</code></li>
    </ul>
  </li>
</ol>

</body>
</html>
