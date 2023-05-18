import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import axios from "axios";
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import './DataTableDemo.css';
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import "primereact/resources/primereact.min.css";                
import "primeicons/primeicons.css";                              
const Chatbotconfic = () => {

  let emptyProduct = {
    chat_id: '',
    tags: '',
    pattern: '',
    responses: '',
};

  

    const [products, setProducts] = useState([]);
    const toast = useRef(null);
const [productDialog, setProductDialog] = useState(false);
const [deleteProductDialog, setDeleteProductDialog] = useState(false);
const [product, setProduct] = useState(emptyProduct);
const [submitted, setSubmitted] = useState(false);
const [lastnumber, setnumber] = useState(null);
const dt = useRef(null);

    useEffect(() => {
        fetchProductData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProductData = () => {
    axios.get("http://localhost:5000/findchat").then((response) => {
      setProducts(response.data);
      setnumber(response.data[response.data.length-1].chat_id)

    });
  };

    const onRowEditComplete1 = (e) => {
   
        let _products = [...products];
        let { newData, index } = e;
        _products[index] = newData
        setProducts(_products);
        console.log(e);
        // console.log(_products[e.index]);
        // console.log(products);
        console.log(_products[e.index].chat_id);
           axios.post("http://localhost:5000/updatechat",{Chat_id:_products[e.index].chat_id,Tags:_products[e.index].tags,Pattern:_products[e.index].pattern,Responses:_products[e.index].responses}).then((response) => {
      });
    }
      

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }
    
const openNew = () => {
  setProduct(emptyProduct);
  setSubmitted(false);
  setProductDialog(true);
}

const hideDialog = () => {
  setSubmitted(false);
  setProductDialog(false);
}

const hideDeleteProductDialog = () => {
  setDeleteProductDialog(false);
}


const saveProduct = () => {
  setSubmitted(true);

  if (product.tags.trim()) {
      let _products = [...products];
      let _product = {...product};
      console.log(_product);
      if (product.chat_id) {
          const index = findIndexById(product.chat_id);

          _products[index] = _product;
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else if(_product.tags!==""&&_product.pattern!==""&&_product.responses!=="") { 
          _product.chat_id = lastnumber+1;
          // console.log(_product);
          setnumber(lastnumber+1)
          _products.push(_product);
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'เพิ่มสำเร็จ', life: 3000 });

          axios.post("http://localhost:5000/addchat",{Tags:_product.tags,Pattern:_product.pattern,Responses:_product.responses}).then((response) => {
          });
          setProducts(_products);
          setProductDialog(false);
          setProduct(emptyProduct);
      }
 

    
  }
}


const findIndexById = (id) => {
  let index = -1;
  for (let i = 0; i < products.length; i++) {
      if (products[i].chat_id === id) {
          index = i;
          break;
      }
  }

  return index;
}

const confirmDeleteProduct = (product) => {
  setProduct(product);
  setDeleteProductDialog(true);
}

const actionBodyTemplate = (rowData) => {
  return (
      <React.Fragment>
          <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteProduct(rowData)} />
      </React.Fragment>
  );
}


const onInputChange = (e, name) => {
  const val = (e.target && e.target.value) || '';
  let _product = {...product};
  _product[`${name}`] = val;

  setProduct(_product);
}
const traindata = async () => {
  toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'กรุณารอสักครู่', life: 3000 });
        try {
          axios.defaults.withCredentials = false;
          await axios.get('http://127.0.0.1:5000/traindata',).then((response) => {
          // console.log(response);
            // addResponseMessage(`ฺBOT : ${response.data}`);
            
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'เทรนสำเร็จ', life: 3000 });
        });
          
      } catch (error) {
          console.log(error);
          toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'เทรนไม่สำเร็จ', life: 3000 });
      }

  
  
}
const accept = () => {
  traindata()
}

const reject = () => {
  // toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
}

const confirm1 = () => {
 
  confirmDialog({
      message: 'ต้องการเทรนข้อมูลไหม',
      header: 'แจ้งเตือน',
      icon: 'pi pi-exclamation-triangle',
      accept,
      reject
      
  });

};



const leftToolbarTemplate = () => {
  return (
      <React.Fragment>
          <Button label="เพิ่มข้อมูล" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
      </React.Fragment>
  )
}

const rightToolbarTemplate = () => {
  return (
      <React.Fragment>
        <Button label="เทรนข้อมูล" icon="pi pi-check" className="p-button-warning" onClick={confirm1} />
      </React.Fragment>
  )
}
const deleteProduct = () => {
  let _products = products.filter(val => val.chat_id !== product.chat_id);
  setProducts(_products);
   ///////////////////del data
   axios.post("http://localhost:5000/deletechat",{Chat_id:products.filter(val => val.chat_id == product.chat_id)[0].chat_id}).then((response) => {
  });
  setDeleteProductDialog(false);
  setProduct(emptyProduct);
  toast.current.show({ severity: 'success', summary: 'Successful', detail: 'ลบข้อมูลสำเร็จ', life: 3000 });
}



const productDialogFooter = (
  <React.Fragment>
      <Button label="ยกเลิก" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="ยืนยัน" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
  </React.Fragment>
);

const deleteProductDialogFooter = (
  <React.Fragment>
      <Button label="ยกเลิก" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
      <Button label="ยืนยัน" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
  </React.Fragment>
);







  return (
    <div className="layout-component m_r">
      <h2 className="page-header">{"chatbot confic".toUpperCase()}</h2>
      <div className="row">
        <div className="col-12">
       
          <div className="datatable-editing-demo">
            <Toast ref={toast} />
            <div className="card p-fluid">
            <ConfirmDialog />
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={ rightToolbarTemplate} ></Toolbar>
                <DataTable value={products} editMode="row" dataKey="chat_id" onRowEditComplete={onRowEditComplete1} responsiveLayout="scroll"
                paginator rows={10} rowsPerPageOptions={[5, 10, 25]}   
                >
                    <Column field="tags" header="หัวข้อ" editor={(options) => textEditor(options)}></Column>
                    <Column field="pattern" header="คำถาม"  editor={(options) => textEditor(options)} ></Column>
                    <Column field="responses" header="คำตอบ"  editor={(options) => textEditor(options)} ></Column>
                    <Column rowEditor  bodyStyle={{ textAlign: 'center' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} ></Column>
                </DataTable>
                <Dialog visible={productDialog} style={{ width: '450px' }} header="เพิ่มข้อมูล" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">หัวข้อ</label>
                    <InputText id="name" value={product.tags} onChange={(e) => onInputChange(e, 'tags')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.tags })} />
                    {submitted && !product.tags && <small className="p-error">tags is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description">คำถาม</label>
                    <InputTextarea id="description" value={product.pattern} onChange={(e) => onInputChange(e, 'pattern')}  rows={3} cols={20} required autoFocus className={classNames({ 'p-invalid': submitted && !product.pattern })}/>
                    {submitted && !product.pattern && <small className="p-error">pattern is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description">คำตอบ</label>
                    <InputTextarea id="description" value={product.responses} onChange={(e) => onInputChange(e, 'responses')}  rows={3} cols={20} required autoFocus className={classNames({ 'p-invalid': submitted && !product.responses })}/>
                    {submitted && !product.responses && <small className="p-error">responses is required.</small>}
                </div>
               
            </Dialog>
          
            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="ต้องการลบข้อมูลหรือไม่" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {product && <span>คุณต้องการลบหัวข้อ <b>{product.tags}</b>?</span>}
                </div>
            </Dialog>
            
            </div>
            
        </div>
        
        </div>
      </div>
    </div>
  );
};
export default Chatbotconfic;
