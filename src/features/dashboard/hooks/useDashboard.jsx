import { useDispatch } from "react-redux"

export let useDashboard = ()=>{
    let dispatch = useDispatch()
    return {dispatch,}
}