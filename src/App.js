import React, { Component } from "react";
import { Card } from "react-bootstrap";
import html2canvas from "html2canvas";
import ReactDOM from "react-dom";
import jsPdf from "jspdf";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import canvasToImage from "canvas-to-image";

class App extends Component {
  constructor() {
    super();
    this.state = {
      profileImage: null,
      username: EditorState.createEmpty(),
      desc: EditorState.createEmpty(),
    };
    this.onInputchange = this.onInputchange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onInputchangeImage = this.onInputchangeImage.bind(this);
  }

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  onInputchangeImage(event) {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        profileImage: URL.createObjectURL(img),
      });
    }
  }

  onSubmitForm() {
    console.log(this.state);
  }
  printPDF = () => {
    const domElement = document.getElementById("photo");

    html2canvas(domElement, {
      onclone: (document) => {
        document.getElementById("print").style.visibility = "hidden";
      },
    }).then((canvas) => {
      canvasToImage(canvas, {
        name: "myImage",
        type: "png",
        quality: 1,
      });
    });
  };
  onEditorStateChange = (username) => {
    this.setState({
      username,
    });
  };
  onDescChange = (desc) => {
    this.setState({
      desc,
    });
  };
  render() {
    const { items, username, desc, options } = this.state;

    return (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        ;
        <div style={{ flexDirection: "row", width: "50%", height: "100%" }}>
          <div>
            <label>
              Username :
              <Editor
                editorState={username}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
              />
            </label>
          </div>
          <div>
            <label>
              Description :
              <Editor
                editorState={desc}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onDescChange}
              />
            </label>
          </div>
          <div>
            <label>
              Profile image :
              <input
                name="profileImage"
                type="file"
                // value={this.state.profileImage}
                onChange={this.onInputchangeImage}
              />
            </label>
          </div>
          <div>
            <button id="print" onClick={this.printPDF}>
              Download
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "50%",
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
            border: 1,
            borderWidth: 1,
            borderColor: "black",
            backgroundColor: "lightcyan",
          }}
        >
          <div
            id="photo"
            style={{
              width: "70%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              position: "relative",
              // backgroundColor: "blue",
            }}
          >
            <div>
              <Card
                className="text-center"
                style={{
                  width: "",
                  margin: 10,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyItems: "center",
                }}
              >
                <Card.Body style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div
                      style={{
                        flexDirection: "row",
                        width: "20%",
                        height: "20%",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        style={{
                          height: 80,
                          width: 80,
                          borderRadius: 40,
                          borderWidth: 1,
                          border: 1,
                        }}
                        src={this.state.profileImage}
                      />
                    </div>
                    <div style={{ flexDirection: "row", width: "80%" }}>
                      <Card.Title>
                        {!this.state.username ? (
                          "Username"
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: draftToHtml(
                                convertToRaw(username.getCurrentContent())
                              ),
                            }}
                          />
                        )}
                      </Card.Title>
                    </div>
                  </div>
                  {/* <Card.Img
                    variant="top"
                    style={{
                      height: 400,
                      width: "90%",
                      borderRadius: 16,
                      borderWidth: 1,
                    }}
                    src={this.state.profileImage}
                  /> */}
                  <Card.Text>
                    {this.state.description ? (
                      "Description"
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(
                            convertToRaw(desc.getCurrentContent())
                          ),
                        }}
                      />
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
