/* eslint-disable jsx-a11y/label-has-associated-control, 
  jsx-a11y/label-has-for, jsx-a11y/role-supports-aria-props, 
  react/no-unknown-property, no-unreachable  */
import $ from "jquery"
import jQuery from "jquery"
import Swal from "sweetalert2"
import React, { Component } from "react"
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import withReactContent from "sweetalert2-react-content"
import { logOut, sessionHelper } from "../../Helpers/Helpers"
import { getDataWithToken } from "../../Services/apiServices"

const mSwal = withReactContent(Swal)
const checkSession = localStorage.length
let userrole, name, username, isLoading, content

if (checkSession > 0) {
  name = localStorage.getItem("name").trim()
  userrole = localStorage.getItem("userrole").trim()
  username = localStorage.getItem("username").trim()
}

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      failed: false,
      errorMsg: "",
      transactions: []
    }
  }

  static displayName = Home.name

  componentDidMount() {

    let _transactionsLbl = document.getElementById("transactionsLbl")

    //transactions counter
    this.setState({ loading: true })

    getDataWithToken("api/payment/transactions" ).then((response) => {
      if (response === undefined) {
        console.log("re-loading data")
        return
      }
      if (response !== undefined && response !== null) {
        _transactionsLbl.textContent = response.length
        $(".modalspinner").css("display", "none")
        this.setState({loading: false, transactions: response})
      }
      else {
        $(".modalspinner").css("display", "none")
        this.setState({loading: true})
      }
    })  

  }
  

  renderVoid(e) {
    e.preventDefault()
  }


  render() {

    //initialize datatable
    jQuery(function () {
      $("#tbl_transactions_list thead tr")
        .clone(true).addClass("filters")
        .appendTo("#tbl_transactions_list thead")

      $("#tbl_transactions_list").DataTable({
        orderCellsTop: true,
        fixedHeader: true,
        deferRender: true,
        scrollCollapse: true,
        scroller: true,
        scrollX: true,
        initComplete: function () {
          var api = this.api();
          api.columns()
            .eq(0)
            .each(function (colIdx) {
              var cell = $(".filters th").eq(
                $(api.column(colIdx).header()).index()
              );
              var title = $(cell).text();
              $(cell).html("<input type=\"text\" placeholder=\"" + title + "\" />")

              $("input", $(".filters th").eq($(api.column(colIdx).header()).index()))
                .off("keyup change")
                .on("change", function (e) {
                // Get the search value
                  $(this).attr("title", $(this).val());
                  var regexr = "({search})";

                  // Search the column for that value
                  api.column(colIdx)
                    .search(
                      this.value !== ""
                        ? regexr.replace("{search}", "(((" + this.value + ")))") : "",
                      this.value !== "", this.value === ""
                    ).draw();
                }).on("keyup", function (e) {
                  e.stopPropagation();
                  $(this).trigger("change");
                });
            });
        },
        lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
        pageLength: 5,
        lengthChange: !0,
        language: { lengthMenu: " _MENU_ records" },

        columnDefs: [
          {
            orderable: !0,
            defaultContent: "-",
            targets: "_all"
          },
          {
            searchable: !0,
            targets: "_all"
          }
        ],
        order: [
          [1, "asc"]
        ],
        bDestroy: true,
        info: true,
        processing: true,
        retrieve: true,
        responsive: true
      })
      $("#tbl_transactions_list").DataTable().columns.adjust()
      $("#tbl_transactions_list").DataTable().column(0).visible(false)
    })


    if (this.state.loading) {
      content = <strong>Please wait...processing...</strong>
    }

    // If not loggedin
    if (!sessionHelper) {
      return logOut()
    }

    return (
      <>
        <div className="hold-transition sidebar-mini layout-navbar-fixed">
          <div className="wrapper">
            <div className="content-wrapper">
              {
                this.state.loading ?
                  <div data-testid="spinner" className="modalspinner" style={{ display: "inline-block" }}>
                    <div className="centerspinner">
                      <div className="row">
                        <img alt="loading..." src="assets/loaders/load.gif" />
                        {content}
                      </div>
                    </div>
                  </div> : null
              }
              <div className="content-header">
                <div className="container-fluid">
                  <div className="row mb-2">
                    <div className="col-sm-6">
                      <h1 className="m-0">Dashboard</h1>
                    </div>
                    <div className="col-sm-6">
                      <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active">
                          {userrole === "SUPERADMIN" ? "Super Admin: " : `${userrole}: `}{name}</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main content  */}
              <section className="content">
                <div className="container-fluid">
                  <div className="row">

                    <div className="col-lg-3 col-6">
                      <div className="small-box secondary-widget">
                        <div className="inner widget-text">
                          <h3><span id="transactionsLbl"></span></h3>
                          <p>Transactions</p>
                        </div>
                        <div className="icon">
                          <i className="far fa fa-scroll"></i>
                        </div>
                        <a href={userrole === "SUPERADMIN" ? "/transactions" : "/home"} className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                      </div>
                    </div>

                    <div className="col-lg-3 col-6">
                      <div className="small-box primary-widget">
                        <div className="inner">
                          <h3><span id="xdummy1"></span></h3>
                          <p>dummy1</p>
                        </div>
                        <div className="icon">
                          <i className="far fa-file-excel"></i>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-3 col-6">
                      <div className="small-box secondary-widget">
                        <div className="inner widget-text">
                          <h3><span id="xdummy2"></span></h3>
                          <p>dummy2</p>
                        </div>
                        <div className="icon">
                          <i className="far fa-file-excel"></i>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-3 col-6">
                      <div className="small-box primary-widget">
                        <div className="inner widget-text">
                          <h3><span id="xdummy3"></span></h3>
                          <p>dummy3</p>
                        </div>
                        <div className="icon">
                          <i className="far fa fa-scroll"></i>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="row alert alert-dismissible feedbackDiv" style={{ display: "none" }}>
                    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <span id="feedbackMsg"></span>
                  </div>

                  <div className="row">
                    <section className="col-lg-12">
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title">
                            <i className="fas fa-folder-open mr-1 secondary-color"></i>
                            Transactions List
                          </h3>
                        </div>

                        <div className="card">
                          <div className="card-header">
                            <h3 className="card-title">
                              <i className="ion ion-clipboard mr-1 primary-color"></i>
                              Paypal Transactions
                            </h3>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="card-body">
                                  <div className="form-body">
                                    {
                                      this.state.loading ?
                                        (<div className="modalspinner" style={{ display: "none" }}>
                                          <div className="centerspinner">
                                            <div className="row">
                                              <img alt="loading..." src="assets/loaders/load.gif" />
                                              {content}
                                            </div>
                                          </div>
                                        </div>) :
                                        (<div className="table-container horizontal-scroll">
                                          {
                                            this.state.transactions ?
                                              <table
                                                className="table table-striped table-hover table-bordered"
                                                id="tbl_transactions_list" width={"100%"}>
                                                <thead>
                                                  <tr>
                                                    <th className="hidden"> Id</th>
                                                    <th> Customer Name </th>
                                                    <th> Transaction Ref/Token </th>
                                                    <th> Transaction Amount (USD) </th>
                                                    <th> Transaction Status </th>
                                                    <th> Transaction Date </th>
                                                    <th> Modified By </th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {
                                                    this.state.transactions.map((item) => {
                                                      return (
                                                        <tr key={item.id}>
                                                          <td className="hidden">{item.id}</td>
                                                          <td>{item.userFullName}</td>
                                                          <td>{item.transactionRefId}</td>
                                                          <td>{parseFloat(item.amount).toFixed(2)}</td>
                                                          <td>{item.transactionStatus}</td>                                                    
                                                          <td>{item.transactionDate}</td>
                                                          <td>{item.modifiedBy}</td>
                                                        </tr>
                                                      )
                                                    })
                                                  }
                                                </tbody>
                                                <tfoot></tfoot>
                                              </table> :
                                              <div className="alert alert-danger">No data found</div>
                                          }
                                        </div>)
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card-footer clearfix">
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </>
    )
  }
}