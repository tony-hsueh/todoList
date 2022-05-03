import './App.css';
import Tab from './components/Tab';
import Tbc from './components/Tbc';
import TodoList from './components/TodoList';
import { useEffect, useState } from 'react';
import Completed from './components/Completed';
import { Modal, Button } from 'react-bootstrap';
function App() {
  const [deleteItem,setDeleteItem] = useState('')
  const [doneItem,setDoneItem] = useState('')
  const [showList,setShowList] = useState([])
  const [inputValue,setInputValue] = useState('')
  const [finish,setFinish] = useState(false)
  useEffect(()=>{
    const allList = JSON.parse( localStorage.getItem('todo')) || null
    if(allList===null){
      localStorage.setItem('todo',JSON.stringify([]))
    }else{
      setShowList(allList)
    }
  },[])
  // 以下是modal的狀態
  const [show, setShow] = useState(false)
  const [modalText, setModalText] = useState('')
  const handleClose = () => setShow(false)
  const todo_Modal = (
    <Modal
        centered
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
    >
        <Modal.Header style={{borderBottom:'none',paddingBottom:0,paddingLeft:'30px'}}>
            <Modal.Title>
                提示
            </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{paddingLeft:'30px'}}>
            <p
                className="chatbot_modalBody"
                dangerouslySetInnerHTML={{ __html: modalText }}
            />
        </Modal.Body>
        <Modal.Footer style={{borderTop:'none',paddingRight:'30px',paddingBottom:'30px'}}>
            <Button variant="secondary" onClick={handleClose}>
                取消
            </Button>
            <Button 
            onClick={()=>{
              handleClose()
              if(deleteItem!==''){
                let new_arr = showList.filter(v=>v.content!==deleteItem)
                setShowList(new_arr)
                localStorage.setItem('todo',JSON.stringify(new_arr))
                setDeleteItem('')
                }else if(doneItem!==''){
                  let index = showList.findIndex(v=>v.content===doneItem)
                  showList[index].finished = true
                  showList[index].finishTime = Date.now()
                  localStorage.setItem('todo',JSON.stringify(showList))
                  setDoneItem('')
                }
            }}>
                確認  
            </Button>
        </Modal.Footer>
    </Modal>
);
  return (
    <>
      <div className="App">
        <div className='sign'>made by 薛少康</div>
        <TodoList inputValue={inputValue} setInputValue={setInputValue} setShowList={setShowList} showList={showList}/>
        <Tab finish={finish} setFinish={setFinish}/>
        {!finish&&
        <Tbc finish={finish} setShow={setShow} showList={showList}
        setModalText={setModalText}
        setDeleteItem={setDeleteItem}
        setDoneItem={setDoneItem}
        />}
        {finish&&
        <Completed finish={finish} showList={showList}/>}
      </div>
      {todo_Modal}
    </>
  );
}

export default App;

