import { useEffect, useReducer } from "react";

const KEY_VALUE = "usereducer";

export default function UseReducer2() {
  const InitialState = {
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  };

  //Reducer
  const actionTypes = {
    error: "ERROR",
    write: "WRITE",
    check: "CHECK",
    confirm: "CONFIRM",
    delete: "DELETE",
    reset: "RESET",
  };
  const reducerObjt = (state, payload) => ({
    [actionTypes.error]: {
      ...state,
      error: true,
      loading: false,
    },
    [actionTypes.write]: {
      ...state,
      value: payload,
    },
    [actionTypes.check]: {
      ...state,
      loading: true,
    },
    [actionTypes.confirm]: {
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    },
    [actionTypes.delete]: {
      ...state,
      deleted: true,
    },
    [actionTypes.reset]: {
      ...state,
      deleted: false,
      confirmed: false,
      value: "",
    },
  });
  const reducer = (state, action) => {
    const type = reducerObjt(state, action.payload)[action.type];
    if (type) return type;
    return state;
  };
  //Reducer State
  const [state, dispatch] = useReducer(reducer, InitialState);
  //Action creators
  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onError = () => dispatch({ type: actionTypes.error });
  const onWrite = (newValue) => dispatch({ type: actionTypes.write, payload: newValue });
  const onCheck = () => dispatch({ type: actionTypes.check });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onReset = () => dispatch({ type: actionTypes.reset });
  
  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value === KEY_VALUE) {
          onConfirm();
        } else {
          onError();
        }
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loading]);

  //Components
  const WriteCodigo = (
    <>
      <h2 className="font-semibold text-2xl text-center text-[#111646]">Eliminar UseReducer</h2>
      {state.loading && <p className="text-[blue] text-center text-1xl m-2">Cargando ...</p>}
      {!state.loading && <p className="mt-2 text-1xl">Por favor, escribe el código de seguridad.</p>}
      {state.error && !state.loading && (
        <p className="text-[red] text-center text-1xl m-2">El código es es incorrecto</p>
      )}
      <div className="mt-3">
        <input
          placeholder="Código de seguridad"
          value={state.value}
          onChange={(e) => onWrite(e.target.value)}
          className="border-[.1vw] border-[#5f5e5e] p-1"
        />
        <button 
          type="button" 
          onClick={() => onCheck()}
          className="ml-2 bg-green-500 text-white text-center p-1 rounded-md font-semibold"
        >
          Comprobar
        </button>
      </div>
    </>
  );
  const Confirmed = (
    <>
      <p className="font-semibold text-2xl text-center text-[#111646]">Pedimos confirmación, ¿Estas Seguro?</p>
      <div className='flex items-center justify-around mt-3'>
        <button 
          type="button" 
          onClick={() => onDelete()}
          className="bg-red-500 text-white text-center p-1 rounded-md font-semibold"
        >
          Sí 😬, Eliminalo ❌
        </button>
        <button 
          type="button" 
          onClick={() => onReset()}
          className="bg-gray-500 text-white text-center p-1 rounded-md font-semibold"
        >
          Ummm 🤔, mejor ya no 😅
        </button>
      </div>
    </>
  );
  const DeletedSucces = (
    <>
      <p className="font-semibold text-2xl text-center text-[#111646]">Eliminado con Exito</p>
      <div className='flex justify-center mt-2'>
        <button 
          type="button" 
          onClick={() => onReset()}
          className="bg-gray-500 text-white text-center p-1 rounded-md font-semibold"
        >
          Resetear 🔂, Volcer atrás 👈
        </button>
      </div>
    </>
  );

  return (
    <div className="content-state">
      {!state.deleted && !state.confirmed && WriteCodigo}
      {!!state.confirmed && !state.deleted && Confirmed}
      {state.deleted && DeletedSucces}
    </div>
  );
}