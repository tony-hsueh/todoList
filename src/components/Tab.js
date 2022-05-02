import './Tab.css'
function Tab (props){ 
    return(
        <>
            <div className="tab_wrap">
                <div className="btn_unfinish" style={{background:props.finish?'none':'rgba(194, 192, 192, 0.735)'}} onClick={()=>{props.setFinish(false)}}>待完成</div>
                <div className="btn_finished" 
                    style={{background:props.finish?'rgba(194, 192, 192, 0.735)':'none'}} 
                    onClick={()=>{
                    props.setFinish(true)}}>已完成</div>
            </div>
        </>
    )   
}
export default Tab;