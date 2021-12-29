import React, { Component } from "react";
import { Card } from "react-bootstrap";
import html2canvas from "html2canvas";
import ReactDOM from "react-dom";
import jsPdf from "jspdf";
class App extends Component {
  constructor() {
    super();
    this.state = { profileImage: null };
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
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPdf();
      pdf.addImage(imgData, "JPEG", 10, 10);
      pdf.save(`${new Date().toISOString()}.pdf`);
    });
  };

  render() {
    const { items } = this.state;

    return (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <div style={{ flexDirection: "row", width: "50%", height: "100%" }}>
          <div>
            <label>
              Username :
              <input
                name="username"
                type="text"
                value={this.state.fname}
                onChange={this.onInputchange}
              />
            </label>
          </div>
          <div>
            <label>
              Description :
              <input
                name="description"
                type="text"
                value={this.state.description}
                onChange={this.onInputchange}
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
          id="photo"
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
                        {this.state.username ? this.state.username : "Username"}
                      </Card.Title>
                    </div>
                  </div>
                  <Card.Img
                    variant="top"
                    style={{
                      height: 400,
                      width: "90%",
                      borderRadius: 16,
                      borderWidth: 1,
                    }}
                    src={this.state.profileImage}
                  />
                  <Card.Text>
                    {this.state.description
                      ? this.state.description
                      : "Description"}
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
