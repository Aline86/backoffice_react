import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import $ from "jquery"
import axios from 'axios';

class NbCours extends React.Component{
  constructor(props){
    super(props);
    this.state={
      cours:""
    }
    this.handleSubmit=this.handleSubmit.bind(this)
    this.coursupdate=this.coursupdate.bind(this)
  }
  coursupdate(cours, data) {
    const {id}=this.props
    return fetch('http://localhost:80/react-app/mon-app/src/cours.php?nbcours='+cours+'&id='+id, {
      method: 'PUT',
      headers: {
        "Authorization": "Bearer " + this.props.token,
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(this.buildList)
    .catch() 
  }
  handleSubmit(e){
    e.preventDefault()
    const target=e.target
    const value=target.value
    const name=target.name
    this.setState({[name]: value})
    this.coursupdate(value)
  }
  render(){
    const {cours}=this.state
    return(
      <>
      <form>
        <input class="input" type="submit" name={cours} value="+1" onClick={this.handleSubmit} />
        <input class="input" type="submit" name={cours} value="-1" onClick={this.handleSubmit} />
      </form>
      </>
    )
  }
}
class SelectLevel extends React.Component{
  constructor(props){
    super(props);
    this.state={
      level: "",
      id: "",
      rightlevel: [],
      idlevel:""
    }
    this.handleChange=this.handleChange.bind(this)
    this.updateLevel=this.updateLevel.bind(this)
    this.buildList=this.buildList.bind(this)
  }
  buildList=(data)=>{
  
    this.setState({rightlevel: data})
    this.state.rightlevel.map((level, index)=>  
    {
      this.setState({idlevel: level.libelle_niveau})}
    )
    console.log(data)
  }
  componentDidMount(){
   
    const {level} = this.props
    console.log(level)
    return fetch('http://localhost:80/react-app/mon-app/src/getlevel.php?level=' + level,
    {
      method: 'GET',
    })
    .then(response => response.json())
      
      .then(this.buildList)
      .catch()
  }
  updateLevel(level, data) {
    
    const {id}=this.props
    
    if(this.props.niveau_1){

    return fetch('http://localhost:80/react-app/mon-app/src/level.php?id='+id+'&level=' + level+'&niveau='+1, {
      method: 'PUT',
      headers: {
        "Authorization": "Bearer " + this.props.token,
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(this.buildList)
    .catch()
  }
  if(this.props.niveau_2){

    return fetch('http://localhost:80/react-app/mon-app/src/level.php?id='+id+'&level=' + level+'&niveau='+2, {
      method: 'PUT',
      headers: {
        "Authorization": "Bearer " + this.props.token,
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(this.buildList)
    .catch()
  }
}
  handleChange(e){
    const {level}=this.state
    const thelevel=e.target.value
    console.log(thelevel)
    this.setState({[level]:thelevel})
    this.updateLevel(parseInt(thelevel) )
    .then()
    .catch((err) => {
        console.error('err', err);
    });
  }
  
  render(){
    const {level}=this.state
    const {rightlevel}=this.state
    console.log(rightlevel.length)
    
    return(
      <form onSubmit={this.handleSubmit}>
      <select name={level} onClick={this.handleChange} >
      <option value="0">{this.state.idlevel}</option>
        <option value="1">Italien_débutant</option>
        <option value="2">Italien_intermédiaire</option>
        <option value="3">Italien_avancé</option>
        <option value="4">Français_débutant</option>
        <option value="5">Français_intermédiaire</option>
        <option value="6">Français_avancé</option>
        <option value="10">test</option>
      </select>
      </form>
    )
  }
}

class SearchName extends React.Component{
  constructor(props){
    super(props);
    this.state={
      names: [],
      student: "",
      error: null,
      levelfilter: "",
      filterDropDown:[],
      message:"", 
    
    }
    this.handleChange=this.handleChange.bind(this)
    this.buildList=this.buildList.bind(this)
    this.handlelevelChange=this.handlelevelChange.bind(this)
 
  }
  reset=()=>{
    const url='http://localhost:80/react-app/mon-app/src/autocompletion.php'
    fetch(url)
      .then(response => response.json())
      .then(this.buildList)
      .catch()
      this.setState({message: "Il n'y a pas d'étudiant de ce niveau"})
  }
  follow=(level)=>{
    const url='http://localhost:80/react-app/mon-app/src/autocompletion.php'
    fetch(url)
      .then(response => response.json())
      .then(this.updateLevel)
      .catch()
      
  }
  updateLevel=(data)=>{
    console.log(data)
   
    const {names, levels, message}=this.state
    console.log(levels)
    const thestudents=data.filter(function(result){
      
      if(result.niveau_1===levels || result.niveau_2===levels){
        return result
       
      }else{
        return ''
      }
    })   
    this.setState({names: thestudents})
    console.log(names)
    this.setState({message: ""})
  }
  searchLevel=(level)=>{
    const {names, message}=this.state
    const levels= level
    this.setState({levels: level})
    const students=names.filter(function(result){
      if(result.niveau_1===level || result.niveau_2===level){
        return result
      }  
    }) 
    if (students.length==0){
      this.reset(level)
    }
    if(students.length>=1){
      this.follow(level)
    }
   this.setState({names: students})
   this.setState({[message]: ""})
}
  handlelevelChange(e){  
    const value=e.currentTarget.value 
    this.searchLevel(value) 
  }

 buildList=(data)=>{
    this.setState({names: data})
  }
  componentDidMount(){  
    const url='http://localhost:80/react-app/mon-app/src/autocompletion.php'
    fetch(url)
      .then(response => response.json())
      .then(this.buildList)
      .catch()   
  }
  
  handleChange(e){
    const target=e.target
    const value=target.value
    const name=target.name
    this.setState({[name]: value}) 
  }
  
  render(){
    const {names, student, message}=this.state 
    return(
      <div class="container">
      <form class="form" >
        <input class="studentinput" name="student" value={student} onChange={this.handleChange} />
        <select class="studentinput"  name="studentfilter" onChange={this.handlelevelChange}>
          <option>filtrer par niveau</option>
          <option value="1">Italien débutant</option>
          <option value="2">Italien intermédiaire</option>
          <option value="3">Italien avancé</option>
          <option value="4">Français débutant</option>
          <option value="5">Français intermédiaire</option>
          <option value="6">Français avancé</option>
          <option value="10">test</option>
        </select>
        <input type="submit" value="Valider les modifications"/>
      </form>
      <span>{message}</span>
      <table class="table">{this.state.names.length >0 &&
      names.map((name, index)=>
        {
      if(student.toUpperCase()===name.nom_eleve.substring(0, student.length).toUpperCase()){  
               return<tbody key={index}><tr key={name.id_eleve} >
                 <td class="name">{name.nom_eleve}</td>
                 <td><SelectLevel niveau_1={1} level={name.niveau_1} id={name.id_eleve} onClick={this.handleClick}/></td>
                 <td><SelectLevel niveau_2={2} level={name.niveau_2} id={name.id_eleve} onClick={this.handleClick}/></td>
                 <td><NbCours id={name.id_eleve} /></td>
                 <td>cours restants: {name.nb_cours}</td>
                 </tr></tbody>
            
            }else {
                return ''
               }
              }
            )}
        </table>                
      </div>
    )
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<SearchName />, rootElement);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
