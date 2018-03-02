var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');
class App extends React.Component {
  renderPage(route, navigator) {
    route.props = route.props || {};
    route.props.navigator = navigator;

    return React.createElement(route.component, route.props);
  }
  render() {
    return (
      <Ons.Navigator initialRoute={{ component: Home, props: {key: 'Home'} }} renderPage={this.renderPage} />
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

          <h3>SIGN IN</h3>
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

{/*Page Menu---------------------------------------------------------------*/}
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
        <div className='left'></div>
        <div className='center'>ร้านซ่อมคอมพิวเตอร์</div>
        <div className="right" paddingRight="20px" paddingLeft="20px">
        <ons-icon size="30px" icon="ion-person"/>&nbsp;&nbsp;{this.state.Username}&nbsp;&nbsp;&nbsp;</div>
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
      this.props.navigator.pushPage({ component: Reciept, props: { key: 'Reciept' } });
    }

  pushPageRating() {
      this.props.navigator.pushPage({ component: Rating, props: { key: 'Rating' } });
    }

  pushPageManageEmployee() {
      this.props.navigator.pushPage({ component: ManageEmployee, props: { key: 'ManageEmployee' } });
    }

  showPageHome() {
    window.location.reload()
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

          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px'}}>  
            <Ons.Button onClick={this.showPageHome.bind(this)}>
              Logout 
            </Ons.Button>
          </div>

      </Ons.Page>
    );
  }
}

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {repairInvoices: []};
    this.state = {
      title: props.title ? props.title : 'Custom Page',
      rplength:0,
      repairID:1
    };
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/repairInvoices'}).done(response => {
      this.setState({repairInvoices: response.entity._embedded.repairInvoices});
      this.setState({rplength: response.entity._embedded.repairInvoices.length});
    });
  }

renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className="center ">Part of customer</div>
      </Ons.Toolbar>
    );
  }
push() {
   if(this.state.repairID >= 1 ||  this.state.nexTitle <= rplength ){
      this.props.navigator.pushPage({ component: PaymentTable, 
        props: { key: 'PaymentTable',
        repairID: this.state.repairID } });
  }else{
    ons.notification.alert("Don't found");
  }
 }
  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
      <br />
      <div style={{ textAlign: 'right' }}>
      <div className="right ">Empolyee ::: {this.state.title}</div></div>
        <div style={{ textAlign: 'center' }}>
        <br />
          <h1>รหัสการเเจ้งซ่อม</h1>
          <p>
            <Ons.Input modifier="underbar" placeholder="id"
            float onChange={evt => this.setState({ repairID: evt.target.value })} ></Ons.Input>
          </p>
            <br />
          <Ons.Button onClick={this.push.bind(this)}>
          Search
          </Ons.Button>
          <br /><br /><br /><br /><br /><br />
          <img src={"https://image.flaticon.com/icons/svg/119/119593.svg"} style={{ width: '50%' }} />
      </div>
      </Ons.Page>
    );
  }
}
class PaymentTable extends React.Component {
   constructor(props) {
    super(props);
    this.state = {computerParts: []};
    this.state = {
      title: props.title ? props.title : ' ',
      repairID:this.props.repairID,
      date:'',
      assue:'',
      amount1:0,
      amount2:0,
      amount3:0,
      amount4:0,
      amount5:0,
    };
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/computerParts'}).done(response => {
      this.setState({computerParts: response.entity._embedded.computerParts});
    });
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>ใบเเจ้งชำระสินค้า</div>
      </Ons.Toolbar>
    );
  }

  handleClickPrint(){
    ons.notification.alert('Ready for Print');
    this.props.navigator.pushPage({ component: PrintPayment, 
      props: { key: 'PrintPayment', 
    } });
  }

  handleClickSelected(computerPart, index) {
    //ons.notification.alert('เลือก ')
  }

  handleClickAmount(amount, index) {
    //ons.notification.alert('เลือก ')
    //client({method: 'GET', path: '/partsName/'+partsName+'/price/'+price+'/amount/'+amount})
  }


  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
      <br/>
      <div className="center ">รหัสการเเจ้งซ่อม : {this.state.repairID}</div>
      <br/>
      <tr>
      <div className="right ">Date : <Ons.Input modifier="underbar"  float onChange={evt => this.setState({ date: evt.target.value })} >
     </Ons.Input>
     </div>
     </tr>

     <br/><br/>
      <div style={{ textAlign: 'center' }}>
      <table>
      <tbody>
      <tr>
      <th width ="200px">No</th>
      <th width ="1000px">รายการ</th>
      <th width ="1000px">รายละเอียด</th>
      </tr>
      <tr>
      <td>1</td>
      <td>ค่าซ่อม</td>
       <td><Ons.Input modifier="underbar"  float onChange={evt => this.setState({ nexTitle: evt.target.value })} ></Ons.Input>
       </td>
      </tr>
      <tr>
      <td>2</td>
      <td>ระยะเวลาประกัน</td>
      <td>
        <Ons.Input modifier="underbar"  float onChange={evt => this.setState({ nexTitle: evt.target.value })} ></Ons.Input>
        <Ons.List>
          <Ons.ListItem >
            <Ons.Select id="choose-sel" 
              value={this.state.assue} 
              modifier={this.state.assue}
              onChange={evt => this.setState({assue: event.target.value})} >                         
                <option value="150">7 วัน</option>
                <option value="200">15 วัน</option>
                <option value="300">1 เดิอน</option>
                </Ons.Select>
          </Ons.ListItem>
        </Ons.List>
      </td>
      </tr>
      <tr>
      <td>3</td>
      <td>
        <p>อะไหล่</p>
      </td>
      <td>
      <Ons.List>
        <Ons.ListItem >
          <div className='left'>
            CPU : 
          </div>
          <div className='right'>
            <Ons.Input
              modifier="underbar" 
              placeholder="จำนวน CPU" 
              float 
              onChange={evt => this.setState({ amount1: evt.target.value })} >     
            </Ons.Input>
          </div>
        </Ons.ListItem>    
        <Ons.ListItem >
          <div className='left'>
            GraphicCard : 
          </div>
          <div className='right'>
            <Ons.Input
              modifier="underbar" 
              placeholder="จำนวน GraphicCard" 
              float 
              onChange={evt => this.setState({ amount2: evt.target.value })} >     
            </Ons.Input>
          </div>
        </Ons.ListItem>   
        <Ons.ListItem >
          <div className='left'>
            Ram : 
          </div>
          <div className='right'>
            <Ons.Input
              modifier="underbar" 
              placeholder="จำนวน Ram" 
              float 
              onChange={evt => this.setState({ amount3: evt.target.value })} >     
            </Ons.Input>
          </div>
        </Ons.ListItem>   
        <Ons.ListItem >
          <div className='left'>
            Mainboard : 
          </div>
          <div className='right'>
            <Ons.Input
              modifier="underbar" 
              placeholder="จำนวน Mainboard" 
              float 
              onChange={evt => this.setState({ amount4: evt.target.value })} >     
            </Ons.Input>
          </div>
        </Ons.ListItem>   
        <Ons.ListItem >
          <div className='left'>
            Harddisk : 
          </div>
          <div className='right'>
            <Ons.Input
              modifier="underbar" 
              placeholder="จำนวน Harddisk" 
              float 
              onChange={evt => this.setState({ amount5: evt.target.value })} >     
            </Ons.Input>
          </div>
        </Ons.ListItem>   
      </Ons.List>  
      </td>
      </tr>
      </tbody>
      </table>
      </div><br/><br/>
      <section style={{textAlign: 'center'}}>
        <Ons.Button onClick={this.handleClickPrint.bind(this)}>บันทึก</Ons.Button>
        <Ons.Button onClick={this.handleClickPrint.bind(this)}>Print </Ons.Button>
      </section>
      </Ons.Page>
    );
  }

}

class PrintPayment extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     title: props.title ? props.title : ' ',
     repairID:this.props.repairID,
     date:''
   };
 }

 renderToolbar() {
   return (
     <Ons.Toolbar>
       <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
       <div className='center'>ใบเเจ้งชำระสินค้า</div>
     </Ons.Toolbar>
   );
 }
 handleClick(){
   ons.notification.alert('Ready for Print');
    this.props.navigator.pushPage({ component: PrintPayment, 
      props: { key: 'PrintPayment', 
      repairID: this.state.repairID,
      date:this.state.date
    } });
} 
 

 render() {
   return (
     <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
     <br/>
     <div className="center ">รหัสการเเจ้งซ่อม : {this.state.repairID}</div>
     <br/>
     <tr>
     <div className="right ">Date : <Ons.Input modifier="underbar"  float onChange={evt => this.setState({ date: evt.target.value })} >
    </Ons.Input>
    </div>
    </tr>

    <br/><br/>
     <div style={{ textAlign: 'center' }}>
     <table>
     <tbody>
     <tr>
     <th width ="200px">No</th>
     <th width ="1000px">รายการ</th>
     <th width ="1000px">ราคา(บาท)</th>
     </tr>
     <tr>
     <td>1</td>
     <td>ค่าซ่อม</td>
      <td><Ons.Input modifier="underbar"  float onChange={evt => this.setState({ nexTitle: evt.target.value })} ></Ons.Input>
      </td>
     </tr>
     <tr>
     <td>2</td>
     <td>ค่าประกัน</td>
     <td><Ons.Input modifier="underbar"  float onChange={evt => this.setState({ nexTitle: evt.target.value })} ></Ons.Input>
     </td>
     </tr>
     <tr>
     <td>3</td>
     <td>ของสั่งชื้อ</td>
     <td><Ons.Input modifier="underbar"  float onChange={evt => this.setState({ nexTitle: evt.target.value })} ></Ons.Input>
     </td>
     </tr>
     <br/><br/>
     <tr>
     <td> </td>
     <td>Total Price </td>
     <td><Ons.Input modifier="underbar"  float onChange={evt => this.setState({ nexTitle: evt.target.value })} ></Ons.Input>
     </td>
     </tr>
     </tbody>
     </table>
     </div><br/><br/>
     <section style={{textAlign: 'center'}}>
       <Ons.Button onClick={this.handleClick}>Print </Ons.Button>
     </section>
     </Ons.Page>
   );
 }

}

ons.ready(function() {
  ReactDOM.render(<App />, document.getElementById('react'));
});





