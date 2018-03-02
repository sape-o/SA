var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');

{/*RepairInvoice------------------------------------------------------------------------*/}
class RepairInvoice extends React.Component {
    constructor(props) {
      super(props);
      this.handleClickSelectedEmp = this.handleClickSelectedEmp.bind(this);
      this.handleClickSave = this.handleClickSave.bind(this);
      this.state = {employees: []};
      this.state = {customers: []};
      this.state = {products: []};
      this.state = {
        cid:0,
        pid:0,
        sid:1,
        rid:2,
        firstEmp:'ABC',
        Username :1,
        cusFirstName:null,
        cusLastName:null,
        cusTel:null,
        Type:null,
        Brand:null,
        Model:null,
        Color:null,
        Problem:null,
        Note:null,
        repairFirstName:'',
        repairLastName:'',
      }
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/users'}).done(response => {
      this.setState({users: response.entity._embedded.users});
    });
    client({method: 'GET', path: '/api/employees'}).done(response => {
        this.setState({employees: response.entity._embedded.employees});
    });
    client({method: 'GET', path: '/api/customers'}).done(response => {
      this.setState({cid: response.entity._embedded.customers.length});
    });
    client({method: 'GET', path: '/api/products'}).done(response => {
      this.setState({pid: response.entity._embedded.products.length});
    });
  }

  handleClickSave(cusFirstName,cusLastName,cusTel,Type,Brand,Model,Color,Problem,Note,cid,pid,sid,rid) {
    return function () {

      //window.location.reload();
      //ons.notification.alert('บันทึกลูกค้า!')
      //ons.notification.alert('บันทึกของซ่อม!')

      client({method: 'GET', path: '/cusFirstName/'+cusFirstName+'/cusLastName/'+cusLastName+'/cusTel/'+cusTel}).then(
        
        client({method: 'GET', path: '/Type/'+Type+'/Brand/'+Brand+'/Model/'+Model+'/Color/'+Color+'/Problem/'+Problem+'/Note/'+Note}).then(

          client({method: 'GET', path: '/customer/'+cid+'/product/'+pid+'/salesEmp/'+sid+'/repairEmp/'+rid}).done(
            window.location.reload()
          )
        )
      );

      //client({method: 'GET', path: '/Type/'+Type+'/Brand/'+Brand+'/Model/'+Model+'/Color/'+Color+'/Problem/'+Problem+'/Note/'+Note}).done(
      //);

      //client({method: 'GET', path: '/customer/'+cid+'/product/'+pid+'/salesEmp/'+sid+'/repairEmp/'+rid}).done(
      //  window.location.reload()
      //);  

      //window.location.reload();
      
    }
  }

  pushPage() {
    ons.notification.alert('บันทึกข้อมูลสำเร็จ');
    this.props.navigator.resetPage({ component: PrintRepairInvoice, 
         props: { key: 'PrintRepairInvoice' ,

          //
         } });
  }
 
  handleClickSelectedEmp(employee, index) {
    console.log(employee)
    ons.notification.alert('เลือก ' + employee.firstName +" " +employee.lastName)
    this.setState({repairFirstName: employee.firstName})
    this.setState({repairLastName: employee.lastName}) 
    this.setState({rid: index+1});
    
  }

  renderRow(row, index) {
    //rid = index+1;
    //sid = index+1;
    //if(row.position === 'repair'){
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
    //}
  }

  handleClickProductIsOther() {
    if(this.state.Type === 'other')
        ons.notification.prompt({
        message: 'ประเภท อื่นๆ',
        callback: answer => {
            this.state.Type = answer;
        }});
    
    if(this.state.Brand === 'other')
        ons.notification.prompt({
        message: 'ยี่ห้อ อื่นๆ',
        callback: answer => {
            this.state.Brand = answer;
        }});
    
    if(this.state.Color === 'other')
        ons.notification.prompt({
        message: 'สี อื่นๆ',
        callback: answer => {
            this.state.Color = answer;
        }});
    
    if(this.state.Problem === 'other')
        ons.notification.prompt({
        message: 'ปัญหา อื่นๆ / เพิ่มเติม',
        callback: answer => {
            this.state.Problem = answer;
        }});
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
          {this.state.rid}  {this.state.repairFirstName}  นามสกุล  {this.state.repairLastName}  ลูกค้า {this.state.cid} ซ่อม {this.state.pid}
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
                  <p paddingRight='50px'>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    ประเภท&nbsp;&nbsp;: &nbsp;&nbsp;
                  </p>
                    <Ons.Select id="choose-sel" 
                      value={this.state.Type} 
                      modifier={this.state.Type} 
                      onClick={this.handleClickProductIsOther.bind(this)}
                      onChange={evt => this.setState({Type: event.target.value})} >                         
                        <option value="Laptop">Laptop</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Printer">Printer</option>
                        <option value="other" >อื่นๆ</option>
                    </Ons.Select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Ons.ListItem>

                <Ons.ListItem>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  ยี่ห้อ&nbsp;&nbsp;: &nbsp;&nbsp;
                    <Ons.Select id="choose-sel" 
                      value={this.state.Brand} 
                      modifier={this.state.Brand} 
                      onClick={this.handleClickProductIsOther.bind(this)}
                      onChange={evt => this.setState({Brand: event.target.value})} >   
                        <option value="DELL">DELL</option>
                        <option value="Toshiba">Toshiba</option>
                        <option value="Acer">Acer</option>
                        <option value="lenovo">lenovo</option>
                        <option value="hp">hp</option>
                        <option value="other" >อื่นๆ</option>
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
                      onClick={this.handleClickProductIsOther.bind(this)}
                      onChange={evt => this.setState({Color: event.target.value})} >  
                        <option value="Black">ดำ</option>
                        <option value="Silver">เงิน</option>
                        <option value="Red">แดง</option>
                        <option value="other" >อื่นๆ</option>
                    </Ons.Select>                 
                </Ons.ListItem>
 
                <Ons.ListItem>
                  ปัญหาเรื่อง&nbsp;&nbsp;: &nbsp;&nbsp;
                    <Ons.Select id="choose-sel" 
                      value={this.state.Problem} 
                      modifier={this.state.Problem} 
                      onClick={this.handleClickProductIsOther.bind(this)}
                      onChange={evt => this.setState({Problem: event.target.value})} >   
                        <option value="Software">Software</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Sound">เสียง</option>
                        <option value="Screen">จอ</option>
                        <option value="Keyboard">แป้นพิมพ์</option>
                        <option value="other" >อื่นๆ</option>
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
            <h4><ons-icon size="25px"  icon="ion-person"></ons-icon>&nbsp;&nbsp;เลือกพนักงานขาย</h4>
              <Ons.List>
                <Ons.ListHeader>พนักงานงาน</Ons.ListHeader>
              </Ons.List>
                
              <Ons.List
                dataSource={this.state.employees}
                renderRow={this.renderRow}
                handleClickSelectedEmp={this.handleClickSelectedEmp} 
              />
          </div>
          {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <Ons.List><Ons.ListHeader></Ons.ListHeader></Ons.List>
          {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px', paddingLeft:'20%', paddingRight:'20%'}}> 
          <Ons.Button onClick={this.handleClickSave(
                  this.state.cusFirstName,this.state.cusLastName,this.state.cusTel,
                  this.state.Type,this.state.Brand,this.state.Model,this.state.Color,this.state.Problem,this.state.Note,
                  this.state.cid+1, this.state.pid+1, this.state.sid,this.state.rid
                  )}
          >
            บันทึกข้อมูล
          </Ons.Button>

            <Ons.Button onClick={this.pushPage.bind(this)}>
                PRINT
            </Ons.Button>

          </div>

        </Ons.Page>
      );
    }
  }
  {/*PrintRepairInvoice-------------------------------------------------------------------*/}
  class PrintRepairInvoice extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      title: props.title ? props.title : 'Custom Page',
      nextTitle: null,

      //
    };
  }
  
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
      </Ons.Toolbar>
    );
  }

  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
        <Ons.Card>
          <div style={{ textAlign: 'center' }}>   
          
                <h4> 
                <ons-icon size="25px" icon="ion-chevron-left"></ons-icon>
                  &nbsp;&nbsp;&nbsp;
                  ใบแจ้งซ่อมคอมพิวเตอร์ 
                  &nbsp;&nbsp;&nbsp;
                <ons-icon size="25px" icon="ion-chevron-right"></ons-icon>
                </h4>       
            
              
          </div>
        </Ons.Card>

           <p style={{textAlign: 'Center',  paddingTop: '15px'}}>
           <Ons.Button >
             <ons-icon size="30px" icon="ion-printer"></ons-icon> 
             &nbsp;&nbsp;&nbsp;
             PRINT</Ons.Button></p>    

      </Ons.Page>
    );
  }
}
  {/*------------------------------------------------------------------------*/}
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
            <Ons.Navigator initialRoute={{ component: RepairInvoice, props: { key: 'RepairInvoice' } }} renderPage={this.renderPage.bind(this)} ref={(navigator) => { this.navigator = navigator; }} />
          </Ons.SplitterContent>
        </Ons.Splitter>
      );
    }
  }
  
  ons.ready(function() {
    ReactDOM.render(<App />, document.getElementById('app'));
  });

ReactDOM.render(<App />, document.getElementById('react'));