const fs = require('fs');

let listadoPorHacer = [];

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, err => {
        if (err)
            throw new Error('No se pudo guardar .json');
    });

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: "false"
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}

const getListado = (completado = 'todo') => {

    cargarDB();
    if (completado != 'todo') {
        return listadoPorHacer.filter(tarea => tarea.completado == completado);
    }

    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= -1) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {

    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (nuevoListado.length < listadoPorHacer.length) {

        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}