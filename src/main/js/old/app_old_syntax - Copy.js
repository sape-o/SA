var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');

var App = React.createClass({

	renderToolbar: function() {

		return (
			<Ons.Toolbar>
				<div className='center'>Onsen UI</div>
				<div className='right'>
            		<Ons.ToolbarButton>
              			<Ons.Icon icon='ion-navicon, material:md-menu'></Ons.Icon>
            		</Ons.ToolbarButton>
            	</div>
			</Ons.Toolbar>
		)

	},

	render: function() {
		return(
			<Ons.Page
				renderToolbar={this.renderToolbar} >
				<p>Hello World</p>
			</Ons.Page>	
		)
	}


});

ReactDOM.render(<App />, document.getElementById('react'));