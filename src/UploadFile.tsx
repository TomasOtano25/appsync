import * as React from "react";
import { Storage } from "aws-amplify";
import { S3Album } from "aws-amplify-react";

interface Props {
  handleFile: any;
}

export class UploadFile extends React.PureComponent<Props> {
  state = {
    file: undefined
  };

  uploadFile = (evt: any) => {
    const file = evt.target.files[0];
    const name = file.name;

    Storage.put(name, file).then(() => {
      this.setState({ file: name }, () => {
        this.props.handleFile(this.state.file);
      });
    });
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this.uploadFile} />
      </div>
    );
  }
}
