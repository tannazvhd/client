import React, { useState } from 'react';
import {Container ,Row,Col,Carousel,Card, CardImg,CardFooter,CarouselItem,CarouselControl,CarouselIndicators,CarouselCaption} from 'reactstrap';




const items = [
    {
      src: 'images/img1.jpg',
      route: '',
      altText: 'img1',
      caption: 'img1Caption'
    },
    {
      src: 'images/img2.jpg',
      route: '',
      altText: 'img2',
      caption: 'img2Caption'
    }, 
    {
      src: 'images/img3.jpg',
      route: '',
      altText: 'img3',
      caption: 'img3Caption'
    },
    {
      src: 'images/img4.jpg',
      route: '',
      altText: 'img4',
      caption: 'img4Caption'
    }
    ];

export default class Slider extends React.Component{


    state ={
        letter : '',
        load : false,
        info : '' ,
        list : [],
    
      };


      constructor(props) {
        super(props);
        this.state = {activeIndex: 0};
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    
      }
    
      onExiting() {
        this.animating = true;
      }
    
      onExited() {
        this.animating = false;
      }
    
      next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
      }
    
      previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
      }
    
      goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
      }
    
    
      render() {
    
        const { activeIndex } = this.state;
    
        const slides = items.map((item) => {
          return (
              <CarouselItem
                  onExiting={this.onExiting}
                  onExited={this.onExited}
                  key={item.src}
              >
                {/* <Link to={item.route}><img src={item.src}  className="image" alt={item.altText} /></Link> */}
                <img src={item.src}  className="image" alt={item.altText} />
                <CarouselCaption captionText={item.altText}  captionHeader={item.caption} />
              </CarouselItem>
          );
        });
    
    
    
        return (
            <div className={'block'}>
                
                <Carousel
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
            </div>
        )
      }
    
    }