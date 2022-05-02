import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import './TodoList.css'
function TodoList (props){
    const [error,setError] = useState(false)
    // 初始狀態 0
    // 控制輸入空值出錯後，尚未成功輸出的狀態 1
    // 成功輸出等待狀態 2
    const [sent,setSent] = useState(0)
    const stopEnter = (e)=>{if(e.key==='Enter'){e.preventDefault()}}
    useEffect(()=>{
        if(sent===2){
            window.addEventListener('keydown',stopEnter)
            document.querySelector('#todo').setAttribute('readonly',true)
            document.querySelector('#todo').removeAttribute('placeholder')
        }else{
            document.querySelector('#todo').setAttribute('placeholder','請輸入待辦事項')
            document.querySelector('#todo').removeAttribute('readonly')
        }
        return () => {
            window.removeEventListener('keydown',stopEnter)
        }
    },[sent])
    function inputStyle(sent){
        switch (sent) {
            case 0:
                return {borderColor:'rgba(194, 192, 192, 0.735)'}
            case 1:
                return {borderColor:error?'red':'rgba(194, 192, 192, 0.735)'}
            case 2:
                return {background:'rgba(194, 192, 192, 0.735)',cursor:'not-allowed'}
            default:
                return {borderColor:'rgba(194, 192, 192, 0.735)'}
        } 
    }
    // 讓使用者的一些敏感字直接跳脫
    // function escapeHtml(str){
    //     return str.replace(/&/g,"&amp;").replace(/</g,"&lt").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
    // }
    return (
        <>
            <div className="todo_wrap">
                <h1 className='title'>待辦事項</h1>
                <form className='todo_form' onSubmit={(e)=>{
                    e.preventDefault()
                    if(props.inputValue === ''){
                        setError(true)
                        setSent(1)
                    }else{
                        setSent(2)
                        let curData = props.showList
                        curData.push({content:props.inputValue,finished:false,finishTime:null})
                        // 同時設定狀態和localstorage
                        props.setShowList(curData)
                        localStorage.setItem('todo',JSON.stringify(curData))
                        setTimeout(()=>{
                            setSent(0)
                            setError(false)
                            props.setInputValue('')
                        },1300)
                    }
                }}>
                    <label htmlFor='todo'>
                        <span>*</span>項目
                    </label>
                    <br/>
                    <div className='input_area'>
                        <input id='todo' 
                            placeholder='請輸入待辦事項' 
                            value={props.inputValue} 
                            style={inputStyle(sent)}
                            // 當輸入文字時,讓紅框消失,但需多考慮若處於以上狀態時,在使用者尚未確實送出備忘內容的情形下,若他又讓文字框處於空值,也必須提醒,避免再次空值還按得了送出的按鈕
                            onChange={(e)=>{
                                if(sent===1&&e.target.value===''){
                                    setError(true)
                                }else{
                                    setError(false)
                                }  
                                props.setInputValue(e.target.value)
                            }}/>
                        <button style={{cursor:error||sent===2?'not-allowed':'pointer',pointerEvents:error||sent===2?'none':'all'}}>
                            {sent===2?<Spinner size="sm" animation="border" variant="light" />:'送出'}
                        </button>
                    </div>
                    <div className='warning_text' 
                    style={{display:error?'block':'none'}}>
                    不得為空值</div>
                </form>
            </div>
        </>
    )
}
export default TodoList;