# Sistema de Monitoreo y Riego Inteligente
## Trabajo Practico Final - Materia Desarrollo de Aplicaciones Multiplataforma (DAM) 

El proyecto implementa un sistema de monitoreo y control de dispositivos IoT para un hogar inteligente, enfocado en la gestión de riego. La aplicación consta de un frontend desarrollado con Ionic (Angular) y un backend con Node.js (Express) que interactúa con una base de datos MySQL.

## ✨ Características Principales

- **Autenticación de Usuarios:** Sistema de login para acceder a la aplicación.
- **Gestión de Dispositivos:** Visualización y detalle de sensores y electroválvulas.
- **Simulación de Sensores:** Generación de datos de humedad al interactuar con las válvulas.
- **Control de Riego:** Apertura y cierre de electroválvulas, registrando eventos y mediciones.
- **Historial de Mediciones:** Visualización del historial de humedad por dispositivo.
- **Arquitectura Backend:**  Unificado para todas las operaciones de la API.
- **Contenedorización (Docker Compose):** Despliegue sencillo de todos los componentes (Frontend, Backend, MySQL, phpMyAdmin).

## 🚀 Tecnologías Utilizadas

### Frontend
- **Ionic Framework:** Para el desarrollo de la aplicación móvil/web.
- **Angular:** Framework principal del frontend.
- **TypeScript:** Lenguaje de programación.
- **HTML/CSS (SCSS):** Estructura y estilos.

### Backend
- **Node.js:** Entorno de ejecución del servidor.
- **Express.js:** Framework para la API REST.
- **JSON Web Tokens (JWT):** Para la autenticación y autorización.
- **Bcrypt:** Para el hashing seguro de contraseñas.
- **MySQL2:** Driver para la conexión con la base de datos MySQL.

### Base de Datos
- **MySQL:** Base de datos relacional para almacenar usuarios, dispositivos, mediciones y registros de riego.
- **phpMyAdmin:** Interfaz web para la gestión de la base de datos.

### Despliegue
- **Docker:** Contenedorización de la aplicación.
- **Docker Compose:** Orquestación de los servicios (frontend, backend, db, phpmyadmin).

## 🛠️ Configuración y Ejecución

### Requisitos
- Docker Desktop instalado y en ejecución.

## 📦 Despliegue

1. Asegúrate de tener **Docker** y **Docker Compose** instalados.
2. Clona el repositorio y entra al directorio raíz.
3. Antes de levantar con Docker, para evitar errores de librerías, instala dependencias locales en **backend** y **frontend**:
   ```bash
   cd src/backend
   npm install

   cd ../frontend/dam
   npm install
3. Ejecuta el siguiente comando para construir e iniciar todos los servicios:
   ```bash
   docker-compose up --build
