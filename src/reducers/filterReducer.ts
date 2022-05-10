import {FilterValuesType} from '../App';

export const filterReducer = (state: FilterValuesType, action: changeFilterAcType) => {
switch(action.type){
    case 'CHANGE-FILTER':{
        return action.payload.value
    }default: return state
}


}


type changeFilterAcType= ReturnType< typeof changeFilterAc>

export const changeFilterAc = (value:FilterValuesType ) => {
    return{
        type:'CHANGE-FILTER',
        payload:{value:value}
    }as const

}