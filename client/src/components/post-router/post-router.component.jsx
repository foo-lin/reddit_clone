//Core Import
import React from 'react';
import { withRouter } from 'react-router-dom';
//relative imports
import Loading from '../loading/loading.component';

//Styles

class postRouter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			select: this.props.match.params.sortBy || 'new'
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		console.log('post router mounted');
	}
	componentDidUpdate() {
		console.log('sdf');
	}

	handleChange(evt) {
		const { value } = evt.target;
		this.setState({ select: value });
		let url = this.props.match.url;
		if (this.props.match.params.sortBy) {
			url = url.replace(this.props.match.params.sortBy, value);
		} else {
			url = `${url}/${value}`;
		}
		this.props.history.push(url);
	}

	render() {
		return (
			<div>
				<select value={this.state.select} onChange={this.handleChange}>
					<option name="new" id="sdf">
						new
					</option>
					<option name="old" id="sdf">
						old
					</option>
					<option name="top" id="sdf">
						top
					</option>
				</select>
			</div>
		);
	}
}

export default withRouter(postRouter);
