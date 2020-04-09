import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./AppNavbar";
import Axios from "axios";

class GroupEdit extends Component {
  emptyItem = {
    name: "",
    address: "",
    city: "",
    stateOrProvince: "",
    country: "",
    postalCode: "",
  };
  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
    };
    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    //if (this.props.match.params.id !== "new") {
    //const id = (`${this.props.match.params.id}`);
    const url = `https://damp-dawn-51391.herokuapp.com/api/group/${this.props.match.params.id}`;
    const fetchData = await Axios.get(url);
    this.setState({ item: fetchData.data});
  }
  //}
  // }

  // handleChange(event) {
  // const target = event.target;
  // const value = target.value;
  //const name = target.name;
  //let item = { ...this.state.item };
  //item[name] = value;
  //this.setState({ item });
  // }

  async handleSubmit(event) {
    event.preventDefault();
    //const { item } = this.state;
    var payload = {
      name: this.state.name,
      address: this.state.address,
      city: this.state.city,
      stateOrProvince: this.state.stateOrProvince,
      country: this.state.country,
      postalCode: this.state.postalCode,
      user: this.state.user,
      events: this.state.events,
    };
    await Axios.put(
      `https://damp-dawn-51391.herokuapp.com/api/group/1`,
      payload
    ).then(function (response) {
      console.log(response);
      //this.setState({ item, isLoading: false });
      //body: JSON.stringify(item),
    });
    //this.props.history.push('/groups');
  }

  render() {
    const { item } = this.state;
    //const title = <h2>{item.id ? "Edit Group" : "Add Group"}</h2>;

    return (
      <div>
        <AppNavbar />
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name">Alias</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={item.name || ""}
                onChange={(e) => this.setState({ name: e.target.value })}
                autoComplete="name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="text"
                name="address"
                id="address"
                value={item.address || ""}
                onChange={(e) => this.setState({ address: e.target.value })}
                autoComplete="address-level1"
              />
            </FormGroup>
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                type="text"
                name="city"
                id="city"
                value={item.city || ""}
                onChange={(e) => this.setState({ city: e.target.value })}
                autoComplete="address-level1"
              />
            </FormGroup>
            <div className="row">
              <FormGroup className="col-md-4 mb-3">
                <Label for="stateOrProvince">State/Province</Label>
                <Input
                  type="text"
                  name="stateOrProvince"
                  id="stateOrProvince"
                  value={item.stateOrProvince || ""}
                  onChange={(e) =>
                    this.setState({ stateOrProvince: e.target.value })
                  }
                  autoComplete="address-level1"
                />
              </FormGroup>
              <FormGroup className="col-md-5 mb-3">
                <Label for="country">Country</Label>
                <Input
                  type="text"
                  name="country"
                  id="country"
                  value={item.country || ""}
                  onChange={(e) => this.setState({ country: e.target.value })}
                  autoComplete="address-level1"
                />
              </FormGroup>
              <FormGroup className="col-md-3 mb-3">
                <Label for="country">Postal Code</Label>
                <Input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  readOnly={this.state.readOnly}
                  value={item.postalCode || ""}
                  onChange={(e) =>
                    this.setState({ postalCode: e.target.value })
                  }
                  autoComplete="address-level1"
                />
              </FormGroup>
            </div>
            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/groups">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}
export default withRouter(GroupEdit);
