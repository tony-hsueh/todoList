import { useEffect, useState } from 'react'
import './Completed.css'
function Completed (props){
    const [sortData,setSortData] = useState([])
    const complete_data = props.showList.filter(v=>v.finished===true)
    useEffect(()=>{
        setTimeout(() => {
            document.querySelectorAll('.complete_wrap').forEach(v=>{
                v.style.opacity = 1
            })
        }, (500));
        const DataWithTime = complete_data.map((v,i)=>{
            let difference = Date.now() - v.finishTime
            if(difference>24*60*60*1000){
                return {...v,finishTime : new Date(v.finishTime).toISOString().substring(0,10)}  
            }else if(difference<24*60*60*1000 && difference >60*60*1000){
                let hour = new Date().getHours() - new Date(v.finishTime).getHours()
                if(hour<0){
                     return {...v,finishTime: (hour +12).toString() + '小時前'}
                }else{
                    return {...v,finishTime : hour.toString() + '小時前'}
                     
                }
            }else if(difference<60*60*1000 && difference >60*1000){
                let min = new Date().getMinutes() - new Date(v.finishTime).getMinutes()
                if(min<0){
                    return {...v,finishTime : (min +60).toString() + '分鐘前'}
                     
                }else{
                    return {...v,finishTime : min.toString() + '分鐘前'}    
                }
            }else if(difference<60*1000){
                let sec = new Date().getSeconds() - new Date(v.finishTime).getSeconds()
                if(sec<0){
                    return {...v,finishTime : (sec +60).toString() + '秒前'}
                }else{
                    return {...v,finishTime : sec.toString() + '秒前'}                  
                }
            }
        })
        setSortData(DataWithTime)
    },[])
    
    return (
        <>
            {sortData.length!==0 &&
                sortData.map((v,i)=>{
                    return (
                        <div key={i} className="complete_wrap">
                            <div className="content">           {v.content}
                            </div>
                            <div className="finish_time">       {v.finishTime}
                            </div>
                        
                        </div>
                    )
                })
            }  
        </>
    )
}
export default Completed ;