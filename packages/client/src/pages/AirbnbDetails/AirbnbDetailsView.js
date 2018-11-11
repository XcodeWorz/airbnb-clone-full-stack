import React, { Component } from "react";
import { Skeleton, Divider, Icon } from "antd";
import styled from "styled-components";

import { amenitiesValue } from "@airbnb-clone/common";

const ImagesWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 10em 10em;
  grid-gap: 0.2em;
  width: 100%;

  .image-0 {
    grid-row-start: 1;
    grid-row-end: 3;
  }
`;

const ImageContainer = styled.div`
  background-size: 100%;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
`;

const InfoWrapper = styled.div`
  max-width: 960px;
  padding: 0 24px;
  box-sizing: border-box;
  margin: 24px 0;
`;

const Category = styled.div`
  text-transform: uppercase;
  font-weight: 800;
  color: ${props => props.theme.textColor};
  font-size: 12px;
`;

const Name = styled.h1`
  margin: 0;
`;

const Assets = styled.div`
  display: flex;

  div {
    font-size: 16px;
    margin-right: 24px;
    font-weight: 600;
  }
`;

const Description = styled.div`
  word-wrap: break-word;
  line-height: 22px;
  font-size: 16px;
  color: ${props => props.theme.textColor};
`;

const Amenities = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(1fr);
`;

export default class AirbnbDetailsView extends Component {
  render() {
    console.log(this.props);
    const {
      loading,
      data: { airbnbDetails }
    } = this.props;

    if (loading || !airbnbDetails) return <Skeleton />;

    return (
      <React.Fragment>
        <ImagesWrapper>
          {airbnbDetails.images.map((image, i) => {
            return (
              <ImageContainer
                key={`image-${i}`}
                className={`image-${i}`}
                src={image}
              />
            );
          })}
        </ImagesWrapper>
        <InfoWrapper>
          <Category>{airbnbDetails.category}</Category>
          <Name>{airbnbDetails.name}</Name>
          <Assets>
            <div>{airbnbDetails.guests} guests</div>
            <div>{airbnbDetails.beds} beds</div>
            <div>{airbnbDetails.baths} baths</div>
          </Assets>
          <Divider />
          <Description>{airbnbDetails.description}</Description>
          <Divider />
          <Amenities>
            {airbnbDetails.amenities.map((amenity, i) => {
              return (
                <div key={i}>
                  <Icon type={amenity} />
                  <span>{amenitiesValue(amenity)}</span>
                </div>
              );
            })}
          </Amenities>
        </InfoWrapper>
      </React.Fragment>
    );
  }
}
