var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');

{/*RepairInvoice------------------------------------------------------------------------*/}
class RepairInvoice extends React.Component {
    constructor(props) {
      super(props);
      this.state = {employeeDetails: []};
      this.state = {
        title: props.title ? props.title : 'Custom Page',
        nextTitle: null,
  
        invoiceID:'',
        dateIn:'',
        dateOut:'',
  
        cus_ID:'',
        firstName:'',
        lastName:'',
        tel:'',
  
        product_ID :'',
        Type: '',
        Brand: '',
        Model: '',
        Color: '',
        Note: '',
        Problem: '',
        
        empUser:'Watsamon',
        salesEmpName:'',
        salesEmpTel:'081-234-5678',
        repairEmpName:'',
        repairEmpTel:'',
        repairEmpList: [
          {
              Name: 'ไม่ระบุ',
              Tel: 'ไม่ระบุ'
          },          
          {
              Name: 'Daniel Perkins',
              Tel: '020-543-3043'
          },
          {
              Name: 'Dominic Berry',
              Tel: '043-851-4715'
          },
          {
              Name: 'Nicholas Smith',
              Tel: '083-496-1337'
          },
        ],
      };
    }

    componentDidMount() {
      // เมื่อทำงาน ให้ทำการ request JSON ไปที่ /api/employees ที่เตรียมไว้ฝั่ง server
      // เพื่อให้ได้ข้อมูล JSON กลับมา
      // เมื่อได้ JSON กลับมาให้บันทึกเก็บไว้ในตัวแปร this.state.employees
      // โดย setState({employees: ...})
  
      // ถ้าเป็นรายการ entity ชื่อ employees จะดึงได้จาก response.entity._embedded.employees
      // ถ้าเป็นรายการ entity ชื่อ customers ก็จะดึงได้จาก response.entity._embedded.customers เป็นต้น
      client({method: 'GET', path: '/api/employeeDetails'}).done(response => {
          this.setState({employeeDetails: response.entity._embedded.employeeDetails});
      });
    }
  
    renderToolbar() {
      return (
        <Ons.Toolbar>
          <div className='left'><Ons.BackButton>Back</Ons.BackButton></div>
          <div className="center">แบบฟอร์มการแจ้งซ่อมคอมพิวเตอร์</div>
        </Ons.Toolbar>
      );
    }
  
    pushPage() {
      ons.notification.alert('บันทึกข้อมูลสำเร็จ');
      this.props.navigator.pushPage({ component: PrintRepairInvoice, 
           props: { key: 'PrintRepairInvoice' ,
  
           empUser: this.state.empUser,
  
           invoiceID:this.state.invoiceID,
           dateIn:this.state.dateIn,
           dateOut:this.state.dateOut,
  
           cusName:this.state.firstName +'  '+ this.state.lastName,
           cusTel:this.state.tel,
  
           Type: this.state.Type,
           Brand: this.state.Brand,
           Problem: this.state.Problem,        
           
           salesEmpName:this.state.empUser,
           salesEmpTel:this.state.salesEmpTel,
           repairEmpName:this.state.repairEmpName,
           repairEmpTel:this.state.repairEmpTel,   
           } });
    }
  
    popPage() {
      this.props.navigator.popPage();
    }

    handleClick(Type,Brand,Model,Color,Problem,Note) {
      return function () {
          client({method: 'GET', path: '/Type/'+Type+'/Brand/'+Brand+'/Model/'+Model+'/Color/'+Color+'/Problem/'+Problem+'/Note/'+Note})}
          
     }

     handleClick2(firstName,lastName,tel,Type,Brand,Model,Color,Problem,Note,cus_ID,product_ID,salesEmp_id,repairEmp_id) {
      return function () {
        client({method: 'GET', path: '/firstName/'+firstName+'/lastName/'+lastName+'/tel/'+tel})
        client({method: 'GET', path: '/Type/'+Type+'/Brand/'+Brand+'/Model/'+Model+'/Color/'+Color+'/Problem/'+Problem+'/Note/'+Note})
        client({method: 'GET', path: '/customer/'+cus_ID+'/product/'+product_ID+'/salesEmp/'+salesEmp_id+'/repairEmp/'+repairEmp_id}).done(
            ons.notification.alert('บันทึกสำเร็จ!')
    )}
   }

    handleClickProductType() {
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
    
    handleClickSave() {
      ons.notification.alert('บันทึกข้อมูลสำเร็จ');
    }
  
    handleClickFindEmpTel(){
      for(var i=0 ; i<4 ;++i){
          if(this.state.repairEmpName === this.state.repairEmpList[i].Name) 
              this.state.repairEmpTel = this.state.repairEmpList[i].Tel        
      }
    }

    handleClick(employeeDetail) {
      // แสดงข้อความ
      ons.notification.alert(employeeDetail.firstName);
    }

    renderRow(row, index) {
      return(
        <Ons.ListItem tappable
            key={row._links.self.href}
            data={row}
            onClick={this.handleClick.bind(this, row)}>
            <div className="center">
                {row.firstName}&nbsp;{row.lastName}
            </div>
        </Ons.ListItem>
      )
    }

  
    render() {
      return (
        <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
          
          <Ons.List>         
              <Ons.ListHeader><div style={{ textAlign: 'right' , paddingRight: '10px' }}>
                  <ons-icon icon="ion-android-person"></ons-icon>&nbsp;&nbsp; 
                  พนักงาน : {this.state.empUser}
          </div></Ons.ListHeader></Ons.List>
  
  {/*รหัสการแจ้งซ่อม------------------------------------------------------------------------*/}    
  {/*
          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px'}}>
            <p><h4>
                <ons-icon size="25px" icon="ion-edit"></ons-icon>&nbsp;&nbsp;รหัสการแจ้งซ่อม</h4>
                <Ons.Input modifier="underbar" 
                    placeholder="2017_000001" 
                    float 
                    onChange={evt => this.setState({ invoiceID: evt.target.value })} >     
                </Ons.Input>
            </p>
          </div>
  
            <Ons.List>
                <Ons.ListHeader></Ons.ListHeader>
            </Ons.List>
   */}         
   {/*วันที่แจ้งซ่อม วันที่ส่งคืน------------------------------------------------------------------*/}       
          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px'}}>
            <h4><ons-icon size="25px"  icon="ion-calendar"></ons-icon>&nbsp;&nbsp; วันที่แจ้งซ่อม - วันที่ส่งคืน</h4>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วันที่แจ้งซ่อม :
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ons-input 
                  type="date" 
                  placeholder="วันที่ส่งคืน" 
                  ng-model="dateValue"
                  onChange={evt => this.setState({ dateIn: evt.target.value })}>
              </ons-input>
            </p>
                
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วันที่ส่งคืน :
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ons-input 
                  type="date" 
                  placeholder="วันที่ส่งคืน" 
                  ng-model="dateValue"
                  onChange={evt => this.setState({ dateOut: evt.target.value })}>
              </ons-input>
            </p>
          </div>
  
            <Ons.List>
                <Ons.ListHeader></Ons.ListHeader>
            </Ons.List>
  
  {/*ข้อมูลของลูกค้า------------------------------------------------------------------*/}       
          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px'}}>
            <h4><ons-icon size="25px"  icon="ion-person"></ons-icon>&nbsp;&nbsp;ข้อมูลลูกค้า</h4>
            <p>
              <Ons.Input modifier="underbar" 
                  placeholder="ชื่อ" 
                  float 
                  onChange={evt => this.setState({ firstName: evt.target.value })} >     
              </Ons.Input>
            </p>
            <p>
              <Ons.Input modifier="underbar" 
                  placeholder="นามสกุล" 
                  float 
                  onChange={evt => this.setState({ lastName: evt.target.value })} >     
              </Ons.Input>
            </p>
            <p>
              <Ons.Input modifier="underbar" 
                  placeholder="เบอร์โทรศัพท์" 
                  float 
                  onChange={evt => this.setState({ Tel: evt.target.value })} >     
              </Ons.Input>
            </p>
          </div>
  
            <Ons.List>
                <Ons.ListHeader></Ons.ListHeader>
            </Ons.List>
  
  {/*รายละเอียดเครื่องซ่อม------------------------------------------------------------------*/}
          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px'}}>             
            <h4><ons-icon  size="25px" icon="ion-wrench"></ons-icon>&nbsp;&nbsp; รายละเอียดคอมพิวเตอร์</h4>
            <Ons.List > 
                <Ons.ListItem>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  ประเภท&nbsp;&nbsp;: &nbsp;&nbsp;
                      <Ons.Select id="choose-sel" 
                        value={this.state.Type} 
                        Type={this.state.Type} 
                        onClick={this.handleClickProductType.bind(this)}
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
                        Brand={this.state.Brand} 
                        onClick={this.handleClickProductType.bind(this)}
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
                        Color={this.state.Color} 
                        onClick={this.handleClickProductType.bind(this)}
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
                        Problem={this.state.Problem} 
                        onClick={this.handleClickProductType.bind(this)}
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

            </Ons.List>   
          </div>
  
  
  
  {/*เลือกพนักงานซ่อม------------------------------------------------------------------*/} 
          <Ons.List>   
          <Ons.ListHeader></Ons.ListHeader>
            </Ons.List>   
          <div style={{ textAlign: 'center', paddingTop:'10px', paddingBottom:'10px'}}>
            <h5><ons-icon  size="25px" icon="ion-person"></ons-icon>&nbsp;&nbsp; พนักงานซ่อม</h5>
              ชื่อ : &nbsp;&nbsp;&nbsp;   


              <Ons.List
              // ใน page มี list
              // ตั้งค่า dataSource ของ list ให้แสดงรายการ employee
              dataSource={this.state.employeeDetails}
              // แต่ละค่าใน dataSource จะกลายเป็น row ใน renderRow
              renderRow={this.renderRow}
              // ส่ง handleClick ไปด้วย เพราะเมื่อเริ่ม render แล้ว
              // this จะเปลี่ยน
              handleClick={this.handleClick} />


                      

              {/*                         
                      <option value={this.state.repairEmpList[0].Name}>
                          {this.state.repairEmpList[0].Name}</option>
                      <option value={this.state.repairEmpList[1].Name} >
                          {this.state.repairEmpList[1].Name}</option>
                      <option value={this.state.repairEmpList[2].Name} >
                          {this.state.repairEmpList[2].Name}</option>
                      <option value={this.state.repairEmpList[3].Name} >
                          {this.state.repairEmpList[3].Name}</option>
              </Ons.Select>   
              */}       
            </div>
  
            <div style={{ textAlign: 'center', paddingTop:'20px', paddingBottom:'20px'}}>
            <Ons.Button onClick={this.handleClick2('Watsamon','Pongsupan','0874563800','1','1','1','1','1','1','1','1','1','2')}>
                บันทึกข้อมูล
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
  
        invoiceID:props.invoiceID,
        dateIn:'20/08/2017',
        dateOut:'25/08/2017',
  
        Type: props.Type,
        Brand: props.Brand,
        Problem: props.Problem,
        
        cusName:props.cusName,
        cusTel:props.cusName,
        
        salesEmpName:props.salesEmpName,
        salesEmpTel:props.salesEmpTel,
        repairEmpName:props.repairEmpName,
        repairEmpTel:props.repairEmpTel,      
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
                  <p> คุณ{this.state.cusName} </p>
              
                <Ons.List>
                  <Ons.ListItem>
                       <div style={{ textAlign: 'Center'}}>
                       <p><b>รหัสการแจ้งซ่อม : {this.state.invoiceID}</b></p>
  
                      <p style={{ paddingLeft:'30'}}>วันที่รับแจ้ง : {this.state.dateIn}</p>
                      <p style={{ paddingLeft:'30'}}>&nbsp;&nbsp;วันที่ส่งคืน : {this.state.dateOut}</p>
                      <p style={{ opacity: '0.6'}}>หมายเหตุ : วันที่ส่งคืนอาจเปลี่ยนแปลงได้ </p>
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
                      <p style={{ textAlign: 'Left', paddingLeft:'60'}}>ชื่อ : {this.state.salesEmpName}</p>
                      <p style={{ textAlign: 'Left', paddingLeft:'60'}}>เบอร์โทรศัพท์ : {this.state.salesEmpTel}</p>
                       </div>
               
                      <div style={{ textAlign: 'Left', paddingLeft:'30'}}>
                      <p><b>พนักงานซ่อม</b></p>
                      <p style={{ textAlign: 'Left', paddingLeft:'60'}}>ชื่อ : {this.state.repairEmpName}</p>
                      <p style={{ textAlign: 'Left', paddingLeft:'60'}}>เบอร์โทรศัพท์ : {this.state.repairEmpTel}</p>
                       </div>
                </Ons.ListItem>     
              </Ons.List>
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