````md
# PruebaSande — Angular (Login, Contactos, Token local y Perfiles)

Proyecto Angular (Standalone + Routing) para la prueba técnica:
- Login contra API entregada
- Token generado en Angular y guardado en `localStorage`
- AuthGuard + PerfilGuard
- HttpInterceptor (Authorization: Bearer <token>)
- CRUD de contactos con permisos por perfil

---

## ✅ Requisitos previos

### 1) Instalar Node.js
- Recomendado: **Node 18+**

Verifica versiones:
```bash
node -v
npm -v
````

### 2) Instalar Angular CLI

```bash
npm install -g @angular/cli
```

Verifica:

```bash
ng version
```

---

## 🚀 Instalación y ejecución (paso a paso)

### 1) Clonar / descargar el proyecto

Coloca el proyecto en tu equipo y entra a la carpeta:

**Windows (CMD / PowerShell):**

```bash
cd C:\Users\TU_USUARIO\Desktop\pruebaSande
```

### 2) Instalar dependencias

```bash
npm install
```

### 3) Configurar API Base URL

Verifica el archivo:

`src/environments/environment.ts`

Debe existir y contener:

```ts
export const environment = {
  apiBase: 'https://sandeonline.cl:2082/taskfocus/maestros/api/Test'
};
```

### 4) Levantar el proyecto en local

```bash
ng serve -o
```

La app se abre en:

* [http://localhost:4200](http://localhost:4200)

---

## 🔐 Credenciales y perfiles

| Usuario  | Clave | Perfil | Permisos                     |
| -------- | ----- | ------ | ---------------------------- |
| admin    | 123   | 1      | Crear / Modificar / Eliminar |
| crea     | 123   | 2      | Crear / Modificar            |
| consulta | 123   | 3      | Solo lectura                 |

---

## 🧭 Rutas

* `/login` (pública)
* `/contactos` (protegida)
* `/contactos/nuevo` (protegida + perfil 1/2)
* `/contactos/:id/editar` (protegida + perfil 1/2)

---

## 🧠 Reglas de negocio implementadas

### Token (Angular)

La API **no entrega token**.

Luego del login:

* Se toma el primer elemento del arreglo de respuesta
* Se genera un token local (UUID / fallback)
* Se guarda sesión en `localStorage`

**Claves usadas en localStorage:**

* `auth_token`
* `idUsuario`
* `perfil`

### Perfiles

* Perfil 1: puede crear/editar/eliminar
* Perfil 2: puede crear/editar
* Perfil 3: solo lectura

## 🔌 Endpoints usados

**Login**

* POST: `/Login`
* Body:

```json
{ "usuario": "admin", "clave": "123" }
```

**Listar contactos**

* GET: `/ListarContactos/{idUsuario}`

**Detalle contacto (editar)**

* GET: `/ListaContacto/{idUsuario}/{idContacto}`

**Crear contacto**

* POST: `/CreaContacto`

**Modificar contacto**

* POST: `/UpdateContacto`

**Eliminar contacto**

* POST: `/DeleteContacto`

---

## 🧱 Arquitectura del proyecto

### Core

* `core/services`

  * `AuthService` (login + session)
  * `ContactosService` (CRUD contactos)
  * `UtilsService` (localStorage + navegación + limpieza)
* `core/guards`

  * `AuthGuard` (bloquea si no hay token)
  * `PerfilGuard` (solo perfil 1/2 en nuevo/editar)
* `core/interceptors`

  * `AuthInterceptor` (inyecta Authorization Bearer)

### Herencia (obligatorio)

* `ApiService` (abstract)

  * Maneja requests + headers + errores
  * Es extendido por `AuthService` y `ContactosService`

---

## 🧪 Pruebas rápidas

1. Ejecuta:

```bash
ng serve -o
```

2. Entra a:

* `/login`

3. Prueba los usuarios:

* `admin / 123` → verás Nuevo/Editar/Eliminar
* `crea / 123` → verás Nuevo/Editar
* `consulta / 123` → solo lectura (sin botones de acción)

---

## 🛠️ Comandos útiles

### Servidor de desarrollo

```bash
ng serve
```

### Build producción

```bash
ng build
```

### Tests (si aplica)

```bash
ng test
```

---

## ⚠️ Problemas comunes

Ninguno registrado.

---

## 📌 Nota

Este proyecto está enfocado en cumplir los requisitos obligatorios de la prueba:
Angular + Routing + Guards + Interceptor + LocalStorage + CRUD + Permisos por Perfil + Herencia real.

```
