var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users: []};
    this.state = {
      title: props.title ? props.title : 'Custom Page',
      nextTitle: null,
      Username: '',
      Password: '',
      x:'',
      y:'',
      userslength:null,
    };
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/users'}).done(response => {
      this.setState({users: response.entity._embedded.users});
    });
    client({method: 'GET', path: '/api/users'}).done(response => {
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
    var x,y;
    //while(i < this.state.userslength){
    for(var i=0 ; i<this.state.userslength ; i++){
      if(this.state.users[i].username === this.state.Username && this.state.users[i].password === this.state.Password ){
        ons.notification.alert(this.state.Username + ' is now signed in!');
        this.props.navigator.pushPage({ component: Menu, 
             props: { key: 'Menu', 
             Username: this.state.Username} });
        break;
      }
      else{
        //ons.notification.alert('Username or Password incorrect!');
        continue;
      }
      //i++;
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

{
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
{/*Page Menu---------------------------------------------------------------*/}
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title ? props.title : 'Custom Page',
      nextTitle: null,
      mUser: props.Username
    };
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>ร้านซ่อมคอมพิวเตอร์</div>
      </Ons.Toolbar>
    );
  }

  pushPageRepairInvoice() {
    this.props.navigator.pushPage({ component: RepairInvoice, props: { key: 'RepairInvoice' } });
  }

  pushPageRepairUpdate() {
      this.props.navigator.pushPage({ component: RepairUpdate, props: { key: 'RepairUpdate' } });
    }

  pushPagePayment() {
      this.props.navigator.pushPage({ component: Payment, props: { key: 'Payment' } });
    }

  pushPageReciept() {
      this.props.navigator.pushPage({ component: Reciept, props: { key: 'Reciept' } });
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

          <Ons.List>         
              <Ons.ListHeader><div style={{ textAlign: 'right' , paddingRight: '10px' }}>
                <ons-icon icon="ion-android-person"></ons-icon>&nbsp;&nbsp; 
                ผู้จัดการ : {this.state.mUser}
          </div></Ons.ListHeader></Ons.List>

          <div style={{ textAlign: 'center' }}>
          <h3>MENU</h3>
        
          <Ons.ListTitle>เลือกรายการ</Ons.ListTitle>
          <Ons.List>
              <Ons.ListItem onClick={this.pushPageManageEmployee.bind(this)}>
                  <ons-icon icon="ion-ios-people"></ons-icon>&nbsp;&nbsp;
                  จัดการข้อมูลพนักงาน </Ons.ListItem>

              <Ons.ListItem onClick={this.pushPageRepairInvoice.bind(this)}>
                  <ons-icon icon="ion-plus-circled"></ons-icon>&nbsp;&nbsp;
                  แจ้งซ่อมคอมพิวเตอร์</Ons.ListItem>

              <Ons.ListItem onClick={this.pushPageRepairUpdate.bind(this)}>
                  <ons-icon icon="ion-loop"></ons-icon>&nbsp;&nbsp;
                  อัพเดทสถานะการซ่อม</Ons.ListItem>

              <Ons.ListItem onClick={this.pushPagePayment.bind(this)}> 
                  <ons-icon icon="ion-printer"></ons-icon>&nbsp;&nbsp;
                  พิมพ์ใบแจ้งชำระเงิน</Ons.ListItem>

              <Ons.ListItem onClick={this.pushPageReciept.bind(this)}>
                  <ons-icon icon="ion-settings"></ons-icon>&nbsp;&nbsp;
                  สั่งซื้ออะไหล่</Ons.ListItem>
          
              <Ons.ListItem onClick={this.pushPageRating.bind(this)}>
                  <ons-icon icon="ion-ios-star"></ons-icon>&nbsp;&nbsp;
                  บันทึกแบบประเมินความพึงพอใจ</Ons.ListItem>

          </Ons.List>
          </div>

      </Ons.Page>
    );
  }
}

{
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
          <Ons.Navigator initialRoute={{ component: Home, props: { key: 'home' } }} renderPage={this.renderPage.bind(this)} ref={(navigator) => { this.navigator = navigator; }} />
        </Ons.SplitterContent>
      </Ons.Splitter>
    );
  }
}

ons.ready(function() {
  ReactDOM.render(<App />, document.getElementById('app'));
});

ReactDOM.render(<App />, document.getElementById('react'));