const mysql = require('mysql2');

// Configuración de la conexión
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Cambia según tu configuración
    password: '',  // Cambia según tu configuración
    database: 'gestion_gastos'
});

// Verificar la conexión
conexion.connect((error) => {
    if (error) {
        console.error("Error al conectar con la base de datos:", error);
        process.exit(1); // Finaliza la ejecución si hay error
    }
    console.log("Conexión exitosa a la base de datos");
});

module.exports = conexion;
