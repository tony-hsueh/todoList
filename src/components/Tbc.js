import './Tbc.css' 
import { useEffect } from 'react';
function Tbc (props){
    const Tbc_data = props.showList.filter(v=>v.finished===false)
    // useEffect(()=>{
    //     if(Tbc_data.length!==0){
    //         setTimeout(() => {
    //             document.querySelector('.tbc_wrap').style.opacity = 1
    //         }, (500));
    //         if(props.finish){
    //             document.querySelector('.tbc_wrap').style.opacity = 0
    //         }
    //     }
    // },[])
    return (
        <>
            {Tbc_data.length!==0 &&
                Tbc_data.map((v,i)=>{
                    return (
                        <div key={i} className="tbc_wrap"   
                        >
                            <div className="content">{v.content}</div>
                            <div className='btn_group'>
                                <button className="btn_delete" 
                                    onClick={()=>{
                                        let tmp = `是否移除'${v.content}'?`;
                                        props.setShow(true)
                                        props.setModalText(tmp)
                                        props.setDeleteItem(v.content)
                                }}>移除</button>
                                <button className="btn_done" 
                                    onClick={()=>{
                                        let tmp = `是否完成'${v.content}'?`;
                                        props.setShow(true)
                                        props.setModalText(tmp)
                                        props.setDoneItem(v.content)
                                }}>完成</button>
                            </div>
                        </div>
                    )
                })
            }  
        </>
    )
}
export default Tbc;