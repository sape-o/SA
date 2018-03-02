var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');

class RepairInvoiceList extends React.Component{
	render() {
		var repairInvoices = this.props.repairInvoices.map(repairInvoice =>
			<RepairInvoice key={repairInvoice._links.self.href} repairInvoice={repairInvoice}/>
    );
    
		return (
			<table>
				<tbody>
					<tr>
						<th>1First Name</th>
						<th>2Last Name</th>
            <th>3First Name</th>
						<th>4Last Name</th>
            <th>5First Name</th>
						<th>6Last Name</th>
					</tr>
					{repairInvoices}
				</tbody>
			</table>
		)
	}
}

class RepairInvoice extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.repairInvoice.entity.dateOut}</td>
				<td>{this.props.repairInvoice.dateOut}</td>
        <td>{this.props.repairInvoice.dateIn}</td>
				<td>{this.props.repairInvoice.dateOut}</td>
        <td>{this.props.repairInvoice.dateIn}</td>
				<td>{this.props.repairInvoice.dateOut}</td>
			</tr>
		)
	}
}

  {/*PrintRepairInvoice-------------------------------------------------------------------*/}
  class PrintRepairInvoice extends React.Component {
    constructor(props) {
      super(props);
      this.state = {repairInvoices: []};
    }
  
    componentDidMount() {
      client({method: 'GET', path: '/api/repairInvoices'}).done(response => {
        this.setState({repairInvoices: response.entity._embedded.repairInvoices});
      });
    }

    renderToolbar() {
      return (
        <Ons.Toolbar>
          <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
          <div className="center">Print แบบแจ้งซ่อมคอมพิวเตอร์</div>
          <div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>&nbsp;&nbsp;{this.state.Username}&nbsp;&nbsp;&nbsp;</div>
        </Ons.Toolbar>
      );
    }
  
    render() {
      return (
        <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
        
          <RepairInvoiceList repairInvoices={this.state.repairInvoices}/>
        </Ons.Page>
      )
    }
}
{
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////
}
  class App extends React.Component {
    constructor() {
      super();
      this.loadPage = this.loadPage.bind(this);
    }
  
    loadPage(page) {
      this.navigator.resetPage({ component: page, props: { key: page } }, { animation: 'fade' });
    }
  
    renderPage(route, navigator) {
      route.props = route.props || {};
      route.props.navigator = navigator;
  
      return React.createElement(route.component, route.props);
    }
  
    render() {
      return (
        <Ons.Splitter>
          <Ons.SplitterContent>
            <Ons.Navigator initialRoute={{ component: PrintRepairInvoice, props: { key: 'PrintRepairInvoice' } }} renderPage={this.renderPage.bind(this)} ref={(navigator) => { this.navigator = navigator; }} />
          </Ons.SplitterContent>
        </Ons.Splitter>
      );
    }
  }
  
  ons.ready(function() {
    ReactDOM.render(<App />, document.getElementById('app'));
  });

ReactDOM.render(<App />, document.getElementById('react'));