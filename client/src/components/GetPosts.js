import React, { Component } from 'react'
import axios from 'axios'
import like from '../assets/images/like.png';
import dislike from '../assets/images/dislike.png';
import download from '../assets/images/download.png';

import jwt_decode from 'jwt-decode';
import {Container, Row, Col} from "reactstrap";
import {  Button, FormGroup, Form, Input } from 'reactstrap';



export default class GetPosts extends Component {

    constructor() {
        super()
        this.state = {
           'email':'',
           'username':'',
           'title':'',
           'content':'',
           'category':'',
           'image':'images/Propic1.png',
           'file':'',
           //'created':'',
            posts:[],
            'like':'',
            'dislike':'',
            'idLikedPost':'',
            'idDislikedPost':''
        

        }
        this.getFile=this.getFile.bind(this)
        this.getFile=this.displayBlogPost.bind(this)

      }



    plusLike = (e) => {

      axios({
        url: 'http://localhost:3000/plusLike', 
        method: 'POST',
        data:{
          "id": e.$oid
        } 
      }).then((response) => {
        console.log(response.data);
        // console.log(this.state.idLikedPost);

      });        
    } 

    plusDisLike = (e) => {

        axios({
          url: 'http://localhost:3000/plusDislike', 
          method: 'POST',
          data:{
            "id": e.$oid
          } 
        }).then((response) => {
          console.log(response.data);
          // console.log(this.state.idDislikedPost);

        });

    } 

        componentDidMount () {
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)
            this.setState({
                email: decoded.identity.email,
                username:decoded.identity.username
            })
        }
        componentDidMount = ()=>{
          this.getAllPost();
        }
            

        getAllPost = () => {
            axios.get('http://localhost:3000/users/posts')
            .then((response) => {
              const data = response.data;
              this.setState({posts:data})
              console.log('Data has been received!');
            })
            .catch(()=>{
              alert('Error retrieving data!!');
          });
        }



    

      displayBlogPost = (posts)=> {

        if(!posts.length) return <h6>There is not any Post yet</h6>;


        return posts.map((posts) => (


          <Col md="6" sm="12">
              <div className=" jumbotron mt-5">
                <div className="row">
                  <div className="col-sm-3">
                    <img src={this.state.image} style={{"width": "50px","height":"auto"}}/>
                  </div>

                  <div className="col-sm-8">
                    <a className="mt-2 ml-2" href="/profile">{posts.username}</a>
                    <small className="text-muted mx-3">date</small>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-7">
                    <h2 className="text-left ml-3">{posts.title}</h2>
                  </div>
                  <div className="col-sm-1">
                    <img src={like} className="like" title="like" onClick={()=>this.plusLike(posts._id)}/>
                  </div>
                  <div className="col-sm-1">
                    <img src={dislike} className="dislike" title="dislike" onClick={()=>this.plusDisLike(posts._id)}/>
                  </div>
                </div>
                <p className=" text-left ml-3" style={{"word-wrap": "break-word"}} >{posts.category}</p>
                <p className=" text-left ml-3" style={{"word-wrap": "break-word"}} >{posts.content}</p>

                <div className="row my-4 justify-content-start">
                <div className="col-sm-1">
                    <img src={download} className="downloadImg" onClick={(e)=>this.getFile(e)} title="download"/>
                  </div>
                  <div className="col-sm-3">
                    <h6 className="downloadTitle">
                      {posts.file}
                    </h6>
                  </div>
                </div>

                <div className="row postBox mx-0 ">
                  <div className="row">
                      <div className="col-sm-8">
                        <a className="mt-2 ml-2 small" href="/profile">{this.state.username}</a>
                        <small className="text-muted mx-3">Date</small>
                      </div>
                  </div>
                  <div className="row col-sm-12" >
                    <p className=" text-left ml-3" style={{"word-wrap": "break-word"}} >Sample comment1</p>
                    <div className="divider"></div>
                  </div>

                  <div className="row col-sm-12 py-2 mx-0" >
                    <Form inline>
                      <FormGroup>
                        <Input type="textarea" name="text" id="NewComment" placeholder="New Comment"/>
                      </FormGroup>
                      <Button className="ml-1" color="secondary" size="sm">send</Button>
                    </Form>
                  </div>

                </div>
              </div>
            </Col>


            ));
    }
       
    getFile=(e) => {
      console.log('hallo download')

      axios({
        url: 'http://localhost:3000/file', //your url
        method: 'POST',
        responseType: 'blob',
        data:{
          "file": 'dod.pdf'//posts.file
        } // important
      }).then((response) => {
         const url = window.URL.createObjectURL(new Blob([response.data]));
         const link = document.createElement('a');
         link.href = url;
         link.setAttribute('download','dod.pdf'); //or any other extension
         document.body.appendChild(link);
         link.click();
      });


  }

 



    render() {
        console.log('State',this.state);
        return (
              <Container>

                <Row className="blog mt-5">
                  {this.displayBlogPost(this.state.posts)}
                </Row>
             </Container>

                
                
                    

        )
    }
}


