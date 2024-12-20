# Gestión de Países Hispanoamericanos

## Objetivos del Proyecto

El propósito de este proyecto es desarrollar una aplicación web para la gestión de información sobre países hispanohablantes. La aplicación permitirá realizar las siguientes operaciones:

- **Agregar** países con información detallada.
- **Editar** la información existente de los países.
- **Eliminar** países de la base de datos.
- **Visualizar** información de los países.

Además, se integrarán validaciones para garantizar la integridad de los datos y una funcionalidad para cargar países automáticamente desde una API externa.

### Funcionalidades Clave

1. Validaciones exhaustivas para campos como:
   - Nombre oficial
   - Capital
   - Área
   - Población
   - Otros datos relevantes
2. Integración con una API de países para facilitar la carga automática de datos.
3. Gestión eficiente de la base de datos.

## Tecnologías Utilizadas

El proyecto emplea las siguientes tecnologías:

- **Node.js**: Plataforma para el desarrollo del servidor backend.
- **Express**: Framework para la creación de rutas y gestión de middleware.
- **MongoDB**: Base de datos NoSQL para el almacenamiento de información.
- **Mongoose**: ODM (Object Data Modeling) para interactuar con MongoDB.
- **Axios**: Cliente HTTP para consumir la API de países.
- **EJS**: Motor de plantillas para renderizar vistas dinámicas.
- **Express-Validator**: Biblioteca para la validación de campos en formularios.
- **Connect-Flash**: Middleware para mostrar mensajes informativos y de error.

