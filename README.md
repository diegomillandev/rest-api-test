# API REST - Prueba Técnica BRM

Este documento proporciona las instrucciones y la documentación para la API REST de inventario y compras, desarrollada como parte de la prueba técnica para BRM.

## Resumen del Proyecto

El proyecto es una API REST construida con NodeJS, Express y TypeScript, utilizando Sequelize como ORM para interactuar con una base de datos PostgreSQL. La API gestiona un inventario de productos y permite a los usuarios realizar compras, con funcionalidades específicas basadas en roles de usuario.

## Funcionalidades

La API implementa dos roles de usuario: `Administrador` y `Cliente`.

### 1. Gestión de Usuarios

- **Registro (`POST /api/auth/create-account`):** Permite a cualquier usuario crear una cuenta. Por defecto, se asigna el rol `Cliente`.
- **Login (`POST /api/auth/login`):** Permite a los usuarios registrados iniciar sesión y obtener un token de autenticación (JWT) para acceder a las rutas protegidas.

### 2. Rol: Administrador

A los administradores se les conceden permisos para gestionar completamente el inventario y supervisar las ventas.

- **CRUD de Productos (`/api/products`):**
  - Crear, leer, actualizar y eliminar productos del inventario.
  - Cada producto tiene: Número de lote, nombre, precio, cantidad disponible y fecha de ingreso.
- **Visualización de Compras (`GET /api/orders`):**
  - Acceder a una lista de todas las compras realizadas por todos los clientes.
  - La vista incluye la fecha de la compra, el cliente que la realizó, los productos comprados con su cantidad y el precio total.

### 3. Rol: Cliente

Los clientes tienen permisos para navegar por los productos y gestionar sus propias compras.

- **Módulo de Compras (`POST /api/orders`):**
  - Realizar un pedido que puede incluir uno o varios productos con sus respectivas cantidades.
- **Visualización de Factura (`GET /api/orders/:orderId`):**
  - Ver el detalle completo de una compra específica, funcionando como una factura digital.
- **Historial de Compras (`GET /api/orders`):**
  - Acceder a un historial de todas las compras realizadas por el propio usuario.

## Instrucciones de Software

### Prerrequisitos

- Node.js (v18 o superior)
- npm
- PostgreSQL

### Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/diegomillandev/rest-api-test
    ```
2.  **Navegar al directorio:**
    ```bash
    cd api_rest_brm
    ```
3.  **Instalar dependencias:**
    ```bash
    npm install
    ```

### Configuración

1.  Crea un archivo `.env` en la raíz del proyecto a partir del archivo `.env.example`.
2.  Ajusta las variables de entorno en el archivo `.env`:

    ```
    # Puerto en el que correrá la aplicación
    PORT=4000

    # URL de conexión a la base de datos PostgreSQL
    # Formato: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
    DATABASE_URL=postgresql://user:password@localhost:5432/brm_db

    # Secreto para firmar los JSON Web Tokens
    JWT_SECRET=tu_secreto_super_secreto
    ```

### Ejecución

Para iniciar el servidor en modo de desarrollo (con recarga automática):

```bash
npm run dev
```

La API estará disponible en `http://localhost:4000`.

## Documentación de Endpoints

La URL base para todos los endpoints es `/api`.

### Autenticación (`/auth`)

| Método | Ruta                  | Descripción                      | Requiere Autenticación | Roles Permitidos |
| :----- | :-------------------- | :------------------------------- | :--------------------- | :--------------- |
| `POST` | `/auth/create-account`| Crea una nueva cuenta de usuario.| No                     | N/A              |
| `POST` | `/auth/login`         | Inicia sesión y obtiene un token.| No                     | N/A              |

### Productos (`/products`)

| Método  | Ruta                | Descripción                               | Requiere Autenticación | Roles Permitidos   |
| :------ | :------------------ | :---------------------------------------- | :--------------------- | :----------------- |
| `GET`   | `/products`         | Obtiene todos los productos.              | Sí                     | `admin`, `client`  |
| `POST`  | `/products`         | Crea un nuevo producto.                   | Sí                     | `admin`            |
| `GET`   | `/products/:productId`| Obtiene un producto por su ID.            | Sí                     | `admin`, `client`  |
| `PUT`   | `/products/:productId`| Actualiza un producto por su ID.          | Sí                     | `admin`            |
| `DELETE`| `/products/:productId`| Elimina un producto por su ID.            | Sí                     | `admin`            |

### Pedidos (`/orders`)

| Método | Ruta             | Descripción                               | Requiere Autenticación | Roles Permitidos   |
| :----- | :--------------- | :---------------------------------------- | :--------------------- | :----------------- |
| `GET`  | `/orders`        | Obtiene los pedidos del usuario.          | Sí                     | `admin`, `client`  |
| `POST` | `/orders`        | Crea un nuevo pedido.                     | Sí                     | `admin`, `client`  |
| `GET`  | `/orders/:orderId`| Obtiene un pedido por su ID.              | Sí                     | `admin`, `client`  |