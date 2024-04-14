import { useEffect, useState } from 'react'

const SECURITY_CODE = 'paradigma';

const UseState = () => {

    const [ state, setState ] = useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    })

    // const [ value, setValue ] = useState('')
    // const [ error, setError ] = useState(false)
    // const [ loading, setLoading ] = useState(false)

    console.log(state.value);

    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
            deleted: false
        })
    }

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false
        })
    }

    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue
        })
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true
        })
    }

    const onDelete = () => {
        setState({
            ...state,
            deleted: true
        })
    }

    const onReset = () => {
        setState({
            ...state,
            value: '',
            confirmed: false,
            deleted: false
        })
    }

    useEffect(() => {
        if(state.loading){
            setState({
                ...state,
                error: false
            })
            setTimeout(() => {
                if(state.value.toLowerCase() === SECURITY_CODE){
                    onConfirm()
                }else{
                    onError()
                }
            }, 2000)
        }
    }, [state.loading])

    if(!state.confirmed && !state.deleted){
        return(
            <div>
                <h2 className="font-semibold text-2xl text-center text-[#111646]">Eliminar UseState</h2>
                <p className="mt-2 text-1xl">Por favor, escribe el código de seguridad.</p>
                {(state.error && !state.loading) && (
                    <p className="text-[red] text-center text-1xl m-2">Error: El código es incorrecto</p>
                )}
                {state.loading && (
                    <p className="text-[blue] text-center text-1xl m-2">Cargando...</p>
                )}
                <div className='mt-3'>
                    <input 
                        type="text" 
                        placeholder="Código de Seguridad" 
                        value={state.value}
                        className="border-[.1vw] border-[#5f5e5e] p-1"
                        onChange={(e) => {
                            onWrite(e.target.value)
                        }}
                    />
                    <button
                        className="ml-2 bg-green-500 text-white text-center p-1 rounded-md font-semibold"
                        onClick={() => {
                            onCheck()
                        }}
                    >
                        Comprobar
                    </button>
                </div>
            </div>
        )
    }
    else if(state.confirmed && !state.deleted){
        return(
            <div>
                <h1 className="font-semibold text-2xl text-center text-[#111646]">Eliminar UseState</h1>
                <p className="mt-2 text-1xl">¿Seguro que quieres eliminar el UseState?</p>
                <div className='flex items-center justify-around mt-3'>
                    <button
                        onClick={() => {
                            onDelete()
                        }}
                        className="bg-red-500 text-white text-center p-1 rounded-md font-semibold"
                    >Sí, eliminar</button>
                    <button
                        onClick={() => {
                            onReset()
                        }}
                        className="bg-gray-500 text-white text-center p-1 rounded-md font-semibold"
                    >No, volver</button>
                </div>
            </div>
        )
    }
    else{
        return(
            <div>
                <h1 className="font-semibold text-2xl text-center text-[#111646]" >Eliminado con éxito</h1>
                <div className='flex justify-center mt-2'>
                    <button
                        onClick={() => {
                            onReset()
                        }}
                        className="bg-gray-500 text-white text-center p-1 rounded-md font-semibold"
                    >
                        Volver atras
                    </button>
                </div>
            </div>
        )
    }
}

export default UseState