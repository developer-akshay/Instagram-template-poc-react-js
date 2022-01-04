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
import "./App.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      profileImage: null,
      username: EditorState.createEmpty(),
      usernametemp: true,
      designation: EditorState.createEmpty(),
      designationtemp: true,
      desc: EditorState.createEmpty(),
      desctemp: true,
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
      usernametemp: false,
    });
  };
  onDescChange = (desc) => {
    this.setState({
      desc,
      desctemp: false,
    });
  };

  onDesignationChange = (designation) => {
    this.setState({
      designation,
      designationtemp: false,
    });
  };
  render() {
    const { items, username, desc, options, designation } = this.state;
    let user = draftToHtml(convertToRaw(username.getCurrentContent()));

    let b = ` style="margin:0px"`;
    let position = 2;
    let output = [user.slice(0, position), b, user.slice(position)].join("");
    console.log(output);
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
              Designation :
              <Editor
                editorState={designation}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onDesignationChange}
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
              margin: 10,
            }}
          >
            <div>
              <Card
                // className="text-center"
                style={{
                  width: "80%",
                  margin: 10,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyItems: "center",
                  padding: "25px 15px",
                  boxShadow: "rgb(0 0 0 / 13%) 0px 3px 10px 0px",
                }}
              >
                <Card.Body>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "30%",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        flexDirection: "row",
                        width: "20%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
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
                          margin: 5,
                          borderColor: "black",
                        }}
                        src={this.state.profileImage}
                      />
                    </div>
                    <div
                      style={{
                        flexDirection: "row",
                        width: "80%",

                        height: "100%",
                        paddingLeft: 5,
                      }}
                    >
                      <div style={{ flexDirection: "column" }}>
                        <div
                          style={{
                            flexDirection: "column",
                            fontSize: 18,
                            fontWeight: "bold",
                          }}
                        >
                          {this.state.usernametemp == true ? (
                            "Username"
                          ) : (
                            <div
                              className="htmlTag"
                              style={{ margin: 0 }}
                              dangerouslySetInnerHTML={{
                                __html: `${user}`,
                              }}
                            />
                          )}
                          {console.log(
                            draftToHtml(
                              convertToRaw(username.getCurrentContent())
                            )
                          )}
                        </div>
                        <div
                          style={{
                            flexDirection: "column",
                            fontSize: 14,
                            color: "lightslategrey",
                          }}
                        >
                          <Card.Title>
                            {this.state.designationtemp == true ? (
                              "Designation"
                            ) : (
                              <div
                                className="htmlTag1"
                                dangerouslySetInnerHTML={{
                                  __html: draftToHtml(
                                    convertToRaw(
                                      designation.getCurrentContent()
                                    )
                                  ),
                                }}
                              />
                            )}
                          </Card.Title>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Card.Text
                    style={{
                      width: "98%",
                      margin: 10,
                      justifyContent: "center",
                    }}
                  >
                    {this.state.desctemp == true ? (
                      "Write description here ."
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
            <div
              style={{
                width: "90%",

                padding: 10,
              }}
            >
              <button id="print" onClick={this.printPDF}>
                Download
              </button>
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
