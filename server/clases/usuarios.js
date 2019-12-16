
class Usuarios {
    constructor(){
        this.personas = [];
    }

    agregarPersona(id, nombre, sala){

        let persona = { id, nombre, sala };

        this.personas.push(persona);

        return this.personas;

    }

    getPersona (id){
        let persona = this.personas.filter( (persona) => {
            return persona.id === id;
        })[0]; // [0] devuelve un array y solo queremos la primera persona 
        console.log(this.personas.filter( (persona) => {
            console.log(persona.id);
            console.log(id);
            return persona.id === id;
        }));
        return persona;
    }

    getPersonas () {
        return this.personas;
    }

    getPersonasPorSala( sala ) {
        // 

        let personasEnsala = this.personas.filter( (persona) => {
            return persona.sala === sala
        });

        return personasEnsala;
    }

    borrarPersona (id){

        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter ( (persona) => {
            return persona.id != id
        })

        return personaBorrada;
    }
}

module.exports = { Usuarios };