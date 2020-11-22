import React,{Component} from 'react'


export default class SerchForm extends Component{
    state={
        inputValue:''
    }


    handlerInput=(e)=>{
        this.setState({
            inputValue:e.target.value
        })
    }

    handlerSubmit=(e)=>{
        e.preventDefault()
        this.props.onSerch(this.state.inputValue)
        this.setState({
            inputValue:''
        })
    }

    render(){
        return(
            <form onSubmit={this.handlerSubmit}>
                <label>
                    Enter value
                <input type="text" value={this.state.inputValue} onChange={this.handlerInput}/>
                </label>
                <button type='submit'>Serch</button>
            </form>
        )
    }
}