import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import SideNavDesktop from "./dealers_profile_components/sidenavfordesktop";
import TopNavDesktop from "./dealers_profile_components/topnavdesktop";
import SideNavphone from "./dealers_profile_components/sidenavformobile";
import MyGlobleSetting from "../MyGlobleSetting";
import loadjs from "loadjs";
import BasicInfoEdit from "./dealers_profile_components/basicinfo.edit.component";

class BasicInfoEditMaster extends Component {
  componentWillMount() {
    // loading Scripts 
    var baseUrl = MyGlobleSetting.localURL;
    loadjs(baseUrl + "js/dealerprofilescript.js", function () {});
  }

  //Rendering Html and Components

  render() {
    return (
      <div className="container-fluid no_padding">
        <div id="mySidenav" className="sidenavDealer">
          <a
            href="javascript:void(0)"
            className="closebtn closebtn_SidebarDealer_mobile"
          >
            &times;
          </a>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>
        <div className="row">
          <div className="row">
            <SideNavDesktop />

            <div className="col-sm-8 col-md-9 no_padding content_Body_DealerPortal">
              <div className="container right_container_content">
                <TopNavDesktop />

                <div className="row dv_Header_Mobile">
                  <div className="container dv_ContainerHeading_Mobile">
                    <div className="row">
                      <div
                        className="col-md-4 col-sm-3 col-3 openNavMobile"
                        style={{ paddingTop: 10 }}
                      >
                        <i className="fa fa-bars inlineCSS1"></i>
                        <br />
                        <span className="inlineCSS2">Menu</span>
                      </div>

                      <div
                        className="col-md-4 col-sm-6 col-6"
                        style={{ textAlign: "center" }}
                      >
                        <img
                          className="inlineCSS3"
                          src={
                            MyGlobleSetting.localURL +
                            "images/mobilecarlogo.png"
                          }
                        />
                      </div>
                      <div className="col-md-4 col-sm-3 col-3 inlineCSS4">
                        <i className="fa fa-heart-o inlineCSS5"></i>
                        <br />
                        <span className="inlineCSS6">Saved </span>
                      </div>
                    </div>
                  </div>
                </div>

                <SideNavphone />

                <BasicInfoEdit />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BasicInfoEditMaster;
