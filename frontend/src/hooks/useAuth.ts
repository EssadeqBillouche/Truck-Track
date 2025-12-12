import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    
    return {
        ...auth,
        dispatch,
    };
};