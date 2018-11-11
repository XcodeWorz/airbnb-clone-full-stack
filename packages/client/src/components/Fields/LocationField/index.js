import * as React from "react";
import { Form, Icon } from "antd";
import Geosuggest from "react-geosuggest";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import styled from "styled-components";

const FormItem = Form.Item;

const MapWithAMarker = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={props.defaultCenter}
    onClick={props.onClick}
  >
    <Marker position={{ lat: props.lat, lng: props.lng }} />
  </GoogleMap>
));

const SuggestionWrapper = styled.div`
  width: 100%;
  position: relative;

  i.clear-button {
    position: absolute;
    line-height: 40px;
    right: 11px;
    top: 0;
    z-index: 5;
    color: ${props => props.theme.borderColorBase};
    display: none;
  }

  i.show-button {
    display: block;
  }

  .geosuggest {
    position: relative;
    width: inherit;
  }

  .geosuggest__input-wrapper {
    .geosuggest__input {
      width: 100%;
      border: 1px solid ${props => props.theme.borderColorBase};
      border-radius: 3px;
      min-height: 38px;
      line-height: 40px;
      padding: 6px 11px;
      height: 40px;
      font-size: 16px;

      &:hover {
        border: 1px solid ${props => props.theme.primaryColor};
      }
      &:focus {
        box-shadow: 0 0 0 2px rgba(255, 90, 95, 0.2);
        border-color: ${props => props.theme.focusColor};
        outline: 0;
      }
    }
  }
  .geosuggest__item--active {
    background: #267dc0;
    color: #fff;
  }

  .geosuggest__suggests-wrapper {
    width: 100%;
    position: absolute;
    z-index: 3;
    background-color: white;

    .geosuggest__suggests {
      list-style: none;
      padding-inline-start: 0 !important;
      box-shadow: ${props => props.theme.boxShadowBase};
      li {
        padding: 0 8px;
        &:hover {
          background-color: ${props => props.theme.lightFocusColor};
          cursor: pointer;
        }
      }
    }

    .geosuggest__suggests--hidden {
      display: none;
    }
  }
`;

export class LocationField extends React.Component {
  state = {
    defaultCenter: null
  };

  clearSuggest = () => {
    this.setState({ suggest: null });
  };

  onSuggestSelect = value => {
    const {
      location: { lat, lng }
    } = value;
    const {
      form: { setValues, values }
    } = this.props;
    setValues({
      ...values,
      latitude: lat,
      longitude: lng
    });
    this.setState({
      defaultCenter: {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      }
    });
  };

  render() {
    const {
      field: { name, ...field },
      form: { touched, errors, values, setValues },
      label
    } = this.props;

    const errorMsg = touched[field.name] && errors[field.name];
    const showButton = this.state.suggest ? "show-button" : "";

    return (
      <FormItem
        label={label}
        help={errorMsg}
        hasFeedback={!!errorMsg}
        validateStatus={errorMsg ? "error" : undefined}
      >
        <SuggestionWrapper>
          <Geosuggest
            ref={el => (this._geoSuggest = el)}
            placeholder="Location"
            defaultCenter={this.state.defaultCenter}
            clear={this.clearSuggest}
            onSuggestSelect={this.onSuggestSelect}
          />
          <Icon
            type="close"
            className={`clear-button ${showButton}`}
            onClick={() => this._geoSuggest.clear()}
          />
        </SuggestionWrapper>

        {this.state.defaultCenter && (
          <MapWithAMarker
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            defaultCenter={this.state.defaultCenter}
            lat={values.latitude}
            lng={values.longitude}
            onClick={x => {
              console.log(x);
              const lat = x.latLng.lat();
              const lng = x.latLng.lng();

              setValues({
                ...values,
                latitude: lat,
                longitude: lng
              });
            }}
          />
        )}
      </FormItem>
    );
  }
}
