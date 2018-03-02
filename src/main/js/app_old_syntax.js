'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');
var root = '/api';
var when = require('when');
var follow = require('./follow');
var datetime = new Date().toLocaleString();
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
      eid:0,
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
             eid:i+1
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
	this.state = {employees: []};
    this.state = {
      title: props.title ? props.title : 'Custom Page',
      nextTitle: null,
      Username: props.Username,
      eid: props.eid,
	  position:null
    };
  }
  
    componentDidMount() {
    client({method: 'GET', path: '/api/employees'}).done(response => {
      this.setState({employees: response.entity._embedded.employees});
      this.setState({position:this.state.employees[this.state.eid-1].position});
    });
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
        eid:this.state.eid
      } });
  } 

  pushPageRepairUpdate() {
		this.props.navigator.pushPage({ 
			component: MakeRepairUpdate, 
			props: { key: 'MakeRepairUpdate1',
			Username: this.state.Username,
			eid: this.state.eid }
		});
	}

  pushPagePayment() {
    this.props.navigator.pushPage({ component: Payment, 
      props: { key: 'Payment', 
      Username: this.state.Username,
      eid:this.state.eid
      } });
    }

  pushPageReciept() {
      this.props.navigator.pushPage({ component: Reciept, 
        props: { key: 'Reciept', 
        Username: this.state.Username,
        eid:this.state.eid
        } });
      
    }

  pushPageRating() {
    this.props.navigator.pushPage({ component: Rating, 
      props: { key: 'Rating', 
      Username: this.state.Username,
      } });
    }

  pushPageManageEmployee() {
      this.props.navigator.pushPage({ component: ManageEmployee, props: { key: 'ManageEmployee' } });
    }

  showPageHome() {
    window.location.reload()
  }

  render() {
	if(this.state.position === 'manager'){
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>

          <div style={{ textAlign: 'center' }}>
          <h3>MENU</h3>
        
          <Ons.ListTitle>เลือกรายการ</Ons.ListTitle>
          <Ons.List>
			<Ons.ListItem tappable onClick={this.pushPageManageEmployee.bind(this)}>
                  <ons-icon icon="ion-ios-people"></ons-icon>&nbsp;&nbsp;
                  จัดการข้อมูลพนักงาน </Ons.ListItem>

              <Ons.ListItem tappable onClick={this.pushPageRepairInvoice.bind(this)}>
                  <ons-icon icon="ion-plus-circled"></ons-icon>&nbsp;&nbsp;
                  แจ้งซ่อมคอมพิวเตอร์</Ons.ListItem>

              <Ons.ListItem tappable onClick={this.pushPageRepairUpdate.bind(this)}>
                  <ons-icon icon="ion-loop"></ons-icon>&nbsp;&nbsp;
                  อัพเดทสถานะการซ่อม</Ons.ListItem>

              <Ons.ListItem tappable onClick={this.pushPagePayment.bind(this)}> 
                  <ons-icon icon="ion-printer"></ons-icon>&nbsp;&nbsp;
                  พิมพ์ใบแจ้งชำระสินค้า</Ons.ListItem>

              <Ons.ListItem tappable onClick={this.pushPageReciept.bind(this)}>
                  <ons-icon icon="ion-settings"></ons-icon>&nbsp;&nbsp;
                  สั่งซื้ออะไหล่</Ons.ListItem>
          
              <Ons.ListItem tappable onClick={this.pushPageRating.bind(this)}>
                  <ons-icon icon="ion-ios-star"></ons-icon>&nbsp;&nbsp;
                  บันทึกแบบประเมินความพึงพอใจ</Ons.ListItem>

              

          </Ons.List>
          </div>

          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px'}}>  
            <Ons.Button onClick={this.showPageHome.bind(this)}>
              Logout 
            </Ons.Button>
          </div>

      </Ons.Page>
    );
	}else{
      
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
                  พิมพ์ใบแจ้งชำระสินค้า</Ons.ListItem>

              <Ons.ListItem tappable onClick={this.pushPageReciept.bind(this)}>
                  <ons-icon icon="ion-settings"></ons-icon>&nbsp;&nbsp;
                  สั่งซื้ออะไหล่</Ons.ListItem>
          
              <Ons.ListItem tappable onClick={this.pushPageRating.bind(this)}>
                  <ons-icon icon="ion-ios-star"></ons-icon>&nbsp;&nbsp;
                  บันทึกแบบประเมินความพึงพอใจ</Ons.ListItem>

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
}

{/*MakeRepairInvoice------------------------------------------------------------------------*/}
class MakeRepairInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title ? props.title : 'Custom Page',
      nextTitle: null
    }
      this.handleClickSelectedEmp = this.handleClickSelectedEmp.bind(this);
      this.handleClickSave = this.handleClickSave.bind(this);
      this.state = {employees: []};
      this.state = {
        dialogShown: false,
        Username:props.Username,
        dateIn:null,
        dateOut:null,
        cid:0,
        pid:0,
        sid:props.eid,
        rid:0,
        cusFirstName:null,
        cusLastName:null,
        cusTel:null,
        modifier:'',
        Type:null,
        Brand:null,
        Model:null,
        Color:null,
        Problem:null,
        Note:null,
        repairFirstName:'',
        repairLastName:'',
        repairTel:'',
        salesFirstName:'',
        salesLastName:'',
        salesTel:'',
      }
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/users'}).done(response => {
      this.setState({users: response.entity._embedded.users});
    });
    client({method: 'GET', path: '/api/employees'}).done(response => {
        this.setState({employees: response.entity._embedded.employees});
        this.setState({salesFirstName:this.state.employees[this.state.sid-1].firstName});
        this.setState({salesLastName:this.state.employees[this.state.sid-1].lastName});
        this.setState({salesTel:this.state.employees[this.state.sid-1].tel});
    });
  }

  

  showDialog() {
    if(this.state.dateIn == null || this.state.dateOut == null ||
      this.state.rid == 0 ||
      this.state.cusFirstName == null || this.state.cusLastName == null || this.state.cusTel == null ||
      this.state.Type == null || this.state.Brand == null || this.state.Color == null || this.state.Problem == null
    ){
      ons.notification.alert('กรุณากรอกข้อมูลให้ครบ!')
    }else{
      this.setState({dialogShown: true});
    }
  }

  hideDialog() {
    this.setState({dialogShown: false});
    this.props.navigator.pushPage({ component: PrintRepairInvoice, 
      props: { key: 'PrintRepairInvoice' ,
      Username:this.state.Username,
      customerName:this.state.cusFirstName + " " + this.state.cusLastName,
      Type:this.state.Type,
      Brand:this.state.Brand,
      Model:this.state.Model,
      Color:this.state.Color,
      Problem:this.state.Problem,
      Note:this.state.Note,
      sid:this.state.sid,
      salesName:this.state.salesFirstName + " " + this.state.salesLastName,
      salesTel:this.state.salesTel,
      repairName:this.state.repairFirstName + " " + this.state.repairLastName,
      repairTel:this.state.repairTel,
      dateIn:this.state.dateIn,
      dateOut:this.state.dateOut,
       //
      } });
  }

  handleClickSave(cusFirstName,cusLastName,cusTel,Type,Brand,Model,Color,Problem,Note,dateIn,dateOut,sid,rid) {
    return function () {
      client({method: 'GET', path: '/cusFirstName/'+cusFirstName+'/cusLastName/'+cusLastName+'/cusTel/'+cusTel}).done(
          client({method: 'GET', path: '/Type/'+Type+'/Brand/'+Brand+'/Model/'+Model+'/Color/'+Color+'/Problem/'+Problem+'/Note/'+Note}).done(
              client({method: 'GET', path: '/dateIn/'+dateIn+'/dateOut/'+dateOut+'/salesEmp/'+sid+'/repairEmp/'+rid}).done(
                ons.notification.alert('บันทึกข้อมูลสำเร็จ!')
          )
        )
      )
    }
  }

  pushPage() {
    ons.notification.alert('บันทึกข้อมูลสำเร็จ');
    this.props.navigator.pushPage({ component: PrintRepairInvoice, 
         props: { key: 'PrintRepairInvoice' ,

          //
         } });
  }
 
  handleClickSelectedEmp(employee, index) {
    //ons.notification.alert('เลือก ' + employee.firstName +" " +employee.lastName)
    this.setState({repairFirstName: employee.firstName})
    this.setState({repairLastName: employee.lastName}) 
    this.setState({repairTel: employee.tel}) 
    this.setState({rid: index+1});
  }

  renderRow(row, index) {
    if(row.position === 'repair'){
    return(
      <Ons.ListItem 
          tappable
          key={row._links.self.href}
          data={row}
          onClick={this.handleClickSelectedEmp.bind(this, row, index)}
          >
          <div className='left'>
              <ons-icon size="25px"  icon="ion-wrench"/> &nbsp;&nbsp;
              {index+1}
          </div>
          <div className="center">
              {row.firstName}&nbsp;{row.lastName}
          </div>
      </Ons.ListItem>
    )
    }
  }

    renderToolbar() {
      return (
        <Ons.Toolbar>
          <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
          <div className="center">แบบฟอร์มการแจ้งซ่อมคอมพิวเตอร์</div>
          <div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>&nbsp;&nbsp;{this.state.Username}&nbsp;&nbsp;&nbsp;</div>
        </Ons.Toolbar>
      );
    }
  
    render() {
      return (
        <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}>  
            <h4><ons-icon size="25px"  icon="ion-calendar"></ons-icon>&nbsp;&nbsp; วันที่แจ้งซ่อม - วันที่ส่งคืน</h4>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วันที่แจ้งซ่อม :
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                  type="date" 
                  placeholder="วันที่ส่งคืน" 
                  ng-model="dateValue"
                  value={this.state.value}
                  onChange={evt => this.setState({ dateIn: evt.target.value })}>
              </input>
            </p>
                
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วันที่ส่งคืน :
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                  type="date" 
                  placeholder="วันที่ส่งคืน" 
                  ng-model="dateValue"
                  value={this.state.value}
                  onChange={evt => this.setState({ dateOut: evt.target.value })}>
              </input>
            </p>
          </div>
          {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <Ons.List><Ons.ListHeader></Ons.ListHeader></Ons.List>
          {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}>  
            <h4><ons-icon size="25px"  icon="ion-person"></ons-icon>&nbsp;&nbsp;ข้อมูลลูกค้า</h4>
              <p>
               <Ons.Input modifier="underbar" 
                   placeholder="ชื่อ" 
                   float 
                   onChange={evt => this.setState({ cusFirstName: evt.target.value })} >     
               </Ons.Input>
              </p>
              <p>
               <Ons.Input modifier="underbar" 
                   placeholder="นามสกุล" 
                   float 
                   onChange={evt => this.setState({ cusLastName: evt.target.value })} >     
               </Ons.Input>
              </p>
              <p>
               <Ons.Input modifier="underbar" 
                   placeholder="เบอร์โทรศัพท์" 
                   float 
                   onChange={evt => this.setState({ cusTel: evt.target.value })} >     
               </Ons.Input>
              </p>
          </div>
          {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <Ons.List><Ons.ListHeader></Ons.ListHeader></Ons.List>
          {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px'}}>  
            <center>
            <h4><ons-icon  size="25px" icon="ion-wrench"></ons-icon>&nbsp;&nbsp; รายละเอียดคอมพิวเตอร์</h4>
              <Ons.List style={{width: '500px'}}>
                <Ons.ListItem >
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    ประเภท&nbsp;&nbsp;: &nbsp;&nbsp;
                    <Ons.Select id="choose-sel" 
                      value={this.state.Type} 
                      modifier={this.state.Type}
                      onChange={evt => this.setState({Type: event.target.value})} >                         
                        <option value="ไม่ระบุ">ไม่ระบุ</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Printer">Printer</option>
                    </Ons.Select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <p style={{ opacity: '0.6' , color: 'red'}}>**</p>
                </Ons.ListItem>
                

                <Ons.ListItem>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  ยี่ห้อ&nbsp;&nbsp;: &nbsp;&nbsp;
                    <Ons.Select id="choose-sel" 
                      value={this.state.Brand} 
                      modifier={this.state.Brand}
                      onChange={evt => this.setState({Brand: event.target.value})} >   
                        <option value="ไม่ระบุ">ไม่ระบุ</option>
                        <option value="DELL">DELL</option>
                        <option value="Toshiba">Toshiba</option>
                        <option value="Acer">Acer</option>
                        <option value="lenovo">lenovo</option>
                        <option value="hp">hp</option>
                    </Ons.Select> 
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <p style={{ opacity: '0.6' , color: 'red'}}>**</p>					
                </Ons.ListItem>

                <Ons.ListItem>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  รุ่น&nbsp;&nbsp;: &nbsp;&nbsp;
                    <Ons.Input modifier="" 
                      placeholder="เช่น Inspiron 14"
                      float 
                      onChange={evt => this.setState({ Model: evt.target.value })} >     
                    </Ons.Input>
                </Ons.ListItem>

                <Ons.ListItem>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  สี&nbsp;&nbsp;: &nbsp;&nbsp;
                    <Ons.Select id="choose-sel" 
                      value={this.state.Color} 
                      modifier={this.state.Color}
                      onChange={evt => this.setState({Color: event.target.value})} >  
                        <option value="ไม่ระบุ">ไม่ระบุ</option>
                        <option value="Black">ดำ</option>
                        <option value="Silver">เงิน</option>
                        <option value="Red">แดง</option>
                    </Ons.Select>     
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <p style={{ opacity: '0.6' , color: 'red'}}>**</p>
                </Ons.ListItem>
 
                <Ons.ListItem>
                  ปัญหาเรื่อง&nbsp;&nbsp;: &nbsp;&nbsp;
                    <Ons.Select id="choose-sel" 
                      value={this.state.Problem} 
                      modifier={this.state.Problem}
                      onChange={evt => this.setState({Problem: event.target.value})} >   
                        <option value="ไม่ระบุ">ไม่ระบุ</option>
                        <option value="Software">Software</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Sound">เสียง</option>
                        <option value="Screen">จอ</option>
                        <option value="Keyboard">แป้นพิมพ์</option>
                    </Ons.Select>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <p style={{ opacity: '0.6' , color: 'red'}}>**</p>
                </Ons.ListItem>   

                <Ons.ListItem>&nbsp;&nbsp;
                  หมายเหตุ : &nbsp;&nbsp;
                  <Ons.Input modifier="" 
                    placeholder="รายละเอียด"
                    float 
                    onChange={evt => this.setState({ Note: evt.target.value })} >     
                  </Ons.Input>
                </Ons.ListItem>  
              </Ons.List > 
            </center>
          </div>
          {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <Ons.List><Ons.ListHeader></Ons.ListHeader></Ons.List>
          {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px'}}>  
            <h4><ons-icon size="25px"  icon="ion-person"></ons-icon>&nbsp;&nbsp;เลือกพนักงานซ่อม</h4>
            <h3>เลือก .. {this.state.repairFirstName} {this.state.repairLastName}</h3>
              <center>
              <Ons.List style={{width: '500px'}}>
                <Ons.ListHeader>รายชื่อพนักงานซ่อม</Ons.ListHeader>
              </Ons.List>
              
              <Ons.List
                style={{width: '500px'}}
                dataSource={this.state.employees}
                renderRow={this.renderRow}
                handleClickSelectedEmp={this.handleClickSelectedEmp} 
              />
              </center>
          </div>
          {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <div style={{ textAlign: 'center', paddingTop:'15px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}> 

            <Ons.Button onClick={this.showDialog.bind(this)}>
              บันทึกและพิมพ์ใบแจ้งซ่อม
            </Ons.Button>
          
            <Ons.Dialog
              isOpen={this.state.dialogShown}
            >
            <div style={{textAlign: 'center', margin: '20px'}}>
              <p style={{opacity: 0.5}}>บันทึก-พิมพ์ใบแจ้งซ่อม</p>
              <p>
                <Ons.Button onClick={this.handleClickSave(
                  this.state.cusFirstName,this.state.cusLastName,this.state.cusTel,
                  this.state.Type,this.state.Brand,this.state.Model,this.state.Color,this.state.Problem,this.state.Note,
                  this.state.dateIn, this.state.dateOut, this.state.sid,this.state.rid
                  )}>
                    บันทึก
                  </Ons.Button>
                  &nbsp;&nbsp;&nbsp;
                  <Ons.Button onClick={this.hideDialog.bind(this)}>พิมพ์ใบแจ้งซ่อม</Ons.Button>
              </p>
            </div>
          </Ons.Dialog>

          </div>
        </Ons.Page>
      );
    }
  }
  {/*PrintRepairInvoice-------------------------------------------------------------------*/}
  class PrintRepairInvoice extends React.Component {
    constructor(props) {
      super(props);
      this.state = {repairInvoices: []};
      this.state = {
        title: props.title ? props.title : 'Custom Page',
        nextTitle: null,
      sid:props.sid,
      Username:props.Username,
      repairInvoiceslength:0,
      customerName: props.customerName,
      Type: props.Type,
      Brand: props.Brand,
      Model: props.Model,
      Color: props.Color,
      Problem: props.Problem,
      Note: props.Note,
      salesName: props.salesName,
      salesTel: props.salesTel,
      repairName: props.repairName,
      repairTel: props.repairTel,
      dateIn: props.dateIn,
      dateOut: props.dateOut
    };
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/repairInvoices'}).done(response => {
      this.setState({repairInvoices: response.entity._embedded.repairInvoices});
      this.setState({repairInvoiceslength: response.entity._embedded.repairInvoices.length});
    });
  }
  
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'></div>
        <div className='center'>ใบแจ้งซ่อมคอมพิวเตอร์</div>
        <div className='right'>
            <Ons.Button modifier='quiet' 
              onClick={this.showPageMenu.bind(this)}
            >
              <ons-icon size="25px"  icon="ion-home"/>  Menu 
            </Ons.Button>
            
            
        </div>
      </Ons.Toolbar>
    );
  }

  

  showPageMenu() {
    this.props.navigator.resetPage({
      component: Menu,
      key: 'Menu',
      props: {
        Username: this.state.Username,
        eid:this.state.sid}
    }); 
  }

  print(){
    window.print();
  }

  render() {
    if(this.state.Model == null){
      this.setState({Model: "ไม่ระบุ"});
    }
    if(this.state.Note == null){
      this.setState({Note: "ไม่ระบุ"});
    }
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>

        <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px'}}>  
        <center>
        <Ons.Card style={{width: '400px', backgroundColor: '#7f9cc5'}}>
          <div style={{ textAlign: 'center' }}>   
                <h4> 
                <ons-icon size="25px" icon="ion-chevron-left"></ons-icon>
                  &nbsp;&nbsp;&nbsp;
                  ใบแจ้งซ่อมคอมพิวเตอร์ 
                  &nbsp;&nbsp;&nbsp;
                <ons-icon size="25px" icon="ion-chevron-right"></ons-icon>
                </h4>  
                <p> คุณ{this.state.customerName} </p>
              
                      <div>
                      <Ons.Card style={{ textAlign: 'center'}}>
                      <p><b>รหัสการแจ้งซ่อม : 2017_{this.state.repairInvoiceslength}</b></p>
  
                      <p>วันที่รับแจ้ง : {this.state.dateIn}</p>
                      <p>&nbsp;&nbsp;วันที่รับคืน : {this.state.dateOut}</p>
                      <p style={{ opacity: '0.6'}} >หมายเหตุ : วันที่รับคืนอาจเปลี่ยนแปลงได้ </p>
                      </Ons.Card>
                      </div>



                      <div>
                      <Ons.Card style={{ textAlign: 'center'}}>
                      <center>

                      <table>
                        <tbody class="list">
                        <tr>
                          <td><b>ประเภท</b> : {this.state.Type}</td>
                          <td><b>ยี่ห้อ</b> : {this.state.Brand}</td>
                        </tr>
                        <tr>
                        <td><b>รุ่น</b> : {this.state.Model}</td>
                        <td><b>สี</b> : {this.state.Color}</td>
                        </tr>
                        <tr>
                        <td><b>ปัญหา</b> : {this.state.Problem}</td>
                        <td><b>หมายเหตุ</b> : {this.state.Note}</td>
                        </tr>                           
                        </tbody>
                      </table>
                      </center>
                      </Ons.Card>
                      </div>

                      <div>
                      <Ons.Card style={{ textAlign: 'center'}}>
                      <div style={{ textAlign: 'Left', paddingLeft:'25'}}>
                      <p><b>พนักงานขาย</b></p>
                      <p style={{ textAlign: 'Left', paddingLeft:'55'}}>ชื่อ : {this.state.salesName}</p>
                      <p style={{ textAlign: 'Left', paddingLeft:'55'}}>เบอร์โทรศัพท์ : {this.state.salesTel}</p>
                      </div>
                  
                      <div style={{ textAlign: 'Left', paddingLeft:'25'}}>
                      <p><b>พนักงานซ่อม</b></p>
                      <p style={{ textAlign: 'Left', paddingLeft:'55'}}>ชื่อ : {this.state.repairName}</p>
                      <p style={{ textAlign: 'Left', paddingLeft:'55'}}>เบอร์โทรศัพท์ : {this.state.repairTel}</p>
                      </div>
                      </Ons.Card>
                      </div>
               
            
              
          </div>
        </Ons.Card>
        </center>
        </div>

           <p style={{textAlign: 'Center',  paddingTop: '15px'}}>
           <Ons.Button onClick={this.print.bind(this)}>
             <ons-icon size="30px" icon="ion-printer"></ons-icon> 
             &nbsp;&nbsp;&nbsp;
             PRINT</Ons.Button></p>    

      </Ons.Page>
    );
  }
}
{/*
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  WARI
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
*/}

class PrintRepairResults extends React.Component{

   	constructor(props) {
      	super(props);
        this.state = { statuses:[] ,
		eid : props.eid,repairID: props.repairID,
		cusFname: props.cusFname,
		cusLname: props.cusLname,
		empFname: props.empFname,
		empLname: props.empLname};
	}
	
	componentDidMount() {
		client({method: 'GET', path: '/api/statuses'}).done(response => {
			this.setState({statuses: response.entity._embedded.statuses});
		});
	}
	 showPageMenu() {
    this.props.navigator.resetPage({
      component: Menu,
      key: 'Menu',
      props: {
        Username: this.state.Username,
        eid:this.state.eid}
    }); 
  }
	popPage() {
		this.props.navigator.popPage();
	}

	print(){
		window.print();
	}


   	renderToolbar() {
		return (
		<Ons.Toolbar>
			<div className='center'>อัพเดทสถานะการซ่อมคอมพิวเตอร์</div>
			<div className='right'>
            <Ons.Button modifier='quiet' 
              onClick={this.showPageMenu.bind(this)}
            >
              <ons-icon size="25px"  icon="ion-home"/>  Menu 
            </Ons.Button>
            
        </div>
		</Ons.Toolbar>
		);
	}

	renderRow(row, index) {
		return(
		  	<Ons.ListItem tappable

			  	key={row._links.self.href}
			  	data={row}>

			  	<div className="center">
					<h3>
				  	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				  	{row.inform}
				  	<br/>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				  	{new Date(row.datetime).getDate()}/
                    {new Date(row.datetime).getMonth()+1}/
                    {new Date(row.datetime).getFullYear()}&nbsp;
                	{new Date(row.datetime).getHours()}:
                    {new Date(row.datetime).getMinutes()}
					</h3>
			  	</div>

		  </Ons.ListItem>
		)
	}

   	render() {
      	return (
         	<Ons.Page renderToolbar={this.renderToolbar.bind(this)}>

				<div style={{ textAlign: 'center' }}>
					<h3>สถานะของการซ่อมคอมพิวเตอร์</h3>
					<p>รหัสการเเจ้งซ่อม : {this.state.repairID}
					&nbsp;&nbsp;&nbsp;&nbsp; 
					ลูกค้า : {this.state.cusFname} {this.state.cusLname}
					&nbsp;&nbsp;&nbsp;&nbsp; 
					พนักงาน : {this.state.empFname} {this.state.empLname}</p>
					<br/><br/>
					<Ons.List
						dataSource={this.state.statuses}
						renderRow={this.renderRow} />
						
						<br/>
						<Ons.Button onClick={this.popPage.bind(this)}>
							เพิ่มข้อมูล
						</Ons.Button>

						&nbsp;&nbsp;&nbsp;&nbsp;
						<Ons.Button onClick={this.print.bind(this)}>
							<ons-icon size="30px" icon="ion-printer"></ons-icon> 
								&nbsp;&nbsp;&nbsp;
								PRINT
						</Ons.Button>
					<br/><br/>
					<section style={{textAlign: 'center'}}>
					  	<img src={"https://image.flaticon.com/icons/svg/603/603809.svg"} alt="Onsen UI" style={{ width: '10%' }} />
				   	</section>
						
						
				</div>

         	</Ons.Page>
      	);
   	}

} // end class


class UpdateSt extends React.Component {
	constructor(props) {
	   	super(props);
		this.handleClickSave = this.handleClickSave.bind(this);
	   	this.state = {statuses: []};
	   	this.state = {
		 	eid:props.eid,
	   		newstatus: "รับแจ้งซ่อม",
			   date: new Date(),
		repairID: props.repairID,
		assure:null,
		repair:null,
		cusFname:'',
		cusLname:'',
		empFname:'',
		empLname:'',
	   	}
	}
	 componentDidMount() {
	client({method: 'GET', path: '/api/customers'}).done(response => {
    this.setState({customers: response.entity._embedded.customers});
    this.setState({cusFname:this.state.customers[this.state.repairID-1].firstName});
    this.setState({cusLname:this.state.customers[this.state.repairID-1].lastName});
	});
	client({method: 'GET', path: '/api/employees'}).done(response => {
    this.setState({employees: response.entity._embedded.employees});
    this.setState({empFname:this.state.employees[this.state.eid-1].firstName});
    this.setState({empLname:this.state.employees[this.state.eid-1].lastName});
	});
}
	
	handleClickSave(eid, newstatus,repairID) {
		return function() {
			client({method: 'GET', path: '/eid/'+eid+'/statuses/'+newstatus+'/repairID/'+repairID}).done(
				ons.notification.alert('success!')
			)
		}
	}

	pushPage() {
		this.props.navigator.pushPage({ component: PrintRepairResults, props: { key: 'PrintRepairResults' 
		,eid:this.state.eid,repairID: this.state.repairID,
		cusFname: this.state.cusFname,
		cusLname: this.state.cusLname,
		empFname: this.state.empFname,
		empLname: this.state.empLname} });
	}
	
	renderToolbar() {
	 	return (
			<Ons.Toolbar>
			 	<div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
			 	<div className='center'>อัพเดทสถานะการซ่อมคอมพิวเตอร์</div>
			 	<div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>&nbsp;&nbsp;{this.state.Username}&nbsp;&nbsp;&nbsp;</div>
		 	</Ons.Toolbar>
		);
	}
 
	render() {
		return (
			<Ons.Page renderToolbar={this.renderToolbar.bind(this)}>

				<div style={{ textAlign: 'center' }}> 
 					<h3>เพิ่มสถานะของการซ่อมคอมพิวเตอร์</h3>
					<p>รหัสการเเจ้งซ่อม : {this.state.repairID}
					&nbsp;&nbsp;&nbsp;&nbsp; 
					ลูกค้า : {this.state.cusFname} {this.state.cusLname}
					&nbsp;&nbsp;&nbsp;&nbsp; 
					พนักงาน : {this.state.empFname} {this.state.empLname}</p>
					<br/><br/>
					<Ons.Card> 
						<div className="content">
 							{this.props.fname}&nbsp;&nbsp;{this.props.lname}		
							<Ons.List >
								<br/>
								<h3>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								Date : &nbsp;&nbsp;&nbsp;{datetime} 		 
					
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

								Status : &nbsp;&nbsp;&nbsp;
								<Ons.Select id = "choose-status" 
									value = {this.state.newstatus}
									onChange = {evt => this.setState({newstatus: event.target.value })} >  
										<option  value = "รับแจ้งซ่อม">รับแจ้งซ่อม</option>
										<option  value = "อยู่ระหว่างการซ่อม">อยู่ระหว่างการซ่อม</option>
										<option  value = "กำลังรออะไหล่">กำลังรออะไหล่</option>
										<option  value = "ดำเนินการซ่อมเสร็จสมบูรณ์">ดำเนินการซ่อมเสร็จสมบูรณ์</option>
										<option  value = "ส่งคืนลูกค้าแล้ว">ส่งคืนลูกค้าแล้ว</option>
								</Ons.Select> 
								</h3>
								<br/>
							</Ons.List > 

				   		</div>
			 		</Ons.Card>
 
				 	<br/>
				   	<div style={{ textAlign: 'center'}}> 
					 	<Ons.Button onClick={this.handleClickSave(this.state.eid, this.state.newstatus,this.state.repairID)}>
						 	บันทึกข้อมูล
					 	</Ons.Button> 
						
						<br/><br/><br/>
					 	<Ons.Button onClick= {this.pushPage.bind(this)}>
						 	สถานะของการซ่อมคอมพิวเตอร์
					   	</Ons.Button>
				   </div>

				   <br/><br/>
					<section style={{textAlign: 'center'}}>
					  	<img src={"https://image.flaticon.com/icons/svg/253/253983.svg"} alt="Onsen UI" style={{ width: '10%' }} />
				   	</section>				  
 
				</div> 
		  </Ons.Page> 

	   	);
	}
	 
 } // end class 


class MakeRepairUpdate extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {customers: []};	
		this.state = {
			title: props.title ? props.title : 'Custom Page',
			nextTitle: null,
			customerslength: null,
			Username: props.Username,
			eid: props.eid,
			 rplength:0,
			repairID:'',
		}
	}
	push() {
    if(this.state.repairID <= this.state.rplength){
       this.props.navigator.pushPage({ component: UpdateSt, 
         props: { key: 'UpdateSt',
         repairID: this.state.repairID ,
         Username: this.state.Username ,
         eid: this.state.eid 
        } });
   }
   else{
    ons.notification.alert("incorrect");
   }
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
			 	<div className='center'>อัพเดทสถานะการซ่อม</div>
			 	<div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>&nbsp;&nbsp;{this.state.Username}&nbsp;&nbsp;&nbsp;</div>
		  	</Ons.Toolbar>
		);
	}
	
	render() {
		return (
			<Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
			<div style={{ textAlign: 'center' }}>

			<h1>รหัสการเเจ้งซ่อม</h1>
			<p>
			<br/><br/>
          <Ons.Input
              value={this.state.repairID}
              onChange={evt => this.setState({repairID: evt.target.value})}
              modifier='underbar'
              float
              placeholder='รหัสการแจ้งซ่อม' />
			</p>

          <Ons.Button onClick={this.push.bind(this)}>
          Search
          </Ons.Button>
          <br/><br/><br/><br/><br/>
          <section style={{textAlign: 'center'}}>
					  	<img src={"https://image.flaticon.com/icons/svg/201/201565.svg"} alt="Onsen UI" style={{ width: '20%' }} />
		</section>	
      </div>
      </Ons.Page>
		);
	}

}	// end class


{/*
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  KANIN
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
*/}

class Reciept extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {computerParts: [], attributes: [], pageSize: 5, links: {},
        eid : props.eid,
        receiptpart_ID : 1,
        Username: props.Username};
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
        this.props.navigator.pushPage({ component: Reciept2, props: { 
          key: 'Reciept2'  , 
          Username:this.state.Username,
          eid: this.state.eid}});
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
                </Ons.Button> &nbsp;&nbsp;
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
        this.state = {computerParts: [] , receipts: [] , 
          Username: props.Username,
          eid: props.eid -1, 
          employees: [], length: null ,fname:''
		,lname:'',date:null,total:null};
      }
    Print() {
      window.print();
      }
    componentDidMount() {
		client({method: 'GET', path: '/api/computerParts'}).done(response => {
			this.setState({computerParts: response.entity._embedded.computerParts});
		});
		client({method: 'GET', path: '/api/employees'}).done(response => {
			this.setState({employees: response.entity._embedded.employees});
			this.setState({fname: response.entity._embedded.employees[this.state.eid].firstName});
			this.setState({lname: response.entity._embedded.employees[this.state.eid].lastName});

		});
		client({method: 'GET', path: '/api/receipts'}).done(response => {
			this.setState({receipts: response.entity._embedded.receipts});
			this.setState({length: response.entity._embedded.receipts.length});
			this.setState({date: response.entity._embedded.receipts[this.state.length-1].date});
			this.setState({total: response.entity._embedded.receipts[this.state.length-1].totalprice});
		});
	}

    showPageMenu() {
      this.props.navigator.resetPage({
        component: Menu,
        key: 'Menu',
        props: {
          Username: this.state.Username,
          eid:this.props.eid}
      }); 
    }
  
  
   renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'></div>
        <div className="center">พิมพ์ใบแจ้งชำระสินค้า</div>
        <div className='right'>
              <Ons.Button modifier='quiet' 
                onClick={this.showPageMenu.bind(this)}
              >
                <ons-icon size="25px"  icon="ion-home"/>  Menu 
              </Ons.Button>
              
              
          </div>
      </Ons.Toolbar>
    );
  }
  
      render() {

      return (
        <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
            <div style={{ textAlign: 'center'}}>
		  <ComputerPartList2 computerParts={this.state.computerParts}/>
		  <br/><br/>
		<div>
			<center>
				<table>
					<tbody>
					
					<tr>
						<td>ราคารวม</td>
						<td>{this.state.total} บาท</td>
					</tr>
					<tr><td>วันที่และเวลาสั่งซื้อ</td>
						<td>{new Date(this.state.date).getDate()}/
                        {new Date(this.state.date).getMonth()+1}/
                        {new Date(this.state.date).getFullYear()}&nbsp;
                        {new Date(this.state.date).getHours()}:
                        {new Date(this.state.date).getMinutes()}</td>
					</tr>
					<tr>
						<td>ผู้สั่งซื้อ</td>
						<td>{this.state.fname} {this.state.lname}</td>
					</tr>
					</tbody>
				</table>
			</center>
			</div>
             <p style={{ paddingTop: '15px'}}>
                <Ons.Button onClick={this.Print.bind(this)}>
				<ons-icon size="30px" icon="ion-printer"></ons-icon> 
								&nbsp;&nbsp;&nbsp;
                  พิมพ์
                </Ons.Button></p>     
				<p style={{ paddingTop: '15px'}}>
                </p>   
	
				<br/><br/>
					<section style={{textAlign: 'center'}}>
					  	<img src={"https://image.flaticon.com/icons/svg/382/382516.svg"} alt="Onsen UI" style={{ width: '10%' }} />
				   	</section>
		
				
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

  class ComputerPartList2 extends React.Component{
    render() {
      var computerParts = this.props.computerParts.map(computerPart =>
        <ComputerPart2 key={computerPart._links.self.href} computerPart={computerPart}/>
      );
      return (
      <center>
        <table>
          <tbody>
            <tr><th colSpan="3"><h3><center>รายการการสั่งซื้อ</center></h3></th></tr>
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

{/*
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  MAY
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
*/}
class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {repairInvoices: []};
    this.state = {
      title: props.title ? props.title : 'Custom Page',
      nextTitle: null,
      dialogShown: false,
      Username:props.Username,
      eid:props.eid,
      rplength:0,
      repairID:null,
      }
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
        <div className="center">ใบแจ้งชำระสินค้า</div>
        <div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>&nbsp;&nbsp;{this.state.Username}&nbsp;&nbsp;&nbsp;</div>
      </Ons.Toolbar>
    );
  }

  push() {
    if(this.state.repairID <= this.state.rplength){
       this.props.navigator.pushPage({ component: PaymentTable, 
         props: { key: 'PaymentTable',
         repairID: this.state.repairID ,
         Username: this.state.Username ,
         eid: this.state.eid 
        } });
   }
   else{
    ons.notification.alert("incorrect");
   }
  }

  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{ textAlign: 'center' }}>
          <br/><br/>
          <h1>รหัสการเเจ้งซ่อม</h1>
          <p>
          <Ons.Input
              value={this.state.repairID}
              onChange={evt => this.setState({repairID: evt.target.value})}
              modifier='underbar'
              float
              placeholder='รหัสการแจ้งซ่อม' />
          </p>

          <Ons.Button onClick={this.push.bind(this)}>
          Search
          </Ons.Button>
          <br /><br /><br /><br /><br /><br />
          <img src={"https://cdn3.iconfinder.com/data/icons/google-suits-1/32/13_setting_configure_repair_support_optimization_google-128.png"} style={{ width: '20%' }} />
      </div>
      </Ons.Page>
    );
  }
}


class PaymentTable extends React.Component {
  constructor(props) {
   super(props);
   this.state = {customers: []};
   this.state = {
     title: props.title ? props.title : ' ',
     repairID:this.props.repairID,
     Username:this.props.Username,
     eid:this.props.eid,
     assure:null,
     repair:null,
     amount1:0,
     amount2:0,
     amount3:0,
     amount4:0,
     amount5:0,
     cusName:'',
     cusFname:'',
     cusLname:'',
     cid:1,
   };
 }

 componentDidMount() {
  client({method: 'GET', path: '/api/customers'}).done(response => {
    this.setState({customers: response.entity._embedded.customers});
    this.setState({cusFname:this.state.customers[this.state.repairID-1].firstName});
    this.setState({cusLname:this.state.customers[this.state.repairID-1].lastName});
  });
}

 renderToolbar() {
  return (
    <Ons.Toolbar>
      <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
      <div className="center">ใบแจ้งชำระสินค้า</div>
      <div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>&nbsp;&nbsp;{this.state.Username}&nbsp;&nbsp;&nbsp;</div>
    </Ons.Toolbar>
  );
}
  
  handleClickSave(amount1,amount2,amount3,amount4,amount5,repair,assure,repairID,eid){
    return function () {
      client({method: 'GET', path: '/amount1/'+amount1+'/amount2/'+amount2+'/amount3/'+amount3+'/amount4/'+amount4+'/amount5/'+amount5}).done(
        client({method: 'GET', path: '/repair/'+repair+'/assure/'+assure+'/repairInvoice/'+repairID+'/employee/'+eid}).done(
          ons.notification.alert("บันทึกสำเร็จ")
        )
      )
    }
  }
  
  handleClickPrint(){
    ons.notification.alert("PaymentPrint")
    this.props.navigator.pushPage({ component: PaymentPrint, 
      props: { key: 'PaymentPrint',
      repairID:this.state.repairID,
      Username:this.state.Username,
      eid:this.state.eid,
      cusName:this.state.cusFname + " " + this.state.cusLname,
     } });
    
  }

  render() { 
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
      
      <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}>  
        <p>รหัสการเเจ้งซ่อม : {this.state.repairID}</p>
        <p>ลูกค้า : {this.state.cusFname} {this.state.cusLname}</p>
        <center>
        <table>
        <tbody>
					<tr>
            <th>NO.</th>
						<th>รายการ</th>
						<th>รายละเอียด</th>
					</tr>
					<tr>
            <td>1</td>
            <td>ค่าซ่อม</td>
				    <td>
            <Ons.Input
              modifier="underbar" 
              placeholder="ค่าซ่อม" 
              float 
              onChange={evt => this.setState({ repair: evt.target.value })} >     
            </Ons.Input>
             บาท
            </td>
			    </tr>
          <tr>
            <td>2</td>
            <td>ค่าประกัน</td>
				    <td>
              <Ons.List>
                <Ons.ListItem >
                  <Ons.Select id="choose-sel" 
                    value={this.state.assure} 
                    modifier={this.state.assure}
                    onChange={evt => this.setState({assure: event.target.value})} >                         
                    <option value="150">7 วัน : 150 บาท</option>
                    <option value="200">15 วัน : 200 บาท</option>
                    <option value="300">1 เดิอน : 300 บาท</option>
                  </Ons.Select>
                </Ons.ListItem>
              </Ons.List>
            </td>
			    </tr>
          <tr>
            <td>3</td>
            <td>อะไหล่</td>
				    <td>
            <Ons.List>
              <Ons.ListItem >
                <div className='left'>CPU (100 บาท) : </div>
                <div className='right'>
                  <Ons.Input
                    modifier="" 
                    placeholder="จำนวน CPU" 
                    float 
                    onChange={evt => this.setState({ amount1: evt.target.value })} >     
                  </Ons.Input>
                </div>
              </Ons.ListItem>    
              <Ons.ListItem >
                <div className='left'>GraphicCard (200 บาท) : </div>
                <div className='right'>
                  <Ons.Input
                    modifier="" 
                    placeholder="จำนวน GraphicCard" 
                    float 
                    onChange={evt => this.setState({ amount2: evt.target.value })} >     
                  </Ons.Input>
                </div>
              </Ons.ListItem>   
              <Ons.ListItem >
                <div className='left'>Ram (300 บาท) : </div>
                <div className='right'>
                  <Ons.Input
                    modifier="" 
                    placeholder="จำนวน Ram" 
                    float 
                    onChange={evt => this.setState({ amount3: evt.target.value })} >     
                  </Ons.Input>
                </div>
              </Ons.ListItem>   
              <Ons.ListItem >
                <div className='left'>Mainboard (400 บาท) : </div>
                <div className='right'>
                  <Ons.Input
                    modifier="" 
                    placeholder="จำนวน Mainboard" 
                    float 
                    onChange={evt => this.setState({ amount4: evt.target.value })} >     
                  </Ons.Input>
                </div>
              </Ons.ListItem>   
              <Ons.ListItem >
                <div className='left'>Harddisk (500 บาท) : </div>
                <div className='right'>
                  <Ons.Input
                    modifier="" 
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
        </center>

        <div style={{ textAlign: 'center', paddingTop:'15px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}> 
        <Ons.Button 
          onClick={this.handleClickSave(
            this.state.amount1,this.state.amount2,this.state.amount3,this.state.amount4,this.state.amount5,
            this.state.repair,this.state.assure,this.state.repairID,this.state.eid
          )}>
          Save
        </Ons.Button>

        <Ons.Button onClick={this.handleClickPrint.bind(this)}>Print</Ons.Button>
        </div>
      </div>

      </Ons.Page>
    );
  }
}

class PaymentPrint extends React.Component {
  constructor(props) {
   super(props);
   this.state = {payments: []};
   this.state = {
    plength:0,
    repairID:this.props.repairID,
    Username:this.props.Username,
    eid:this.props.eid,
    cusName:this.props.cusName,

    date:null,
    repair:null,
    assure:null,
    compart:null,
    totalPrice:null,

    empFirstName:'',
    empLastName:'',
    empTel:'',
   };
 }

 componentDidMount() {
  client({method: 'GET', path: '/api/payments'}).done(response => {
    this.setState({payments: response.entity._embedded.payments});
    this.setState({plength: response.entity._embedded.payments.length-1});
    this.setState({date:this.state.payments[this.state.plength].date});
    this.setState({repair:this.state.payments[this.state.plength].repair});
    this.setState({assure:this.state.payments[this.state.plength].assure});
    this.setState({compart:this.state.payments[this.state.plength].compart});
    this.setState({totalPrice:this.state.payments[this.state.plength].totalPrice});
  });
  client({method: 'GET', path: '/api/employees'}).done(response => {
    this.setState({employees: response.entity._embedded.employees});
    this.setState({empFirstName:this.state.employees[this.state.eid-1].firstName});
    this.setState({empLastName:this.state.employees[this.state.eid-1].lastName});
    this.setState({empTel:this.state.employees[this.state.eid-1].tel});
  });
  }

  showPageMenu() {
    this.props.navigator.resetPage({
      component: Menu,
      key: 'Menu',
      props: {
        Username: this.state.Username,
        eid:this.state.eid}
    }); 
  }


 renderToolbar() {
  return (
    <Ons.Toolbar>
      <div className='left'></div>
      <div className="center">พิมพ์ใบแจ้งชำระสินค้า</div>
      <div className='right'>
            <Ons.Button modifier='quiet' 
              onClick={this.showPageMenu.bind(this)}
            >
              <ons-icon size="25px"  icon="ion-home"/>  Menu 
            </Ons.Button>
            
            
        </div>
    </Ons.Toolbar>
  );
}

print(){
  window.print();
}


  render() { 
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
      <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}>  
      <br/><img src={"https://cdn0.iconfinder.com/data/icons/office-icons-rounded/110/Printer-128.png"} style={{ width: '15%' }} />
        <p><b>รหัสการเเจ้งซ่อม : </b> {this.state.repairID}</p>
        <p><b>ลูกค้า : </b> {this.state.cusName}</p>
        <p><b>วันที่ : </b> 
            {new Date(this.state.date).getDate()}/
            {new Date(this.state.date).getMonth()+1}/
            {new Date(this.state.date).getFullYear()}&nbsp;
            {new Date(this.state.date).getHours()}:
            {new Date(this.state.date).getMinutes()}
        </p>

        <p><b>พนักงานขาย : </b> {this.state.empFirstName} {this.state.empLastName}</p>
        <p><b>โทร : </b> {this.state.empTel}</p>
        <center>
        <table>
        <tbody>
					<tr>
            <th>NO.</th>
						<th>รายการ</th>
						<th>รายละเอียด</th>
					</tr>
					<tr>
            <td>1</td>
            <td>ค่าซ่อม</td>
				    <td>
              {this.state.repair} บาท
            </td>
			    </tr>
          <tr>
            <td>2</td>
            <td>ค่าประกัน</td>
				    <td>
              {this.state.assure} บาท
            </td>
			    </tr>
          <tr>
            <td>3</td>
            <td>อะไหล่</td>
				    <td>
              {this.state.compart} บาท
            </td>
			    </tr>
          <tr style={{backgroundColor: ''}}>
            <td></td>
            <td><b>ราคาสุทธิ</b></td>
				    <td>
            <b>{this.state.totalPrice} บาท</b>
            </td>
			    </tr>          
				</tbody>
			  </table>
        </center>
        <br/>
        <div style={{ textAlign: 'center', paddingTop:'15px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}> 
        <Ons.Button onClick={this.print.bind(this)}>
             <ons-icon size="30px" icon="ion-printer"></ons-icon> 
             &nbsp;&nbsp;&nbsp;
             PRINT</Ons.Button>
        </div>
      </div>

      </Ons.Page>
    );
  }
}

{/*
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  PAK
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
*/}
class ManageEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {employees: []};
    this.state = {users: []};
    this.state = {
      title: props.title ? props.title : 'Custom Page',
      nextTitle: null,
      dialogShown: false,
    };

  }
  componentDidMount() {
    client({method: 'GET', path: '/api/users'}).done(response => {
      this.setState({users: response.entity._embedded.users});
    });
    client({method: 'GET', path: '/api/employees'}).done(response => {
        this.setState({employees: response.entity._embedded.employees});
    });
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>จัดการข้อมูลพนักงาน</div>
        <div className="right" paddingRight="20px" paddingLeft="20px">
        <ons-icon size="30px" icon="ion-person"/>&nbsp;&nbsp;MANAGER&nbsp;&nbsp;&nbsp;</div>
      </Ons.Toolbar>
    );
  }
	showPageMenu() {
      this.props.navigator.resetPage({
        component: Menu,
        key: 'Menu',
        props: {
          Username: this.state.Username,
          eid:this.props.eid}
      }); 
    }
  showDialog() {
    this.setState({dialogShown: true});
    
  }

  hideDialog() {
    this.setState({dialogShown: false});
    client({method: 'GET', path: '/api/users'}).done(response => {
      this.setState({users: response.entity._embedded.users});
    });
    client({method: 'GET', path: '/api/employees'}).done(response => {
        this.setState({employees: response.entity._embedded.employees});
    });
    this.props.navigator.resetPage({
      component: ManageEmployee,
      key: 'ManageEmployee',
    },{ animation: 'fade' }); 

  }

  pushPageAddEmp() {
    this.props.navigator.pushPage({ component: AddEmp, props: { key: 'AddEmp' } });
  }
  
  pushPagePrintEmployee() {
    this.props.navigator.pushPage({ component: PrintEmployee, props: { key: 'PrintEmployee' } });
  }

  resetPage(){
    this.props.navigator.resetPage({component : ManageEmployee, key : ManageEmployee})
  }
	popPage(){
			this.props.navigator.popPage();
	}
 
  
  handleClickSelectedEmp(user,index) {
    client({method: 'DELETE', path: user._links.self.href   }).done(response =>{  
      ons.notification.alert('เลือก ' + user.username );
    }); 
  };
     

  renderRow(row, index) {
    return(
      <Ons.ListItem 
          key={row._links.self.href}
          //data={row}
          data={row}
          //onClick={this.handleClickSelectedEmp.bind(this, row, index)}
          >
          <div className='left' style={{width: '100px'}}>
              {index+1}
          </div>
          <div className="center">
              {row.username}
          </div>
          <div className='right'>
            <Ons.Icon icon='md-delete' size="30px"/>
            &nbsp;&nbsp;&nbsp;
            <Ons.Checkbox
            inputId={`checkbox-${row}`}
            onClick={this.handleClickSelectedEmp.bind(this, row, index)}
            />
          </div>
      </Ons.ListItem>
    )
  }
  
  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar}>
    <p style={{textAlign: 'right', paddingTop:'10px', paddingRight:'20px'}}>  
	<Ons.Button modifier='quiet' 
                onClick={this.showPageMenu.bind(this)}>
                <ons-icon size="25px"  icon="ion-home"/>  Menu 
              </Ons.Button>
			  &nbsp;&nbsp;&nbsp;
	    <Ons.Button 
        modifier='outline'
	      onClick={this.pushPageAddEmp.bind(this)}> 
        <Ons.Icon icon='md-account-add' /> เพิ่มพนักงาน
      </Ons.Button>
      &nbsp;&nbsp;&nbsp;
      <Ons.Button 
        modifier='outline'
	      onClick={this.pushPagePrintEmployee.bind(this)}> 
        <Ons.Icon icon='ion-printer' />&nbsp;
       "พิมพ์"ประวัติทั้งหมด
      </Ons.Button>
      &nbsp;&nbsp;&nbsp;
      <Ons.Button 
        style={{backgroundColor: 'red'}}
        onClick={this.showDialog.bind(this)}>
        <Ons.Icon icon='md-delete' size="30px"/>
        &nbsp;&nbsp;
        ลบพนักงาน
      </Ons.Button>
    
    </p>
    
    <section style={{textAlign: 'center'}}>
      <Ons.List>
        <Ons.ListItem style={{backgroundColor: '#c6c6c6'}}>
          <div className='left' style={{width: '100px'}}>
            <b>ลำดับที่</b>
          </div>
          <div className="center" >
          <b>รหัส พนักงาน</b>
          </div>
          <div className='right'>
          <b>ลบ</b>
          </div>
        </Ons.ListItem>
     </Ons.List>
     <Ons.List
        //dataSource={this.state.employees}
        dataSource={this.state.users}
        renderRow={this.renderRow}
        handleClickSelectedEmp={this.handleClickSelectedEmp} 
      />       
		</section>
    

    <Ons.Dialog
      isOpen={this.state.dialogShown}
    >
            <div style={{textAlign: 'center', margin: '20px'}}>
              <p style={{opacity: 0.5}}>ต้องการ"ลบ"พนักงาน</p>
              <p>
                <Ons.Button
                onClick={this.hideDialog.bind(this)}
                >
                  ตกลง
                </Ons.Button>
              </p>
            </div>
          </Ons.Dialog>
        
      </Ons.Page>
    );
  }
}
class AddEmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {employees: []};
    this.state = {users: []};
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      username:null,
      password:null,
      firstName:null,
      lastName:null,
      tel:null,
      position:null,
      address:null,
      age:null,
      sex:null,
      id_card_NO:null,
    }
  }

    renderToolbar() {
      return (
        <Ons.Toolbar>
        <div className='left'></div>
        <div className='center'>จัดการข้อมูลพนักงาน</div>
        <div className="right" paddingRight="20px" paddingLeft="20px">
        <ons-icon size="30px" icon="ion-person"/>&nbsp;&nbsp;MANAGER&nbsp;&nbsp;&nbsp;</div>
        </Ons.Toolbar>
      );
    }


    handlePushManager(){
      client({method: 'GET', path: '/api/users'}).done(response => {
        this.setState({users: response.entity._embedded.users});
      });
      client({method: 'GET', path: '/api/employees'}).done(response => {
          this.setState({employees: response.entity._embedded.employees});
      });
      this.props.navigator.resetPage({
        component: ManageEmployee,
        key: 'ManageEmployee',
      },{ animation: 'fade' }); 
      
    }
  
    handleClick(firstName,lastName,tel,position,address,age,sex,id_card_NO,username,password) {
      return function () { 
        client({method: 'GET', path:'/firstName/'+firstName+'/lastName/'+lastName+'/tel/'+tel+'/position/'+position+'/address/'+address+'/age/'+age+'/sex/'+sex+'/id_card_NO/'+id_card_NO+'/username/'+username+'/password/'+password}).then(response => {
          ons.notification.alert('บันทึก');
        });
      }
 
  }
  
	render() {
      return (
        <Ons.Page renderToolbar={this.renderToolbar}>
          <section style={{textAlign: 'center'}}>
         
          <Ons.List>
            <Ons.ListHeader>**กรุณากรอกข้อมูลด้วยความจริงทุกประการ**</Ons.ListHeader>
          </Ons.List>
            <center>
			       <Ons.Card style={{ width: '30%' }} >
		        	<p>
		        	<center>
              <Ons.Input modifier="underbar" 
                placeholder="Username" 
                float 
                onChange={evt => this.setState({ username: evt.target.value })} >
					
              </Ons.Input>
              </center>
            </p>
                <p> 
            <center>
              <Ons.Input modifier="underbar" 
              type='password'
                placeholder="Password" 
                float 
                onChange={evt => this.setState({ password: evt.target.value })} >     
              </Ons.Input>
              </center>
            </p>
		      	</Ons.Card>
             </center>
			
            <Ons.List>
              <Ons.ListHeader>แนะนำ:ควรตั้ง Password ที่ผสมระหว่างตัวอักษร และตัวเลข</Ons.ListHeader>
            </Ons.List>
               <center>
			       <Ons.Card style={{ width: '30%' }} >
		        	<p>
		        	<center>
                        
              <Ons.Input modifier="underbar" 
                placeholder="ชื่อ" 
                float 
                onChange={evt => this.setState({ firstName: evt.target.value })} >     
              </Ons.Input>
               </center>
            </p><p> <center> 
                      
            <Ons.Input modifier="underbar" 
              placeholder="นามสกุล" 
              float 
              onChange={evt => this.setState({ lastName: evt.target.value })} >     
            </Ons.Input>
             </center>
            </p><p>  <center>

           
         <Ons.Input modifier="underbar" 
          placeholder="อายุ" 
          float 
          onChange={evt => this.setState({  age: evt.target.value })} >     
        </Ons.Input>
         </center>
            </p><center>
             <table><tr><td><b>เพศ : </b></td><td>		 
               <div style={{margin: 5}}>
            <Ons.Select id="choose-sel" 
              value={this.state.sex} 
              modifier={this.state.sex} 
              onChange={evt => this.setState({sex: event.target.value})} > 
              <option >โปรดเลือก..</option>
              <option value="Male">ชาย</option>
              <option value="Female">หญิง</option>
            </Ons.Select>
          </div>
            </td></tr></table>
            </center>
            <p>  <center>
                
          <Ons.Input modifier="underbar" 
          placeholder="เลขบัตรประจำตัวประชาชน" 
          float 
          onChange={evt => this.setState({ id_card_NO: evt.target.value })} >     
        </Ons.Input>
             </center></p>
            <p>  <center>
                
        <Ons.Input modifier="underbar" 
        placeholder="เบอร์โทร" 
        float 
        onChange={evt => this.setState({ tel: evt.target.value })} >     
        </Ons.Input>
         </center></p>
        <p>  <center>
        
        <Ons.Input modifier="underbar" 
              placeholder="ที่อยุ่" 
              float 
              onChange={evt => this.setState({ address: evt.target.value })} >     
            </Ons.Input>
            </center>   
            </p>
            <center>
             <table><tr><td><b>ตำหน่ง : </b></td><td>
            
           <Ons.Select id="choose-sel"
            value={this.state.position} 
            modifier={this.state.position} 
            onChange={evt => this.setState({position: event.target.value})} > 
            <option >โปรดเลือก..</option>
              <option value="manager">ผู้จัดการ</option>
              <option value="sales">พนักงานขาย</option>
              <option value="repair">พนักงานซ่อม</option>
            </Ons.Select>
            </td></tr></table>
             </center>           
		      	</Ons.Card>
             </center>
                                 
            <p>
              
            <Ons.Button onClick={this.handleClick(
                this.state.firstName,this.state.lastName,this.state.tel,
                this.state.position,this.state.address,this.state.age,this.state.sex,this.state.id_card_NO,
                this.state.username,this.state.password
                )}>
                <Ons.Icon icon='md-account-add' /> บันทึกพนักงาน</Ons.Button>    
                &nbsp;&nbsp;&nbsp;
                <Ons.Button onClick={this.handlePushManager.bind(this)}>กลับสู่หน้า รายชื่อ</Ons.Button>

           </p>
         
          </section>     
          <Ons.List>
            <Ons.ListHeader>หมายเหตุ:กรุณากรอกข้อมูลให้ครบถ้วน</Ons.ListHeader>
          </Ons.List>
          
        </Ons.Page>        
      );
    }
}

class PrintEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {employees: []};
    

  }
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>จัดการข้อมูลพนักงาน</div>
        <div className="right" paddingRight="20px" paddingLeft="20px">
        <ons-icon size="30px" icon="ion-person"/>&nbsp;&nbsp;MANAGER&nbsp;&nbsp;&nbsp;</div>
      </Ons.Toolbar>
    );
  }
  componentDidMount() {
    client({method: 'GET', path: '/api/employees'}).done(response => {
        this.setState({employees: response.entity._embedded.employees});
    });
  }
  showMenu() {
    this.props.showMenu();
  }

  resetPage(){
    this.props.navigator.resetPage({component : ManageEmployee, key : ManageEmployee})
  }

  print() {
    window.print();
  }

  renderRow(row, index) {
    return(
      <center>
      <Ons.ListItem style={{textAlign:'center'}}
          key={row._links.self.href}
          data={row}
         
          >
          <center>
            <center>
              <td  style={{width:'40px'}}>
              {index+1}         
              </td><td style={{width:'100px'}}>
              {row.firstName}
              </td><td style={{width:'150px'}}>
              {row.lastName}
              </td><td style={{width:'100px'}}>
              {row.tel}
              </td><td style={{width:'70px'}}>
              {row.position}
              </td><td style={{width:'70px'}}>
              {row.address}
              </td><td style={{width:'40px'}}>
              {row.age}
              </td><td style={{width:'70px'}}>
              {row.sex}
              </td><td style={{width:'120px'}}>
              {row.id_card_NO}
              </td> 
            </center>
          
          </center>
      </Ons.ListItem>
      </center>


    )
  }
  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
         &nbsp;
         <center>
         <Ons.Card style={{width:'97%'}}>
         
              <td style={{width:'40px'}}>
              ลำดับที่
              </td><td style={{width:'100px'}}>
              ชื่อ
              </td><td style={{width:'150px'}}>
           นามสกุล
              </td><td style={{width:'100px'}}>
             เบอร์โทร
              </td><td style={{width:'70px'}}>
              ตำแหน่ง
              </td><td style={{width:'70px'}}>
             ที่อยู่
              </td><td style={{width:'40px'}}>
              อายุ
              </td><td style={{width:'70px'}}>
             เพศ
              </td><td style={{width:'120px'}}>
              เลขบัตรประจำตัวประชาชน
              </td>
              
        </Ons.Card>                
        </center>
        <center>
        <Ons.Card>
        <Ons.List style={{textAlign:'center'}}
        dataSource={this.state.employees}
        renderRow={this.renderRow}       
        />
        </Ons.Card>
        </center>
        &nbsp;&nbsp;&nbsp;   

        <div style={{ textAlign: 'center', paddingTop:'15px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}> 
          <Ons.Button 
	          onClick={this.print.bind(this)}> 
            <Ons.Icon icon='ion-printer' />&nbsp;
            "พิมพ์"ประวัติทั้งหมด
          </Ons.Button>    
        </div>
      </Ons.Page>
      
    );
  }
}
{/*
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  SEP
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
*/}

var h11=0,h22=0;
class InsertRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {repairInvoices: []};
    this.state = {
      id:props.id,
	  id2:null,

      a:"1",
      b:"2",
      c:"3",
      d:"4",
      e:"5",
    };


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
        <div className="center">ประเมินผลงานการให้บริการของพนักงาน</div>
        <div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>&nbsp;&nbsp;{this.state.Username}&nbsp;&nbsp;&nbsp;</div>
      </Ons.Toolbar>
    );
  }

 popPage() {
       if(h11===0 && h22===0){
          ons.notification.alert('คุณยังไม่ได้ป้อนข้อมูลอะไรเลย');
       }
       if(h11>0 && h22===0){
          ons.notification.alert('คุณยังไม่ได้ป้อนRatingของการซ่อมโดยรวม');
       }
       if(h11===0 && h22>0){
          ons.notification.alert('คุณยังไม่ได้ป้อน Rating ของ พนักงาน');
       }
      if(h11>0 && h22>0){
        if(h11==1){
          h11="แย่";
        }else if(h11==2){
          h11="พอใช้";
        }else if(h11==3){
          h11="ปานกลาง";
        }else if(h11==4){
          h11="ดี";
        }else{
          h11="ดีมาก";
        }
        if(h22==1){
          h22="แย่";
        }else if(h22==2){
          h22="พอใช้";
        }else if(h22==3){
          h22="ปานกลาง";
        }else if(h22==4){
          h22="ดี";
        }else{
          h22="ดีมาก";
        }

        client({method: 'GET', path: '/vote/'+this.state.id+'/idm/'+this.state.id2+'/employelevel1/'+h11+'/repairlevel/'+h22}).done(
          ons.notification.alert("Your Select "+h11+" and "+h22))
          h11=0;
          h22=0;
        this.props.navigator.popPage();
      }

 }

 pushPage() {
    ons.notification.alert('บันทึกข้อมูลสำเร็จ');
    this.props.navigator.pushPage({ component: PrintRepairInvoice,
       props: { key: 'PrintRepairInvoice' ,
        //
       } });
  }

 handleClick1(statelevel) {

    return function () {
      h11=statelevel;

          if(statelevel==="1") ons.notification.alert('Your Select Rating = แย่');
       	  if(statelevel==="2") ons.notification.alert('Your Select Rating = พอใช้');
       	  if(statelevel==="3") ons.notification.alert('Your Select Rating = ปานกลาง');
       	  if(statelevel==="4") ons.notification.alert('Your Select Rating = ดี');
          if(statelevel==="5") ons.notification.alert('Your Select Rating = ดีมาก');

    }
  }
  handleClick2(statelevel) {

     return function () {
       h22=statelevel;

          if(statelevel==="1") ons.notification.alert('Your Select Rating = แย่');
           if(statelevel==="2") ons.notification.alert('Your Select Rating = พอใช้');
           if(statelevel==="3") ons.notification.alert('Your Select Rating = ปานกลาง');
           if(statelevel==="4") ons.notification.alert('Your Select Rating = ดี');
           if(statelevel==="5") ons.notification.alert('Your Select Rating = ดีมาก');

     }
   }

  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>

      <Ons.Card>
       <center>
      <table><tr><td>

       <Ons.Card style={{width:'250px'}}>
		<center>
			<p>
              <Ons.Input
                value={this.state.id2}
                onChange={evt => this.setState({ id2: evt.target.value })}
                modifier='underbar'
                float
                placeholder='ID Employee' />
            </p>
		</center>
       <Ons.List>
       <Ons.ListHeader>ประเมินผลงานการให้บริการของพนักงาน</Ons.ListHeader>
       <Ons.ListItem onClick={this.handleClick1(this.state.a)}>แย่</Ons.ListItem>
       <Ons.ListItem onClick={this.handleClick1(this.state.b)}>พอใช้</Ons.ListItem>
       <Ons.ListItem onClick={this.handleClick1(this.state.c)}>ปานกลาง</Ons.ListItem>
       <Ons.ListItem onClick={this.handleClick1(this.state.d)}>ดี</Ons.ListItem>
       <Ons.ListItem onClick={this.handleClick1(this.state.e)}>ดีมาก</Ons.ListItem>
       </Ons.List>
       </Ons.Card>
       </td><td>
       <Ons.Card style={{width:'250px'}}>
	   <br/>
	   <br/>
	   <br/>

       <Ons.List>
          <Ons.ListHeader>ประเมินผลงานการซ่อมโดยรวม</Ons.ListHeader>
       <Ons.ListItem onClick={this.handleClick2(this.state.a)}>แย่</Ons.ListItem>
       <Ons.ListItem onClick={this.handleClick2(this.state.b)}>พอใช้</Ons.ListItem>
       <Ons.ListItem onClick={this.handleClick2(this.state.c)}>ปานกลาง</Ons.ListItem>
       <Ons.ListItem onClick={this.handleClick2(this.state.d)}>ดี</Ons.ListItem>
       <Ons.ListItem onClick={this.handleClick2(this.state.e)}>ดีมาก</Ons.ListItem>
       </Ons.List>
       </Ons.Card>
       </td></tr></table></center>
       <center>
       <Ons.Button style={{margin: '6px', width:'120'}} modifier='outline'
        onClick={this.popPage.bind(this)}>
         <center>Finish</center>
       </Ons.Button>
       </center>
      </Ons.Card>
      </Ons.Page>
    );
  }
}

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {repairInvoices: []};
    this.state = {users: []};
    this.state = {
      id:null,
      repairslength:null,
      Username:this.props.Username,
    };
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/repairInvoices'}).done(response => {
        this.setState({repairInvoices: response.entity._embedded.repairInvoices});
    });
    client({method: 'GET', path: '/api/repairInvoices'}).done(response => {
      this.setState({repairslength: response.entity._embedded.repairInvoices.length});
    });

  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className="center">Select Result</div>
        <div className="right" paddingRight="20px" paddingLeft="20px"><ons-icon size="30px"  icon="ion-person"/>&nbsp;&nbsp;{this.state.Username}&nbsp;&nbsp;&nbsp;</div>
      </Ons.Toolbar>
    );
  }


    pushPage1() {
      var i=0;
      var k=0;
      for(var i=0 ; i<this.state.repairslength ; i++){
        if(i === this.state.id-1 ){
          ons.notification.alert('Plese Select Level of Rating!');
          this.props.navigator.pushPage({ component: InsertRating,
               props: { key: 'InsertRating',
               id:i+1,
               Username:this.state.Username,
          } });
          break;
        }
        else{
          k++;
          if(k>0 && i=== this.state.repairslength-1){
            ons.notification.alert('incorrect!');
            k = 0;
          }
        }
        }
      }

    pushPage2() {
      this.props.navigator.pushPage({ component: Result, props: { key: 'Result',Username:this.state.Username,
      } });
    }

  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{ textAlign: 'center' }}>
            <p>
              <Ons.Input
                value={this.state.id}
                onChange={evt => this.setState({ id: evt.target.value })}
                modifier='underbar'
                float
                placeholder='ID Repair' />
            </p>

            <Ons.Button style={{margin: '6px', width:'120'}} modifier='outline' onClick={this.pushPage1.bind(this)}>
              <center>Search</center>
            </Ons.Button>
            <Ons.Button style={{margin: '6px', width:'120'}} modifier='outline' onClick={this.pushPage2.bind(this)}>
              <center>Result</center>
            </Ons.Button>
        </div>

      </Ons.Page>
    );
  }
}

  /////////\\\\\\\\\\\\\\\\\\//////////End  Level ////////////\\\\\\\\\\\\\/////////////
/// แสดง ผล

class Result extends React.Component {
 constructor(props) {
		super(props);
    this.state = {ratings: [],
    Username:this.props.Username};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/ratings'}).done(response => {
			this.setState({ratings: response.entity._embedded.ratings});
		});
	}


  renderToolbar() {
    return (
        <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>ใบแจ้งซ่อมคอมพิวเตอร์</div>
        <div className='right'>
            <Ons.Button modifier='quiet' 
              onClick={this.showPageMenu.bind(this)}
            >
              <ons-icon size="25px"  icon="ion-home"/>  Menu 
            </Ons.Button>
            <Ons.Button modifier='quiet' 
              onClick={this.pushPage.bind(this)}
              style={{color: 'red'}}
            >
              <ons-icon size="25px"  icon="ion-printer"/>  Print 
            </Ons.Button>
            
            
        </div>
      </Ons.Toolbar>
    );
  }

  

  showPageMenu() {
    this.props.navigator.resetPage({
      component: Menu,
      key: 'Menu',
      props: {
        Username: this.state.Username,}
    }); 
  }


  pushPage() {
    window.print();
  }
   renderRow(row,index) {

    return(
    <center>
      <Ons.Card style={{width: '80%'}}
          tappable
          key={row._links.self.href}
          data={row}
          >
          <center>
          <td style={{width:'20px'}}>
          <center>{index+1}</center>
          </td>
          <td style={{width:'140px'}}>
          <center>{row._embedded.employee.id}</center>
          </td>
          <td style={{width:'200px'}}>
          <center>{row._embedded.employee.firstName}</center>
          </td>
          <td style={{width:'200px'}}>
          <center>{row._embedded.employee.lastName}</center>
          </td>
          <td style={{width:'160px'}}>
          <center>{row._embedded.employee.tel}</center>
          </td>
          <td style={{width:'160px'}}>
          <center>{row.employelevel1}</center>
          </td>
          <td style={{width:'160px'}}>
          <center>{row.repairlevel}</center>
          </td>
         
        </center>
      </Ons.Card>
    </center>
    )
  }
  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
        <center>
        <h2>Result All</h2>
        </center>

		<center>
			<Ons.Card style={{width: '80%'}}>
			<center>
			  <td style={{width:'20px'}}><center>ที่</center></td>
			  <td style={{width:'140px'}}><center>ID Employee</center></td>
        <td style={{width:'200px'}}><center>ชื่อ พนักงานต้อนรับ</center></td>
			  <td style={{width:'200px'}}><center>นามสกุล พนักงานต้อนรับ</center></td>
        <td style={{width:'160px'}}><center>เบอร์โทรศัพท์</center></td>
			  <td style={{width:'160px'}}><center>Rating พนักงานต้อนรับ</center></td>
			  <td style={{width:'160px'}}><center>Rating การซ่อมโดยรวม</center></td>
			 </center>
			</Ons.Card>
		</center>
		<center>
        <Ons.List
           dataSource={this.state.ratings}
           renderRow={this.renderRow}
        />
		</center>

      </Ons.Page>
    );
  }
}

{/*
##################################################################################################
##################################################################################################
##################################################################################################

*/}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.loadPage = this.loadPage.bind(this);
  }
  
  hide() {
    this.setState({ isOpen: false });
  }

  show() {
    this.setState({ isOpen: true });
  }

  loadPage(page) {
    this.hide();
    this.navigator.resetPage({ component: page, props: { key: page } }, { animation: 'fade' });
  }
  
  renderPage(route, navigator) {
    route.props = route.props || {};
    route.props.navigator = navigator;
    route.props.showMenu = this.show.bind(this);

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
  
  ons.ready(function() {
    ReactDOM.render(<App />, document.getElementById('app'));
  });

ReactDOM.render(<App />, document.getElementById('react'));