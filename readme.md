# 📦 Backend Ecommerce – Node.js / Express / MongoDB / Socket.IO

## 📌 Descripción

Este proyecto es un **backend de ecommerce** desarrollado en **Node.js**, con **Express** como framework principal, **MongoDB** como base de datos y **Socket.IO** para comunicación en tiempo real.

La aplicación sigue una **arquitectura por capas**, separando claramente:

- lógica de negocio  
- persistencia  
- controladores  
- entidades de dominio  

Esto permite un código **escalable, mantenible y reutilizable**, preparado tanto para **HTTP** como para **WebSockets**.

---

## 🛠️ Tecnologías utilizadas

- Node.js  
- Express  
- MongoDB + Mongoose  
- Socket.IO  
- Handlebars  
- JavaScript (ES Modules)  

---

## 🧠 Capas explicadas

### 🔹 Entidades

Representan el **modelo de dominio**, independientes de la tecnología de persistencia.

**Ejemplo:**
- `ProductoEntidad`
- `CarritoEntidad`

Estas clases definen **qué es un producto o un carrito**, no cómo se guardan.

---

### 🔹 Persistencia (Repositorio)

Encargada **exclusivamente del acceso a datos**.

- Implementaciones en MongoDB usando **Mongoose**
- No contienen reglas de negocio
- Se comunican con la base de datos

**Ejemplo:**
- `ProductoRepositorioMongo`
- `CarritoRepositorioMongo`

---

### 🔹 Servicios

Contienen la **lógica de negocio del sistema**.

**Ejemplo:**
- Validar si un producto existe
- Verificar si un producto pertenece a un carrito
- Aplicar reglas antes de modificar datos

Los servicios:
- No conocen HTTP
- No conocen sockets
- No conocen Mongo directamente

---

### 🔹 Controladores

Actúan como **orquestadores**:

- Reciben requests (HTTP o Socket)
- Llaman a los servicios
- Manejan la respuesta o los errores

---

## 🔌 Comunicación en tiempo real (Socket.IO)

El proyecto soporta **WebSockets** mediante **Socket.IO** para:

- Obtener productos en tiempo real
- Crear productos
- Eliminar productos
- Emitir errores al cliente

**Ejemplo de eventos:**
- `crearProducto`
- `eliminarProducto`
- `error`

---

## 🗄️ Base de datos

La base de datos utilizada es **MongoDB Atlas**.

La conexión se realiza mediante **Mongoose** usando una **cadena de conexión configurada por variable de entorno**.

---

## ✅ Características implementadas

- CRUD de productos  
- CRUD de carritos  
- Asociación producto ↔ carrito  
- Eliminación de productos dentro de un carrito  
- Manejo de errores  
- Arquitectura desacoplada  
- Comunicación en tiempo real  

---

## 🚀 Objetivo del proyecto

Este proyecto fue desarrollado con fines **educativos**, aplicando:

- principios de diseño  
- separación de responsabilidades  
- buenas prácticas de backend  

Está preparado para **extenderse fácilmente** a:

- autenticación  
- autorización  
- frontend completo  
- testing  
