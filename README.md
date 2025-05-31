# 🎬 CineReserva

[![Ver Demo en GitHub Pages](https://img.shields.io/badge/Demo-GitHub%20Pages-24292F?logo=github&logoColor=white&style=for-the-badge)](https://franklinrony.github.io/reserva-peliculas-cine/gh-pages/)

¡Bienvenido a **CineReserva**! 🍿

Plataforma web para la reserva de entradas de cine, selección de asientos y consulta de cartelera, desarrollada con Angular y generada con la ayuda de **Bolt** ⚡ y agentes de **IA** 🤖 para acelerar el desarrollo y la experiencia de usuario.

---

## 🚀 Tecnologías utilizadas

- ![Angular](https://img.shields.io/badge/Angular-DD0031?logo=angular&logoColor=white) **Angular 19**
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) **TypeScript**
- ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-FF6F61?logo=sweetalert2&logoColor=white) **SweetAlert2**
- ⚡ **Bolt** para scaffolding y automatización
- 🤖 **Agentes de IA** para generación de código, documentación y optimización

---

## 🛠️ Estructura del proyecto

```
reserva-peliculas-cine/
├── src/
│   ├── app/
│   │   ├── components/         # Componentes reutilizables (header, footer, movie-card)
│   │   ├── models/             # Modelos de datos (película, asiento, reserva, horario)
│   │   ├── pages/              # Páginas principales (cartelera, detalle, selección, resumen)
│   │   └── services/           # Servicios para lógica de negocio y estado
│   ├── global_styles.css       # Estilos globales
│   └── index.html              # HTML principal
├── angular.json                # Configuración Angular
├── package.json                # Dependencias y scripts
└── .bolt/                      # Configuración Bolt
```

---

## ✨ Funcionalidades principales

- 📅 **Cartelera**: Consulta de películas en cartelera y próximas a estrenar
- 🎟️ **Reserva de entradas**: Selección de película, horario, cantidad de entradas y asientos
- 🪑 **Selección de asientos**: Visualización y selección interactiva de asientos disponibles
- 🧾 **Resumen de reserva**: Confirmación y detalles de la reserva, con generación de QR
- 🌙 **Modo oscuro/claro**: Cambio de tema visual

---

## ⚡ Bolt & 🤖 IA en el desarrollo

- **Bolt** se utilizó para crear la estructura base del proyecto Angular, facilitando la configuración inicial y el scaffolding de componentes.
- **Agentes de IA** participaron en la generación de código, documentación, optimización de lógica y estilos, acelerando el desarrollo y asegurando buenas prácticas.

---

## 🏁 Cómo ejecutar el proyecto

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```
3. Accede a [http://localhost:4200](http://localhost:4200) en tu navegador.

---

## 📂 Estructura de carpetas destacada

- `src/app/components/` → Header, Footer, Movie Card
- `src/app/pages/` → Cartelera, Detalle, Selección de horario, Selección de asientos, Resumen de reserva, Próximamente
- `src/app/services/` → Lógica de películas, reservas y temas
- `src/app/models/` → Modelos de datos

---

## 📢 Créditos

- Proyecto generado con [Bolt](https://github.com/boltvortex/bolt) ⚡
- Código y documentación asistidos por agentes de IA 🤖

---

¡Disfruta la experiencia de reservar tu película favorita! 🎥🍿 