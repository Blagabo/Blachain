# Blockchain Educativa en TypeScript con Proof of Stake (PoS)

## 📚 Resumen del Proyecto

Este proyecto es una **blockchain educativa** desarrollada en **TypeScript** utilizando **Bun** como entorno de ejecución. Su objetivo es proporcionar una comprensión práctica de los conceptos fundamentales de las blockchains, incluyendo transacciones firmadas, validación de bloques con Proof of Stake (PoS) y manejo de criptografía.

---

## 🚀 Plan de Desarrollo

### **Fase 1: Estructura Base de la Blockchain**

- Implementación de la estructura de bloques con SHA-256.
- Creación de la clase `Blockchain` para gestionar la cadena de bloques.
- Configuración inicial del proyecto con TypeScript y Bun.

### **Fase 2: Implementación de Proof of Stake (PoS)**

- Desarrollo de un sistema de validación basado en el stake de los usuarios.
- Selección de validadores mediante un algoritmo de lotería ponderada.
- Creación de billeteras (`Wallet`) que pueden stakear tokens para participar en la validación.

### **Fase 3: Transacciones Firmadas**

- Implementación de transacciones firmadas digitalmente con claves criptográficas.
- Creación del modelo `Transaction` y el módulo `Crypto` para la generación y verificación de firmas.
- Validación de transacciones antes de ser añadidas a la blockchain.

### **Fase 4: Manejo de Recompensas y Penalizaciones**

- Sistema de recompensas para validadores por validar bloques.
- Implementación de penalizaciones (`slashing`) para validadores maliciosos.

### **Fase 5: API HTTP**

- Creación de una API REST para interactuar con la blockchain:
  - `GET /blocks` → Consultar la cadena de bloques.
  - `POST /transaction` → Enviar una nueva transacción.
  - `GET /balance/:address` → Consultar el saldo de una wallet.

### **Fase 6: Red P2P (Opcional)**

- Conectar múltiples nodos mediante WebSockets para sincronizar la blockchain de manera descentralizada.

---

## 🛠️ Tecnologías Utilizadas

- **TypeScript:** Lenguaje principal para el desarrollo.
- **Bun:** Entorno de ejecución rápido para TypeScript y JavaScript.
- **Node.js:** Dependencias de criptografía.
- **ESLint y Prettier:** Herramientas de linting y formateo de código.
- **Git:** Control de versiones.

---

## 📂 Estructura del Proyecto

```
/blockchain-pos/
│── /src/
│   ├── /models/
│   │   ├── Block.ts
│   │   ├── Wallet.ts
│   │   ├── Transaction.ts
│   ├── /core/
│   │   ├── Blockchain.ts
│   │   ├── Validator.ts
│   ├── /utils/
│   │   ├── Crypto.ts
│   │   ├── Logger.ts
│   ├── index.ts
│── package.json
│── tsconfig.json
│── README.md
```

---

## 🧪 Cómo Ejecutar el Proyecto

1. **Instalar Bun:**

```sh
curl -fsSL https://bun.sh/install | bash
```

2. **Instalar dependencias:**

```sh
bun install
```

3. **Ejecutar el proyecto:**

```sh
bun run src/index.ts
```

---

## 📋 Próximos Pasos

- Implementar recompensas y penalizaciones en PoS.
- Desarrollar la API HTTP.
- Crear una red P2P para descentralizar la blockchain.

---

## 📚 Contribuciones

Si deseas contribuir a este proyecto educativo, puedes crear un fork y enviar pull requests con mejoras.

---

## 📝 Licencia

Este proyecto es de código abierto y está licenciado bajo la Licencia MIT.
