import React, {Component} from 'react';
import axios from "axios";

class Filter extends Component {
  state = {
    greyScaleFile: null,
    uploadedFile: null,
  };

  handleChange = (files) => {
    if (files.length > 0) {
      this.setState({uploadedFile: URL.createObjectURL(files[0])});
      const formData = new FormData();
      formData.append("file", files[0]);
      let url = "http://34.217.27.245:8080/rest/image";
      if (process.env.NODE_ENV === 'development') {
        url = "http://localhost:8080/rest/image";
      }
      const options = {
        method: 'post',
        url: url,
        data: formData,
        body: files[0],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      };
      axios(options)
          .then((response) => {
            this.setState({greyScaleFile: response.data});
          })
          .catch((error) => {
            console.error(error);
            this.setState({greyScaleFile: null, uploadedFile: null});
          });

    } else {
      this.setState({greyScaleFile: null, uploadedFile: null});
    }
  };

  render() {
    const { greyScaleFile, uploadedFile } = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <p>Greyscale Filter</p>
            <input
                name="file"
                onChange={(e) => {
                  this.handleChange(e.target.files);
                }}
                type="file"
            />
            {uploadedFile
            && (
                <img alt="Uploaded" src={uploadedFile} style={{height: "auto", width: "40%"}} />
            )}
            {greyScaleFile
            && (
                <img alt="Greyscale" src={greyScaleFile} style={{height: "auto", width: "40%"}} />
            )}
          </header>
        </div>
    );
  }
}

export default Filter;
