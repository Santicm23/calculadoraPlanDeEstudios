
const fs = require('fs');


const saveDB = (path, data) => fs.writeFileSync(path, JSON.stringify(data));

const readDB = (path) => {
    if (!fs.existsSync(path))
        return {};
    const objeto = fs.readFileSync(path, {encoding: "utf-8"}); 
    return (objeto === '')? {} :JSON.parse(objeto);
}

const clasesJsonGet = (req, res) => {
    res.json(readDB('./public/json/clases.json'));
}

const clasesJsonPut = (req, res) => {
    const { codigo, semestre, profesor, nota } = req.body;
    const clases = readDB('./public/json/clases.json');

    clases[codigo].semestre = semestre;
    clases[codigo].profesor = profesor;
    clases[codigo].nota = nota;

    saveDB('./public/json/clases.json', clases);
    res.json({msg: 'La información de su clase se guardo correctamente'});
}

const carreraJsonGet = (req, res) => {
    res.json(readDB('./public/json/mi-carrera.json'));
}

const carreraJsonPut = (req, res) => {
    const { codigo } = req.body;
    const clases = readDB('./public/json/clases.json');
    const clase = clases[codigo];

    clase.id = codigo;
    clase.nota = {};
    clase.aprobada = false;

    const carrera = readDB('./public/json/mi-carrera.json');

    (carrera.semestres["1"] === undefined)
        ?carrera.semestres["1"] = [clase]
        :carrera.semestres["1"].push(clase);

    saveDB('./public/json/mi-carrera.json', carrera);
    res.json({msg: 'La información de su clase se guardo correctamente'});
}

const clasesRespaldoJsonGet = (req, res) => {
    res.json(readDB('./database/clases-respaldo.json'));
}


module.exports = {
    clasesJsonGet,
    clasesJsonPut,
    carreraJsonGet,
    carreraJsonPut,
    clasesRespaldoJsonGet
};