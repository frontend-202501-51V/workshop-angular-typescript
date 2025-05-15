/**
 * CONCEPTOS BÁSICOS DE CLASES EN TYPESCRIPT
 *
 * Las clases permiten definir plantillas para crear objetos
 * que combinan datos (propiedades) y comportamiento (métodos).
 */

import { logSection } from "../../../utils";

console.log('Ejecutando demo de clases en TypeScript...');

// ============================================================================
// 1. Definición básica de una clase
// ============================================================================

logSection('1. Definición básica de una clase', 'Estructura y elementos básicos de una clase en TypeScript');

// Definición de clase básica
class Producto {
  // Propiedades (atributos)
  nombre: string;
  precio: number;
  disponible: boolean;

  // Constructor: método especial que se ejecuta al crear una instancia
  constructor(nombre: string, precio: number) {
    this.nombre = nombre;
    this.precio = precio;
    this.disponible = true; // no se hace mucho
  }

  // Métodos: funciones que definen el comportamiento
  mostrarInfo(): string {
    return `${this.nombre} - $${this.precio}`;
  }

  cambiarDisponibilidad(estado: boolean): void {
    this.disponible = estado;
  }
}

// Crear una instancia (objeto) a partir de la clase
const producto1 = new Producto("Televisor", 120);

console.log('Instancia de clase Producto:');
console.log(producto1);
console.log(`Información: ${producto1.mostrarInfo()}`);
console.log(`Disponible: ${producto1.disponible}`);

// Cambiar estado
producto1.cambiarDisponibilidad(false);
console.log(`Disponible después del cambio: ${producto1.disponible}`);

// ============================================================================
// 2. Constructor acortado con modificadores de acceso
// ============================================================================

logSection('2. Constructor acortado', 'Simplificar la definición de propiedades usando el constructor');

// La misma clase con sintaxis simplificada
class ProductoSimplificado {
  // Los modificadores de acceso en los parámetros del constructor
  // automáticamente crean e inicializan las propiedades
  constructor(
    // requerido indicar public / private
    public nombre: string,
    public precio: number,
    public disponible: boolean = true
  ) {
    // No es necesario asignar this.propiedad = valor
    // TypeScript lo hace automáticamente
  }

  mostrarInfo(): string {
    return `${this.nombre} - $${this.precio}`;
  }
}

const producto2 = new ProductoSimplificado('Smartphone', 799.99);
console.log('Instancia con constructor simplificado:');
console.log(producto2);
console.log(`Información: ${producto2.mostrarInfo()}`);

// ============================================================================
// 3. Herencia de clases
// ============================================================================

// logSection('3. Herencia de clases', 'Extender una clase base para crear clases especializadas');

// Clase base (padre)
class Vehiculo {
  constructor(
    public marca: string,
    public modelo: string,
    public año: number
  ) { }

  mostrarDetalles(): string {
    return `${this.marca} ${this.modelo} (${this.año})`;
  }

  arrancar(): void {
    console.log(`El ${this.marca} ${this.modelo} ha arrancado.`);
  }
}

// Clase derivada (hija) - hereda de Vehiculo
class Coche extends Vehiculo {
  constructor(
    marca: string,
    modelo: string,
    año: number,
    public numeroPuertas: number
  ) {
    // super() llama al constructor de la clase padre
    super(marca, modelo, año); // para construir la clase padre
  }

  // Sobrescribir un método de la clase padre
  mostrarDetalles(): string {
    // Llamada al método de la clase padre
    const detallesBase = super.mostrarDetalles();
    return `${detallesBase} - ${this.numeroPuertas} puertas`;
  }

  // Método específico de la clase Coche
  abrirMaletero(): void {
    console.log('Maletero abierto.');
  }
}

const vehiculo = new Vehiculo('Honda', 'Civic', 2022);
console.log('Instancia de Vehiculo:');
console.log(vehiculo.mostrarDetalles());

const miCoche = new Coche('Toyota', 'Corolla', 2023, 4);
console.log('\nInstancia de Coche (clase derivada):');
console.log(miCoche.mostrarDetalles());
miCoche.arrancar(); // Método heredado
miCoche.abrirMaletero(); // Método específico

// ============================================================================
// 4. Miembros estáticos (static)
// ============================================================================

logSection('4. Metodos estáticos', 'Propiedades y métodos que pertenecen a la clase, no a instancias');

// llamar directamente a la clase sin necesidad de instanciar

// Calculadora.sumar(1,2) -> .sumar sería el metodo estatico
// sin metodo estatico seria: const calculadora = new Calculadora(); calculadora.sumar(1,2)
// console.log(Calculadora.PI) // imprimir PI
// NO se puede usar Calculadora.areaCirculo(12); necesita instanciar para usarlo

class Calculadora {
  // Propiedad estática - pertenece a la clase, no a las instancias
  static PI: number = 3.14159;

  // Propiedad de instancia
  public ultimoResultado: number = 0;

  // Método estático - se llama en la clase, no en las instancias
  static sumar(a: number, b: number): number {
    return a + b;
  }

  // Método de instancia
  areaCirculo(radio: number): number {
    // Podemos acceder a la propiedad estática usando la clase
    this.ultimoResultado = Calculadora.PI * radio * radio;
    return this.ultimoResultado;
  }
}

// No necesitamos crear una instancia para usar miembros estáticos
console.log(`Valor de PI: ${Calculadora.PI}`);
console.log(`Suma estática: ${Calculadora.sumar(5, 3)}`);

// Para métodos no estáticos, necesitamos crear una instancia
const calc = new Calculadora();
console.log(`Área de círculo con radio 5: ${calc.areaCirculo(5)}`);
console.log(`Último resultado: ${calc.ultimoResultado}`);

// ============================================================================
// 5. Getters y Setters
// ============================================================================

logSection('5. Getters y Setters', 'Métodos especiales para acceder o modificar propiedades');

class Cuenta {
  // _saldo es un atributo de la clase que inicia con _
  private _saldo: number;

  constructor(saldoInicial: number = 0) {
    this._saldo = saldoInicial;
  }

  // cuando quiera obtener Cuenta.saldo se ejecutaria este metodo -> get saldo()
  // console.log(new Cuenta().saldo)

  // Getter - accede a la propiedad como si fuera pública
  get saldo(): number {
    console.log('Getter de saldo llamado');
    return this._saldo;
  }

  // cuenta.saldo = 34; // con setter
  // cuenta.saldo(34); // si fuese una funcion

  // Setter - permite establecer el valor con validación
  set saldo(nuevoSaldo: number) {
    console.log('Setter de saldo llamado');
    if (nuevoSaldo < 0) {
      throw new Error('El saldo no puede ser negativo');
    }
    this._saldo = nuevoSaldo;
  }

  // Métodos tradicionales
  depositar(monto: number): void {
    if (monto <= 0) {
      throw new Error('El monto debe ser positivo');
    }
    this._saldo += monto;
  }

  retirar(monto: number): boolean {
    if (monto <= 0) {
      throw new Error('El monto debe ser positivo');
    }
    if (monto > this._saldo) {
      return false; // Fondos insuficientes
    }
    this._saldo -= monto;
    return true;
  }
}

const miCuenta = new Cuenta(1000);

// Usar getter
console.log(`Saldo actual: $${miCuenta.saldo}`);

// Usar setter
miCuenta.saldo = 1500;
console.log(`Nuevo saldo: $${miCuenta.saldo}`);

// Usar métodos
miCuenta.depositar(500);
console.log(`Saldo después de depósito: $${miCuenta.saldo}`);

const retiroExitoso = miCuenta.retirar(800);
console.log(`Retiro ${retiroExitoso ? 'exitoso' : 'fallido'}`);
console.log(`Saldo final: $${miCuenta.saldo}`);

// ============================================================================
// 6. Clases abstractas
// ============================================================================

logSection('6. Clases abstractas', 'Clases que no pueden ser instanciadas directamente');

// Clase abstracta - sirve como plantilla, no puede ser instanciada
abstract class Forma {
  constructor(protected color: string) { }

  // Método concreto - implementación compartida
  obtenerColor(): string {
    return this.color;
  }

  // Método abstracto - debe ser implementado por las clases derivadas
  abstract calcularArea(): number;

  // Método abstracto con parámetros
  abstract redimensionar(factor: number): void;
}

// Clase concreta que implementa la clase abstracta
class Rectangulo extends Forma {
  constructor(
    color: string,
    private ancho: number,
    private alto: number
  ) {
    super(color);
  }

  // Implementación del método abstracto
  calcularArea(): number {
    return this.ancho * this.alto;
  }

  redimensionar(factor: number): void {
    this.ancho *= factor;
    this.alto *= factor;
  }
}

class Circulo extends Forma {
  constructor(
    color: string,
    private radio: number
  ) {
    super(color);
  }

  calcularArea(): number {
    return Math.PI * this.radio * this.radio;
  }

  redimensionar(factor: number): void {
    this.radio *= factor;
  }
}

// No podemos instanciar una clase abstracta
const forma = new Forma('rojo'); // Esto daría error

const rectangulo = new Rectangulo('azul', 10, 5);
console.log(`Color del rectángulo: ${rectangulo.obtenerColor()}`);
console.log(`Área del rectángulo: ${rectangulo.calcularArea()}`);

rectangulo.redimensionar(2);
console.log(`Área después de redimensionar: ${rectangulo.calcularArea()}`);

const circulo = new Circulo('verde', 7);
console.log(`\nÁrea del círculo: ${circulo.calcularArea().toFixed(2)}`);

circulo.redimensionar(0.5);
console.log(`Área después de reducir: ${circulo.calcularArea().toFixed(2)}`);

// ============================================================================
// 7. Implementación de interfaces
// ============================================================================

logSection('7. Implementación de interfaces', 'Clases que implementan contratos definidos por interfaces');

// Definir una interfaz
interface Reproducible {
  reproducir(): void;
  pausar(): void;
  detener(): void;
  duracion: number;
}

// Clase que implementa la interfaz
class ReproductorAudio implements Reproducible {
  private _enReproduccion: boolean = false;

  constructor(
    public archivo: string,
    public duracion: number
  ) { }

  reproducir(): void {
    this._enReproduccion = true;
    console.log(`Reproduciendo: ${this.archivo}`);
  }

  pausar(): void {
    this._enReproduccion = false;
    console.log(`Pausado: ${this.archivo}`);
  }

  detener(): void {
    this._enReproduccion = false;
    console.log(`Detenido: ${this.archivo}`);
  }

  // Método adicional, no requerido por la interfaz
  estaReproduciendo(): boolean {
    return this._enReproduccion;
  }
}

// Otra clase que implementa la misma interfaz
class ReproductorVideo implements Reproducible {
  constructor(
    public archivo: string,
    public duracion: number,
    public resolucion: string
  ) { }

  reproducir(): void {
    console.log(`Reproduciendo video: ${this.archivo} (${this.resolucion})`);
  }

  pausar(): void {
    console.log(`Video pausado: ${this.archivo}`);
  }

  detener(): void {
    console.log(`Video detenido: ${this.archivo}`);
  }
}

// Podemos tratar diferentes clases de manera uniforme a través de su interfaz
function reproducirContenido(contenido: Reproducible): void {
  contenido.reproducir();
  console.log(`Duración: ${contenido.duracion} segundos`);

  // Simular reproducción
  setTimeout(() => {
    contenido.detener();
  }, 1000);
}

const cancion = new ReproductorAudio('musica.mp3', 180);
const pelicula = new ReproductorVideo('pelicula.mp4', 7200, '1080p');

console.log('Reproducir audio:');
reproducirContenido(cancion);

console.log('\nReproducir video:');
reproducirContenido(pelicula);

// ============================================================================
// logSection('Resumen', 'Las clases en TypeScript proporcionan una forma estructurada de organizar código y datos.');
console.log('\n\n✅ Archivo de conceptos de clases ejecutado correctamente.');
console.log('='.repeat(80) + '\n');
