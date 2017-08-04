import React from 'react'
import * as util from '../../lib/util.js'

class PhotoForm extends React.Component {
  constructor(props){
    super(props)
    this.state = props.photo 
      ? props.photo 
      : {description: '' , preview: '', photo: null}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    let {name} = e.target
    if(name == 'description'){
      this.setState({description: e.target.value})
    }
    if(name == 'photo'){
      let {files} = e.target
      let photo = files[0]
      this.setState({photo})
      util.photoToDataURL(photo)
      .then(preview => this.setState({preview}))
      .catch(console.error)
    }

  }

  handleSubmit(e){
    e.preventDefault()
    return this.props.onComplete(this.state)
  }

  render(){
    return (
      <form 
        className='photo-form'
        onSubmit={this.handleSubmit}>
        <img src={this.state.preview || this.state.url || ''} />
        <input
          name='photo'
          type='file'
          onChange={this.handleChange}
          />

        <input
          name='description'
          type='text'
          value={this.state.description}
          onChange={this.handleChange}
          />
        <button type='submit'> {this.props.buttonText} </button>
      </form>
    )
  }
}

export default PhotoForm
