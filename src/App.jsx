import './App.css'

//Components
import UseState from './UseState'
import ClassState from './ClassState'
import UseReducer2 from './UseReducer2'
// import UseReducer from './UseReducer'

function App() {

  return (
    <div className="w-[100vw] h-[100vh] flex-col justify-between p-5">
      <div className="h-[33%] grid place-content-center">
        <UseState />
      </div>
      <div className="h-[33%] grid place-content-center">
        <ClassState />
      </div>
      <div className="h-[33%] grid place-content-center">
        <UseReducer2 />
      </div>
    </div>
  )
}

export default App
