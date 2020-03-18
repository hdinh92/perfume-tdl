import {
  Button,
  Card,
  CardContent,
  Grid,
  withStyles,
  Box
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as PDActions from "../../actions/product";
import * as uiActions from "../../actions/ui";
import ProductList from "../../components/ProductComponent/ProductList";
import SearchBox from "../../components/ProductComponent/SearchBox";
import SortBox from "../../components/ProductComponent/SortBox";
import ProductActionForm from "../ProductActionForm";
import styles from "./styles";
class TaskBoard extends Component {
  state = {
    rowsPerPage: 5,
    page: 0
  };
  componentDidMount() {
    const { PDActions } = this.props;
    const { fetchAllProduct } = PDActions;
    fetchAllProduct();
  }
  renderSearchBox() {
    let xhtml = null;
    xhtml = <SearchBox onFilterProduct={this.handleFilterProduct} />;
    return xhtml;
  }
  renderSortBox() {
    let xhtml = null;
    xhtml = <SortBox handleChange={this.handleSortChange}/>;
    return xhtml;
  }
  openForm = () => {
    const { modalActions, PDActions } = this.props;
    const { showModal, changeModalContent, changeModalTitle } = modalActions;
    const { setProductEditing} = PDActions
    showModal();
    setProductEditing(null)
    changeModalTitle("Thêm mới sản phẩm");
    changeModalContent(<ProductActionForm />);
  };
  handleSortChange = e =>{
    const { PDActions } = this.props;
    const { sortProduct } = PDActions;
    sortProduct(e.target.value);
  }
  handleFilterProduct = e => {
    const { PDActions } = this.props;
    const { filterProduct } = PDActions;
    filterProduct(e.target.value);
  };
  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    });
  };
  handleChangeRowsPerPage = event => {
    this.setState({
      page: 0,
      rowsPerPage: event.target.value
    });
  };
  handleEditProduct = product => {
    const { PDActions,modalActions } = this.props
    const {
      showModal,
      changeModalContent,
      changeModalTitle
    } = modalActions;
    const {setProductEditing} = PDActions
    setProductEditing(product)
    showModal();
    changeModalTitle("Cập nhật sản phẩm");
    changeModalContent(<ProductActionForm/>)
  };
  handleDeleteProduct = product => {
    const { id } = product
    const { PDActions } = this.props
    const { deleteProduct } = PDActions
    deleteProduct(id)
  };
  openDeleteModal = product => {
    const { modalActions, classes } = this.props;
    const {
      showModal,
      hideModal,
      changeModalContent,
      changeModalTitle
    } = modalActions;
    showModal();
    changeModalTitle("Xóa sản phẩm");
    changeModalContent(
      <div className={classes.modalDelete}>
        <div className={classes.modalConfirmDelete}>
          Bạn chắc chắn muốn xóa sản phẩm:
          <span className={classes.modalTextBold}> {product.name} </span>?
        </div>
        <Box display="flex" flexDirection="row-reverse" mt={2}>
          <Box ml={1}>
            <Button variant="contained" onClick={hideModal}>
              Hủy bỏ
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleDeleteProduct(product)}
            >
              Đồng ý
            </Button>
          </Box>
        </Box>
      </div>
    );
  };
  render() {
    const { classes, products } = this.props;
    const { rowsPerPage, page } = this.state;
    return (
      <div className={classes.taskboard}>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justify="space-between"
                  alignItems="stretch"
                >
                  <Grid item md={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={this.openForm}
                      size="large"
                    >
                      <AddIcon />
                    </Button>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Grid
                      container
                      direction="column"
                      justify="space-between"
                      alignItems="stretch"
                    >
                      <Grid item md={12} xs={12}>
                        {this.renderSearchBox()}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    {this.renderSortBox()}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={12} xs={12}>
            <ProductList
              products={products}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              onDeleteProduct={this.openDeleteModal}
              onEditProduct={this.handleEditProduct}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
TaskBoard.propTypes = {
  classes: PropTypes.object,
  products: PropTypes.array,
  PDActions: PropTypes.shape({
    fetchAllProduct: PropTypes.func,
    filterProduct: PropTypes.func,
    deleteProduct: PropTypes.func,
    setProductEditing: PropTypes.func,
    sortProduct: PropTypes.func
  }),
  modalActions: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    changeModalTitle: PropTypes.func,
    changeModalContent: PropTypes.func
  })
};

const mapStateToProps = state => {
  return {
    products: state.product.listProduct
  };
};
const mapDispatchToProps = dispatch => {
  return {
    PDActions: bindActionCreators(PDActions, dispatch),
    modalActions: bindActionCreators(uiActions, dispatch)
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(TaskBoard);
