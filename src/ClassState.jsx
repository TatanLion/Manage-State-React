import React from 'react'

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            error: false,
            loading: false,
            value: ''
        }
    }

    // Lo primero que se ejecutara
    // UNSAFE_componentWillMount (){ 
    //     console.log('ComponentWillMount');
    // }
    // componentWillUnmount(){
    //     console.log('ComponentWillUnmount');
    // }
    // componentDidMount(){
    //     console.log('ComponentDidMount');
    // }
    componentDidUpdate(){
        console.log('Actualización');
        if(this.state.loading){
            setTimeout(() => {
                if(SECURITY_CODE === this.state.value){
                    this.setState({error: false, loading: false})
                }else{
                    this.setState({ error: true, loading: false})
                }
            }, 3000)
        }
    }
  
    render(){
    return(
        <>
            <h2 className="font-semibold text-2xl text-center text-[#111646]">Eliminar ClassState</h2>
            <p className="mt-2 text-1xl">Por favor, escribe el código de seguridad.</p>
            {(this.state.error && !this.state.loading) && (
                <p className="text-[red] text-center text-1xl m-2">Error: El código es incorrecto</p>
            )}
            {this.state.loading && (
                <p className="text-[blue] text-center text-1xl m-2">Cargando...</p>
            )}
            <div className="mt-3">
                <input 
                    type="text" 
                    placeholder="Código de Seguridad"
                    className="border-[.1vw] border-[#5f5e5e] p-1"
                    value={this.state.value}
                    onChange={(e) => {this.setState({value: e.target.value})}}
                />
                <button
                    onClick={() => this.setState({loading: !this.state.loading})}
                    className="ml-2 bg-green-500 text-white text-center p-1 rounded-md font-semibold"
                >Comprobar</button>
            </div>
        </>
    )
  }
}

export default ClassState