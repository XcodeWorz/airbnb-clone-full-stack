import * as React from "react";
import { Form, Button } from "antd";
import Dropzone from "react-dropzone";
import styled from "styled-components";

const FormItem = Form.Item;

const DropZoneContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${props => props.theme.textColor};
`;

const DropZoneWrapper = styled.div`
  position: relative;
  & > div {
    width: 100% !important;
    height: 100%;
    border-color: ${props => props.theme.borderColorBase} !important;
    display: flex;
    justify-content: center;
    align-items: center;
    h3 {
      color: ${props => props.theme.textColor};
    }

    h6 {
      color: ${props => props.theme.textColorSecondary};
    }
  }
`;

const PreviewWrapper = styled.div`
  position: relative;
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const Preview = styled.div`
  background-image: url(${props => props.src});
  background-size: 100%;
  width: 75px;
  height: 75px;
  border: 1px solid ${props => props.theme.borderColorBase};
`;

export class DropzoneField extends React.Component {
  state = {
    files: []
  };

  upload = files => {
    const {
      form: { setFieldValue },
      field: { name }
    } = this.props;
    setFieldValue(name, files[0]);
    this.setState({
      files: files.map(file => ({
        ...file,
        preview: URL.createObjectURL(file)
      }))
    });
  };

  render() {
    const {
      field: { name, ...field },
      form: { touched, errors },
      label
    } = this.props;
    const errorMsg = touched[field.name] && errors[field.name];

    return (
      <FormItem
        label={label}
        help={errorMsg}
        hasFeedback={!!errorMsg}
        validateStatus={errorMsg ? "error" : undefined}
      >
        <DropZoneWrapper>
          <Dropzone
            multiple={false}
            accept="image/jpeg, image/png"
            onDrop={this.upload}
          >
            <DropZoneContent>
              <h3>Drag and drog files here</h3>
              <h5>or</h5>
              <Button type="primary">Browse files</Button>
            </DropZoneContent>
          </Dropzone>
          <PreviewWrapper>
            {this.state.files.map((file, i) => {
              return <Preview key={i} src={file.preview} />;
            })}
          </PreviewWrapper>
        </DropZoneWrapper>
      </FormItem>
    );
  }
}
