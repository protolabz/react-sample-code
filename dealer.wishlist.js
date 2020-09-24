import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import MyGlobleSetting from "../MyGlobleSetting";
import Pagination from "react-js-pagination";
import { scryRenderedDOMComponentsWithClass } from "react-dom/test-utils";

import Header from "../header.component";
import Footer from "../footer.component";

class DealerWishlist extends Component {
  constructor(props) {
    super(props);
    
    //Binding Functions

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageDecrease = this.handlePageDecrease.bind(this);
    this.handlePageIncrease = this.handlePageIncrease.bind(this);
    
    //Setting States 

    this.state = {
      editVisibles: {},
      activePage: 1,
      carlist: [],
      carl: null,
      totalrecords: 0,
      totalPages: 0,
      increamentDisable: false,
      dicreamentDisable: true,
    };
  }

  //Function to handle page change pagination

  handlePageChange(pageNumber) {
    var self = this;
    console.log(`active page is ${pageNumber}`);
    self.setState({ activePage: pageNumber });

    var baseUrl = MyGlobleSetting.APIurl;
    var self = this;
    axios
      .get("/api/carlist/1")
      .then(function (response) {
        self.setState({ carlist: response });
        var data = [];
        data = self.state.carlist.data;
        //console.log(data.data);
        self.setState({ carl: data.data });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  // Page change for decrease

  handlePageDecrease() {
    if (this.state.activePage > 1) {
      var self = this;
      var currentPage = this.state.activePage;
      var pageNumber = currentPage - 1;

      console.log(`active page is ${pageNumber}`);
      self.setState({ activePage: pageNumber });

      var baseUrl = MyGlobleSetting.APIurl;
      var self = this;
      axios
        .get("/api/carlist/1")
        .then(function (response) {
          self.setState({ carlist: response });
          var data = [];
          data = self.state.carlist.data;
          //console.log(data.data);
          self.setState({ carl: data.data });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }

   // Page change for increase

  handlePageIncrease() {
    if (this.state.activePage < this.state.totalPages) {
      var self = this;
      var currentPage = this.state.activePage;
      var pageNumber = currentPage + 1;

      console.log(`active page is ${pageNumber}`);
      self.setState({ activePage: pageNumber });

      var baseUrl = MyGlobleSetting.APIurl;
      var self = this;
      axios
        .get("/api/carlist/1")
        .then(function (response) {
          self.setState({ carlist: response });
          var data = [];
          data = self.state.carlist.data;
          //console.log(data.data);
          self.setState({ carl: data.data });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }

  componentDidMount() {
    var baseUrl = MyGlobleSetting.APIurl;
    var self = this;

    //Api hit to get wishlist car with user id

    axios
      .get(
        "https://phpstack-102119-1298172.cloudwaysapps.com/api/getwishlist?userid=" +
          localStorage.user_id
      )
      .then(function (response) {
        console.log(response);
        self.setState({ carlist: response });
        var data = [];
        data = self.state.carlist.data;

        console.log(data);
        //console.log(data.data);
        self.setState({ carl: data.data });
        self.setState({ totalrecords: data.count });
        if (data.count > 0) {
          var pages = 0;
          pages = parseInt(data.count / 12) + 1;
          self.setState({ totalPages: pages });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //Click function to delete wishlist car

  click(id) {
    const data = {
      userid: localStorage.user_id,
      carid: id,
    };
    axios
      .get(
        "https://phpstack-102119-1298172.cloudwaysapps.com/api/deletewishlist/" +
          localStorage.user_id +
          "/" +
          id,
        data
      )
      .then((response) => {
        console.log("tESTING IT");
        console.log(response);
        console.log(response.data.message);
      })

      .catch((err) => {
        console.log(err);
      });
  }
  

  //After clicking on heart to change its color

  showEditDiv(id) {
    this.setState((prevState) => ({
      editVisibles: {
        ...prevState.editVisibles,
        [id]: !prevState.editVisibles[id],
      },
    }));
  }

  //Delay function

  delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


  //This fuction will call two functions + reload the page after execution

  doboth(id) {
    this.showEditDiv(id);
    this.click(id);

    setTimeout(function afterTwoSeconds() {
      window.location.reload(false);
    }, 250);
  }

  //Heart div fuction with specific id from API in parameter

  showheart(id) {
    return (
      <div className="pull-right heart" id={id}>
        <i
          className="fa fa-heart"
          onClick={() => this.doboth(id)}
          className={
            !this.state.editVisibles[id] ? "fa fa-heart" : "fa fa-heart-o"
          }
          aria-hidden="true"
          id={"heartstatus" + id}
        ></i>
      </div>
    );
  }

  reload() {
    window.location.reload(false);
  }
  

  // Show cars data with looping

  showdata(key) {
    if (this.state.carl) {
      return this.state.carl.map((product) => {
        var id = product.id;

        return (
          <div
            class="col-md-4 col-sm-6 col-12 mb-4 wishListItemsBox"
            id={product.id}
          >
            <div class="row border-grey">
              <div class="col-sm-12 p-0 mb-3 car-thumbnail">
                <img
                  src={
                    MyGlobleSetting.listingURl +
                    "/public/admin/pictures/" +
                    product.main_image
                  }
                />
                <div class="col-sm-12 wishlist-sponcored">
                  {this.showheart(id)}
                  
                </div>
              </div>
              <div class="col-sm-12">
                <h6>{product.listingTitle} </h6>
              </div>
              <div class="col-sm-12">
                <h6>{product.priceString}</h6>
              </div>
            </div>
          </div>
        );
      });
    }
  }

  // rendering

  render() {
    return (
      <div>
        <Header />

        <div class="container pb-5 section-last-search">
          <div class="row">
            <div class="col-sm-12">
              <div class="w-100 heading_wishList">
                <div class="row">
                  <div class="col-md-6 col-sm-6 col-6">
                    <h4 class="h4_Heading_WishList">Wish List</h4>
                  </div>
                  <div class="col-md-6 col-sm-6 col-6 dv_ContinueWishList">
                    <a href="#" class="a_ContinueWishList">
                      Continue{" "}
                      <i
                        class="fa fa-arrow-right icon_arrow_WishList"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>

              <div class="row">{this.showdata()}</div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default DealerWishlist;
