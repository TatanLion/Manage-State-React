const [ state, setState ] = useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
})

// Forma base de crear los reducer
// const reducer = (state, action) => {

// }

// Forma de crear un reducer con un if
const reducerIf = (state, action) => {
    if(action.type === 'ERROR'){ // Aquí se valida el tipo de action que mandan los usuarios
        return {
            ...state,
            error: true,
            loading: false
        }
    }
    else if(action.type === 'CHECK'){
        return {
            ...state,
            loading: true
        }
    }
    else{
        return{
            ...state
        }
    }
}


// Forma de crear un reducer con un switch
const reducerSwitch = (state, action) => {
    switch(action.type){
        case 'ERROR': {
            return {
                ...state,
                error: true,
                loading: false
            } // En este caso no se usa break ya que el return cumple la misma función
        }
        case 'CHECK': {
            return {
                ...state,
                loading: true
            } // En este caso no se usa break ya que el return cumple la misma función
        }
        default:
            return {
                ...state
            }
    }
}


// Forma de crear los reducer con un objeto, para este case se puede dividir el reducer en 2
const reducerObject = (state) => ({ // Al usar parentesis antes de las llaves estamos mandando return por defecto
    'ERROR': {
        ...state,
        error: true,
        loading: false
    },
    'CHECK': {
        ...state,
        loading: true
    }
})

// Valida si el action que le pasamos existe dentro del reducer de los objetos
const validateReducer = (state, action) => {
    // Comparamos el action y devolvemos si coincide
    if(reducerObject(state)[action.type]) return reducerObject(state)[action.type]
    // Devolvemos el estado inicial si no coincide el action
    else return state
}
