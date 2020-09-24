import React, { Component } from "react";
import axios from 'axios';

class Employees extends Component {

    state = {
        employees: []
    }

    componentDidMount(){
        axios.get('https://randomuser.me/api/?results=10')
        .then(res =>{
            console.log(res.data.results);
            this.setState({
                employees: res.data.results
            })
        })
    }


    render(){
        const {employees} = this.state;

        const employeesList = employees.length ? (
            employees.map(employee =>{
                return (
                <div key={employee.email}>
                <div>
                <ul>
                    <li>{employee.name}</li>
                    </ul>
                </div>
                </div>
                )

            })

        ) : (

            <div>No Employee Information Available</div>
        )

    return (
        <div>
        <h1>Employee Directory</h1>
        {employeesList}
        </div>
    )
    }
}

export default Employees;