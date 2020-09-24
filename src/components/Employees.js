import React, { Component } from "react";
import axios from 'axios';

class Employees extends Component {

    state = {
        employees: []
    }

    componentDidMount() {
        axios.get('https://randomuser.me/api/?results=10')
            .then(res => {
                console.log(res.data.results);
                this.setState({
                    employees: res.data.results
                })
            })
    }


    render() {
        const { employees } = this.state;

        const employeesList = employees.length ? (
            employees.map(employee => {
                console.log(employee)
                return (
                    <div key={employee.email}>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th scope="row"></th>
                                    <td><img src={employee.picture.thumbnail}/></td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )

            })


        ) : (

                <div>No Employee Information Available</div>
            )

        console.log("employees: ", employeesList);

        return (
            <div>
                <h1>Employee Directory</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                </table>
                {employeesList}
            </div>
        )
    }
}

export default Employees;