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
{
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////
}
{/*MakeRepairInvoice------------------------------------------------------------------------*/}
class MakeRepairInvoice extends React.Component {
    constructor(props) {
      super(props);
      this.handleClickSelectedEmp = this.handleClickSelectedEmp.bind(this);
      this.handleClickSave = this.handleClickSave.bind(this);
      this.state = {employees: []};
      this.state = {
        dialogShown: false,
        Username:props.Username,
        dateIn:null,
        dateOut:null,
        cid:1,
        pid:1,
        sid:props.sid,
        rid:0,
        cusFirstName:null,
        cusLastName:null,
        cusTel:null,
        Type:'Unknown',
        Brand:'Unknown',
        Model:'Unknown',
        Color:'Unknown',
        Problem:'Unknown',
        Note:'Unknown',
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
      this.state.cusFirstName == null || this.state.cusLastName == null || this.state.cusTel == null || 
      this.state.rid == 0
    ){
      ons.notification.alert('กรุณากรอกข้อมูลให้ครบ!')
    }
    else{
      this.setState({dialogShown: true});
    }
  }

  hideDialog() {
    this.setState({dialogShown: false});
    this.props.navigator.pushPage({ component: PrintRepairInvoice, 
      props: { key: 'PrintRepairInvoice' ,
      customerName:this.state.cusFirstName + " " + this.state.cusLastName,
      Type:this.state.Type,
      Brand:this.state.Brand,
      Model:this.state.Model,
      Color:this.state.Color,
      Problem:this.state.Problem,
      Note:this.state.Note,
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
                ons.notification.alert('บันทึกสำเร็จ!')
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


    /*
    ####################################################################################################################################
    ####################################################################################################################################
    ####################################################################################################################################
    */
  
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
          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}>  
            <h4><ons-icon  size="25px" icon="ion-wrench"></ons-icon>&nbsp;&nbsp; รายละเอียดคอมพิวเตอร์</h4>
              <Ons.List > 
                <Ons.ListItem >
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    ประเภท&nbsp;&nbsp;: &nbsp;&nbsp;
                    <Ons.Select id="choose-sel" 
                      value={this.state.Type} 
                      modifier={this.state.Type} 
                      //onClick={this.handleClickProduct.bind(this)}
                      onChange={evt => this.setState({Type: event.target.value})} >                         
                        <option value="Unknown">ไม่ระบุ</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Printer">Printer</option>
                        <option value="Other" >อื่นๆ</option>
                    </Ons.Select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Ons.ListItem>

                <Ons.ListItem>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  ยี่ห้อ&nbsp;&nbsp;: &nbsp;&nbsp;
                    <Ons.Select id="choose-sel" 
                      value={this.state.Brand} 
                      modifier={this.state.Brand} 
                      //onClick={this.handleClickProduct.bind(this)}
                      onChange={evt => this.setState({Brand: event.target.value})} >   
                        <option value="Unknown">ไม่ระบุ</option>
                        <option value="DELL">DELL</option>
                        <option value="Toshiba">Toshiba</option>
                        <option value="Acer">Acer</option>
                        <option value="lenovo">lenovo</option>
                        <option value="hp">hp</option>
                        <option value="Other" >อื่นๆ</option>
                    </Ons.Select>         
                </Ons.ListItem>

                <Ons.ListItem>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  รุ่น&nbsp;&nbsp;: &nbsp;&nbsp;
                    <Ons.Input Model="" 
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
                      //onClick={this.handleClickProduct.bind(this)}
                      onChange={evt => this.setState({Color: event.target.value})} >  
                        <option value="Unknown">ไม่ระบุ</option>
                        <option value="Black">ดำ</option>
                        <option value="Silver">เงิน</option>
                        <option value="Red">แดง</option>
                        <option value="Other" >อื่นๆ</option>
                    </Ons.Select>                 
                </Ons.ListItem>
 
                <Ons.ListItem>
                  ปัญหาเรื่อง&nbsp;&nbsp;: &nbsp;&nbsp;
                    <Ons.Select id="choose-sel" 
                      value={this.state.Problem} 
                      modifier={this.state.Problem} 
                      //onClick={this.handleClickProduct.bind(this)}
                      onChange={evt => this.setState({Problem: event.target.value})} >   
                        <option value="Unknown">ไม่ระบุ</option>
                        <option value="Software">Software</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Sound">เสียง</option>
                        <option value="Screen">จอ</option>
                        <option value="Keyboard">แป้นพิมพ์</option>
                        <option value="Other" >อื่นๆ</option>
                    </Ons.Select>
                </Ons.ListItem>   

                <Ons.ListItem>&nbsp;&nbsp;
                  หมายเหตุ :
                    <Ons.Input Note="" 
                      placeholder=" รายละเอียด ความเสียหายของเครื่องเพิ่มเติม" 
                      float onChange={evt => this.setState({ Note: evt.target.value })} >
                    </Ons.Input>   
                </Ons.ListItem>  
              </Ons.List > 
          </div>
          {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <Ons.List><Ons.ListHeader></Ons.ListHeader></Ons.List>
          {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}>  
            <h4><ons-icon size="25px"  icon="ion-person"></ons-icon>&nbsp;&nbsp;เลือกพนักงานซ่อม</h4>
            <h3>เลือก .. {this.state.repairFirstName} {this.state.repairLastName}</h3>
              <Ons.List>
                <Ons.ListHeader>รายชื่อพนักงานซ่อม</Ons.ListHeader>
              </Ons.List>
                
              <Ons.List
                dataSource={this.state.employees}
                renderRow={this.renderRow}
                handleClickSelectedEmp={this.handleClickSelectedEmp} 
              />
          </div>
          {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <div style={{ textAlign: 'center', paddingTop:'15px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}> 
            <Ons.Button onClick={this.handleClickSave(
                  this.state.cusFirstName,this.state.cusLastName,this.state.cusTel,
                  this.state.Type,this.state.Brand,this.state.Model,this.state.Color,this.state.Problem,this.state.Note,
                  this.state.dateIn, this.state.dateOut, this.state.sid,this.state.rid
                  )}>
              บันทึกข้อมูล
            </Ons.Button>


            <Ons.Button onClick={this.showDialog.bind(this)}>
              บันทึกและพิมพ์
            </Ons.Button>
          
            <Ons.Dialog
              isOpen={this.state.dialogShown}
              isCancelable={true}
              onCancel={this.hideDialog.bind(this)}
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
    this.state = {employees: []};
    this.state = {customers: []};
    this.state = {products: []};
    this.state = {
      title: props.title ? props.title : 'Custom Page',
      nextTitle: null,
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
      dateOut: props.dateOut,

      //
    };
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/repairInvoices'}).done(response => {
      this.setState({repairInvoices: response.entity._embedded.repairInvoices});
      this.setState({repairInvoiceslength: response.entity._embedded.repairInvoices.length});
    });
  }

  pushPage() {
    this.props.navigator.pushPage({ component: Home, 
         props: { key: 'Home' ,

          //
         } });
  }
  
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
        <div className='center'>ใบแจ้งซ่อมคอมพิวเตอร์</div>
        <div className='right'>
            <Ons.ToolbarButton onClick={this.pushPage.bind(this)}>
              <Ons.Icon icon='ion-navicon, material:md-menu' />
            </Ons.ToolbarButton>
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

        <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px', paddingLeft:'', paddingRight:''}}>  
        <center>
        <Ons.Card style={{width: '400px'}}>
          <div style={{ textAlign: 'center' }}>   
                <h4> 
                <ons-icon size="25px" icon="ion-chevron-left"></ons-icon>
                  &nbsp;&nbsp;&nbsp;
                  ใบแจ้งซ่อมคอมพิวเตอร์ 
                  &nbsp;&nbsp;&nbsp;
                <ons-icon size="25px" icon="ion-chevron-right"></ons-icon>
                </h4>  
                <p> คุณ{this.state.customerName} </p>
              
                <Ons.List>
                  <Ons.ListItem>
                      <div class='center' style={{ textAlign: 'Center'}}>
                      <p><b>รหัสการแจ้งซ่อม : 2017_{this.state.repairInvoiceslength}</b></p>
  
                      <p style={{ paddingLeft:'30'}}>วันที่รับแจ้ง : {this.state.dateIn}</p>
                      <p style={{ paddingLeft:'30'}}>&nbsp;&nbsp;วันที่ส่งคืน : {this.state.dateOut}</p>
                      <p style={{ opacity: '0.6', textAlign: 'Center'}} >หมายเหตุ : วันที่ส่งคืนอาจเปลี่ยนแปลงได้ </p>
                      </div>
                  </Ons.ListItem>
              
                  <Ons.ListItem>     
                       <div style={{ textAlign: 'Left', paddingLeft:'60'}}>
                       <p>ประเภท : {this.state.Type}</p>
                       <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ยี่ห้อ : {this.state.Brand}</p>
                       <p>&nbsp;&nbsp;ปัญหา : {this.state.Problem}</p>
                       </div>
                  </Ons.ListItem>     
              
                  <Ons.ListItem>     
                      <div style={{ textAlign: 'Left', paddingLeft:'30'}}>
                      <p><b>พนักงานขาย</b></p>
                      <p style={{ textAlign: 'Left', paddingLeft:'60'}}>ชื่อ : {this.state.salesName}</p>
                      <p style={{ textAlign: 'Left', paddingLeft:'60'}}>เบอร์โทรศัพท์ : {this.state.salesTel}</p>
                       </div>
                  </Ons.ListItem><Ons.ListItem> 
                      <div style={{ textAlign: 'Left', paddingLeft:'30'}}>
                      <p><b>พนักงานซ่อม</b></p>
                      <p style={{ textAlign: 'Left', paddingLeft:'60'}}>ชื่อ : {this.state.repairName}</p>
                      <p style={{ textAlign: 'Left', paddingLeft:'60'}}>เบอร์โทรศัพท์ : {this.state.repairTel}</p>
                       </div>
                </Ons.ListItem>     
              </Ons.List>     
            
              
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