import React, { Component } from "react";
import axios from 'axios';

class Employees extends Component {

    state = {
        search: "",
        employees: [],
        fn: React.createRef(),
        fn_sort: null,
        ln: React.createRef(),
        ln_sort: null
    }

    componentDidMount() {
        axios.get('https://randomuser.me/api/?results=100')
            .then(res => {
                console.log(res.data.results);
                this.setState({
                    employees: res.data.results
                })
                this.state.employees_orig = res.data.results
            })
    }

    handleFilter = (e) => {
        e.preventDefault();
        console.log("input", e.target.value);
        const employees = this.state.employees_orig.filter(employee => employee.name.first.toLowerCase().startsWith(e.target.value.toLowerCase()));
        this.setState({ employees });
    }

    handleSort = (e) => {
        e.preventDefault();
        let column = e.target.getAttribute('column');
        let employees = null
        if (column == "name.first") {
            switch (this.state.fn_sort) {
                case null:   this.state.fn_sort = "asc";  break;
                case "asc":  this.state.fn_sort = "desc"; break;
                case "desc": this.state.fn_sort = "asc";  break;
            }
            this.state.ln_sort = null
            this.state.fn.current.innerHTML = "First Name (" + this.state.fn_sort + ")"
            this.state.ln.current.innerHTML = "Last Name"
            switch (this.state.fn_sort) {
                case "asc":  
                    employees = this.state.employees.sort(
                        (e1, e2) => e1.name.first.localeCompare(e2.name.first)
                    )
                    break
                case "desc": 
                    employees = this.state.employees.sort(
                        (e1, e2) => e2.name.first.localeCompare(e1.name.first)
                    )
                    break
            }
        }
        if (column == "name.last") {
            switch (this.state.ln_sort) {
                case null:   this.state.ln_sort = "asc";  break;
                case "asc":  this.state.ln_sort = "desc"; break;
                case "desc": this.state.ln_sort = "asc";  break;
            }
            this.state.fn_sort = null
            this.state.fn.current.innerHTML = "First Name"
            this.state.ln.current.innerHTML = "Last Name (" + this.state.ln_sort + ")"
            switch (this.state.ln_sort) {
                case "asc":  
                    employees = this.state.employees.sort(
                        (e1, e2) => e1.name.last.localeCompare(e2.name.last)
                    )
                    break
                case "desc": 
                    employees = this.state.employees.sort(
                        (e1, e2) => e2.name.last.localeCompare(e1.name.last)
                    )
                    break
            }
        }
        this.setState({ employees });
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
                            <input type="text" className="form-control" id="filterName" placeholder="Filter By First Name" onChange={this.handleFilter}></input>
                            <br></br>
                        </center>
                    </form>


                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th onClick={this.handleSort} ref={this.state.fn} column= "name.first" scope="col">First Name</th>
                            <th onClick={this.handleSort} ref={this.state.ln} column= "name.last" scope="col">Last Name</th>
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
