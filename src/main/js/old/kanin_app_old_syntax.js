'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');
var root = '/api';
var when = require('when');
var follow = require('./follow');
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
            <Ons.Navigator initialRoute={{ component: Home, props: { key: 'Home' } }} renderPage={this.renderPage.bind(this)} ref={(navigator) => { this.navigator = navigator; }} />
          </Ons.SplitterContent>
        </Ons.Splitter>
      );
    }
  }
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users: []};
    this.state = {
      title: props.title ? props.title : 'Custom Page',
      nextTitle: null,
      Username: '',
      Password: '',
      userslength:null,
      sid:0,
      rid:0
    };
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/users'}).done(response => {
      this.setState({users: response.entity._embedded.users});
      this.setState({userslength: response.entity._embedded.users.length});
    });
  }
  
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='center'>ร้านซ่อมคอมพิวเตอร์</div>
      </Ons.Toolbar>
    );
  }

  handleClickLogin() {
    var i=0;
	  var j=0;
    for(var i=0 ; i<this.state.userslength ; i++){
      if(this.state.users[i].username === this.state.Username && this.state.users[i].password === this.state.Password ){
        ons.notification.alert(this.state.Username + ' is now signed in!');
        this.props.navigator.pushPage({ component: Menu, 
             props: { key: 'Menu', 
             Username: this.state.Username,
             sid:i+1
        } });
        break;
      }
      else{
        j++;
        if(j>0 && i=== this.state.userslength-1){
          ons.notification.alert('Username or Password incorrect!');
          j = 0;
        }
      }
    }
  }
	  

  renderMenu() {
    return (
      <Ons.Toolbar>
        <div className='center'>ร้านซ่อมคอมพิวเตอร์</div>
      </Ons.Toolbar>
    );
  }
  
  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>

        <div style={{ textAlign: 'center' }}>

          <Ons.List>
              <Ons.ListHeader></Ons.ListHeader>
          </Ons.List>
          <h3>LOGIN</h3>
          <p>
            <Ons.Input
              value={this.state.Username}
              onChange={evt => this.setState({Username: evt.target.value})}
              modifier='underbar'
              float
              placeholder='Username' />
          </p><p>
            <Ons.Input
              value={this.state.Password}
              onChange={evt => this.setState({Password: evt.target.value})}
              modifier='underbar'
              type='password'
              float
              placeholder='Password' />
          </p>
          <p>
            <Ons.Button onClick={this.handleClickLogin.bind(this)}>Sign in</Ons.Button>
          </p>
        </div>
        <p style={{ textAlign: 'center', opacity: '0.6', paddingTop: '20px' }}>
            กรุณาเข้าสู่ระบบด้วย Username พนักงานของคุณ
        </p>
    </Ons.Page>
  );
 }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title ? props.title : 'Custom Page',
      nextTitle: null,
      Username: props.Username,
      sid: props.sid
    };
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>ร้านซ่อมคอมพิวเตอร์</div>
        <div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>&nbsp;&nbsp;{this.state.Username}&nbsp;&nbsp;&nbsp;</div>
      </Ons.Toolbar>
    );
  }

  
  pushPageRepairInvoice() {
      this.props.navigator.pushPage({ component: MakeRepairInvoice, 
        props: { key: 'MakeRepairInvoice', 
        Username: this.state.Username,
        sid:this.state.sid
      } });
  } 
  pushPageRepairUpdate() {
      this.props.navigator.pushPage({ component: RepairUpdate, props: { key: 'RepairUpdate' } });
    }
  pushPagePayment() {
      this.props.navigator.pushPage({ component: Payment, props: { key: 'Payment' } });
    }
  pushPageReciept() {
      this.props.navigator.pushPage({ component: Reciept, props: { key: 'Reciept' , eid: this.state.sid ,Username: this.state.Username} });
    }
  pushPageRating() {
      this.props.navigator.pushPage({ component: Rating, props: { key: 'Rating' } });
    }
  pushPageManageEmployee() {
      this.props.navigator.pushPage({ component: ManageEmployee, props: { key: 'ManageEmployee' } });
    }
  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>

          <div style={{ textAlign: 'center' }}>
          <h3>MENU</h3>
        
          <Ons.ListTitle>เลือกรายการ</Ons.ListTitle>
          <Ons.List>
              <Ons.ListItem tappable onClick={this.pushPageRepairInvoice.bind(this)}>
                  <ons-icon icon="ion-plus-circled"></ons-icon>&nbsp;&nbsp;
                  แจ้งซ่อมคอมพิวเตอร์</Ons.ListItem>
              <Ons.ListItem tappable onClick={this.pushPageRepairUpdate.bind(this)}>
                  <ons-icon icon="ion-loop"></ons-icon>&nbsp;&nbsp;
                  อัพเดทสถานะการซ่อม</Ons.ListItem>
              <Ons.ListItem tappable onClick={this.pushPagePayment.bind(this)}> 
                  <ons-icon icon="ion-printer"></ons-icon>&nbsp;&nbsp;
                  พิมพ์ใบแจ้งชำระเงิน</Ons.ListItem>
              <Ons.ListItem tappable onClick={this.pushPageReciept.bind(this)}>
                  <ons-icon icon="ion-settings"></ons-icon>&nbsp;&nbsp;
                  สั่งซื้ออะไหล่</Ons.ListItem>
              <Ons.ListItem tappable onClick={this.pushPageRating.bind(this)}>
                  <ons-icon icon="ion-ios-star"></ons-icon>&nbsp;&nbsp;
                  บันทึกแบบประเมินความพึงพอใจ</Ons.ListItem>
              <Ons.ListItem tappable onClick={this.pushPageManageEmployee.bind(this)}>
                  <ons-icon icon="ion-ios-people"></ons-icon>&nbsp;&nbsp;
                  จัดการข้อมูลพนักงาน </Ons.ListItem>
          </Ons.List>
          </div>
      </Ons.Page>
    );
  }
}
 class Reciept extends React.Component {

	constructor(props) {
		super(props);
		this.state = {computerParts: [], attributes: [], pageSize: 5, links: {},eid : props.eid,
			receiptpart_ID : 1,Username: props.Username};
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
	}
	renderToolbar() {
      return (
        <Ons.Toolbar>
          <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
          <div className="center">เลือกอะไหล่ที่ต้องการ</div>
		  <div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>&nbsp;&nbsp;{this.state.Username}&nbsp;&nbsp;&nbsp;</div>
        </Ons.Toolbar>
      );
    }
  
    pushPage() {
      this.props.navigator.pushPage({ component: Reciept2, props: { key: 'Reciept2'  , eid: this.state.eid}});
    }
  
    popPage() {
      this.props.navigator.popPage();
    }
	loadFromServer(pageSize) {
		follow(client, root, [
			{rel: 'computerParts', params: {size: pageSize}}]
		).then(computerPartCollection => {
			return client({
				method: 'GET',
				path: computerPartCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				this.links = computerPartCollection.entity._links;
				return computerPartCollection;
			});
		}).then(computerPartCollection => {
			return computerPartCollection.entity._embedded.computerParts.map(computerPart =>
					client({
						method: 'GET',
						path: computerPart._links.self.href
					})
			);
		}).then(computerPartPromises => {
			return when.all(computerPartPromises);
		}).done(computerParts => {
			this.setState({
				computerParts: computerParts,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: this.links
			});
		});
	}

	onUpdate(computerPart, updatedComputerPart) {
		client({
			method: 'PUT',
			path: computerPart.entity._links.self.href,
			entity: updatedComputerPart,
			headers: {
				'Content-Type': 'application/json',
				'If-Match': computerPart.headers.Etag
			}
		}).done(response => {
			this.loadFromServer(this.state.pageSize);
		}, response => {
			if (response.status.code === 412) {
				alert('DENIED: Unable to update ' +
					computerPart.entity._links.self.href + '. Your copy is stale.');
			}
		});
	}

	updatePageSize(pageSize) {
		if (pageSize !== this.state.pageSize) {
			this.loadFromServer(pageSize);
		}
	}

	componentDidMount() {
		this.loadFromServer(this.state.pageSize);
	}
	
	handleClick2(eid,receiptpart_ID) {
      return function () {
        client({method: 'GET', path: '/employee/'+eid+'/receiptpart/'+receiptpart_ID}).done(
            ons.notification.alert('สั่งซื้อสำเร็จ!')
		)}

	}
	render() {
		return (
			<Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
            <Ons.List>
                <Ons.ListHeader>รายการอะไหล่</Ons.ListHeader>
            </Ons.List>
				
				<ComputerPartList computerParts={this.state.computerParts}
							  links={this.state.links}
							  pageSize={this.state.pageSize}
							  attributes={this.state.attributes}
							  onUpdate={this.onUpdate}
							  updatePageSize={this.updatePageSize}/>
			<div style={{ textAlign: 'center'}}>
              <Ons.Button onClick={this.handleClick2(this.state.eid,this.state.receiptpart_ID)}>
                ยืนยันการสั่งซื้อ
              </Ons.Button>
			  <Ons.Button onClick= {this.pushPage.bind(this)}>
                ใบเสร็จ
              </Ons.Button>
            </div>
			</Ons.Page>
		)
	}
 }

class Reciept2 extends Home {
    constructor(props) {
      super(props);
      this.state = {computerParts: [] , receipts: [] , eid: props.eid -1, employees: [], length: null };
    }
	Homepage() {
		window.location.reload();
    }
	Print() {
		window.print();
    }
	popPage() {
      this.props.navigator.popPage();

    }
	
	componentDidMount() {
		client({method: 'GET', path: '/api/computerParts'}).done(response => {
			this.setState({computerParts: response.entity._embedded.computerParts});
		});
		client({method: 'GET', path: '/api/employees'}).done(response => {
			this.setState({employees: response.entity._embedded.employees});

		});
		client({method: 'GET', path: '/api/receipts'}).done(response => {
			this.setState({receipts: response.entity._embedded.receipts});
			this.setState({length: response.entity._embedded.receipts.length});
			this.setState({length: this.state.length-1});
		});
	}
    renderToolbar() {
      return (
        <Ons.Toolbar>
          <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
          <div className="center">ใบเสร็จ</div>
        </Ons.Toolbar>
      );
    }

    render() {

      return (
        <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
            <div style={{ textAlign: 'center'}}>
		  <ComputerPartList2 computerParts={this.state.computerParts}/>

		  <ReceiptList receipts={this.state.receipts} length={this.state.length}/>

			<EmployeeList employees={this.state.employees} eid={this.state.eid}/>
			
            <p style={{ paddingTop: '15px'}}>
              <Ons.Button onClick={this.Print.bind(this)}>
                พิมพ์
              </Ons.Button></p>     
			<p style={{ paddingTop: '15px'}}>
              <Ons.Button onClick={this.Homepage.bind(this)}>
                Home
              </Ons.Button></p>    			  
            </div>
        </Ons.Page>
      );
    }
  }
class UpdateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		var updatedComputerPart = {};
		this.props.attributes.forEach(attribute => {
			updatedComputerPart[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onUpdate(this.props.computerPart, updatedComputerPart);
		window.location = "#";
	}

	render() {
		var inputs = this.props.attributes.map(attribute =>
				<p key={this.props.computerPart.entity[attribute]}>
					<input type="text" placeholder={attribute}
						   defaultValue={this.props.computerPart.entity[attribute]}
						   ref={attribute} className="field" />
				</p>
		);

		var dialogId = "updateComputerPart-" + this.props.computerPart.entity._links.self.href;

		return (
			<div key={this.props.computerPart.entity._links.self.href}>
				<a href={"#" + dialogId}></a>
				<div id={dialogId} className="modalDialog">
					<div>
						ป้อนจำนวนที่ต้องการ

						<form>
							{inputs}
							<button onClick={this.handleSubmit}>เพิ่มลงตะกร้า</button>
						</form>
					</div>
				</div>
			</div>
		)
	}

};
class EmployeeList extends React.Component{
	render() {
		var employees = this.props.employees.map(employee =>
			<Employee key={employee._links.self.href} employee={employee} />
		);
		
		return (
		<center>
			<table>
				<tbody>
					{employees[this.props.eid]}
				</tbody>
			</table>
		</center>
		)
	}
}
class Employee extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		
		return (
		<div>
			<tr>
				<td>ผู้สั่งซื้อ</td>
				<td>{this.props.employee.firstName} {this.props.employee.lastName}</td>
			</tr>

		</div>	
		)
	}
}
class ComputerPartList extends React.Component {

	constructor(props) {
		super(props);
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(e) {
		e.preventDefault();
		var pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
		if (/^[0-9]+$/.test(pageSize)) {
			this.props.updatePageSize(pageSize);
		} else {
			ReactDOM.findDOMNode(this.refs.pageSize).value = pageSize.substring(0, pageSize.length - 1);
		}
	}

	render() {
		var computerParts = this.props.computerParts.map(computerPart =>
				<ComputerPart key={computerPart.entity._links.self.href}
						  computerPart={computerPart}
						  attributes={this.props.attributes}
						  onUpdate={this.props.onUpdate}/>
		);

		return (
			
			<center>
				<table>
					<tbody>
						<tr>
							<th>ชื่ออะไหล่</th>
							<th>ราคา</th>
							<th>จำนวน</th>
							<th></th>
						</tr>
						{computerParts}
					</tbody>
				</table>
			</center>
			
		)
	}
}
class ComputerPart extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<tr>
				<td>{this.props.computerPart.entity.partsName}</td>
				<td>{this.props.computerPart.entity.price}</td>
				<td>{this.props.computerPart.entity.amount}</td>
				<td>
					<UpdateDialog computerPart={this.props.computerPart}
								  attributes={this.props.attributes}
								  onUpdate={this.props.onUpdate}/>
				</td>
			</tr>
		)
	}
}
class ReceiptList extends React.Component{
	render() {
		var receipts = this.props.receipts.map(receipt =>
			<Receipt key={receipt._links.self.href} receipt={receipt} />
		);
		
		return (
		<center>
			<table>
				<tbody>
					{receipts[this.props.length]}
				</tbody>
			</table>
		</center>
		)
	}
}
class Receipt extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		
		return (
		<div>
			<tr>
				<td>ราคารวม</td>
				<td>{this.props.receipt.totalprice} บาท</td>
			</tr>
			<tr><td>วันที่และเวลาสั่งซื้อ</td>
				<td>{new Date(this.props.receipt.date).getDate()}/
                        {new Date(this.props.receipt.date).getMonth()+1}/
                        {new Date(this.props.receipt.date).getFullYear()}&nbsp;
                        {new Date(this.props.receipt.date).getHours()}:
                        {new Date(this.props.receipt.date).getMinutes()}</td>
			</tr>
		</div>	
		)
	}
}
class ComputerPartList2 extends React.Component{
	render() {
		var computerParts = this.props.computerParts.map(computerPart =>
			<ComputerPart2 key={computerPart._links.self.href} computerPart={computerPart}/>
		);
		return (
		<center>
			<table>
				<tbody>
					<tr><th colSpan="3">รายการการสั่งซื้อ</th></tr>
					<tr>
						<th>ชื่ออะไหล่</th>
						<th>ราคา</th>
						<th>จำนวน</th>
					</tr>
					{computerParts}
				</tbody>
			</table>
		</center>
		)
	}
}
class ComputerPart2 extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if(this.props.computerPart.amount > 0){
		return (
			<tr>
				<td>{this.props.computerPart.partsName}</td>
				<td>{this.props.computerPart.price}</td>
				<td>{this.props.computerPart.amount}</td>
			</tr>
		)
		}else{ return(null)}
	}
}

ReactDOM.render(<App />, document.getElementById('react'));