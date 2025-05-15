/**
 * INTERFACES Y TIPOS PERSONALIZADOS EN TYPESCRIPT
 *
 * Las interfaces permiten definir la estructura que deben seguir los objetos
 * y son fundamentales para trabajar con TypeScript en Angular.
 */

import { logSection } from '../../../utils';


console.log('\nEjecutando demo de interfaces y tipos personalizados en TypeScript...\n');
console.log('Las interfaces permiten definir contratos que deben cumplir los objetos,');
console.log('facilitando el desarrollo de código más robusto y autodocumentado.');

// ============================================================================
// 1. Interfaces básicas
// ============================================================================

logSection('1. Interfaces básicas', 'Definición de contratos para objetos');

// Definición de una interfaz simple
interface Usuario { // iniciar con PascalCase -> HolaMundo
  id: number;
  nombre: string;
  email: string;
}

// Uso de la interfaz
const usuario1: Usuario = {
  id: 1,
  nombre: "Ana García",
  email: "ana@ejemplo.com"
};

console.log('Interfaz Usuario:');
console.log(`- Definición: { id: number; nombre: string; email: string }`);
console.log(`- Implementación: ${JSON.stringify(usuario1, null, 2)}`);
console.log('');

// ============================================================================
// 2. Propiedades opcionales
// ============================================================================

// logSection('2. Propiedades opcionales', 'Campos que pueden omitirse al crear objetos');

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;  // Propiedad opcional (puede omitirse)
  categoria?: string;    // Propiedad opcional
}

// Producto válido sin propiedades opcionales
const producto1: Producto = {
  id: 101,
  nombre: "Laptop",
  precio: 999.99
};

// Producto con todas las propiedades
const producto2: Producto = {
  id: 102,
  nombre: "Smartphone",
  precio: 699.99,
  descripcion: "Último modelo con cámara de alta resolución",
  categoria: "Electrónica",
};

console.log('Interfaz con propiedades opcionales (indicadas con ?)');
console.log('Producto sin propiedades opcionales:');
console.log(JSON.stringify(producto1, null, 2));
console.log('');
console.log('Producto con todas las propiedades:');
console.log(JSON.stringify(producto2, null, 2));
console.log('');

// ============================================================================
// 3. Propiedades de solo lectura
// ============================================================================

// logSection('3. Propiedades de solo lectura', 'Valores que no pueden modificarse después de la inicialización');

interface Configuracion {
  readonly apiUrl: string; // solo lectura, no se debe modificar
  readonly timeout: number; // igual, no se debe modificar
  debug?: boolean; // opcional
}

const config: Configuracion = {
  apiUrl: "https://api.ejemplo.com",
  timeout: 3000,
  debug: true
};

console.log('Interfaz con propiedades de solo lectura (readonly):');
console.log(JSON.stringify(config, null, 2));
console.log('');
console.log('Intentar modificar una propiedad readonly generaría un error en tiempo de compilación:');
console.log('// config.apiUrl = "https://nuevo-api.ejemplo.com"; // ❌ Error');

// ============================================================================
// 4. Extender interfaces
// ============================================================================

// logSection('4. Extender interfaces', 'Crear interfaces a partir de otras existentes');

interface PersonaBasica { // 2 valores iniciales
  nombre: string;
  apellido: string;
}

interface Empleado extends PersonaBasica { // extienda a PersonaBasica
  // + 3 propiedades nuevas
  id: number;
  puesto: string;
  salario: number;
}

const empleado1: Empleado = {
  nombre: "Carlos",
  apellido: "Rodríguez",
  id: 1001,
  puesto: "Desarrollador Frontend",
  salario: 60000
};

console.log('Herencia de interfaces con extends:');
console.log('- Interface PersonaBasica: { nombre, apellido }');
console.log('- Interface Empleado extends PersonaBasica: { id, puesto, salario + propiedades heredadas }');
console.log('Empleado implementado:');
console.log(JSON.stringify(empleado1, null, 2));
console.log('');

// ============================================================================
// 5. Interfaces para funciones
// ============================================================================

// logSection('5. Interfaces para funciones', 'Definir contratos para funciones');

// indico la cantidad de parametros
// indico el tipo de cada parametro
// indicar el valor que espero retorne la funcion
interface CalculadoraFunc {
  (a: number, b: number): number; // declaracion de una funcion
}

const sumar: CalculadoraFunc = (a, b) => a + b;
const multiplicar: CalculadoraFunc = (a, b) => a * b;

console.log('Interfaces para funciones:');
console.log('- Interface CalculadoraFunc: (a: number, b: number) => number');
console.log(`- sumar(5, 3) = ${sumar(5, 5)}`);
console.log(`- multiplicar(5, 3) = ${multiplicar(5, 3)}`);
console.log('');

// ============================================================================
// 6. Interfaces indexables
// ============================================================================

// logSection('6. Interfaces indexables', 'Acceso a propiedades mediante índices');

interface Diccionario { // objetos JS
  [clave: string]: string; //  CLAVE : VALOR       ->    KEY  :  VALUE
  // KEY - > [clave: string] el key debe de ser tipo string
  // VALUE -> string, el valor debe ser un string
}

const traducciones: Diccionario = {
  "hello": "hola",
  "goodbye": "adiós",
  "thank you": "gracias"
};

console.log('Interfaces indexables - acceso por clave:');
console.log('- Interface Diccionario: { [clave: string]: string }');
console.log(`- traducciones["hello"] = "${traducciones["hello"]}"`); // traigo en base a su KEY que es un string
console.log(`- traducciones["goodbye"] = "${traducciones["goodbye"]}"`); // aqui tambien
console.log(`- traducciones["thank you"] = "${traducciones["thank you"]}"`);
console.log('');

// ============================================================================
// 7. Type vs Interface
// ============================================================================

logSection('7. Type vs Interface', 'Diferencias y usos de Type e Interface');

// Los tipos también pueden definir estructuras similares a las interfaces
type Punto = {
  x: number;
  y: number;
};

const punto: Punto = { x: 10, y: 20 };

// Ejemplo de unión de tipos:
type Resultado = string | number;
type EstadoTarea = "pendiente" | "en progreso" | "completada";

const estado: EstadoTarea = "en progreso";

console.log('Diferencias entre Type e Interface:');
console.log('1. Type puede usarse para alias de cualquier tipo, incluyendo primitivos y uniones');
console.log('2. Interface solo puede describir la forma de objetos y clases');
console.log('3. Interface puede extenderse, Type permite uniones e intersecciones');
console.log('');
console.log('Ejemplo de Type para estructura de objeto:');
console.log(`- Type Punto: { x: number; y: number }`);
console.log(`- punto = ${JSON.stringify(punto)}`);
console.log('');
console.log('Ejemplo de Type para unión de valores:');
console.log(`- Type EstadoTarea = "pendiente" | "en progreso" | "completada"`);
console.log(`- estado = "${estado}"`);
console.log('');

// ============================================================================
// 8. Interfaces en clases
// ============================================================================

// logSection('8. Interfaces en clases', 'Implementación de interfaces mediante clases');

interface VehiculoInterface {
  marca: string;
  modelo: string;
  encender(): void;
  detener(): void;
}

class Coche implements VehiculoInterface {
  marca: string;
  modelo: string;
  year: number;  // Propiedad adicional no requerida por la interfaz

  constructor(marca: string, modelo: string, year: number) {
    this.marca = marca;
    this.modelo = modelo;
    this.year = year;
  }

  encender(): void {
    // console.log(`El ${this.marca} ${this.modelo} ha encendido`);
  }

  detener(): void {
    // console.log(`El ${this.marca} ${this.modelo} se ha detenido`);
  }
}

const miCoche = new Coche("Toyota", "Corolla", 2022);

console.log('Implementación de interfaces en clases:');
console.log('- Interface VehiculoInterface: { marca, modelo, encender(), detener() }');
console.log('- Class Coche implements VehiculoInterface');
console.log(`  Propiedades: marca="${miCoche.marca}", modelo="${miCoche.modelo}", year=${miCoche.year}`);
console.log('  Métodos: encender(), detener()');
console.log('');
console.log('Ejecutando método encender():');
miCoche.encender();
console.log('');

// ============================================================================
logSection('Resumen', 'Las interfaces son una herramienta esencial para definir contratos en TypeScript');
console.log('✅ Archivo de interfaces ejecutado correctamente.');
console.log('='.repeat(80) + '\n');
