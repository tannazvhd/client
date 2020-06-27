import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios'


export default class ProfileUpdate extends Component{
    constructor() {
        super()
        this.state = {
            username:'',
            email: '',
            image:'images/Propic1.png',
            password:''
        }
    }

    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            username: decoded.identity.username,
            email: decoded.identity.email
        })
    }
    change= e=>{
        this.setState({
          [e.target.name]:e.target.value
           })
          }

    onClick(){
    
        axios({
            url: 'http://localhost:3000/users/update',
            method: 'POST',
            headers:{
                authorization:'usertoken'
            },
            data:{
                "username":this.state.username,
                "email":this.state.email,
                "password":this.state.password
            }
              
        }).then(response => {
            this.setState({
                "email":response.data.email,
                "username":response.data.username,
                "password":response.data.password

            })
            console.log(this.state)
            console.log("updated")
        })

        console.log('you clicked me')
    }

    render() {
        return (
            <div>
                <div className="col-sm-8 mx-auto">
                    <h1 className="text-center">PROFILE</h1>
                </div>

                <div className="col-sm-8 mx-auto">
                    <img src={this.state.image} style={{ width:'15%',height:'auto', border:'solid 1px lightgrey'}} title={this.state.username}/> 
                </div>  
                <br></br>  

                <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>
                                <Input type="username" name="newEmail" id="newEmail" placeholder={this.state.username} onChange={this.change} />
                            </td>                            </tr>
                            <tr>
                            <td>Email</td>
                                <td>{this.state.email} </td>
                           
                            </tr>
                            <tr>
                            <td>Password</td>
                            <td>
                                <Input type="password" name="newPassword" id="newPassword" placeholder="new password" onChange={this.change}/>                        </td>
                            </tr>
                            <tr>
                            <td>Confirm Password</td>
                            <td>
                                <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="confirm password" />                        </td>
                            </tr>
                            <tr>
                            <td></td>
                            <td>
                               {/* <Button outline color="secondary" size="sm" onClick={this.props.clickMe}>update</Button>*/}
                                <Button outline color="secondary" size="sm" onClick={this.onClick} >update</Button>

                            </td>
                            </tr>
                        

                        </tbody>
                    </table>
                  </div>
        )
    }
}