import React from "react";

const SECURITY_CODE = 'paradigma';

const UseReducer = () => {
    const [state, dispatch ] = React.useReducer(reducer, initialState); // El dispatch es la forma en la que vamos a llamar cada reducer, es como un "despachador"
    
    React.useEffect(()=>{
        console.log('Empezando el efecto');
        if(state.loading){
            setTimeout(()=>{
                console.log("Haciendo la validación xd");
                if(state.value === SECURITY_CODE){
                    dispatch({
                        type: actionTypes.confirm,
                    })
                }else{
                    dispatch({
                        type: actionTypes.error
                    });
                }
                console.log("Terminando la validación");
            },1500);
        }
        console.log('Terminando el efecto');
    },[state.loading]);


    if(!state.deleted && !state.confirmed){
        return (
            <div>
                <h3>Eliminar UseReducer</h3>
                <p>Por favor, escriba el código de seguridad.</p>
    
                {(state.error && !state.loading ) && (
                    <p>El código es es incorrecto</p>
                )}
    
                {state.loading && (
                    <p>Cargando ...</p>
                )}
    
                <input 
                    type='text' 
                    placeholder='código de seguridad'
                    value={state.value}
                    onChange={(event)=>{
                        dispatch({
                            type: actionTypes.write,
                            payload: event.target.value, // En este caso el payload son los elementos que vamos a pasarle
                        })
                        // onWrite(event);
                    }
                    }
                />
                <button
                    onClick={()=>{
                        dispatch({
                            type: actionTypes.check
                        });
                    }}
                >Comprobar</button>
            </div>
        );
    }else if(state.confirmed && !state.deleted){
        return(
            <React.Fragment>
                <p>¿Seguro que quieres eliminar UseState?</p>
                <button
                    onClick={()=>{
                        dispatch({
                            type: actionTypes.detele
                        });
                    }}
                >Si, eliminar</button>
                <button
                    onClick={()=>{
                        dispatch({
                            type: actionTypes.reset
                        });
                    }}
                >No, volver</button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con exito</p>
                <button
                    onClick={()=>{
                        dispatch({
                            type: actionTypes.reset
                        });
                    }}
                >Recuperar UseState</button>
            </React.Fragment>
        )
    }
}

const initialState = {
    value:'',
    error:false,
    loading:false,
    deleted: false,
    confirmed: false,
}

const actionTypes = { // Esto lo generamos con le objetivo de no tener errores en el typo de los reducer
    confirm: 'CONFIRM',
    error: 'ERROR',
    write: 'WRITE',
    check: 'CHECK',
    detele: 'DELETE',
    reset: 'RESET'
}

const reducerObject = (state, payload) => ({
    [actionTypes.confirm]:{ 
        ...state,
        error: false, 
        loading: false ,
        confirmed: true,
    },
    [actionTypes.error]: { 
        ...state,
        error: true, 
        loading: false 
    },
    [actionTypes.write]:{ 
        ...state,
        value: payload,
    },
    [actionTypes.check]:{ 
        ...state,
        loading: true 
    },
    [actionTypes.detele]:{
        ...state,
        deleted: true,
    },
    [actionTypes.reset]:{
        ...state,
        confirmed: false,
        deleted: false,
        value:'',
    }
})

 const reducer = (state, action) => {
    return (reducerObject(state, action.payload)[action.type] || state);
};

export default UseReducer;