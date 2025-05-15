/**
 * EJERCICIOS PRÁCTICOS DE TYPESCRIPT - TIPOS BÁSICOS E INTERFACES
 * ==============================================================
 *
 * Este archivo contiene ejercicios para practicar los conceptos
 * fundamentales de TypeScript:
 * - Tipos básicos
 * - Funciones con tipos
 * - Interfaces
 * - Unión e intersección de tipos
 * - Genéricos básicos
 */

// Contexto: Estás desarrollando una aplicación de comercio electrónico
// y necesitas implementar varias funcionalidades usando TypeScript.

/**
 * EJERCICIO 1: Tipos básicos
 *
 * Completa las anotaciones de tipo para las siguientes variables.
 * - Usa los tipos primitivos y compuestos apropiados de TypeScript
 */

// ❌ Código sin tipos explícitos
// let username = "user123";
// let userAge = 25;
// let isActive = true;
// let hobbies = ["reading", "swimming", "coding"];
// let userCoordinates = [40.7128, -74.0060];
// let userProfile = {
//   id: 1,
//   email: "user@example.com",
//   isPremium: false
// };

// ✅ Tu código con tipos aquí (reemplaza las declaraciones anteriores)
let username: string = "user123";
let userAge: number = 25;
let isActive = true;
let hobbies: string[] = ["reading", "swimming", "coding"];
let userCoordinates: number[] = [40.7128, -74.0060];
let userProfile: { id: number, email: string, isPremium: boolean } = {
  id: 1,
  email: "user@example.com",
  isPremium: false
};


/**
 * EJERCICIO 2: Funciones con tipos
 *
 * Define los tipos para los parámetros y valores de retorno de estas funciones.
 */

// ❌ Función sin tipos explícitos
// function calculateTotal(price, quantity, discount) {
//   const subtotal = price * quantity;
//   const total = subtotal - (subtotal * discount / 100);
//   return total;
// }

// ✅ Tu función con tipos aquí (reescribe la función completa)
function calculateTotal(price: number, quantity: number, discount: number): number {
  return 2
}

// ❌ Función tradicional sin tipos
function formatName(firstName, lastName, includeMiddle, middleName) {
  if (includeMiddle && middleName) {
    return `${firstName} ${middleName} ${lastName}`;
  }
  return `${firstName} ${lastName}`;
}

// ✅ Convierte a arrow function con tipos apropiados (reescribe la función completa)
// const formatName = (firstName: string, ...): string => {
//   ...
// };


/**
 * EJERCICIO 3: Interfaces
 *
 * Define interfaces para estructurar objetos de manera clara y reutilizable.
 */

// ❌ Objeto sin interfaz definida
const laptop = {
  id: "P001",
  name: "MacBook Pro",
  price: 1299.99,
  category: "Electronics",
  inStock: true,
  specs: {
    cpu: "M1 Pro",
    ram: "16GB",
    storage: "512GB"
  }
};

// ✅ Define una interfaz Product y úsala para tipar el objeto
interface Product {
  id: string,
  name: string, price: number,
  category: string,
  inStock: boolean, specs: { cpu: string, ram: string, storage: string }
}

const laptop2: Product = {
  id: "P001",
  name: "MacBook Pro",
  price: 1299.99,
  category: "Electronics",
  inStock: true,
  specs: {
    cpu: "M1 Pro",
    ram: "16GB",
    storage: "512GB"
  }
};



// ❌ Otro objeto sin interfaz definida
// const currentUser = {
//   id: 1,
//   username: "johndoe",
//   email: "john@example.com",
//   preferences: {
//     theme: "dark",
//     notifications: true
//   },
//   roles: ["user", "editor"]
// };

// ✅ Define una interfaz User y úsala para tipar el objeto
// interface User {
//   ...
// }
// const currentUser: User = { ... };


/**
 * EJERCICIO 4: Unión e Intersección de tipos
 *
 * Utiliza las capacidades avanzadas de TypeScript para crear tipos más flexibles.
 */

// ✅ Crea un tipo ID que pueda ser un string o un number
type ID = string | number;

// ✅ Ejemplo de uso:
const numericId: ID = 12345;
const stringId: ID = "ABC-12345";

// ✅ Crea dos interfaces y una intersección
interface BasicAddress {
  address: string,
  street: string
  // 2 propiedades +
}

interface ContactInfo {
  phone: number
  // 2 propiedades +
}

type CustomerInfo = BasicAddress & ContactInfo;

// ✅ Ejemplo de uso:
const customer: CustomerInfo = {
  street: "123 Main St",
  address: 'las magnolias 123',
  phone: 987654321
  // implementacion de las 4 propiedades
};


/**
 * EJERCICIO 5: Genéricos básicos
 *
 * Crea una función genérica que pueda trabajar con diferentes tipos de datos.
 */

// ✅ Define una función genérica firstElement
function firstElement<T>(array: T[]): T | undefined {
  return undefined
}

// ✅ Ejemplo de uso:
const numbers = [1, 2, 3, 4, 5];
const strings = ["hello", "world"];
console.log(firstElement(numbers)); // 1
console.log(firstElement(strings)); // "hello"
console.log(firstElement([])); // undefined

// Exporta las funciones y tipos que has creado
export {
  calculateTotal,
  formatName
  // añade aquí los demás elementos que hayas definido
};
