# 🎓 School Management System (Full Stack)

Esta aplicación es una plataforma integral para la gestión de **Usuarios** y **Profesores**. Utiliza un ecosistema moderno basado en **React** para el frontend, un servidor **Node.js/Express** y una base de datos **PostgreSQL** orquestada mediante **Docker**.

---

## 🏗️ Arquitectura del Sistema

El proyecto se apoya en un entorno de contenedores para garantizar la consistencia de los datos y la facilidad de despliegue.

- **Frontend:** React.js (Interfaz de usuario dinámica y responsiva).
- **Backend:** Node.js & Express (API REST propia para lógica de negocio).
- **ORM:** Sequelize (Gestión de modelos, migraciones y asociaciones).
- **Infraestructura:** Docker (PostgreSQL contenido para aislamiento del entorno).

---

## 🛠️ Guía de Instalación y Configuración

Sigue estos pasos en orden estricto para configurar el entorno de desarrollo:

### 1. 🐳 Gestión de Servicios (Docker)

Antes de interactuar con la aplicación, es necesario levantar la infraestructura de la base de datos:

- **Iniciar servicios (Base de Datos):**
  ```bash
  npm run start-services
  ```
- **Detener servicios:**
  ```bash
  npm run stop-services
  ```

### 2. 🔑 Configuración de Credenciales

Para que la conexión sea exitosa, verifica el archivo `config/config.json` en la carpeta del servidor. Debes asegurarte de estar registrado con las credenciales (User, Password, Host) que coincidan con tu configuración de Docker.

### 3. 🏗️ Preparación de la Base de Datos

Una vez que el contenedor de Docker esté corriendo, ejecuta los comandos de **Sequelize** para estructurar y poblar las tablas de `Users` y `Teachers`:

- **Ejecutar Migraciones (Crear tablas):**
  ```bash
  npx sequelize-cli db:migrate
  ```
- **Ejecutar Seeds (Cargar datos de prueba):**
  ```bash
  npx sequelize-cli db:seed:all
  ```

---

## 🚀 Inicio de la Aplicación

Con la base de datos lista y poblada, inicia el ecosistema completo:

### 💻 Backend (Servidor Express)

Gestiona la comunicación entre el cliente y la persistencia de datos.

```bash

npm install
npm run start-dev


