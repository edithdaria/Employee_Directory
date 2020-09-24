import React, { Component } from "react";
import axios from 'axios';

class Employees extends Component {

    state = {
        search: "",
        employees: []
    }

    componentDidMount() {
        axios.get('https://randomuser.me/api/?results=10')
            .then(res => {
                console.log(res.data.results);
                this.setState({
                    employees: res.data.results
                })
                this.state.employees_orig = res.data.results
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("input", e.target.value);
        const employees = this.state.employees_orig.filter(employee => employee.name.first.toLowerCase().startsWith(e.target.value.toLowerCase()));
        this.setState({ employees });
    }

    handleFilter = (e) => {
        e.preventDefault();
        console.log("input", e.target.getAttribute('column'));

    }


    render() {
        const { employees } = this.state;

        const employeesList = employees.length ? (
            employees.map(employee => {
                console.log(employee)
                return (
                    <tr key={employee.email}>
                        <th scope="row"><img src={employee.picture.thumbnail} /></th>
                        <td>{employee.name.first}</td>
                        <td>{employee.name.last}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phone}</td>
                    </tr>
                )

            })


        ) : (

                <tr><th scope="col">No Employee Information Available at this time</th></tr>
            )

        console.log("employees: ", employeesList);

        return (
            <div>
                    <form className="jumbotron form-group">
                        <center>
                            <h1 className="display-4">Employee Directory</h1>
                            <hr className="my-4"></hr>
                            <input type="text" className="form-control" id="filterName" placeholder="Filter By First Name" onChange={this.handleSubmit}></input>
                            <br></br>
                        </center>
                    </form>


                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th onClick={this.handleFilter} column= "name.first" scope="col">First Name</th>
                            <th onClick={this.handleFilter} column= "name.last" scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeesList}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default Employees;
