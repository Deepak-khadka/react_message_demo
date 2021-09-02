import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class CreateTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tasks: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTasks  = this.renderTasks.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(e) {
        this.setState({name: e.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('/tasks', {name: this.state.name})
            .then(response => {
                this.setState({tasks: [response.data, ...this.state.tasks]});
                this.setState({name: ''});
            });
    }

    renderTasks() {
        return this.state.tasks.map(task => (
            <div key={task.id} className="media">
                <div className="media-body">
                    <p>
                        {task.name}{' '}
                        <button onClick={ () => this.handleDelete(task.id) } className="btn btn-sm btn-warning float-right">Delete</button>
                    </p>
                </div>
            </div>
        ));
    }

    componentDidMount() {
        axios.get('/tasks').then(
            (response) => this.setState({
                    tasks: [...response.data.body.tasks]
                })
        );
    }

    handleDelete(id) {
        if(confirm('Are you sure ?')) {
            const isNotId = task => task.id !== id;
            const updatedTasks = this.state.tasks.filter(isNotId);
            this.setState({ tasks: updatedTasks });
            axios.delete(`/tasks/${id}`);
        }
    }

    render () {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Chat Box Using React</div>
                            <div className="card-body">
                                {this.renderTasks()}
                                <hr/>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea onChange={this.handleChange} value={this.state.name}
                                            className="form-control" rows="5" maxLength="255"
                                            placeholder="Send a message ...." required/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<CreateTask />, document.getElementById('example'));
}
