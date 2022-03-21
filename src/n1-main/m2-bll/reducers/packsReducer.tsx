import {packsAPI, ResponsePacksType} from '../api/api';
import {Dispatch} from 'redux';
import {setErrorN, setLoaderStatus} from './appReducer';
import {handleError} from '../../m1-ui/utilities/handleError';
import {AppRootStateType} from "../store";


const initialState = {
    data: {
        cardPacks: [
            {
                _id: 'none',
                user_id: 'none',
                name: 'no Name',
                cardsCount: 0,
                created: 'none',
                update: 'none',
            },
        ],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 1,
        pageCount: 10,
    },
    getPackData: {
        packName: "",
        min: 0,
        max: 50,
        sortPacks: "",
        page: 1,
        pageCount: 10,
        user_id: ""
    }
}
export const packsReducer = (state = initialState, action: PacksReducerActionType): InitialStateType => {

    switch (action.type) {
        case 'PACKS_REDUCER/GET_PACKS':
            return {...state, data: action.data}
        case "PACKS_REDUCER/SET_CURRENT_PAGE":
            return {...state, getPackData: {...state.getPackData, page: action.page}}
        case "PACKS_REDUCER/SET_PAGE_COUNT":
            return {...state, getPackData: {...state.getPackData, pageCount: action.pageCount}}
        case "PACKS_REDUCER/SET_MAX-MIN_VALUE":
            return {...state, getPackData: {...state.getPackData, min: action.min, max: action.max}}
        case "PACKS_REDUCER/SET_USER_ID":
            return {...state, getPackData: {...state.getPackData, user_id: action.id}}
        case "PACKS_REDUCER/SET_CARD_NAME":
            return {...state, getPackData: {...state.getPackData, packName: action.name}}
        case "PACKS_REDUCER/SET_SORT_VALUE":
            return {...state, getPackData: {...state.getPackData, sortPacks: action.sortValue}}
        default:
            return state;
    }
}

export const getPacks = (data: ResponsePacksType) => ({type: 'PACKS_REDUCER/GET_PACKS', data} as const);
export const setCurrentPage = (page: number) => ({type: "PACKS_REDUCER/SET_CURRENT_PAGE", page} as const)
export const setPageCount = (pageCount: number) => ({type: "PACKS_REDUCER/SET_PAGE_COUNT", pageCount} as const)
export const setSortPacks = (sortValue: string) => ({type: "PACKS_REDUCER/SET_SORT_VALUE", sortValue} as const)

export const setMaxMinValue = (newValue: number[]) => ({
    type: 'PACKS_REDUCER/SET_MAX-MIN_VALUE',
    min: newValue[0],
    max: newValue[1]
} as const);

export const setUserID = (id: string) => ({type: 'PACKS_REDUCER/SET_USER_ID', id} as const);
export const setCardsName = (name: string) => ({type: 'PACKS_REDUCER/SET_CARD_NAME', name} as const);

//thunks
export const getPacksTC = () =>
    async (dispatch: Dispatch<PacksReducerActionType>, getState: () => AppRootStateType) => {
        const data = getState().packs.getPackData
        try {
            dispatch(setLoaderStatus('loading'))
            const res = await packsAPI.getPacks(data);
            dispatch(getPacks(res.data))
        } catch (e) {
            handleError(e, dispatch)
        } finally {
            dispatch(setLoaderStatus('idle'))
        }
    }
//types
export type PacksReducerActionType =
    ReturnType<typeof getPacks>
    | ReturnType<typeof setLoaderStatus>
    | ReturnType<typeof setMaxMinValue>
    | ReturnType<typeof setUserID>
    | ReturnType<typeof setCardsName>
    | ReturnType<typeof setErrorN>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setPageCount>
    | ReturnType<typeof setSortPacks>
type InitialStateType = typeof initialState;