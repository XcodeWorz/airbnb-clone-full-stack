import React, { Component } from "react";
import { Carousel } from "antd";
import styled from "styled-components";

const HomeContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(100px, 200px));
  grid-gap: 1rem;
  flex-direction: row;
  box-sizing: border-box;

  .ant-carousel {
    height: 125px;
    position: relative;
    .slick-slider {
      height: inherit;
      .slick-list {
        height: inherit;
        .slick-track {
          height: inherit;
          .slick-slide {
            height: inherit;
            div {
              height: inherit;
              img {
                height: inherit;
                max-height: inherit;
              }
            }
          }
        }
      }
    }
  }
`;

const Card = styled.div`
  position: relative;
  margin: 8px;
`;

const Name = styled.div`
  margin-top: 4px;
  font-size: 14px;
  font-weight: 800;
  color: ${props => props.theme.primaryColor};
`;

const Price = styled.div`
  font-size: 12px;
  color: ${props => props.theme.textColor};
`;

export default class HomeView extends Component {
  render() {
    const { airbnbs, loading } = this.props;
    if (loading) return;
    return (
      <React.Fragment>
        <HomeContainer>
          {airbnbs.map(airbnb => {
            return (
              <Card key={airbnb._id}>
                <Carousel>
                  <img alt="example" src={airbnb.image} />
                  <img alt="example" src={airbnb.image} />
                </Carousel>
                <Name>{airbnb.name}</Name>
                <Price>{airbnb.price}€ per night</Price>
              </Card>
            );
          })}
        </HomeContainer>
      </React.Fragment>
    );
  }
}
