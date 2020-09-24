import MyGlobleSetting from "../MyGlobleSetting";
import { Link } from "react-router-dom";
import React, { Component, useCallback } from "react";
import axios from "axios";
import loadjs from "loadjs";
// import {useDropzone} from 'react-dropzone'
import Dropzone from "react-dropzone";

class ConfirmSpecsContent extends Component {
  constructor(props) {
    super(props);

    //Setting States

    this.state = {
      spectList: [],
      specL: null,
    };
  }

  componentWillMount() {
    var baseUrljuery = MyGlobleSetting.localURL;

    //Loading JavaScript file

    loadjs(baseUrljuery + "js/jquey.basic.info.js", function () {});

    var self = this;

    // Api hit to show all feautures of car

    axios
      .get(
        "https://phpstack-102119-1298172.cloudwaysapps.com/api/getfeatures/" +
          localStorage.carid_vrmNumber
      )
      .then((response) => {
        console.log(response);

        self.setState({ spectList: response });
        var data = [];
        data = self.state.spectList.data;

        self.setState({ specL: data.data });
        console.log(this.state.specL);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Function to add a new feauture to car

  addNewFeauture() {
    var newSpec = document.getElementById("new-spec").value;

    if (newSpec != "") {
      const data = {
        vehicle_id: localStorage.carid_vrmNumber,
        feature_title: newSpec,
      };
      axios
        .post(
          "https://phpstack-102119-1298172.cloudwaysapps.com/api/addnewfeature",
          data
        )
        .then((response) => {
          console.log(response);
          document.getElementById("new-spec").value = "";

          setTimeout(function afterTwoSeconds() {
            window.location.reload(false);
          }, 250);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // Deleting a spec with specific id api hit

  deleteSpec(id) {
    var self = this;
    axios
      .get(
        "https://phpstack-102119-1298172.cloudwaysapps.com/api/deletesinglefeature/" +
          id
      )
      .then((response) => {
        console.log(response);
        setTimeout(function afterTwoSeconds() {
          window.location.reload(false);
        }, 100);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // To remove all current specs
  
  removeAllSpecs() {
    var self = this;
    axios
      .get(
        "https://phpstack-102119-1298172.cloudwaysapps.com/api/deleteallfeatures/" +
          localStorage.carid_vrmNumber
      )
      .then((response) => {
        console.log(response);
        setTimeout(function afterTwoSeconds() {
          window.location.reload(false);
        }, 100);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //Function to show specs
  showSpecs() {
    if (this.state.specL) {
      return this.state.specL.map((speclist) => {
        var id = speclist.id;
        return (
          <div
            className="col-sm-12 mt-3"
            style={{ border: "1px solid #cfcfcf" }}
          >
            <div className="row">
              <div className="col-sm-10" style={{ width: "80%" }}>
                <label className="mt-1" style={{ fontSize: "500" }}>
                  {speclist.feature_text}
                </label>
              </div>
              <div className="col-sm-2 text-right cross-fa-icon-width">
                <i
                  class="fa fa-times mt-2 text-right"
                  style={{ color: "red", cursor: "pointer" }}
                  id={id}
                  onClick={() => this.deleteSpec(id)}
                ></i>
              </div>
            </div>
          </div>
        );
      });
    }
  }

 
 //Html DOM binding

  showdata() {
    return (
      <div>
        <div class="row">
          <div class="col-md-12 p-0">
            <div class="row row_heading_Portal">
              {/* <div class="col-md-12 col-sm-12 dv_HeadingInfo_Dealer"> */}

              <div className="col-sm-12 mb-3 heading-usedcar-mobile-vehicle_deatils vehicle-deatils-heading-desktop">
                <div className="row">
                  <div className="col-sm-4">
                    <label className="mt-2 vehicle-heading">
                      Nissan juke 1.6 Nismo 5dr
                    </label>
                  </div>
                  <div className="col-sm-2"></div>
                  <div className="col-sm-3 vehicle-heading-right">
                    <label className="text-grey mt-2">Retail: £10,551</label>
                  </div>
                  <div className="col-sm-3 vehicle-heading-right">
                    <label className="text-grey mt-2">Trade: £10,551</label>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 mb-3 heading-usedcar-mobile-vehicle_deatils vehicle-deatils-heading-mobile">
                <div className="row">
                  <div className="col-sm-12">
                    <label className="mt-2 vehicle-heading">
                      Nissan juke 1.6 Nismo 5dr
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-5 vehicle-heading-right text-center vehicle-deatils-heading-mobile">
                  <label className="text-grey mt-2">Retail: £10,551</label>
                </div>

                <div className="col-sm-2 divider-vehicle-heading text-center vehicle-deatils-heading-mobile">
                  <label className="text-grey mt-2">|</label>
                </div>
                <div className="col-sm-5 vehicle-heading-right text-center vehicle-deatils-heading-mobile">
                  <label className="text-grey mt-2">Trade: £10,551</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-2">
          <div className="col-sm-12 first-div-box-vehicle_images">
            <div className="row">
              <div className="col-sm-12">
                <label className="mt-4 ml-3">
                  <b>Standard specs</b>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-8">
                <label className="text-grey ml-3">
                  Drap and drop to re-order or click{" "}
                  <i class="fa fa-times" style={{ color: "red" }}></i> to remove
                </label>
              </div>
              <div className="col-sm-4 text-right pr-4">
                <lable
                  style={{ color: "blue", cursor: "pointer" }}
                  className="remove-all"
                  onClick={this.removeAllSpecs}
                >
                  {" "}
                  Remove all
                </lable>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 ml-3 mt-2">
                <div className="dotted-border-vehicle_confrimspecs mr-4 mb-4">
                  <div className="row to-do-list-box">{this.showSpecs()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 row mb-3">
          <div className="col-sm-12 second-div-box-vehicle_images">
            <div className="row">
              <div className="col-sm-12">
                <label className="mt-4 ml-3">
                  <b>Un-Selected</b>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <label className="text-grey ml-3">
                  Search for or manually add standard vehicle feautures
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <label className="text-grey ml-3">
                  You can also add your own specs items that are not listed by
                  created them here. Just type in the title you would like the
                  specs items to have and select "Add this spec"
                </label>
              </div>
            </div>

            <div className="row">
              <input
                type="text"
                id="new-spec"
                placeholder="Type in a spec item to add"
                className="form-control ml-4 mb-3 mt-3"
                style={{ width: "91%" }}
              ></input>
            </div>

            <div className="row mt-3 mb-3">
              <div className="col-sm-6 pl-4" style={{ width: "48%" }}>
                <button
                  type="button"
                  className="btn btn-submit"
                  style={{ color: "rgb(255, 255, 255)" }}
                  onClick={this.addNewFeauture}
                >
                  Add this spec
                </button>
              </div>
              <div className="col-sm-6 p-0 text-right" style={{ width: "48%" }}>
                <lable style={{ color: "blue" }} className="mr-5">
                  Add all standard specs
                </lable>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.showdata()}</div>;
  }
}
export default ConfirmSpecsContent;
